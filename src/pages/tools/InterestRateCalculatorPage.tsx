import React from 'react';
import { InterestRateCalculator } from '@/tools/calculation-tools/interest-rate-calculator';

/**
 * InterestRateCalculatorPage Component
 * 
 * Renders the interest rate calculator tool with proper page layout
 */
export default function InterestRateCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <InterestRateCalculator />
    </div>
  );
}
