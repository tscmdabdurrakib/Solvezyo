import React from 'react';
import { TextField, InputAdornment, Typography, Box } from '@mui/material';

interface InputFieldProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  unit: string;
  type: 'number' | 'currency';
  optional?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({ label, value, onChange, unit, type, optional }) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = parseFloat(event.target.value);
    if (!isNaN(newValue)) {
      onChange(newValue);
    } else if (event.target.value === '') {
      onChange(0); // Allow clearing the input
    }
  };

  return (
    <Box className="mb-4">
      <Typography variant="subtitle1" className="mb-1 font-medium text-slate-600 dark:text-slate-300">
        {label} {optional && <Typography variant="caption">(Optional)</Typography>}
      </Typography>
      <TextField
        fullWidth
        variant="outlined"
        value={value}
        onChange={handleChange}
        type="number"
        InputProps={{
          endAdornment: <InputAdornment position="end" className="text-slate-500 dark:text-slate-400">{unit}</InputAdornment>,
          className: "rounded-md bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100",
        }}
        inputProps={{
          min: 0,
          step: type === 'currency' ? '1' : '0.1',
          className: "text-slate-900 dark:text-slate-100",
        }}
        sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.23)',
              },
              '&:hover fieldset': {
                borderColor: 'rgba(0, 0, 0, 0.87)',
              },
              '&.Mui-focused fieldset': {
                borderColor: '#1976d2',
              },
              '.dark &:not(.Mui-focused) fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.23)',
              },
              '.dark &:hover fieldset': {
                borderColor: 'rgba(255, 255, 255, 0.87)',
              },
              '.dark &.Mui-focused fieldset': {
                borderColor: '#90caf9',
              },
            },
          }}
      />
    </Box>
  );
};
