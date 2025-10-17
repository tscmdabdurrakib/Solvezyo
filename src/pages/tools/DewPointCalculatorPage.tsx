import React from 'react';
import { DewPointCalculator } from '@/tools/calculation-tools/dew-point-calculator';

export default function DewPointCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <DewPointCalculator />
    </div>
  );
}
