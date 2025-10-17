import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { InputField } from './components/InputField';
import { ResultDisplay } from './components/ResultDisplay';
import { useEstateTaxCalculator } from './hooks/useEstateTaxCalculator';

export const EstateTaxCalculator: React.FC = () => {
  const {
    financialAssets, setFinancialAssets,
    realEstate, setRealEstate,
    personalProperty, setPersonalProperty,
    businessInterests, setBusinessInterests,
    lifeInsurance, setLifeInsurance,
    totalLiabilities, setTotalLiabilities,
    administrativeExpenses, setAdministrativeExpenses,
    charitableBequests, setCharitableBequests,
    maritalDeduction, setMaritalDeduction,
    exemptionLimit, setExemptionLimit,
    grossEstate,
    totalDeductions,
    estimatedTax,
    netInheritance,
  } = useEstateTaxCalculator();

  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>Gross Estate Value</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField id="financialAssets" label="Financial Assets" value={financialAssets} onChange={(e) => setFinancialAssets(e.target.value)} tooltipText="Bank accounts, stocks, bonds, mutual funds, etc." />
          <InputField id="realEstate" label="Real Estate" value={realEstate} onChange={(e) => setRealEstate(e.target.value)} tooltipText="Current market value of land, houses, apartments, etc." />
          <InputField id="personalProperty" label="Personal Property" value={personalProperty} onChange={(e) => setPersonalProperty(e.target.value)} tooltipText="Jewelry, art, collectibles, and other valuable personal items." />
          <InputField id="businessInterests" label="Business Interests" value={businessInterests} onChange={(e) => setBusinessInterests(e.target.value)} tooltipText="Ownership stake in any firm or private company." />
          <InputField id="lifeInsurance" label="Life Insurance Payout" value={lifeInsurance} onChange={(e) => setLifeInsurance(e.target.value)} tooltipText="Total value of life insurance policies paid to the beneficiary." />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Deductions</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <InputField id="totalLiabilities" label="Total Liabilities & Debt" value={totalLiabilities} onChange={(e) => setTotalLiabilities(e.target.value)} tooltipText="Outstanding mortgages, personal loans, or any other payable debts." />
          <InputField id="administrativeExpenses" label="Administrative Expenses" value={administrativeExpenses} onChange={(e) => setAdministrativeExpenses(e.target.value)} tooltipText="Estimated costs for funeral, will processing, and other legal fees." />
          <InputField id="charitableBequests" label="Charitable Bequests" value={charitableBequests} onChange={(e) => setCharitableBequests(e.target.value)} tooltipText="Value of property donated to charity, which is tax-exempt." />
          <InputField id="maritalDeduction" label="Marital Deduction" value={maritalDeduction} onChange={(e) => setMaritalDeduction(e.target.value)} tooltipText="Value of property given to a spouse (often tax-exempt)." />
          <InputField id="exemptionLimit" label="Exemption Limit" value={exemptionLimit} onChange={(e) => setExemptionLimit(e.target.value)} tooltipText="The amount of estate value exempt from tax. Default is based on US federal law." />
        </CardContent>
      </Card>

      <ResultDisplay
        estimatedTax={estimatedTax}
        netInheritance={netInheritance}
        grossEstate={grossEstate}
        totalDeductions={totalDeductions}
      />

      <div className="text-sm text-gray-500">
        <p><strong>Disclaimer:</strong> This is a simplified estimate. Actual tax liability can vary based on complex laws, trusts, and local tax policies. Consult with a financial advisor for accurate planning.</p>
      </div>
    </div>
  );
};
