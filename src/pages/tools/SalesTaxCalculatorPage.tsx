import React from 'react';
import { SalesTaxCalculator } from '@/tools/calculation-tools/sales-tax-calculator';

/**
 * SalesTaxCalculatorPage Component
 * 
 * Renders the sales tax calculator tool with proper page layout
 */
export default function SalesTaxCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <SalesTaxCalculator />
    </div>
  );
}
