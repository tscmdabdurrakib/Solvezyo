import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Ruler, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ArmyBodyFatCalculator Component
 * 
 * Calculate body fat percentage using official U.S. Army method
 */
export function ArmyBodyFatCalculator() {
  const { toast } = useToast();

  const [gender, setGender] = useState<string>('male');
  const [age, setAge] = useState<number>(25);
  const [height, setHeight] = useState<number>(70);
  const [neck, setNeck] = useState<number>(15);
  const [waist, setWaist] = useState<number>(32);
  const [hip, setHip] = useState<number>(38);
  
  const [bodyFat, setBodyFat] = useState<number>(0);
  const [status, setStatus] = useState<string>('');
  const [maxAllowed, setMaxAllowed] = useState<number>(0);
  const [statusColor, setStatusColor] = useState<string>('green');

  useEffect(() => {
    calculateBodyFat();
  }, [gender, age, height, neck, waist, hip]);

  const calculateBodyFat = () => {
    let bodyFatPercentage: number;

    if (gender === 'male') {
      // Army Formula for Men: 86.010 * log10(waist - neck) - 70.041 * log10(height) + 36.76
      bodyFatPercentage = 86.010 * Math.log10(waist - neck) - 70.041 * Math.log10(height) + 36.76;
    } else {
      // Army Formula for Women: 163.205 * log10(waist + hip - neck) - 97.684 * log10(height) - 78.387
      bodyFatPercentage = 163.205 * Math.log10(waist + hip - neck) - 97.684 * Math.log10(height) - 78.387;
    }

    setBodyFat(bodyFatPercentage);

    // Determine max allowed based on age and gender
    let max: number;
    if (gender === 'male') {
      if (age <= 20) max = 20;
      else if (age <= 27) max = 22;
      else if (age <= 39) max = 24;
      else max = 26;
    } else {
      if (age <= 20) max = 30;
      else if (age <= 27) max = 32;
      else if (age <= 39) max = 34;
      else max = 36;
    }

    setMaxAllowed(max);

    // Determine status
    if (bodyFatPercentage <= max) {
      setStatus('Passing');
      setStatusColor('green');
    } else if (bodyFatPercentage <= max + 2) {
      setStatus('Warning');
      setStatusColor('orange');
    } else {
      setStatus('Exceeds Standard');
      setStatusColor('red');
    }
  };

  const handleReset = () => {
    setGender('male');
    setAge(25);
    setHeight(70);
    setNeck(15);
    setWaist(32);
    setHip(38);
  };

  const copyToClipboard = () => {
    const result = `Army Body Fat Calculation:
Gender: ${gender}
Age: ${age}
Height: ${height} inches
Neck: ${neck} inches
Waist: ${waist} inches
${gender === 'female' ? `Hip: ${hip} inches\n` : ''}
Body Fat: ${bodyFat.toFixed(1)}%
Max Allowed: ${maxAllowed}%
Status: ${status}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Army Body Fat Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate body fat percentage using official U.S. Army standards
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <User className="mr-2 h-5 w-5" /> Measurements (Inches)
          </h2>
          
          <div className="space-y-6">
            <div>
              <Label htmlFor="gender">Gender</Label>
              <Select value={gender} onValueChange={setGender}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="age">Age (years)</Label>
              <Input
                id="age"
                type="number"
                className="mt-1.5"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[age]}
                min={17}
                max={65}
                step={1}
                onValueChange={(values) => setAge(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="height">Height (inches)</Label>
              <Input
                id="height"
                type="number"
                step="0.5"
                className="mt-1.5"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[height]}
                min={58}
                max={80}
                step={0.5}
                onValueChange={(values) => setHeight(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="neck">Neck (inches)</Label>
              <Input
                id="neck"
                type="number"
                step="0.5"
                className="mt-1.5"
                value={neck}
                onChange={(e) => setNeck(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[neck]}
                min={10}
                max={25}
                step={0.5}
                onValueChange={(values) => setNeck(values[0])}
              />
            </div>

            <div>
              <Label htmlFor="waist">Waist (inches)</Label>
              <Input
                id="waist"
                type="number"
                step="0.5"
                className="mt-1.5"
                value={waist}
                onChange={(e) => setWaist(Number(e.target.value))}
              />
              <Slider
                className="mt-2"
                value={[waist]}
                min={20}
                max={60}
                step={0.5}
                onValueChange={(values) => setWaist(values[0])}
              />
            </div>

            {gender === 'female' && (
              <div>
                <Label htmlFor="hip">Hip (inches)</Label>
                <Input
                  id="hip"
                  type="number"
                  step="0.5"
                  className="mt-1.5"
                  value={hip}
                  onChange={(e) => setHip(Number(e.target.value))}
                />
                <Slider
                  className="mt-2"
                  value={[hip]}
                  min={25}
                  max={60}
                  step={0.5}
                  onValueChange={(values) => setHip(values[0])}
                />
              </div>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

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
                  <h2 className="text-xl font-semibold">Results</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 flex items-center">
                      <Shield className="mr-2 h-4 w-4" />
                      Body Fat Percentage
                    </h3>
                    <div className="mt-2 text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {bodyFat.toFixed(1)}%
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Maximum Allowed</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {maxAllowed}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      For {gender}, age {age}
                    </p>
                  </div>

                  <div className={`p-4 rounded-lg border ${
                    statusColor === 'green' 
                      ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800'
                      : statusColor === 'orange'
                      ? 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800'
                      : 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800'
                  }`}>
                    <h3 className="text-sm font-medium">Status</h3>
                    <div className={`mt-1 text-2xl font-bold ${
                      statusColor === 'green' 
                        ? 'text-green-600 dark:text-green-400'
                        : statusColor === 'orange'
                        ? 'text-orange-600 dark:text-orange-400'
                        : 'text-red-600 dark:text-red-400'
                    }`}>
                      {status}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Army Standards</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="font-medium">Male:</p>
              <p>• Age 17-20: Max 20%</p>
              <p>• Age 21-27: Max 22%</p>
              <p>• Age 28-39: Max 24%</p>
              <p>• Age 40+: Max 26%</p>
              <p className="font-medium mt-2">Female:</p>
              <p>• Age 17-20: Max 30%</p>
              <p>• Age 21-27: Max 32%</p>
              <p>• Age 28-39: Max 34%</p>
              <p>• Age 40+: Max 36%</p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ArmyBodyFatCalculator;
