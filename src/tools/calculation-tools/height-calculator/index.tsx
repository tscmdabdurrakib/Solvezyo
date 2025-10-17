import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Ruler } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

/**
 * HeightCalculator Component
 * 
 * Converts height between different units and formats
 */
export function HeightCalculator() {
  const [inputUnit, setInputUnit] = useState<string>('feet-inches');
  const [feet, setFeet] = useState<number>(5);
  const [inches, setInches] = useState<number>(10);
  const [centimeters, setCentimeters] = useState<number>(178);
  const [meters, setMeters] = useState<number>(0);
  const [totalInches, setTotalInches] = useState<number>(0);
  const { toast } = useToast();

  // Convert height when inputs change
  useEffect(() => {
    convertHeight();
  }, [inputUnit, feet, inches, centimeters]);

  // Function to convert height between units
  const convertHeight = () => {
    let cm = 0;

    if (inputUnit === 'feet-inches') {
      // Convert feet and inches to centimeters
      const totalIn = feet * 12 + inches;
      cm = totalIn * 2.54;
      setTotalInches(totalIn);
    } else if (inputUnit === 'centimeters') {
      // Use centimeters directly
      cm = centimeters;
      const totalIn = cm / 2.54;
      const ft = Math.floor(totalIn / 12);
      const in_ = Math.round(totalIn % 12);
      setFeet(ft);
      setInches(in_);
      setTotalInches(totalIn);
    }

    // Set all conversions
    setCentimeters(cm);
    setMeters(cm / 100);
  };

  // Function to copy result to clipboard
  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  // Function to reset values
  const handleReset = () => {
    setInputUnit('feet-inches');
    setFeet(5);
    setInches(10);
    setCentimeters(178);
  };

  // Get height category
  const getHeightCategory = (cm: number): string => {
    if (cm < 150) return 'Very Short';
    if (cm < 160) return 'Short';
    if (cm < 170) return 'Below Average';
    if (cm < 180) return 'Average';
    if (cm < 190) return 'Above Average';
    if (cm < 200) return 'Tall';
    return 'Very Tall';
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Height Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Convert height between feet/inches, centimeters, and meters
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Ruler className="mr-2 h-5 w-5" /> Enter Height
          </h2>
          
          <div className="space-y-4">
            {/* Input Unit Selection */}
            <div>
              <Label htmlFor="inputUnit">Input Unit</Label>
              <Select value={inputUnit} onValueChange={setInputUnit}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feet-inches">Feet & Inches</SelectItem>
                  <SelectItem value="centimeters">Centimeters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Feet and Inches Input */}
            {inputUnit === 'feet-inches' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="feet">Feet</Label>
                  <Input
                    id="feet"
                    type="number"
                    min="0"
                    max="10"
                    className="mt-2"
                    value={feet}
                    onChange={(e) => setFeet(Number(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="inches">Inches</Label>
                  <Input
                    id="inches"
                    type="number"
                    min="0"
                    max="11"
                    step="0.1"
                    className="mt-2"
                    value={inches}
                    onChange={(e) => setInches(Number(e.target.value))}
                  />
                </div>
              </div>
            )}

            {/* Centimeters Input */}
            {inputUnit === 'centimeters' && (
              <div>
                <Label htmlFor="centimeters">Centimeters</Label>
                <Input
                  id="centimeters"
                  type="number"
                  min="0"
                  max="300"
                  step="0.1"
                  className="mt-2"
                  value={centimeters}
                  onChange={(e) => setCentimeters(Number(e.target.value))}
                />
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Conversions</h2>
            
            <div className="space-y-4">
              {/* Feet and Inches */}
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Feet & Inches</h3>
                    <div className="text-4xl font-bold">
                      {feet}' {inches.toFixed(1)}"
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {getHeightCategory(centimeters)}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${feet}' ${inches.toFixed(1)}"`, 'Height (ft/in)')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="grid gap-4 md:grid-cols-3">
                {/* Centimeters */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Centimeters</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {centimeters.toFixed(1)} cm
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(centimeters.toFixed(1), 'Centimeters')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Meters */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Meters</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {meters.toFixed(2)} m
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(meters.toFixed(2), 'Meters')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Total Inches */}
                <div className="bg-muted/50 p-4 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground">Total Inches</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {totalInches.toFixed(1)} in
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(totalInches.toFixed(1), 'Total Inches')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Height Reference Chart */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Height Categories (Adults)</h2>
          
          <div className="grid gap-3 md:grid-cols-2">
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="font-medium text-lg mb-2">Males</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Short:</span>
                  <span className="font-medium">&lt; 5'7" (170 cm)</span>
                </div>
                <div className="flex justify-between">
                  <span>Average:</span>
                  <span className="font-medium">5'7" - 5'11" (170-180 cm)</span>
                </div>
                <div className="flex justify-between">
                  <span>Tall:</span>
                  <span className="font-medium">&gt; 5'11" (180 cm)</span>
                </div>
              </div>
            </div>
            
            <div className="bg-muted/30 p-4 rounded-lg">
              <div className="font-medium text-lg mb-2">Females</div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Short:</span>
                  <span className="font-medium">&lt; 5'2" (157 cm)</span>
                </div>
                <div className="flex justify-between">
                  <span>Average:</span>
                  <span className="font-medium">5'2" - 5'6" (157-168 cm)</span>
                </div>
                <div className="flex justify-between">
                  <span>Tall:</span>
                  <span className="font-medium">&gt; 5'6" (168 cm)</span>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Conversion Reference</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Imperial System</h3>
              <p className="text-muted-foreground text-sm">
                The imperial system uses feet and inches. 1 foot = 12 inches. Common in the United States.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Metric System</h3>
              <p className="text-muted-foreground text-sm">
                The metric system uses centimeters and meters. 1 meter = 100 centimeters. Used worldwide.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Conversion Formula</h3>
              <p className="text-muted-foreground text-sm">
                1 inch = 2.54 cm<br/>
                1 foot = 30.48 cm<br/>
                1 meter = 3.28 feet
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default HeightCalculator;
