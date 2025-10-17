import React from 'react';
import IncomeTaxCalculator from '../../tools/calculation/income-tax-calculator';

const IncomeTaxCalculatorPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Income Tax Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Estimate your income tax liability with this simple and intuitive calculator.
        </p>
      </header>
      <div className="max-w-2xl mx-auto">
        <IncomeTaxCalculator />
      </div>
    </div>
  );
};

export default IncomeTaxCalculatorPage;
