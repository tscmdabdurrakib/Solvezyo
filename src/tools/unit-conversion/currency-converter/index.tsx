import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { DollarSign, ArrowRightLeft, RotateCcw, Info, Search, Copy } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";

// Define unit conversion factors (to USD as base unit - placeholder values)
// In a real application, these would be fetched from a reliable API
const conversionFactors = {
  USD: 1,
  EUR: 1.08, // Placeholder
  AUD: 0.66, // Placeholder
  CAD: 0.73, // Placeholder
  CHF: 1.12, // Placeholder
  CNY: 0.14, // Placeholder
  GBP: 1.27, // Placeholder
  INR: 0.012, // Placeholder
  JPY: 0.0064, // Placeholder
  MXN: 0.055, // Placeholder
  AED: 0.27, // Placeholder
  AFN: 0.014, // Placeholder
  ALL: 0.011, // Placeholder
  AMD: 0.0026, // Placeholder
  ANG: 0.56, // Placeholder
  AOA: 0.0012, // Placeholder
  ARS: 0.0011, // Placeholder
  AWG: 0.55, // Placeholder
  AZN: 0.59, // Placeholder
  BAM: 0.55, // Placeholder
  BBD: 0.50, // Placeholder
  BDT: 0.0085, // Placeholder
  BGN: 0.55, // Placeholder
  BHD: 2.65, // Placeholder
  BIF: 0.00035, // Placeholder
  BMD: 1, // Placeholder
  BND: 0.74, // Placeholder
  BOB: 0.14, // Placeholder
  BRL: 0.18, // Placeholder
  BSD: 1, // Placeholder
  BTC: 67000, // Placeholder (highly volatile)
  BTN: 0.012, // Placeholder
  BWP: 0.073, // Placeholder
  BYN: 0.31, // Placeholder
  BZD: 0.50, // Placeholder
  CDF: 0.00036, // Placeholder
  CLF: 34, // Placeholder (highly volatile)
  CLP: 0.0011, // Placeholder
  CNH: 0.14, // Placeholder
  COP: 0.00025, // Placeholder
  CRC: 0.0019, // Placeholder
  CUC: 1, // Placeholder
  CUP: 0.042, // Placeholder
  CVE: 0.0098, // Placeholder
  CZK: 0.043, // Placeholder
  DJF: 0.0056, // Placeholder
  DKK: 0.14, // Placeholder
  DOP: 0.017, // Placeholder
  DZD: 0.0074, // Placeholder
  EGP: 0.021, // Placeholder
  ERN: 0.067, // Placeholder
  ETB: 0.017, // Placeholder
  FJD: 0.45, // Placeholder
  FKP: 1.27, // Placeholder
  GEL: 0.36, // Placeholder
  GGP: 1.27, // Placeholder
  GHS: 0.067, // Placeholder
  GIP: 1.27, // Placeholder
  GMD: 0.015, // Placeholder
  GNF: 0.00012, // Placeholder
  GTQ: 0.13, // Placeholder
  GYD: 0.0048, // Placeholder
  HKD: 0.13, // Placeholder
  HNL: 0.041, // Placeholder
  HRK: 0.14, // Placeholder
  HTG: 0.0076, // Placeholder
  HUF: 0.0027, // Placeholder
  IDR: 0.000061, // Placeholder
  ILS: 0.27, // Placeholder
  IMP: 1.27, // Placeholder
  IQD: 0.00076, // Placeholder
  IRR: 0.000024, // Placeholder
  ISK: 0.0072, // Placeholder
  JEP: 1.27, // Placeholder
  JMD: 0.0064, // Placeholder
  JOD: 1.41, // Placeholder
  KES: 0.0077, // Placeholder
  KGS: 0.011, // Placeholder
  KHR: 0.00024, // Placeholder
  KMF: 0.0022, // Placeholder
  KPW: 0.0011, // Placeholder
  KRW: 0.00072, // Placeholder
  KWD: 3.26, // Placeholder
  KYD: 1.20, // Placeholder
  KZT: 0.0021, // Placeholder
  LAK: 0.000046, // Placeholder
  LBP: 0.000011, // Placeholder
  LKR: 0.0033, // Placeholder
  LRD: 0.0052, // Placeholder
  LSL: 0.054, // Placeholder
  LYD: 0.21, // Placeholder
  MAD: 0.099, // Placeholder
  MDL: 0.056, // Placeholder
  MGA: 0.00022, // Placeholder
  MKD: 0.018, // Placeholder
  MMK: 0.00048, // Placeholder
  MNT: 0.00029, // Placeholder
  MOP: 0.12, // Placeholder
  MRU: 0.025, // Placeholder
  MUR: 0.021, // Placeholder
  MVR: 0.065, // Placeholder
  MWK: 0.00057, // Placeholder
  MYR: 0.21, // Placeholder
  MZN: 0.016, // Placeholder
  NAD: 0.054, // Placeholder
  NGN: 0.00067, // Placeholder
  NIO: 0.027, // Placeholder
  NOK: 0.094, // Placeholder
  NPR: 0.0075, // Placeholder
  NZD: 0.61, // Placeholder
  OMR: 2.60, // Placeholder
  PAB: 1, // Placeholder
  PEN: 0.27, // Placeholder
  PGK: 0.26, // Placeholder
  PHP: 0.017, // Placeholder
  PKR: 0.0036, // Placeholder
  PLN: 0.25, // Placeholder
  PYG: 0.00013, // Placeholder
  QAR: 0.27, // Placeholder
  RON: 0.22, // Placeholder
  RSD: 0.0092, // Placeholder
  RUB: 0.011, // Placeholder
  RWF: 0.00077, // Placeholder
  SAR: 0.27, // Placeholder
  SBD: 0.12, // Placeholder
  SCR: 0.073, // Placeholder
  SDG: 0.0017, // Placeholder
  SEK: 0.095, // Placeholder
  SGD: 0.74, // Placeholder
  SHP: 1.27, // Placeholder
  SLE: 0.049, // Placeholder
  SLL: 0.000049, // Placeholder
  SOS: 0.0017, // Placeholder
  SRD: 0.029, // Placeholder
  SSP: 0.00096, // Placeholder
  STD: 0.000043, // Placeholder (old currency)
  STN: 0.043, // Placeholder
  SVC: 0.11, // Placeholder
  SYP: 0.000079, // Placeholder
  SZL: 0.054, // Placeholder
  THB: 0.027, // Placeholder
  TJS: 0.092, // Placeholder
  TMT: 0.29, // Placeholder
  TND: 0.32, // Placeholder
  TOP: 0.42, // Placeholder
  TRY: 0.031, // Placeholder
  TTD: 0.15, // Placeholder
  TWD: 0.031, // Placeholder
  TZS: 0.00038, // Placeholder
  UAH: 0.025, // Placeholder
  UGX: 0.00027, // Placeholder
  UYU: 0.025, // Placeholder
  UZS: 0.000079, // Placeholder
};

// Unit display names with abbreviations and categories
const unitLabels = {
  USD: "United States Dollar (USD)",
  EUR: "Euro (EUR)",
  AUD: "Australian Dollar (AUD)",
  CAD: "Canadian Dollar (CAD)",
  CHF: "Swiss Franc (CHF)",
  CNY: "Chinese Yuan (CNY)",
  GBP: "British Pound Sterling (GBP)",
  INR: "Indian Rupee (INR)",
  JPY: "Japanese Yen (JPY)",
  MXN: "Mexican Peso (MXN)",
  AED: "UAE Dirham (AED)",
  AFN: "Afghan Afghani (AFN)",
  ALL: "Albanian Lek (ALL)",
  AMD: "Armenian Dram (AMD)",
  ANG: "Netherlands Antillean Guilder (ANG)",
  AOA: "Angolan Kwanza (AOA)",
  ARS: "Argentine Peso (ARS)",
  AWG: "Aruban Florin (AWG)",
  AZN: "Azerbaijani Manat (AZN)",
  BAM: "Bosnia-Herzegovina Convertible Mark (BAM)",
  BBD: "Barbadian Dollar (BBD)",
  BDT: "Bangladeshi Taka (BDT)",
  BGN: "Bulgarian Lev (BGN)",
  BHD: "Bahraini Dinar (BHD)",
  BIF: "Burundian Franc (BIF)",
  BMD: "Bermudan Dollar (BMD)",
  BND: "Brunei Dollar (BND)",
  BOB: "Bolivian Boliviano (BOB)",
  BRL: "Brazilian Real (BRL)",
  BSD: "Bahamian Dollar (BSD)",
  BTC: "Bitcoin (BTC)",
  BTN: "Bhutanese Ngultrum (BTN)",
  BWP: "Botswanan Pula (BWP)",
  BYN: "Belarusian Ruble (BYN)",
  BZD: "Belize Dollar (BZD)",
  CDF: "Congolese Franc (CDF)",
  CLF: "Chilean Unit of Account (UF) (CLF)",
  CLP: "Chilean Peso (CLP)",
  CNH: "Chinese Yuan (Offshore) (CNH)",
  COP: "Colombian Peso (COP)",
  CRC: "Costa Rican Colón (CRC)",
  CUC: "Cuban Convertible Peso (CUC)",
  CUP: "Cuban Peso (CUP)",
  CVE: "Cape Verdean Escudo (CVE)",
  CZK: "Czech Koruna (CZK)",
  DJF: "Djiboutian Franc (DJF)",
  DKK: "Danish Krone (DKK)",
  DOP: "Dominican Peso (DOP)",
  DZD: "Algerian Dinar (DZD)",
  EGP: "Egyptian Pound (EGP)",
  ERN: "Eritrean Nakfa (ERN)",
  ETB: "Ethiopian Birr (ETB)",
  FJD: "Fijian Dollar (FJD)",
  FKP: "Falkland Islands Pound (FKP)",
  GEL: "Georgian Lari (GEL)",
  GGP: "Guernsey Pound (GGP)",
  GHS: "Ghanaian Cedi (GHS)",
  GIP: "Gibraltar Pound (GIP)",
  GMD: "Gambian Dalasi (GMD)",
  GNF: "Guinean Franc (GNF)",
  GTQ: "Guatemalan Quetzal (GTQ)",
  GYD: "Guyanaese Dollar (GYD)",
  HKD: "Hong Kong Dollar (HKD)",
  HNL: "Honduran Lempira (HNL)",
  HRK: "Croatian Kuna (HRK)",
  HTG: "Haitian Gourde (HTG)",
  HUF: "Hungarian Forint (HUF)",
  IDR: "Indonesian Rupiah (IDR)",
  ILS: "Israeli New Shekel (ILS)",
  IMP: "Isle of Man Pound (IMP)",
  IQD: "Iraqi Dinar (IQD)",
  IRR: "Iranian Rial (IRR)",
  ISK: "Icelandic Króna (ISK)",
  JEP: "Jersey Pound (JEP)",
  JMD: "Jamaican Dollar (JMD)",
  JOD: "Jordanian Dinar (JOD)",
  KES: "Kenyan Shilling (KES)",
  KGS: "Kyrgystani Som (KGS)",
  KHR: "Cambodian Riel (KHR)",
  KMF: "Comorian Franc (KMF)",
  KPW: "North Korean Won (KPW)",
  KRW: "South Korean Won (KRW)",
  KWD: "Kuwaiti Dinar (KWD)",
  KYD: "Cayman Islands Dollar (KYD)",
  KZT: "Kazakhstani Tenge (KZT)",
  LAK: "Laotian Kip (LAK)",
  LBP: "Lebanese Pound (LBP)",
  LKR: "Sri Lankan Rupee (LKR)",
  LRD: "Liberian Dollar (LRD)",
  LSL: "Lesotho Loti (LSL)",
  LYD: "Libyan Dinar (LYD)",
  MAD: "Moroccan Dirham (MAD)",
  MDL: "Moldovan Leu (MDL)",
  MGA: "Malagasy Ariary (MGA)",
  MKD: "Macedonian Denar (MKD)",
  MMK: "Myanmar Kyat (MMK)",
  MNT: "Mongolian Tugrik (MNT)",
  MOP: "Macanese Pataca (MOP)",
  MRU: "Mauritanian Ouguiya (MRU)",
  MUR: "Mauritian Rupee (MUR)",
  MVR: "Maldivian Rufiyaa (MVR)",
  MWK: "Malawian Kwacha (MWK)",
  MYR: "Malaysian Ringgit (MYR)",
  MZN: "Mozambican Metical (MZN)",
  NAD: "Namibian Dollar (NAD)",
  NGN: "Nigerian Naira (NGN)",
  NIO: "Nicaraguan Córdoba (NIO)",
  NOK: "Norwegian Krone (NOK)",
  NPR: "Nepalese Rupee (NPR)",
  NZD: "New Zealand Dollar (NZD)",
  OMR: "Omani Rial (OMR)",
  PAB: "Panamanian Balboa (PAB)",
  PEN: "Peruvian Nuevo Sol (PEN)",
  PGK: "Papua New Guinean Kina (PGK)",
  PHP: "Philippine Peso (PHP)",
  PKR: "Pakistani Rupee (PKR)",
  PLN: "Polish Złoty (PLN)",
  PYG: "Paraguayan Guarani (PYG)",
  QAR: "Qatari Rial (QAR)",
  RON: "Romanian Leu (RON)",
  RSD: "Serbian Dinar (RSD)",
  RUB: "Russian Ruble (RUB)",
  RWF: "Rwandan Franc (RWF)",
  SAR: "Saudi Riyal (SAR)",
  SBD: "Solomon Islands Dollar (SBD)",
  SCR: "Seychellois Rupee (SCR)",
  SDG: "Sudanese Pound (SDG)",
  SEK: "Swedish Krona (SEK)",
  SGD: "Singapore Dollar (SGD)",
  SHP: "Saint Helena Pound (SHP)",
  SLE: "Sierra Leonean Leone (SLE)",
  SLL: "Sierra Leonean Leone (SLL)",
  SOS: "Somali Shilling (SOS)",
  SRD: "Surinamese Dollar (SRD)",
  SSP: "South Sudanese Pound (SSP)",
  STD: "São Tomé and Príncipe Dobra (STD)",
  STN: "São Tomé and Príncipe Dobra (STN)",
  SVC: "Salvadoran Colón (SVC)",
  SYP: "Syrian Pound (SYP)",
  SZL: "Swazi Lilangeni (SZL)",
  THB: "Thai Baht (THB)",
  TJS: "Tajikistani Somoni (TJS)",
  TMT: "Turkmenistani Manat (TMT)",
  TND: "Tunisian Dinar (TND)",
  TOP: "Tongan Paʻanga (TOP)",
  TRY: "Turkish Lira (TRY)",
  TTD: "Trinidad and Tobago Dollar (TTD)",
  TWD: "New Taiwan Dollar (TWD)",
  TZS: "Tanzanian Shilling (TZS)",
  UAH: "Ukrainian Hryvnia (UAH)",
  UGX: "Ugandan Shilling (UGX)",
  UYU: "Uruguayan Peso (UYU)",
  UZS: "Uzbekistan Som (UZS)",
};

// Unit categories for better organization
const unitCategories = {
  major: {
    name: "Major Currencies",
    units: ["USD", "EUR", "AUD", "CAD", "CHF", "CNY", "GBP", "INR", "JPY", "MXN"]
  },
  africa: {
    name: "African Currencies",
    units: ["AED", "AOA", "BIF", "BWP", "CDF", "CVE", "DJF", "DZD", "EGP", "ERN", "ETB", "GHS", "GMD", "GNF", "KES", "KMF", "LRD", "LSL", "LYD", "MAD", "MGA", "MWK", "MZN", "NAD", "NGN", "RWF", "SCR", "SDG", "SLE", "SLL", "SOS", "SSP", "STD", "STN", "SZL", "TZS", "UGX"]
  },
  asia: {
    name: "Asian Currencies",
    units: ["AFN", "AMD", "AZN", "BDT", "BHD", "BND", "BTN", "CNH", "IDR", "ILS", "IMP", "IQD", "IRR", "JOD", "JPY", "KGS", "KHR", "KPW", "KRW", "KWD", "KZT", "LAK", "LBP", "LKR", "MNT", "MOP", "MVR", "MYR", "NPR", "OMR", "PHP", "PKR", "QAR", "SAR", "SGD", "SYP", "THB", "TJS", "TMT", "TRY", "TWD", "UZS"]
  },
  europe: {
    name: "European Currencies",
    units: ["ALL", "BAM", "BGN", "BYN", "CHF", "CZK", "DKK", "EUR", "GBP", "GEL", "GGP", "GIP", "HRK", "HUF", "ISK", "JEP", "MDL", "MKD", "NOK", "PLN", "RON", "RSD", "RUB", "SEK", "SHP", "UAH"]
  },
  northAmerica: {
    name: "North American Currencies",
    units: ["BBD", "BSD", "BZD", "CAD", "CRC", "CUC", "CUP", "DOP", "GTQ", "HNL", "HTG", "JMD", "MXN", "NIO", "PAB", "SVC", "TTD", "USD"]
  },
  southAmerica: {
    name: "South American Currencies",
    units: ["ARS", "BOB", "BRL", "CLF", "CLP", "COP", "GYD", "PEN", "PYG", "SRD", "UYU"]
  },
  oceania: {
    name: "Oceanian Currencies",
    units: ["AUD", "FJD", "NZD", "PGK", "SBD", "TOP"]
  },
  crypto: {
    name: "Cryptocurrencies",
    units: ["BTC"]
  },
  other: {
    name: "Other Currencies",
    units: ["ANG", "AWG", "BMD", "KYD", "MRU", "MUR", "TND"]
  }
};

// Type for Currency units
type CurrencyUnit = keyof typeof conversionFactors;

/**
 * Currency Converter Component
 * Allows users to convert between different currency units
 */
export default function CurrencyConverter() {
  const { toast } = useToast();
  // State for input value, source and target units
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<CurrencyUnit>('USD');
  const [toUnit, setToUnit] = useState<CurrencyUnit>('EUR');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertCurrency();
  }, [inputValue, fromUnit, toUnit]);

  /**
   * Convert from one currency unit to another
   */
  const convertCurrency = () => {
    // Clear previous errors
    setError(null);

    // If input is empty, clear the result
    if (!inputValue) {
      setResult('');
      return;
    }

    // Parse the input value
    const value = parseFloat(inputValue);

    // Validate the input is a number
    if (isNaN(value)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }

    // Perform conversion
    // First convert to USD (base unit), then to target unit
    const inUSD = value * conversionFactors[fromUnit];
    const converted = inUSD / conversionFactors[toUnit];

    // Format the result based on the magnitude for better readability
    const roundedResult = formatResult(converted);
    setResult(roundedResult);
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.0001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(2);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(1);
    } else {
      return num.toFixed(0);
    }
  };

  /**
   * Swap the from and to units
   */
  const swapUnits = () => {
    setSwapAnimation(true);
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
    
    // Reset animation state after animation completes
    setTimeout(() => setSwapAnimation(false), 500);
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setInputValue('');
    setFromUnit('USD');
    setToUnit('EUR');
    setResult('');
    setError(null);
  };

  /**
   * Copy the result to the clipboard
   */
  const copyResult = () => {
    if (result) {
      navigator.clipboard.writeText(result);
      toast({
        title: "Copied!",
        description: "Conversion result copied to clipboard.",
      });
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <DollarSign className="h-8 w-8" />
          </div>
          <div>
            <CardTitle className="text-3xl font-bold">Currency Converter</CardTitle>
            <CardDescription className="text-blue-100">
              Convert between various currencies with precision
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-8">
        <div className="space-y-8">
          {/* Input value and unit selection */}
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="currency-value" className="block text-sm font-semibold mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="currency-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter currency value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                data-testid="input-currency-value"
              />
            </div>
            
            <div className="lg:col-span-3 grid lg:grid-cols-7 gap-4 items-end">
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold mb-3 text-foreground">
                  From Unit
                </label>
                <Popover open={fromUnitOpen} onOpenChange={setFromUnitOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={fromUnitOpen}
                      className="h-12 w-full justify-between text-left font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                      data-testid="select-from-unit"
                    >
                      {fromUnit ? unitLabels[fromUnit] : "Select unit..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <Command>
                      <CommandInput placeholder="Search units..." />
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandList className="max-h-80">
                        {Object.entries(unitCategories).map(([categoryKey, category]) => (
                          <CommandGroup key={categoryKey} heading={category.name}>
                            {category.units
                              .filter(unit => unitLabels[unit as CurrencyUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as CurrencyUnit]}`}
                                  onSelect={() => {
                                    setFromUnit(unit as CurrencyUnit);
                                    setFromUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as CurrencyUnit]}
                                </CommandItem>
                              ))
                            }
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex justify-center items-center lg:col-span-1">
                <motion.div
                  animate={{ rotate: swapAnimation ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={swapUnits}
                    className="rounded-full h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 border-0 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                    data-testid="button-swap-units"
                  >
                    <ArrowRightLeft className="h-5 w-5" />
                    <span className="sr-only">Swap units</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="lg:col-span-3">
                <label className="block text-sm font-semibold mb-3 text-foreground">
                  To Unit
                </label>
                <Popover open={toUnitOpen} onOpenChange={setToUnitOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={toUnitOpen}
                      className="h-12 w-full justify-between text-left font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
                      data-testid="select-to-unit"
                    >
                      {toUnit ? unitLabels[toUnit] : "Select unit..."}
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-80 p-0">
                    <Command>
                      <CommandInput placeholder="Search units..." />
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandList className="max-h-80">
                        {Object.entries(unitCategories).map(([categoryKey, category]) => (
                          <CommandGroup key={categoryKey} heading={category.name}>
                            {category.units
                              .filter(unit => unitLabels[unit as CurrencyUnit])
                              .map((unit) => (
                                <CommandItem
                                  key={unit}
                                  value={`${unit} ${unitLabels[unit as CurrencyUnit]}`}
                                  onSelect={() => {
                                    setToUnit(unit as CurrencyUnit);
                                    setToUnitOpen(false);
                                  }}
                                >
                                  {unitLabels[unit as CurrencyUnit]}
                                </CommandItem>
                              ))
                            }
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          {/* Conversion Result */}
          <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 p-6 rounded-2xl border-2 border-green-200/50 dark:border-green-800/50 shadow-inner">
            <h3 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3 uppercase tracking-wide">Conversion Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-4xl font-bold" data-testid="result-display">
                {result ? (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                    <span className="text-green-600 dark:text-green-400">{result}</span>
                    <span className="text-lg font-normal text-muted-foreground">
                      {unitLabels[toUnit]?.split(' ')[1]?.replace(/[()]/g, '') || unitLabels[toUnit]}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-xl italic">Enter a value to see the conversion</span>
                )}
              </div>
              {result && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyResult}
                  className="text-muted-foreground hover:text-primary"
                  data-testid="copy-button"
                >
                  <Copy className="h-5 w-5" />
                  <span className="sr-only">Copy result</span>
                </Button>
              )}
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Conversion Formula Display */}
          {result && (
            <div className="bg-blue-50/50 dark:bg-blue-950/20 p-5 rounded-xl border border-blue-200 dark:border-blue-800 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-blue-900 dark:text-blue-100">Conversion Details:</span>
                  <p className="text-blue-700 dark:text-blue-300 mt-2 font-medium">
                    {`${inputValue} ${unitLabels[fromUnit]?.split(' ')[0]} = ${result} ${unitLabels[toUnit]?.split(' ')[0]}`}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-lg">
                    <strong>Conversion Factor:</strong> 1 {unitLabels[fromUnit]?.split(' ')[0]} = {(conversionFactors[fromUnit] / conversionFactors[toUnit]).toFixed(8)} {unitLabels[toUnit]?.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t-0 p-8 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 rounded-b-2xl">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2 h-11 px-6 font-medium border-2 hover:border-primary transition-all duration-300 rounded-xl shadow-sm hover:shadow-md"
          data-testid="button-reset"
        >
          <RotateCcw className="h-4 w-4" /> Reset Converter
        </Button>
        
        <div className="text-sm text-center sm:text-right text-muted-foreground">
          <div className="font-medium">Precision conversions between various currencies</div>
          <div className="text-xs mt-1">Using real-time exchange rates (requires API integration)</div>
        </div>
      </CardFooter>
    </Card>
  );
}
