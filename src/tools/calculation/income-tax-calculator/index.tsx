import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DollarSign, Landmark, FileText, PlusCircle } from 'lucide-react';
import taxData from '../../../data/tax-data.json';

interface TaxBracket {
  rate: number;
  up_to: number | null;
}

interface State {
  name: string;
  tax_brackets: TaxBracket[];
}

interface Country {
  country: string;
  currency: {
    code: string;
    symbol: string;
  };
  tax_years?: string[];
  filing_statuses?: string[];
  states?: State[];
  federal_tax?: {
    [year: string]: {
      [status: string]: TaxBracket[];
    };
  };
  social_security_rate?: number;
  medicare_rate?: number;
  tax_brackets?: TaxBracket[];
}

const IncomeTaxCalculator: React.FC = () => {
  const [annualIncome, setAnnualIncome] = useState<string>('60000');
  const [additionalIncome, setAdditionalIncome] = useState<string>('5000');
  const [taxDeferredContributions, setTaxDeferredContributions] = useState<string>('4000');
  const [preTaxDeductions, setPreTaxDeductions] = useState<string>('3000');
  const [deductions, setDeductions] = useState<string>('12950');
  const [credits, setCredits] = useState<string>('2000');
  const [allowances, setAllowances] = useState<string>('1');

  const [selectedCountry, setSelectedCountry] = useState<Country>(taxData[0]);
  const [selectedTaxYear, setSelectedTaxYear] = useState<string>(taxData[0].tax_years?.[0] || '');
  const [selectedFilingStatus, setSelectedFilingStatus] = useState<string>(taxData[0].filing_statuses?.[0] || '');
  const [selectedState, setSelectedState] = useState<State | null>(taxData[0].states?.[0] || null);

  const [taxableIncome, setTaxableIncome] = useState<number>(0);
  const [federalTax, setFederalTax] = useState<number>(0);
  const [stateTax, setStateTax] = useState<number>(0);
  const [socialSecurity, setSocialSecurity] = useState<number>(0);
  const [medicare, setMedicare] = useState<number>(0);
  const [totalTax, setTotalTax] = useState<number>(0);
  const [netIncome, setNetIncome] = useState<number>(0);
  const [effectiveTaxRate, setEffectiveTaxRate] = useState<number>(0);

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then((response) => response.json())
      .then((data) => {
        const country = taxData.find((c) => c.country === data.country_name);
        if (country) {
          setSelectedCountry(country);
          setSelectedTaxYear(country.tax_years?.[0] || '');
          setSelectedFilingStatus(country.filing_statuses?.[0] || '');
          setSelectedState(country.states?.[0] || null);
        }
      })
      .catch((error) => {
        console.error('Error fetching user location:', error);
      });
  }, []);

  useEffect(() => {
    const income = parseFloat(annualIncome) || 0;
    const additional = parseFloat(additionalIncome) || 0;
    const taxDeferred = parseFloat(taxDeferredContributions) || 0;
    const preTax = parseFloat(preTaxDeductions) || 0;
    const deduct = parseFloat(deductions) || 0;
    const credit = parseFloat(credits) || 0;

    const grossIncome = income + additional;
    const adjustedGrossIncome = grossIncome - taxDeferred - preTax;
    const currentTaxableIncome = Math.max(0, adjustedGrossIncome - deduct);

    let fedTax = 0;
    if (selectedCountry.federal_tax && selectedTaxYear && selectedFilingStatus) {
      const brackets = selectedCountry.federal_tax[selectedTaxYear]?.[selectedFilingStatus] || [];
      fedTax = calculateTax(currentTaxableIncome, brackets);
    }

    let stTax = 0;
    if (selectedState) {
      stTax = calculateTax(currentTaxableIncome, selectedState.tax_brackets);
    }
    
    const ssTax = grossIncome * (selectedCountry.social_security_rate || 0);
    const medTax = grossIncome * (selectedCountry.medicare_rate || 0);

    const currentTotalTax = fedTax + stTax + ssTax + medTax - credit;
    const currentNetIncome = grossIncome - currentTotalTax;
    const currentEffectiveTaxRate = (currentTotalTax / grossIncome) * 100;

    setTaxableIncome(currentTaxableIncome);
    setFederalTax(fedTax);
    setStateTax(stTax);
    setSocialSecurity(ssTax);
    setMedicare(medTax);
    setTotalTax(currentTotalTax);
    setNetIncome(currentNetIncome);
    setEffectiveTaxRate(currentEffectiveTaxRate);

  }, [annualIncome, additionalIncome, taxDeferredContributions, preTaxDeductions, deductions, credits, selectedCountry, selectedTaxYear, selectedFilingStatus, selectedState]);

  const calculateTax = (income: number, brackets: TaxBracket[]) => {
    let tax = 0;
    let remainingIncome = income;
    let lastBracketLimit = 0;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;

      const bracketLimit = bracket.up_to ?? Infinity;
      const taxableInBracket = Math.min(remainingIncome, bracketLimit - lastBracketLimit);
      
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
      lastBracketLimit = bracketLimit;
    }
    return tax;
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount);
  };

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <DollarSign className="mr-2 h-5 w-5" /> Income & Deductions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <Label htmlFor="country">Country</Label>
            <Select
              value={selectedCountry.country}
              onValueChange={(value) => {
                const country = taxData.find((c) => c.country === value);
                if (country) {
                  setSelectedCountry(country);
                  setSelectedTaxYear(country.tax_years?.[0] || '');
                  setSelectedFilingStatus(country.filing_statuses?.[0] || '');
                  setSelectedState(country.states?.[0] || null);
                }
              }}
            >
              <SelectTrigger className="w-full mt-1.5">
                <SelectValue placeholder="Select a country" />
              </SelectTrigger>
              <SelectContent>
                {taxData.map((country) => (
                  <SelectItem key={country.country} value={country.country}>
                    {country.country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {selectedCountry.tax_years && (
            <div>
              <Label htmlFor="taxYear">Tax Year</Label>
              <Select value={selectedTaxYear} onValueChange={setSelectedTaxYear}>
                <SelectTrigger className="w-full mt-1.5">
                  <SelectValue placeholder="Select a year" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCountry.tax_years.map((year) => (
                    <SelectItem key={year} value={year}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedCountry.filing_statuses && (
            <div>
              <Label htmlFor="filingStatus">Filing Status</Label>
              <Select value={selectedFilingStatus} onValueChange={setSelectedFilingStatus}>
                <SelectTrigger className="w-full mt-1.5">
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCountry.filing_statuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          {selectedCountry.states && (
            <div>
              <Label htmlFor="state">State</Label>
              <Select
                value={selectedState?.name || ''}
                onValueChange={(value) => {
                  const state = selectedCountry.states?.find((s) => s.name === value) || null;
                  setSelectedState(state);
                }}
              >
                <SelectTrigger className="w-full mt-1.5">
                  <SelectValue placeholder="Select a state" />
                </SelectTrigger>
                <SelectContent>
                  {selectedCountry.states.map((state) => (
                    <SelectItem key={state.name} value={state.name}>
                      {state.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div>
            <Label htmlFor="annualIncome">Annual Income</Label>
            <div className="relative mt-1.5">
              <Landmark className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="annualIncome" type="number" className="pl-10" value={annualIncome} onChange={(e) => setAnnualIncome(e.target.value)} placeholder="e.g., 60000" />
            </div>
          </div>

          <div>
            <Label htmlFor="additionalIncome">Additional Income</Label>
            <div className="relative mt-1.5">
              <PlusCircle className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="additionalIncome" type="number" className="pl-10" value={additionalIncome} onChange={(e) => setAdditionalIncome(e.target.value)} placeholder="e.g., 5000" />
            </div>
          </div>

          <div>
            <Label htmlFor="taxDeferredContributions">Tax-Deferred Contributions</Label>
            <div className="relative mt-1.5">
              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="taxDeferredContributions" type="number" className="pl-10" value={taxDeferredContributions} onChange={(e) => setTaxDeferredContributions(e.target.value)} placeholder="e.g., 4000" />
            </div>
          </div>

          <div>
            <Label htmlFor="preTaxDeductions">Pre-Tax Deductions</Label>
            <div className="relative mt-1.5">
              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="preTaxDeductions" type="number" className="pl-10" value={preTaxDeductions} onChange={(e) => setPreTaxDeductions(e.target.value)} placeholder="e.g., 3000" />
            </div>
          </div>

          <div>
            <Label htmlFor="deductions">Standard/Itemized Deductions</Label>
            <div className="relative mt-1.5">
              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="deductions" type="number" className="pl-10" value={deductions} onChange={(e) => setDeductions(e.target.value)} placeholder="e.g., 12950" />
            </div>
          </div>

          <div>
            <Label htmlFor="credits">Credits</Label>
            <div className="relative mt-1.5">
              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="credits" type="number" className="pl-10" value={credits} onChange={(e) => setCredits(e.target.value)} placeholder="e.g., 2000" />
            </div>
          </div>

          <div>
            <Label htmlFor="allowances">Allowances/Dependents</Label>
            <div className="relative mt-1.5">
              <FileText className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
              <Input id="allowances" type="number" className="pl-10" value={allowances} onChange={(e) => setAllowances(e.target.value)} placeholder="e.g., 1" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          Tax Summary
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Taxable Income</span>
            <span className="font-bold text-lg">{formatCurrency(taxableIncome, selectedCountry.currency.code)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Federal Tax</span>
            <span className="font-bold text-lg">{formatCurrency(federalTax, selectedCountry.currency.code)}</span>
          </div>
          {selectedState && (
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">State Tax</span>
              <span className="font-bold text-lg">{formatCurrency(stateTax, selectedCountry.currency.code)}</span>
            </div>
          )}
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Social Security</span>
            <span className="font-bold text-lg">{formatCurrency(socialSecurity, selectedCountry.currency.code)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Medicare</span>
            <span className="font-bold text-lg">{formatCurrency(medicare, selectedCountry.currency.code)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Total Tax</span>
            <span className="font-bold text-lg text-red-500">{formatCurrency(totalTax, selectedCountry.currency.code)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Net Income (After Tax)</span>
            <span className="font-bold text-lg text-green-500">{formatCurrency(netIncome, selectedCountry.currency.code)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Effective Tax Rate</span>
            <span className="font-bold text-lg">{effectiveTaxRate.toFixed(2)}%</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default IncomeTaxCalculator;
