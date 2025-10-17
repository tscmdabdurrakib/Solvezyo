import React from 'react';
import { MortgageCalculator } from '@/tools/calculation-tools/mortgage-calculator';

/**
 * MortgageCalculatorPage Component
 * 
 * Renders the mortgage calculator tool with proper page layout
 */
export default function MortgageCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <MortgageCalculator />
    </div>
  );
}
