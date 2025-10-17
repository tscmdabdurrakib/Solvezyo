import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, User, Ruler } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BodyTypeCalculator Component
 * 
 * Calculate body type (ectomorph, mesomorph, endomorph) based on measurements
 */
export function BodyTypeCalculator() {
  const { toast } = useToast();

  // State for input values
  const [gender, setGender] = useState<string>('male');
  const [wrist, setWrist] = useState<number>(17);
  const [ankle, setAnkle] = useState<number>(22);
  const [height, setHeight] = useState<number>(175);
  const [unit, setUnit] = useState<string>('metric');
  
  // State for calculated results
  const [bodyType, setBodyType] = useState<string>('');
  const [bodyTypeColor, setBodyTypeColor] = useState<string>('');
  const [wristRatio, setWristRatio] = useState<number>(0);
  const [ankleRatio, setAnkleRatio] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [characteristics, setCharacteristics] = useState<string[]>([]);

  // Calculate body type when inputs change
  useEffect(() => {
    calculateBodyType();
  }, [gender, wrist, ankle, height, unit]);

  // Function to get body type characteristics
  const getBodyTypeInfo = (type: string): { color: string; description: string; characteristics: string[] } => {
    switch (type) {
      case 'Ectomorph':
        return {
          color: 'blue',
          description: 'Naturally lean with a fast metabolism',
          characteristics: [
            'Narrow shoulders and hips',
            'Thin build with long limbs',
            'Fast metabolism',
            'Difficulty gaining weight',
            'Low body fat naturally'
          ]
        };
      case 'Mesomorph':
        return {
          color: 'green',
          description: 'Athletic build with good muscle definition',
          characteristics: [
            'Broad shoulders',
            'Athletic build',
            'Gains muscle easily',
            'Moderate metabolism',
            'Responds well to training'
          ]
        };
      case 'Endomorph':
        return {
          color: 'orange',
          description: 'Larger build with tendency to store fat',
          characteristics: [
            'Wider hips',
            'Stockier build',
            'Gains weight easily',
            'Slower metabolism',
            'Holds muscle and fat'
          ]
        };
      default:
        return {
          color: 'gray',
          description: 'Enter measurements to calculate',
          characteristics: []
        };
    }
  };

  // Function to calculate body type
  const calculateBodyType = () => {
    // Convert to metric if needed
    let heightCm = height;
    let wristCm = wrist;
    let ankleCm = ankle;

    if (unit === 'imperial') {
      heightCm = height * 2.54; // inches to cm
      wristCm = wrist * 2.54;
      ankleCm = ankle * 2.54;
    }

    // Calculate ratios
    const wristToHeight = (wristCm / heightCm) * 100;
    const ankleToHeight = (ankleCm / heightCm) * 100;

    setWristRatio(wristToHeight);
    setAnkleRatio(ankleToHeight);

    // Determine body type based on wrist-to-height ratio
    // These are approximate thresholds
    let type: string;
    
    if (gender === 'male') {
      if (wristToHeight < 10.4) {
        type = 'Ectomorph';
      } else if (wristToHeight < 11.0) {
        type = 'Mesomorph';
      } else {
        type = 'Endomorph';
      }
    } else {
      if (wristToHeight < 9.9) {
        type = 'Ectomorph';
      } else if (wristToHeight < 10.4) {
        type = 'Mesomorph';
      } else {
        type = 'Endomorph';
      }
    }

    const info = getBodyTypeInfo(type);
    setBodyType(type);
    setBodyTypeColor(info.color);
    setDescription(info.description);
    setCharacteristics(info.characteristics);
  };

  // Function to reset all values
  const handleReset = () => {
    setGender('male');
    setWrist(17);
    setAnkle(22);
    setHeight(175);
    setUnit('metric');
  };

  // Get body type background color classes
  const getBodyTypeColorClasses = () => {
    switch (bodyTypeColor) {
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      case 'green':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200';
      default:
        return 'bg-muted/50';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const unitLabel = unit === 'metric' ? 'cm' : 'inches';
    const result = `Body Type Analysis:
Gender: ${gender}
Height: ${height} ${unitLabel}
Wrist: ${wrist} ${unitLabel}
Ankle: ${ankle} ${unitLabel}

Body Type: ${bodyType}
Description: ${description}

Wrist-to-Height Ratio: ${wristRatio.toFixed(2)}%
Ankle-to-Height Ratio: ${ankleRatio.toFixed(2)}%

Characteristics:
${characteristics.map(c => `• ${c}`).join('\n')}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Body type analysis copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Body Type Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Determine your body type (somatotype) based on bone structure measurements
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
              <Label htmlFor="unit">Unit System</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="metric">Metric (cm)</SelectItem>
                  <SelectItem value="imperial">Imperial (inches)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Gender */}
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

            {/* Height */}
            <div>
              <Label htmlFor="height">
                Height ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <div className="relative mt-1.5">
                <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="height"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={height}
                  onChange={(e) => setHeight(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Wrist */}
            <div>
              <Label htmlFor="wrist">
                Wrist Circumference ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <div className="relative mt-1.5">
                <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="wrist"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={wrist}
                  onChange={(e) => setWrist(Number(e.target.value))}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Measure around the thinnest part of your wrist
              </p>
            </div>

            {/* Ankle */}
            <div>
              <Label htmlFor="ankle">
                Ankle Circumference ({unit === 'metric' ? 'cm' : 'inches'})
              </Label>
              <div className="relative mt-1.5">
                <Ruler className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="ankle"
                  type="number"
                  step="0.1"
                  className="pl-10"
                  value={ankle}
                  onChange={(e) => setAnkle(Number(e.target.value))}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Measure around the thinnest part of your ankle
              </p>
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
                  <h2 className="text-xl font-semibold">Your Body Type</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className={`p-4 rounded-lg border ${getBodyTypeColorClasses()}`}>
                    <h3 className="text-sm font-medium">Body Type (Somatotype)</h3>
                    <div className="mt-2 text-4xl font-bold">
                      {bodyType || 'Calculating...'}
                    </div>
                    <p className="text-sm mt-2">
                      {description}
                    </p>
                  </div>
                  
                  {characteristics.length > 0 && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Typical Characteristics
                      </h3>
                      <ul className="space-y-2 text-sm">
                        {characteristics.map((char, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-primary mr-2">•</span>
                            <span>{char}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Body Ratios
                    </h3>
                    <div className="space-y-1 text-sm text-purple-700 dark:text-purple-300">
                      <div className="flex justify-between">
                        <span>Wrist-to-Height:</span>
                        <span className="font-semibold">{wristRatio.toFixed(2)}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Ankle-to-Height:</span>
                        <span className="font-semibold">{ankleRatio.toFixed(2)}%</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Body Types</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • <strong>Ectomorph:</strong> Lean, long, difficulty building muscle
              </p>
              <p>
                • <strong>Mesomorph:</strong> Muscular, well-built, gains muscle easily
              </p>
              <p>
                • <strong>Endomorph:</strong> Bigger, high body fat, gains weight easily
              </p>
              <p>
                • Most people are a combination of types
              </p>
              <p>
                • Body type is determined by bone structure, not current weight
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default BodyTypeCalculator;
