import React from 'react';
import { EstateTaxCalculator } from '@/tools/calculation-tools/estate-tax-calculator';

/**
 * EstateTaxCalculatorPage Component
 * 
 * Renders the estate tax calculator tool with proper page layout
 */
export default function EstateTaxCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <EstateTaxCalculator />
    </div>
  );
}
