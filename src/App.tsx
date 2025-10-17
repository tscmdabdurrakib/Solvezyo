import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { ToolsProvider } from "@/context/ToolsContext";
import { ThemeProvider } from "@/lib/ThemeProvider";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { Suspense, lazy } from "react";
import { usePreloadComponents } from "@/hooks/usePreloadComponents";
import { usePerformanceOptimization } from "@/hooks/usePerformanceOptimization";
import {
  ArrowLeft,
  ArrowRight,
  Home as HomeIcon,
  RefreshCw,
  Star,
  Printer,
  Code2,
  Rss,
  Info,
  User,
  Mail,
} from "lucide-react";
const Home = lazy(() => import("@/pages/Home"));
const NotFound = lazy(() => import("@/pages/not-found"));
const LoginPage = lazy(() => import("@/pages/LoginPage"));
const SignupPage = lazy(() => import("@/pages/SignupPage"));
const EnhancedLoginPage = lazy(() => import("@/pages/EnhancedLoginPage"));
const ToolPage = lazy(() => import("@/pages/ToolPage"));
const CategoryPage = lazy(() => import("@/pages/CategoryPage"));
const CategoriesPage = lazy(() => import("@/pages/CategoriesPage"));
const SearchPage = lazy(() => import("@/pages/SearchPage"));
const AboutPage = lazy(() => import("@/pages/AboutPage"));
const AuthorPage = lazy(() => import("@/pages/AuthorPage"));
const ContactPage = lazy(() => import("@/pages/ContactPage"));
const FavoriteToolsPage = lazy(() => import("@/pages/FavoriteToolsPage"));
const BlogPage = lazy(() => import("@/pages/BlogPage"));
const BlogSinglePage = lazy(() => import("@/pages/BlogSinglePage"));
const ChangelogPage = lazy(() => import("@/pages/ChangelogPage"));

// Legal pages
const PrivacyPolicyPage = lazy(() => import("@/pages/PrivacyPolicyPage"));
const TermsOfServicePage = lazy(() => import("@/pages/TermsOfServicePage"));
const DisclaimerPage = lazy(() => import("@/pages/DisclaimerPage"));
const DMCAPolicyPage = lazy(() => import("@/pages/DMCAPolicyPage"));
const SitemapPage = lazy(() => import("@/pages/SitemapPage"));

// Tool pages - lazy loaded
const LengthConverterPage = lazy(() => import("@/pages/tools/LengthConverterPage"));
const WeightMassConverterPage = lazy(() => import("@/pages/tools/WeightMassConverterPage"));
const VolumeConverterPage = lazy(() => import("@/pages/tools/VolumeConverterPage"));
const TemperatureConverterPage = lazy(() => import("@/pages/tools/TemperatureConverterPage"));
const AreaConverterPage = lazy(() => import("@/pages/tools/AreaConverterPage"));
const PressureConverterPage = lazy(() => import("@/pages/tools/PressureConverterPage"));
const DataStorageConverterPage = lazy(() => import("@/pages/tools/DataStorageConverterPage"));
const TimeConverterPage = lazy(() => import("@/pages/tools/TimeConverterPage"));
const SpeedConverterPage = lazy(() => import("@/pages/tools/SpeedConverterPage"));
const NumbersConverterPage = lazy(() => import("@/pages/tools/NumbersConverterPage"));
const EnergyConverterPage = lazy(() => import("@/pages/tools/EnergyConverterPage"));
const PowerConverterPage = lazy(() => import("@/pages/tools/PowerConverterPage"));
const ForceConverterPage = lazy(() => import("@/pages/tools/ForceConverterPage"));
const AngleConverterPage = lazy(() => import("@/pages/tools/AngleConverterPage"));
const MortgageCalculatorPage = lazy(() => import("@/pages/tools/MortgageCalculatorPage"));
const SocialSecurityCalculatorPage = lazy(() => import("@/pages/tools/SocialSecurityCalculatorPage"));
const AnnuityCalculatorPage = lazy(() => import("@/pages/tools/AnnuityCalculatorPage"));
const AnnuityPayoutCalculatorPage = lazy(() => import("@/pages/tools/AnnuityPayoutCalculatorPage"));
const CreditCardCalculatorPage = lazy(() => import("@/pages/tools/CreditCardCalculatorPage"));
const CreditCardsPayoffCalculatorPage = lazy(() => import("@/pages/tools/CreditCardsPayoffCalculatorPage"));
const DebtPayoffCalculatorPage = lazy(() => import("@/pages/tools/DebtPayoffCalculatorPage"));
const DebtConsolidationCalculatorPage = lazy(() => import("@/pages/tools/DebtConsolidationCalculatorPage"));
const RepaymentCalculatorPage = lazy(() => import("@/pages/tools/RepaymentCalculatorPage"));
const StudentLoanCalculatorPage = lazy(() => import("@/pages/tools/StudentLoanCalculatorPage"));
const CollegeCostCalculatorPage = lazy(() => import("@/pages/tools/CollegeCostCalculatorPage"));

// New Calculation Tools
const SimpleInterestCalculatorPage = lazy(() => import("@/pages/tools/SimpleInterestCalculatorPage"));
const CDCalculatorPage = lazy(() => import("@/pages/tools/CDCalculatorPage"));
const BondCalculatorPage = lazy(() => import("@/pages/tools/BondCalculatorPage"));
const RothIRACalculatorPage = lazy(() => import("@/pages/tools/RothIRACalculatorPage"));
const IRACalculatorPage = lazy(() => import("@/pages/tools/IRACalculatorPage"));
const RMDCalculatorPage = lazy(() => import("@/pages/tools/RMDCalculatorPage"));
const VATCalculatorPage = lazy(() => import("@/pages/tools/VATCalculatorPage"));
const CashBackOrLowInterestCalculatorPage = lazy(() => import("@/pages/tools/CashBackOrLowInterestCalculatorPage"));
const AutoLeaseCalculatorPage = lazy(() => import("@/pages/tools/AutoLeaseCalculatorPage"));
const DepreciationCalculatorPage = lazy(() => import("@/pages/tools/DepreciationCalculatorPage"));

// New Calculation Tools - Batch 2
const AverageReturnCalculatorPage = lazy(() => import("@/pages/tools/AverageReturnCalculatorPage"));
const MarginCalculatorPage = lazy(() => import("@/pages/tools/MarginCalculatorPage"));
const DiscountCalculatorPage = lazy(() => import("@/pages/tools/DiscountCalculatorPage"));
const BusinessLoanCalculatorPage = lazy(() => import("@/pages/tools/BusinessLoanCalculatorPage"));
const DebtToIncomeRatioCalculatorPage = lazy(() => import("@/pages/tools/DebtToIncomeRatioCalculatorPage"));
const RealEstateCalculatorPage = lazy(() => import("@/pages/tools/RealEstateCalculatorPage"));
const TakeHomePaycheckCalculatorPage = lazy(() => import("@/pages/tools/TakeHomePaycheckCalculatorPage"));
const PersonalLoanCalculatorPage = lazy(() => import("@/pages/tools/PersonalLoanCalculatorPage"));
const BoatLoanCalculatorPage = lazy(() => import("@/pages/tools/BoatLoanCalculatorPage"));
const LeaseCalculatorPage = lazy(() => import("@/pages/tools/LeaseCalculatorPage"));

// New Calculation Tools - Batch 3
const RefinanceCalculatorPage = lazy(() => import("@/pages/tools/RefinanceCalculatorPage"));
const BudgetCalculatorPage = lazy(() => import("@/pages/tools/BudgetCalculatorPage"));
const RentalPropertyCalculatorPage = lazy(() => import("@/pages/tools/RentalPropertyCalculatorPage"));
const IRRCalculatorPage = lazy(() => import("@/pages/tools/IRRCalculatorPage"));
const ROICalculatorPage = lazy(() => import("@/pages/tools/ROICalculatorPage"));
const APRCalculatorPage = lazy(() => import("@/pages/tools/APRCalculatorPage"));
const FHALoanCalculatorPage = lazy(() => import("@/pages/tools/FHALoanCalculatorPage"));
const VAMortgageCalculatorPage = lazy(() => import("@/pages/tools/VAMortgageCalculatorPage"));
const DownPaymentCalculatorPage = lazy(() => import("@/pages/tools/DownPaymentCalculatorPage"));
const RentVsBuyCalculatorPage = lazy(() => import("@/pages/tools/RentVsBuyCalculatorPage"));

// New Calculation Tools - Batch 4
const PaybackPeriodCalculatorPage = lazy(() => import("@/pages/tools/PaybackPeriodCalculatorPage"));
const PresentValueCalculatorPage = lazy(() => import("@/pages/tools/PresentValueCalculatorPage"));
const FutureValueCalculatorPage = lazy(() => import("@/pages/tools/FutureValueCalculatorPage"));
const CommissionCalculatorPage = lazy(() => import("@/pages/tools/CommissionCalculatorPage"));
const MortgageCalculatorUKPage = lazy(() => import("@/pages/tools/MortgageCalculatorUKPage"));
const CanadianMortgageCalculatorPage = lazy(() => import("@/pages/tools/CanadianMortgageCalculatorPage"));
const MortgageAmortizationCalculatorPage = lazy(() => import("@/pages/tools/MortgageAmortizationCalculatorPage"));
const PercentOffCalculatorPage = lazy(() => import("@/pages/tools/PercentOffCalculatorPage"));
const BMICalculatorPage = lazy(() => import("@/pages/tools/BMICalculatorPage"));
const CalorieCalculatorPage = lazy(() => import("@/pages/tools/CalorieCalculatorPage"));

// New Health & Fitness Calculators - Batch 5
const BodyFatCalculatorPage = lazy(() => import("@/pages/tools/BodyFatCalculatorPage"));
const BMRCalculatorPage = lazy(() => import("@/pages/tools/BMRCalculatorPage"));
const MacroCalculatorPage = lazy(() => import("@/pages/tools/MacroCalculatorPage"));
const IdealWeightCalculatorPage = lazy(() => import("@/pages/tools/IdealWeightCalculatorPage"));
const PregnancyCalculatorPage = lazy(() => import("@/pages/tools/PregnancyCalculatorPage"));
const PregnancyWeightGainCalculatorPage = lazy(() => import("@/pages/tools/PregnancyWeightGainCalculatorPage"));
const PregnancyConceptionCalculatorPage = lazy(() => import("@/pages/tools/PregnancyConceptionCalculatorPage"));
const DueDateCalculatorPage = lazy(() => import("@/pages/tools/DueDateCalculatorPage"));
const PaceCalculatorPage = lazy(() => import("@/pages/tools/PaceCalculatorPage"));
const ArmyBodyFatCalculatorPage = lazy(() => import("@/pages/tools/ArmyBodyFatCalculatorPage"));

// New Health & Fitness Calculators - Batch 6
const CarbohydrateCalculatorPage = lazy(() => import("@/pages/tools/CarbohydrateCalculatorPage"));
const LeanBodyMassCalculatorPage = lazy(() => import("@/pages/tools/LeanBodyMassCalculatorPage"));
const HealthyWeightCalculatorPage = lazy(() => import("@/pages/tools/HealthyWeightCalculatorPage"));
const CaloriesBurnedCalculatorPage = lazy(() => import("@/pages/tools/CaloriesBurnedCalculatorPage"));
const OneRepMaxCalculatorPage = lazy(() => import("@/pages/tools/OneRepMaxCalculatorPage"));
const ProteinCalculatorPage = lazy(() => import("@/pages/tools/ProteinCalculatorPage"));
const FatIntakeCalculatorPage = lazy(() => import("@/pages/tools/FatIntakeCalculatorPage"));
const TDEECalculatorPage = lazy(() => import("@/pages/tools/TDEECalculatorPage"));
const OvulationCalculatorPage = lazy(() => import("@/pages/tools/OvulationCalculatorPage"));
const ConceptionCalculatorPage = lazy(() => import("@/pages/tools/ConceptionCalculatorPage"));

// New Health & Calculation Tools - Batch 7
const PeriodCalculatorPage = lazy(() => import("@/pages/tools/PeriodCalculatorPage"));
const GFRCalculatorPage = lazy(() => import("@/pages/tools/GFRCalculatorPage"));
const BodyTypeCalculatorPage = lazy(() => import("@/pages/tools/BodyTypeCalculatorPage"));
const BodySurfaceAreaCalculatorPage = lazy(() => import("@/pages/tools/BodySurfaceAreaCalculatorPage"));
const BACCalculatorPage = lazy(() => import("@/pages/tools/BACCalculatorPage"));
const AnorexicBMICalculatorPage = lazy(() => import("@/pages/tools/AnorexicBMICalculatorPage"));
const WeightWatcherPointsCalculatorPage = lazy(() => import("@/pages/tools/WeightWatcherPointsCalculatorPage"));
const OverweightCalculatorPage = lazy(() => import("@/pages/tools/OverweightCalculatorPage"));
const ScientificCalculatorPage = lazy(() => import("@/pages/tools/ScientificCalculatorPage"));
const FractionCalculatorPage = lazy(() => import("@/pages/tools/FractionCalculatorPage"));

// New Calculation Tools - Batch 8
const AverageCalculatorPage = lazy(() => import("@/pages/tools/AverageCalculatorPage"));
const PValueCalculatorPage = lazy(() => import("@/pages/tools/PValueCalculatorPage"));
const AgeCalculatorPage = lazy(() => import("@/pages/tools/AgeCalculatorPage"));
const DateCalculatorPage = lazy(() => import("@/pages/tools/DateCalculatorPage"));
const TimeCalculatorPage = lazy(() => import("@/pages/tools/TimeCalculatorPage"));
const HoursCalculatorPage = lazy(() => import("@/pages/tools/HoursCalculatorPage"));
const GPACalculatorPage = lazy(() => import("@/pages/tools/GPACalculatorPage"));
const GradeCalculatorPage = lazy(() => import("@/pages/tools/GradeCalculatorPage"));
const HeightCalculatorPage = lazy(() => import("@/pages/tools/HeightCalculatorPage"));
const ConcreteCalculatorPage = lazy(() => import("@/pages/tools/ConcreteCalculatorPage"));

// New Calculation Tools - Batch 9 (User Request)
const PercentageCalculatorPage = lazy(() => import("@/pages/tools/PercentageCalculatorPage"));
const TriangleCalculatorPage = lazy(() => import("@/pages/tools/TriangleCalculatorPage"));
const VolumeCalculatorPage = lazy(() => import("@/pages/tools/VolumeCalculatorPage"));
const StandardDeviationCalculatorPage = lazy(() => import("@/pages/tools/StandardDeviationCalculatorPage"));
const RandomNumberGeneratorPage = lazy(() => import("@/pages/tools/RandomNumberGeneratorPage"));
const NumberSequenceCalculatorPage = lazy(() => import("@/pages/tools/NumberSequenceCalculatorPage"));
const PercentErrorCalculatorPage = lazy(() => import("@/pages/tools/PercentErrorCalculatorPage"));
const ExponentCalculatorPage = lazy(() => import("@/pages/tools/ExponentCalculatorPage"));
const BinaryCalculatorPage = lazy(() => import("@/pages/tools/BinaryCalculatorPage"));
const HexCalculatorPage = lazy(() => import("@/pages/tools/HexCalculatorPage"));

// New Calculation Tools - Batch 10 (Math & Statistics)
const HalfLifeCalculatorPage = lazy(() => import("@/pages/tools/HalfLifeCalculatorPage"));
const QuadraticFormulaCalculatorPage = lazy(() => import("@/pages/tools/QuadraticFormulaCalculatorPage"));
const SlopeCalculatorPage = lazy(() => import("@/pages/tools/SlopeCalculatorPage"));
const LogCalculatorPage = lazy(() => import("@/pages/tools/LogCalculatorPage"));
const AreaCalculatorPage = lazy(() => import("@/pages/tools/AreaCalculatorPage"));
const SampleSizeCalculatorPage = lazy(() => import("@/pages/tools/SampleSizeCalculatorPage"));
const ProbabilityCalculatorPage = lazy(() => import("@/pages/tools/ProbabilityCalculatorPage"));
const StatisticsCalculatorPage = lazy(() => import("@/pages/tools/StatisticsCalculatorPage"));
const MeanMedianModeRangeCalculatorPage = lazy(() => import("@/pages/tools/MeanMedianModeRangeCalculatorPage"));
const PermutationCombinationCalculatorPage = lazy(() => import("@/pages/tools/PermutationCombinationCalculatorPage"));

// New Calculation Tools - Batch 11 (User Request)
const ZScoreCalculatorPage = lazy(() => import("@/pages/tools/ZScoreCalculatorPage"));
const ConfidenceIntervalCalculatorPage = lazy(() => import("@/pages/tools/ConfidenceIntervalCalculatorPage"));

// New Calculation Tools - Batch 17 (User Request - 7 Tools)
const DayCounterPage = lazy(() => import("@/pages/tools/DayCounterPage"));
const DayOfWeekCalculatorPage = lazy(() => import("@/pages/tools/DayOfWeekCalculatorPage"));
const RatioCalculatorPage = lazy(() => import("@/pages/tools/RatioCalculatorPage"));
const DistanceCalculatorPage = lazy(() => import("@/pages/tools/DistanceCalculatorPage"));
const CircleCalculatorPage = lazy(() => import("@/pages/tools/CircleCalculatorPage"));
const SurfaceAreaCalculatorPage = lazy(() => import("@/pages/tools/SurfaceAreaCalculatorPage"));
const PythagoreanTheoremCalculatorPage = lazy(() => import("@/pages/tools/PythagoreanTheoremCalculatorPage"));
const RightTriangleCalculatorPage = lazy(() => import("@/pages/tools/RightTriangleCalculatorPage"));
const RootCalculatorPage = lazy(() => import("@/pages/tools/RootCalculatorPage"));
const LeastCommonMultipleCalculatorPage = lazy(() => import("@/pages/tools/LeastCommonMultipleCalculatorPage"));

// New Calculation Tools - Batch 12 (Advanced Math Calculators)
const GreatestCommonFactorCalculatorPage = lazy(() => import("@/pages/tools/GreatestCommonFactorCalculatorPage"));
const FactorCalculatorPage = lazy(() => import("@/pages/tools/FactorCalculatorPage"));
const RoundingCalculatorPage = lazy(() => import("@/pages/tools/RoundingCalculatorPage"));
const MatrixCalculatorPage = lazy(() => import("@/pages/tools/MatrixCalculatorPage"));
const ScientificNotationCalculatorPage = lazy(() => import("@/pages/tools/ScientificNotationCalculatorPage"));
const BigNumberCalculatorPage = lazy(() => import("@/pages/tools/BigNumberCalculatorPage"));
const PrimeFactorizationCalculatorPage = lazy(() => import("@/pages/tools/PrimeFactorizationCalculatorPage"));
const CommonFactorCalculatorPage = lazy(() => import("@/pages/tools/CommonFactorCalculatorPage"));
const BasicCalculatorPage = lazy(() => import("@/pages/tools/BasicCalculatorPage"));
const LongDivisionCalculatorPage = lazy(() => import("@/pages/tools/LongDivisionCalculatorPage"));

// New Calculation Tools - Batch 13 (User Request - 10 Tools)
const IPSubnetCalculatorPage = lazy(() => import("@/pages/tools/IPSubnetCalculatorPage"));
const BraSizeCalculatorPage = lazy(() => import("@/pages/tools/BraSizeCalculatorPage"));
const PasswordGeneratorPage = lazy(() => import("@/pages/tools/PasswordGeneratorPage"));
const DiceRollerPage = lazy(() => import("@/pages/tools/DiceRollerPage"));
const ConversionCalculatorPage = lazy(() => import("@/pages/tools/ConversionCalculatorPage"));
const FuelCostCalculatorPage = lazy(() => import("@/pages/tools/FuelCostCalculatorPage"));
const VoltageDropCalculatorPage = lazy(() => import("@/pages/tools/VoltageDropCalculatorPage"));
const BTUCalculatorPage = lazy(() => import("@/pages/tools/BTUCalculatorPage"));
const SquareFootageCalculatorPage = lazy(() => import("@/pages/tools/SquareFootageCalculatorPage"));
const TimeCardCalculatorPage = lazy(() => import("@/pages/tools/TimeCardCalculatorPage"));

// New Calculation Tools - Batch 14 (User Request - 10 Tools)
const TimeZoneCalculatorPage = lazy(() => import("@/pages/tools/TimeZoneCalculatorPage"));
const LoveCalculatorPage = lazy(() => import("@/pages/tools/LoveCalculatorPage"));
const GDPCalculatorPage = lazy(() => import("@/pages/tools/GDPCalculatorPage"));
const GasMileageCalculatorPage = lazy(() => import("@/pages/tools/GasMileageCalculatorPage"));
const HorsepowerCalculatorPage = lazy(() => import("@/pages/tools/HorsepowerCalculatorPage"));
const EngineHorsepowerCalculatorPage = lazy(() => import("@/pages/tools/EngineHorsepowerCalculatorPage"));
const StairCalculatorPage = lazy(() => import("@/pages/tools/StairCalculatorPage"));
const ResistorCalculatorPage = lazy(() => import("@/pages/tools/ResistorCalculatorPage"));
const OhmsLawCalculatorPage = lazy(() => import("@/pages/tools/OhmsLawCalculatorPage"));
const ElectricityCalculatorPage = lazy(() => import("@/pages/tools/ElectricityCalculatorPage"));

// New Calculation Tools - Batch 15 (User Request - 10 Tools)
const TipCalculatorPage = lazy(() => import("@/pages/tools/TipCalculatorPage"));
const MileageCalculatorPage = lazy(() => import("@/pages/tools/MileageCalculatorPage"));
const DensityCalculatorPage = lazy(() => import("@/pages/tools/DensityCalculatorPage"));
const MassCalculatorPage = lazy(() => import("@/pages/tools/MassCalculatorPage"));
const WeightCalculatorPage = lazy(() => import("@/pages/tools/WeightCalculatorPage"));
const SpeedCalculatorPage = lazy(() => import("@/pages/tools/SpeedCalculatorPage"));
const MolarityCalculatorPage = lazy(() => import("@/pages/tools/MolarityCalculatorPage"));
const MolecularWeightCalculatorPage = lazy(() => import("@/pages/tools/MolecularWeightCalculatorPage"));
const RomanNumeralConverterPage = lazy(() => import("@/pages/tools/RomanNumeralConverterPage"));
const GolfHandicapCalculatorPage = lazy(() => import("@/pages/tools/GolfHandicapCalculatorPage"));

// New Calculation Tools - Batch 16 (User Request - 10 Tools)
const TireSizeCalculatorPage = lazy(() => import("@/pages/tools/TireSizeCalculatorPage"));
const RoofingCalculatorPage = lazy(() => import("@/pages/tools/RoofingCalculatorPage"));
const TileCalculatorPage = lazy(() => import("@/pages/tools/TileCalculatorPage"));
const MulchCalculatorPage = lazy(() => import("@/pages/tools/MulchCalculatorPage"));
const GravelCalculatorPage = lazy(() => import("@/pages/tools/GravelCalculatorPage"));
const WindChillCalculatorPage = lazy(() => import("@/pages/tools/WindChillCalculatorPage"));
const HeatIndexCalculatorPage = lazy(() => import("@/pages/tools/HeatIndexCalculatorPage"));
const DewPointCalculatorPage = lazy(() => import("@/pages/tools/DewPointCalculatorPage"));
const BandwidthCalculatorPage = lazy(() => import("@/pages/tools/BandwidthCalculatorPage"));
const TimeDurationCalculatorPage = lazy(() => import("@/pages/tools/TimeDurationCalculatorPage"));

const FuelConsumptionConverterPage = lazy(() => import("@/pages/tools/FuelConsumptionConverterPage"));
const VolumeDryConverterPage = lazy(() => import("@/pages/tools/VolumeDryConverterPage"));
const CurrencyConverterPage = lazy(() => import("@/pages/tools/CurrencyConverterPage"));
const CaseConverterPage = lazy(() => import("@/pages/tools/CaseConverterPage"));
const AngularVelocityConverterPage = lazy(() => import("@/pages/tools/AngularVelocityConverterPage"));

// Text & String Tools
const UrlEncodePage = lazy(() => import("@/pages/tools/UrlEncodePage"));
const UrlDecodePage = lazy(() => import("@/pages/tools/UrlDecodePage"));
const HtmlEncodePage = lazy(() => import("@/pages/tools/HtmlEncodePage"));
const HtmlDecodePage = lazy(() => import("@/pages/tools/HtmlDecodePage"));
const Base64EncodePage = lazy(() => import("@/pages/tools/Base64EncodePage"));
const Base64DecodePage = lazy(() => import("@/pages/tools/Base64DecodePage"));
const StringToNetstringPage = lazy(() => import("@/pages/tools/StringToNetstringPage"));
const NetstringToStringPage = lazy(() => import("@/pages/tools/NetstringToStringPage"));
const SlashEscapePage = lazy(() => import("@/pages/tools/SlashEscapePage"));
const SlashUnescapePage = lazy(() => import("@/pages/tools/SlashUnescapePage"));
const SlashUnescapeTextPage = lazy(() => import("@/pages/tools/SlashUnescapeTextPage"));
const ROT13TextPage = lazy(() => import("@/pages/tools/ROT13TextPage"));
const ROT47TextPage = lazy(() => import("@/pages/tools/ROT47TextPage"));
const GenerateTextOfCertainLengthPage = lazy(() => import("@/pages/tools/GenerateTextOfCertainLengthPage"));
const GenerateTextFromRegExpPage = lazy(() => import("@/pages/tools/GenerateTextFromRegExpPage"));
const ExtractRegExpMatchesFromTextPage = lazy(() => import("@/pages/tools/ExtractRegExpMatchesFromTextPage"));
const HighlightRegExpMatchesInTextPage = lazy(() => import("@/pages/tools/HighlightRegExpMatchesInTextPage"));
const TestTextWithRegExpPage = lazy(() => import("@/pages/tools/TestTextWithRegExpPage"));
const PrintfTextPage = lazy(() => import("@/pages/tools/PrintfTextPage"));
const RotateTextPage = lazy(() => import("@/pages/tools/RotateTextPage"));
const GenerateRandomStringPage = lazy(() => import("@/pages/tools/GenerateRandomStringPage"));
const GenerateStringFromRegexPage = lazy(() => import("@/pages/tools/GenerateStringFromRegexPage"));
const ExtractRegexMatchesPage = lazy(() => import("@/pages/tools/ExtractRegexMatchesPage"));
const TestStringWithRegexPage = lazy(() => import("@/pages/tools/TestStringWithRegexPage"));
const ExtractSubstringPage = lazy(() => import("@/pages/tools/ExtractSubstringPage"));
const ConvertStringToImagePage = lazy(() => import("@/pages/tools/ConvertStringToImagePage"));
const PrintfStringPage = lazy(() => import("@/pages/tools/PrintfStringPage"));
const SplitStringPage = lazy(() => import("@/pages/tools/SplitStringPage"));
const JoinStringsPage = lazy(() => import("@/pages/tools/JoinStringsPage"));
const FilterStringLinesPage = lazy(() => import("@/pages/tools/FilterStringLinesPage"));
const RepeatStringPage = lazy(() => import("@/pages/tools/RepeatStringPage"));
const ReverseStringPage = lazy(() => import("@/pages/tools/ReverseStringPage"));
const FindReplaceStringPage = lazy(() => import("@/pages/tools/FindReplaceStringPage"));
const TruncateStringPage = lazy(() => import("@/pages/tools/TruncateStringPage"));
const TrimStringPage = lazy(() => import("@/pages/tools/TrimStringPage"));
const LeftPadStringPage = lazy(() => import("@/pages/tools/LeftPadStringPage"));
const RightPadStringPage = lazy(() => import("@/pages/tools/RightPadStringPage"));
const RightAlignStringPage = lazy(() => import("@/pages/tools/RightAlignStringPage"));
const CenterStringPage = lazy(() => import("@/pages/tools/CenterStringPage"));
const SortStringsPage = lazy(() => import("@/pages/tools/SortStringsPage"));
const RotateStringPage = lazy(() => import("@/pages/tools/RotateStringPage"));
const ROT13StringPage = lazy(() => import("@/pages/tools/ROT13StringPage"));
const ROT47StringPage = lazy(() => import("@/pages/tools/ROT47StringPage"));
const TransposeStringPage = lazy(() => import("@/pages/tools/TransposeStringPage"));
const SliceStringPage = lazy(() => import("@/pages/tools/SliceStringPage"));
const AddPrefixStringPage = lazy(() => import("@/pages/tools/AddPrefixStringPage"));
const AddSuffixStringPage = lazy(() => import("@/pages/tools/AddSuffixStringPage"));
const QuoteStringPage = lazy(() => import("@/pages/tools/QuoteStringPage"));
const UnquoteStringPage = lazy(() => import("@/pages/tools/UnquoteStringPage"));
const SpacesToNewlinesPage = lazy(() => import("@/pages/tools/SpacesToNewlinesPage"));
const NewlinesToSpacesPage = lazy(() => import("@/pages/tools/NewlinesToSpacesPage"));
const SpacesToTabsPage = lazy(() => import("@/pages/tools/SpacesToTabsPage"));
const TabsToSpacesPage = lazy(() => import("@/pages/tools/TabsToSpacesPage"));
const RemoveEmptyLinesPage = lazy(() => import("@/pages/tools/RemoveEmptyLinesPage"));
const RemoveAllWhitespacePage = lazy(() => import("@/pages/tools/RemoveAllWhitespacePage"));

// New Text Spacing and Comma Tools
const ConvertCommaToColumnPage = lazy(() => import("@/pages/tools/ConvertCommaToColumnPage"));
const ConvertCommasToSpacesPage = lazy(() => import("@/pages/tools/ConvertCommasToSpacesPage"));
const ConvertSpacesToCommasPage = lazy(() => import("@/pages/tools/ConvertSpacesToCommasPage"));
const ReplaceCommasInTextPage = lazy(() => import("@/pages/tools/ReplaceCommasInTextPage"));
const RemoveExtraSpacesPage = lazy(() => import("@/pages/tools/RemoveExtraSpacesPage"));
const IncreaseTextSpacingPage = lazy(() => import("@/pages/tools/IncreaseTextSpacingPage"));
const NormalizeTextSpacingPage = lazy(() => import("@/pages/tools/NormalizeTextSpacingPage"));
const RandomizeTextSpacingPage = lazy(() => import("@/pages/tools/RandomizeTextSpacingPage"));
const ReplaceSpacesInTextPage = lazy(() => import("@/pages/tools/ReplaceSpacesInTextPage"));
const RemoveAllPunctuationPage = lazy(() => import("@/pages/tools/RemoveAllPunctuationPage"));
const RemoveDiacriticsPage = lazy(() => import("@/pages/tools/RemoveDiacriticsPage"));
const IncrementLettersPage = lazy(() => import("@/pages/tools/IncrementLettersPage"));
const DecrementLettersPage = lazy(() => import("@/pages/tools/DecrementLettersPage"));
const AddQuotesToTextPage = lazy(() => import("@/pages/tools/AddQuotesToTextPage"));
const RemoveQuotesFromTextPage = lazy(() => import("@/pages/tools/RemoveQuotesFromTextPage"));
const AddQuotesToWordsPage = lazy(() => import("@/pages/tools/AddQuotesToWordsPage"));
const RemoveQuotesFromWordsPage = lazy(() => import("@/pages/tools/RemoveQuotesFromWordsPage"));
const AddQuotesToLinesPage = lazy(() => import("@/pages/tools/AddQuotesToLinesPage"));
const RemoveQuotesFromLinesPage = lazy(() => import("@/pages/tools/RemoveQuotesFromLinesPage"));
const StringLengthPage = lazy(() => import("@/pages/tools/StringLengthPage"));
const CountNewlinesPage = lazy(() => import("@/pages/tools/CountNewlinesPage"));
const StringToBytesPage = lazy(() => import("@/pages/tools/StringToBytesPage"));
const BytesToStringPage = lazy(() => import("@/pages/tools/BytesToStringPage"));
const StringToBinaryPage = lazy(() => import("@/pages/tools/StringToBinaryPage"));
const BinaryToStringPage = lazy(() => import("@/pages/tools/BinaryToStringPage"));
const StringToOctalPage = lazy(() => import("@/pages/tools/StringToOctalPage"));
const OctalToStringPage = lazy(() => import("@/pages/tools/OctalToStringPage"));
const StringToDecimalPage = lazy(() => import("@/pages/tools/StringToDecimalPage"));
const DecimalToStringPage = lazy(() => import("@/pages/tools/DecimalToStringPage"));
const StringToHexPage = lazy(() => import("@/pages/tools/StringToHexPage"));
const HexToStringPage = lazy(() => import("@/pages/tools/HexToStringPage"));
const StringToAsciiPage = lazy(() => import("@/pages/tools/StringToAsciiPage"));
const AsciiToStringPage = lazy(() => import("@/pages/tools/AsciiToStringPage"));
const ChangeStringCasePage = lazy(() => import("@/pages/tools/ChangeStringCasePage"));

// New String Conversion Tools
const ConvertStringToUppercasePage = lazy(() => import("@/pages/tools/ConvertStringToUppercasePage"));
const ConvertStringToLowercasePage = lazy(() => import("@/pages/tools/ConvertStringToLowercasePage"));
const RandomizeLetterCasePage = lazy(() => import("@/pages/tools/RandomizeLetterCasePage"));
const InvertLetterCasePage = lazy(() => import("@/pages/tools/InvertLetterCasePage"));
const ConvertJsonToStringPage = lazy(() => import("@/pages/tools/ConvertJsonToStringPage"));
const JsonStringifyStringPage = lazy(() => import("@/pages/tools/JsonStringifyStringPage"));
const JsonParseStringPage = lazy(() => import("@/pages/tools/JsonParseStringPage"));
const ConvertHtmlToStringPage = lazy(() => import("@/pages/tools/ConvertHtmlToStringPage"));
const ConvertXmlToStringPage = lazy(() => import("@/pages/tools/ConvertXmlToStringPage"));
const ConvertCsvToStringPage = lazy(() => import("@/pages/tools/ConvertCsvToStringPage"));

// Additional Advanced String Manipulation Tools
const ConvertStringToCsvPage = lazy(() => import("@/pages/tools/ConvertStringToCsvPage"));
const ConvertBbcodeToStringPage = lazy(() => import("@/pages/tools/ConvertBbcodeToStringPage"));
const ConvertStringToMorseCodePage = lazy(() => import("@/pages/tools/ConvertStringToMorseCodePage"));
const ConvertMorseCodeToStringPage = lazy(() => import("@/pages/tools/ConvertMorseCodeToStringPage"));
const CreatePalindromePage = lazy(() => import("@/pages/tools/CreatePalindromePage"));
const CheckPalindromePage = lazy(() => import("@/pages/tools/CheckPalindromePage"));
const GenerateStringUnigramsPage = lazy(() => import("@/pages/tools/GenerateStringUnigramsPage"));
const GenerateStringBigramsPage = lazy(() => import("@/pages/tools/GenerateStringBigramsPage"));
const SplitTextPage = lazy(() => import("@/pages/tools/SplitTextPage"));
const JoinTextPage = lazy(() => import("@/pages/tools/JoinTextPage"));

// New Text Tools
const RepeatTextPage = lazy(() => import("@/pages/tools/RepeatTextPage"));
const ReverseTextPage = lazy(() => import("@/pages/tools/ReverseTextPage"));
const TruncateTextPage = lazy(() => import("@/pages/tools/TruncateTextPage"));
const SliceTextPage = lazy(() => import("@/pages/tools/SliceTextPage"));
const TrimTextPage = lazy(() => import("@/pages/tools/TrimTextPage"));
const LeftPadTextPage = lazy(() => import("@/pages/tools/LeftPadTextPage"));
const RightPadTextPage = lazy(() => import("@/pages/tools/RightPadTextPage"));
const LeftAlignTextPage = lazy(() => import("@/pages/tools/LeftAlignTextPage"));
const RightAlignTextPage = lazy(() => import("@/pages/tools/RightAlignTextPage"));
const CenterTextPage = lazy(() => import("@/pages/tools/CenterTextPage"));

// Additional Advanced Text Tools
const IndentTextPage = lazy(() => import("@/pages/tools/IndentTextPage"));
const UnindentTextPage = lazy(() => import("@/pages/tools/UnindentTextPage"));
const JustifyTextPage = lazy(() => import("@/pages/tools/JustifyTextPage"));
const WrapWordsInTextPage = lazy(() => import("@/pages/tools/WrapWordsInTextPage"));
const ReverseWordsInTextPage = lazy(() => import("@/pages/tools/ReverseWordsInTextPage"));
const ReverseSentencesInTextPage = lazy(() => import("@/pages/tools/ReverseSentencesInTextPage"));
const ReverseParagraphsInTextPage = lazy(() => import("@/pages/tools/ReverseParagraphsInTextPage"));
const SwapLettersInWordsPage = lazy(() => import("@/pages/tools/SwapLettersInWordsPage"));
const SwapWordsInTextPage = lazy(() => import("@/pages/tools/SwapWordsInTextPage"));
const DuplicateWordsInTextPage = lazy(() => import("@/pages/tools/DuplicateWordsInTextPage"));

// New Advanced Text Manipulation Tools
const RemoveWordsFromTextPage = lazy(() => import("@/pages/tools/RemoveWordsFromTextPage"));
const DuplicateSentencesInTextPage = lazy(() => import("@/pages/tools/DuplicateSentencesInTextPage"));
const RemoveSentencesFromTextPage = lazy(() => import("@/pages/tools/RemoveSentencesFromTextPage"));
const ReplaceWordsInTextPage = lazy(() => import("@/pages/tools/ReplaceWordsInTextPage"));
const AddRandomWordsToTextPage = lazy(() => import("@/pages/tools/AddRandomWordsToTextPage"));
const AddRandomLettersToWordsPage = lazy(() => import("@/pages/tools/AddRandomLettersToWordsPage"));
const IntroduceErrorsInTextPage = lazy(() => import("@/pages/tools/IntroduceErrorsInTextPage"));
const GenerateFakeTextPage = lazy(() => import("@/pages/tools/GenerateFakeTextPage"));
const UnfakeTextPage = lazy(() => import("@/pages/tools/UnfakeTextPage"));
const CheckIfTextIsFakePage = lazy(() => import("@/pages/tools/CheckIfTextIsFakePage"));

// Additional Text Symbol and Prefix/Suffix Tools
const RemoveRandomLettersFromWordsPage = lazy(() => import("@/pages/tools/RemoveRandomLettersFromWordsPage"));
const RemoveRandomSymbolsFromTextPage = lazy(() => import("@/pages/tools/RemoveRandomSymbolsFromTextPage"));
const AddSymbolsAroundWordsPage = lazy(() => import("@/pages/tools/AddSymbolsAroundWordsPage"));
const RemoveSymbolsFromAroundWordsPage = lazy(() => import("@/pages/tools/RemoveSymbolsFromAroundWordsPage"));
const AddPrefixToTextLinesPage = lazy(() => import("@/pages/tools/AddPrefixToTextLinesPage"));
const AddSuffixToTextLinesPage = lazy(() => import("@/pages/tools/AddSuffixToTextLinesPage"));
const RemovePrefixFromTextPage = lazy(() => import("@/pages/tools/RemovePrefixFromTextPage"));
const RemoveSuffixFromTextLinesPage = lazy(() => import("@/pages/tools/RemoveSuffixFromTextLinesPage"));
const AddPrefixToWordsPage = lazy(() => import("@/pages/tools/AddPrefixToWordsPage"));
const AddSuffixToWordsPage = lazy(() => import("@/pages/tools/AddSuffixToWordsPage"));

// New Text & String Tools
const RemovePrefixFromWordsPage = lazy(() => import("@/pages/tools/RemovePrefixFromWordsPage"));
const RemoveSuffixFromWordsPage = lazy(() => import("@/pages/tools/RemoveSuffixFromWordsPage"));
const InsertSymbolsBetweenLettersPage = lazy(() => import("@/pages/tools/InsertSymbolsBetweenLettersPage"));
const AddSymbolsAroundLettersPage = lazy(() => import("@/pages/tools/AddSymbolsAroundLettersPage"));
const RemoveAllEmptyLinesPage = lazy(() => import("@/pages/tools/RemoveAllEmptyLinesPage"));
const RemoveAllDuplicateLinesPage = lazy(() => import("@/pages/tools/RemoveAllDuplicateLinesPage"));
const FilterTextLinesPage = lazy(() => import("@/pages/tools/FilterTextLinesPage"));
const FilterWordsInTextPage = lazy(() => import("@/pages/tools/FilterWordsInTextPage"));
const FilterTextSentencesPage = lazy(() => import("@/pages/tools/FilterTextSentencesPage"));

// New Sorting and Randomization Tools
const FilterTextParagraphsPage = lazy(() => import("@/pages/tools/FilterTextParagraphsPage"));

// New Text String Tools
const RandomizeTextLinesPage = lazy(() => import("@/pages/tools/RandomizeTextLinesPage"));
const RandomizeTextSentencesPage = lazy(() => import("@/pages/tools/RandomizeTextSentencesPage"));
const RandomizeTextParagraphsPage = lazy(() => import("@/pages/tools/RandomizeTextParagraphsPage"));
const CalculateLetterSumPage = lazy(() => import("@/pages/tools/CalculateLetterSumPage"));
const UnwrapTextLinesPage = lazy(() => import("@/pages/tools/UnwrapTextLinesPage"));
const ExtractTextFragmentPage = lazy(() => import("@/pages/tools/ExtractTextFragmentPage"));
const FindAndReplaceTextPage = lazy(() => import("@/pages/tools/FindAndReplaceTextPage"));
const FindTheLengthOfTextPage = lazy(() => import("@/pages/tools/FindTheLengthOfTextPage"));
const FindTopLettersInTextPage = lazy(() => import("@/pages/tools/FindTopLettersInTextPage"));

// Additional Text String Tools - Second Batch
const FindTopWordsInTextPage = lazy(() => import("@/pages/tools/FindTopWordsInTextPage"));
const CalculateTextEntropyPage = lazy(() => import("@/pages/tools/CalculateTextEntropyPage"));
const CountWordsInTextPage = lazy(() => import("@/pages/tools/CountWordsInTextPage"));
const PrintTextStatisticsPage = lazy(() => import("@/pages/tools/PrintTextStatisticsPage"));
const FindUniqueWordsInTextPage = lazy(() => import("@/pages/tools/FindUniqueWordsInTextPage"));
const CountTextLinesPage = lazy(() => import("@/pages/tools/CountTextLinesPage"));
const AddLineNumbersPage = lazy(() => import("@/pages/tools/AddLineNumbersPage"));
const SortTextLinesPage = lazy(() => import("@/pages/tools/SortTextLinesPage"));
const SortSentencesInTextPage = lazy(() => import("@/pages/tools/SortSentencesInTextPage"));
const SortParagraphsInTextPage = lazy(() => import("@/pages/tools/SortParagraphsInTextPage"));
const SortWordsInTextPage = lazy(() => import("@/pages/tools/SortWordsInTextPage"));
const SortLettersInWordsPage = lazy(() => import("@/pages/tools/SortLettersInWordsPage"));
const SortSymbolsInTextPage = lazy(() => import("@/pages/tools/SortSymbolsInTextPage"));
const RandomizeLettersInTextPage = lazy(() => import("@/pages/tools/RandomizeLettersInTextPage"));
const ScrambleWordsPage = lazy(() => import("@/pages/tools/ScrambleWordsPage"));
const RandomizeWordsInTextPage = lazy(() => import("@/pages/tools/RandomizeWordsInTextPage"));

// SEO Tools
const KeywordResearchPage = lazy(() => import("@/pages/tools/KeywordResearchPage"));

// New Text & String Tools - Advanced Formatting
const CreateImageFromTextPage = lazy(() => import("@/pages/tools/CreateImageFromTextPage"));
const ChangeTextFontPage = lazy(() => import("@/pages/tools/ChangeTextFontPage"));
const RemoveFancyTextFontPage = lazy(() => import("@/pages/tools/RemoveFancyTextFontPage"));
const WriteTextInSuperscriptPage = lazy(() => import("@/pages/tools/WriteTextInSuperscriptPage"));
const WriteTextInSubscriptPage = lazy(() => import("@/pages/tools/WriteTextInSubscriptPage"));
const GenerateTinyTextPage = lazy(() => import("@/pages/tools/GenerateTinyTextPage"));
const WriteTextInBoldPage = lazy(() => import("@/pages/tools/WriteTextInBoldPage"));
const WriteTextInItalicPage = lazy(() => import("@/pages/tools/WriteTextInItalicPage"));
const WriteTextInCursivePage = lazy(() => import("@/pages/tools/WriteTextInCursivePage"));

// New Text & String Tools - Encoding & Conversion
const ConvertTextToMorseCodePage = lazy(() => import("@/pages/tools/ConvertTextToMorseCodePage"));
const ConvertMorseCodeToTextPage = lazy(() => import("@/pages/tools/ConvertMorseCodeToTextPage"));
const CalculateTextComplexityPage = lazy(() => import("@/pages/tools/CalculateTextComplexityPage"));
const UrlEncodeTextPage = lazy(() => import("@/pages/tools/UrlEncodeTextPage"));
const UrlDecodeTextPage = lazy(() => import("@/pages/tools/UrlDecodeTextPage"));
const HtmlEncodeTextPage = lazy(() => import("@/pages/tools/HtmlEncodeTextPage"));
const HtmlDecodeTextPage = lazy(() => import("@/pages/tools/HtmlDecodeTextPage"));
const ConvertTextToUrlSlugPage = lazy(() => import("@/pages/tools/ConvertTextToUrlSlugPage"));
const Base64EncodeTextPage = lazy(() => import("@/pages/tools/Base64EncodeTextPage"));
const Base64DecodeTextPage = lazy(() => import("@/pages/tools/Base64DecodeTextPage"));
const ConvertTextToBinaryPage = lazy(() => import("@/pages/tools/ConvertTextToBinaryPage"));
const ConvertBinaryToTextPage = lazy(() => import("@/pages/tools/ConvertBinaryToTextPage"));
const ConvertTextToOctalPage = lazy(() => import("@/pages/tools/ConvertTextToOctalPage"));
const ConvertOctalToTextPage = lazy(() => import("@/pages/tools/ConvertOctalToTextPage"));
const ConvertTextToDecimalPage = lazy(() => import("@/pages/tools/ConvertTextToDecimalPage"));
const ConvertDecimalToTextPage = lazy(() => import("@/pages/tools/ConvertDecimalToTextPage"));
const ConvertTextToHexPage = lazy(() => import("@/pages/tools/ConvertTextToHexPage"));
const ConvertHexToTextPage = lazy(() => import("@/pages/tools/ConvertHexToTextPage"));

// New Text Manipulation Tools - Requested Tools
const EraseLettersFromWordsPage = lazy(() => import("@/pages/tools/EraseLettersFromWordsPage"));
const EraseWordsFromTextPage = lazy(() => import("@/pages/tools/EraseWordsFromTextPage"));
const VisualizeTextStructurePage = lazy(() => import("@/pages/tools/VisualizeTextStructurePage"));
const HighlightLettersInTextPage = lazy(() => import("@/pages/tools/HighlightLettersInTextPage"));
const HighlightWordsInTextPage = lazy(() => import("@/pages/tools/HighlightWordsInTextPage"));
const HighlightPatternsInTextPage = lazy(() => import("@/pages/tools/HighlightPatternsInTextPage"));
const HighlightSentencesInTextPage = lazy(() => import("@/pages/tools/HighlightSentencesInTextPage"));
const ReplaceVowelsInTextPage = lazy(() => import("@/pages/tools/ReplaceVowelsInTextPage"));
const DuplicateVowelsInTextPage = lazy(() => import("@/pages/tools/DuplicateVowelsInTextPage"));
const RemoveVowelsFromTextPage = lazy(() => import("@/pages/tools/RemoveVowelsFromTextPage"));
const ReplaceConsonantsInTextPage = lazy(() => import("@/pages/tools/ReplaceConsonantsInTextPage"));
const FlipTextVerticallyPage = lazy(() => import("@/pages/tools/FlipTextVerticallyPage"));
const RewriteTextPage = lazy(() => import("@/pages/tools/RewriteTextPage"));
const ChangeTextAlphabetPage = lazy(() => import("@/pages/tools/ChangeTextAlphabetPage"));
const ReplaceLettersInTextPage = lazy(() => import("@/pages/tools/ReplaceLettersInTextPage"));
const ConvertLettersToDigitsPage = lazy(() => import("@/pages/tools/ConvertLettersToDigitsPage"));
const ConvertDigitsToLettersPage = lazy(() => import("@/pages/tools/ConvertDigitsToLettersPage"));
const ReplaceWordsWithDigitsPage = lazy(() => import("@/pages/tools/ReplaceWordsWithDigitsPage"));
const ReplaceDigitsWithWordsPage = lazy(() => import("@/pages/tools/ReplaceDigitsWithWordsPage"));
const DuplicateLettersInTextPage = lazy(() => import("@/pages/tools/DuplicateLettersInTextPage"));
const RemoveLettersFromTextPage = lazy(() => import("@/pages/tools/RemoveLettersFromTextPage"));
const AddAnUnderlineToTextPage = lazy(() => import("@/pages/tools/AddAnUnderlineToTextPage"));
const AddAStrikethroughToTextPage = lazy(() => import("@/pages/tools/AddAStrikethroughToTextPage"));
const UndoZalgoTextEffectPage = lazy(() => import("@/pages/tools/UndoZalgoTextEffectPage"));
const GenerateZalgoTextPage = lazy(() => import("@/pages/tools/GenerateZalgoTextPage"));
const ConvertTextToTitleCasePage = lazy(() => import("@/pages/tools/ConvertTextToTitleCasePage"));

// New Text Case and Line Break Tools
const ChangeTextCasePage = lazy(() => import("@/pages/tools/ChangeTextCasePage"));
const ConvertTextToProperCasePage = lazy(() => import("@/pages/tools/ConvertTextToProperCasePage"));
const RandomizeTextCasePage = lazy(() => import("@/pages/tools/RandomizeTextCasePage"));
const InvertTextCasePage = lazy(() => import("@/pages/tools/InvertTextCasePage"));
const AddLineBreaksToTextPage = lazy(() => import("@/pages/tools/AddLineBreaksToTextPage"));
const RemoveLineBreaksFromTextPage = lazy(() => import("@/pages/tools/RemoveLineBreaksFromTextPage"));
const ReplaceLineBreaksInTextPage = lazy(() => import("@/pages/tools/ReplaceLineBreaksInTextPage"));
const RandomizeLineBreaksInTextPage = lazy(() => import("@/pages/tools/RandomizeLineBreaksInTextPage"));

// Line Break and Conversion Tools
const NormalizeLineBreaksInTextPage = lazy(() => import("@/pages/tools/NormalizeLineBreaksInTextPage"));
const FixDistanceBetweenParagraphsAndLinesPage = lazy(() => import("@/pages/tools/FixDistanceBetweenParagraphsAndLinesPage"));
const FancifyLineBreaksInTextPage = lazy(() => import("@/pages/tools/FancifyLineBreaksInTextPage"));
const ConvertSpacesToNewlinesPage = lazy(() => import("@/pages/tools/ConvertSpacesToNewlinesPage"));
const ConvertNewlinesToSpacesPage = lazy(() => import("@/pages/tools/ConvertNewlinesToSpacesPage"));
const ConvertSpacesToTabsPage = lazy(() => import("@/pages/tools/ConvertSpacesToTabsPage"));
const ConvertTabsToSpacesPage = lazy(() => import("@/pages/tools/ConvertTabsToSpacesPage"));
const ConvertCommaToNewlinePage = lazy(() => import("@/pages/tools/ConvertCommaToNewlinePage"));
const ConvertNewlineToCommaPage = lazy(() => import("@/pages/tools/ConvertNewlineToCommaPage"));
const ConvertColumnToCommaPage = lazy(() => import("@/pages/tools/ConvertColumnToCommaPage"));

// New Text Manipulation Tools
const AddCurseWordsToTextPage = lazy(() => import("@/pages/tools/AddCurseWordsToTextPage"));
const CensorWordsInTextPage = lazy(() => import("@/pages/tools/CensorWordsInTextPage"));
const AnonymizeTextPage = lazy(() => import("@/pages/tools/AnonymizeTextPage"));
const ExtractTextFromHTMLPage = lazy(() => import("@/pages/tools/ExtractTextFromHTMLPage"));
const ExtractTextFromXMLPage = lazy(() => import("@/pages/tools/ExtractTextFromXMLPage"));
const ExtractTextFromBBCodePage = lazy(() => import("@/pages/tools/ExtractTextFromBBCodePage"));
const ExtractTextFromJSONPage = lazy(() => import("@/pages/tools/ExtractTextFromJSONPage"));
const JSONStringifyTextPage = lazy(() => import("@/pages/tools/JSONStringifyTextPage"));
const JSONUnstringifyTextPage = lazy(() => import("@/pages/tools/JSONUnstringifyTextPage"));
const SlashEscapeTextPage = lazy(() => import("@/pages/tools/SlashEscapeTextPage"));

const AccelerationConverterPage = lazy(() => import("@/pages/tools/AccelerationConverterPage"));
const ImageResizerPage = lazy(() => import("@/pages/tools/ImageResizerPage"));
const ImageCropperPage = lazy(() => import("@/pages/tools/ImageCropperPage"));
const PDFEditorPage = lazy(() => import("@/pages/tools/PDFEditorPage"));

// PDF & Document Tools
const PDFToWordConverterPage = lazy(() => import("@/pages/tools/PDFToWordConverterPage"));
const WordToPDFConverterPage = lazy(() => import("@/pages/tools/WordToPDFConverterPage"));
const PDFToJPGConverterPage = lazy(() => import("@/pages/tools/PDFToJPGConverterPage"));
const JPGToPDFConverterPage = lazy(() => import("@/pages/tools/JPGToPDFConverterPage"));
const ExcelToPDFConverterPage = lazy(() => import("@/pages/tools/ExcelToPDFConverterPage"));
const PDFToExcelConverterPage = lazy(() => import("@/pages/tools/PDFToExcelConverterPage"));
const PowerPointToPDFConverterPage = lazy(() => import("@/pages/tools/PowerPointToPDFConverterPage"));
const PDFToPowerPointConverterPage = lazy(() => import("@/pages/tools/PDFToPowerPointConverterPage"));
const MergePDFFilesPage = lazy(() => import("@/pages/tools/MergePDFFilesPage"));
const SplitPDFFilesPage = lazy(() => import("@/pages/tools/SplitPDFFilesPage"));
const CompressPDFPage = lazy(() => import("@/pages/tools/CompressPDFPage"));
const UnlockPDFPage = lazy(() => import("@/pages/tools/UnlockPDFPage"));
const ProtectPDFPage = lazy(() => import("@/pages/tools/ProtectPDFPage"));
const RotatePDFPage = lazy(() => import("@/pages/tools/RotatePDFPage"));
const RearrangePDFPage = lazy(() => import("@/pages/tools/RearrangePDFPage"));
const DeletePDFPagesPage = lazy(() => import("@/pages/tools/DeletePDFPagesPage"));
const AddPageNumbersToPDFPage = lazy(() => import("@/pages/tools/AddPageNumbersToPDFPage"));
const AddWatermarkToPDFPage = lazy(() => import("@/pages/tools/AddWatermarkToPDFPage"));
const EditPDFOnlinePage = lazy(() => import("@/pages/tools/EditPDFOnlinePage"));
const PDFReaderViewerPage = lazy(() => import("@/pages/tools/PDFReaderViewerPage"));

// Professional Unit Converters
const AccelerationAngularConverter = lazy(() => import("@/pages/tools/AccelerationAngularConverter"));
const DensityConverter = lazy(() => import("@/pages/tools/DensityConverter"));
const SpecificVolumeConverter = lazy(() => import("@/pages/tools/SpecificVolumeConverter"));
const MomentOfInertiaConverter = lazy(() => import("@/pages/tools/MomentOfInertiaConverter"));
const MomentOfForceConverter = lazy(() => import("@/pages/tools/MomentOfForceConverter"));

// New Advanced Converters
const TorqueConverter = lazy(() => import("@/pages/tools/TorqueConverter"));
const FuelEfficiencyMassConverter = lazy(() => import("@/pages/tools/FuelEfficiencyMassConverter"));
const FuelEfficiencyVolumeConverter = lazy(() => import("@/pages/tools/FuelEfficiencyVolumeConverter"));
const TemperatureIntervalConverter = lazy(() => import("@/pages/tools/TemperatureIntervalConverter"));
const ThermalExpansionConverter = lazy(() => import("@/pages/tools/ThermalExpansionConverter"));
const ThermalResistanceConverter = lazy(() => import("@/pages/tools/ThermalResistanceConverter"));
const SpecificHeatCapacityConverter = lazy(() => import("@/pages/tools/SpecificHeatCapacityConverter"));
const HeatDensityConverter = lazy(() => import("@/pages/tools/HeatDensityConverter"));
const HeatFluxDensityConverter = lazy(() => import("@/pages/tools/HeatFluxDensityConverter"));
const HeatTransferCoefficientConverter = lazy(() => import("@/pages/tools/HeatTransferCoefficientConverter"));
const FlowConverter = lazy(() => import("@/pages/tools/FlowConverter"));
const FlowMassConverter = lazy(() => import("@/pages/tools/FlowMassConverter"));
const FlowMolarConverter = lazy(() => import("@/pages/tools/FlowMolarConverter"));
const MassFluxDensityConverter = lazy(() => import("@/pages/tools/MassFluxDensityConverter"));
const ConcentrationMolarConverter = lazy(() => import("@/pages/tools/ConcentrationMolarConverter"));
const ConcentrationSolutionConverter = lazy(() => import("@/pages/tools/ConcentrationSolutionConverter"));
const ViscosityDynamicConverter = lazy(() => import("@/pages/tools/ViscosityDynamicConverter"));
const ViscosityKinematicConverter = lazy(() => import("@/pages/tools/ViscosityKinematicConverter"));
const SurfaceTensionConverter = lazy(() => import("@/pages/tools/SurfaceTensionConverter"));
const PermeabilityConverter = lazy(() => import("@/pages/tools/PermeabilityConverter"));
const LuminanceConverter = lazy(() => import("@/pages/tools/LuminanceConverter"));
const LuminousIntensityConverter = lazy(() => import("@/pages/tools/LuminousIntensityConverter"));

// My New Converter Tools
const IlluminationConverter = lazy(() => import("@/pages/tools/IlluminationConverter"));
const DigitalImageResolutionConverter = lazy(() => import("@/pages/tools/DigitalImageResolutionConverter"));
const FrequencyWavelengthConverter = lazy(() => import("@/pages/tools/FrequencyWavelengthConverter"));
const ChargeConverter = lazy(() => import("@/pages/tools/ChargeConverter"));
const LinearChargeDensityConverter = lazy(() => import("@/pages/tools/LinearChargeDensityConverter"));
const SurfaceChargeDensityConverter = lazy(() => import("@/pages/tools/SurfaceChargeDensityConverter"));
const VolumeChargeDensityConverter = lazy(() => import("@/pages/tools/VolumeChargeDensityConverter"));
const CurrentConverter = lazy(() => import("@/pages/tools/CurrentConverter"));
const LinearCurrentDensityConverter = lazy(() => import("@/pages/tools/LinearCurrentDensityConverter"));
const SurfaceCurrentDensityConverter = lazy(() => import("@/pages/tools/SurfaceCurrentDensityConverter"));

// Electric Converter Tools  
const ElectricFieldStrengthConverter = lazy(() => import("@/pages/tools/ElectricFieldStrengthConverter"));
const ElectricPotentialConverter = lazy(() => import("@/pages/tools/ElectricPotentialConverter"));
const ElectricResistanceConverter = lazy(() => import("@/pages/tools/ElectricResistanceConverter"));
const ElectricResistivityConverter = lazy(() => import("@/pages/tools/ElectricResistivityConverter"));
const ElectricConductanceConverter = lazy(() => import("@/pages/tools/ElectricConductanceConverter"));

// Additional Electric/Magnetic Converter Tools
const ElectricConductivityConverter = lazy(() => import("@/pages/tools/ElectricConductivityConverter"));
const ElectrostaticCapacitanceConverter = lazy(() => import("@/pages/tools/ElectrostaticCapacitanceConverter"));
const InductanceConverter = lazy(() => import("@/pages/tools/InductanceConverter"));
const MagnetomotiveForceConverter = lazy(() => import("@/pages/tools/MagnetomotiveForceConverter"));
const MagneticFieldStrengthConverter = lazy(() => import("@/pages/tools/MagneticFieldStrengthConverter"));

// Magnetic Flux Tools
const MagneticFluxConverter = lazy(() => import("@/pages/tools/MagneticFluxConverter"));
const MagneticFluxDensityConverter = lazy(() => import("@/pages/tools/MagneticFluxDensityConverter"));

// Radiation Tool
const RadiationConverter = lazy(() => import("@/pages/tools/RadiationConverter"));

// New Radiation and Data Tools
const RadiationActivityConverterPage = lazy(() => import("@/pages/tools/RadiationActivityConverterPage"));
const RadiationExposureConverterPage = lazy(() => import("@/pages/tools/RadiationExposureConverterPage"));
const RadiationAbsorbedDoseConverterPage = lazy(() => import("@/pages/tools/RadiationAbsorbedDoseConverterPage"));
const PrefixesConverterPage = lazy(() => import("@/pages/tools/PrefixesConverterPage"));
const DataTransferConverterPage = lazy(() => import("@/pages/tools/DataTransferConverterPage"));

// Volume Lumber Tool
const VolumeLumberConverterPage = lazy(() => import("@/pages/tools/VolumeLumberConverterPage"));

// Financial Calculator Tools  
const LoanCalculatorPage = lazy(() => import("@/pages/tools/LoanCalculatorPage"));
const AutoLoanCalculatorPage = lazy(() => import("@/pages/tools/AutoLoanCalculatorPage"));
const InterestCalculatorPage = lazy(() => import("@/pages/tools/InterestCalculatorPage"));
const PaymentCalculatorPage = lazy(() => import("@/pages/tools/PaymentCalculatorPage"));
const RetirementCalculatorPage = lazy(() => import("@/pages/tools/RetirementCalculatorPage"));

// New Finance Calculator Tools
const AmortizationCalculatorPage = lazy(() => import("@/pages/tools/AmortizationCalculatorPage"));
const InvestmentCalculatorPage = lazy(() => import("@/pages/tools/InvestmentCalculatorPage"));
const CurrencyCalculatorPage = lazy(() => import("@/pages/tools/CurrencyCalculatorPage"));
const InflationCalculatorPage = lazy(() => import("@/pages/tools/InflationCalculatorPage"));
const FinanceCalculatorPage = lazy(() => import("@/pages/tools/FinanceCalculatorPage"));
const MortgagePayoffCalculatorPage = lazy(() => import("@/pages/tools/MortgagePayoffCalculatorPage"));
const IncomeTaxCalculatorPage = lazy(() => import("@/pages/tools/IncomeTaxCalculatorPage"));
const CompoundInterestCalculatorPage = lazy(() => import("@/pages/tools/CompoundInterestCalculatorPage"));
const Professional401KCalculatorPage = lazy(() => import("@/pages/tools/Professional401KCalculatorPage"));
const AdvancedSalaryCalculatorPage = lazy(() => import("@/pages/tools/AdvancedSalaryCalculatorPage"));
const InterestRateCalculatorPage = lazy(() => import("@/pages/tools/InterestRateCalculatorPage"));
const SalesTaxCalculatorPage = lazy(() => import("@/pages/tools/SalesTaxCalculatorPage"));
const HouseAffordabilityCalculatorPage = lazy(() => import("@/pages/tools/HouseAffordabilityCalculatorPage"));
const SavingsCalculatorPage = lazy(() => import("@/pages/tools/SavingsCalculatorPage"));
const RentCalculatorPage = lazy(() => import("@/pages/tools/RentCalculatorPage"));
const MarriageTaxCalculatorPage = lazy(() => import("@/pages/tools/MarriageTaxCalculatorPage"));
const EstateTaxCalculatorPage = lazy(() => import("@/pages/tools/EstateTaxCalculatorPage"));
const RetirementSavingsPensionCalculatorPage = lazy(() => import("@/pages/tools/RetirementSavingsPensionCalculatorPage"));

function AppRouter() {
  // Enable preloading and performance optimization
  usePreloadComponents();
  const { useMemoryOptimization } = usePerformanceOptimization();
  useMemoryOptimization();
  const [, setLocation] = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        <Suspense fallback={null}>
          <Switch>
            <Route path="/" component={Home} />
            <Route path="/categories" component={CategoriesPage} />
            <Route path="/category/:id" component={CategoryPage} />
            <Route path="/tool/:id" component={ToolPage} />
            <Route path="/search" component={SearchPage} />
            <Route path="/about" component={AboutPage} />
            <Route path="/author" component={AuthorPage} />
            <Route path="/contact" component={ContactPage} />
            <Route path="/favorite-tools" component={FavoriteToolsPage} />
            <Route path="/blog" component={BlogPage} />
            <Route path="/blog/:id" component={BlogSinglePage} />
            <Route path="/changelog" component={ChangelogPage} />
            <Route path="/privacy" component={PrivacyPolicyPage} />
            <Route path="/terms" component={TermsOfServicePage} />
            <Route path="/disclaimer" component={DisclaimerPage} />
            <Route path="/dmca" component={DMCAPolicyPage} />
            <Route path="/sitemap" component={SitemapPage} />
            <Route path="/tools/length-converter" component={LengthConverterPage} />
            <Route path="/tools/weight-mass-converter" component={WeightMassConverterPage} />
            <Route path="/tools/volume-converter" component={VolumeConverterPage} />
            <Route path="/tools/temperature-converter" component={TemperatureConverterPage} />
            <Route path="/tools/area-converter" component={AreaConverterPage} />
            <Route path="/tools/pressure-converter" component={PressureConverterPage} />
            <Route path="/tools/data-storage-converter" component={DataStorageConverterPage} />
            <Route path="/tools/time-converter" component={TimeConverterPage} />
            <Route path="/tools/speed-converter" component={SpeedConverterPage} />
            <Route path="/tools/numbers-converter" component={NumbersConverterPage} />
            <Route path="/tools/energy-converter" component={EnergyConverterPage} />
            <Route path="/tools/power-converter" component={PowerConverterPage} />
            <Route path="/tools/force-converter" component={ForceConverterPage} />
            <Route path="/tools/angle-converter" component={AngleConverterPage} />
            <Route path="/tools/fuel-consumption-converter" component={FuelConsumptionConverterPage} />
            <Route path="/tools/volume-dry-converter" component={VolumeDryConverterPage} />
            <Route path="/tools/currency-converter" component={CurrencyConverterPage} />
            <Route path="/tools/case-converter" component={CaseConverterPage} />
            <Route path="/tools/angular-velocity-converter" component={AngularVelocityConverterPage} />
            <Route path="/tools/acceleration-converter" component={AccelerationConverterPage} />
            
            {/* Text & String Tools */}
            <Route path="/tools/url-encode" component={UrlEncodePage} />
            <Route path="/tools/url-decode" component={UrlDecodePage} />
            <Route path="/tools/html-encode" component={HtmlEncodePage} />
            <Route path="/tools/html-decode" component={HtmlDecodePage} />
            <Route path="/tools/base64-encode" component={Base64EncodePage} />
            <Route path="/tools/base64-decode-text" component={Base64DecodeTextPage} />
            <Route path="/tools/convert-text-to-binary" component={ConvertTextToBinaryPage} />
            <Route path="/tools/convert-binary-to-text" component={ConvertBinaryToTextPage} />
            <Route path="/tools/convert-text-to-octal" component={ConvertTextToOctalPage} />
            <Route path="/tools/convert-octal-to-text" component={ConvertOctalToTextPage} />
            <Route path="/tools/convert-text-to-decimal" component={ConvertTextToDecimalPage} />
            <Route path="/tools/convert-decimal-to-text" component={ConvertDecimalToTextPage} />
            <Route path="/tools/convert-text-to-hex" component={ConvertTextToHexPage} />
            <Route path="/tools/convert-hex-to-text" component={ConvertHexToTextPage} />
            <Route path="/tools/base64-decode" component={Base64DecodePage} />
            <Route path="/tools/string-to-netstring" component={StringToNetstringPage} />
            <Route path="/tools/netstring-to-string" component={NetstringToStringPage} />
            <Route path="/tools/slash-escape" component={SlashEscapePage} />
            <Route path="/tools/slash-unescape" component={SlashUnescapePage} />
            <Route path="/tools/slash-unescape-text" component={SlashUnescapeTextPage} />
            <Route path="/tools/rot13-text" component={ROT13TextPage} />
            <Route path="/tools/rot47-text" component={ROT47TextPage} />
            <Route path="/tools/generate-text-of-certain-length" component={GenerateTextOfCertainLengthPage} />
            <Route path="/tools/generate-text-from-regexp" component={GenerateTextFromRegExpPage} />
            <Route path="/tools/extract-regexp-matches-from-text" component={ExtractRegExpMatchesFromTextPage} />
            <Route path="/tools/highlight-regexp-matches-in-text" component={HighlightRegExpMatchesInTextPage} />
            <Route path="/tools/test-text-with-regexp" component={TestTextWithRegExpPage} />
            <Route path="/tools/printf-text" component={PrintfTextPage} />
            <Route path="/tools/rotate-text" component={RotateTextPage} />
            <Route path="/tools/generate-random-string" component={GenerateRandomStringPage} />
            <Route path="/tools/generate-string-from-regex" component={GenerateStringFromRegexPage} />
            <Route path="/tools/extract-regex-matches" component={ExtractRegexMatchesPage} />
            <Route path="/tools/test-string-with-regex" component={TestStringWithRegexPage} />
            <Route path="/tools/extract-substring" component={ExtractSubstringPage} />
            <Route path="/tools/convert-string-to-image" component={ConvertStringToImagePage} />
            <Route path="/tools/printf-string" component={PrintfStringPage} />
            <Route path="/tools/split-string" component={SplitStringPage} />
            <Route path="/tools/join-strings" component={JoinStringsPage} />
            <Route path="/tools/filter-string-lines" component={FilterStringLinesPage} />
            <Route path="/tools/repeat-string" component={RepeatStringPage} />
            <Route path="/tools/reverse-string" component={ReverseStringPage} />
            <Route path="/tools/find-replace-string" component={FindReplaceStringPage} />
            <Route path="/tools/truncate-string" component={TruncateStringPage} />
            <Route path="/tools/trim-string" component={TrimStringPage} />
            <Route path="/tools/left-pad-string" component={LeftPadStringPage} />
            <Route path="/tools/right-pad-string" component={RightPadStringPage} />
            <Route path="/tools/right-align-string" component={RightAlignStringPage} />
            <Route path="/tools/center-string" component={CenterStringPage} />
            <Route path="/tools/sort-strings" component={SortStringsPage} />
            <Route path="/tools/rotate-string" component={RotateStringPage} />
            <Route path="/tools/rot13-string" component={ROT13StringPage} />
            <Route path="/tools/rot47-string" component={ROT47StringPage} />
            <Route path="/tools/transpose-string" component={TransposeStringPage} />
            <Route path="/tools/slice-string" component={SliceStringPage} />
            <Route path="/tools/add-prefix-string" component={AddPrefixStringPage} />
            <Route path="/tools/add-suffix-string" component={AddSuffixStringPage} />
            <Route path="/tools/quote-string" component={QuoteStringPage} />
            <Route path="/tools/unquote-string" component={UnquoteStringPage} />
            <Route path="/tools/spaces-to-newlines" component={SpacesToNewlinesPage} />
            <Route path="/tools/newlines-to-spaces" component={NewlinesToSpacesPage} />
            <Route path="/tools/spaces-to-tabs" component={SpacesToTabsPage} />
            <Route path="/tools/tabs-to-spaces" component={TabsToSpacesPage} />
            <Route path="/tools/remove-empty-lines" component={RemoveEmptyLinesPage} />
            <Route path="/tools/remove-all-whitespace" component={RemoveAllWhitespacePage} />
            <Route path="/tools/remove-all-punctuation" component={RemoveAllPunctuationPage} />
            <Route path="/tools/remove-diacritics" component={RemoveDiacriticsPage} />
            <Route path="/tools/increment-letters" component={IncrementLettersPage} />
            <Route path="/tools/decrement-letters" component={DecrementLettersPage} />
            <Route path="/tools/add-quotes-to-text" component={AddQuotesToTextPage} />
            <Route path="/tools/remove-quotes-from-text" component={RemoveQuotesFromTextPage} />
            <Route path="/tools/add-quotes-to-words" component={AddQuotesToWordsPage} />
            <Route path="/tools/remove-quotes-from-words" component={RemoveQuotesFromWordsPage} />
            <Route path="/tools/add-quotes-to-lines" component={AddQuotesToLinesPage} />
            <Route path="/tools/remove-quotes-from-lines" component={RemoveQuotesFromLinesPage} />
            <Route path="/tools/string-length" component={StringLengthPage} />
            <Route path="/tools/count-newlines" component={CountNewlinesPage} />
            <Route path="/tools/string-to-bytes" component={StringToBytesPage} />
            <Route path="/tools/bytes-to-string" component={BytesToStringPage} />
            
            {/* New Text & String Tools - Conversion Tools */}
            <Route path="/tools/string-to-binary" component={StringToBinaryPage} />
            <Route path="/tools/binary-to-string" component={BinaryToStringPage} />
            <Route path="/tools/string-to-octal" component={StringToOctalPage} />
            <Route path="/tools/octal-to-string" component={OctalToStringPage} />
            <Route path="/tools/string-to-decimal" component={StringToDecimalPage} />
            <Route path="/tools/decimal-to-string" component={DecimalToStringPage} />
            <Route path="/tools/string-to-hex" component={StringToHexPage} />
            <Route path="/tools/hex-to-string" component={HexToStringPage} />
            <Route path="/tools/string-to-ascii" component={StringToAsciiPage} />
            <Route path="/tools/ascii-to-string" component={AsciiToStringPage} />
            <Route path="/tools/change-string-case" component={ChangeStringCasePage} />
            
            {/* New String Conversion Tools */}
            <Route path="/tools/convert-string-to-uppercase" component={ConvertStringToUppercasePage} />
            <Route path="/tools/convert-string-to-lowercase" component={ConvertStringToLowercasePage} />
            <Route path="/tools/randomize-letter-case" component={RandomizeLetterCasePage} />
            <Route path="/tools/invert-letter-case" component={InvertLetterCasePage} />
            <Route path="/tools/convert-json-to-string" component={ConvertJsonToStringPage} />
            <Route path="/tools/json-stringify-string" component={JsonStringifyStringPage} />
            <Route path="/tools/json-parse-string" component={JsonParseStringPage} />
            <Route path="/tools/convert-html-to-string" component={ConvertHtmlToStringPage} />
            <Route path="/tools/convert-xml-to-string" component={ConvertXmlToStringPage} />
            <Route path="/tools/convert-csv-to-string" component={ConvertCsvToStringPage} />
            
            {/* Additional Advanced String Manipulation Tools */}
            <Route path="/tools/convert-string-to-csv" component={ConvertStringToCsvPage} />
            <Route path="/tools/convert-bbcode-to-string" component={ConvertBbcodeToStringPage} />
            <Route path="/tools/convert-string-to-morse-code" component={ConvertStringToMorseCodePage} />
            <Route path="/tools/convert-morse-code-to-string" component={ConvertMorseCodeToStringPage} />
            <Route path="/tools/create-palindrome" component={CreatePalindromePage} />
            <Route path="/tools/check-palindrome" component={CheckPalindromePage} />
            <Route path="/tools/generate-string-unigrams" component={GenerateStringUnigramsPage} />
            <Route path="/tools/generate-string-bigrams" component={GenerateStringBigramsPage} />
            <Route path="/tools/split-text" component={SplitTextPage} />
            <Route path="/tools/join-text" component={JoinTextPage} />
            
            {/* New Text Tools */}
            <Route path="/tools/repeat-text" component={RepeatTextPage} />
            <Route path="/tools/reverse-text" component={ReverseTextPage} />
            <Route path="/tools/truncate-text" component={TruncateTextPage} />
            <Route path="/tools/slice-text" component={SliceTextPage} />
            <Route path="/tools/trim-text" component={TrimTextPage} />
            <Route path="/tools/left-pad-text" component={LeftPadTextPage} />
            <Route path="/tools/right-pad-text" component={RightPadTextPage} />
            <Route path="/tools/left-align-text" component={LeftAlignTextPage} />
            <Route path="/tools/right-align-text" component={RightAlignTextPage} />
            <Route path="/tools/center-text" component={CenterTextPage} />
            
            {/* Additional Advanced Text Tools */}
            <Route path="/tools/indent-text" component={IndentTextPage} />
            <Route path="/tools/unindent-text" component={UnindentTextPage} />
            <Route path="/tools/justify-text" component={JustifyTextPage} />
            <Route path="/tools/wrap-words-in-text" component={WrapWordsInTextPage} />
            <Route path="/tools/reverse-words-in-text" component={ReverseWordsInTextPage} />
            <Route path="/tools/reverse-sentences-in-text" component={ReverseSentencesInTextPage} />
            <Route path="/tools/reverse-paragraphs-in-text" component={ReverseParagraphsInTextPage} />
            <Route path="/tools/swap-letters-in-words" component={SwapLettersInWordsPage} />
            <Route path="/tools/swap-words-in-text" component={SwapWordsInTextPage} />
            <Route path="/tools/duplicate-words-in-text" component={DuplicateWordsInTextPage} />
            
            {/* New Advanced Text Manipulation Tools */}
            <Route path="/tools/remove-words-from-text" component={RemoveWordsFromTextPage} />
            <Route path="/tools/duplicate-sentences-in-text" component={DuplicateSentencesInTextPage} />
            <Route path="/tools/remove-sentences-from-text" component={RemoveSentencesFromTextPage} />
            <Route path="/tools/replace-words-in-text" component={ReplaceWordsInTextPage} />
            <Route path="/tools/add-random-words-to-text" component={AddRandomWordsToTextPage} />
            <Route path="/tools/add-random-letters-to-words" component={AddRandomLettersToWordsPage} />
            <Route path="/tools/introduce-errors-in-text" component={IntroduceErrorsInTextPage} />
            <Route path="/tools/generate-fake-text" component={GenerateFakeTextPage} />
            <Route path="/tools/unfake-text" component={UnfakeTextPage} />
            <Route path="/tools/check-if-text-is-fake" component={CheckIfTextIsFakePage} />
            
            {/* Additional Text Symbol and Prefix/Suffix Tools */}
            <Route path="/tools/remove-random-letters-from-words" component={RemoveRandomLettersFromWordsPage} />
            <Route path="/tools/remove-random-symbols-from-text" component={RemoveRandomSymbolsFromTextPage} />
            <Route path="/tools/add-symbols-around-words" component={AddSymbolsAroundWordsPage} />
            <Route path="/tools/remove-symbols-from-around-words" component={RemoveSymbolsFromAroundWordsPage} />
            <Route path="/tools/add-prefix-to-text-lines" component={AddPrefixToTextLinesPage} />
            <Route path="/tools/add-suffix-to-text-lines" component={AddSuffixToTextLinesPage} />
            <Route path="/tools/remove-prefix-from-text" component={RemovePrefixFromTextPage} />
            <Route path="/tools/remove-suffix-from-text-lines" component={RemoveSuffixFromTextLinesPage} />
            <Route path="/tools/add-prefix-to-words" component={AddPrefixToWordsPage} />
            <Route path="/tools/add-suffix-to-words" component={AddSuffixToWordsPage} />
            
            {/* New Text & String Tools */}
            <Route path="/tools/remove-prefix-from-words" component={RemovePrefixFromWordsPage} />
            <Route path="/tools/remove-suffix-from-words" component={RemoveSuffixFromWordsPage} />
            <Route path="/tools/insert-symbols-between-letters" component={InsertSymbolsBetweenLettersPage} />
            <Route path="/tools/add-symbols-around-letters" component={AddSymbolsAroundLettersPage} />
            <Route path="/tools/remove-all-empty-lines" component={RemoveAllEmptyLinesPage} />
            <Route path="/tools/remove-all-duplicate-lines" component={RemoveAllDuplicateLinesPage} />
            <Route path="/tools/filter-text-lines" component={FilterTextLinesPage} />
            <Route path="/tools/filter-words-in-text" component={FilterWordsInTextPage} />
            <Route path="/tools/filter-text-sentences" component={FilterTextSentencesPage} />
            
            {/* New Sorting and Randomization Tools */}
            <Route path="/tools/filter-text-paragraphs" component={FilterTextParagraphsPage} />
            <Route path="/tools/sort-text-lines" component={SortTextLinesPage} />
            <Route path="/tools/sort-sentences-in-text" component={SortSentencesInTextPage} />
            <Route path="/tools/sort-paragraphs-in-text" component={SortParagraphsInTextPage} />
            <Route path="/tools/sort-words-in-text" component={SortWordsInTextPage} />
            <Route path="/tools/sort-letters-in-words" component={SortLettersInWordsPage} />
            <Route path="/tools/sort-symbols-in-text" component={SortSymbolsInTextPage} />
            <Route path="/tools/randomize-letters-in-text" component={RandomizeLettersInTextPage} />
            <Route path="/tools/scramble-words" component={ScrambleWordsPage} />
            <Route path="/tools/randomize-words-in-text" component={RandomizeWordsInTextPage} />
            
            {/* New Text String Tools */}
            <Route path="/tools/randomize-text-lines" component={RandomizeTextLinesPage} />
            <Route path="/tools/randomize-text-sentences" component={RandomizeTextSentencesPage} />
            <Route path="/tools/randomize-text-paragraphs" component={RandomizeTextParagraphsPage} />
            <Route path="/tools/calculate-letter-sum" component={CalculateLetterSumPage} />
            <Route path="/tools/unwrap-text-lines" component={UnwrapTextLinesPage} />
            <Route path="/tools/extract-text-fragment" component={ExtractTextFragmentPage} />
            <Route path="/tools/find-and-replace-text" component={FindAndReplaceTextPage} />
            <Route path="/tools/find-the-length-of-text" component={FindTheLengthOfTextPage} />
            <Route path="/tools/find-top-letters-in-text" component={FindTopLettersInTextPage} />
            
            {/* Additional Text String Tools - Second Batch */}
            <Route path="/tools/find-top-words-in-text" component={FindTopWordsInTextPage} />
            <Route path="/tools/calculate-text-entropy" component={CalculateTextEntropyPage} />
            <Route path="/tools/count-words-in-text" component={CountWordsInTextPage} />
            <Route path="/tools/print-text-statistics" component={PrintTextStatisticsPage} />
            <Route path="/tools/find-unique-words-in-text" component={FindUniqueWordsInTextPage} />
            <Route path="/tools/count-text-lines" component={CountTextLinesPage} />
            <Route path="/tools/add-line-numbers" component={AddLineNumbersPage} />
            
            {/* SEO Tools */}
            <Route path="/tools/keyword-research" component={KeywordResearchPage} />
            
            {/* New Text & String Tools - Advanced Formatting */}
            <Route path="/tools/create-image-from-text" component={CreateImageFromTextPage} />
            <Route path="/tools/change-text-font" component={ChangeTextFontPage} />
            <Route path="/tools/remove-fancy-text-font" component={RemoveFancyTextFontPage} />
            <Route path="/tools/write-text-in-superscript" component={WriteTextInSuperscriptPage} />
            <Route path="/tools/write-text-in-subscript" component={WriteTextInSubscriptPage} />
            <Route path="/tools/generate-tiny-text" component={GenerateTinyTextPage} />
            <Route path="/tools/write-text-in-bold" component={WriteTextInBoldPage} />
            <Route path="/tools/write-text-in-italic" component={WriteTextInItalicPage} />
            <Route path="/tools/write-text-in-cursive" component={WriteTextInCursivePage} />
            
            {/* New Text & String Tools - Encoding & Conversion */}
            <Route path="/tools/convert-text-to-morse-code" component={ConvertTextToMorseCodePage} />
            <Route path="/tools/convert-morse-code-to-text" component={ConvertMorseCodeToTextPage} />
            <Route path="/tools/calculate-text-complexity" component={CalculateTextComplexityPage} />
            <Route path="/tools/url-encode-text" component={UrlEncodeTextPage} />
            <Route path="/tools/url-decode-text" component={UrlDecodeTextPage} />
            <Route path="/tools/html-encode-text" component={HtmlEncodeTextPage} />
            <Route path="/tools/html-decode-text" component={HtmlDecodeTextPage} />
            <Route path="/tools/convert-text-to-url-slug" component={ConvertTextToUrlSlugPage} />
            <Route path="/tools/base64-encode-text" component={Base64EncodeTextPage} />
            <Route path="/tools/flip-text-vertically" component={FlipTextVerticallyPage} />
            <Route path="/tools/rewrite-text" component={RewriteTextPage} />
            <Route path="/tools/change-text-alphabet" component={ChangeTextAlphabetPage} />
            <Route path="/tools/replace-letters-in-text" component={ReplaceLettersInTextPage} />
            <Route path="/tools/convert-letters-to-digits" component={ConvertLettersToDigitsPage} />
            <Route path="/tools/convert-digits-to-letters" component={ConvertDigitsToLettersPage} />
            <Route path="/tools/replace-words-with-digits" component={ReplaceWordsWithDigitsPage} />
            <Route path="/tools/replace-digits-with-words" component={ReplaceDigitsWithWordsPage} />
            <Route path="/tools/duplicate-letters-in-text" component={DuplicateLettersInTextPage} />
            <Route path="/tools/remove-letters-from-text" component={RemoveLettersFromTextPage} />
            
            {/* New Text Manipulation Tools - Requested Tools */}
            <Route path="/tools/erase-letters-from-words" component={EraseLettersFromWordsPage} />
            <Route path="/tools/erase-words-from-text" component={EraseWordsFromTextPage} />
            <Route path="/tools/visualize-text-structure" component={VisualizeTextStructurePage} />
            <Route path="/tools/highlight-letters-in-text" component={HighlightLettersInTextPage} />
            <Route path="/tools/highlight-words-in-text" component={HighlightWordsInTextPage} />
            <Route path="/tools/highlight-patterns-in-text" component={HighlightPatternsInTextPage} />
            <Route path="/tools/highlight-sentences-in-text" component={HighlightSentencesInTextPage} />
            <Route path="/tools/replace-vowels-in-text" component={ReplaceVowelsInTextPage} />
            <Route path="/tools/duplicate-vowels-in-text" component={DuplicateVowelsInTextPage} />
            <Route path="/tools/remove-vowels-from-text" component={RemoveVowelsFromTextPage} />
            <Route path="/tools/replace-consonants-in-text" component={ReplaceConsonantsInTextPage} />
            <Route path="/tools/add-an-underline-to-text" component={AddAnUnderlineToTextPage} />
            <Route path="/tools/add-a-strikethrough-to-text" component={AddAStrikethroughToTextPage} />
            <Route path="/tools/undo-zalgo-text-effect" component={UndoZalgoTextEffectPage} />
            <Route path="/tools/generate-zalgo-text" component={GenerateZalgoTextPage} />
            <Route path="/tools/convert-text-to-title-case" component={ConvertTextToTitleCasePage} />
            
            {/* New Text Case and Line Break Tools */}
            <Route path="/tools/change-text-case" component={ChangeTextCasePage} />
            <Route path="/tools/convert-text-to-proper-case" component={ConvertTextToProperCasePage} />
            <Route path="/tools/randomize-text-case" component={RandomizeTextCasePage} />
            <Route path="/tools/invert-text-case" component={InvertTextCasePage} />
            <Route path="/tools/add-line-breaks-to-text" component={AddLineBreaksToTextPage} />
            <Route path="/tools/remove-line-breaks-from-text" component={RemoveLineBreaksFromTextPage} />
            <Route path="/tools/replace-line-breaks-in-text" component={ReplaceLineBreaksInTextPage} />
            <Route path="/tools/randomize-line-breaks-in-text" component={RandomizeLineBreaksInTextPage} />
            
            {/* Line Break and Conversion Tools */}
            <Route path="/tools/normalize-line-breaks-in-text" component={NormalizeLineBreaksInTextPage} />
            <Route path="/tools/fix-distance-between-paragraphs-and-lines" component={FixDistanceBetweenParagraphsAndLinesPage} />
            <Route path="/tools/fancify-line-breaks-in-text" component={FancifyLineBreaksInTextPage} />
            <Route path="/tools/convert-spaces-to-newlines" component={ConvertSpacesToNewlinesPage} />
            <Route path="/tools/convert-newlines-to-spaces" component={ConvertNewlinesToSpacesPage} />
            <Route path="/tools/convert-spaces-to-tabs" component={ConvertSpacesToTabsPage} />
            <Route path="/tools/convert-tabs-to-spaces" component={ConvertTabsToSpacesPage} />
            <Route path="/tools/convert-comma-to-newline" component={ConvertCommaToNewlinePage} />
            <Route path="/tools/convert-newline-to-comma" component={ConvertNewlineToCommaPage} />
            <Route path="/tools/convert-column-to-comma" component={ConvertColumnToCommaPage} />
            
            {/* New Text Spacing and Comma Tools */}
            <Route path="/tools/convert-comma-to-column" component={ConvertCommaToColumnPage} />
            <Route path="/tools/convert-commas-to-spaces" component={ConvertCommasToSpacesPage} />
            <Route path="/tools/convert-spaces-to-commas" component={ConvertSpacesToCommasPage} />
            <Route path="/tools/replace-commas-in-text" component={ReplaceCommasInTextPage} />
            <Route path="/tools/remove-extra-spaces" component={RemoveExtraSpacesPage} />
            <Route path="/tools/increase-text-spacing" component={IncreaseTextSpacingPage} />
            <Route path="/tools/normalize-text-spacing" component={NormalizeTextSpacingPage} />
            <Route path="/tools/randomize-text-spacing" component={RandomizeTextSpacingPage} />
            <Route path="/tools/replace-spaces-in-text" component={ReplaceSpacesInTextPage} />
            
            {/* New Text Manipulation Tools */}
            <Route path="/tools/add-curse-words-to-text" component={AddCurseWordsToTextPage} />
            <Route path="/tools/censor-words-in-text" component={CensorWordsInTextPage} />
            <Route path="/tools/anonymize-text" component={AnonymizeTextPage} />
            <Route path="/tools/extract-text-from-html" component={ExtractTextFromHTMLPage} />
            <Route path="/tools/extract-text-from-xml" component={ExtractTextFromXMLPage} />
            <Route path="/tools/extract-text-from-bbcode" component={ExtractTextFromBBCodePage} />
            <Route path="/tools/extract-text-from-json" component={ExtractTextFromJSONPage} />
            <Route path="/tools/json-stringify-text" component={JSONStringifyTextPage} />
            <Route path="/tools/json-unstringify-text" component={JSONUnstringifyTextPage} />
            <Route path="/tools/slash-escape-text" component={SlashEscapeTextPage} />
            
            <Route path="/tools/image-resizer" component={ImageResizerPage} />
            <Route path="/tools/image-cropper" component={ImageCropperPage} />
            <Route path="/tools/pdf-editor" component={PDFEditorPage} />
            
            {/* PDF & Document Tools */}
            <Route path="/tools/pdf-to-word" component={PDFToWordConverterPage} />
            <Route path="/tools/word-to-pdf" component={WordToPDFConverterPage} />
            <Route path="/tools/pdf-to-jpg" component={PDFToJPGConverterPage} />
            <Route path="/tools/jpg-to-pdf" component={JPGToPDFConverterPage} />
            <Route path="/tools/excel-to-pdf" component={ExcelToPDFConverterPage} />
            <Route path="/tools/pdf-to-excel" component={PDFToExcelConverterPage} />
            <Route path="/tools/ppt-to-pdf" component={PowerPointToPDFConverterPage} />
            <Route path="/tools/pdf-to-ppt" component={PDFToPowerPointConverterPage} />
            <Route path="/tools/merge-pdf" component={MergePDFFilesPage} />
            <Route path="/tools/split-pdf" component={SplitPDFFilesPage} />
            <Route path="/tools/compress-pdf" component={CompressPDFPage} />
            <Route path="/tools/unlock-pdf" component={UnlockPDFPage} />
            <Route path="/tools/protect-pdf" component={ProtectPDFPage} />
            <Route path="/tools/rotate-pdf" component={RotatePDFPage} />
            <Route path="/tools/rearrange-pdf" component={RearrangePDFPage} />
            <Route path="/tools/delete-pdf-pages" component={DeletePDFPagesPage} />
            <Route path="/tools/add-pdf-page-numbers" component={AddPageNumbersToPDFPage} />
            <Route path="/tools/add-pdf-watermark" component={AddWatermarkToPDFPage} />
            <Route path="/tools/edit-pdf" component={EditPDFOnlinePage} />
            <Route path="/tools/pdf-reader" component={PDFReaderViewerPage} />
            <Route path="/tools/mortgage-calculator" component={MortgageCalculatorPage} />
            <Route path="/tools/social-security-calculator" component={SocialSecurityCalculatorPage} />
            <Route path="/tools/annuity-calculator" component={AnnuityCalculatorPage} />
            <Route path="/tools/annuity-payout-calculator" component={AnnuityPayoutCalculatorPage} />
            <Route path="/tools/credit-card-calculator" component={CreditCardCalculatorPage} />
            <Route path="/tools/credit-cards-payoff-calculator" component={CreditCardsPayoffCalculatorPage} />
            <Route path="/tools/debt-payoff-calculator" component={DebtPayoffCalculatorPage} />
            <Route path="/tools/debt-consolidation-calculator" component={DebtConsolidationCalculatorPage} />
            <Route path="/tools/repayment-calculator" component={RepaymentCalculatorPage} />
            <Route path="/tools/student-loan-calculator" component={StudentLoanCalculatorPage} />
            <Route path="/tools/college-cost-calculator" component={CollegeCostCalculatorPage} />
            
            {/* New Calculation Tools */}
            <Route path="/tools/simple-interest-calculator" component={SimpleInterestCalculatorPage} />
            <Route path="/tools/cd-calculator" component={CDCalculatorPage} />
            <Route path="/tools/bond-calculator" component={BondCalculatorPage} />
            <Route path="/tools/roth-ira-calculator" component={RothIRACalculatorPage} />
            <Route path="/tools/ira-calculator" component={IRACalculatorPage} />
            <Route path="/tools/rmd-calculator" component={RMDCalculatorPage} />
            <Route path="/tools/vat-calculator" component={VATCalculatorPage} />
            <Route path="/tools/cash-back-or-low-interest-calculator" component={CashBackOrLowInterestCalculatorPage} />
            <Route path="/tools/auto-lease-calculator" component={AutoLeaseCalculatorPage} />
            <Route path="/tools/depreciation-calculator" component={DepreciationCalculatorPage} />
            
            {/* New Calculation Tools - Batch 2 */}
            <Route path="/tools/average-return-calculator" component={AverageReturnCalculatorPage} />
            <Route path="/tools/margin-calculator" component={MarginCalculatorPage} />
            <Route path="/tools/discount-calculator" component={DiscountCalculatorPage} />
            <Route path="/tools/business-loan-calculator" component={BusinessLoanCalculatorPage} />
            <Route path="/tools/debt-to-income-ratio-calculator" component={DebtToIncomeRatioCalculatorPage} />
            <Route path="/tools/real-estate-calculator" component={RealEstateCalculatorPage} />
            <Route path="/tools/take-home-paycheck-calculator" component={TakeHomePaycheckCalculatorPage} />
            <Route path="/tools/personal-loan-calculator" component={PersonalLoanCalculatorPage} />
            <Route path="/tools/boat-loan-calculator" component={BoatLoanCalculatorPage} />
            <Route path="/tools/lease-calculator" component={LeaseCalculatorPage} />
            
            {/* New Calculation Tools - Batch 3 */}
            <Route path="/tools/refinance-calculator" component={RefinanceCalculatorPage} />
            <Route path="/tools/budget-calculator" component={BudgetCalculatorPage} />
            <Route path="/tools/rental-property-calculator" component={RentalPropertyCalculatorPage} />
            <Route path="/tools/irr-calculator" component={IRRCalculatorPage} />
            <Route path="/tools/roi-calculator" component={ROICalculatorPage} />
            <Route path="/tools/apr-calculator" component={APRCalculatorPage} />
            <Route path="/tools/fha-loan-calculator" component={FHALoanCalculatorPage} />
            <Route path="/tools/va-mortgage-calculator" component={VAMortgageCalculatorPage} />
            <Route path="/tools/down-payment-calculator" component={DownPaymentCalculatorPage} />
            <Route path="/tools/rent-vs-buy-calculator" component={RentVsBuyCalculatorPage} />
            
            {/* New Calculation Tools - Batch 4 */}
            <Route path="/tools/payback-period-calculator" component={PaybackPeriodCalculatorPage} />
            <Route path="/tools/present-value-calculator" component={PresentValueCalculatorPage} />
            <Route path="/tools/future-value-calculator" component={FutureValueCalculatorPage} />
            <Route path="/tools/commission-calculator" component={CommissionCalculatorPage} />
            <Route path="/tools/mortgage-calculator-uk" component={MortgageCalculatorUKPage} />
            <Route path="/tools/canadian-mortgage-calculator" component={CanadianMortgageCalculatorPage} />
            <Route path="/tools/mortgage-amortization-calculator" component={MortgageAmortizationCalculatorPage} />
            <Route path="/tools/percent-off-calculator" component={PercentOffCalculatorPage} />
            <Route path="/tools/bmi-calculator" component={BMICalculatorPage} />
            <Route path="/tools/calorie-calculator" component={CalorieCalculatorPage} />
            
            {/* New Health & Fitness Calculators - Batch 5 */}
            <Route path="/tools/body-fat-calculator" component={BodyFatCalculatorPage} />
            <Route path="/tools/bmr-calculator" component={BMRCalculatorPage} />
            <Route path="/tools/macro-calculator" component={MacroCalculatorPage} />
            <Route path="/tools/ideal-weight-calculator" component={IdealWeightCalculatorPage} />
            <Route path="/tools/pregnancy-calculator" component={PregnancyCalculatorPage} />
            <Route path="/tools/pregnancy-weight-gain-calculator" component={PregnancyWeightGainCalculatorPage} />
            <Route path="/tools/pregnancy-conception-calculator" component={PregnancyConceptionCalculatorPage} />
            <Route path="/tools/due-date-calculator" component={DueDateCalculatorPage} />
            <Route path="/tools/pace-calculator" component={PaceCalculatorPage} />
            <Route path="/tools/army-body-fat-calculator" component={ArmyBodyFatCalculatorPage} />
            
            {/* New Health & Fitness Calculators - Batch 6 */}
            <Route path="/tools/carbohydrate-calculator" component={CarbohydrateCalculatorPage} />
            <Route path="/tools/lean-body-mass-calculator" component={LeanBodyMassCalculatorPage} />
            <Route path="/tools/healthy-weight-calculator" component={HealthyWeightCalculatorPage} />
            <Route path="/tools/calories-burned-calculator" component={CaloriesBurnedCalculatorPage} />
            <Route path="/tools/one-rep-max-calculator" component={OneRepMaxCalculatorPage} />
            <Route path="/tools/protein-calculator" component={ProteinCalculatorPage} />
            <Route path="/tools/fat-intake-calculator" component={FatIntakeCalculatorPage} />
            <Route path="/tools/tdee-calculator" component={TDEECalculatorPage} />
            <Route path="/tools/ovulation-calculator" component={OvulationCalculatorPage} />
            <Route path="/tools/conception-calculator" component={ConceptionCalculatorPage} />
            
            {/* New Health & Calculation Tools - Batch 7 */}
            <Route path="/tools/period-calculator" component={PeriodCalculatorPage} />
            <Route path="/tools/gfr-calculator" component={GFRCalculatorPage} />
            <Route path="/tools/body-type-calculator" component={BodyTypeCalculatorPage} />
            <Route path="/tools/body-surface-area-calculator" component={BodySurfaceAreaCalculatorPage} />
            <Route path="/tools/bac-calculator" component={BACCalculatorPage} />
            <Route path="/tools/anorexic-bmi-calculator" component={AnorexicBMICalculatorPage} />
            <Route path="/tools/weight-watcher-points-calculator" component={WeightWatcherPointsCalculatorPage} />
            <Route path="/tools/overweight-calculator" component={OverweightCalculatorPage} />
            <Route path="/tools/scientific-calculator" component={ScientificCalculatorPage} />
            <Route path="/tools/fraction-calculator" component={FractionCalculatorPage} />
            
            {/* New Calculation Tools - Batch 8 */}
            <Route path="/tools/average-calculator" component={AverageCalculatorPage} />
            <Route path="/tools/p-value-calculator" component={PValueCalculatorPage} />
            <Route path="/tools/age-calculator" component={AgeCalculatorPage} />
            <Route path="/tools/date-calculator" component={DateCalculatorPage} />
            <Route path="/tools/time-calculator" component={TimeCalculatorPage} />
            <Route path="/tools/hours-calculator" component={HoursCalculatorPage} />
            <Route path="/tools/gpa-calculator" component={GPACalculatorPage} />
            <Route path="/tools/grade-calculator" component={GradeCalculatorPage} />
            <Route path="/tools/height-calculator" component={HeightCalculatorPage} />
            <Route path="/tools/concrete-calculator" component={ConcreteCalculatorPage} />
            
            {/* New Calculation Tools - Batch 9 (User Request) */}
            <Route path="/tools/percentage-calculator" component={PercentageCalculatorPage} />
            <Route path="/tools/triangle-calculator" component={TriangleCalculatorPage} />
            <Route path="/tools/volume-calculator" component={VolumeCalculatorPage} />
            <Route path="/tools/standard-deviation-calculator" component={StandardDeviationCalculatorPage} />
            <Route path="/tools/random-number-generator" component={RandomNumberGeneratorPage} />
            <Route path="/tools/number-sequence-calculator" component={NumberSequenceCalculatorPage} />
            <Route path="/tools/percent-error-calculator" component={PercentErrorCalculatorPage} />
            <Route path="/tools/exponent-calculator" component={ExponentCalculatorPage} />
            <Route path="/tools/binary-calculator" component={BinaryCalculatorPage} />
            <Route path="/tools/hex-calculator" component={HexCalculatorPage} />
            
            {/* New Calculation Tools - Batch 10 (Math & Statistics) */}
            <Route path="/tools/half-life-calculator" component={HalfLifeCalculatorPage} />
            <Route path="/tools/quadratic-formula-calculator" component={QuadraticFormulaCalculatorPage} />
            <Route path="/tools/slope-calculator" component={SlopeCalculatorPage} />
            <Route path="/tools/log-calculator" component={LogCalculatorPage} />
            <Route path="/tools/area-calculator" component={AreaCalculatorPage} />
            <Route path="/tools/sample-size-calculator" component={SampleSizeCalculatorPage} />
            <Route path="/tools/probability-calculator" component={ProbabilityCalculatorPage} />
            <Route path="/tools/statistics-calculator" component={StatisticsCalculatorPage} />
            <Route path="/tools/mean-median-mode-range-calculator" component={MeanMedianModeRangeCalculatorPage} />
            <Route path="/tools/permutation-combination-calculator" component={PermutationCombinationCalculatorPage} />
            
            {/* New Calculation Tools - Batch 11 (User Request) */}
            <Route path="/tools/z-score-calculator" component={ZScoreCalculatorPage} />
            <Route path="/tools/confidence-interval-calculator" component={ConfidenceIntervalCalculatorPage} />
            
            {/* New Calculation Tools - Batch 17 (User Request - 7 Tools) */}
            <Route path="/tools/day-counter" component={DayCounterPage} />
            <Route path="/tools/day-of-week-calculator" component={DayOfWeekCalculatorPage} />
            <Route path="/tools/ratio-calculator" component={RatioCalculatorPage} />
            <Route path="/tools/distance-calculator" component={DistanceCalculatorPage} />
            <Route path="/tools/circle-calculator" component={CircleCalculatorPage} />
            <Route path="/tools/surface-area-calculator" component={SurfaceAreaCalculatorPage} />
            <Route path="/tools/pythagorean-theorem-calculator" component={PythagoreanTheoremCalculatorPage} />
            <Route path="/tools/right-triangle-calculator" component={RightTriangleCalculatorPage} />
            <Route path="/tools/root-calculator" component={RootCalculatorPage} />
            <Route path="/tools/least-common-multiple-calculator" component={LeastCommonMultipleCalculatorPage} />
            
            {/* New Calculation Tools - Batch 12 (Advanced Math Calculators) */}
            <Route path="/tools/greatest-common-factor-calculator" component={GreatestCommonFactorCalculatorPage} />
            <Route path="/tools/factor-calculator" component={FactorCalculatorPage} />
            <Route path="/tools/rounding-calculator" component={RoundingCalculatorPage} />
            <Route path="/tools/matrix-calculator" component={MatrixCalculatorPage} />
            <Route path="/tools/scientific-notation-calculator" component={ScientificNotationCalculatorPage} />
            <Route path="/tools/big-number-calculator" component={BigNumberCalculatorPage} />
            <Route path="/tools/prime-factorization-calculator" component={PrimeFactorizationCalculatorPage} />
            <Route path="/tools/common-factor-calculator" component={CommonFactorCalculatorPage} />
            <Route path="/tools/basic-calculator" component={BasicCalculatorPage} />
            <Route path="/tools/long-division-calculator" component={LongDivisionCalculatorPage} />
            
            {/* New Calculation Tools - Batch 13 (User Request - 10 Tools) */}
            <Route path="/tools/ip-subnet-calculator" component={IPSubnetCalculatorPage} />
            <Route path="/tools/bra-size-calculator" component={BraSizeCalculatorPage} />
            <Route path="/tools/password-generator" component={PasswordGeneratorPage} />
            <Route path="/tools/dice-roller" component={DiceRollerPage} />
            <Route path="/tools/conversion-calculator" component={ConversionCalculatorPage} />
            <Route path="/tools/fuel-cost-calculator" component={FuelCostCalculatorPage} />
            <Route path="/tools/voltage-drop-calculator" component={VoltageDropCalculatorPage} />
            <Route path="/tools/btu-calculator" component={BTUCalculatorPage} />
            <Route path="/tools/square-footage-calculator" component={SquareFootageCalculatorPage} />
            <Route path="/tools/time-card-calculator" component={TimeCardCalculatorPage} />
            
            {/* New Calculation Tools - Batch 14 (User Request - 10 Tools) */}
            <Route path="/tools/time-zone-calculator" component={TimeZoneCalculatorPage} />
            <Route path="/tools/love-calculator" component={LoveCalculatorPage} />
            <Route path="/tools/gdp-calculator" component={GDPCalculatorPage} />
            <Route path="/tools/gas-mileage-calculator" component={GasMileageCalculatorPage} />
            <Route path="/tools/horsepower-calculator" component={HorsepowerCalculatorPage} />
            <Route path="/tools/engine-horsepower-calculator" component={EngineHorsepowerCalculatorPage} />
            <Route path="/tools/stair-calculator" component={StairCalculatorPage} />
            <Route path="/tools/resistor-calculator" component={ResistorCalculatorPage} />
            <Route path="/tools/ohms-law-calculator" component={OhmsLawCalculatorPage} />
            <Route path="/tools/electricity-calculator" component={ElectricityCalculatorPage} />
            
            {/* New Calculation Tools - Batch 15 (User Request - 10 Tools) */}
            <Route path="/tools/tip-calculator" component={TipCalculatorPage} />
            <Route path="/tools/mileage-calculator" component={MileageCalculatorPage} />
            <Route path="/tools/density-calculator" component={DensityCalculatorPage} />
            <Route path="/tools/mass-calculator" component={MassCalculatorPage} />
            <Route path="/tools/weight-calculator" component={WeightCalculatorPage} />
            <Route path="/tools/speed-calculator" component={SpeedCalculatorPage} />
            <Route path="/tools/molarity-calculator" component={MolarityCalculatorPage} />
            <Route path="/tools/molecular-weight-calculator" component={MolecularWeightCalculatorPage} />
            <Route path="/tools/roman-numeral-converter" component={RomanNumeralConverterPage} />
            <Route path="/tools/golf-handicap-calculator" component={GolfHandicapCalculatorPage} />
            
            {/* New Calculation Tools - Batch 16 (User Request - 10 Tools) */}
            <Route path="/tools/tire-size-calculator" component={TireSizeCalculatorPage} />
            <Route path="/tools/roofing-calculator" component={RoofingCalculatorPage} />
            <Route path="/tools/tile-calculator" component={TileCalculatorPage} />
            <Route path="/tools/mulch-calculator" component={MulchCalculatorPage} />
            <Route path="/tools/gravel-calculator" component={GravelCalculatorPage} />
            <Route path="/tools/wind-chill-calculator" component={WindChillCalculatorPage} />
            <Route path="/tools/heat-index-calculator" component={HeatIndexCalculatorPage} />
            <Route path="/tools/dew-point-calculator" component={DewPointCalculatorPage} />
            <Route path="/tools/bandwidth-calculator" component={BandwidthCalculatorPage} />
            <Route path="/tools/time-duration-calculator" component={TimeDurationCalculatorPage} />
            
            {/* Professional Unit Converters */}
            <Route path="/tools/acceleration-angular-converter" component={AccelerationAngularConverter} />
            <Route path="/tools/density-converter" component={DensityConverter} />
            <Route path="/tools/specific-volume-converter" component={SpecificVolumeConverter} />
            <Route path="/tools/moment-of-inertia-converter" component={MomentOfInertiaConverter} />
            <Route path="/tools/moment-of-force-converter" component={MomentOfForceConverter} />
            {/* New Advanced Converters */}
            <Route path="/tools/torque-converter" component={TorqueConverter} />
            <Route path="/tools/fuel-efficiency-mass-converter" component={FuelEfficiencyMassConverter} />
            <Route path="/tools/fuel-efficiency-volume-converter" component={FuelEfficiencyVolumeConverter} />
            <Route path="/tools/temperature-interval-converter" component={TemperatureIntervalConverter} />
            <Route path="/tools/thermal-expansion-converter" component={ThermalExpansionConverter} />
            <Route path="/tools/thermal-resistance-converter" component={ThermalResistanceConverter} />
            <Route path="/tools/specific-heat-capacity-converter" component={SpecificHeatCapacityConverter} />
            <Route path="/tools/heat-density-converter" component={HeatDensityConverter} />
            <Route path="/tools/heat-flux-density-converter" component={HeatFluxDensityConverter} />
            <Route path="/tools/heat-transfer-coefficient-converter" component={HeatTransferCoefficientConverter} />
            <Route path="/tools/flow-converter" component={FlowConverter} />
            <Route path="/tools/flow-mass-converter" component={FlowMassConverter} />
            <Route path="/tools/flow-molar-converter" component={FlowMolarConverter} />
            <Route path="/tools/mass-flux-density-converter" component={MassFluxDensityConverter} />
            <Route path="/tools/concentration-molar-converter" component={ConcentrationMolarConverter} />
            <Route path="/tools/concentration-solution-converter" component={ConcentrationSolutionConverter} />
            <Route path="/tools/viscosity-dynamic-converter" component={ViscosityDynamicConverter} />
            <Route path="/tools/viscosity-kinematic-converter" component={ViscosityKinematicConverter} />
            <Route path="/tools/surface-tension-converter" component={SurfaceTensionConverter} />
            <Route path="/tools/permeability-converter" component={PermeabilityConverter} />
            <Route path="/tools/luminance-converter" component={LuminanceConverter} />
            <Route path="/tools/luminous-intensity-converter" component={LuminousIntensityConverter} />
            
            {/* My New Converter Tools */}
            <Route path="/tools/illumination-converter" component={IlluminationConverter} />
            <Route path="/tools/digital-image-resolution-converter" component={DigitalImageResolutionConverter} />
            <Route path="/tools/frequency-wavelength-converter" component={FrequencyWavelengthConverter} />
            <Route path="/tools/charge-converter" component={ChargeConverter} />
            <Route path="/tools/linear-charge-density-converter" component={LinearChargeDensityConverter} />
            <Route path="/tools/surface-charge-density-converter" component={SurfaceChargeDensityConverter} />
            <Route path="/tools/volume-charge-density-converter" component={VolumeChargeDensityConverter} />
            <Route path="/tools/current-converter" component={CurrentConverter} />
            <Route path="/tools/linear-current-density-converter" component={LinearCurrentDensityConverter} />
            <Route path="/tools/surface-current-density-converter" component={SurfaceCurrentDensityConverter} />
            
            {/* Electric Converter Tools */}
            <Route path="/tools/electric-field-strength-converter" component={ElectricFieldStrengthConverter} />
            <Route path="/tools/electric-potential-converter" component={ElectricPotentialConverter} />
            <Route path="/tools/electric-resistance-converter" component={ElectricResistanceConverter} />
            <Route path="/tools/electric-resistivity-converter" component={ElectricResistivityConverter} />
            <Route path="/tools/electric-conductance-converter" component={ElectricConductanceConverter} />
            
            {/* Additional Electric/Magnetic Converter Tools */}
            <Route path="/tools/electric-conductivity-converter" component={ElectricConductivityConverter} />
            <Route path="/tools/electrostatic-capacitance-converter" component={ElectrostaticCapacitanceConverter} />
            <Route path="/tools/inductance-converter" component={InductanceConverter} />
            <Route path="/tools/magnetomotive-force-converter" component={MagnetomotiveForceConverter} />
            <Route path="/tools/magnetic-field-strength-converter" component={MagneticFieldStrengthConverter} />
            
            {/* Magnetic Flux Tools */}
            <Route path="/tools/magnetic-flux-converter" component={MagneticFluxConverter} />
            <Route path="/tools/magnetic-flux-density-converter" component={MagneticFluxDensityConverter} />
            
            {/* Radiation Tool */}
            <Route path="/tools/radiation-converter" component={RadiationConverter} />
            
            {/* New Radiation and Data Tools */}
            <Route path="/tools/radiation-activity-converter" component={RadiationActivityConverterPage} />
            <Route path="/tools/radiation-exposure-converter" component={RadiationExposureConverterPage} />
            <Route path="/tools/radiation-absorbed-dose-converter" component={RadiationAbsorbedDoseConverterPage} />
            <Route path="/tools/prefixes-converter" component={PrefixesConverterPage} />
            <Route path="/tools/data-transfer-rate-converter" component={DataTransferConverterPage} />
            
            {/* Volume Lumber Tool */}
            <Route path="/tools/volume-lumber-converter" component={VolumeLumberConverterPage} />
            
            {/* Financial Calculator Tools */}
            <Route path="/tools/loan-calculator" component={LoanCalculatorPage} />
            <Route path="/tools/auto-loan-calculator" component={AutoLoanCalculatorPage} />
            <Route path="/tools/interest-calculator" component={InterestCalculatorPage} />
            <Route path="/tools/payment-calculator" component={PaymentCalculatorPage} />
            <Route path="/tools/retirement-calculator" component={RetirementCalculatorPage} />
            
            {/* New Finance Calculator Tools */}
            <Route path="/tools/amortization-calculator" component={AmortizationCalculatorPage} />
            <Route path="/tools/investment-calculator" component={InvestmentCalculatorPage} />
            <Route path="/tools/currency-calculator" component={CurrencyCalculatorPage} />
            <Route path="/tools/inflation-calculator" component={InflationCalculatorPage} />
            <Route path="/tools/finance-calculator" component={FinanceCalculatorPage} />
            <Route path="/tools/mortgage-payoff-calculator" component={MortgagePayoffCalculatorPage} />
            <Route path="/tools/income-tax-calculator" component={IncomeTaxCalculatorPage} />
            <Route path="/tools/compound-interest-calculator" component={CompoundInterestCalculatorPage} />
            <Route path="/tools/401k-calculator" component={Professional401KCalculatorPage} />
            <Route path="/tools/advanced-salary-calculator" component={AdvancedSalaryCalculatorPage} />
            <Route path="/tools/interest-rate-calculator" component={InterestRateCalculatorPage} />
            <Route path="/tools/sales-tax-calculator" component={SalesTaxCalculatorPage} />
            <Route path="/tools/house-affordability-calculator" component={HouseAffordabilityCalculatorPage} />
            <Route path="/tools/savings-calculator" component={SavingsCalculatorPage} />
            <Route path="/tools/rent-calculator" component={RentCalculatorPage} />
            <Route path="/tools/marriage-tax-calculator" component={MarriageTaxCalculatorPage} />
            <Route path="/tools/estate-tax-calculator" component={EstateTaxCalculatorPage} />
            <Route path="/tools/retirement-savings-pension-calculator" component={RetirementSavingsPensionCalculatorPage} />
            
            {/* Authentication Pages */}
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignupPage} />
            <Route path="/enhanced-login" component={EnhancedLoginPage} />
            
            <Route component={NotFound} />
          </Switch>
        </Suspense>
      </div>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <AuthProvider>
          <ToolsProvider>
            <FavoritesProvider>
              <AppRouter />
              <Toaster />
            </FavoritesProvider>
          </ToolsProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
