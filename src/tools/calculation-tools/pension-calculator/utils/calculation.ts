export interface ProjectionData {
  age: number;
  projectedCorpus: number;
  requiredCorpus: number;
}

/**
 * Calculates the target monthly expense at retirement, adjusted for inflation.
 * @param desiredMonthlyExpense Current desired monthly expense.
 * @param annualInflationRate Annual inflation rate (%).
 * @param yearsToRetirement Number of years until retirement.
 * @returns Monthly expense at retirement.
 */
export const calculateTargetMonthlyExpenseAtRetirement = (
  desiredMonthlyExpense: number,
  annualInflationRate: number,
  yearsToRetirement: number
): number => {
  if (yearsToRetirement <= 0) return desiredMonthlyExpense;
  const inflationFactor = Math.pow(1 + annualInflationRate / 100, yearsToRetirement);
  return desiredMonthlyExpense * inflationFactor;
};

/**
 * Calculates the total required corpus at retirement.
 * @param targetMonthlyExpenseAtRetirement Monthly expense needed at retirement.
 * @param yearsInRetirement Number of years in retirement (life expectancy - retirement age).
 * @param postRetirementReturnRate Post-retirement annual return rate (%).
 * @param otherMonthlyPensionIncome Other fixed monthly pension income.
 * @returns Total required corpus.
 */
export const calculateTotalRequiredCorpus = (
  targetMonthlyExpenseAtRetirement: number,
  yearsInRetirement: number,
  postRetirementReturnRate: number,
  otherMonthlyPensionIncome: number
): number => {
  const monthlyExpenseNeededFromCorpus = Math.max(0, targetMonthlyExpenseAtRetirement - otherMonthlyPensionIncome);
  if (monthlyExpenseNeededFromCorpus <= 0) return 0;

  const monthlyReturnRate = postRetirementReturnRate / 100 / 12;
  const numberOfPayments = yearsInRetirement * 12;

  if (monthlyReturnRate === 0) {
    return monthlyExpenseNeededFromCorpus * numberOfPayments;
  }

  // Present Value of an Annuity formula
  const requiredCorpus =
    (monthlyExpenseNeededFromCorpus * (1 - Math.pow(1 + monthlyReturnRate, -numberOfPayments))) / monthlyReturnRate;

  return requiredCorpus;
};

/**
 * Calculates the projected corpus at retirement.
 * @param currentRetirementSavings Current total retirement savings.
 * @param monthlyContribution Current regular monthly contribution.
 * @param annualContributionIncrease Annual increase in monthly contribution (%).
 * @param preRetirementReturnRate Pre-retirement annual return rate (%).
 * @param yearsToRetirement Number of years until retirement.
 * @returns Projected total corpus.
 */
export const calculateProjectedCorpus = (
  currentRetirementSavings: number,
  monthlyContribution: number,
  annualContributionIncrease: number,
  preRetirementReturnRate: number,
  yearsToRetirement: number
): number => {
  const annualReturnRate = preRetirementReturnRate / 100;
  const annualContributionIncreaseRate = annualContributionIncrease / 100;

  let projectedCorpus = currentRetirementSavings;
  let currentMonthlyContribution = monthlyContribution;

  for (let year = 0; year < yearsToRetirement; year++) {
    // Add annual contributions
    for (let month = 0; month < 12; month++) {
      projectedCorpus += currentMonthlyContribution;
      projectedCorpus *= (1 + annualReturnRate / 12); // Apply monthly return
    }
    // Increase contribution for next year
    currentMonthlyContribution *= (1 + annualContributionIncreaseRate);
  }

  return projectedCorpus;
};

/**
 * Calculates the additional monthly savings needed to meet the target corpus.
 * @param shortfallAmount The amount of shortfall (positive value).
 * @param preRetirementReturnRate Pre-retirement annual return rate (%).
 * @param yearsToRetirement Number of years until retirement.
 * @returns Additional monthly savings needed.
 */
export const calculateAdditionalMonthlySavings = (
  shortfallAmount: number,
  preRetirementReturnRate: number,
  yearsToRetirement: number
): number => {
  if (shortfallAmount <= 0 || yearsToRetirement <= 0) return 0;

  const monthlyReturnRate = preRetirementReturnRate / 100 / 12;
  const numberOfMonths = yearsToRetirement * 12;

  if (monthlyReturnRate === 0) {
    return shortfallAmount / numberOfMonths;
  }

  // Future Value of an Annuity formula to find payment (P)
  // FV = P * [((1 + r)^n - 1) / r]
  // P = FV * r / ((1 + r)^n - 1)
  const additionalMonthlyContribution =
    (shortfallAmount * monthlyReturnRate) / (Math.pow(1 + monthlyReturnRate, numberOfMonths) - 1);

  return additionalMonthlyContribution;
};

/**
 * Generates data for the projection graph.
 * @param currentAge Current age.
 * @param retirementAge Planned retirement age.
 * @param lifeExpectancy Life expectancy.
 * @param currentRetirementSavings Current retirement savings.
 * @param monthlyContribution Monthly contribution.
 * @param annualContributionIncrease Annual contribution increase (%).
 * @param preRetirementReturnRate Pre-retirement return rate (%).
 * @param postRetirementReturnRate Post-retirement return rate (%).
 * @param desiredMonthlyExpense Desired monthly expense.
 * @param annualInflationRate Annual inflation rate (%).
 * @param otherMonthlyPensionIncome Other monthly pension income.
 * @returns Array of projection data for each year.
 */
export const generateProjectionGraphData = (
  currentAge: number,
  retirementAge: number,
  lifeExpectancy: number,
  currentRetirementSavings: number,
  monthlyContribution: number,
  annualContributionIncrease: number,
  preRetirementReturnRate: number,
  postRetirementReturnRate: number,
  desiredMonthlyExpense: number,
  annualInflationRate: number,
  otherMonthlyPensionIncome: number
): ProjectionData[] => {
  const data: ProjectionData[] = [];
  let currentProjectedCorpus = currentRetirementSavings;
  let currentMonthlyContribution = monthlyContribution;

  // Pre-retirement phase
  for (let age = currentAge; age <= retirementAge; age++) {
    if (age > currentAge) { // Don't add contributions for current year if it's the starting age
      for (let month = 0; month < 12; month++) {
        currentProjectedCorpus += currentMonthlyContribution;
        currentProjectedCorpus *= (1 + preRetirementReturnRate / 100 / 12);
      }
      currentMonthlyContribution *= (1 + annualContributionIncrease / 100);
    }

    const yearsToRetirement = retirementAge - age;
    const targetMonthlyExpense = calculateTargetMonthlyExpenseAtRetirement(desiredMonthlyExpense, annualInflationRate, yearsToRetirement);
    const yearsInRetirement = lifeExpectancy - retirementAge;
    const requiredCorpus = calculateTotalRequiredCorpus(targetMonthlyExpense, yearsInRetirement, postRetirementReturnRate, otherMonthlyPensionIncome);

    data.push({
      age,
      projectedCorpus: currentProjectedCorpus,
      requiredCorpus: requiredCorpus,
    });
  }

  // Post-retirement phase (only for required corpus, projected corpus will deplete)
  let remainingCorpus = currentProjectedCorpus;
  for (let age = retirementAge + 1; age <= lifeExpectancy; age++) {
    const yearsInRetirement = lifeExpectancy - age;
    const yearsSinceRetirement = age - retirementAge;

    const targetMonthlyExpense = calculateTargetMonthlyExpenseAtRetirement(desiredMonthlyExpense, annualInflationRate, yearsSinceRetirement);
    const requiredCorpus = calculateTotalRequiredCorpus(targetMonthlyExpense, yearsInRetirement, postRetirementReturnRate, otherMonthlyPensionIncome);

    // Simulate corpus depletion
    if (remainingCorpus > 0) {
      const monthlyWithdrawal = Math.max(0, targetMonthlyExpense - otherMonthlyPensionIncome);
      remainingCorpus -= monthlyWithdrawal * 12; // Annual withdrawal
      remainingCorpus *= (1 + postRetirementReturnRate / 100); // Annual return
    } else {
      remainingCorpus = 0;
    }


    data.push({
      age,
      projectedCorpus: Math.max(0, remainingCorpus), // Corpus cannot be negative
      requiredCorpus: requiredCorpus,
    });
  }

  return data;
};