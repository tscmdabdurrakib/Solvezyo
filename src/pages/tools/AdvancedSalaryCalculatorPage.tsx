import React from 'react';
import { AdvancedSalaryCalculator } from '@/tools/calculation-tools/advanced-salary-calculator';

/**
 * AdvancedSalaryCalculatorPage Component
 * 
 * Renders the advanced salary calculator tool with proper page layout
 */
export default function AdvancedSalaryCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <AdvancedSalaryCalculator />
    </div>
  );
}
