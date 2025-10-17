import React from "react";
import { categories } from "../categories";
import { Tool } from "./types";

function getCategoryById(id: string) {
  return categories.find((cat) => cat.id === id) || categories[0];
}

// Helper function to create SVG icons
function createIcon(pathD: string) {
  return React.createElement(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: "2",
      className: "h-6 w-6",
    },
    React.createElement("path", {
      strokeLinecap: "round",
      strokeLinejoin: "round",
      d: pathD,
    }),
  );
}

export const calculationTools: Tool[] = [
{  id: "day-counter",
    name: "Day Counter",
    description: "Calculate the number of days between two dates with precision",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ),
    views: 0,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Calculate exact days between dates",
      "View results in weeks, months, and years",
      "Include or exclude end date option",
      "Swap dates instantly",
      "Real-time calculation updates",
      "Copy results to clipboard",
      "Responsive design for all devices"
    ],
  },
{  id: "day-of-week-calculator",
    name: "Day of the Week Calculator",
    description: "Find out what day of the week any date falls on",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ),
    views: 0,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Determine day of week for any date",
      "Historical dates from 1900 onwards",
      "Quick jump to next specific weekday",
      "Week number and day of year info",
      "Days remaining in year calculation",
      "Copy results to clipboard",
      "Clean modern interface"
    ],
  },
{  id: "loan-calculator",
    name: "Loan Calculator",
    description: "Calculate monthly loan payments, total interest, and amortization",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 0,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate periodic loan payments",
      "Multiple payment frequency options",
      "Amortization formula calculations",
      "Total interest paid over loan term",
      "Real-time calculation updates",
      "Copy results to clipboard",
      "Support for all loan types"
    ],
  },
{  id: "auto-loan-calculator",
    name: "Auto Loan Calculator",
    description: "Calculate car loan payments with trade-in, down payment, and sales tax",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
    ),
    views: 0,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate monthly auto loan payments",
      "Include trade-in value and amount owed",
      "Sales tax calculations included",
      "Down payment support",
      "Net trade-in value calculation",
      "Total cost with tax breakdown",
      "Multiple loan term options"
    ],
  },
{  id: "interest-calculator",
    name: "Interest Calculator",
    description: "Calculate compound or simple interest on investments and savings",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    ),
    views: 0,
    gradient: "from-green-600 to-teal-600",
    features: [
      "Compound and simple interest calculations",
      "Multiple compounding frequencies",
      "Future value projections",
      "Total interest earned tracking",
      "Return percentage analysis",
      "Real-time calculation updates",
      "Investment growth visualization"
    ],
  },
{  id: "payment-calculator",
    name: "Payment Calculator",
    description: "Calculate periodic loan payments with flexible payment schedules",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    ),
    views: 0,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Calculate periodic payment amounts",
      "Weekly to annual payment frequencies",
      "Total amount paid calculation",
      "Total interest breakdown",
      "Number of payments tracking",
      "Real-time updates as you type",
      "Flexible loan term options"
    ],
  },
{  id: "retirement-calculator",
    name: "Retirement Calculator",
    description: "Plan retirement savings and estimate future income with employer match",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    ),
    views: 0,
    gradient: "from-emerald-600 to-teal-600",
    features: [
      "Calculate retirement savings projections",
      "Employer 401(k) match included",
      "Inflation-adjusted income estimates",
      "Compound growth calculations",
      "Investment return tracking",
      "Total contributions breakdown",
      "Years to retirement planning"
    ],
  },
{  id: "mortgage-calculator",
    name: "Mortgage Calculator",
    description: "Calculate monthly mortgage payments, interest, and view payment breakdowns",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    ),
    views: 12862,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate monthly mortgage payments",
      "Visualize payment breakdowns with charts",
      "Adjust loan amount, interest rate, and term",
      "Include optional down payment",
      "See total interest paid over the loan term",
      "Interactive sliders for easy adjustments",
      "Responsive design for all devices"
    ],
  },
{
    id: "social-security-calculator",
    name: "Social Security Calculator",
    description: "Estimate Social Security retirement benefits based on earnings and retirement age",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    ),
    views: 8420,
    gradient: "from-emerald-600 to-teal-600",
    features: [
      "Calculate estimated monthly Social Security benefits",
      "Compare benefits at different retirement ages",
      "Visualize break-even age scenarios",
      "Account for full retirement age adjustments",
      "Factor in early and delayed retirement credits",
      "Real-time benefit calculations",
      "Responsive mobile-friendly interface"
    ],
  },
{
    id: "annuity-calculator",
    name: "Annuity Calculator",
    description: "Calculate future value of annuity investments with regular contributions",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 7234,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Calculate annuity future value",
      "Support for ordinary and annuity due types",
      "Multiple payment frequencies",
      "Interactive growth projections",
      "Visual breakdown of contributions vs interest",
      "Real-time compounding calculations",
      "Comprehensive charts and graphs"
    ],
  },
{
    id: "annuity-payout-calculator",
    name: "Annuity Payout Calculator",
    description: "Calculate periodic payouts from annuities for retirement planning",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    ),
    views: 6789,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "Calculate annuity payout amounts",
      "Multiple payout frequency options",
      "Inflation-adjusted projections",
      "Balance depletion timeline",
      "Interest earned tracking",
      "Retirement income planning",
      "Visual payout schedules"
    ],
  },
{
    id: "credit-card-calculator",
    name: "Credit Card Calculator",
    description: "Calculate credit card payoff time and total interest costs",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    ),
    views: 9876,
    gradient: "from-red-600 to-orange-600",
    features: [
      "Calculate payoff timeline for credit card debt",
      "See total interest paid over time",
      "Compare minimum vs higher payments",
      "Visual payment timeline charts",
      "APR impact analysis",
      "Annual fee calculations",
      "Debt-free date projection"
    ],
  },
{
    id: "credit-cards-payoff-calculator",
    name: "Credit Cards Payoff Calculator",
    description: "Compare debt payoff strategies for multiple credit cards",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    ),
    views: 7543,
    gradient: "from-orange-600 to-amber-600",
    features: [
      "Manage multiple credit cards",
      "Compare avalanche vs snowball methods",
      "Optimize payoff strategy",
      "Track total debt reduction",
      "Visualize debt-free timeline",
      "Interest savings calculations",
      "Custom payment allocations"
    ],
  },
{
    id: "debt-payoff-calculator",
    name: "Debt Payoff Calculator",
    description: "Calculate debt payoff timeline with extra payment impact",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
    ),
    views: 8234,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Calculate debt payoff timeline",
      "See impact of extra payments",
      "Interest savings visualization",
      "Flexible payment scenarios",
      "Total cost projections",
      "Real-time calculation updates",
      "Comprehensive debt analysis"
    ],
  },
{
    id: "debt-consolidation-calculator",
    name: "Debt Consolidation Calculator",
    description: "Compare current debts vs consolidated loan savings",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    ),
    views: 6543,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Compare current vs consolidated debt",
      "Calculate potential interest savings",
      "Simplified payment analysis",
      "Multiple debt tracking",
      "Loan term optimization",
      "Visual savings comparison",
      "Monthly payment reduction calculator"
    ],
  },
{
    id: "repayment-calculator",
    name: "Repayment Calculator",
    description: "Calculate loan repayment schedules for any installment loan",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 7123,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Calculate loan payment amounts",
      "Flexible payment frequencies",
      "Amortization schedule visualization",
      "Principal vs interest breakdown",
      "Total interest calculations",
      "Loan term comparisons",
      "Interactive charts and graphs"
    ],
  },
{
    id: "student-loan-calculator",
    name: "Student Loan Calculator",
    description: "Calculate student loan repayments with different plans",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
    ),
    views: 8765,
    gradient: "from-violet-600 to-purple-600",
    features: [
      "Calculate student loan payments",
      "Compare repayment plan options",
      "Account for grace periods",
      "Visualize payoff timeline",
      "Standard, graduated, and extended plans",
      "Total interest cost analysis",
      "Loan forgiveness planning"
    ],
  },
{
    id: "college-cost-calculator",
    name: "College Cost Calculator",
    description: "Estimate total college costs and plan financing strategy",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    ),
    views: 6234,
    gradient: "from-amber-600 to-yellow-600",
    features: [
      "Calculate total college costs",
      "Account for tuition inflation",
      "Factor in scholarships and grants",
      "Savings contribution planning",
      "Loan requirement projections",
      "ROI analysis for education investment",
      "Yearly cost breakdown visualization"
    ],
  },
{
    id: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    description: "Calculate simple interest on loans and investments with ease",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 5432,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Calculate simple interest quickly",
      "Support for multiple time units",
      "Real-time calculation updates",
      "Copy results to clipboard",
      "Clean modern interface",
      "Mobile-friendly design"
    ],
  },
{
    id: "cd-calculator",
    name: "CD Calculator",
    description: "Calculate Certificate of Deposit returns with compound interest",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    ),
    views: 4876,
    gradient: "from-green-500 to-emerald-500",
    features: [
      "Calculate CD maturity value",
      "Multiple compounding frequencies",
      "APY calculation included",
      "Country-specific rates",
      "Interactive sliders",
      "Visual breakdowns"
    ],
  },
{
    id: "bond-calculator",
    name: "Bond Calculator",
    description: "Calculate bond valuation, yield to maturity, and current yield",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    ),
    views: 4123,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Bond valuation calculations",
      "Current yield analysis",
      "Yield to maturity estimation",
      "Premium and discount bonds",
      "Coupon payment tracking",
      "Fixed-income investment planning"
    ],
  },
{
    id: "roth-ira-calculator",
    name: "Roth IRA Calculator",
    description: "Plan tax-free retirement savings with Roth IRA projections",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 6543,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Tax-free growth projections",
      "Contribution limit tracking",
      "Age-based calculations",
      "Growth visualization charts",
      "No RMD benefits",
      "Retirement income planning"
    ],
  },
{
    id: "ira-calculator",
    name: "IRA Calculator",
    description: "Calculate Traditional IRA growth with tax-deferred savings",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    ),
    views: 5987,
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Tax-deferred growth calculations",
      "Pre-tax and after-tax projections",
      "RMD age consideration",
      "Contribution limits by age",
      "Tax savings estimation",
      "Retirement planning tools"
    ],
  },
{
    id: "rmd-calculator",
    name: "RMD Calculator",
    description: "Calculate Required Minimum Distributions from retirement accounts",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    ),
    views: 3876,
    gradient: "from-orange-500 to-red-500",
    features: [
      "IRS table-based calculations",
      "Age-specific requirements",
      "Spouse beneficiary adjustments",
      "Penalty avoidance planning",
      "Annual RMD tracking",
      "Tax implications guidance"
    ],
  },
{
    id: "vat-calculator",
    name: "VAT Calculator",
    description: "Calculate Value Added Tax for goods and services worldwide",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 4234,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Add or remove VAT",
      "Country-specific rates",
      "Custom VAT percentages",
      "Instant calculations",
      "Net and gross amounts",
      "Business tax planning"
    ],
  },
{
    id: "cash-back-or-low-interest-calculator",
    name: "Cash Back or Low Interest Calculator",
    description: "Compare cash back rebates vs low interest financing options",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    ),
    views: 3654,
    gradient: "from-pink-500 to-rose-500",
    features: [
      "Compare financing options",
      "Total cost analysis",
      "Savings calculations",
      "Monthly payment comparison",
      "Interest vs rebate evaluation",
      "Best deal recommendation"
    ],
  },
{
    id: "auto-lease-calculator",
    name: "Auto Lease Calculator",
    description: "Calculate monthly auto lease payments and total lease costs",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"
    ),
    views: 5123,
    gradient: "from-violet-500 to-purple-500",
    features: [
      "Monthly lease payment calculation",
      "Money factor to APR conversion",
      "Residual value analysis",
      "Cap reduction options",
      "Acquisition fee inclusion",
      "Sales tax calculations"
    ],
  },
{
    id: "depreciation-calculator",
    name: "Depreciation Calculator",
    description: "Calculate asset depreciation using multiple accounting methods",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
    ),
    views: 3987,
    gradient: "from-red-500 to-orange-500",
    features: [
      "Straight-line depreciation",
      "Declining balance method",
      "Double declining balance",
      "Sum of years' digits",
      "Depreciation schedule",
      "Book value tracking"
    ],
  },
{
    id: "z-score-calculator",
    name: "Z-Score Calculator",
    description: "Calculate standard scores and percentiles for statistical analysis",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 4521,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate Z-scores from raw values",
      "Percentile calculations",
      "Standard deviation analysis",
      "Statistical significance testing",
      "Real-time results",
      "Outlier detection"
    ],
  },
{
    id: "confidence-interval-calculator",
    name: "Confidence Interval Calculator",
    description: "Calculate statistical confidence intervals for population estimates",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ),
    views: 3876,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate confidence intervals",
      "Multiple confidence levels (90%, 95%, 99%)",
      "Margin of error calculation",
      "Sample size support",
      "Z-score based calculations",
      "Statistical estimation"
    ],
  },
{
    id: "ratio-calculator",
    name: "Ratio Calculator",
    description: "Calculate and simplify ratios between two values",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
    ),
    views: 5234,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Simplify ratios to lowest terms",
      "Calculate GCD automatically",
      "Decimal and percentage forms",
      "Swap values instantly",
      "Parts of total calculations",
      "Real-time simplification"
    ],
  },
{
    id: "distance-calculator",
    name: "Distance Calculator",
    description: "Calculate distance between two points in 2D or 3D space",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    ),
    views: 4678,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "2D and 3D distance calculations",
      "Pythagorean theorem application",
      "Midpoint calculation",
      "Coordinate system support",
      "Distance components breakdown",
      "Navigation and geometry"
    ],
  },
{
    id: "circle-calculator",
    name: "Circle Calculator",
    description: "Calculate area, circumference, and diameter of a circle",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    ),
    views: 6123,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Calculate circumference from radius",
      "Calculate area using πr²",
      "Diameter and radius conversion",
      "Sector and arc calculations",
      "Semicircle properties",
      "Precise π calculations"
    ],
  },
{
    id: "surface-area-calculator",
    name: "Surface Area Calculator",
    description: "Calculate surface area and volume for 3D shapes",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    ),
    views: 5432,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Cube surface area",
      "Rectangular prism calculations",
      "Sphere surface area (4πr²)",
      "Cylinder and cone support",
      "Volume calculations included",
      "Multiple 3D shapes"
    ],
  },
{
    id: "pythagorean-theorem-calculator",
    name: "Pythagorean Theorem Calculator",
    description: "Find missing side of a right triangle using a² + b² = c²",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    ),
    views: 7234,
    gradient: "from-red-600 to-orange-600",
    features: [
      "Calculate hypotenuse",
      "Calculate triangle legs",
      "Automatic side selection",
      "Verification of calculations",
      "Right triangle theorem",
      "Educational tool"
    ],
  },
{
    id: "right-triangle-calculator",
    name: "Right Triangle Calculator",
    description: "Calculate all properties of a right triangle from two sides",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
    ),
    views: 6543,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate all angles",
      "Calculate hypotenuse",
      "Area and perimeter",
      "Trigonometric ratios",
      "Degrees and radians",
      "Complete triangle analysis"
    ],
  },
{
    id: "root-calculator",
    name: "Root Calculator",
    description: "Calculate nth root of any number (square root, cube root, etc.)",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9"
    ),
    views: 5876,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate any nth root",
      "Square root calculations",
      "Cube root calculations",
      "Root verification",
      "Negative number support",
      "Multiple precision levels"
    ],
  },
{
    id: "least-common-multiple-calculator",
    name: "Least Common Multiple Calculator",
    description: "Calculate LCM and GCD of multiple numbers",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    ),
    views: 4987,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Calculate LCM of multiple numbers",
      "Calculate GCD simultaneously",
      "Euclidean algorithm",
      "Add unlimited numbers",
      "Common multiples list",
      "Number theory applications"
    ],
  },
{
    id: "greatest-common-factor-calculator",
    name: "Greatest Common Factor Calculator",
    description: "Find the greatest common factor (GCF) of two or more numbers",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 5432,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate GCF of multiple numbers",
      "Euclidean algorithm implementation",
      "Step-by-step calculation breakdown",
      "Add unlimited numbers",
      "Real-time updates",
      "Copy results to clipboard"
    ],
  },
{
    id: "factor-calculator",
    name: "Factor Calculator",
    description: "Find all factors and prime factorization of any positive integer",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 6234,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Find all factors of a number",
      "Prime factorization breakdown",
      "Factor pairs visualization",
      "Prime number detection",
      "Complete factor analysis",
      "Educational tool for math"
    ],
  },
{
    id: "rounding-calculator",
    name: "Rounding Calculator",
    description: "Round numbers to decimal places or significant figures",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 5678,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Round to decimal places",
      "Round to significant figures",
      "Round up (ceiling)",
      "Round down (floor)",
      "Standard half-up rounding",
      "Scientific notation support"
    ],
  },
{
    id: "matrix-calculator",
    name: "Matrix Calculator",
    description: "Perform matrix operations: addition, subtraction, multiplication, determinant, and transpose",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 4876,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Matrix addition and subtraction",
      "Matrix multiplication",
      "Calculate determinant (1x1 to 3x3)",
      "Matrix transpose",
      "Custom matrix dimensions (up to 4x4)",
      "Interactive matrix input"
    ],
  },
{
    id: "scientific-notation-calculator",
    name: "Scientific Notation Calculator",
    description: "Convert numbers to and from scientific notation",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 5234,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Convert to scientific notation",
      "Convert from scientific notation",
      "Standard form conversion",
      "Exponential notation support",
      "Very large and small numbers",
      "Educational tool for science"
    ],
  },
{
    id: "big-number-calculator",
    name: "Big Number Calculator",
    description: "Perform arithmetic operations on arbitrarily large integers",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 4567,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "Handle extremely large integers",
      "Addition of big numbers",
      "Subtraction of big numbers",
      "Multiplication of big numbers",
      "Division of big numbers",
      "No precision loss with BigInt"
    ],
  },
{
    id: "prime-factorization-calculator",
    name: "Prime Factorization Calculator",
    description: "Find the prime factorization of any positive integer",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 6123,
    gradient: "from-teal-600 to-green-600",
    features: [
      "Find prime factorization",
      "Display with exponents",
      "List all prime factors",
      "Unique factor count",
      "Prime number detection",
      "Number theory applications"
    ],
  },
{
    id: "common-factor-calculator",
    name: "Common Factor Calculator",
    description: "Find all common factors of two or more numbers",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 4987,
    gradient: "from-pink-600 to-rose-600",
    features: [
      "Find all common factors",
      "Calculate GCF automatically",
      "Add unlimited numbers",
      "Visual factor highlighting",
      "Factor relationship analysis",
      "Educational math tool"
    ],
  },
{
    id: "basic-calculator",
    name: "Basic Calculator",
    description: "Standard calculator for everyday arithmetic operations",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 12345,
    gradient: "from-slate-600 to-gray-600",
    features: [
      "Basic arithmetic operations (+, -, ×, ÷)",
      "Percentage calculations",
      "Sign change (+/-)",
      "Clear and backspace",
      "Decimal support",
      "Clean modern interface"
    ],
  },
{
    id: "long-division-calculator",
    name: "Long Division Calculator",
    description: "Perform division with step-by-step breakdown",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 5789,
    gradient: "from-amber-600 to-yellow-600",
    features: [
      "Long division calculation",
      "Quotient and remainder",
      "Decimal result display",
      "Step-by-step breakdown",
      "Division verification",
      "Educational learning tool"
    ],
  },
{
    id: "average-return-calculator",
    name: "Average Return Calculator",
    description: "Calculate average annual return on investments with annualized (CAGR) or absolute methods",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    ),
    views: 5234,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate CAGR (Compound Annual Growth Rate)",
      "Absolute return calculations",
      "Total return percentage",
      "Total gain/loss in dollars",
      "Real-time calculation updates",
      "Copy results to clipboard"
    ],
  },
{
    id: "margin-calculator",
    name: "Margin Calculator",
    description: "Calculate profit margin, markup percentage, and pricing strategies",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 6789,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate profit margin percentage",
      "Calculate markup percentage",
      "Find price from margin or markup",
      "Three calculation modes",
      "Real-time pricing updates",
      "Business pricing optimization"
    ],
  },
{
    id: "discount-calculator",
    name: "Discount Calculator",
    description: "Calculate discounted prices, savings amounts, and final costs with sales tax",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    ),
    views: 8234,
    gradient: "from-red-600 to-pink-600",
    features: [
      "Calculate final discounted price",
      "Show total savings amount",
      "Include sales tax calculations",
      "Real-time price updates",
      "Detailed price breakdown",
      "Shopping and retail planning"
    ],
  },
{
    id: "business-loan-calculator",
    name: "Business Loan Calculator",
    description: "Calculate business loan payments and total costs for commercial financing",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    ),
    views: 7456,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Calculate commercial loan payments",
      "Multiple payment frequencies",
      "Total interest calculations",
      "Amortization visualization",
      "Business expansion financing",
      "Responsive charts and graphs"
    ],
  },
{
    id: "debt-to-income-ratio-calculator",
    name: "Debt-to-Income Ratio Calculator",
    description: "Calculate DTI ratio to assess financial health and loan qualification",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 6543,
    gradient: "from-yellow-600 to-orange-600",
    features: [
      "Calculate debt-to-income ratio",
      "Front-end and back-end ratios",
      "Mortgage qualification assessment",
      "Multiple debt categories",
      "Visual DTI guidelines",
      "Financial health analysis"
    ],
  },
{
    id: "real-estate-calculator",
    name: "Real Estate Calculator",
    description: "Analyze rental property investments with cash flow and ROI calculations",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    ),
    views: 8976,
    gradient: "from-teal-600 to-cyan-600",
    features: [
      "Calculate monthly cash flow",
      "Cash-on-cash return analysis",
      "Cap rate calculations",
      "Rental income projections",
      "Expense tracking",
      "Investment property analysis"
    ],
  },
{
    id: "take-home-paycheck-calculator",
    name: "Take-Home Paycheck Calculator",
    description: "Calculate net take-home pay after taxes and deductions",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
    ),
    views: 9234,
    gradient: "from-green-600 to-teal-600",
    features: [
      "Calculate net paycheck amount",
      "Multiple pay frequencies",
      "Federal and state tax withholding",
      "FICA taxes (Social Security & Medicare)",
      "401(k) and insurance deductions",
      "Visual pie chart breakdown"
    ],
  },
{
    id: "personal-loan-calculator",
    name: "Personal Loan Calculator",
    description: "Calculate monthly payments and total costs for personal loans",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
    ),
    views: 7654,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Calculate personal loan payments",
      "Interest rate comparisons",
      "Total interest calculations",
      "Flexible loan terms (1-10 years)",
      "Unsecured loan planning",
      "Responsive visualization"
    ],
  },
{
    id: "boat-loan-calculator",
    name: "Boat Loan Calculator",
    description: "Calculate boat loan payments with trade-in and sales tax",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
    ),
    views: 5432,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Calculate boat loan payments",
      "Include trade-in value",
      "Sales tax calculations",
      "Down payment planning",
      "Flexible loan terms",
      "Marine financing guide"
    ],
  },
{
    id: "lease-calculator",
    name: "Lease Calculator",
    description: "Calculate monthly lease payments with money factor and residual value",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    ),
    views: 8123,
    gradient: "from-violet-600 to-purple-600",
    features: [
      "Calculate monthly lease payments",
      "Money factor to APR conversion",
      "Residual value calculations",
      "Cap cost reduction support",
      "Acquisition fee inclusion",
      "Comprehensive leasing guide"
    ],
  },
{  
    id: "refinance-calculator",
    name: "Refinance Calculator",
    description: "Calculate potential savings from refinancing your mortgage",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    ),
    views: 7892,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Compare current vs new mortgage rates",
      "Calculate monthly payment savings",
      "Break-even analysis",
      "Factor in closing costs",
      "Real-time calculation updates",
      "Copy results to clipboard"
    ],
  },
{
    id: "budget-calculator",
    name: "Budget Calculator",
    description: "Create and track monthly budget with income and expense categories",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 9234,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Track income and expenses",
      "Visual budget breakdown with charts",
      "Calculate savings rate",
      "Add unlimited expense categories",
      "Real-time budget analysis",
      "Export budget summary"
    ],
  },
{
    id: "rental-property-calculator",
    name: "Rental Property Calculator",
    description: "Analyze rental property cash flow and return on investment",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    ),
    views: 6543,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Calculate monthly cash flow",
      "Cash-on-cash return analysis",
      "Cap rate calculations",
      "Factor in vacancy and expenses",
      "Property management fees",
      "Investment property metrics"
    ],
  },
{
    id: "irr-calculator",
    name: "IRR Calculator",
    description: "Calculate Internal Rate of Return for investment cash flows",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    ),
    views: 5234,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Calculate IRR for any cash flow series",
      "Add unlimited cash flow periods",
      "NPV calculation included",
      "Investment decision analysis",
      "Real-time IRR updates",
      "Professional investment metrics"
    ],
  },
{
    id: "roi-calculator",
    name: "ROI Calculator",
    description: "Calculate Return on Investment for any investment or business venture",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 8765,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Calculate total ROI percentage",
      "Annualized ROI calculation",
      "Time-adjusted returns",
      "Investment gain/loss tracking",
      "Real-time calculation updates",
      "Copy results to clipboard"
    ],
  },
{
    id: "apr-calculator",
    name: "APR Calculator",
    description: "Calculate the true Annual Percentage Rate including all fees and charges",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 6234,
    gradient: "from-red-600 to-pink-600",
    features: [
      "Calculate true APR including fees",
      "Compare loan offers accurately",
      "Monthly payment calculation",
      "Total cost analysis",
      "Fee impact on APR",
      "Loan comparison tool"
    ],
  },
{
    id: "fha-loan-calculator",
    name: "FHA Loan Calculator",
    description: "Calculate FHA loan payments with required mortgage insurance premiums",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    ),
    views: 7123,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "FHA loan payment calculations",
      "Upfront MIP (1.75%) included",
      "Monthly MIP calculations",
      "Low down payment options (3.5%)",
      "Total payment breakdown",
      "First-time homebuyer friendly"
    ],
  },
{
    id: "va-mortgage-calculator",
    name: "VA Mortgage Calculator",
    description: "Calculate VA loan payments for veterans and service members",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    ),
    views: 5432,
    gradient: "from-green-600 to-teal-600",
    features: [
      "Zero down payment option",
      "VA funding fee calculation",
      "Disability rating adjustments",
      "No PMI required",
      "First-time vs subsequent use",
      "Competitive veteran rates"
    ],
  },
{
    id: "down-payment-calculator",
    name: "Down Payment Calculator",
    description: "Calculate required down payment and PMI requirements for home purchase",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    ),
    views: 8234,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Calculate down payment amount",
      "PMI requirement analysis",
      "Loan amount calculation",
      "Down payment percentage slider",
      "Real-time updates",
      "Home affordability planning"
    ],
  },
{
    id: "rent-vs-buy-calculator",
    name: "Rent vs. Buy Calculator",
    description: "Compare the total costs of renting versus buying a home over time",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    ),
    views: 9876,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "Comprehensive rent vs buy analysis",
      "Factor in home appreciation",
      "Rent increase projections",
      "Multi-year comparison",
      "Total cost breakdown",
      "Savings calculation and recommendations"
    ],
  },
{  
    id: "payback-period-calculator",
    name: "Payback Period Calculator",
    description: "Calculate the time required to recover your initial investment",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 6234,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate investment recovery time",
      "Simple payback period analysis",
      "Annual cash flow input",
      "Years and months breakdown",
      "Real-time calculation updates",
      "Copy results to clipboard"
    ],
  },
{  
    id: "present-value-calculator",
    name: "Present Value Calculator",
    description: "Calculate the present value of future cash flows with discount rate",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
    ),
    views: 5678,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Time value of money calculations",
      "Discount rate analysis",
      "Future value to present value conversion",
      "Investment decision support",
      "Multi-period discounting",
      "Professional financial planning"
    ],
  },
{  
    id: "future-value-calculator",
    name: "Future Value Calculator",
    description: "Calculate future investment value with compound interest and contributions",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    ),
    views: 7543,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Compound interest calculations",
      "Monthly contribution support",
      "Investment growth projections",
      "Total contributions tracking",
      "Interest earned visualization",
      "Retirement planning tool"
    ],
  },
{
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages with multiple modes: what is X% of Y, X is what % of Y, and more",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 15234,
    gradient: "from-pink-600 to-rose-600",
    features: [
      "Three calculation modes",
      "What is X% of Y?",
      "X is what % of Y?",
      "X is Y% of what?",
      "Real-time calculations",
      "Copy results to clipboard"
    ],
  },
{
    id: "triangle-calculator",
    name: "Triangle Calculator",
    description: "Calculate triangle area, perimeter, and angles from three sides using Heron's formula",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 21l9-18 9 18H3z"
    ),
    views: 8765,
    gradient: "from-indigo-600 to-blue-600",
    features: [
      "Calculate area using Heron's formula",
      "Find all three angles",
      "Calculate perimeter",
      "Triangle inequality validation",
      "Law of cosines application",
      "Real-time updates"
    ],
  },
{
    id: "volume-calculator",
    name: "Volume Calculator",
    description: "Calculate volumes of 3D shapes: cube, prism, cylinder, sphere, cone, and pyramid",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    ),
    views: 12456,
    gradient: "from-cyan-600 to-teal-600",
    features: [
      "Six common 3D shapes",
      "Cube and rectangular prism",
      "Cylinder and sphere",
      "Cone and pyramid",
      "Precise formulas",
      "Multiple unit support"
    ],
  },
{
    id: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    description: "Calculate mean, median, mode, variance, and standard deviation for data sets",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ),
    views: 9876,
    gradient: "from-purple-600 to-violet-600",
    features: [
      "Standard deviation calculation",
      "Variance analysis",
      "Mean, median, mode",
      "Range and count",
      "Statistical summary",
      "Flexible input format"
    ],
  },
{
    id: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers with custom range, count, and duplicate options",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
    ),
    views: 18543,
    gradient: "from-orange-600 to-amber-600",
    features: [
      "Custom number range",
      "Generate multiple numbers",
      "Unique or duplicate options",
      "Statistical summary",
      "Lottery and dice simulation",
      "Copy all results"
    ],
  },
{
    id: "number-sequence-calculator",
    name: "Number Sequence Calculator",
    description: "Generate and analyze arithmetic and geometric sequences with sum calculations",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
    ),
    views: 7234,
    gradient: "from-green-600 to-lime-600",
    features: [
      "Arithmetic progression",
      "Geometric progression",
      "Sum of series",
      "nth term calculation",
      "Sequence visualization",
      "Up to 1000 terms"
    ],
  },
{
    id: "percent-error-calculator",
    name: "Percent Error Calculator",
    description: "Calculate percent error between experimental and theoretical values for scientific analysis",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    ),
    views: 6543,
    gradient: "from-red-600 to-orange-600",
    features: [
      "Percent error calculation",
      "Absolute error",
      "Relative error",
      "Scientific accuracy",
      "Quality control analysis",
      "Real-time updates"
    ],
  },
{
    id: "exponent-calculator",
    name: "Exponent Calculator",
    description: "Calculate powers and exponents with scientific notation and detailed results",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M7 11l5-9 5 9M8 11l4 4-4 4"
    ),
    views: 11234,
    gradient: "from-blue-600 to-purple-600",
    features: [
      "Power calculation (base^exponent)",
      "Scientific notation",
      "Negative exponents",
      "Fractional exponents",
      "Reciprocal calculation",
      "Natural logarithm"
    ],
  },
{
    id: "binary-calculator",
    name: "Binary Calculator",
    description: "Perform arithmetic operations on binary numbers with conversion to decimal and hex",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    ),
    views: 9876,
    gradient: "from-emerald-600 to-green-600",
    features: [
      "Binary addition, subtraction",
      "Binary multiplication, division",
      "Binary to decimal conversion",
      "Binary to hex conversion",
      "Input validation",
      "Multiple format output"
    ],
  },
{
    id: "hex-calculator",
    name: "Hex Calculator",
    description: "Perform arithmetic operations on hexadecimal numbers with multi-base conversions",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M7 20h10a2 2 0 002-2V8a2 2 0 00-2-2h-2.586a1 1 0 01-.707-.293l-1.414-1.414A1 1 0 0011.586 4H7a2 2 0 00-2 2v12a2 2 0 002 2z"
    ),
    views: 8234,
    gradient: "from-violet-600 to-purple-600",
    features: [
      "Hex addition, subtraction",
      "Hex multiplication, division",
      "Hex to decimal conversion",
      "Hex to binary conversion",
      "Color code calculations",
      "Memory address math"
    ],
  },
{  
    id: "commission-calculator",
    name: "Commission Calculator",
    description: "Calculate sales commission and total earnings based on sales amount",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 6789,
    gradient: "from-emerald-600 to-teal-600",
    features: [
      "Calculate sales commission",
      "Base salary inclusion",
      "Percentage-based commission",
      "Total earnings breakdown",
      "Real-time calculation updates",
      "Sales performance tracking"
    ],
  },
{  
    id: "mortgage-calculator-uk",
    name: "Mortgage Calculator UK",
    description: "Calculate UK mortgage payments with stamp duty and loan-to-value ratio",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    ),
    views: 8234,
    gradient: "from-red-600 to-rose-600",
    features: [
      "UK-specific mortgage calculations",
      "Stamp duty calculator (England & NI)",
      "Loan-to-value (LTV) analysis",
      "Monthly payment breakdown",
      "Total interest calculations",
      "Property price sliders"
    ],
  },
{  
    id: "canadian-mortgage-calculator",
    name: "Canadian Mortgage Calculator",
    description: "Calculate Canadian mortgage with semi-annual compounding and CMHC insurance",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
    ),
    views: 7456,
    gradient: "from-red-600 to-orange-600",
    features: [
      "Semi-annual compounding (Canadian standard)",
      "CMHC insurance calculation",
      "Multiple payment frequencies",
      "Down payment analysis",
      "Amortization period up to 30 years",
      "Total payment projections"
    ],
  },
{  
    id: "mortgage-amortization-calculator",
    name: "Mortgage Amortization Calculator",
    description: "Calculate detailed mortgage amortization with principal and interest breakdown",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 9123,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Detailed amortization schedule",
      "Principal vs interest breakdown",
      "First year payment analysis",
      "Total interest calculations",
      "Monthly payment projections",
      "Loan balance tracking"
    ],
  },
{  
    id: "percent-off-calculator",
    name: "Percent Off Calculator",
    description: "Calculate discount prices and savings from percentage off sales",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
    ),
    views: 8765,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate final sale price",
      "Discount amount calculations",
      "Percentage off input",
      "Savings visualization",
      "Shopping discount tool",
      "Real-time price updates"
    ],
  },
{  
    id: "bmi-calculator",
    name: "BMI Calculator",
    description: "Calculate Body Mass Index and assess weight category for health",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ),
    views: 12543,
    gradient: "from-orange-600 to-amber-600",
    features: [
      "BMI calculation with category",
      "Metric and imperial units",
      "Healthy weight range display",
      "Color-coded weight categories",
      "Health assessment guidance",
      "Mobile-friendly interface"
    ],
  },
{  
    id: "time-zone-calculator",
    name: "Time Zone Calculator",
    description: "Convert times between different time zones around the world",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 8765,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Convert between time zones",
      "Real-time time zone conversion",
      "Support for major world time zones",
      "Date and time input",
      "Time difference calculation",
      "Automatic DST handling"
    ],
  },
{  
    id: "love-calculator",
    name: "Love Calculator",
    description: "Calculate love compatibility percentage between two people - just for fun!",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    ),
    views: 25432,
    gradient: "from-pink-600 to-red-600",
    features: [
      "Love compatibility percentage",
      "Relationship compatibility score",
      "Fun entertainment calculator",
      "Visual love meter display",
      "Instant results",
      "Share with friends"
    ],
  },
{  
    id: "gdp-calculator",
    name: "GDP Calculator",
    description: "Calculate Gross Domestic Product using expenditure or income approach",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    ),
    views: 5432,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Expenditure approach calculation",
      "Income approach calculation",
      "Economic analysis tool",
      "Net exports calculation",
      "Formula explanations",
      "Real-time GDP computation"
    ],
  },
{  
    id: "gas-mileage-calculator",
    name: "Gas Mileage Calculator",
    description: "Calculate fuel efficiency in MPG or L/100km for your vehicle",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 00-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0020 4.77 5.07 5.07 0 0019.91 1S18.73.65 16 2.48a13.38 13.38 0 00-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 005 4.77a5.44 5.44 0 00-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 009 18.13V22"
    ),
    views: 11234,
    gradient: "from-yellow-600 to-orange-600",
    features: [
      "MPG calculation",
      "L/100km metric conversion",
      "Fuel efficiency tracking",
      "Imperial and metric units",
      "Efficiency rating display",
      "Cost savings estimation"
    ],
  },
{  
    id: "horsepower-calculator",
    name: "Horsepower Calculator",
    description: "Calculate horsepower from torque and RPM or convert between power units",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 10V3L4 14h7v7l9-11h-7z"
    ),
    views: 9876,
    gradient: "from-red-600 to-orange-600",
    features: [
      "Torque to horsepower conversion",
      "RPM-based calculations",
      "Power unit conversions",
      "HP, kW, and PS support",
      "Automotive calculations",
      "Real-time power output"
    ],
  },
{  
    id: "engine-horsepower-calculator",
    name: "Engine Horsepower Calculator",
    description: "Estimate engine horsepower using various calculation methods",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
    ),
    views: 8543,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Displacement method calculation",
      "Weight and speed method",
      "Quarter mile ET method",
      "Engine specification input",
      "Multiple estimation methods",
      "Imperial and metric units"
    ],
  },
{  
    id: "stair-calculator",
    name: "Stair Calculator",
    description: "Calculate stair dimensions and verify building code compliance",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 21h18M3 7v1a3 3 0 003 3h12a3 3 0 003-3V7M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7h18M5 10v10h4V10H5zm6 0v10h4V10h-4zm6 0v10h4V10h-4z"
    ),
    views: 7654,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "Stair dimension calculations",
      "Building code verification",
      "Rise and run per step",
      "Stringer length calculation",
      "Angle measurements",
      "Imperial and metric units"
    ],
  },
{  
    id: "resistor-calculator",
    name: "Resistor Calculator",
    description: "Calculate resistor values from color bands or find color codes for resistance",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    ),
    views: 10234,
    gradient: "from-amber-600 to-yellow-600",
    features: [
      "Color band to value conversion",
      "Value to color band lookup",
      "4, 5, and 6 band resistors",
      "Tolerance calculation",
      "Resistance range display",
      "Standard EIA color codes"
    ],
  },
{  
    id: "ohms-law-calculator",
    name: "Ohm's Law Calculator",
    description: "Calculate Voltage, Current, Resistance, or Power using Ohm's Law",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 10V3L4 14h7v7l9-11h-7z"
    ),
    views: 12876,
    gradient: "from-yellow-600 to-amber-600",
    features: [
      "Voltage calculation (V)",
      "Current calculation (I)",
      "Resistance calculation (R)",
      "Power calculation (P)",
      "All Ohm's Law formulas",
      "Enter any two values"
    ],
  },
{  
    id: "electricity-calculator",
    name: "Electricity Calculator",
    description: "Calculate electricity consumption and cost for your appliances",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    ),
    views: 11543,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Energy consumption calculation",
      "Electricity cost estimation",
      "Daily, monthly, yearly costs",
      "kWh usage tracking",
      "Appliance preset values",
      "Cost savings analysis"
    ],
  },
{  
    id: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate tip amount, total bill, and split between people easily",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 13245,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Preset tip percentages (10%, 15%, 18%, 20%)",
      "Custom tip percentage option",
      "Bill splitting between multiple people",
      "Per-person amount calculation",
      "Total bill with tip",
      "Real-time calculation updates"
    ],
  },
{  
    id: "mileage-calculator",
    name: "Mileage Calculator",
    description: "Calculate fuel economy (MPG, km/L, L/100km) and trip fuel costs",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ),
    views: 10876,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "MPG (miles per gallon) calculation",
      "km/L and L/100km conversions",
      "Multiple unit support (miles, km, gallons, liters)",
      "Total fuel cost calculation",
      "Cost per mile/kilometer",
      "Trip expense tracking"
    ],
  },
{  
    id: "density-calculator",
    name: "Density Calculator",
    description: "Calculate density from mass and volume with multiple unit conversions",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
    ),
    views: 8543,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Density = Mass / Volume formula",
      "Multiple mass units (g, kg, mg, lb, oz)",
      "Multiple volume units (cm³, m³, L, mL, in³, ft³)",
      "Multiple density units (g/cm³, kg/m³, lb/ft³)",
      "Automatic unit conversion",
      "Material science applications"
    ],
  },
{  
    id: "mass-calculator",
    name: "Mass Calculator",
    description: "Calculate mass from density and volume with unit conversions",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    ),
    views: 7654,
    gradient: "from-indigo-600 to-blue-600",
    features: [
      "Mass = Density × Volume formula",
      "Multiple density units supported",
      "Multiple volume units supported",
      "Convert to grams, kg, pounds, ounces, tonnes",
      "Real-time calculation updates",
      "Engineering and physics applications"
    ],
  },
{  
    id: "weight-calculator",
    name: "Weight Calculator",
    description: "Calculate weight from mass and gravity on different planets and locations",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    ),
    views: 9234,
    gradient: "from-orange-600 to-amber-600",
    features: [
      "Weight = Mass × Gravity formula",
      "Planetary gravity presets (Earth, Moon, Mars, Jupiter, etc.)",
      "Custom gravity value support",
      "Multiple mass units (kg, g, lb, oz)",
      "Multiple weight units (N, kN, lbf, kgf)",
      "Space and physics education tool"
    ],
  },
{  
    id: "speed-calculator",
    name: "Speed Calculator",
    description: "Calculate speed from distance and time with multiple unit conversions",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 10V3L4 14h7v7l9-11h-7z"
    ),
    views: 11234,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "Speed = Distance / Time formula",
      "Multiple distance units (m, km, mi, yd, ft)",
      "Multiple time units (seconds, minutes, hours, days)",
      "Convert to km/h, mph, m/s, ft/s, knots",
      "Real-time calculation updates",
      "Transportation and sports applications"
    ],
  },
{  
    id: "molarity-calculator",
    name: "Molarity Calculator",
    description: "Calculate molarity (concentration) of chemical solutions (M = moles / liters)",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    ),
    views: 6789,
    gradient: "from-teal-600 to-green-600",
    features: [
      "Molarity (M) = moles / liters formula",
      "Convert to millimolar (mM) and micromolar (μM)",
      "Chemistry lab solution preparation",
      "Real-time concentration calculation",
      "Copy results to clipboard",
      "Educational chemistry tool"
    ],
  },
{  
    id: "molecular-weight-calculator",
    name: "Molecular Weight Calculator",
    description: "Calculate molecular weight from chemical formula with element breakdown",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
    ),
    views: 7543,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Calculate molecular weight from formula (e.g., H2O, C6H12O6)",
      "Comprehensive periodic table data",
      "Element-by-element breakdown",
      "Quick select common molecules",
      "g/mol unit display",
      "Chemistry stoichiometry calculations"
    ],
  },
{  
    id: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    description: "Convert between Roman numerals and Arabic numbers (1-3999)",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
    ),
    views: 9876,
    gradient: "from-amber-600 to-orange-600",
    features: [
      "Number to Roman numeral conversion",
      "Roman numeral to number conversion",
      "Supports values 1-3999",
      "Quick example presets",
      "Educational tool for learning Roman numerals",
      "Real-time bidirectional conversion"
    ],
  },
{  
    id: "golf-handicap-calculator",
    name: "Golf Handicap Calculator",
    description: "Calculate USGA Handicap Index from golf scores, course, and slope ratings",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 5432,
    gradient: "from-green-600 to-teal-600",
    features: [
      "USGA Handicap Index calculation",
      "Score differential formula",
      "Course Rating and Slope Rating support",
      "Multiple round tracking (up to 20)",
      "Best differential selection",
      "Golf performance analysis"
    ],
  },
{  
    id: "calorie-calculator",
    name: "Calorie Calculator",
    description: "Calculate daily calorie needs based on age, gender, activity level, and goals",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    ),
    views: 11234,
    gradient: "from-red-600 to-pink-600",
    features: [
      "BMR (Basal Metabolic Rate) calculation",
      "TDEE (Total Daily Energy Expenditure)",
      "Activity level adjustments",
      "Weight loss/gain goal planning",
      "Mifflin-St Jeor equation",
      "Calorie deficit/surplus calculations"
    ],
  },
{  
    id: "body-fat-calculator",
    name: "Body Fat Calculator",
    description: "Calculate body fat percentage using U.S. Navy Method with measurements",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ),
    views: 9876,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "U.S. Navy Method calculation",
      "Gender-specific formulas",
      "Metric and imperial units",
      "Fat mass and lean mass breakdown",
      "Body fat category classification",
      "Real-time calculation updates"
    ],
  },
{  
    id: "bmr-calculator",
    name: "BMR Calculator",
    description: "Calculate Basal Metabolic Rate using Mifflin-St Jeor and Harris-Benedict formulas",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    ),
    views: 10543,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Mifflin-St Jeor formula (recommended)",
      "Harris-Benedict formula (revised)",
      "TDEE calculation with activity levels",
      "Calorie goals for weight management",
      "Metric and imperial support",
      "Interactive sliders for easy input"
    ],
  },
{  
    id: "macro-calculator",
    name: "Macro Calculator",
    description: "Calculate optimal macronutrient breakdown based on fitness goals and activity",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ),
    views: 12654,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Protein, carbs, and fat breakdown",
      "Goal-based macro ratios",
      "Fat loss and muscle gain options",
      "Activity level adjustments",
      "Calorie and gram calculations",
      "Percentage distribution display"
    ],
  },
{  
    id: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    description: "Calculate ideal body weight using Robinson, Miller, Devine, and Hamwi formulas",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    ),
    views: 8234,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Robinson (1983) formula",
      "Miller (1983) formula",
      "Devine (1974) formula",
      "Hamwi (1964) formula",
      "Average ideal weight calculation",
      "Healthy weight range estimation"
    ],
  },
{  
    id: "pregnancy-calculator",
    name: "Pregnancy Calculator",
    description: "Track pregnancy week by week with trimester information and due date",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ),
    views: 15432,
    gradient: "from-pink-600 to-rose-600",
    features: [
      "Week-by-week pregnancy tracking",
      "Trimester breakdown (1st, 2nd, 3rd)",
      "Due date calculation from LMP",
      "Days pregnant and remaining",
      "Current pregnancy progress",
      "Trimester-specific information"
    ],
  },
{  
    id: "pregnancy-weight-gain-calculator",
    name: "Pregnancy Weight Gain Calculator",
    description: "Track recommended pregnancy weight gain based on pre-pregnancy BMI",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
    ),
    views: 11876,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "BMI-based recommendations",
      "Weekly weight gain tracking",
      "Healthy weight range by trimester",
      "Current gain status (on-track/above/below)",
      "Underweight, normal, overweight categories",
      "Medical guidelines compliance"
    ],
  },
{  
    id: "pregnancy-conception-calculator",
    name: "Pregnancy Conception Calculator",
    description: "Estimate conception date from due date or last menstrual period",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    ),
    views: 9543,
    gradient: "from-red-600 to-pink-600",
    features: [
      "Calculate from LMP or due date",
      "Estimated conception date",
      "Conception window (11-21 days)",
      "Ovulation period estimation",
      "Flexible calculation methods",
      "Clear date visualization"
    ],
  },
{  
    id: "due-date-calculator",
    name: "Due Date Calculator",
    description: "Calculate estimated due date from LMP or conception date with countdown",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ),
    views: 14234,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate from LMP or conception",
      "280-day pregnancy duration",
      "Current weeks pregnant",
      "Days until due date countdown",
      "Weeks remaining calculation",
      "Due date accuracy information"
    ],
  },
{  
    id: "pace-calculator",
    name: "Pace Calculator",
    description: "Calculate running/walking pace, speed, and time for training and races",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 10V3L4 14h7v7l9-11h-7z"
    ),
    views: 10987,
    gradient: "from-green-600 to-teal-600",
    features: [
      "Pace per kilometer and mile",
      "Speed in km/h and mph",
      "Distance in km or miles",
      "Time breakdown (hours:min:sec)",
      "Running and walking guidelines",
      "Real-time pace calculations"
    ],
  },
{  
    id: "army-body-fat-calculator",
    name: "Army Body Fat Calculator",
    description: "Calculate body fat percentage using official U.S. Army standards and method",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    ),
    views: 7654,
    gradient: "from-gray-700 to-gray-900",
    features: [
      "Official U.S. Army formula",
      "Age and gender-specific standards",
      "Maximum body fat limits",
      "Pass/warning/fail status",
      "Measurements in inches",
      "Military fitness compliance"
    ],
  },
{  
    id: "carbohydrate-calculator",
    name: "Carbohydrate Calculator",
    description: "Calculate daily carbohydrate needs based on activity level and fitness goals",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    ),
    views: 6234,
    gradient: "from-amber-600 to-orange-600",
    features: [
      "Calculate optimal daily carbohydrate intake",
      "Activity level-based recommendations",
      "Goal-specific adjustments (weight loss/gain)",
      "Carb range (minimum to maximum)",
      "Percentage of daily calories",
      "Real-time calculations"
    ],
  },
{
    id: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    description: "Calculate lean body mass using the Boer formula",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ),
    views: 5876,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Calculate fat-free body mass",
      "Uses scientifically validated Boer formula",
      "Gender-specific calculations",
      "Body fat mass calculation",
      "LBM percentage breakdown",
      "Visual body composition display"
    ],
  },
{
    id: "healthy-weight-calculator",
    name: "Healthy Weight Calculator",
    description: "Calculate ideal healthy weight range using multiple formulas",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    ),
    views: 8123,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "BMI-based healthy weight range",
      "Hamwi and Devine formula calculations",
      "Frame size adjustments",
      "Gender and height-specific results",
      "Multiple weight estimations",
      "Dual unit support (kg and lbs)"
    ],
  },
{
    id: "calories-burned-calculator",
    name: "Calories Burned Calculator",
    description: "Calculate calories burned during various exercises using MET values",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z"
    ),
    views: 9456,
    gradient: "from-red-600 to-orange-600",
    features: [
      "25+ exercise activities included",
      "MET-based accurate calculations",
      "Weight and duration inputs",
      "Calories per hour display",
      "Food equivalent comparisons",
      "Comprehensive exercise database"
    ],
  },
{
    id: "one-rep-max-calculator",
    name: "One Rep Max Calculator",
    description: "Calculate 1RM and training percentages using multiple formulas",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 10V3L4 14h7v7l9-11h-7z"
    ),
    views: 7234,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "6 scientific 1RM formulas (Brzycki, Epley, etc.)",
      "Training percentage calculator",
      "Rep range-specific accuracy",
      "Visual percentage breakdown",
      "Training zone guidelines",
      "Strength programming tool"
    ],
  },
{
    id: "protein-calculator",
    name: "Protein Calculator",
    description: "Calculate daily protein requirements for muscle building and fitness",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
    ),
    views: 8765,
    gradient: "from-red-600 to-pink-600",
    features: [
      "Activity-based protein recommendations",
      "Goal-specific calculations",
      "Protein range (min to max grams)",
      "Calorie percentage breakdown",
      "Per-meal protein distribution",
      "Evidence-based guidelines"
    ],
  },
{
    id: "fat-intake-calculator",
    name: "Fat Intake Calculator",
    description: "Calculate optimal daily fat intake for balanced nutrition",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
    ),
    views: 6543,
    gradient: "from-yellow-600 to-amber-600",
    features: [
      "Dietary approach-based calculations",
      "Saturated vs unsaturated fat breakdown",
      "Fat percentage of daily calories",
      "Keto diet support",
      "Calorie-to-fat conversion",
      "Nutritional guidelines included"
    ],
  },
{
    id: "tdee-calculator",
    name: "TDEE Calculator",
    description: "Calculate Total Daily Energy Expenditure for weight management",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 10V3L4 14h7v7l9-11h-7z"
    ),
    views: 10234,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Mifflin-St Jeor equation for BMR",
      "Activity multiplier calculations",
      "Weight loss/gain calorie targets",
      "Macronutrient split recommendations",
      "Gender and age-specific formulas",
      "Comprehensive energy expenditure"
    ],
  },
{
    id: "ovulation-calculator",
    name: "Ovulation Calculator",
    description: "Calculate ovulation date and fertile window for family planning",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ),
    views: 7892,
    gradient: "from-pink-600 to-rose-600",
    features: [
      "Ovulation date calculation",
      "Fertile window estimation (6 days)",
      "Next period prediction",
      "Cycle phase breakdown",
      "Calendar date picker",
      "Customizable cycle length"
    ],
  },
{
    id: "conception-calculator",
    name: "Conception Calculator",
    description: "Calculate conception date from due date or last menstrual period",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 6789,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Conception date estimation",
      "Conception window calculation",
      "Due date calculator",
      "Weeks pregnant tracker",
      "Trimester timeline",
      "Dual calculation methods (due date/LMP)"
    ],
  },
{
    id: "period-calculator",
    name: "Period Calculator",
    description: "Track your menstrual cycle and predict next period and fertile window",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ),
    views: 7234,
    gradient: "from-pink-600 to-rose-600",
    features: [
      "Next period date prediction",
      "Ovulation date calculation",
      "Fertile window tracking",
      "Customizable cycle length",
      "Period length tracking",
      "Calendar-based results"
    ],
  },
{
    id: "gfr-calculator",
    name: "GFR Calculator",
    description: "Calculate Glomerular Filtration Rate to assess kidney function",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 5432,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "CKD-EPI equation calculation",
      "Kidney function assessment",
      "CKD stage classification",
      "Age, gender, race factors",
      "Serum creatinine input",
      "Medical-grade accuracy"
    ],
  },
{
    id: "body-type-calculator",
    name: "Body Type Calculator",
    description: "Determine your body type (ectomorph, mesomorph, endomorph)",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    ),
    views: 6123,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Somatotype determination",
      "Wrist and ankle measurements",
      "Body frame analysis",
      "Detailed characteristics",
      "Metric and imperial support",
      "Fitness guidance"
    ],
  },
{
    id: "body-surface-area-calculator",
    name: "Body Surface Area Calculator",
    description: "Calculate BSA for medical dosing and physiological measurements",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    ),
    views: 4567,
    gradient: "from-purple-600 to-violet-600",
    features: [
      "Multiple BSA formulas",
      "Mosteller formula (most common)",
      "DuBois & DuBois formula",
      "Medical dosing calculations",
      "Square meters and feet output",
      "Height and weight input"
    ],
  },
{
    id: "bac-calculator",
    name: "BAC Calculator",
    description: "Estimate Blood Alcohol Content based on drinks consumed",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
    ),
    views: 5890,
    gradient: "from-amber-600 to-orange-600",
    features: [
      "Widmark formula calculation",
      "Gender-specific calculations",
      "Standard drink tracking",
      "Time-based metabolism",
      "Impairment level warnings",
      "Time until sober estimate"
    ],
  },
{
    id: "anorexic-bmi-calculator",
    name: "Anorexic BMI Calculator",
    description: "Calculate BMI and assess anorexia severity levels",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
    ),
    views: 4321,
    gradient: "from-red-600 to-pink-600",
    features: [
      "BMI calculation",
      "Anorexia severity assessment",
      "Medical stage classification",
      "Healthy weight range",
      "Support resources",
      "Educational information"
    ],
  },
{
    id: "weight-watcher-points-calculator",
    name: "Weight Watcher Points Calculator",
    description: "Calculate Weight Watchers SmartPoints based on nutrition",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"
    ),
    views: 5678,
    gradient: "from-teal-600 to-cyan-600",
    features: [
      "SmartPoints calculation",
      "Nutritional value input",
      "Protein credit system",
      "Sugar and fat tracking",
      "Food category classification",
      "Daily points guidance"
    ],
  },
{
    id: "overweight-calculator",
    name: "Overweight Calculator",
    description: "Determine if you're overweight and calculate weight loss goals",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 10V3L4 14h7v7l9-11h-7z"
    ),
    views: 6543,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Overweight status assessment",
      "BMI calculation",
      "Excess weight calculation",
      "Target weight goals",
      "Healthy weight range",
      "Weight management tips"
    ],
  },
{
    id: "scientific-calculator",
    name: "Scientific Calculator",
    description: "Advanced calculator with scientific and mathematical functions",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 8765,
    gradient: "from-gray-600 to-slate-600",
    features: [
      "Trigonometric functions",
      "Logarithmic calculations",
      "Exponential functions",
      "Square root and powers",
      "Factorial calculations",
      "Constants (π, e)"
    ],
  },
{
    id: "fraction-calculator",
    name: "Fraction Calculator",
    description: "Add, subtract, multiply, and divide fractions with simplification",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 4v16m8-8H4"
    ),
    views: 7456,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "All fraction operations",
      "Automatic simplification",
      "Mixed number conversion",
      "Decimal form output",
      "Step-by-step display",
      "GCD calculation"
    ],
  },
{  
    id: "average-calculator",
    name: "Average Calculator",
    description: "Calculate mean, median, mode, and other statistics from numbers",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 8234,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate mean (average)",
      "Find median value",
      "Determine mode",
      "Calculate sum and range",
      "Count numbers automatically",
      "Copy results to clipboard"
    ],
  },
{
    id: "p-value-calculator",
    name: "P-Value Calculator",
    description: "Calculate statistical p-values for hypothesis testing",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ),
    views: 6543,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Z-test and T-test support",
      "Two-tailed and one-tailed tests",
      "Degrees of freedom calculation",
      "Statistical significance levels",
      "Interpretation guidance",
      "Professional statistical analysis"
    ],
  },
{
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, days, and more",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ),
    views: 12456,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate exact age",
      "Years, months, and days breakdown",
      "Total days, weeks, hours",
      "Next birthday countdown",
      "Accurate leap year handling",
      "Multiple time unit displays"
    ],
  },
{
    id: "date-calculator",
    name: "Date Calculator",
    description: "Calculate date differences and add/subtract time from dates",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
    ),
    views: 9876,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "Calculate date differences",
      "Add or subtract time",
      "Years, months, days precision",
      "Future and past date finder",
      "Business day calculations",
      "Project duration planning"
    ],
  },
{
    id: "time-calculator",
    name: "Time Calculator",
    description: "Calculate time differences and add/subtract time durations",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 8234,
    gradient: "from-orange-600 to-amber-600",
    features: [
      "Time difference calculations",
      "Add or subtract time",
      "Hours, minutes, seconds",
      "24-hour format support",
      "Time zone compatible",
      "Real-time updates"
    ],
  },
{
    id: "hours-calculator",
    name: "Hours Calculator",
    description: "Calculate work hours, breaks, overtime, and pay",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 11234,
    gradient: "from-red-600 to-pink-600",
    features: [
      "Calculate work hours",
      "Break time deduction",
      "Overtime calculation",
      "Hourly rate tracking",
      "Total pay estimation",
      "Multi-day support"
    ],
  },
{
    id: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate Grade Point Average from course grades",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
    ),
    views: 15678,
    gradient: "from-violet-600 to-purple-600",
    features: [
      "4.0 scale GPA calculation",
      "Weighted course credits",
      "Letter grade conversion",
      "Honor roll determination",
      "Add unlimited courses",
      "Academic standing tracker"
    ],
  },
{
    id: "grade-calculator",
    name: "Grade Calculator",
    description: "Calculate weighted final grades from assignments and exams",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
    ),
    views: 13456,
    gradient: "from-teal-600 to-cyan-600",
    features: [
      "Weighted grade calculation",
      "Assignment percentage tracking",
      "Letter grade conversion",
      "Multiple assignments support",
      "Custom weight allocation",
      "Final grade prediction"
    ],
  },
{
    id: "height-calculator",
    name: "Height Calculator",
    description: "Convert height between feet/inches, centimeters, and meters",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
    ),
    views: 9876,
    gradient: "from-indigo-600 to-blue-600",
    features: [
      "Imperial to metric conversion",
      "Feet and inches format",
      "Centimeters and meters",
      "Height category classification",
      "Real-time conversion",
      "Multiple unit display"
    ],
  },
{
    id: "concrete-calculator",
    name: "Concrete Calculator",
    description: "Calculate concrete volume and materials for construction projects",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
    ),
    views: 7654,
    gradient: "from-gray-600 to-slate-600",
    features: [
      "Slabs, columns, stairs support",
      "Cubic yards calculation",
      "Bag count estimation",
      "Cost calculation",
      "Multiple shape support",
      "Material waste allowance"
    ],
  },
{
    id: "ip-subnet-calculator",
    name: "IP Subnet Calculator",
    description: "Calculate network addresses, subnet masks, and host ranges for IP subnets",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
    ),
    views: 5234,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate network and broadcast addresses",
      "Determine subnet mask",
      "Calculate host range",
      "CIDR notation support",
      "Subnet division",
      "IP address validation"
    ],
  },
{
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest and total investment value",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
    ),
    views: 6789,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate compound interest",
      "Total investment value",
      "Monthly, quarterly, yearly compounding",
      "Initial investment and contributions",
      "Interest rate and time period",
      "Understand the power of compound growth"
    ],
  },
{
    id: "tire-size-calculator",
    name: "Tire Size Calculator",
    description: "Compare tire sizes and calculate dimensions for proper vehicle fitment",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 2a10 10 0 1010 10A10 10 0 0012 2zm0 18a8 8 0 118-8 8 8 0 01-8 8zm0-14a6 6 0 106 6 6 6 0 00-6-6zm0 10a4 4 0 114-4 4 4 0 01-4 4z"
    ),
    views: 4521,
    gradient: "from-slate-600 to-gray-600",
    features: [
      "Compare original vs new tire sizes",
      "Calculate sidewall height and overall diameter",
      "Speedometer accuracy impact",
      "Visual comparison of dimensions",
      "Fitment compatibility warnings",
      "Comprehensive tire specifications"
    ],
  },
{
    id: "roofing-calculator",
    name: "Roofing Calculator",
    description: "Calculate shingles and materials needed for roofing projects",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"
    ),
    views: 3876,
    gradient: "from-amber-600 to-orange-600",
    features: [
      "Calculate roof area with pitch adjustment",
      "Determine roofing squares needed",
      "Calculate shingle bundles required",
      "Include waste allowance factor",
      "Adjustable pitch multiplier",
      "Material quantity estimation"
    ],
  },
{
    id: "tile-calculator",
    name: "Tile Calculator",
    description: "Calculate tiles needed for flooring or wall projects",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"
    ),
    views: 5234,
    gradient: "from-teal-600 to-cyan-600",
    features: [
      "Calculate tiles for any area size",
      "Support for multiple measurement units",
      "Waste allowance calculation",
      "Cost estimation per tile",
      "Flexible tile dimensions",
      "Total project cost breakdown"
    ],
  },
{
    id: "mulch-calculator",
    name: "Mulch Calculator",
    description: "Calculate mulch needed for landscaping projects",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"
    ),
    views: 4123,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate volume in cubic yards",
      "Support for feet and meters",
      "Multiple depth unit options",
      "Bag quantity calculation",
      "Cost estimation included",
      "Coverage area calculation"
    ],
  },
{
    id: "gravel-calculator",
    name: "Gravel Calculator",
    description: "Calculate gravel needed for driveways, paths, and landscaping",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"
    ),
    views: 4789,
    gradient: "from-stone-600 to-neutral-600",
    features: [
      "Calculate volume and weight",
      "Tons and cubic yards conversion",
      "Multiple pricing options",
      "Area coverage calculation",
      "Flexible measurement units",
      "Cost by weight or volume"
    ],
  },
{
    id: "wind-chill-calculator",
    name: "Wind Chill Calculator",
    description: "Calculate how cold it feels when factoring in wind speed",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M14.5 17c0 1.65-1.35 3-3 3s-3-1.35-3-3h2c0 .55.45 1 1 1s1-.45 1-1-.45-1-1-1H2v-2h9.5c1.65 0 3 1.35 3 3zM19 6.5C19 4.57 17.43 3 15.5 3S12 4.57 12 6.5h2c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5V2c1.93 0 3.5-1.57 3.5-3.5zm-.5 4.5H2v2h16.5c.83 0 1.5.67 1.5 1.5s-.67 1.5-1.5 1.5v2c1.93 0 3.5-1.57 3.5-3.5S20.43 11 18.5 11z"
    ),
    views: 3456,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Calculate wind chill temperature",
      "Frostbite risk assessment",
      "Multiple temperature units",
      "Wind speed unit conversion",
      "Danger level warnings",
      "Safety recommendations"
    ],
  },
{
    id: "heat-index-calculator",
    name: "Heat Index Calculator",
    description: "Calculate how hot it feels when humidity is factored with temperature",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"
    ),
    views: 3234,
    gradient: "from-red-600 to-orange-600",
    features: [
      "Calculate heat index value",
      "Humidity comfort assessment",
      "Health risk warnings",
      "Multiple temperature units",
      "Danger level indicators",
      "Safety precautions"
    ],
  },
{
    id: "dew-point-calculator",
    name: "Dew Point Calculator",
    description: "Calculate dew point temperature and humidity comfort level",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 2.69l5.66 5.66a8 8 0 11-11.31 0z"
    ),
    views: 2987,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "Calculate dew point temperature",
      "Comfort level assessment",
      "Magnus formula accuracy",
      "Humidity impact analysis",
      "Multiple temperature units",
      "Detailed comfort descriptions"
    ],
  },
{
    id: "bandwidth-calculator",
    name: "Bandwidth Calculator",
    description: "Calculate download time and data transfer rates",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M1 9l2 2c4.97-4.97 13.03-4.97 18 0l2-2C16.93 2.93 7.08 2.93 1 9zm8 8l3 3 3-3c-1.65-1.66-4.34-1.66-6 0zm-4-4l2 2c2.76-2.76 7.24-2.76 10 0l2-2C15.14 9.14 8.87 9.14 5 13z"
    ),
    views: 4567,
    gradient: "from-violet-600 to-purple-600",
    features: [
      "Calculate download/upload time",
      "Multiple file size units",
      "Bandwidth unit conversion",
      "Data transfer rate display",
      "Time formatting (ms to days)",
      "Bits vs Bytes explanation"
    ],
  },
{
    id: "time-duration-calculator",
    name: "Time Duration Calculator",
    description: "Calculate the duration between two times",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z"
    ),
    views: 5123,
    gradient: "from-indigo-600 to-blue-600",
    features: [
      "Calculate time between two times",
      "12-hour format with AM/PM",
      "Hours, minutes, seconds breakdown",
      "Decimal hours conversion",
      "Next-day time handling",
      "Work hours and timesheet use"
    ],
  },
{
    id: "bra-size-calculator",
    name: "Bra Size Calculator",
    description: "Find your perfect bra size based on measurements in US, UK, and EU sizes",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4"
    ),
    views: 8765,
    gradient: "from-pink-600 to-rose-600",
    features: [
      "Calculate bra size from measurements",
      "Support for inches and centimeters",
      "Show US, UK, and EU sizes",
      "Display sister sizes for alternative fits",
      "Band and cup size breakdown",
      "Measurement tips and guides"
    ],
  },
{
    id: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords with customizable options and strength meter",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
    ),
    views: 12543,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Customizable password length (4-64 characters)",
      "Include/exclude character types",
      "Password strength meter",
      "Exclude similar characters option",
      "One-click copy to clipboard",
      "Security tips and best practices"
    ],
  },
{
    id: "dice-roller",
    name: "Dice Roller",
    description: "Roll virtual dice for games and decisions with multiple dice types (D4-D100)",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zm10 0a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
    ),
    views: 6789,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Roll up to 20 dice at once",
      "Support D4, D6, D8, D10, D12, D20, D100",
      "View individual roll results",
      "Calculate total, min, max, and average",
      "Animated rolling effect",
      "Perfect for D&D and tabletop games"
    ],
  },
{
    id: "conversion-calculator",
    name: "Conversion Calculator",
    description: "Quick multi-category unit converter for length, weight, temperature, and volume",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    ),
    views: 9876,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "Convert length, weight, temperature, volume",
      "Quick unit swapping",
      "Real-time conversion results",
      "Support for metric and imperial units",
      "Temperature conversions (C, F, K)",
      "Clean and intuitive interface"
    ],
  },
{
    id: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    description: "Calculate trip fuel costs based on distance, vehicle efficiency, and fuel prices",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
    ),
    views: 7543,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Calculate total fuel cost for trips",
      "Factor in vehicle MPG",
      "Adjustable fuel price per gallon",
      "Show cost per mile",
      "Calculate round trip costs",
      "Fuel-saving tips included"
    ],
  },
{
    id: "voltage-drop-calculator",
    name: "Voltage Drop Calculator",
    description: "Calculate voltage drop in electrical circuits for proper wire sizing and compliance",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 10V3L4 14h7v7l9-11h-7z"
    ),
    views: 4321,
    gradient: "from-yellow-600 to-amber-600",
    features: [
      "Calculate voltage drop percentage",
      "Support copper and aluminum conductors",
      "Multiple voltage systems (12V-480V)",
      "Wire gauge selection (AWG 14-0)",
      "NEC compliance checking",
      "Show acceptable/excessive drop warnings"
    ],
  },
{
    id: "btu-calculator",
    name: "BTU Calculator",
    description: "Calculate BTU requirements for heating and cooling spaces accurately",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    ),
    views: 8234,
    gradient: "from-red-600 to-orange-600",
    features: [
      "Calculate heating/cooling BTU needs",
      "Account for climate zones",
      "Factor in insulation quality",
      "Show tonnage recommendations",
      "Room size and ceiling height input",
      "HVAC sizing guidance"
    ],
  },
{
    id: "square-footage-calculator",
    name: "Square Footage Calculator",
    description: "Calculate area for rectangles, circles, and triangles with material estimates",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
    ),
    views: 11234,
    gradient: "from-teal-600 to-green-600",
    features: [
      "Calculate square footage for multiple shapes",
      "Convert to square meters, yards, acres",
      "Estimate paint and flooring materials",
      "Support rectangle, circle, triangle",
      "Real-time area updates",
      "Construction material planning"
    ],
  },
{
    id: "time-card-calculator",
    name: "Time Card Calculator",
    description: "Calculate work hours and pay from time card entries with overtime support",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
    ),
    views: 9543,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Track multiple time entries",
      "Calculate regular and overtime hours",
      "Customizable hourly and OT rates",
      "Break time deductions",
      "Weekly/monthly summaries",
      "Export time card data"
    ],
  },
{
    id: "half-life-calculator",
    name: "Half-Life Calculator",
    description: "Calculate radioactive decay and remaining quantity over time",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 10V3L4 14h7v7l9-11h-7z"
    ),
    views: 5432,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate remaining quantity after decay",
      "Half-life period tracking",
      "Number of half-lives passed",
      "Percentage remaining and decayed",
      "Multiple time unit support",
      "Real-time decay calculations"
    ],
  },
{
    id: "quadratic-formula-calculator",
    name: "Quadratic Formula Calculator",
    description: "Solve quadratic equations of the form ax² + bx + c = 0",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 8765,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Find roots of quadratic equations",
      "Discriminant calculation",
      "Real and complex root support",
      "Vertex calculation",
      "Step-by-step solution display",
      "Parabola properties analysis"
    ],
  },
{
    id: "slope-calculator",
    name: "Slope Calculator",
    description: "Calculate slope, distance, angle, and line equation between two points",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
    ),
    views: 7234,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Slope calculation (m = rise/run)",
      "Distance between two points",
      "Angle with horizontal axis",
      "Midpoint calculation",
      "Line equation generation",
      "Slope type classification"
    ],
  },
{
    id: "log-calculator",
    name: "Log Calculator",
    description: "Calculate logarithms with any base including natural, common, and binary logs",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"
    ),
    views: 6543,
    gradient: "from-cyan-600 to-blue-600",
    features: [
      "Natural log (ln, base e)",
      "Common log (log₁₀, base 10)",
      "Binary log (log₂, base 2)",
      "Custom base logarithms",
      "Antilog calculation",
      "High precision results"
    ],
  },
{
    id: "area-calculator",
    name: "Area Calculator",
    description: "Calculate area and perimeter for various geometric shapes",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M4 5a1 1 0 011-1h14a1 1 0 011 1v14a1 1 0 01-1 1H5a1 1 0 01-1-1V5z"
    ),
    views: 9876,
    gradient: "from-green-600 to-teal-600",
    features: [
      "Rectangle, square, circle support",
      "Triangle, trapezoid, parallelogram",
      "Ellipse and rhombus",
      "Perimeter/circumference calculation",
      "Multiple shape formulas",
      "Real-time area updates"
    ],
  },
{
    id: "sample-size-calculator",
    name: "Sample Size Calculator",
    description: "Calculate required sample size for statistical surveys and research",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"
    ),
    views: 4321,
    gradient: "from-indigo-600 to-purple-600",
    features: [
      "Confidence level selection (90-99.9%)",
      "Margin of error control",
      "Population size adjustment",
      "Z-score calculation",
      "Finite population correction",
      "Statistical significance guidance"
    ],
  },
{
    id: "probability-calculator",
    name: "Probability Calculator",
    description: "Calculate probabilities for single events and combined events",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ),
    views: 7654,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Single event probability",
      "AND/OR combined events",
      "Complement (NOT) calculation",
      "Conditional probability",
      "Odds format conversion",
      "Percentage and decimal display"
    ],
  },
{
    id: "statistics-calculator",
    name: "Statistics Calculator",
    description: "Calculate comprehensive statistical measures for your dataset",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ),
    views: 8765,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Mean, median, mode calculation",
      "Standard deviation and variance",
      "Min, max, and range",
      "Sum and count",
      "Paste data from Excel/CSV",
      "Complete statistical analysis"
    ],
  },
{
    id: "mean-median-mode-range-calculator",
    name: "Mean, Median, Mode, Range Calculator",
    description: "Calculate the four basic statistical measures from your dataset",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
    ),
    views: 10234,
    gradient: "from-orange-600 to-amber-600",
    features: [
      "Mean (average) calculation",
      "Median (middle value)",
      "Mode (most frequent)",
      "Range (max - min)",
      "Flexible data input",
      "Copy all results at once"
    ],
  },
{
    id: "permutation-combination-calculator",
    name: "Permutation and Combination Calculator",
    description: "Calculate permutations (order matters) and combinations (order doesn't matter)",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"
    ),
    views: 6789,
    gradient: "from-red-600 to-pink-600",
    features: [
      "Permutation calculation P(n,r)",
      "Combination calculation C(n,r)",
      "Factorial computation",
      "Side-by-side comparison",
      "Large number support",
      "Formula explanations"
    ],
  },
{
    id: "loan-calculator",
    name: "Loan Calculator",
    description: "Estimate payments for personal and business loans",
    category: getCategoryById("calculation"),
    icon: createIcon("M3 10h18M3 14h18M6 18h12"),
    views: 9120,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Flexible term and interest rate options",
      "Payment frequency customization",
      "Visual repayment graph",
      "Loan summary export",
    ],
  },
{
    id: "auto-loan-calculator",
    name: "Auto Loan Calculator",
    description:
      "Calculate car loan payments including down payment and interest",
    category: getCategoryById("calculation"),
    icon: createIcon("M5 13l1.5 1.5m11 0L19 13M3 17h18M6 21h12"),
    views: 7685,
    gradient: "from-yellow-500 to-amber-500",
    features: [
      "Estimate monthly payments",
      "Compare loan options",
      "Include taxes and fees",
      "Amortization table",
    ],
  },
{
    id: "interest-calculator",
    name: "Interest Calculator",
    description: "Calculate simple and compound interest quickly",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 8V4m0 0H8m4 0h4m-4 4v12m0-12l3 3m-3-3l-3 3"),
    views: 13400,
    gradient: "from-blue-500 to-sky-500",
    features: [
      "Simple and compound interest",
      "Flexible time periods",
      "Yearly breakdowns",
      "Export to PDF",
    ],
  },
{
    id: "payment-calculator",
    name: "Payment Calculator",
    description: "Determine regular payment amounts for various loan terms",
    category: getCategoryById("calculation"),
    icon: createIcon("M5 12h14M9 16h6M7 20h10"),
    views: 7850,
    gradient: "from-pink-500 to-fuchsia-500",
    features: [
      "Custom loan parameters",
      "Installment breakdown",
      "Dynamic charts",
      "Mobile-friendly interface",
    ],
  },
{
    id: "basic-retirement-calculator",
    name: "Basic Retirement Calculator",
    description: "Plan for retirement by estimating savings growth over time",
    category: getCategoryById("calculation"),
    icon: createIcon("M5 12h14M7 16h10M9 20h6"),
    views: 12000,
    gradient: "from-green-500 to-lime-500",
    features: [
      "Future value projections",
      "Account for inflation",
      "Multiple income streams",
      "Social security estimates",
    ],
  },
{
    id: "amortization-calculator",
    name: "Amortization Calculator",
    description: "Generate amortization schedules for loans and mortgages",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 6h16M4 10h12M4 14h8M4 18h4"),
    views: 9023,
    gradient: "from-red-500 to-orange-500",
    features: [
      "Monthly breakdown of principal and interest",
      "Visual graphs",
      "Extra payment support",
      "PDF schedule download",
    ],
  },
{
    id: "investment-calculator",
    name: "Investment Calculator",
    description: "Estimate investment returns over time with compounding",
    category: getCategoryById("calculation"),
    icon: createIcon("M5 15l7-7 7 7M5 20h14"),
    views: 9980,
    gradient: "from-indigo-500 to-blue-500",
    features: [
      "Compound interest growth",
      "One-time or recurring investments",
      "Tax and inflation adjustments",
      "Portfolio forecast",
    ],
  },
{
    id: "currency-calculator",
    name: "Currency Calculator",
    description:
      "Convert between world currencies using real-time exchange rates",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 6V4m0 16v-2m-4-4h8M4 12a8 8 0 1116 0 8 8 0 01-16 0z"),
    views: 17000,
    gradient: "from-yellow-500 to-lime-500",
    features: [
      "Real-time exchange rates",
      "Multiple currency support",
      "Offline rate memory",
      "Rate history comparison",
    ],
  },
{
    id: "inflation-calculator",
    name: "Inflation Calculator",
    description: "Calculate past or future value of money with inflation rate",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 6h16M4 10h12M4 14h8M4 18h4"),
    views: 6500,
    gradient: "from-orange-500 to-red-500",
    features: [
      "Adjust money value by year",
      "Historical inflation data",
      "Real vs nominal returns",
      "Country-specific calculations",
    ],
  },
{
    id: "finance-calculator",
    name: "Finance Calculator",
    description: "A general-purpose tool for various financial calculations",
    category: getCategoryById("calculation"),
    icon: createIcon("M3 4h18v18H3V4zm6 8h6"),
    views: 8400,
    gradient: "from-sky-500 to-blue-600",
    features: [
      "Multi-purpose financial tools",
      "Time value of money",
      "Flexible inputs and charts",
      "Mobile and desktop support",
    ],
  },
{
    id: "mortgage-payoff-calculator",
    name: "Mortgage Payoff Calculator",
    description: "See how extra payments reduce your mortgage payoff time",
    category: getCategoryById("calculation"),
    icon: createIcon("M6 18L18 6M6 6l12 12"),
    views: 7132,
    gradient: "from-rose-500 to-red-500",
    features: [
      "Payoff time reduction estimates",
      "Interest savings display",
      "Amortization table with extras",
      "Printable summary",
    ],
  },
{
    id: "income-tax-calculator",
    name: "Income Tax Calculator",
    description: "Estimate your income taxes based on salary and deductions",
    category: getCategoryById("calculation"),
    icon: createIcon("M6 6h12M6 10h12M6 14h8"),
    views: 12700,
    gradient: "from-lime-500 to-emerald-500",
    features: [
      "Supports multiple countries",
      "Automatic deduction handling",
      "Tax bracket visualization",
      "Yearly and monthly tax results",
    ],
  },
{
    id: "compound-interest-calculator",
    name: "Compound Interest Calculator",
    description: "Calculate compound interest for savings or investments",
    category: getCategoryById("calculation"),
    icon: createIcon("M5 12h14M9 16h6M7 20h10"),
    views: 10300,
    gradient: "from-fuchsia-500 to-pink-500",
    features: [
      "Daily, monthly, and yearly compounding",
      "Investment forecast chart",
      "Interest breakdown table",
      "Custom compounding intervals",
    ],
  },
{
    id: "advanced-salary-calculator",
    name: "Salary Calculator",
    description: "Calculate take-home salary after tax and deductions",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 6h16M4 10h12M4 14h8M4 18h4"),
    views: 11000,
    gradient: "from-yellow-500 to-orange-400",
    features: [
      "Gross to net salary calculator",
      "Monthly vs yearly view",
      "Tax and benefits deduction",
      "Country-specific salary models",
    ],
  },
{
    id: "401k-calculator",
    name: "401K Calculator",
    description: "Estimate retirement savings and employer contributions",
    category: getCategoryById("calculation"),
    icon: createIcon("M3 10h18M6 14h12M9 18h6"),
    views: 9400,
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Employer match visualization",
      "Tax-advantaged growth calculator",
      "Age-based projection",
      "Early withdrawal penalty simulation",
    ],
  },
{
    id: "interest-rate-calculator",
    name: "Interest Rate Calculator",
    description: "Calculate the interest rate for loans and investments",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 4v8l4-4-4-4z"),
    views: 4210,
    gradient: "from-blue-500 to-green-500",
    features: [
      "Calculate simple and compound interest",
      "Find interest rate for a given loan or investment",
      "Estimate loan repayment amounts",
      "Determine time to reach financial goals",
      "Save calculation history for reference",
    ],
  },
{
    id: "sales-tax-calculator",
    name: "Sales Tax Calculator",
    description: "Calculate sales tax for products and services",
    category: getCategoryById("calculation"),
    icon: createIcon("M6 2L18 2L12 12z"),
    views: 3125,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Calculate total price including tax",
      "Find tax rate based on product category",
      "Estimate tax amounts for different locations",
      "Track tax history for different purchases",
    ],
  },
{
    id: "house-affordability-calculator",
    name: "House Affordability Calculator",
    description:
      "Estimate how much house you can afford based on income and expenses",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 10l8-8 8 8z"),
    views: 5300,
    gradient: "from-teal-500 to-cyan-500",
    features: [
      "Calculate maximum affordable house price",
      "Estimate monthly mortgage payments",
      "Factor in loan rates and down payments",
      "Compare different house options based on affordability",
    ],
  },
{
    id: "savings-calculator",
    name: "Savings Calculator",
    description:
      "Estimate how much you can save over time based on contributions and interest",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 12l4 4L16 8l4 4z"),
    views: 4090,
    gradient: "from-green-500 to-blue-500",
    features: [
      "Estimate future savings with regular contributions",
      "Calculate compound interest over time",
      "Track savings growth and goals",
      "Adjust calculations based on different interest rates",
    ],
  },
{
    id: "rent-calculator",
    name: "Rent Calculator",
    description:
      "Estimate monthly rent and utilities based on location and property type",
    category: getCategoryById("calculation"),
    icon: createIcon("M6 4L10 8l4-4z"),
    views: 3150,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Calculate rent affordability based on income",
      "Compare rent prices across different areas",
      "Estimate additional costs like utilities and insurance",
      "Track rent history for future reference",
    ],
  },
{
    id: "marriage-tax-calculator",
    name: "Marriage Tax Calculator",
    description: "Calculate tax benefits and liabilities for married couples",
    category: getCategoryById("calculation"),
    icon: createIcon("M6 4l4 4L16 4z"),
    views: 2410,
    gradient: "from-red-500 to-pink-500",
    features: [
      "Estimate joint vs individual tax filing outcomes",
      "Calculate tax savings for married couples",
      "Determine deductions based on marital status",
      "Track tax filing history",
    ],
  },
{
    id: "estate-tax-calculator",
    name: "Estate Tax Calculator",
    description: "Estimate estate taxes for inheritance and estate planning",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 6v12L18 12l-6-6z"),
    views: 2780,
    gradient: "from-yellow-700 to-amber-500",
    features: [
      "Estimate estate taxes based on inheritance",
      "Calculate estate tax rates by jurisdiction",
      "Plan for estate tax deductions and exemptions",
      "Track changes to tax laws and exemptions",
    ],
  },
{
    id: "retirement-savings-pension-calculator",
    name: "Retirement Savings & Pension Calculator",
    description: "Calculate your retirement savings and pension needs with this comprehensive calculator.",
    category: getCategoryById("calculation"),
    icon: createIcon("M9.5 2C8.4 2 7.5 2.9 7.5 4S8.4 6 9.5 6 11.5 5.1 11.5 4 10.6 2 9.5 2ZM9.75 22V16.5L7.91 10.09C7.66 9.22 8.13 8.31 8.97 8.06C9.8 7.81 10.69 8.28 10.94 9.11L12 13H15V15H12.6L12.2 13.65L13.5 19.8C13.81 21 13.09 22.22 11.89 22.53C11.26 22.71 10.62 22.53 10.16 22.12L9.75 22ZM1 22H4L6 16L4.5 10.5C4.31 9.85 4.66 9.16 5.31 8.97C5.97 8.78 6.66 9.13 6.85 9.78L8.5 15.5H11V17.5H7.65L6.5 14.26L5.92 18.48L4 22H1Z"),
    views: 200,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate required retirement corpus",
      "Project future savings growth",
      "Analyze shortfall or surplus",
      "Provide recommendations for additional savings",
      "Visualize projections with an interactive graph",
      "Support for inflation and investment returns",
    ],
  },
{
    id: "social-security-calculator",
    name: "Social Security Calculator",
    description:
      "Estimate future social security benefits based on earnings and contributions",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 8v6l4-4z"),
    views: 3150,
    gradient: "from-gray-500 to-black",
    features: [
      "Estimate future social security benefits",
      "Track earnings history for social security",
      "Determine optimal time to start social security payments",
      "Simulate changes in contributions or earnings",
    ],
  },
{
    id: "annuity-calculator",
    name: "Annuity Calculator",
    description:
      "Estimate annuity payments based on lump sum investments or regular contributions",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 12L8 16l4-4z"),
    views: 2870,
    gradient: "from-green-700 to-teal-700",
    features: [
      "Calculate fixed vs variable annuity payouts",
      "Estimate returns based on initial investment",
      "Plan for future annuity needs",
      "Track performance of annuities over time",
    ],
  },
{
    id: "annuity-payout-calculator",
    name: "Annuity Payout Calculator",
    description: "Calculate the payouts for different types of annuity plans",
    category: getCategoryById("calculation"),
    icon: createIcon("M16 12l-4 4l-4-4z"),
    views: 3200,
    gradient: "from-orange-500 to-red-500",
    features: [
      "Estimate monthly or annual payouts",
      "Track payout history over time",
      "Calculate for immediate or deferred annuities",
      "Adjust payout terms based on needs",
    ],
  },
{
    id: "credit-card-calculator",
    name: "Credit Card Calculator",
    description: "Calculate monthly payments for credit card debt",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 8l4 4l-4 4z"),
    views: 4060,
    gradient: "from-blue-500 to-purple-500",
    features: [
      "Estimate monthly payments for credit card debt",
      "Track interest accrual over time",
      "Compare different repayment strategies",
      "Calculate total interest paid over the life of the debt",
    ],
  },
{
    id: "credit-cards-payoff-calculator",
    name: "Credit Cards Payoff Calculator",
    description:
      "Calculate how long it will take to pay off credit cards based on payment amounts",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 10l8 8l8-8z"),
    views: 2100,
    gradient: "from-red-700 to-orange-700",
    features: [
      "Estimate how long it will take to pay off credit card debt",
      "Track monthly progress in paying off debt",
      "Adjust payment schedules for faster payoff",
      "Simulate changes in interest rates or fees",
    ],
  },
{
    id: "debt-payoff-calculator",
    name: "Debt Payoff Calculator",
    description:
      "Calculate how long it will take to pay off your debt based on your monthly payments and interest rates",
    category: getCategoryById("calculation"),
    icon: createIcon("M6 12l6 6l6-6z"),
    views: 3125,
    gradient: "from-pink-600 to-purple-600",
    features: [
      "Estimate time to pay off credit card or loan debt",
      "Track total interest paid over time",
      "Adjust payment schedules and interest rates",
      "Provide an actionable repayment plan",
    ],
  },
{
    id: "debt-consolidation-calculator",
    name: "Debt Consolidation Calculator",
    description:
      "Determine how much you can save by consolidating your debts into a single loan",
    category: getCategoryById("calculation"),
    icon: createIcon("M10 3L5 8l5 5l5-5l-5-5z"),
    views: 2580,
    gradient: "from-indigo-500 to-blue-500",
    features: [
      "Estimate savings from debt consolidation",
      "Compare monthly payments before and after consolidation",
      "Track total interest costs",
      "Find best consolidation loan rates",
    ],
  },
{
    id: "repayment-calculator",
    name: "Repayment Calculator",
    description:
      "Calculate your monthly repayment amounts for different types of loans",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 8v12l4-4-4-4z"),
    views: 4200,
    gradient: "from-teal-600 to-green-500",
    features: [
      "Estimate loan repayment amounts",
      "Adjust for loan terms and interest rates",
      "Track progress on loan repayment",
      "Simulate different repayment scenarios",
    ],
  },
{
    id: "student-loan-calculator",
    name: "Student Loan Calculator",
    description:
      "Estimate monthly payments for student loans based on loan amount, interest, and term length",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 4l-4 4 4 4z"),
    views: 3670,
    gradient: "from-blue-600 to-cyan-500",
    features: [
      "Estimate monthly student loan payments",
      "Simulate payments based on loan terms and interest rates",
      "Track loan repayment progress",
      "Calculate total interest paid over the life of the loan",
    ],
  },
{
    id: "college-cost-calculator",
    name: "College Cost Calculator",
    description:
      "Calculate the total cost of college education including tuition, room, board, and other expenses",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l8 8 8-8z"),
    views: 3120,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Estimate total cost of college education",
      "Break down costs by category (tuition, room, etc.)",
      "Calculate the impact of financial aid and scholarships",
      "Track changes in college cost over time",
    ],
  },
{
    id: "simple-interest-calculator",
    name: "Simple Interest Calculator",
    description:
      "Calculate simple interest on investments or loans based on principal, rate, and time",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3200,
    gradient: "from-green-500 to-yellow-500",
    features: [
      "Calculate simple interest for loans or savings",
      "Track total interest paid or earned",
      "Adjust for different rates and time periods",
      "Compare simple interest with compound interest",
    ],
  },
{
    id: "cd-calculator",
    name: "CD Calculator",
    description:
      "Estimate the future value of a Certificate of Deposit (CD) based on interest rate and term",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 4l4 4-4 4z"),
    views: 2700,
    gradient: "from-orange-500 to-red-500",
    features: [
      "Estimate the future value of a CD investment",
      "Calculate interest earned over time",
      "Compare different CD rates and terms",
      "Plan for future CD investments",
    ],
  },
{
    id: "bond-calculator",
    name: "Bond Calculator",
    description:
      "Calculate the value of bonds based on interest rates, coupon payments, and time to maturity",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 10l8 8l8-8z"),
    views: 3890,
    gradient: "from-blue-700 to-green-700",
    features: [
      "Estimate bond value based on market conditions",
      "Track coupon payments and interest rates",
      "Simulate changes in bond value over time",
      "Calculate total return on bonds",
    ],
  },
{
    id: "roth-ira-calculator",
    name: "Roth IRA Calculator",
    description:
      "Estimate the future value of a Roth IRA based on contributions, investment returns, and withdrawal strategies",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 4l4 4-4 4z"),
    views: 2900,
    gradient: "from-teal-500 to-blue-500",
    features: [
      "Estimate future value of Roth IRA with regular contributions",
      "Calculate tax-free withdrawals based on contributions",
      "Simulate investment returns over time",
      "Track Roth IRA growth and performance",
    ],
  },
{
    id: "ira-calculator",
    name: "IRA Calculator",
    description:
      "Estimate the future value of your IRA based on contributions, investment returns, and tax considerations",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 4l4 4-4 4z"),
    views: 3000,
    gradient: "from-teal-500 to-blue-500",
    features: [
      "Estimate future value of IRA with regular contributions",
      "Simulate returns on investments within an IRA",
      "Consider tax implications for different IRA types",
      "Plan for retirement with IRA growth projections",
    ],
  },
{
    id: "rmd-calculator",
    name: "RMD Calculator",
    description:
      "Calculate your Required Minimum Distributions (RMDs) from retirement accounts based on your age and account balance",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 10l8 8l8-8z"),
    views: 1500,
    gradient: "from-blue-600 to-green-600",
    features: [
      "Estimate RMDs for different retirement accounts",
      "Calculate the impact of different ages on RMDs",
      "Track minimum withdrawals required based on IRS rules",
      "Plan for tax liabilities from RMDs",
    ],
  },
{
    id: "vat-calculator",
    name: "VAT Calculator",
    description:
      "Calculate VAT (Value Added Tax) for goods or services based on tax rate and price",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 4200,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Calculate VAT on purchases or sales",
      "Track VAT amounts for different tax rates",
      "Calculate VAT-inclusive and VAT-exclusive prices",
      "Plan for VAT payments in business transactions",
    ],
  },
{
    id: "cash-back-low-interest-calculator",
    name: "Cash Back or Low Interest Calculator",
    description:
      "Determine which credit card offers the best cash back or lowest interest rate based on your spending habits",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 8v12l4-4-4-4z"),
    views: 2100,
    gradient: "from-green-500 to-blue-500",
    features: [
      "Compare cash-back credit cards",
      "Estimate savings based on spending categories",
      "Track interest rates and payment terms",
      "Plan for rewards and cashback from credit cards",
    ],
  },
{
    id: "auto-lease-calculator",
    name: "Auto Lease Calculator",
    description:
      "Calculate monthly payments for car leases based on car price, lease term, interest rate, and down payment",
    category: getCategoryById("calculation"),
    icon: createIcon("M6 12l6 6l6-6z"),
    views: 3800,
    gradient: "from-indigo-600 to-purple-500",
    features: [
      "Estimate monthly auto lease payments",
      "Adjust for down payment, interest rate, and term length",
      "Simulate lease payment schedules",
      "Track total cost of leasing a vehicle",
    ],
  },
{
    id: "depreciation-calculator",
    name: "Depreciation Calculator",
    description:
      "Calculate the depreciation of an asset over time using various methods (e.g., straight-line, declining balance)",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2100,
    gradient: "from-teal-700 to-cyan-600",
    features: [
      "Estimate asset depreciation over time",
      "Use different depreciation methods (e.g., straight-line, declining balance)",
      "Track asset value reduction and tax implications",
      "Plan for asset disposal or resale",
    ],
  },
{
    id: "average-return-calculator",
    name: "Average Return Calculator",
    description:
      "Calculate the average return on investments over a given time period",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-pink-600 to-red-500",
    features: [
      "Calculate average returns on investments",
      "Track return over specific time frames",
      "Simulate potential future returns",
      "Estimate impact of returns on portfolio growth",
    ],
  },
{
    id: "margin-calculator",
    name: "Margin Calculator",
    description:
      "Calculate margin for buying securities or for trading on margin, based on the price of the asset and the required margin percentage",
    category: getCategoryById("calculation"),
    icon: createIcon("M10 6v12l4-4-4-4z"),
    views: 1900,
    gradient: "from-indigo-700 to-blue-600",
    features: [
      "Estimate margin requirements for trades",
      "Track margin balances and risks",
      "Simulate margin calls and trading scenarios",
      "Plan for margin-based investments and returns",
    ],
  },
{
    id: "discount-calculator",
    name: "Discount Calculator",
    description:
      "Calculate the final price of an item after applying a discount percentage to its original price",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 10l8 8l8-8z"),
    views: 2500,
    gradient: "from-yellow-600 to-orange-600",
    features: [
      "Estimate the final price after applying discounts",
      "Track savings based on discount percentages",
      "Simulate discounts for different products",
      "Calculate discounts for bulk purchases",
    ],
  },
{
    id: "business-loan-calculator",
    name: "Business Loan Calculator",
    description:
      "Calculate monthly payments, interest rates, and loan terms for business loans",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 3400,
    gradient: "from-red-600 to-pink-500",
    features: [
      "Estimate business loan repayment schedules",
      "Adjust for loan term and interest rates",
      "Track total loan costs and interest",
      "Plan for business financing options",
    ],
  },
{
    id: "debt-to-income-ratio-calculator",
    name: "Debt-to-Income Ratio Calculator",
    description:
      "Calculate your debt-to-income (DTI) ratio to help assess your ability to take on more debt",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 10l8 8l8-8z"),
    views: 2200,
    gradient: "from-cyan-600 to-teal-500",
    features: [
      "Estimate your debt-to-income ratio",
      "Assess financial health and loan eligibility",
      "Track debt repayment progress",
      "Determine your capacity for new debt",
    ],
  },
{
    id: "real-estate-calculator",
    name: "Real Estate Calculator",
    description:
      "Calculate monthly mortgage payments, property taxes, and other costs related to real estate investments",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3100,
    gradient: "from-blue-800 to-green-700",
    features: [
      "Estimate monthly mortgage payments",
      "Calculate property taxes and insurance",
      "Track real estate investment costs",
      "Simulate mortgage scenarios based on loan terms",
    ],
  },
{
    id: "take-home-paycheck-calculator",
    name: "Take-Home Paycheck Calculator",
    description:
      "Estimate the amount of your paycheck after taxes and deductions",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 4000,
    gradient: "from-green-500 to-blue-500",
    features: [
      "Estimate net income after taxes",
      "Include deductions like insurance, retirement, and other benefits",
      "Simulate paychecks for different filing statuses",
      "Plan for salary and wage deductions",
    ],
  },
{
    id: "personal-loan-calculator",
    name: "Personal Loan Calculator",
    description:
      "Calculate monthly payments, interest rates, and loan terms for personal loans",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2700,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Estimate monthly loan payments",
      "Adjust for loan amount, interest rate, and term",
      "Track total loan cost and interest",
      "Plan for loan repayment scenarios",
    ],
  },
{
    id: "boat-loan-calculator",
    name: "Boat Loan Calculator",
    description: "Calculate boat loan payments, interest rates, and loan terms",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 1800,
    gradient: "from-teal-600 to-green-600",
    features: [
      "Estimate monthly boat loan payments",
      "Adjust for boat price, loan amount, and interest rate",
      "Calculate loan repayment schedules",
      "Plan for boat financing options",
    ],
  },
{
    id: "lease-calculator",
    name: "Lease Calculator",
    description:
      "Calculate monthly lease payments based on vehicle or property price, term, and interest rate",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2200,
    gradient: "from-blue-500 to-purple-500",
    features: [
      "Estimate lease payments for cars or properties",
      "Adjust for term length, interest rate, and down payment",
      "Track total cost of leasing",
      "Simulate lease payment schedules",
    ],
  },
{
    id: "refinance-calculator",
    name: "Refinance Calculator",
    description:
      "Calculate potential savings from refinancing a loan or mortgage",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 3500,
    gradient: "from-orange-600 to-yellow-500",
    features: [
      "Estimate savings from refinancing loans",
      "Adjust for loan amount, interest rate, and term",
      "Track refinancing benefits over time",
      "Simulate future payments after refinancing",
    ],
  },
{
    id: "budget-calculator",
    name: "Budget Calculator",
    description:
      "Create a monthly budget by tracking income and expenses, and planning savings goals",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5000,
    gradient: "from-cyan-600 to-teal-500",
    features: [
      "Track monthly income and expenses",
      "Set savings goals and track progress",
      "Plan for discretionary spending",
      "Create a financial plan for long-term stability",
    ],
  },
{
    id: "rental-property-calculator",
    name: "Rental Property Calculator",
    description:
      "Calculate the profitability of rental properties by considering mortgage payments, rental income, and expenses",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3100,
    gradient: "from-green-500 to-blue-500",
    features: [
      "Estimate rental property cash flow",
      "Account for mortgage, property taxes, and maintenance",
      "Calculate return on investment (ROI) for rental properties",
      "Plan for property management and expenses",
    ],
  },
{
    id: "irr-calculator",
    name: "IRR Calculator",
    description:
      "Calculate the Internal Rate of Return (IRR) for investments to assess profitability",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 2600,
    gradient: "from-red-600 to-orange-500",
    features: [
      "Estimate the IRR for different investment projects",
      "Track profitability and future investment returns",
      "Compare different investment scenarios",
      "Plan for long-term investment gains",
    ],
  },
{
    id: "roi-calculator",
    name: "ROI Calculator",
    description:
      "Calculate the Return on Investment (ROI) for business or investment projects",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 4200,
    gradient: "from-blue-600 to-green-600",
    features: [
      "Estimate ROI for investments or business ventures",
      "Track profitability and future gains",
      "Compare different investment opportunities",
      "Plan for investment strategy and returns",
    ],
  },
{
    id: "apr-calculator",
    name: "APR Calculator",
    description:
      "Calculate the Annual Percentage Rate (APR) for loans or credit cards to assess the true cost of borrowing",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 3100,
    gradient: "from-purple-500 to-indigo-600",
    features: [
      "Estimate the APR for different loans or credit cards",
      "Track total interest paid over the loan term",
      "Plan for borrowing costs and fees",
      "Compare interest rates across different lenders",
    ],
  },
{
    id: "fha-loan-calculator",
    name: "FHA Loan Calculator",
    description:
      "Calculate monthly payments and mortgage insurance for FHA loans",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 2900,
    gradient: "from-teal-500 to-blue-500",
    features: [
      "Estimate monthly FHA loan payments",
      "Account for mortgage insurance premiums",
      "Adjust for loan amount, interest rate, and term",
      "Simulate mortgage scenarios for FHA loans",
    ],
  },
{
    id: "va-mortgage-calculator",
    name: "VA Mortgage Calculator",
    description: "Calculate monthly payments and benefits for VA mortgages",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-green-600 to-cyan-500",
    features: [
      "Estimate monthly VA mortgage payments",
      "Account for VA loan benefits and eligibility",
      "Adjust for loan amount, interest rate, and term",
      "Simulate mortgage scenarios for veterans",
    ],
  },
{
    id: "down-payment-calculator",
    name: "Down Payment Calculator",
    description:
      "Calculate the amount needed for a down payment based on purchase price and percentage",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 2400,
    gradient: "from-pink-500 to-red-500",
    features: [
      "Estimate down payment based on home price and loan type",
      "Adjust for percentage and loan requirements",
      "Plan for future home purchases",
      "Account for various down payment options",
    ],
  },
{
    id: "rent-vs-buy-calculator",
    name: "Rent vs. Buy Calculator",
    description:
      "Compare the cost of renting vs. buying a home to make the best financial decision",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3500,
    gradient: "from-blue-500 to-teal-500",
    features: [
      "Compare monthly costs of renting and buying",
      "Account for mortgage, property taxes, and insurance",
      "Track long-term savings and investment growth",
      "Simulate different scenarios for buying or renting",
    ],
  },
{
    id: "payback-period-calculator",
    name: "Payback Period Calculator",
    description:
      "Calculate how long it will take to recoup an investment through profits",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 1800,
    gradient: "from-yellow-600 to-orange-500",
    features: [
      "Estimate the payback period for investments",
      "Account for initial investment and cash inflows",
      "Track the time to recoup your investment",
      "Plan for future investments and their returns",
    ],
  },
{
    id: "present-value-calculator",
    name: "Present Value Calculator",
    description:
      "Calculate the present value of a future sum of money based on a given interest rate",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2900,
    gradient: "from-indigo-600 to-purple-500",
    features: [
      "Calculate the present value of future cash flows",
      "Account for interest rates and time periods",
      "Track the value of money in today's terms",
      "Simulate different interest rate scenarios",
    ],
  },
{
    id: "future-value-calculator",
    name: "Future Value Calculator",
    description:
      "Estimate the future value of an investment based on interest rates and time",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 3200,
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Calculate the future value of an investment",
      "Account for compounding interest and time",
      "Track growth of investments over time",
      "Simulate different future value scenarios",
    ],
  },
{
    id: "commission-calculator",
    name: "Commission Calculator",
    description:
      "Calculate the commission for sales based on price and percentage",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2500,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Estimate commissions based on sale price and commission percentage",
      "Account for varying commission rates",
      "Track commission earnings over time",
      "Simulate different sales and commissions",
    ],
  },
{
    id: "mortgage-calculator-uk",
    name: "Mortgage Calculator UK",
    description:
      "Calculate mortgage payments in the UK, including interest rates, loan term, and property value",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 3000,
    gradient: "from-green-600 to-blue-600",
    features: [
      "Estimate UK mortgage payments",
      "Account for interest rates, property value, and loan term",
      "Track monthly mortgage payments",
      "Simulate mortgage repayment scenarios",
    ],
  },
{
    id: "canadian-mortgage-calculator",
    name: "Canadian Mortgage Calculator",
    description:
      "Estimate mortgage payments for properties in Canada, considering interest rates and loan term",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-blue-500 to-green-600",
    features: [
      "Estimate mortgage payments for Canadian properties",
      "Account for interest rates, property taxes, and insurance",
      "Track loan repayment over time",
      "Simulate different mortgage scenarios",
    ],
  },
{
    id: "mortgage-amortization-calculator",
    name: "Mortgage Amortization Calculator",
    description:
      "Calculate mortgage amortization schedules, showing principal and interest breakdowns",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 2700,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Generate mortgage amortization schedules",
      "Track principal and interest breakdowns",
      "Account for loan term and interest rates",
      "Plan for long-term mortgage payments",
    ],
  },
{
    id: "percent-off-calculator",
    name: "Percent Off Calculator",
    description:
      "Calculate discounts based on a given price and discount percentage",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3500,
    gradient: "from-indigo-600 to-blue-500",
    features: [
      "Calculate percent off for discounts",
      "Estimate savings based on percentage discounts",
      "Track prices before and after discounts",
      "Simulate different discount scenarios",
    ],
  },
{
    id: "bmi-calculator",
    name: "BMI Calculator",
    description:
      "Calculate your Body Mass Index (BMI) based on height and weight",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2v4h4"),
    views: 4000,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Calculate BMI using height and weight",
      "Classify BMI based on health guidelines",
      "Track changes in BMI over time",
      "Provide recommendations for health improvement",
    ],
  },
{
    id: "calorie-calculator",
    name: "Calorie Calculator",
    description:
      "Calculate the daily calorie intake needed for weight maintenance or weight loss",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3200,
    gradient: "from-red-500 to-orange-500",
    features: [
      "Estimate daily calorie needs based on activity level",
      "Track calorie consumption for weight management",
      "Customize goals for weight loss or gain",
      "Provide healthy diet recommendations",
    ],
  },
{
    id: "body-fat-calculator",
    name: "Body Fat Calculator",
    description:
      "Estimate body fat percentage based on different body measurements",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-blue-500 to-indigo-500",
    features: [
      "Calculate body fat percentage using multiple methods",
      "Track body fat changes over time",
      "Provide fitness and nutrition tips",
      "Assess health status based on body fat percentage",
    ],
  },
{
    id: "bmr-calculator",
    name: "BMR Calculator",
    description:
      "Estimate your Basal Metabolic Rate (BMR), the number of calories your body burns at rest",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3600,
    gradient: "from-purple-500 to-blue-500",
    features: [
      "Calculate BMR using weight, height, age, and gender",
      "Track daily calorie requirements for weight management",
      "Assess calorie needs for different activity levels",
      "Provide personalized fitness and nutrition guidance",
    ],
  },
{
    id: "macro-calculator",
    name: "Macro Calculator",
    description:
      "Calculate the ideal balance of macronutrients (carbs, fats, proteins) for your diet",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2900,
    gradient: "from-green-600 to-blue-600",
    features: [
      "Estimate the ideal macro split for weight loss, maintenance, or gain",
      "Track daily intake of macronutrients",
      "Customize goals based on dietary preferences",
      "Monitor macro balance for optimal health",
    ],
  },
{
    id: "ideal-weight-calculator",
    name: "Ideal Weight Calculator",
    description:
      "Estimate your ideal weight range based on height, age, and gender",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2500,
    gradient: "from-teal-600 to-green-500",
    features: [
      "Estimate your ideal weight range using height and age",
      "Track your progress toward your ideal weight",
      "Adjust weight goals based on health conditions",
      "Provide fitness and diet tips for achieving your ideal weight",
    ],
  },
{
    id: "pregnancy-calculator",
    name: "Pregnancy Calculator",
    description:
      "Estimate the due date and pregnancy timeline based on the last menstrual period",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3100,
    gradient: "from-pink-500 to-rose-500",
    features: [
      "Estimate your pregnancy due date based on LMP",
      "Track pregnancy milestones",
      "Provide tips for a healthy pregnancy",
      "Generate a personalized pregnancy timeline",
    ],
  },
{
    id: "pregnancy-weight-gain-calculator",
    name: "Pregnancy Weight Gain Calculator",
    description:
      "Estimate the recommended weight gain during pregnancy based on pre-pregnancy weight",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2200,
    gradient: "from-purple-500 to-indigo-500",
    features: [
      "Estimate the recommended weight gain for pregnancy",
      "Track weight gain throughout pregnancy",
      "Provide personalized pregnancy weight gain advice",
      "Help ensure a healthy pregnancy",
    ],
  },
{
    id: "pregnancy-conception-calculator",
    name: "Pregnancy Conception Calculator",
    description:
      "Calculate the most fertile days for conception based on your menstrual cycle",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2400,
    gradient: "from-pink-600 to-purple-600",
    features: [
      "Track ovulation and fertility windows",
      "Estimate the best days for conception",
      "Help plan for pregnancy",
      "Personalize the calculation based on menstrual cycle",
    ],
  },
{
    id: "due-date-calculator",
    name: "Due Date Calculator",
    description:
      "Calculate the expected due date based on conception or LMP date",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2300,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Calculate the due date based on conception or LMP",
      "Track pregnancy progress",
      "Generate personalized pregnancy timelines",
      "Provide information for healthy pregnancy",
    ],
  },
{
    id: "pace-calculator",
    name: "Pace Calculator",
    description:
      "Estimate the pace per mile or kilometer needed to achieve a specific race time",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2100,
    gradient: "from-indigo-500 to-blue-600",
    features: [
      "Calculate race pace for desired finish time",
      "Track pace for different race distances",
      "Adjust pace based on performance goals",
      "Monitor race preparation progress",
    ],
  },
{
    id: "army-body-fat-calculator",
    name: "Army Body Fat Calculator",
    description:
      "Estimate body fat percentage based on military standards for the Army",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2600,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Calculate body fat percentage using Army standards",
      "Track changes in body fat over time",
      "Provide military fitness advice",
      "Monitor body fat goals for optimal health",
    ],
  },
{
    id: "carbohydrate-calculator",
    name: "Carbohydrate Calculator",
    description:
      "Calculate your ideal daily carbohydrate intake based on your goals and activity level",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Calculate daily carbohydrate needs for weight management",
      "Track carb intake for different goals (weight loss, maintenance, gain)",
      "Personalize carb intake based on activity level",
      "Provide healthy carbohydrate food options",
    ],
  },
{
    id: "lean-body-mass-calculator",
    name: "Lean Body Mass Calculator",
    description:
      "Estimate your lean body mass (LBM) based on weight and body fat percentage",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3200,
    gradient: "from-blue-600 to-teal-600",
    features: [
      "Calculate lean body mass using body fat percentage",
      "Track changes in lean body mass over time",
      "Monitor muscle-building progress",
      "Provide fitness and nutrition tips for lean muscle gain",
    ],
  },
{
    id: "healthy-weight-calculator",
    name: "Healthy Weight Calculator",
    description:
      "Determine your healthy weight range based on height, age, and body composition",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3500,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Estimate healthy weight range based on BMI",
      "Track weight progress toward health goals",
      "Provide tips for achieving a healthy weight",
      "Customizable recommendations for various age groups",
    ],
  },
{
    id: "calories-burned-calculator",
    name: "Calories Burned Calculator",
    description:
      "Estimate the number of calories burned during various activities and exercises",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4000,
    gradient: "from-red-500 to-orange-500",
    features: [
      "Estimate calories burned during workouts and daily activities",
      "Track calorie expenditure based on intensity and duration",
      "Calculate total daily calorie burn for weight management",
      "Provide tips to optimize calorie-burning workouts",
    ],
  },
{
    id: "one-rep-max-calculator",
    name: "One Rep Max Calculator",
    description:
      "Estimate the maximum amount of weight you can lift for one repetition of a given exercise",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3100,
    gradient: "from-blue-500 to-indigo-500",
    features: [
      "Estimate your one-rep max for different exercises",
      "Track progress in strength training over time",
      "Personalized recommendations for strength gains",
      "Monitor your maximum lifting capacity for each exercise",
    ],
  },
{
    id: "protein-calculator",
    name: "Protein Calculator",
    description:
      "Estimate the daily amount of protein needed for muscle gain, weight loss, or maintenance",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Calculate ideal protein intake based on goals (muscle gain, weight loss, etc.)",
      "Track daily protein consumption for muscle recovery",
      "Personalized protein recommendations based on weight and activity level",
      "Provide high-protein food options and meal ideas",
    ],
  },
{
    id: "fat-intake-calculator",
    name: "Fat Intake Calculator",
    description:
      "Estimate the optimal daily fat intake for your health and fitness goals",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2700,
    gradient: "from-pink-500 to-rose-500",
    features: [
      "Calculate daily fat intake based on calorie goals and health requirements",
      "Monitor fat consumption for optimal health",
      "Track changes in fat intake over time",
      "Provide healthy fat food recommendations",
    ],
  },
{
    id: "tdee-calculator",
    name: "TDEE Calculator",
    description:
      "Estimate your Total Daily Energy Expenditure (TDEE) based on your activity level and body type",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-green-600 to-teal-600",
    features: [
      "Estimate your TDEE based on weight, height, age, and activity level",
      "Track daily calorie needs for weight management",
      "Monitor energy expenditure for different activity types",
      "Provide tips to adjust TDEE for weight loss or gain",
    ],
  },
{
    id: "ovulation-calculator",
    name: "Ovulation Calculator",
    description:
      "Estimate your fertile days to help plan for pregnancy based on menstrual cycle",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2900,
    gradient: "from-pink-400 to-purple-500",
    features: [
      "Estimate ovulation window for conception planning",
      "Track menstrual cycle for fertility awareness",
      "Personalize ovulation prediction based on cycle length",
      "Provide tips to increase chances of conception",
    ],
  },
{
    id: "conception-calculator",
    name: "Conception Calculator",
    description:
      "Estimate the best days for conception based on ovulation and cycle length",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2600,
    gradient: "from-purple-500 to-pink-600",
    features: [
      "Track ovulation and fertile days",
      "Estimate the best days for conception",
      "Monitor menstrual cycle for accurate prediction",
      "Provide helpful tips for conception",
    ],
  },
{
    id: "period-calculator",
    name: "Period Calculator",
    description:
      "Calculate the expected start date and duration of your next period based on cycle length",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2400,
    gradient: "from-teal-500 to-cyan-500",
    features: [
      "Track menstrual cycle and predict next period",
      "Estimate period duration and cycle length",
      "Monitor changes in cycle patterns",
      "Provide advice for menstrual health",
    ],
  },
{
    id: "gfr-calculator",
    name: "GFR Calculator",
    description:
      "Estimate your Glomerular Filtration Rate (GFR) to assess kidney function",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2300,
    gradient: "from-indigo-500 to-blue-600",
    features: [
      "Calculate GFR to assess kidney health",
      "Track kidney function over time",
      "Provide personalized recommendations for kidney care",
      "Monitor changes in kidney health based on GFR score",
    ],
  },
{
    id: "body-type-calculator",
    name: "Body Type Calculator",
    description:
      "Estimate your body type (ectomorph, mesomorph, endomorph) based on your physique characteristics",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-orange-600 to-yellow-500",
    features: [
      "Determine your body type for better fitness planning",
      "Provide personalized fitness and nutrition recommendations",
      "Track progress in body composition over time",
      "Monitor changes in body type through physical transformation",
    ],
  },
{
    id: "body-surface-area-calculator",
    name: "Body Surface Area Calculator",
    description:
      "Calculate your body surface area (BSA) based on weight and height",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2900,
    gradient: "from-teal-500 to-blue-500",
    features: [
      "Calculate BSA for medical dosing and assessment",
      "Track changes in body surface area for health monitoring",
      "Personalized health recommendations based on BSA",
      "Provide accurate surface area estimation for treatment plans",
    ],
  },
{
    id: "bac-calculator",
    name: "BAC Calculator",
    description:
      "Estimate your Blood Alcohol Concentration (BAC) based on the number of drinks consumed",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3500,
    gradient: "from-red-500 to-pink-500",
    features: [
      "Calculate BAC levels to understand alcohol impact on body",
      "Monitor BAC for safe drinking and driving decisions",
      "Estimate time for BAC to return to zero",
      "Provide alcohol consumption guidelines for health and safety",
    ],
  },
{
    id: "anorexic-bmi-calculator",
    name: "Anorexic BMI Calculator",
    description:
      "Calculate BMI to assess the risk of anorexia based on weight and height",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2500,
    gradient: "from-purple-500 to-indigo-500",
    features: [
      "Calculate BMI and assess the risk of anorexia",
      "Track changes in BMI for early detection",
      "Provide recommendations for healthy weight management",
      "Monitor physical health related to eating disorders",
    ],
  },
{
    id: "weight-watcher-points-calculator",
    name: "Weight Watcher Points Calculator",
    description:
      "Calculate your daily Weight Watcher points based on food intake and goals",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3200,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Calculate daily Weight Watcher points for managing diet",
      "Track food intake and stay within recommended point limits",
      "Personalize points system based on weight goals",
      "Provide meal and food recommendations based on points",
    ],
  },
{
    id: "overweight-calculator",
    name: "Overweight Calculator",
    description:
      "Determine if you are overweight based on BMI and other health metrics",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-yellow-600 to-orange-600",
    features: [
      "Determine if you are overweight based on BMI and other factors",
      "Track changes in weight and health over time",
      "Provide recommendations for healthy weight loss",
      "Monitor your progress with customized fitness tips",
    ],
  },
{
    id: "scientific-calculator",
    name: "Scientific Calculator",
    description:
      "Perform complex scientific calculations with advanced functions",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4000,
    gradient: "from-blue-600 to-indigo-500",
    features: [
      "Advanced mathematical operations like trigonometry, logarithms, and exponents",
      "Ability to handle complex numbers and scientific functions",
      "Support for calculations in radians, degrees, and other units",
      "Graph plotting for functions and equations",
    ],
  },
{
    id: "fraction-calculator",
    name: "Fraction Calculator",
    description: "Simplify and perform arithmetic operations on fractions",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3200,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Add, subtract, multiply, and divide fractions",
      "Simplify complex fractions",
      "Convert between improper fractions and mixed numbers",
      "Perform operations with fractions and decimals",
    ],
  },
{
    id: "percentage-calculator",
    name: "Percentage Calculator",
    description: "Calculate percentages for any values easily",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3600,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Calculate percentage of any number",
      "Find percentage increase or decrease",
      "Convert a fraction to percentage",
      "Solve percentage problems in everyday scenarios",
    ],
  },
{
    id: "triangle-calculator",
    name: "Triangle Calculator",
    description:
      "Calculate the area, perimeter, angles, and other properties of triangles",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Calculate area, perimeter, and angles of any triangle type",
      "Support for right, isosceles, and equilateral triangles",
      "Calculate unknown sides or angles given partial data",
      "Works with both metric and imperial units",
    ],
  },
{
    id: "volume-calculator",
    name: "Volume Calculator",
    description:
      "Calculate the volume of various 3D objects like cubes, spheres, and cylinders",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3700,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Calculate volume for spheres, cubes, cylinders, and other 3D shapes",
      "Support for different units of volume (e.g., cubic meters, liters)",
      "Calculate surface area alongside volume",
      "Provide detailed step-by-step solutions for each shape",
    ],
  },
{
    id: "standard-deviation-calculator",
    name: "Standard Deviation Calculator",
    description:
      "Calculate the standard deviation of a data set to measure variability",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3100,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Calculate standard deviation for any data set",
      "Support for both population and sample standard deviation",
      "Display detailed steps and explanation for each calculation",
      "Provide variance and other statistical insights",
    ],
  },
{
    id: "random-number-generator",
    name: "Random Number Generator",
    description: "Generate random numbers for use in various applications",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2500,
    gradient: "from-pink-500 to-purple-500",
    features: [
      "Generate random numbers within a specified range",
      "Support for generating random integers and decimals",
      "Use for lotteries, gaming, and random selection",
      "Provide repeatable random sequences with a seed",
    ],
  },
{
    id: "number-sequence-calculator",
    name: "Number Sequence Calculator",
    description:
      "Generate and analyze sequences of numbers based on different patterns",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3000,
    gradient: "from-green-600 to-yellow-500",
    features: [
      "Generate arithmetic and geometric sequences",
      "Identify patterns and relationships between numbers",
      "Solve for missing terms in sequences",
      "Calculate the nth term of any sequence",
    ],
  },
{
    id: "percent-error-calculator",
    name: "Percent Error Calculator",
    description:
      "Calculate percent error to measure the accuracy of an experiment or result",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2600,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Calculate percent error from observed and accepted values",
      "Determine accuracy in scientific experiments",
      "Provide steps for calculating and interpreting errors",
      "Analyze error for quality control and precision",
    ],
  },
{
    id: "exponent-calculator",
    name: "Exponent Calculator",
    description: "Calculate powers and roots of numbers with exponents",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-indigo-500 to-blue-500",
    features: [
      "Perform calculations with integer and fractional exponents",
      "Calculate powers, square roots, cube roots, and other roots",
      "Simplify expressions with exponents",
      "Support for scientific notation",
    ],
  },
{
    id: "binary-calculator",
    name: "Binary Calculator",
    description:
      "Perform operations on binary numbers (add, subtract, multiply, divide)",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-blue-600 to-purple-600",
    features: [
      "Perform arithmetic operations on binary numbers",
      "Convert binary numbers to decimal and vice versa",
      "Calculate binary fractions and other binary operations",
      "Support for both positive and negative binary numbers",
    ],
  },
{
    id: "hex-calculator",
    name: "Hex Calculator",
    description:
      "Perform calculations on hexadecimal numbers (add, subtract, multiply, divide)",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3000,
    gradient: "from-cyan-500 to-teal-500",
    features: [
      "Perform arithmetic operations on hexadecimal numbers",
      "Convert hexadecimal numbers to decimal and binary",
      "Calculate hex fractions and other hex operations",
      "Support for both positive and negative hexadecimal numbers",
    ],
  },
{
    id: "half-life-calculator",
    name: "Half-Life Calculator",
    description:
      "Calculate the remaining quantity of a substance after a given period based on its half-life",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3100,
    gradient: "from-indigo-600 to-blue-500",
    features: [
      "Calculate the remaining amount of substance after a given time",
      "Support for different units of measurement (grams, moles, etc.)",
      "Ability to adjust for different decay rates",
      "Provide clear and detailed step-by-step solutions",
    ],
  },
{
    id: "quadratic-formula-calculator",
    name: "Quadratic Formula Calculator",
    description:
      "Solve quadratic equations using the quadratic formula (ax² + bx + c = 0)",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3200,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Solve quadratic equations for real and complex roots",
      "Provide both exact and decimal solutions",
      "Detailed steps for solving using the quadratic formula",
      "Support for both positive and negative values for a, b, and c",
    ],
  },
{
    id: "slope-calculator",
    name: "Slope Calculator",
    description:
      "Calculate the slope of a line given two points or an equation",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Calculate the slope from two points or slope-intercept form",
      "Support for both positive and negative slopes",
      "Graphing feature to visually represent the slope of the line",
      "Ability to work with linear equations in standard form",
    ],
  },
{
    id: "log-calculator",
    name: "Log Calculator",
    description: "Calculate logarithms of any base for any number",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3000,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Calculate logarithms for any base (e.g., base 10, natural log)",
      "Perform logarithmic calculations for any positive number",
      "Support for solving logarithmic equations",
      "Detailed steps and explanations for logarithmic functions",
    ],
  },
{
    id: "area-calculator",
    name: "Area Calculator",
    description:
      "Calculate the area of different shapes, including circles, rectangles, and triangles",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3400,
    gradient: "from-teal-600 to-green-500",
    features: [
      "Calculate the area of geometric shapes like circles, squares, and triangles",
      "Support for both metric and imperial units",
      "Convert between different units of area",
      "Ability to work with irregular shapes by providing basic dimensions",
    ],
  },
{
    id: "sample-size-calculator",
    name: "Sample Size Calculator",
    description:
      "Calculate the appropriate sample size for surveys and experiments based on confidence level and margin of error",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2900,
    gradient: "from-blue-600 to-green-600",
    features: [
      "Calculate sample size based on population size, margin of error, and confidence level",
      "Support for both finite and infinite populations",
      "Detailed explanation of the statistical formulas used",
      "Works for both proportions and means",
    ],
  },
{
    id: "probability-calculator",
    name: "Probability Calculator",
    description: "Calculate the probability of different events occurring",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Calculate the probability of single and multiple events",
      "Support for conditional probability calculations",
      "Analyze different types of probability distributions",
      "Provide solutions for real-world probability problems",
    ],
  },
{
    id: "statistics-calculator",
    name: "Statistics Calculator",
    description:
      "Perform various statistical calculations like mean, median, mode, and standard deviation",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3500,
    gradient: "from-green-500 to-blue-500",
    features: [
      "Calculate mean, median, mode, and standard deviation for data sets",
      "Analyze data with histograms, box plots, and other statistical tools",
      "Perform hypothesis testing and regression analysis",
      "Interpret statistical results with detailed explanations",
    ],
  },
{
    id: "mean-median-mode-range-calculator",
    name: "Mean, Median, Mode, Range Calculator",
    description: "Calculate the mean, median, mode, and range of a data set",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3600,
    gradient: "from-indigo-500 to-blue-500",
    features: [
      "Quickly calculate mean, median, mode, and range",
      "Support for data sets of any size",
      "Provide step-by-step explanations for each calculation",
      "Analyze data distributions and trends",
    ],
  },
{
    id: "permutation-combination-calculator",
    name: "Permutation and Combination Calculator",
    description:
      "Calculate permutations and combinations for different sets of items",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3100,
    gradient: "from-purple-600 to-pink-500",
    features: [
      "Calculate permutations and combinations for sets of items",
      "Support for calculating arrangements and selections",
      "Detailed step-by-step solutions for each permutation or combination",
      "Works with both large and small data sets",
    ],
  },
{
    id: "z-score-calculator",
    name: "Z-score Calculator",
    description:
      "Calculate the Z-score to determine how far a data point is from the mean in standard deviations",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-cyan-500 to-teal-500",
    features: [
      "Calculate the Z-score for a data point in any distribution",
      "Provide a clear explanation of Z-scores and their significance",
      "Works with both population and sample Z-scores",
      "Interpret results with additional statistical insights",
    ],
  },
{
    id: "confidence-interval-calculator",
    name: "Confidence Interval Calculator",
    description:
      "Calculate the confidence interval for a population mean or proportion",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Calculate the confidence interval for means and proportions",
      "Support for different confidence levels (90%, 95%, 99%)",
      "Provide clear step-by-step solutions for the interval calculation",
      "Interpret the results and assess the precision of estimates",
    ],
  },
{
    id: "ratio-calculator",
    name: "Ratio Calculator",
    description: "Calculate the ratio of two or more quantities",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2900,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Calculate simple and complex ratios",
      "Support for both fractional and decimal ratios",
      "Visual representation of ratios with graphs",
      "Detailed step-by-step breakdown of calculations",
    ],
  },
{
    id: "distance-calculator",
    name: "Distance Calculator",
    description: "Calculate the distance between two points in various units",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Calculate the distance between two coordinates (latitude, longitude)",
      "Support for different distance units (kilometers, miles, etc.)",
      "Visualize distance on a map",
      "Handle both 2D and 3D distance calculations",
    ],
  },
{
    id: "circle-calculator",
    name: "Circle Calculator",
    description:
      "Calculate the circumference, area, and other properties of a circle",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2700,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Calculate the radius, diameter, circumference, and area of a circle",
      "Support for different units of measurement",
      "Visual representation of the circle and its properties",
      "Ability to solve real-world circle-related problems",
    ],
  },
{
    id: "surface-area-calculator",
    name: "Surface Area Calculator",
    description: "Calculate the surface area of various 3D objects",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3000,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Calculate surface area for spheres, cubes, pyramids, and other shapes",
      "Support for both regular and irregular 3D shapes",
      "Convert between different units of surface area",
      "Provide clear explanations of each calculation step",
    ],
  },
{
    id: "pythagorean-theorem-calculator",
    name: "Pythagorean Theorem Calculator",
    description:
      "Calculate the hypotenuse or missing side of a right triangle using the Pythagorean Theorem",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3200,
    gradient: "from-teal-600 to-green-600",
    features: [
      "Calculate the hypotenuse or legs of a right triangle",
      "Support for both integer and decimal values",
      "Visual representation of the triangle with labeled sides",
      "Detailed explanation of the Pythagorean theorem",
    ],
  },
{
    id: "right-triangle-calculator",
    name: "Right Triangle Calculator",
    description:
      "Calculate various properties of a right triangle, including angles, sides, and area",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3100,
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Calculate missing sides, angles, and area of a right triangle",
      "Support for trigonometric calculations (sine, cosine, etc.)",
      "Visualize the triangle with side lengths and angles",
      "Step-by-step breakdown of each calculation",
    ],
  },
{
    id: "root-calculator",
    name: "Root Calculator",
    description:
      "Calculate square roots, cube roots, and other types of roots of numbers",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-pink-500 to-red-500",
    features: [
      "Calculate square roots, cube roots, and nth roots",
      "Support for both positive and negative numbers",
      "Detailed explanation for each root calculation",
      "Ability to find roots of complex numbers",
    ],
  },
{
    id: "least-common-multiple-calculator",
    name: "Least Common Multiple Calculator",
    description:
      "Calculate the Least Common Multiple (LCM) of two or more numbers",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2700,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Calculate the least common multiple (LCM) of two or more numbers",
      "Support for both integer and decimal values",
      "Step-by-step breakdown of the LCM calculation",
      "Ability to find the LCM for large numbers",
    ],
  },
{
    id: "greatest-common-factor-calculator",
    name: "Greatest Common Factor Calculator",
    description:
      "Calculate the Greatest Common Factor (GCF) of two or more numbers",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Calculate the greatest common factor (GCF) or greatest common divisor (GCD)",
      "Support for both integer and decimal values",
      "Detailed breakdown of the GCF calculation",
      "Ability to work with both small and large numbers",
    ],
  },
{
    id: "factor-calculator",
    name: "Factor Calculator",
    description: "Find all factors of a number and check if a number is prime",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3500,
    gradient: "from-teal-600 to-cyan-600",
    features: [
      "Find all the factors of a number",
      "Check if a number is prime",
      "Step-by-step explanation of factorization",
      "Support for both positive and negative numbers",
    ],
  },
{
    id: "rounding-calculator",
    name: "Rounding Calculator",
    description:
      "Round numbers to the nearest specified value or number of decimal places",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2500,
    gradient: "from-blue-500 to-indigo-500",
    features: [
      "Round numbers to a specified decimal place",
      "Round numbers to the nearest whole number, hundred, thousand, etc.",
      "Support for positive and negative numbers",
      "Visual representation of rounded values",
    ],
  },
{
    id: "matrix-calculator",
    name: "Matrix Calculator",
    description:
      "Perform matrix operations such as addition, subtraction, multiplication, and determinant calculation",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3200,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Perform matrix addition, subtraction, and multiplication",
      "Calculate the determinant and inverse of a matrix",
      "Support for different matrix sizes (2x2, 3x3, etc.)",
      "Step-by-step breakdown of each matrix operation",
    ],
  },
{
    id: "scientific-notation-calculator",
    name: "Scientific Notation Calculator",
    description:
      "Convert between scientific notation and standard form for large and small numbers",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2900,
    gradient: "from-purple-600 to-indigo-600",
    features: [
      "Convert numbers to and from scientific notation",
      "Support for large and small numbers",
      "Step-by-step explanation of the conversion process",
      "Visualize numbers in both scientific and standard forms",
    ],
  },
{
    id: "big-number-calculator",
    name: "Big Number Calculator",
    description: "Handle calculations with extremely large numbers",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3300,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Perform arithmetic operations on very large numbers",
      "Handle numbers with high precision",
      "Support for both integers and decimals",
      "Provide accurate results for big number calculations",
    ],
  },
{
    id: "prime-factorization-calculator",
    name: "Prime Factorization Calculator",
    description: "Find the prime factors of a number",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2700,
    gradient: "from-cyan-500 to-blue-500",
    features: [
      "Find the prime factors of any number",
      "Support for both small and large numbers",
      "Step-by-step breakdown of the prime factorization",
      "Visual representation of the factor tree",
    ],
  },
{
    id: "common-factor-calculator",
    name: "Common Factor Calculator",
    description:
      "Find the greatest common factor (GCF) or common factors of two or more numbers",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2800,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Calculate the greatest common factor (GCF) of two or more numbers",
      "Support for both integers and decimals",
      "Step-by-step explanation of the calculation process",
      "Find all common factors of the given numbers",
    ],
  },
{
    id: "basic-calculator",
    name: "Basic Calculator",
    description: "A simple calculator for basic arithmetic operations",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3500,
    gradient: "from-teal-600 to-cyan-600",
    features: [
      "Perform addition, subtraction, multiplication, and division",
      "Support for both integers and decimals",
      "Clear and easy-to-use interface",
      "Show history of previous calculations",
    ],
  },
{
    id: "long-division-calculator",
    name: "Long Division Calculator",
    description:
      "Perform long division calculations and get step-by-step solutions",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 2900,
    gradient: "from-red-500 to-pink-500",
    features: [
      "Perform long division with large numbers",
      "Step-by-step breakdown of the division process",
      "Support for both integer and decimal division",
      "Visualize the division process in a clear manner",
    ],
  },
{
    id: "average-calculator",
    name: "Average Calculator",
    description: "Calculate the average (mean) of a set of numbers",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3100,
    gradient: "from-purple-500 to-pink-500",
    features: [
      "Calculate the average of a list of numbers",
      "Support for both small and large datasets",
      "Visual representation of the data and its average",
      "Step-by-step breakdown of the average calculation",
    ],
  },
{
    id: "p-value-calculator",
    name: "P-value Calculator",
    description: "Calculate the p-value for statistical hypothesis testing",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 3200,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Calculate the p-value for hypothesis testing",
      "Support for t-tests, chi-square tests, and other statistical tests",
      "Provide detailed explanations for statistical analysis",
      "Visualize the significance of the p-value",
    ],
  },
{
    id: "age-calculator",
    name: "Age Calculator",
    description: "Calculate exact age in years, months, weeks, and days",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    ),
    views: 8230,
    gradient: "from-pink-500 to-rose-500",
    features: [
      "Calculate age down to seconds",
      "Find days until next birthday",
      "Calculate age on other planets",
      "Generate personalized age timeline",
      "Discover celebrities sharing your birthdate",
      "Save important dates with notifications",
    ],
  },
{
    id: "date-calculator",
    name: "Date Calculator",
    description: "Calculate date differences and find specific dates",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 4v4M12 12h-0.75a3.75 3.75 0 00-3.75 3.75V16H3v-0.25a4.5 4.5 0 014.5-4.5h2.25V7a3.75 3.75 0 015.25-3.25A7.125 7.125 0 0118.75 7a3.75 3.75 0 011.25-3.25A4.5 4.5 0 0121 6.5h-0.25v2.5a3.75 3.75 0 00-3.75 3.75H16v2.25h.75a3.75 3.75 0 003.75 3.75h.25v2.25h-4.5a3.75 3.75 0 01-3.75-3.75V12H12",
    ),
    views: 6300,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Calculate the difference between two dates",
      "Find the day of the week for any date",
      "Add or subtract days, months, and years from a given date",
      "Track important dates with reminders",
    ],
  },
{
    id: "time-calculator",
    name: "Time Calculator",
    description:
      "Convert time from one unit to another (hours, minutes, seconds)",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M12 5.25v-1.5m0 7.5l5-3m-5 3l-5-3m5 3v-6m-1 5.25H3.75A2.25 2.25 0 0021 14.25V9a1.5 1.5 0 00-1.5-1.5h-1a1.5 1.5 0 00-1.5 1.5v7.5a2.25 2.25 0 002.25 2.25h.75",
    ),
    views: 5600,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Convert between hours, minutes, and seconds",
      "Calculate time differences",
      "Convert time zones easily",
      "Track elapsed time and durations",
    ],
  },
{
    id: "hours-calculator",
    name: "Hours Calculator",
    description:
      "Calculate total hours worked or study hours for specific dates and times",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    ),
    views: 4900,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Track work or study hours over time",
      "Add or subtract hours and minutes from a specific start time",
      "Calculate total hours worked based on daily input",
      "Generate reports for your tracked hours",
    ],
  },
{
    id: "gpa-calculator",
    name: "GPA Calculator",
    description: "Calculate your GPA based on your grades and credits",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4400,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Calculate GPA based on letter grades or numerical scores",
      "Enter your courses, grades, and credit hours",
      "Track GPA progress and goals",
      "Generate semester-wise GPA reports",
    ],
  },
{
    id: "grade-calculator",
    name: "Grade Calculator",
    description:
      "Calculate your grade based on the percentage and desired weight of assignments",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5100,
    gradient: "from-red-500 to-orange-500",
    features: [
      "Calculate grades based on assignment weight",
      "Determine final grades from partial scores",
      "Track grade progress throughout the semester",
      "Set up custom grading scales for different courses",
    ],
  },
{
    id: "height-calculator",
    name: "Height Calculator",
    description: "Calculate your ideal height based on age and gender",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4700,
    gradient: "from-pink-500 to-red-500",
    features: [
      "Calculate the ideal height range for your age and gender",
      "Track height growth over time",
      "Find average heights for people in different countries",
      "Analyze height predictions based on genetics and environment",
    ],
  },
{
    id: "concrete-calculator",
    name: "Concrete Calculator",
    description:
      "Calculate the amount of concrete needed for a specific construction project",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 6000,
    gradient: "from-purple-500 to-indigo-500",
    features: [
      "Calculate concrete for slabs, footings, walls, and foundations",
      "Enter length, width, and depth for the most accurate estimate",
      "Support for different concrete mix ratios",
      "Track material costs for large projects",
    ],
  },
{
    id: "ip-subnet-calculator",
    name: "IP Subnet Calculator",
    description: "Calculate subnets and network addresses for IPv4 addresses",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4300,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate subnet masks and network addresses for IPv4",
      "Determine network ranges and broadcast addresses",
      "Convert between CIDR and subnet mask notations",
      "Analyze IP address allocation in large networks",
    ],
  },
{
    id: "bra-size-calculator",
    name: "Bra Size Calculator",
    description: "Calculate your bra size based on your measurements",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5400,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Enter your bust and underbust measurements to find your size",
      "Compare sizes across different brands and regions",
      "Track changes in your bra size over time",
      "Understand the differences in cup size and band size",
    ],
  },
{
    id: "password-generator",
    name: "Password Generator",
    description: "Generate strong, secure passwords for your online accounts",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 6700,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Generate random, strong passwords",
      "Set password length and complexity",
      "Save and manage passwords securely",
      "Use for generating unique passwords for each account",
    ],
  },
{
    id: "dice-roller",
    name: "Dice Roller",
    description: "Roll virtual dice for games or probability simulations",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5300,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Roll dice of different sizes (6-sided, 20-sided, etc.)",
      "Set custom number of dice to roll",
      "Track dice rolls and probabilities",
      "Generate random dice rolls for board games",
    ],
  },
{
    id: "conversion-calculator",
    name: "Conversion Calculator",
    description:
      "Convert units between different systems (e.g., metric to imperial)",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 6000,
    gradient: "from-red-500 to-pink-500",
    features: [
      "Convert units of length, weight, volume, and more calculation utilities",
    ],
  },
{
    id: "fuel-cost-calculator",
    name: "Fuel Cost Calculator",
    description: "Calculate fuel costs based on your vehicle and trip details",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4800,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate fuel consumption and cost based on distance and fuel efficiency",
      "Track fuel expenses for trips or vehicles",
      "Compare fuel efficiency across different vehicles",
    ],
  },
{
    id: "voltage-drop-calculator",
    name: "Voltage Drop Calculator",
    description: "Calculate voltage drop across electrical circuits",
    category: getCategoryById("calculation"),
    icon: createIcon("M5 7h14l-7 7z"),
    views: 4200,
    gradient: "from-blue-500 to-indigo-500",
    features: [
      "Calculate voltage drop in power distribution systems",
      "Adjust for wire gauge, length, and load",
      "Check compliance with electrical code requirements",
      "Optimize electrical systems for energy efficiency",
    ],
  },
{
    id: "btu-calculator",
    name: "BTU Calculator",
    description: "Calculate the BTU required to cool or heat a space",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5100,
    gradient: "from-orange-500 to-yellow-500",
    features: [
      "Determine the BTU needed for room heating or cooling",
      "Adjust for room size, insulation, and climate",
      "Estimate energy costs based on BTU usage",
      "Optimize HVAC systems for energy efficiency",
    ],
  },
{
    id: "square-footage-calculator",
    name: "Square Footage Calculator",
    description: "Calculate the square footage of a room or area",
    category: getCategoryById("calculation"),
    icon: createIcon(
      "M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5",
    ),
    views: 6000,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Calculate area for floors, walls, and ceilings",
      "Find the total square footage for your construction project",
      "Adjust for odd-shaped rooms",
      "Estimate costs based on square footage",
    ],
  },
{
    id: "time-card-calculator",
    name: "Time Card Calculator",
    description: "Track working hours and calculate wages for employees",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4700,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Track clock-in and clock-out times",
      "Calculate total hours worked and wages",
      "Generate time card reports for payroll",
      "Integrate with existing payroll systems",
    ],
  },
{
    id: "time-zone-calculator",
    name: "Time Zone Calculator",
    description: "Calculate the time difference between two locations",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5500,
    gradient: "from-blue-600 to-cyan-600",
    features: [
      "Convert between time zones across the world",
      "Adjust for daylight savings time changes",
      "Calculate time differences for scheduling meetings",
      "Track time zone changes in real-time",
    ],
  },
{
    id: "love-calculator",
    name: "Love Calculator",
    description:
      "Calculate the compatibility between two people based on their names",
    category: getCategoryById("calculation"),
    icon: createIcon("M10 14l5 5m0 0l5-5m-5 5V3"),
    views: 8000,
    gradient: "from-pink-500 to-red-500",
    features: [
      "Calculate love compatibility based on names",
      "Find out if you and your partner are a perfect match",
      "Add a fun and romantic twist to your day",
      "Share compatibility results with friends",
    ],
  },
{
    id: "gdp-calculator",
    name: "GDP Calculator",
    description: "Calculate the Gross Domestic Product (GDP) of a country",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 12v-6M12 6h6M12 6h-6m0 12v-6M3 3h6v6M3 3h6V12z"),
    views: 6500,
    gradient: "from-green-500 to-blue-500",
    features: [
      "Calculate GDP using expenditure or income methods",
      "Track economic growth over time",
      "Compare GDP between different countries",
      "Forecast future GDP based on trends",
    ],
  },
{
    id: "gas-mileage-calculator",
    name: "Gas Mileage Calculator",
    description: "Calculate the gas mileage for your vehicle",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4600,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Calculate miles per gallon (MPG) for your car",
      "Track fuel efficiency over time",
      "Estimate fuel costs for upcoming trips",
      "Compare fuel efficiency between vehicles",
    ],
  },
{
    id: "horsepower-calculator",
    name: "Horsepower Calculator",
    description: "Calculate the horsepower of your vehicle or engine",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5400,
    gradient: "from-red-500 to-orange-500",
    features: [
      "Estimate horsepower based on engine specifications",
      "Track horsepower for cars, trucks, and machinery",
      "Calculate engine performance improvements",
      "Compare horsepower for different engine types",
    ],
  },
{
    id: "engine-horsepower-calculator",
    name: "Engine Horsepower Calculator",
    description: "Calculate engine horsepower based on torque and RPM",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4800,
    gradient: "from-blue-700 to-indigo-700",
    features: [
      "Calculate horsepower based on engine torque and RPM",
      "Optimize engine performance for speed or efficiency",
      "Track engine modifications and improvements",
    ],
  },
{
    id: "stair-calculator",
    name: "Stair Calculator",
    description:
      "Calculate the number of stairs and their dimensions for a staircase",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5000,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Calculate the number of stairs based on rise and run",
      "Determine the correct step dimensions",
      "Estimate costs for materials based on stair dimensions",
      "Track stair design for safety and comfort",
    ],
  },
{
    id: "resistor-calculator",
    name: "Resistor Calculator",
    description: "Calculate the resistance of resistors in electrical circuits",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4200,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Calculate the resistance based on color codes",
      "Find equivalent resistances for series and parallel circuits",
      "Determine resistor values for desired voltage or current",
      "Optimize resistors for circuit design and power consumption",
    ],
  },
{
    id: "ohms-law-calculator",
    name: "Ohm's Law Calculator",
    description: "Calculate voltage, current, or resistance using Ohm's Law",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5300,
    gradient: "from-blue-500 to-green-500",
    features: [
      "Calculate voltage, current, and resistance",
      "Understand the relationship between voltage, current, and resistance",
      "Optimize electrical systems for power efficiency",
      "Apply Ohm's law to real-world electrical scenarios",
    ],
  },
{
    id: "electricity-calculator",
    name: "Electricity Calculator",
    description: "Calculate electrical power consumption and cost",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 6000,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Estimate power usage for electrical appliances",
      "Calculate monthly electricity costs based on usage",
      "Determine the energy efficiency of devices",
      "Track and reduce electricity consumption",
    ],
  },
{
    id: "tip-calculator",
    name: "Tip Calculator",
    description: "Calculate the appropriate tip for your restaurant bill",
    category: getCategoryById("calculation"),
    icon: createIcon("M5 7h14l-7 7z"),
    views: 4900,
    gradient: "from-pink-500 to-red-500",
    features: [
      "Calculate tips based on percentage or custom amounts",
      "Split the bill with multiple people",
      "Estimate total bill including tip and taxes",
      "Adjust tips based on service quality",
    ],
  },
{
    id: "mileage-calculator",
    name: "Mileage Calculator",
    description: "Calculate your vehicle’s mileage or fuel efficiency",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5300,
    gradient: "from-teal-500 to-cyan-500",
    features: [
      "Estimate miles per gallon (MPG) for your vehicle",
      "Track fuel efficiency over time",
      "Compare fuel consumption for different trips",
      "Estimate fuel costs for upcoming travels",
    ],
  },
{
    id: "density-calculator",
    name: "Density Calculator",
    description: "Calculate the density of an object or material",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4800,
    gradient: "from-green-500 to-yellow-500",
    features: [
      "Calculate the density based on mass and volume",
      "Estimate material properties for engineering purposes",
      "Apply density values to fluid dynamics, construction, and other fields",
      "Convert between different units of density",
    ],
  },
{
    id: "mass-calculator",
    name: "Mass Calculator",
    description: "Calculate the mass of an object or material",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5500,
    gradient: "from-indigo-500 to-purple-500",
    features: [
      "Calculate mass using weight and gravitational force",
      "Convert mass between different units (grams, kilograms, etc.)",
      "Apply mass values to physics problems and real-world applications",
    ],
  },
{
    id: "weight-calculator",
    name: "Weight Calculator",
    description: "Calculate the weight of an object based on its mass",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4600,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate weight based on mass and gravitational force",
      "Estimate weight changes at different altitudes or on other planets",
      "Track changes in weight for scientific studies or personal use",
    ],
  },
{
    id: "speed-calculator",
    name: "Speed Calculator",
    description: "Calculate speed from distance and time",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4700,
    gradient: "from-green-600 to-yellow-600",
    features: [
      "Calculate speed based on distance and time",
      "Estimate travel time for different distances",
      "Track your progress in sports or racing events",
    ],
  },
{
    id: "molarity-calculator",
    name: "Molarity Calculator",
    description: "Calculate molarity of a solution based on mols and volume",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4200,
    gradient: "from-teal-500 to-cyan-500",
    features: [
      "Calculate molarity (M) for solutions",
      "Determine concentration in moles per liter",
      "Apply molarity in chemistry experiments and research",
    ],
  },
{
    id: "molecular-weight-calculator",
    name: "Molecular Weight Calculator",
    description: "Calculate the molecular weight of a compound or molecule",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5300,
    gradient: "from-blue-700 to-indigo-700",
    features: [
      "Calculate molecular weight based on atomic weights",
      "Determine the molecular mass of a compound for chemistry calculations",
      "Convert between different units of molecular weight",
    ],
  },
{
    id: "roman-numeral-converter",
    name: "Roman Numeral Converter",
    description: "Convert Roman numerals to decimal numbers and vice versa",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5400,
    gradient: "from-gray-500 to-black",
    features: [
      "Convert Roman numerals to modern numbers",
      "Reverse the process and convert decimal numbers into Roman numerals",
      "Learn the history and usage of Roman numerals",
    ],
  },
{
    id: "golf-handicap-calculator",
    name: "Golf Handicap Calculator",
    description:
      "Calculate your golf handicap based on scores and course difficulty",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 6000,
    gradient: "from-green-500 to-teal-500",
    features: [
      "Track your golf scores and handicap",
      "Calculate your handicap index based on your performance",
      "Estimate your skill level relative to other players",
    ],
  },
{
    id: "tire-size-calculator",
    name: "Tire Size Calculator",
    description:
      "Calculate tire size and understand its impact on vehicle performance",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4800,
    gradient: "from-gray-500 to-black",
    features: [
      "Calculate tire circumference, diameter, and radius",
      "Compare tire sizes for better fuel efficiency and performance",
      "Understand the effect of tire size on vehicle handling",
    ],
  },
{
    id: "roofing-calculator",
    name: "Roofing Calculator",
    description: "Estimate the materials needed for your roofing project",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5200,
    gradient: "from-orange-500 to-red-500",
    features: [
      "Calculate the area of the roof",
      "Estimate the quantity of materials required for roofing",
      "Track costs for roofing projects",
    ],
  },
{
    id: "tile-calculator",
    name: "Tile Calculator",
    description:
      "Calculate the number of tiles required for a floor or wall project",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5300,
    gradient: "from-teal-500 to-green-500",
    features: [
      "Estimate the number of tiles needed for a surface area",
      "Account for tile size and layout patterns",
      "Calculate the cost of tiles based on quantity",
    ],
  },
{
    id: "mulch-calculator",
    name: "Mulch Calculator",
    description: "Estimate the amount of mulch required for landscaping",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4600,
    gradient: "from-brown-500 to-green-500",
    features: [
      "Estimate how much mulch is needed for your garden",
      "Determine the amount of mulch per square foot or meter",
      "Track costs for landscaping and mulch purchase",
    ],
  },
{
    id: "gravel-calculator",
    name: "Gravel Calculator",
    description:
      "Estimate the amount of gravel required for your construction or landscaping project",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4700,
    gradient: "from-gray-700 to-gray-500",
    features: [
      "Calculate the volume of gravel needed for a given area",
      "Track costs of gravel for different construction projects",
      "Estimate the weight of gravel required",
    ],
  },
{
    id: "wind-chill-calculator",
    name: "Wind Chill Calculator",
    description:
      "Calculate the wind chill factor based on temperature and wind speed",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5400,
    gradient: "from-blue-500 to-cyan-500",
    features: [
      "Estimate the perceived temperature based on wind speed",
      "Understand the impact of wind chill on your health",
      "Track real-time wind chill values",
    ],
  },
{
    id: "heat-index-calculator",
    name: "Heat Index Calculator",
    description:
      "Calculate the heat index based on temperature and humidity levels",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5600,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Determine how hot the weather feels based on humidity and temperature",
      "Estimate the risk of heat-related illnesses",
      "Monitor the heat index for outdoor activities",
    ],
  },
{
    id: "dew-point-calculator",
    name: "Dew Point Calculator",
    description:
      "Calculate the dew point based on temperature and relative humidity",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4800,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate dew point to estimate moisture in the air",
      "Understand weather conditions for outdoor events",
      "Track changes in dew point over time",
    ],
  },
{
    id: "bandwidth-calculator",
    name: "Bandwidth Calculator",
    description:
      "Calculate bandwidth requirements for a given number of users or devices",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4900,
    gradient: "from-green-600 to-blue-600",
    features: [
      "Estimate bandwidth needs based on user activity",
      "Track bandwidth usage for home or office networks",
      "Optimize internet speed for better performance",
    ],
  },
{
    id: "time-duration-calculator",
    name: "Time Duration Calculator",
    description: "Calculate the duration between two dates or times",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4700,
    gradient: "from-purple-500 to-indigo-500",
    features: [
      "Determine the time difference between two dates or times",
      "Convert between different units of time",
      "Track deadlines and time-sensitive projects",
    ],
  },
{
    id: "day-counter",
    name: "Day Counter",
    description: "Count the number of days between two dates",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 4800,
    gradient: "from-yellow-500 to-orange-500",
    features: [
      "Calculate the number of days between any two given dates",
      "Track important dates and milestones",
      "Plan future events and deadlines",
    ],
  },
{
    id: "day-of-the-week-calculator",
    name: "Day of the Week Calculator",
    description: "Find out the day of the week for any given date",
    category: getCategoryById("calculation"),
    icon: createIcon("M4 4l4 4-4 4z"),
    views: 5000,
    gradient: "from-pink-500 to-red-500",
    features: [
      "Determine the day of the week for any past, present, or future date",
      "Check historical events by day of the week",
      "Plan activities and events based on specific weekdays",
    ],
  },
{
    id: "loan-calculator-tool",
    name: "Loan Calculator",
    description: "Calculate monthly loan payments, total interest, and payment schedule for any loan",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2C13.1 2 14 2.9 14 4V6H10V4C10 2.9 10.9 2 12 2ZM21 6V4C21 2.9 20.1 2 19 2H17V6H21ZM3 6V4C3 2.9 3.9 2 5 2H7V6H3ZM21 8H3V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8Z"),
    views: 245,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate monthly loan payments instantly",
      "View total interest over loan term",
      "See complete payment breakdown",
      "Works for any loan type (mortgage, personal, business)",
      "Handles zero-interest loans automatically",
      "Professional results with detailed breakdown"
    ],
  },
{
    id: "auto-loan-calculator-tool",
    name: "Auto Loan Calculator",
    description: "Calculate car loan payments including down payment considerations and total cost",
    category: getCategoryById("calculation"),
    icon: createIcon("M5 11L7.5 6.5C8.11 5.59 9.18 5 10.35 5H13.65C14.82 5 15.89 5.59 16.5 6.5L19 11H5ZM1.5 16.5V21C1.5 21.83 2.17 22.5 3 22.5S4.5 21.83 4.5 21V20H19.5V21C19.5 21.83 20.17 22.5 21 22.5S22.5 21.83 22.5 21V16.5L21.47 12.85C21.08 11.63 19.92 10.8 18.65 10.8H16.74L15.49 8.68C14.78 7.57 13.56 6.9 12.24 6.9H11.76C10.44 6.9 9.22 7.57 8.51 8.68L7.26 10.8H5.35C4.08 10.8 2.92 11.63 2.53 12.85L1.5 16.5Z"),
    views: 189,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate auto loan payments with down payment",
      "See actual loan amount after down payment",
      "View total cost including down payment",
      "Calculate total interest on financed amount",
      "Perfect for car, truck, or motorcycle financing",
      "Handles cases with full cash payment"
    ],
  },
{
    id: "interest-calculator-tool",
    name: "Interest Calculator",
    description: "Calculate simple or compound interest on investments with various compounding frequencies",
    category: getCategoryById("calculation"),
    icon: createIcon("M2 12C2 6.48 6.48 2 12 2S22 6.48 22 12 17.52 22 12 22 2 17.52 2 12ZM15.5 8L12 12L8.5 8H15.5ZM8.5 16L12 12L15.5 16H8.5Z"),
    views: 156,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Calculate simple interest for loans and investments",
      "Calculate compound interest with various frequencies",
      "Compare different compounding periods",
      "Annual, semi-annual, quarterly, monthly, and daily compounding",
      "View total return on investment",
      "Perfect for savings accounts and investments"
    ],
  },
{
    id: "payment-calculator-tool",
    name: "Payment Calculator",
    description: "Calculate payment schedules for different frequencies including weekly, monthly, and quarterly",
    category: getCategoryById("calculation"),
    icon: createIcon("M2 17H22V19H2V17ZM1.15 12.95L4 16L1.15 19.05L2.85 20.95L7.15 16L2.85 11.05L1.15 12.95ZM21.15 12.95L18.3 16L21.15 19.05L19.45 20.95L15.15 16L19.45 11.05L21.15 12.95ZM11 14V18H13V14H17L12 9L7 14H11Z"),
    views: 134,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Calculate payments for multiple frequencies",
      "Compare weekly, bi-weekly, monthly payments",
      "See total interest for different schedules",
      "Perfect for debt consolidation planning",
      "Flexible payment frequency options",
      "Accurate calculations for any loan type"
    ],
  },
{
    id: "retirement-calculator-tool",
    name: "Retirement Calculator",
    description: "Plan retirement savings based on current savings, monthly contributions, and expected returns",
    category: getCategoryById("calculation"),
    icon: createIcon("M9.5 2C8.4 2 7.5 2.9 7.5 4S8.4 6 9.5 6 11.5 5.1 11.5 4 10.6 2 9.5 2ZM9.75 22V16.5L7.91 10.09C7.66 9.22 8.13 8.31 8.97 8.06C9.8 7.81 10.69 8.28 10.94 9.11L12 13H15V15H12.6L12.2 13.65L13.5 19.8C13.81 21 13.09 22.22 11.89 22.53C11.26 22.71 10.62 22.53 10.16 22.12L9.75 22ZM1 22H4L6 16L4.5 10.5C4.31 9.85 4.66 9.16 5.31 8.97C5.97 8.78 6.66 9.13 6.85 9.78L8.5 15.5H11V17.5H7.65L6.5 14.26L5.92 18.48L4 22H1Z"),
    views: 178,
    gradient: "from-teal-600 to-cyan-600",
    features: [
      "Calculate retirement savings projections",
      "Include current savings and monthly contributions",
      "Factor in expected investment returns",
      "See total contributions vs. interest earned",
      "Plan for any retirement age",
      "Understand the power of compound growth"
    ],
  },
{
    id: "loan-calculator-tool",
    name: "Loan Calculator",
    description: "Calculate monthly loan payments, total interest, and payment schedule for any loan",
    category: getCategoryById("calculation"),
    icon: createIcon("M12 2C13.1 2 14 2.9 14 4V6H10V4C10 2.9 10.9 2 12 2ZM21 6V4C21 2.9 20.1 2 19 2H17V6H21ZM3 6V4C3 2.9 3.9 2 5 2H7V6H3ZM21 8H3V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V8Z"),
    views: 245,
    gradient: "from-blue-600 to-indigo-600",
    features: [
      "Calculate monthly loan payments instantly",
      "View total interest over loan term",
      "See complete payment breakdown",
      "Works for any loan type (mortgage, personal, business)",
      "Handles zero-interest loans automatically",
      "Professional results with detailed breakdown"
    ],
  },
{
    id: "auto-loan-calculator-tool",
    name: "Auto Loan Calculator",
    description: "Calculate car loan payments including down payment considerations and total cost",
    category: getCategoryById("calculation"),
    icon: createIcon("M5 11L7.5 6.5C8.11 5.59 9.18 5 10.35 5H13.65C14.82 5 15.89 5.59 16.5 6.5L19 11H5ZM1.5 16.5V21C1.5 21.83 2.17 22.5 3 22.5S4.5 21.83 4.5 21V20H19.5V21C19.5 21.83 20.17 22.5 21 22.5S22.5 21.83 22.5 21V16.5L21.47 12.85C21.08 11.63 19.92 10.8 18.65 10.8H16.74L15.49 8.68C14.78 7.57 13.56 6.9 12.24 6.9H11.76C10.44 6.9 9.22 7.57 8.51 8.68L7.26 10.8H5.35C4.08 10.8 2.92 11.63 2.53 12.85L1.5 16.5Z"),
    views: 189,
    gradient: "from-green-600 to-emerald-600",
    features: [
      "Calculate auto loan payments with down payment",
      "See actual loan amount after down payment",
      "View total cost including down payment",
      "Calculate total interest on financed amount",
      "Perfect for car, truck, or motorcycle financing",
      "Handles cases with full cash payment"
    ],
  },
{
    id: "interest-calculator-tool",
    name: "Interest Calculator",
    description: "Calculate simple or compound interest on investments with various compounding frequencies",
    category: getCategoryById("calculation"),
    icon: createIcon("M2 12C2 6.48 6.48 2 12 2S22 6.48 22 12 17.52 22 12 22 2 17.52 2 12ZM15.5 8L12 12L8.5 8H15.5ZM8.5 16L12 12L15.5 16H8.5Z"),
    views: 156,
    gradient: "from-purple-600 to-pink-600",
    features: [
      "Calculate simple interest for loans and investments",
      "Calculate compound interest with various frequencies",
      "Compare different compounding periods",
      "Annual, semi-annual, quarterly, monthly, and daily compounding",
      "View total return on investment",
      "Perfect for savings accounts and investments"
    ],
  },
{
    id: "payment-calculator-tool",
    name: "Payment Calculator",
    description: "Calculate payment schedules for different frequencies including weekly, monthly, and quarterly",
    category: getCategoryById("calculation"),
    icon: createIcon("M2 17H22V19H2V17ZM1.15 12.95L4 16L1.15 19.05L2.85 20.95L7.15 16L2.85 11.05L1.15 12.95ZM21.15 12.95L18.3 16L21.15 19.05L19.45 20.95L15.15 16L19.45 11.05L21.15 12.95ZM11 14V18H13V14H17L12 9L7 14H11Z"),
    views: 134,
    gradient: "from-orange-600 to-red-600",
    features: [
      "Calculate payments for multiple frequencies",
      "Compare weekly, bi-weekly, monthly payments",
      "See total interest for different schedules",
      "Perfect for debt consolidation planning",
      "Flexible payment frequency options",
      "Accurate calculations for any loan type"
    ],
  },
{
    id: "retirement-calculator-tool",
    name: "Retirement Calculator",
    description: "Plan retirement savings based on current savings, monthly contributions, and expected returns",
    category: getCategoryById("calculation"),
    icon: createIcon("M9.5 2C8.4 2 7.5 2.9 7.5 4S8.4 6 9.5 6 11.5 5.1 11.5 4 10.6 2 9.5 2ZM9.75 22V16.5L7.91 10.09C7.66 9.22 8.13 8.31 8.97 8.06C9.8 7.81 10.69 8.28 10.94 9.11L12 13H15V15H12.6L12.2 13.65L13.5 19.8C13.81 21 13.09 22.22 11.89 22.53C11.26 22.71 10.62 22.53 10.16 22.12L9.75 22ZM1 22H4L6 16L4.5 10.5C4.31 9.85 4.66 9.16 5.31 8.97C5.97 8.78 6.66 9.13 6.85 9.78L8.5 15.5H11V17.5H7.65L6.5 14.26L5.92 18.48L4 22H1Z"),
    views: 178,
    gradient: "from-teal-600 to-cyan-600",
    features: [
      "Calculate retirement savings projections",
      "Include current savings and monthly contributions",
      "Factor in expected investment returns",
      "See total contributions vs. interest earned",
      "Plan for any retirement age",
      "Understand the power of compound growth"
    ],
  },
];
