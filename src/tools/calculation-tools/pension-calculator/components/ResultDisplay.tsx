import React from 'react';
import { Paper, Typography, Box } from '@mui/material';

interface ResultDisplayProps {
  label: string;
  value: number;
  unit: string;
  isNegativeGood?: boolean;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ label, value, unit, isNegativeGood }) => {
  const formattedValue = value.toLocaleString('en-IN', {
    style: 'currency',
    currency: 'BDT',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  const valueColor = isNegativeGood 
    ? (value >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400') 
    : (value >= 0 ? 'text-slate-800 dark:text-slate-100' : 'text-red-600 dark:text-red-400');

  return (
    <Paper elevation={0} className="p-3 text-center bg-slate-100 dark:bg-slate-700 rounded-lg">
      <Typography variant="subtitle1" className="mb-1 text-slate-600 dark:text-slate-300 font-medium">
        {label}
      </Typography>
      <Typography variant="h5" className={`font-bold ${valueColor}`}>
        {formattedValue}
      </Typography>
    </Paper>
  );
};
