import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet';
import { usePensionCalculator } from './hooks/usePensionCalculator';
import { InputField } from './components/InputField';
import { ResultDisplay } from './components/ResultDisplay';
import { Box, Switch, FormControlLabel } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Container, Typography, Paper } from '@mui/material';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ChartOptions } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const PensionCalculator: React.FC = () => {
  const theme = useTheme();
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [currentAnnualIncome, setCurrentAnnualIncome] = useState(50000);
  const [currentRetirementSavings, setCurrentRetirementSavings] = useState(100000);
  const [monthlyContribution, setMonthlyContribution] = useState(500);
  const [annualContributionIncrease, setAnnualContributionIncrease] = useState(3);
  const [preRetirementReturnRate, setPreRetirementReturnRate] = useState(8);
  const [postRetirementReturnRate, setPostRetirementReturnRate] = useState(5);
  const [desiredMonthlyExpense, setDesiredMonthlyExpense] = useState(2000);
  const [annualInflationRate, setAnnualInflationRate] = useState(4);
  const [otherMonthlyPensionIncome, setOtherMonthlyPensionIncome] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const {
    targetMonthlyExpenseAtRetirement,
    totalRequiredCorpus,
    projectedCorpus,
    shortfallSurplus,
    goalAchievementRatio,
    additionalMonthlySavingsNeeded,
    projectionGraphData
  } = usePensionCalculator({
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentAnnualIncome,
    currentRetirementSavings,
    monthlyContribution,
    annualContributionIncrease,
    preRetirementReturnRate,
    postRetirementReturnRate,
    desiredMonthlyExpense,
    annualInflationRate,
    otherMonthlyPensionIncome,
  });

  const chartData = useMemo(() => ({
    labels: projectionGraphData.map((data: { age: number; }) => data.age.toString()),
    datasets: [
      {
        label: 'Projected Corpus',
        data: projectionGraphData.map((data: { projectedCorpus: number; }) => data.projectedCorpus),
        borderColor: '#4CAF50',
        backgroundColor: 'rgba(76, 175, 80, 0.2)',
        fill: true,
        tension: 0.4,
      },
      {
        label: 'Required Corpus',
        data: projectionGraphData.map((data: { requiredCorpus: number; }) => data.requiredCorpus),
        borderColor: '#F44336',
        backgroundColor: 'rgba(244, 67, 54, 0.2)',
        fill: true,
        tension: 0.4,
      },
    ],
  }), [projectionGraphData]);

  const chartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: theme.palette.text.primary,
          font: {
            size: 14,
          }
        }
      },
      title: {
        display: true,
        text: 'Retirement Corpus Projection',
        color: theme.palette.text.primary,
        font: {
            size: 18,
            weight: 'bold' as const,
        }
      },
      tooltip: {
        callbacks: {
            label: function(context: any) {
                let label = context.dataset.label || '';
                if (label) {
                    label += ': ';
                }
                if (context.parsed.y !== null) {
                    label += new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT' }).format(context.parsed.y);
                }
                return label;
            }
        }
      }
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Age',
          color: theme.palette.text.secondary,
        },
        ticks: {
          color: theme.palette.text.secondary,
        },
        grid: {
          color: theme.palette.divider,
        },
      },
      y: {
        title: {
          display: true,
          text: 'Amount (BDT)',
          color: theme.palette.text.secondary,
        },
        ticks: {
          color: theme.palette.text.secondary,
          callback: function(value: any) {
            return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'BDT', notation: 'compact' }).format(value);
          }
        },
        grid: {
          color: theme.palette.divider,
        },
      },
    },
  };

  return (
    <Container maxWidth="lg" className="py-4 bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
      <Helmet>
        <title>Retirement Savings & Pension Calculator</title>
        <meta name="description" content="A modern and intuitive calculator to help you plan your retirement savings and pension needs." />
      </Helmet>
      <Typography variant="h4" component="h1" gutterBottom align="center" className="font-bold text-slate-800 dark:text-slate-100 mb-4">
        Retirement Savings & Pension Calculator
      </Typography>
      
      <Paper elevation={0} className="p-4 mb-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <Box className="flex flex-wrap gap-4">
            <Box className="flex-1 min-w-[300px]">
                <Typography variant="h6" gutterBottom className="font-bold text-slate-700 dark:text-slate-300">
                Current Status
                </Typography>
                <InputField label="Current Age" value={currentAge} onChange={setCurrentAge} unit="Years" type="number" />
                <InputField label="Planned Retirement Age" value={retirementAge} onChange={setRetirementAge} unit="Years" type="number" />
                <InputField label="Life Expectancy" value={lifeExpectancy} onChange={setLifeExpectancy} unit="Years" type="number" />
                <InputField label="Current Annual Income" value={currentAnnualIncome} onChange={setCurrentAnnualIncome} unit="BDT" type="currency" />
                <InputField label="Current Retirement Savings" value={currentRetirementSavings} onChange={setCurrentRetirementSavings} unit="BDT" type="currency" />
            </Box>
            <Box className="flex-1 min-w-[300px]">
                <Typography variant="h6" gutterBottom className="font-bold text-slate-700 dark:text-slate-300">
                Investment & Contribution
                </Typography>
                <InputField label="Monthly Contribution" value={monthlyContribution} onChange={setMonthlyContribution} unit="BDT" type="currency" />
                <InputField label="Desired Monthly Expense in Retirement" value={desiredMonthlyExpense} onChange={setDesiredMonthlyExpense} unit="BDT" type="currency" />
                <InputField label="Other Monthly Pension Income" value={otherMonthlyPensionIncome} onChange={setOtherMonthlyPensionIncome} unit="BDT" type="currency" optional />
                
                <FormControlLabel
                control={<Switch checked={showAdvanced} onChange={() => setShowAdvanced(!showAdvanced)} />}
                label="Show Advanced Options"
                className="mt-2"
                />
                {showAdvanced && (
                <Box className="mt-2 p-2 bg-slate-100 dark:bg-slate-700 rounded-md">
                    <InputField label="Annual Contribution Increase" value={annualContributionIncrease} onChange={setAnnualContributionIncrease} unit="%" type="number" />
                    <InputField label="Pre-Retirement Return Rate" value={preRetirementReturnRate} onChange={setPreRetirementReturnRate} unit="%" type="number" />
                    <InputField label="Post-Retirement Return Rate" value={postRetirementReturnRate} onChange={setPostRetirementReturnRate} unit="%" type="number" />
                    <InputField label="Annual Inflation Rate" value={annualInflationRate} onChange={setAnnualInflationRate} unit="%" type="number" />
                </Box>
                )}
            </Box>
        </Box>
      </Paper>

      <Paper elevation={0} className="p-4 mb-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <Typography variant="h5" component="h2" gutterBottom align="center" className="font-bold text-slate-800 dark:text-slate-100 mb-3">
          Core Output & Analysis
        </Typography>
        <Box className="flex flex-wrap gap-3 justify-center">
            <Box className="flex-1 max-w-xs">
                <ResultDisplay label="Total Required Corpus" value={totalRequiredCorpus} unit="BDT" />
            </Box>
            <Box className="flex-1 max-w-xs">
                <ResultDisplay label="Projected Corpus" value={projectedCorpus} unit="BDT" />
            </Box>
            <Box className="flex-1 max-w-xs">
                <ResultDisplay label="Shortfall / Surplus" value={shortfallSurplus} unit="BDT" isNegativeGood />
            </Box>
        </Box>
        {additionalMonthlySavingsNeeded > 0 && (
          <Box className="mt-3 p-2 bg-amber-100 dark:bg-amber-900 rounded-md text-center">
            <Typography variant="h6" className="text-amber-800 dark:text-amber-200">
              You need to save an additional {additionalMonthlySavingsNeeded.toLocaleString('en-IN', { style: 'currency', currency: 'BDT' })} per month to reach your goal.
            </Typography>
          </Box>
        )}
      </Paper>

      <Paper elevation={0} className="p-4 mb-4 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800">
        <Typography variant="h5" component="h2" gutterBottom align="center" className="font-bold text-slate-800 dark:text-slate-100 mb-3">
          Projection Graph
        </Typography>
        <Box className="h-96">
          <Line data={chartData} options={chartOptions} />
        </Box>
      </Paper>

      <Box className="mt-4 p-2">
        <Typography variant="body2" className="text-slate-600 dark:text-slate-400 text-center">
          Disclaimer: This is a financial estimation only, and actual results may vary depending on market risks, interest rate changes, and personal circumstances.
        </Typography>
      </Box>
    </Container>
  );
};

export default PensionCalculator;
