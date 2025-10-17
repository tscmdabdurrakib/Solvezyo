import React from 'react';
import { WindChillCalculator } from '@/tools/calculation-tools/wind-chill-calculator';

export default function WindChillCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <WindChillCalculator />
    </div>
  );
}
