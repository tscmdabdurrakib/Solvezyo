import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

type FilingStatus = 'single' | 'mfj' | 'mfs';

interface Results {
  mfjTax: number;
  mfsTax: number;
  singleTax: number;
  marriageBenefit: number;
  optimalStatus: string;
  savings: number;
}

const MarriageTaxCalculator: React.FC = () => {
  const [taxYear, setTaxYear] = useState<keyof typeof taxBrackets>(2024);
  const [spouseAIncome, setSpouseAIncome] = useState('');
  const [spouseBIncome, setSpouseBIncome] = useState('');
  const [adjustmentsA, setAdjustmentsA] = useState('');
  const [adjustmentsB, setAdjustmentsB] = useState('');
  const [deductionMethod, setDeductionMethod] = useState('standard');
  const [itemizedDeductions, setItemizedDeductions] = useState('');
  const [stateTaxRate, setStateTaxRate] = useState('');
  const [results, setResults] = useState<Results | null>(null);

  const taxBrackets = {
    2024: {
      single: [
        { rate: 0.10, income: 11600 },
        { rate: 0.12, income: 47150 },
        { rate: 0.22, income: 100525 },
        { rate: 0.24, income: 191950 },
        { rate: 0.32, income: 243725 },
        { rate: 0.35, income: 609350 },
        { rate: 0.37, income: Infinity },
      ],
      mfj: [
        { rate: 0.10, income: 23200 },
        { rate: 0.12, income: 94300 },
        { rate: 0.22, income: 201050 },
        { rate: 0.24, income: 383900 },
        { rate: 0.32, income: 487450 },
        { rate: 0.35, income: 731200 },
        { rate: 0.37, income: Infinity },
      ],
      mfs: [
        { rate: 0.10, income: 11600 },
        { rate: 0.12, income: 47150 },
        { rate: 0.22, income: 100525 },
        { rate: 0.24, income: 191950 },
        { rate: 0.32, income: 243725 },
        { rate: 0.35, income: 365600 },
        { rate: 0.37, income: Infinity },
      ],
    },
  };

  const standardDeductions = {
    2024: {
      single: 14600,
      mfj: 29200,
      mfs: 14600,
    },
  };

  const calculateTax = (income: number, status: FilingStatus): number => {
    const brackets = taxBrackets[taxYear][status];
    let tax = 0;
    let remainingIncome = income;
    let lastBracketLimit = 0;

    for (const bracket of brackets) {
      if (remainingIncome <= 0) break;

      const taxableInBracket = Math.min(remainingIncome, bracket.income - lastBracketLimit);
      tax += taxableInBracket * bracket.rate;
      remainingIncome -= taxableInBracket;
      lastBracketLimit = bracket.income;
    }
    return tax;
  };

  useEffect(() => {
    const incomeA = parseFloat(spouseAIncome) || 0;
    const incomeB = parseFloat(spouseBIncome) || 0;
    const adjA = parseFloat(adjustmentsA) || 0;
    const adjB = parseFloat(adjustmentsB) || 0;
    const itemized = parseFloat(itemizedDeductions) || 0;
    const stateRate = parseFloat(stateTaxRate) || 0;

    if (incomeA <= 0 && incomeB <= 0) {
      setResults(null);
      return;
    }

    const agiA = incomeA - adjA;
    const agiB = incomeB - adjB;
    const combinedAgi = agiA + agiB;

    const deduction = deductionMethod === 'standard' ? standardDeductions[taxYear].mfj : itemized;

    // Scenario A: Married Filing Jointly (MFJ)
    const taxableMfj = Math.max(0, combinedAgi - deduction);
    const federalMfjTax = calculateTax(taxableMfj, 'mfj');
    const stateMfjTax = taxableMfj * (stateRate / 100);
    const totalMfjTax = federalMfjTax + stateMfjTax;

    // Scenario B: Married Filing Separately (MFS)
    const deductionMfs = deductionMethod === 'standard' ? standardDeductions[taxYear].mfs : itemized / 2;
    const taxableMfsA = Math.max(0, agiA - deductionMfs);
    const taxableMfsB = Math.max(0, agiB - deductionMfs);
    const federalMfsTax = calculateTax(taxableMfsA, 'mfs') + calculateTax(taxableMfsB, 'mfs');
    const stateMfsTax = (taxableMfsA + taxableMfsB) * (stateRate / 100);
    const totalMfsTax = federalMfsTax + stateMfsTax;

    // Scenario C: Both Filed as Single (Simulated)
    const deductionSingle = standardDeductions[taxYear].single;
    const taxableSingleA = Math.max(0, agiA - deductionSingle);
    const taxableSingleB = Math.max(0, agiB - deductionSingle);
    const federalSingleTax = calculateTax(taxableSingleA, 'single') + calculateTax(taxableSingleB, 'single');
    const stateSingleTax = (taxableSingleA + taxableSingleB) * (stateRate / 100);
    const totalSingleTax = federalSingleTax + stateSingleTax;

    const marriageBenefit = totalSingleTax - totalMfjTax;
    const optimalStatus = totalMfjTax <= totalMfsTax ? 'Married Filing Jointly' : 'Married Filing Separately';
    const savings = Math.abs(totalMfjTax - totalMfsTax);

    setResults({
      mfjTax: totalMfjTax,
      mfsTax: totalMfsTax,
      singleTax: totalSingleTax,
      marriageBenefit,
      optimalStatus,
      savings,
    });
  }, [taxYear, spouseAIncome, spouseBIncome, adjustmentsA, adjustmentsB, deductionMethod, itemizedDeductions, stateTaxRate]);

  const handleExport = () => {
    if (!results) return;

    const headers = ["Scenario", "Total Tax"];
    const rows = [
      ["Married Filing Jointly", results.mfjTax],
      ["Married Filing Separately", results.mfsTax],
      ["Simulated Single", results.singleTax],
      [],
      ["Marriage Impact", results.marriageBenefit > 0 ? "Benefit" : "Penalty"],
      ["Amount", Math.abs(results.marriageBenefit)],
      [],
      ["Optimal Filing Status", results.optimalStatus],
      ["Savings", results.savings]
    ];

    let csvContent = "data:text/csv;charset=utf-8,"
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "marriage_tax_impact_results.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };


  return (
    <div className="max-w-4xl mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6 dark:text-white">Marriage Tax Impact Calculator</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Inputs Column */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Inputs</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="taxYear" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Tax Year</label>
              <select id="taxYear" value={taxYear} onChange={(e) => setTaxYear(Number(e.target.value) as keyof typeof taxBrackets)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                <option value={2024}>2024</option>
              </select>
            </div>
            <div>
              <label htmlFor="spouseAIncome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Spouse A Gross Income</label>
              <input type="number" id="spouseAIncome" value={spouseAIncome} onChange={(e) => setSpouseAIncome(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g., 60000" />
            </div>
            <div>
              <label htmlFor="spouseBIncome" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Spouse B Gross Income</label>
              <input type="number" id="spouseBIncome" value={spouseBIncome} onChange={(e) => setSpouseBIncome(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g., 80000" />
            </div>
            <div>
              <label htmlFor="adjustmentsA" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adjustments (Spouse A)</label>
              <input type="number" id="adjustmentsA" value={adjustmentsA} onChange={(e) => setAdjustmentsA(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g., IRA contributions" />
            </div>
            <div>
              <label htmlFor="adjustmentsB" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Adjustments (Spouse B)</label>
              <input type="number" id="adjustmentsB" value={adjustmentsB} onChange={(e) => setAdjustmentsB(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g., Student loan interest" />
            </div>
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Deductions</h3>
            <div className="mt-2 space-y-2">
              <div className="flex items-center">
                <input id="standardDeduction" name="deductionMethod" type="radio" value="standard" checked={deductionMethod === 'standard'} onChange={() => setDeductionMethod('standard')} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="standardDeduction" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Standard Deduction</label>
              </div>
              <div className="flex items-center">
                <input id="itemizedDeduction" name="deductionMethod" type="radio" value="itemized" checked={deductionMethod === 'itemized'} onChange={() => setDeductionMethod('itemized')} className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300" />
                <label htmlFor="itemizedDeduction" className="ml-3 block text-sm font-medium text-gray-700 dark:text-gray-300">Itemized Deductions</label>
              </div>
            </div>
            {deductionMethod === 'itemized' && (
              <div className="mt-4">
                <label htmlFor="itemizedDeductions" className="block text-sm font-medium text-gray-700 dark:text-gray-300">Total Itemized Deductions</label>
                <input type="number" id="itemizedDeductions" value={itemizedDeductions} onChange={(e) => setItemizedDeductions(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" />
              </div>
            )}
          </div>

          <div className="mt-6">
            <label htmlFor="stateTaxRate" className="block text-sm font-medium text-gray-700 dark:text-gray-300">State Income Tax Rate (%) (Optional)</label>
            <input type="number" id="stateTaxRate" value={stateTaxRate} onChange={(e) => setStateTaxRate(e.target.value)} className="mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white" placeholder="e.g., 5" />
          </div>

        </div>

        {/* Results Column */}
        <div className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Results</h2>
          {results ? (
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Total Tax Liability</h3>
                <ul className="list-disc list-inside space-y-1 mt-2 dark:text-gray-300">
                  <li>Married Filing Jointly: <span className="font-semibold">{formatCurrency(results.mfjTax)}</span></li>
                  <li>Married Filing Separately: <span className="font-semibold">{formatCurrency(results.mfsTax)}</span></li>
                  <li>Simulated Single: <span className="font-semibold">{formatCurrency(results.singleTax)}</span></li>
                </ul>
              </div>
              <div className="mt-6">
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Visual Comparison</h3>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={[
                    { name: 'MFJ', 'Total Tax': results.mfjTax },
                    { name: 'MFS', 'Total Tax': results.mfsTax },
                    { name: 'Single', 'Total Tax': results.singleTax },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis tickFormatter={(tick) => formatCurrency(tick)} />
                    <Tooltip formatter={(value) => formatCurrency(value as number)} />
                    <Legend />
                    <Bar dataKey="Total Tax" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Marriage Impact Score</h3>
                <p className={`text-xl font-bold ${results.marriageBenefit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {results.marriageBenefit > 0 ? `Tax Savings: ${formatCurrency(results.marriageBenefit)}` : `Tax Penalty: ${formatCurrency(Math.abs(results.marriageBenefit))}`}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">(Compared to filing as two single individuals)</p>
              </div>
              <div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Optimal Filing Status</h3>
                <p className="text-xl font-bold text-indigo-600">{results.optimalStatus}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400">You save {formatCurrency(results.savings)} by choosing this status.</p>
              </div>
               <div className="mt-6">
                 <button onClick={handleExport} className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                   Export to CSV
                 </button>
               </div>
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">Enter your financial details to see the results.</p>
          )}
        </div>
      </div>

      <div className="mt-6 p-4 bg-yellow-100 border-l-4 border-yellow-500 text-yellow-700 dark:bg-yellow-900 dark:border-yellow-600 dark:text-yellow-200">
        <p><span className="font-bold">Disclaimer:</span> The results are estimates and do not account for all tax credits (e.g., Child Tax Credit, EIC), which can significantly impact the final tax due. Consult a tax professional for personalized advice.</p>
      </div>
    </div>
  );
};

export default MarriageTaxCalculator;
