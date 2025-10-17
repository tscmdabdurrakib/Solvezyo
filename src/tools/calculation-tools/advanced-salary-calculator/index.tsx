import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { Info, DollarSign, Percent, RefreshCw } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function AdvancedSalaryCalculator() {
  const [payFrequency, setPayFrequency] = useState('monthly');
  const [grossSalary, setGrossSalary] = useState(50000);
  const [basicSalary, setBasicSalary] = useState(25000);
  const [houseRent, setHouseRent] = useState(12500);
  const [medical, setMedical] = useState(2500);
  const [conveyance, setConveyance] = useState(2500);
  const [festivalBonus, setFestivalBonus] = useState(2);
  const [pfContribution, setPfContribution] = useState(10);
  const [investments, setInvestments] = useState(0);
  const [otherDeductions, setOtherDeductions] = useState(0);

  const [netSalary, setNetSalary] = useState(0);
  const [totalDeductions, setTotalDeductions] = useState(0);
  const [monthlyGross, setMonthlyGross] = useState(0);
  const [annualGross, setAnnualGross] = useState(0);
  const [annualTax, setAnnualTax] = useState(0);
  const [annualNet, setAnnualNet] = useState(0);

  const calculateSalary = () => {
    const monthlyGrossSalary = payFrequency === 'monthly' ? grossSalary : grossSalary / 12;
    const annualGrossSalary = payFrequency === 'annual' ? grossSalary : grossSalary * 12;

    const annualBasic = (basicSalary / monthlyGrossSalary) * annualGrossSalary;
    const annualHouseRent = (houseRent / monthlyGrossSalary) * annualGrossSalary;
    const annualMedical = (medical / monthlyGrossSalary) * annualGrossSalary;
    const annualConveyance = (conveyance / monthlyGrossSalary) * annualGrossSalary;
    const annualFestivalBonus = basicSalary * festivalBonus;

    const taxableHouseRent = Math.max(0, annualHouseRent - Math.min(300000, annualBasic * 0.5));
    const taxableMedical = Math.max(0, annualMedical - Math.min(120000, annualBasic * 0.1));
    const taxableConveyance = Math.max(0, annualConveyance - 30000);

    const totalTaxableIncome = annualBasic + taxableHouseRent + taxableMedical + taxableConveyance + annualFestivalBonus;

    let tax = 0;
    if (totalTaxableIncome > 350000) {
      let taxable = totalTaxableIncome - 350000;
      if (taxable > 100000) {
        tax += 100000 * 0.05;
        taxable -= 100000;
      } else {
        tax += taxable * 0.05;
        taxable = 0;
      }
      if (taxable > 300000) {
        tax += 300000 * 0.10;
        taxable -= 300000;
      } else {
        tax += taxable * 0.10;
        taxable = 0;
      }
      if (taxable > 400000) {
        tax += 400000 * 0.15;
        taxable -= 400000;
      } else {
        tax += taxable * 0.15;
        taxable = 0;
      }
      if (taxable > 500000) {
        tax += 500000 * 0.20;
        taxable -= 500000;
      } else {
        tax += taxable * 0.20;
        taxable = 0;
      }
      if (taxable > 0) {
        tax += taxable * 0.25;
      }
    }

    const investmentRebate = Math.min(investments * 0.15, tax * 0.25, 1000000 * 0.15);
    const finalTax = Math.max(0, tax - investmentRebate);

    const annualPF = (annualBasic * pfContribution / 100) * 2;
    const totalAnnualDeductions = finalTax + annualPF + (otherDeductions * 12);

    setMonthlyGross(monthlyGrossSalary);
    setAnnualGross(annualGrossSalary);
    setAnnualTax(finalTax);
    setTotalDeductions(totalAnnualDeductions / 12);
    setNetSalary(monthlyGrossSalary - (totalAnnualDeductions / 12));
    setAnnualNet(annualGrossSalary - totalAnnualDeductions);
  };

  useEffect(() => {
    calculateSalary();
  }, [grossSalary, payFrequency, basicSalary, houseRent, medical, conveyance, festivalBonus, pfContribution, investments, otherDeductions]);

  const handleReset = () => {
    setPayFrequency('monthly');
    setGrossSalary(50000);
    setBasicSalary(25000);
    setHouseRent(12500);
    setMedical(2500);
    setConveyance(2500);
    setFestivalBonus(2);
    setPfContribution(10);
    setInvestments(0);
    setOtherDeductions(0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(value);
  };

  const pieData = [
    { name: 'Take-home', value: netSalary, color: '#3B82F6' },
    { name: 'Tax', value: annualTax / 12, color: '#EF4444' },
    { name: 'Other Deductions', value: (totalDeductions - (annualTax/12)), color: '#F97316' }
  ];

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Advanced Salary Calculator (Bangladesh)</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your take-home salary, tax, and other deductions based on the latest NBR rules.
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-12">
        <Card className="p-6 md:col-span-5">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <DollarSign className="mr-2 h-5 w-5" /> Salary & Investment Details
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label>Pay Frequency</Label>
              <Select value={payFrequency} onValueChange={setPayFrequency}>
                <SelectTrigger>
                  <SelectValue placeholder="Select frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="annual">Annually</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="grossSalary">Gross Salary</Label>
              <Input id="grossSalary" type="number" value={grossSalary} onChange={(e) => setGrossSalary(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="basicSalary">Basic Salary</Label>
              <Input id="basicSalary" type="number" value={basicSalary} onChange={(e) => setBasicSalary(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="houseRent">House Rent Allowance</Label>
              <Input id="houseRent" type="number" value={houseRent} onChange={(e) => setHouseRent(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="medical">Medical Allowance</Label>
              <Input id="medical" type="number" value={medical} onChange={(e) => setMedical(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="conveyance">Conveyance Allowance</Label>
              <Input id="conveyance" type="number" value={conveyance} onChange={(e) => setConveyance(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="festivalBonus">Festival Bonuses (Yearly)</Label>
              <Input id="festivalBonus" type="number" value={festivalBonus} onChange={(e) => setFestivalBonus(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="pfContribution">PF Contribution (% of Basic)</Label>
              <Input id="pfContribution" type="number" value={pfContribution} onChange={(e) => setPfContribution(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="investments">Total Tax-deductible Investments</Label>
              <Input id="investments" type="number" value={investments} onChange={(e) => setInvestments(Number(e.target.value))} />
            </div>

            <div>
              <Label htmlFor="otherDeductions">Other Monthly Deductions</Label>
              <Input id="otherDeductions" type="number" value={otherDeductions} onChange={(e) => setOtherDeductions(Number(e.target.value))} />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        <div className="md:col-span-7 space-y-6">
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Info className="mr-2 h-5 w-5" /> Salary Summary
            </h2>
            
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Monthly Gross</h3>
                <div className="mt-1 text-2xl font-bold">{formatCurrency(monthlyGross)}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Total Deductions</h3>
                <div className="mt-1 text-2xl font-bold">{formatCurrency(totalDeductions)}</div>
              </div>
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Monthly Take-home</h3>
                <div className="mt-1 text-2xl font-bold">{formatCurrency(netSalary)}</div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Annual Gross</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(annualGross)}</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Annual Tax</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(annualTax)}</div>
                </div>
                <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Annual Take-home</h3>
                    <div className="mt-1 text-2xl font-bold">{formatCurrency(annualNet)}</div>
                </div>
            </div>
          </Card>

          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Salary Breakdown</h2>
            <Tabs defaultValue="pie">
              <TabsList className="mb-4">
                <TabsTrigger value="pie">Pie Chart</TabsTrigger>
              </TabsList>
              <TabsContent value="pie" className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      innerRadius={80}
                      outerRadius={120}
                      paddingAngle={2}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AdvancedSalaryCalculator;
