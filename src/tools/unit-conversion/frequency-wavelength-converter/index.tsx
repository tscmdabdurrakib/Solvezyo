import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Radio, ArrowRightLeft, RotateCcw, Info } from "lucide-react";
import { motion } from "framer-motion";
import { Alert, AlertDescription } from "@/components/ui/alert";

// Speed of light in various units
const SPEED_OF_LIGHT = {
  m_s: 299792458, // meters per second
  cm_s: 29979245800, // centimeters per second
  mm_s: 299792458000, // millimeters per second
  km_s: 299792.458, // kilometers per second
};

// Frequency units (to Hz as base unit)
const frequencyFactors = {
  Hz: 1,
  kHz: 1000,
  MHz: 1000000,
  GHz: 1000000000,
  THz: 1000000000000,
};

// Wavelength units (to meters as base unit)
const wavelengthFactors = {
  m: 1,
  cm: 0.01,
  mm: 0.001,
  km: 1000,
  nm: 1e-9,
  μm: 1e-6,
  pm: 1e-12,
  Å: 1e-10, // Angstrom
};

// Unit display names
const frequencyLabels = {
  Hz: "Hertz (Hz)",
  kHz: "Kilohertz (kHz)",
  MHz: "Megahertz (MHz)",
  GHz: "Gigahertz (GHz)",
  THz: "Terahertz (THz)",
};

const wavelengthLabels = {
  m: "Meter (m)",
  cm: "Centimeter (cm)",
  mm: "Millimeter (mm)",
  km: "Kilometer (km)",
  nm: "Nanometer (nm)",
  μm: "Micrometer (μm)",
  pm: "Picometer (pm)",
  Å: "Angstrom (Å)",
};

type FrequencyUnit = keyof typeof frequencyFactors;
type WavelengthUnit = keyof typeof wavelengthFactors;

/**
 * Frequency Wavelength Converter Component
 * Converts between frequency and wavelength using c = f × λ
 */
export default function FrequencyWavelengthConverter() {
  // State for input value, units, and conversion type
  const [inputValue, setInputValue] = useState<string>('');
  const [inputType, setInputType] = useState<'frequency' | 'wavelength'>('frequency');
  const [frequencyUnit, setFrequencyUnit] = useState<FrequencyUnit>('MHz');
  const [wavelengthUnit, setWavelengthUnit] = useState<WavelengthUnit>('m');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);
  const [swapAnimation, setSwapAnimation] = useState(false);

  // Perform the conversion whenever inputs change
  useEffect(() => {
    convertFrequencyWavelength();
  }, [inputValue, inputType, frequencyUnit, wavelengthUnit]);

  /**
   * Convert between frequency and wavelength using c = f × λ
   */
  const convertFrequencyWavelength = () => {
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

    if (value <= 0) {
      setError('Frequency and wavelength values must be positive');
      setResult('');
      return;
    }

    try {
      let converted: number;

      if (inputType === 'frequency') {
        // Converting frequency to wavelength
        // λ = c / f
        const frequencyInHz = value * frequencyFactors[frequencyUnit];
        const wavelengthInM = SPEED_OF_LIGHT.m_s / frequencyInHz;
        converted = wavelengthInM / wavelengthFactors[wavelengthUnit];
      } else {
        // Converting wavelength to frequency
        // f = c / λ
        const wavelengthInM = value * wavelengthFactors[wavelengthUnit];
        const frequencyInHz = SPEED_OF_LIGHT.m_s / wavelengthInM;
        converted = frequencyInHz / frequencyFactors[frequencyUnit];
      }

      // Format the result based on the magnitude for better readability
      const roundedResult = formatResult(converted);
      setResult(roundedResult);
    } catch (error) {
      setError('Error in conversion calculation');
      setResult('');
    }
  };

  /**
   * Format number based on its magnitude
   */
  const formatResult = (num: number): string => {
    if (Math.abs(num) < 1e-10) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.0001) {
      return num.toExponential(6);
    } else if (Math.abs(num) < 0.01) {
      return num.toFixed(8);
    } else if (Math.abs(num) < 1) {
      return num.toFixed(6);
    } else if (Math.abs(num) < 100) {
      return num.toFixed(4);
    } else if (Math.abs(num) < 10000) {
      return num.toFixed(2);
    } else if (Math.abs(num) > 1e6) {
      return num.toExponential(6);
    } else {
      return num.toFixed(0);
    }
  };

  /**
   * Swap input and output types
   */
  const swapTypes = () => {
    setSwapAnimation(true);
    setInputType(inputType === 'frequency' ? 'wavelength' : 'frequency');
    
    // Reset animation state after animation completes
    setTimeout(() => setSwapAnimation(false), 500);
  };

  /**
   * Reset all fields to default
   */
  const resetConverter = () => {
    setInputValue('');
    setInputType('frequency');
    setFrequencyUnit('MHz');
    setWavelengthUnit('m');
    setResult('');
    setError(null);
  };

  const currentInputUnit = inputType === 'frequency' ? frequencyUnit : wavelengthUnit;
  const currentInputLabels = inputType === 'frequency' ? frequencyLabels : wavelengthLabels;
  const currentOutputUnit = inputType === 'frequency' ? wavelengthUnit : frequencyUnit;
  const currentOutputLabels = inputType === 'frequency' ? wavelengthLabels : frequencyLabels;

  return (
    <Card className="w-full max-w-3xl mx-auto shadow-lg" data-testid="card-frequency-wavelength-converter">
      <CardHeader className="bg-primary/5 border-b">
        <div className="flex items-center gap-3">
          <Radio className="h-6 w-6 text-primary" />
          <div>
            <CardTitle className="text-2xl">Frequency Wavelength Converter</CardTitle>
            <CardDescription>
              Convert between frequency and wavelength using the speed of light
            </CardDescription>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-6">
        <div className="space-y-6">
          {/* Input value and unit selection */}
          <div className="grid gap-6 sm:grid-cols-5">
            <div className="sm:col-span-2">
              <label htmlFor="input-value" className="block text-sm font-medium mb-2">
                Enter {inputType === 'frequency' ? 'Frequency' : 'Wavelength'}
              </label>
              <Input
                id="input-value"
                data-testid="input-value"
                type="number"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={`Enter ${inputType}`}
                className="w-full"
                min="0"
                step="any"
              />
            </div>
            
            <div className="sm:col-span-3 grid sm:grid-cols-7 gap-3 items-end">
              <div className="sm:col-span-3">
                <label htmlFor="input-unit" className="block text-sm font-medium mb-2">
                  {inputType === 'frequency' ? 'Frequency Unit' : 'Wavelength Unit'}
                </label>
                <Select 
                  value={currentInputUnit} 
                  onValueChange={(value) => {
                    if (inputType === 'frequency') {
                      setFrequencyUnit(value as FrequencyUnit);
                    } else {
                      setWavelengthUnit(value as WavelengthUnit);
                    }
                  }}
                >
                  <SelectTrigger id="input-unit" data-testid="select-input-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currentInputLabels).map(([unit, label]) => (
                      <SelectItem key={unit} value={unit}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex justify-center items-center sm:col-span-1">
                <motion.div
                  animate={{ rotate: swapAnimation ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={swapTypes}
                    className="rounded-full h-10 w-10 bg-muted hover:bg-primary/10"
                    data-testid="button-swap-types"
                  >
                    <ArrowRightLeft className="h-4 w-4" />
                    <span className="sr-only">Swap conversion type</span>
                  </Button>
                </motion.div>
              </div>
              
              <div className="sm:col-span-3">
                <label htmlFor="output-unit" className="block text-sm font-medium mb-2">
                  {inputType === 'frequency' ? 'Wavelength Unit' : 'Frequency Unit'}
                </label>
                <Select 
                  value={currentOutputUnit} 
                  onValueChange={(value) => {
                    if (inputType === 'frequency') {
                      setWavelengthUnit(value as WavelengthUnit);
                    } else {
                      setFrequencyUnit(value as FrequencyUnit);
                    }
                  }}
                >
                  <SelectTrigger id="output-unit" data-testid="select-output-unit">
                    <SelectValue placeholder="Select unit" />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(currentOutputLabels).map(([unit, label]) => (
                      <SelectItem key={unit} value={unit}>
                        {label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Conversion Result */}
          <div className="bg-muted/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-2">
              {inputType === 'frequency' ? 'Wavelength' : 'Frequency'} Result
            </h3>
            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold" data-testid="text-result">
                {result ? (
                  <>
                    {result} <span className="text-lg font-normal">
                      {(currentOutputLabels as Record<string, string>)[currentOutputUnit as string]?.match(/\(([^)]+)\)/)?.[1]}
                    </span>
                  </>
                ) : (
                  <span className="text-muted-foreground text-lg">— Enter a value to convert —</span>
                )}
              </div>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert variant="destructive" data-testid="alert-error">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {/* Formula and Speed of Light Display */}
          {result && (
            <div className="bg-muted/30 p-4 rounded-lg text-sm">
              <div className="flex items-start gap-2">
                <Info className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <span className="font-medium">Formula Used:</span>
                  <p className="font-mono text-sm mt-1">c = f × λ</p>
                  <p className="text-muted-foreground mt-1">
                    Speed of light: {SPEED_OF_LIGHT.m_s.toLocaleString()} m/s
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Where c = speed of light, f = frequency, λ = wavelength
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Electromagnetic Spectrum Info */}
          {result && (
            <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Electromagnetic Spectrum Reference:</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div>Radio: ~3 Hz - 300 GHz</div>
                <div>Microwave: 300 MHz - 300 GHz</div>
                <div>Infrared: 300 GHz - 400 THz</div>
                <div>Visible: 400-790 THz (380-750 nm)</div>
                <div>Ultraviolet: 790 THz - 30 PHz</div>
                <div>X-ray: 30 PHz - 30 EHz</div>
              </div>
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="flex justify-between border-t p-4 bg-muted/10">
        <Button
          variant="outline"
          onClick={resetConverter}
          className="gap-2"
          data-testid="button-reset"
        >
          <RotateCcw className="h-4 w-4" /> Reset
        </Button>
        
        <div className="text-xs text-muted-foreground">
          Using speed of light: 299,792,458 m/s
        </div>
      </CardFooter>
    </Card>
  );
}
