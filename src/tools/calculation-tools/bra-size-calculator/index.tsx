import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Ruler, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BraSizeCalculator Component
 * 
 * Calculate bra size based on measurements
 */
export function BraSizeCalculator() {
  const { toast } = useToast();

  // State for input values
  const [bandMeasurement, setBandMeasurement] = useState<number>(34);
  const [bustMeasurement, setBustMeasurement] = useState<number>(38);
  const [unit, setUnit] = useState<string>('inches');
  
  // State for calculated results
  const [bandSize, setBandSize] = useState<number>(0);
  const [cupSize, setCupSize] = useState<string>('');
  const [braSizeUS, setBraSizeUS] = useState<string>('');
  const [braSizeUK, setBraSizeUK] = useState<string>('');
  const [braSizeEU, setBraSizeEU] = useState<string>('');
  const [sisterSizes, setSisterSizes] = useState<string[]>([]);

  // Calculate bra size when inputs change
  useEffect(() => {
    calculateBraSize();
  }, [bandMeasurement, bustMeasurement, unit]);

  // Cup size mapping (difference in inches)
  const cupSizeMap: { [key: number]: string } = {
    0: 'AA',
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'DD/E',
    6: 'DDD/F',
    7: 'G',
    8: 'H',
    9: 'I',
    10: 'J',
    11: 'K',
    12: 'L',
  };

  // UK cup size mapping
  const cupSizeMapUK: { [key: number]: string } = {
    0: 'AA',
    1: 'A',
    2: 'B',
    3: 'C',
    4: 'D',
    5: 'DD',
    6: 'E',
    7: 'F',
    8: 'FF',
    9: 'G',
    10: 'GG',
    11: 'H',
    12: 'HH',
  };

  // Function to calculate bra size
  const calculateBraSize = () => {
    // Convert to inches if in cm
    let bandInInches = unit === 'cm' ? bandMeasurement / 2.54 : bandMeasurement;
    let bustInInches = unit === 'cm' ? bustMeasurement / 2.54 : bustMeasurement;

    // Round band measurement to even number
    let band = Math.round(bandInInches);
    
    // If odd, add 1 to make it even
    if (band % 2 !== 0) {
      band += 1;
    }

    // If the band measurement is less than 33 inches, add 4; otherwise, add 0
    const bandAdjustment = band < 33 ? 5 : 0;
    const calculatedBandSize = band + bandAdjustment;

    setBandSize(calculatedBandSize);

    // Calculate cup size (difference between bust and band)
    const difference = Math.round(bustInInches - calculatedBandSize);
    const cupIndex = Math.max(0, Math.min(difference, 12));
    
    const cup = cupSizeMap[cupIndex] || 'Out of range';
    const cupUK = cupSizeMapUK[cupIndex] || 'Out of range';
    setCupSize(cup);

    // US Size
    const usSize = `${calculatedBandSize}${cup}`;
    setBraSizeUS(usSize);

    // UK Size (band size is usually the same, cup might differ)
    const ukSize = `${calculatedBandSize}${cupUK}`;
    setBraSizeUK(ukSize);

    // EU Size (band size differs by ~15-20)
    const euBandSize = calculatedBandSize + 15;
    const euSize = `${euBandSize}${cup}`;
    setBraSizeEU(euSize);

    // Calculate sister sizes (one size up band, one cup down & vice versa)
    const sisterSizeUp = cupIndex > 0 ? `${calculatedBandSize + 2}${cupSizeMap[cupIndex - 1]}` : '';
    const sisterSizeDown = cupIndex < 12 ? `${calculatedBandSize - 2}${cupSizeMap[cupIndex + 1]}` : '';
    
    const sisters = [sisterSizeDown, sisterSizeUp].filter(s => s !== '');
    setSisterSizes(sisters);
  };

  // Function to reset all values
  const handleReset = () => {
    setBandMeasurement(34);
    setBustMeasurement(38);
    setUnit('inches');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Bra Size Calculation:
Band Measurement: ${bandMeasurement} ${unit}
Bust Measurement: ${bustMeasurement} ${unit}
US Size: ${braSizeUS}
UK Size: ${braSizeUK}
EU Size: ${braSizeEU}
Sister Sizes: ${sisterSizes.join(', ')}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Bra size results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Bra Size Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Find your perfect bra size based on your measurements
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Ruler className="mr-2 h-5 w-5" /> Your Measurements
          </h2>
          
          <div className="space-y-6">
            {/* Unit Selection */}
            <div>
              <Label htmlFor="unit">Measurement Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="cm">Centimeters</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Band Measurement */}
            <div>
              <Label htmlFor="bandMeasurement">
                Band Measurement ({unit})
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Measure around your ribcage, just under your bust
              </p>
              <div className="relative mt-1.5">
                <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="bandMeasurement"
                  type="number"
                  step="0.5"
                  className="pl-10"
                  value={bandMeasurement}
                  onChange={(e) => setBandMeasurement(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Bust Measurement */}
            <div>
              <Label htmlFor="bustMeasurement">
                Bust Measurement ({unit})
              </Label>
              <p className="text-xs text-muted-foreground mt-1">
                Measure around the fullest part of your bust
              </p>
              <div className="relative mt-1.5">
                <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="bustMeasurement"
                  type="number"
                  step="0.5"
                  className="pl-10"
                  value={bustMeasurement}
                  onChange={(e) => setBustMeasurement(Number(e.target.value))}
                />
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Your Bra Size</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950 p-4 rounded-lg border border-pink-200 dark:border-pink-800">
                    <h3 className="text-sm font-medium text-pink-800 dark:text-pink-200">
                      US Size
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-pink-600 dark:text-pink-400">
                      {braSizeUS}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">UK Size</h3>
                      <div className="mt-1 text-2xl font-bold">{braSizeUK}</div>
                    </div>
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">EU Size</h3>
                      <div className="mt-1 text-2xl font-bold">{braSizeEU}</div>
                    </div>
                  </div>

                  <div className="bg-purple-50 dark:bg-purple-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Band & Cup Details
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Band Size:</span>
                        <span className="font-bold">{bandSize}"</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Cup Size:</span>
                        <span className="font-bold">{cupSize}</span>
                      </div>
                    </div>
                  </div>

                  {sisterSizes.length > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                        Sister Sizes
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {sisterSizes.map((size, index) => (
                          <span key={index} className="px-3 py-1 bg-white dark:bg-gray-800 rounded-full text-sm font-bold border border-blue-200 dark:border-blue-700">
                            {size}
                          </span>
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Sister sizes fit the same cup volume with different band sizes
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Measurement Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Measure while wearing a non-padded bra for accuracy
              </p>
              <p>
                • Keep the tape measure parallel to the ground
              </p>
              <p>
                • Don't pull the tape too tight or too loose
              </p>
              <p>
                • Sister sizes offer alternative fits with the same cup volume
              </p>
              <p>
                • Sizes can vary between brands - try before buying
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BraSizeCalculator;
