import React from 'react';
import CompoundInterestCalculator from '../../tools/calculation/compound-interest-calculator';

const CompoundInterestCalculatorPage: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white">Compound Interest Calculator</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Calculate the future value of your investment with the power of compound interest.
        </p>
      </header>
      <div className="max-w-4xl mx-auto">
        <CompoundInterestCalculator />
      </div>
    </div>
  );
};

export default CompoundInterestCalculatorPage;
