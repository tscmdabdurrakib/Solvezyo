import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface ResultDisplayProps {
  estimatedTax: number;
  netInheritance: number;
  grossEstate: number;
  totalDeductions: number;
  currencySymbol?: string;
}

const COLORS = ['#FF8042', '#0088FE', '#00C49F'];

export const ResultDisplay: React.FC<ResultDisplayProps> = ({
  estimatedTax,
  netInheritance,
  grossEstate,
  totalDeductions,
  currencySymbol = '$',
}) => {
  const pieData = [
    { name: 'Estimated Tax', value: estimatedTax },
    { name: 'Debts & Expenses', value: totalDeductions },
    { name: 'Net Inheritance', value: netInheritance },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle>Calculation Results</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="text-lg font-semibold">Estimated Estate Tax Due:</p>
            <p className="text-2xl">{`${currencySymbol}${estimatedTax.toLocaleString()}`}</p>
            <p className="text-lg font-semibold mt-4">Net Inheritance Value:</p>
            <p className="text-2xl">{`${currencySymbol}${netInheritance.toLocaleString()}`}</p>
          </div>
          <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
