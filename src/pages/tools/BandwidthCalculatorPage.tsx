import React from 'react';
import { BandwidthCalculator } from '@/tools/calculation-tools/bandwidth-calculator';

export default function BandwidthCalculatorPage() {
  return (
    <div className="container py-8 px-4 mx-auto">
      <BandwidthCalculator />
    </div>
  );
}
