import React from 'react';
import { HeatIndexCalculator } from '@/tools/calculation-tools/heat-index-calculator';

export default function HeatIndexCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <HeatIndexCalculator />
    </div>
  );
}
