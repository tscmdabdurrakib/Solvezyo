import React from 'react';
import { Professional401KCalculator } from '@/tools/calculation-tools/401k-calculator';

/**
 * Professional401KCalculatorPage Component
 * 
 * Renders the 401K calculator tool with proper page layout
 */
export default function Professional401KCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <Professional401KCalculator />
    </div>
  );
}
