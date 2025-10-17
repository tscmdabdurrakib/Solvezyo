import { useMemo } from 'react';
import {
  calculateTargetMonthlyExpenseAtRetirement,
  calculateTotalRequiredCorpus,
  calculateProjectedCorpus,
  calculateAdditionalMonthlySavings,
  generateProjectionGraphData,
} from '../utils/calculation';

interface PensionCalculatorInputs {
  currentAge: number;
  retirementAge: number;
  lifeExpectancy: number;
  currentAnnualIncome: number;
  currentRetirementSavings: number;
  monthlyContribution: number;
  annualContributionIncrease: number;
  preRetirementReturnRate: number;
  postRetirementReturnRate: number;
  desiredMonthlyExpense: number;
  annualInflationRate: number;
  otherMonthlyPensionIncome: number;
}

export const usePensionCalculator = (inputs: PensionCalculatorInputs) => {
  const {
    currentAge,
    retirementAge,
    lifeExpectancy,
    currentRetirementSavings,
    monthlyContribution,
    annualContributionIncrease,
    preRetirementReturnRate,
    postRetirementReturnRate,
    desiredMonthlyExpense,
    annualInflationRate,
    otherMonthlyPensionIncome,
  } = inputs;

  const targetMonthlyExpenseAtRetirement = useMemo(() =>
    calculateTargetMonthlyExpenseAtRetirement(desiredMonthlyExpense, annualInflationRate, retirementAge - currentAge),
    [desiredMonthlyExpense, annualInflationRate, retirementAge, currentAge]
  );

  const totalRequiredCorpus = useMemo(() =>
    calculateTotalRequiredCorpus(targetMonthlyExpenseAtRetirement, lifeExpectancy - retirementAge, postRetirementReturnRate, otherMonthlyPensionIncome),
    [targetMonthlyExpenseAtRetirement, lifeExpectancy, retirementAge, postRetirementReturnRate, otherMonthlyPensionIncome]
  );

  const projectedCorpus = useMemo(() =>
    calculateProjectedCorpus(
      currentRetirementSavings,
      monthlyContribution,
      annualContributionIncrease,
      preRetirementReturnRate,
      retirementAge - currentAge
    ),
    [currentRetirementSavings, monthlyContribution, annualContributionIncrease, preRetirementReturnRate, retirementAge, currentAge]
  );

  const shortfallSurplus = projectedCorpus - totalRequiredCorpus;
  const goalAchievementRatio = totalRequiredCorpus > 0 ? (projectedCorpus / totalRequiredCorpus) * 100 : 0;

  const additionalMonthlySavingsNeeded = useMemo(() => {
    if (shortfallSurplus < 0) {
      return calculateAdditionalMonthlySavings(
        Math.abs(shortfallSurplus),
        preRetirementReturnRate,
        retirementAge - currentAge
      );
    }
    return 0;
  }, [shortfallSurplus, preRetirementReturnRate, retirementAge, currentAge]);

  const projectionGraphData = useMemo(() =>
    generateProjectionGraphData(
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentRetirementSavings,
      monthlyContribution,
      annualContributionIncrease,
      preRetirementReturnRate,
      postRetirementReturnRate,
      desiredMonthlyExpense,
      annualInflationRate,
      otherMonthlyPensionIncome
    ),
    [
      currentAge,
      retirementAge,
      lifeExpectancy,
      currentRetirementSavings,
      monthlyContribution,
      annualContributionIncrease,
      preRetirementReturnRate,
      postRetirementReturnRate,
      desiredMonthlyExpense,
      annualInflationRate,
      otherMonthlyPensionIncome,
    ]
  );

  return {
    targetMonthlyExpenseAtRetirement,
    totalRequiredCorpus,
    projectedCorpus,
    shortfallSurplus,
    goalAchievementRatio,
    additionalMonthlySavingsNeeded,
    projectionGraphData,
  };
};