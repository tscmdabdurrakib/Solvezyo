import React from 'react';
import { FHALoanCalculator } from '@/tools/calculation-tools/fha-loan-calculator';

export default function FHALoanCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <FHALoanCalculator />
    </div>
  );
}
