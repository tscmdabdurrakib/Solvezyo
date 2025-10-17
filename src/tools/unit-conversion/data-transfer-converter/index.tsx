import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Wifi, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const conversionFactors = {
  'bit/second': 1,
  'byte/second': 8,
  'kilobit/second-si': 1000,
  'kilobyte/second-si': 8000,
  'kilobit/second': 1024,
  'kilobyte/second': 8192,
  'megabit/second-si': 1000000,
  'megabyte/second-si': 8000000,
  'megabit/second': 1048576,
  'megabyte/second': 8388608,
  'gigabit/second-si': 1000000000,
  'gigabyte/second-si': 8000000000,
  'gigabit/second': 1073741824,
  'gigabyte/second': 8589934592,
  'terabit/second-si': 1000000000000,
  'terabyte/second-si': 8000000000000,
  'terabit/second': 1099511627776,
  'terabyte/second': 8796093022208,
  'ethernet': 10000000,
  'ethernet-fast': 100000000,
  'ethernet-gigabit': 1000000000,
  'oc1': 51840000,
  'oc3': 155520000,
  'oc12': 622080000,
  'oc24': 1244160000,
  'oc48': 2488320000,
  'oc192': 9953280000,
  'oc768': 39813120000,
  'isdn-single': 64000,
  'isdn-dual': 128000,
  'modem-110': 110,
  'modem-300': 300,
  'modem-1200': 1200,
  'modem-2400': 2400,
  'modem-9600': 9600,
  'modem-14.4k': 14400,
  'modem-28.8k': 28800,
  'modem-33.6k': 33600,
  'modem-56k': 56000,
  'scsi-async': 12000000,
  'scsi-sync': 40000000,
  'scsi-fast': 80000000,
  'scsi-fast-ultra': 160000000,
  'scsi-fast-wide': 160000000,
  'scsi-fast-ultra-wide': 320000000,
  'scsi-ultra-2': 640000000,
  'scsi-ultra-3': 1280000000,
  'scsi-lvd-ultra80': 640000000,
  'scsi-lvd-ultra160': 1280000000,
  'ide-pio-0': 26400000,
  'ide-pio-1': 41600000,
  'ide-pio-2': 66400000,
  'ide-pio-3': 88800000,
  'ide-pio-4': 132800000,
  'ide-dma-0': 33600000,
  'ide-dma-1': 106400000,
  'ide-dma-2': 132800000,
  'ide-udma-0': 132800000,
  'ide-udma-1': 199200000,
  'ide-udma-2': 265600000,
  'ide-udma-3': 355200000,
  'ide-udma-4': 531200000,
  'ide-udma-33': 265600000,
  'ide-udma-66': 531200000,
  'usb': 12000000,
  'firewire': 400000000,
  't0-payload': 56000,
  't0-b8zs-payload': 64000,
  't1-signal': 1544000,
  't1-payload': 1536000,
  't1z-payload': 1536000,
  't1c-signal': 3152000,
  't1c-payload': 3072000,
  't2-signal': 6312000,
  't3-signal': 44736000,
  't3-payload': 44210000,
  't3z-payload': 44210000,
  't4-signal': 274176000,
  'epta-1-signal': 2048000,
  'epta-1-payload': 1984000,
  'epta-2-signal': 8448000,
  'epta-2-payload': 8192000,
  'epta-3-signal': 34368000,
  'epta-3-payload': 33792000,
  'h0': 384000,
  'h11': 1536000,
  'h12': 1920000,
  'virtual-tributary-1-signal': 1728000,
  'virtual-tributary-1-payload': 1664000,
  'virtual-tributary-2-signal': 2304000,
  'virtual-tributary-2-payload': 2240000,
  'virtual-tributary-6-signal': 6912000,
  'virtual-tributary-6-payload': 6720000,
  'sts1-signal': 51840000,
  'sts1-payload': 50112000,
  'sts3-signal': 155520000,
  'sts3-payload': 150336000,
  'sts3c-signal': 155520000,
  'sts3c-payload': 150336000,
  'sts12-signal': 622080000,
  'sts24-signal': 1244160000,
  'sts48-signal': 2488320000,
  'sts192-signal': 9953280000,
  'stm-1-signal': 155520000,
  'stm-4-signal': 622080000,
  'stm-16-signal': 2488320000,
  'stm-64-signal': 9953280000,
};

const unitLabels = {
  'bit/second': 'bit/second [b/s]',
  'byte/second': 'byte/second [B/s]',
  'kilobit/second-si': 'kilobit/second (SI def.)',
  'kilobyte/second-si': 'kilobyte/second (SI def.)',
  'kilobit/second': 'kilobit/second [kb/s]',
  'kilobyte/second': 'kilobyte/second [kB/s]',
  'megabit/second-si': 'megabit/second (SI def.)',
  'megabyte/second-si': 'megabyte/second (SI def.)',
  'megabit/second': 'megabit/second [Mb/s]',
  'megabyte/second': 'megabyte/second [MB/s]',
  'gigabit/second-si': 'gigabit/second (SI def.)',
  'gigabyte/second-si': 'gigabyte/second (SI def.)',
  'gigabit/second': 'gigabit/second [Gb/s]',
  'gigabyte/second': 'gigabyte/second [GB/s]',
  'terabit/second-si': 'terabit/second (SI def.)',
  'terabyte/second-si': 'terabyte/second (SI def.)',
  'terabit/second': 'terabit/second [Tb/s]',
  'terabyte/second': 'terabyte/second [TB/s]',
  'ethernet': 'ethernet',
  'ethernet-fast': 'ethernet (fast)',
  'ethernet-gigabit': 'ethernet (gigabit)',
  'oc1': 'OC1',
  'oc3': 'OC3',
  'oc12': 'OC12',
  'oc24': 'OC24',
  'oc48': 'OC48',
  'oc192': 'OC192',
  'oc768': 'OC768',
  'isdn-single': 'ISDN (single channel)',
  'isdn-dual': 'ISDN (dual channel)',
  'modem-110': 'modem (110)',
  'modem-300': 'modem (300)',
  'modem-1200': 'modem (1200)',
  'modem-2400': 'modem (2400)',
  'modem-9600': 'modem (9600)',
  'modem-14.4k': 'modem (14.4k)',
  'modem-28.8k': 'modem (28.8k)',
  'modem-33.6k': 'modem (33.6k)',
  'modem-56k': 'modem (56k)',
  'scsi-async': 'SCSI (Async)',
  'scsi-sync': 'SCSI (Sync)',
  'scsi-fast': 'SCSI (Fast)',
  'scsi-fast-ultra': 'SCSI (Fast Ultra)',
  'scsi-fast-wide': 'SCSI (Fast Wide)',
  'scsi-fast-ultra-wide': 'SCSI (Fast Ultra Wide)',
  'scsi-ultra-2': 'SCSI (Ultra-2)',
  'scsi-ultra-3': 'SCSI (Ultra-3)',
  'scsi-lvd-ultra80': 'SCSI (LVD Ultra80)',
  'scsi-lvd-ultra160': 'SCSI (LVD Ultra160)',
  'ide-pio-0': 'IDE (PIO mode 0)',
  'ide-pio-1': 'IDE (PIO mode 1)',
  'ide-pio-2': 'IDE (PIO mode 2)',
  'ide-pio-3': 'IDE (PIO mode 3)',
  'ide-pio-4': 'IDE (PIO mode 4)',
  'ide-dma-0': 'IDE (DMA mode 0)',
  'ide-dma-1': 'IDE (DMA mode 1)',
  'ide-dma-2': 'IDE (DMA mode 2)',
  'ide-udma-0': 'IDE (UDMA mode 0)',
  'ide-udma-1': 'IDE (UDMA mode 1)',
  'ide-udma-2': 'IDE (UDMA mode 2)',
  'ide-udma-3': 'IDE (UDMA mode 3)',
  'ide-udma-4': 'IDE (UDMA mode 4)',
  'ide-udma-33': 'IDE (UDMA-33)',
  'ide-udma-66': 'IDE (UDMA-66)',
  'usb': 'USB',
  'firewire': 'firewire (IEEE-1394)',
  't0-payload': 'T0 (payload)',
  't0-b8zs-payload': 'T0 (B8ZS payload)',
  't1-signal': 'T1 (signal)',
  't1-payload': 'T1 (payload)',
  't1z-payload': 'T1Z (payload)',
  't1c-signal': 'T1C (signal)',
  't1c-payload': 'T1C (payload)',
  't2-signal': 'T2 (signal)',
  't3-signal': 'T3 (signal)',
  't3-payload': 'T3 (payload)',
  't3z-payload': 'T3Z (payload)',
  't4-signal': 'T4 (signal)',
  'epta-1-signal': 'E.P.T.A. 1 (signal)',
  'epta-1-payload': 'E.P.T.A. 1 (payload)',
  'epta-2-signal': 'E.P.T.A. 2 (signal)',
  'epta-2-payload': 'E.P.T.A. 2 (payload)',
  'epta-3-signal': 'E.P.T.A. 3 (signal)',
  'epta-3-payload': 'E.P.T.A. 3 (payload)',
  'h0': 'H0',
  'h11': 'H11',
  'h12': 'H12',
  'virtual-tributary-1-signal': 'Virtual Tributary 1 (signal)',
  'virtual-tributary-1-payload': 'Virtual Tributary 1 (payload)',
  'virtual-tributary-2-signal': 'Virtual Tributary 2 (signal)',
  'virtual-tributary-2-payload': 'Virtual Tributary 2 (payload)',
  'virtual-tributary-6-signal': 'Virtual Tributary 6 (signal)',
  'virtual-tributary-6-payload': 'Virtual Tributary 6 (payload)',
  'sts1-signal': 'STS1 (signal)',
  'sts1-payload': 'STS1 (payload)',
  'sts3-signal': 'STS3 (signal)',
  'sts3-payload': 'STS3 (payload)',
  'sts3c-signal': 'STS3c (signal)',
  'sts3c-payload': 'STS3c (payload)',
  'sts12-signal': 'STS12 (signal)',
  'sts24-signal': 'STS24 (signal)',
  'sts48-signal': 'STS48 (signal)',
  'sts192-signal': 'STS192 (signal)',
  'stm-1-signal': 'STM-1 (signal)',
  'stm-4-signal': 'STM-4 (signal)',
  'stm-16-signal': 'STM-16 (signal)',
  'stm-64-signal': 'STM-64 (signal)',
};

const unitCategories = {
  common: {
    name: "Common",
    units: [
      'bit/second', 'byte/second', 'kilobit/second', 'kilobyte/second',
      'megabit/second', 'megabyte/second', 'gigabit/second', 'gigabyte/second',
      'terabit/second', 'terabyte/second'
    ]
  },
  si: {
    name: "SI Prefixes",
    units: [
      'kilobit/second-si', 'kilobyte/second-si', 'megabit/second-si', 'megabyte/second-si',
      'gigabit/second-si', 'gigabyte/second-si', 'terabit/second-si', 'terabyte/second-si'
    ]
  },
  network: {
    name: "Network",
    units: [
      'ethernet', 'ethernet-fast', 'ethernet-gigabit', 'oc1', 'oc3', 'oc12', 'oc24',
      'oc48', 'oc192', 'oc768'
    ]
  },
  connection: {
    name: "Connection",
    units: [
      'isdn-single', 'isdn-dual', 'modem-110', 'modem-300', 'modem-1200', 'modem-2400',
      'modem-9600', 'modem-14.4k', 'modem-28.8k', 'modem-33.6k', 'modem-56k'
    ]
  },
  storage: {
    name: "Storage Interface",
    units: [
      'scsi-async', 'scsi-sync', 'scsi-fast', 'scsi-fast-ultra', 'scsi-fast-wide',
      'scsi-fast-ultra-wide', 'scsi-ultra-2', 'scsi-ultra-3', 'scsi-lvd-ultra80',
      'scsi-lvd-ultra160', 'ide-pio-0', 'ide-pio-1', 'ide-pio-2', 'ide-pio-3',
      'ide-pio-4', 'ide-dma-0', 'ide-dma-1', 'ide-dma-2', 'ide-udma-0', 'ide-udma-1',
      'ide-udma-2', 'ide-udma-3', 'ide-udma-4', 'ide-udma-33', 'ide-udma-66', 'usb', 'firewire'
    ]
  },
  telecom: {
    name: "Telecom",
    units: [
      't0-payload', 't0-b8zs-payload', 't1-signal', 't1-payload', 't1z-payload',
      't1c-signal', 't1c-payload', 't2-signal', 't3-signal', 't3-payload',
      't3z-payload', 't4-signal', 'epta-1-signal', 'epta-1-payload', 'epta-2-signal',
      'epta-2-payload', 'epta-3-signal', 'epta-3-payload', 'h0', 'h11', 'h12'
    ]
  },
  sonet: {
    name: "SONET/SDH",
    units: [
      'virtual-tributary-1-signal', 'virtual-tributary-1-payload',
      'virtual-tributary-2-signal', 'virtual-tributary-2-payload',
      'virtual-tributary-6-signal', 'virtual-tributary-6-payload',
      'sts1-signal', 'sts1-payload', 'sts3-signal', 'sts3-payload',
      'sts3c-signal', 'sts3c-payload', 'sts12-signal', 'sts24-signal',
      'sts48-signal', 'sts192-signal', 'stm-1-signal', 'stm-4-signal',
      'stm-16-signal', 'stm-64-signal'
    ]
  }
};

type DataTransferUnit = keyof typeof conversionFactors;

export default function DataTransferRateConverter() {
  const [inputValue, setInputValue] = useState<string>('');
  const [fromUnit, setFromUnit] = useState<DataTransferUnit>('megabit/second');
  const [toUnit, setToUnit] = useState<DataTransferUnit>('megabyte/second');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);
  const [fromUnitOpen, setFromUnitOpen] = useState(false);
  const [toUnitOpen, setToUnitOpen] = useState(false);

  useEffect(() => {
    convert();
  }, [inputValue, fromUnit, toUnit]);

  const convert = () => {
    setError(null);
    if (!inputValue) {
      setResult('');
      return;
    }
    const value = parseFloat(inputValue);
    if (isNaN(value)) {
      setError('Please enter a valid number');
      setResult('');
      return;
    }
    const inBaseUnit = value * conversionFactors[fromUnit];
    const converted = inBaseUnit / conversionFactors[toUnit];
    setResult(formatResult(converted));
  };

  const formatResult = (num: number): string => {
    if (Math.abs(num) < 0.0001) return num.toExponential(6);
    if (Math.abs(num) < 0.01) return num.toFixed(6);
    if (Math.abs(num) < 1) return num.toFixed(4);
    if (Math.abs(num) < 100) return num.toFixed(2);
    if (Math.abs(num) < 10000) return num.toFixed(1);
    return num.toFixed(0);
  };

  const swapUnits = () => {
    setSwapAnimation(true);
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setTimeout(() => setSwapAnimation(false), 500);
  };

  const resetConverter = () => {
    setInputValue('');
    setFromUnit('megabit/second');
    setToUnit('megabyte/second');
    setResult('');
    setError(null);
  };

  return (
    <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
      <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/20 rounded-xl">
            <Wifi className="h-6 w-6 sm:h-8 sm:w-8" />
          </div>
          <div>
            <CardTitle className="text-2xl sm:text-3xl font-bold">Data Transfer Rate Converter</CardTitle>
            <CardDescription className="text-blue-100 text-sm sm:text-base">
              Convert between various units of data transfer speed
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-4 sm:p-8">
        <div className="space-y-6 sm:space-y-8">
          <div className="grid gap-6 md:gap-8 lg:grid-cols-5">
            <div className="lg:col-span-2">
              <label htmlFor="value-input" className="block text-sm font-semibold mb-2 sm:mb-3 text-foreground">
                Enter Value
              </label>
              <Input
                id="value-input"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Enter value"
                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
              />
            </div>
            
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-7 gap-4 items-end">
              <div className="md:col-span-3">
                <label className="block text-sm font-semibold mb-2 sm:mb-3 text-foreground">
                  From Unit
                </label>
                <Popover open={fromUnitOpen} onOpenChange={setFromUnitOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={fromUnitOpen} className="h-12 w-full justify-between text-left font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm">
                      <span className="truncate">{fromUnit ? unitLabels[fromUnit] : "Select unit..."}</span>
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-w-xs p-0">
                    <Command>
                      <CommandInput placeholder="Search units..." />
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandList className="max-h-80">
                        {Object.entries(unitCategories).map(([key, category]) => (
                          <CommandGroup key={key} heading={category.name}>
                            {category.units.map((unit) => (
                              <CommandItem key={unit} value={`${unit} ${unitLabels[unit as DataTransferUnit]}`} onSelect={() => { setFromUnit(unit as DataTransferUnit); setFromUnitOpen(false); }}>
                                {unitLabels[unit as DataTransferUnit]}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="flex justify-center items-center md:col-span-1">
                <motion.div animate={{ rotate: swapAnimation ? 180 : 0 }} transition={{ duration: 0.3 }}>
                  <Button type="button" variant="outline" size="icon" onClick={swapUnits} className="rounded-full h-12 w-12 bg-gradient-to-br from-blue-500 to-purple-500 border-0 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-lg hover:shadow-xl">
                    <ArrowRightLeft className="h-5 w-5" />
                    <span className="sr-only">Swap units</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="md:col-span-3">
                <label className="block text-sm font-semibold mb-2 sm:mb-3 text-foreground">
                  To Unit
                </label>
                <Popover open={toUnitOpen} onOpenChange={setToUnitOpen}>
                  <PopoverTrigger asChild>
                    <Button variant="outline" role="combobox" aria-expanded={toUnitOpen} className="h-12 w-full justify-between text-left font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm">
                      <span className="truncate">{toUnit ? unitLabels[toUnit] : "Select unit..."}</span>
                      <Search className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-[--radix-popover-trigger-width] max-w-xs p-0">
                    <Command>
                      <CommandInput placeholder="Search units..." />
                      <CommandEmpty>No unit found.</CommandEmpty>
                      <CommandList className="max-h-80">
                        {Object.entries(unitCategories).map(([key, category]) => (
                          <CommandGroup key={key} heading={category.name}>
                            {category.units.map((unit) => (
                              <CommandItem key={unit} value={`${unit} ${unitLabels[unit as DataTransferUnit]}`} onSelect={() => { setToUnit(unit as DataTransferUnit); setToUnitOpen(false); }}>
                                {unitLabels[unit as DataTransferUnit]}
                              </CommandItem>
                            ))}
                          </CommandGroup>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 p-4 sm:p-6 rounded-2xl border-2 border-green-200/50 dark:border-green-800/50 shadow-inner">
            <h3 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-2 sm:mb-3 uppercase tracking-wide">Conversion Result</h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl sm:text-4xl font-bold">
                {result ? (
                  <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-2">
                    <span className="text-green-600 dark:text-green-400 break-all">{result}</span>
                    <span className="text-base sm:text-lg font-normal text-muted-foreground">
                      {unitLabels[toUnit]?.split(' ')[0]}
                    </span>
                  </div>
                ) : (
                  <span className="text-muted-foreground text-lg sm:text-xl italic">Enter a value to see the conversion</span>
                )}
              </div>
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {result && (
            <div className="bg-blue-50/50 dark:bg-blue-950/20 p-4 sm:p-5 rounded-xl border border-blue-200 dark:border-blue-800 text-sm">
              <div className="flex items-start gap-3">
                <div className="p-1.5 bg-blue-100 dark:bg-blue-900/50 rounded-lg mt-1">
                  <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <span className="font-semibold text-blue-900 dark:text-blue-100">Conversion Details:</span>
                  <p className="text-blue-700 dark:text-blue-300 mt-1 font-medium break-words">
                    {`${inputValue} ${unitLabels[fromUnit]} = ${result} ${unitLabels[toUnit]}`}
                  </p>
                  <p className="text-xs text-blue-600 dark:text-blue-400 mt-2 bg-blue-100/50 dark:bg-blue-900/30 p-2 rounded-lg break-words">
                    <strong>Conversion Factor:</strong> 1 {unitLabels[fromUnit]?.split(' ')[0]} = {(conversionFactors[fromUnit] / conversionFactors[toUnit]).toExponential(6)} {unitLabels[toUnit]?.split(' ')[0]}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex flex-col sm:flex-row justify-between items-center gap-4 border-t-0 p-6 sm:p-8 bg-gradient-to-r from-gray-50 to-blue-50/30 dark:from-gray-900 dark:to-blue-950/30 rounded-b-2xl">
        <Button variant="outline" onClick={resetConverter} className="w-full sm:w-auto gap-2 h-11 px-6 font-medium border-2 hover:border-primary transition-all duration-300 rounded-xl shadow-sm hover:shadow-md">
          <RotateCcw className="h-4 w-4" /> Reset Converter
        </Button>
        <div className="text-sm text-center sm:text-right text-muted-foreground">
          <div className="font-medium">Accurate data transfer rate conversions</div>
          <div className="text-xs mt-1">Supports a wide range of units</div>
        </div>
      </CardFooter>
    </Card>
  );
}
