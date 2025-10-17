import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue, SelectGroup, SelectLabel } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { HardDrive, ArrowRightLeft, RotateCcw, Info, Search } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const conversionFactors = {
    bit: 1,
    nibble: 4,
    byte: 8,
    character: 8,
    word: 16,
    'mapm-word': 32,
    'quadruple-word': 64,
    block: 4096,
    kilobit: 1000,
    kilobyte: 8000,
    'kilobyte-103-bytes': 8000,
    megabit: 1e6,
    megabyte: 8e6,
    'megabyte-106-bytes': 8e6,
    gigabit: 1e9,
    gigabyte: 8e9,
    'gigabyte-109-bytes': 8e9,
    terabit: 1e12,
    terabyte: 8e12,
    'terabyte-1012-bytes': 8e12,
    petabit: 1e15,
    petabyte: 8e15,
    'petabyte-1015-bytes': 8e15,
    exabit: 1e18,
    exabyte: 8e18,
    'exabyte-1018-bytes': 8e18,
    'floppy-disk-3-5-dd': 5888000,
    'floppy-disk-3-5-hd': 11776000,
    'floppy-disk-3-5-ed': 23552000,
    'floppy-disk-5-25-dd': 2944000,
    'floppy-disk-5-25-hd': 9824000,
    'zip-100': 800000000,
    'zip-250': 2000000000,
    'jaz-1gb': 8e9,
    'jaz-2gb': 1.6e10,
    'cd-74-minute': 5292000000,
    'cd-80-minute': 5760000000,
    'dvd-1-layer-1-side': 3.76e10,
    'dvd-2-layer-1-side': 7.12e10,
    'dvd-1-layer-2-side': 7.52e10,
    'dvd-2-layer-2-side': 1.424e11,
};

const unitLabels = {
    bit: "bit [b]",
    nibble: "nibble",
    byte: "byte [B]",
    character: "character",
    word: "word",
    'mapm-word': "MAPM-word",
    'quadruple-word': "quadruple-word",
    block: "block",
    kilobit: "kilobit [kb]",
    kilobyte: "kilobyte [kB]",
    'kilobyte-103-bytes': "kilobyte (10³ bytes)",
    megabit: "megabit [Mb]",
    megabyte: "megabyte [MB]",
    'megabyte-106-bytes': "megabyte (10⁶ bytes)",
    gigabit: "gigabit [Gb]",
    gigabyte: "gigabyte [GB]",
    'gigabyte-109-bytes': "gigabyte (10⁹ bytes)",
    terabit: "terabit [Tb]",
    terabyte: "terabyte [TB]",
    'terabyte-1012-bytes': "terabyte (10¹² bytes)",
    petabit: "petabit [Pb]",
    petabyte: "petabyte [PB]",
    'petabyte-1015-bytes': "petabyte (10¹⁵ bytes)",
    exabit: "exabit [Eb]",
    exabyte: "exabyte [EB]",
    'exabyte-1018-bytes': "exabyte (10¹⁸ bytes)",
    'floppy-disk-3-5-dd': "floppy disk (3.5\", DD)",
    'floppy-disk-3-5-hd': "floppy disk (3.5\", HD)",
    'floppy-disk-3-5-ed': "floppy disk (3.5\", ED)",
    'floppy-disk-5-25-dd': "floppy disk (5.25\", DD)",
    'floppy-disk-5-25-hd': "floppy disk (5.25\", HD)",
    'zip-100': "Zip 100",
    'zip-250': "Zip 250",
    'jaz-1gb': "Jaz 1GB",
    'jaz-2gb': "Jaz 2GB",
    'cd-74-minute': "CD (74 minute)",
    'cd-80-minute': "CD (80 minute)",
    'dvd-1-layer-1-side': "DVD (1 layer, 1 side)",
    'dvd-2-layer-1-side': "DVD (2 layer, 1 side)",
    'dvd-1-layer-2-side': "DVD (1 layer, 2 side)",
    'dvd-2-layer-2-side': "DVD (2 layer, 2 side)",
};

const unitCategories = {
    common: {
        name: "Common Units",
        units: ["bit", "byte", "kilobyte", "megabyte", "gigabyte", "terabyte"],
    },
    standard: {
        name: "Standard Units",
        units: ["bit", "nibble", "byte", "character", "word", "mapm-word", "quadruple-word", "block", "kilobit", "kilobyte", "kilobyte-103-bytes", "megabit", "megabyte", "megabyte-106-bytes", "gigabit", "gigabyte", "gigabyte-109-bytes", "terabit", "terabyte", "terabyte-1012-bytes", "petabit", "petabyte", "petabyte-1015-bytes", "exabit", "exabyte", "exabyte-1018-bytes"],
    },
    storage: {
        name: "Storage Devices",
        units: ["floppy-disk-3-5-dd", "floppy-disk-3-5-hd", "floppy-disk-3-5-ed", "floppy-disk-5-25-dd", "floppy-disk-5-25-hd", "zip-100", "zip-250", "jaz-1gb", "jaz-2gb", "cd-74-minute", "cd-80-minute", "dvd-1-layer-1-side", "dvd-2-layer-1-side", "dvd-1-layer-2-side", "dvd-2-layer-2-side"],
    },
};

type DataStorageUnit = keyof typeof conversionFactors;

export default function DataStorageConverter() {
    const [inputValue, setInputValue] = useState('');
    const [fromUnit, setFromUnit] = useState<DataStorageUnit>('megabyte');
    const [toUnit, setToUnit] = useState<DataStorageUnit>('gigabyte');
    const [result, setResult] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [swapAnimation, setSwapAnimation] = useState(false);
    const [fromUnitOpen, setFromUnitOpen] = useState(false);
    const [toUnitOpen, setToUnitOpen] = useState(false);

    useEffect(() => {
        convertDataStorage();
    }, [inputValue, fromUnit, toUnit]);

    const convertDataStorage = () => {
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
        const inBits = value * conversionFactors[fromUnit];
        const converted = inBits / conversionFactors[toUnit];
        const roundedResult = formatResult(converted);
        setResult(roundedResult);
    };

    const formatResult = (num: number): string => {
        if (Math.abs(num) < 0.0001 && num !== 0) {
            return num.toExponential(6);
        } else if (Math.abs(num) < 0.01 && num !== 0) {
            return num.toFixed(6);
        } else if (Math.abs(num) < 1 && num !== 0) {
            return num.toFixed(4);
        } else if (Math.abs(num) < 100) {
            return num.toFixed(2);
        } else if (Math.abs(num) < 10000) {
            return num.toFixed(1);
        } else {
            return num.toPrecision(8);
        }
    };

    const swapUnits = () => {
        setSwapAnimation(true);
        const temp = fromUnit;
        setFromUnit(toUnit);
        setToUnit(temp);
        setTimeout(() => setSwapAnimation(false), 500);
    };

    const resetConverter = () => {
        setInputValue('');
        setFromUnit('megabyte');
        setToUnit('gigabyte');
        setResult('');
        setError(null);
    };

    return (
        <Card className="w-full max-w-4xl mx-auto shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-blue-950/30 dark:to-purple-950/30 rounded-2xl">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-t-2xl">
                <div className="flex items-center gap-4">
                    <div className="p-3 bg-white/20 rounded-xl">
                        <HardDrive className="h-8 w-8" />
                    </div>
                    <div>
                        <CardTitle className="text-3xl font-bold">Data Storage Converter</CardTitle>
                        <CardDescription className="text-blue-100">
                            Convert between various units of digital data storage
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>

            <CardContent className="p-8">
                <div className="space-y-8">
                    <div className="grid gap-8 lg:grid-cols-5">
                        <div className="lg:col-span-2">
                            <label htmlFor="data-value" className="block text-sm font-semibold mb-3 text-foreground">
                                Enter Value
                            </label>
                            <Input
                                id="data-value"
                                type="number"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder="Enter value"
                                className="h-12 text-lg font-medium border-2 focus:border-primary transition-colors rounded-xl shadow-sm"
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
                                                            .filter(unit => unitLabels[unit as DataStorageUnit])
                                                            .map((unit) => (
                                                                <CommandItem
                                                                    key={unit}
                                                                    value={`${unit} ${unitLabels[unit as DataStorageUnit]}`}
                                                                    onSelect={() => {
                                                                        setFromUnit(unit as DataStorageUnit);
                                                                        setFromUnitOpen(false);
                                                                    }}
                                                                >
                                                                    {unitLabels[unit as DataStorageUnit]}
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
                                                            .filter(unit => unitLabels[unit as DataStorageUnit])
                                                            .map((unit) => (
                                                                <CommandItem
                                                                    key={unit}
                                                                    value={`${unit} ${unitLabels[unit as DataStorageUnit]}`}
                                                                    onSelect={() => {
                                                                        setToUnit(unit as DataStorageUnit);
                                                                        setToUnitOpen(false);
                                                                    }}
                                                                >
                                                                    {unitLabels[unit as DataStorageUnit]}
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

                    <div className="bg-gradient-to-r from-green-50 via-blue-50 to-purple-50 dark:from-green-950/20 dark:via-blue-950/20 dark:to-purple-950/20 p-6 rounded-2xl border-2 border-green-200/50 dark:border-green-800/50 shadow-inner">
                        <h3 className="text-sm font-semibold text-green-700 dark:text-green-300 mb-3 uppercase tracking-wide">Conversion Result</h3>
                        <div className="flex items-center justify-between">
                            <div className="text-4xl font-bold">
                                {result ? (
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2">
                                        <span className="text-green-600 dark:text-green-400">{result}</span>
                                        <span className="text-lg font-normal text-muted-foreground">
                                            {unitLabels[toUnit]?.split(' ')[1]?.replace(/[\[\]]/g, '') || unitLabels[toUnit]}
                                        </span>
                                    </div>
                                ) : (
                                    <span className="text-muted-foreground text-xl italic">Enter a value to see the conversion</span>
                                )}
                            </div>
                        </div>
                    </div>

                    {error && (
                        <Alert variant="destructive">
                            <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}

                    {result && !error && (
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
                                        <strong>Conversion Factor:</strong> 1 {unitLabels[fromUnit]?.split(' ')[0]} = {(conversionFactors[fromUnit] / conversionFactors[toUnit]).toPrecision(6)} {unitLabels[toUnit]?.split(' ')[0]}
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
                >
                    <RotateCcw className="h-4 w-4" /> Reset Converter
                </Button>
                
                <div className="text-sm text-center sm:text-right text-muted-foreground">
                    <div className="font-medium">Convert between 40+ data storage units</div>
                    <div className="text-xs mt-1">Includes standard units and storage device capacities</div>
                </div>
            </CardFooter>
        </Card>
    );
}
