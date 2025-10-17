import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Apple, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * WeightWatcherPointsCalculator Component
 * 
 * Calculate Weight Watchers SmartPoints based on nutritional information
 */
export function WeightWatcherPointsCalculator() {
  const { toast } = useToast();

  // State for input values
  const [calories, setCalories] = useState<number>(250);
  const [protein, setProtein] = useState<number>(10);
  const [saturatedFat, setSaturatedFat] = useState<number>(5);
  const [sugar, setSugar] = useState<number>(10);
  
  // State for calculated results
  const [smartPoints, setSmartPoints] = useState<number>(0);
  const [category, setCategory] = useState<string>('');
  const [categoryColor, setCategoryColor] = useState<string>('');

  // Calculate SmartPoints when inputs change
  useEffect(() => {
    calculateSmartPoints();
  }, [calories, protein, saturatedFat, sugar]);

  // Function to get point category
  const getPointCategory = (points: number): { category: string; color: string } => {
    if (points <= 2) {
      return { category: 'Very Low Points - Excellent Choice', color: 'green' };
    } else if (points <= 5) {
      return { category: 'Low Points - Good Choice', color: 'blue' };
    } else if (points <= 10) {
      return { category: 'Moderate Points', color: 'yellow' };
    } else if (points <= 15) {
      return { category: 'High Points - Enjoy in Moderation', color: 'orange' };
    } else {
      return { category: 'Very High Points - Occasional Treat', color: 'red' };
    }
  };

  // Function to calculate Weight Watchers SmartPoints
  const calculateSmartPoints = () => {
    // SmartPoints formula (approximate):
    // Points = (Calories × 0.0305) + (Saturated Fat × 0.275) + (Sugar × 0.12) - (Protein × 0.098)
    // This is a simplified version of the proprietary formula
    
    const points = Math.max(0, Math.round(
      (calories * 0.0305) + 
      (saturatedFat * 0.275) + 
      (sugar * 0.12) - 
      (protein * 0.098)
    ));

    const { category: cat, color } = getPointCategory(points);
    
    setSmartPoints(points);
    setCategory(cat);
    setCategoryColor(color);
  };

  // Function to reset all values
  const handleReset = () => {
    setCalories(250);
    setProtein(10);
    setSaturatedFat(5);
    setSugar(10);
  };

  // Get category background color classes
  const getCategoryColorClasses = () => {
    switch (categoryColor) {
      case 'green':
        return 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-800 text-green-800 dark:text-green-200';
      case 'blue':
        return 'bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800 text-blue-800 dark:text-blue-200';
      case 'yellow':
        return 'bg-yellow-50 dark:bg-yellow-950 border-yellow-200 dark:border-yellow-800 text-yellow-800 dark:text-yellow-200';
      case 'orange':
        return 'bg-orange-50 dark:bg-orange-950 border-orange-200 dark:border-orange-800 text-orange-800 dark:text-orange-200';
      case 'red':
        return 'bg-red-50 dark:bg-red-950 border-red-200 dark:border-red-800 text-red-800 dark:text-red-200';
      default:
        return 'bg-muted/50';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Weight Watchers SmartPoints:
Calories: ${calories}
Protein: ${protein}g
Saturated Fat: ${saturatedFat}g
Sugar: ${sugar}g

SmartPoints: ${smartPoints}
Category: ${category}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "SmartPoints copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Weight Watcher Points Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate Weight Watchers SmartPoints based on nutritional values
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Apple className="mr-2 h-5 w-5" /> Nutritional Information
          </h2>
          
          <div className="space-y-6">
            {/* Calories */}
            <div>
              <Label htmlFor="calories">Calories</Label>
              <div className="relative mt-1.5">
                <Activity className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="calories"
                  type="number"
                  className="pl-10"
                  value={calories}
                  min={0}
                  onChange={(e) => setCalories(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Protein */}
            <div>
              <Label htmlFor="protein">Protein (grams)</Label>
              <Input
                id="protein"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={protein}
                min={0}
                onChange={(e) => setProtein(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher protein reduces points
              </p>
            </div>

            {/* Saturated Fat */}
            <div>
              <Label htmlFor="saturatedFat">Saturated Fat (grams)</Label>
              <Input
                id="saturatedFat"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={saturatedFat}
                min={0}
                onChange={(e) => setSaturatedFat(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher saturated fat increases points
              </p>
            </div>

            {/* Sugar */}
            <div>
              <Label htmlFor="sugar">Sugar (grams)</Label>
              <Input
                id="sugar"
                type="number"
                step="0.1"
                className="mt-1.5"
                value={sugar}
                min={0}
                onChange={(e) => setSugar(Number(e.target.value))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Higher sugar increases points
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
                  <h2 className="text-xl font-semibold">SmartPoints Value</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                      SmartPoints
                    </h3>
                    <div className="mt-2 text-5xl font-bold text-purple-600 dark:text-purple-400">
                      {smartPoints}
                    </div>
                    <p className="text-sm text-purple-700 dark:text-purple-300 mt-1">
                      points per serving
                    </p>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${getCategoryColorClasses()}`}>
                    <h3 className="text-sm font-medium">Food Category</h3>
                    <div className="mt-1 text-lg font-bold">
                      {category}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-3">
                      Nutritional Breakdown
                    </h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Calories:</span>
                        <span className="font-semibold">{calories}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Protein:</span>
                        <span className="font-semibold">{protein}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturated Fat:</span>
                        <span className="font-semibold">{saturatedFat}g</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sugar:</span>
                        <span className="font-semibold">{sugar}g</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-blue-50 to-cyan-50 dark:from-blue-950 dark:to-cyan-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Daily Points Guide
                    </h3>
                    <div className="space-y-1 text-xs text-blue-700 dark:text-blue-300">
                      <p>Most people get 23-30 daily points</p>
                      <p>Plus weekly flex points for treats</p>
                      <p>Zero-point foods don't need tracking</p>
                    </div>
                  </div>

                  <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-2">
                      Tips to Lower Points
                    </h3>
                    <ul className="space-y-1 text-xs text-green-700 dark:text-green-300">
                      <li>• Choose foods higher in protein</li>
                      <li>• Limit saturated fats and sugars</li>
                      <li>• Increase fiber intake</li>
                      <li>• Focus on zero-point foods</li>
                    </ul>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About SmartPoints</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • SmartPoints guide you toward healthier food choices
              </p>
              <p>
                • The system encourages lean proteins and limits sugar & sat fat
              </p>
              <p>
                • This is an approximation - official WW app is most accurate
              </p>
              <p>
                • Many fruits and vegetables are zero points
              </p>
              <p>
                • Point values help with portion control and balanced eating
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default WeightWatcherPointsCalculator;
