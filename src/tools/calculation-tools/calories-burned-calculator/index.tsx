import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Copy, RefreshCw, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

/**
 * CaloriesBurnedCalculator Component
 * 
 * Calculates calories burned during various exercises based on MET values,
 * weight, and duration of activity.
 */
export function CaloriesBurnedCalculator() {
  const { toast } = useToast();
  
  // State for input values
  const [weight, setWeight] = useState<number>(70);
  const [weightUnit, setWeightUnit] = useState<'kg' | 'lbs'>('kg');
  const [duration, setDuration] = useState<number>(30);
  const [activity, setActivity] = useState<string>('running-8');
  
  // State for calculated results
  const [caloriesBurned, setCaloriesBurned] = useState<number>(0);
  const [caloriesPerHour, setCaloriesPerHour] = useState<number>(0);
  const [metValue, setMetValue] = useState<number>(0);

  // MET values for different activities
  const activities = {
    'walking-slow': { name: 'Walking (2 mph, slow)', met: 2.0 },
    'walking-moderate': { name: 'Walking (3.5 mph, moderate)', met: 3.5 },
    'walking-brisk': { name: 'Walking (4.5 mph, brisk)', met: 5.0 },
    'running-5': { name: 'Running (5 mph)', met: 8.3 },
    'running-6': { name: 'Running (6 mph)', met: 9.8 },
    'running-8': { name: 'Running (8 mph)', met: 11.8 },
    'cycling-light': { name: 'Cycling (light effort)', met: 5.8 },
    'cycling-moderate': { name: 'Cycling (moderate effort)', met: 8.0 },
    'cycling-vigorous': { name: 'Cycling (vigorous effort)', met: 10.0 },
    'swimming-light': { name: 'Swimming (light)', met: 6.0 },
    'swimming-moderate': { name: 'Swimming (moderate)', met: 8.0 },
    'swimming-vigorous': { name: 'Swimming (vigorous)', met: 11.0 },
    'yoga': { name: 'Yoga (Hatha)', met: 2.5 },
    'pilates': { name: 'Pilates', met: 3.0 },
    'aerobics-low': { name: 'Aerobics (low impact)', met: 5.0 },
    'aerobics-high': { name: 'Aerobics (high impact)', met: 7.0 },
    'jump-rope': { name: 'Jump Rope', met: 12.3 },
    'weight-training': { name: 'Weight Training', met: 6.0 },
    'rowing': { name: 'Rowing Machine', met: 7.0 },
    'elliptical': { name: 'Elliptical Trainer', met: 5.0 },
    'dancing': { name: 'Dancing (general)', met: 4.5 },
    'basketball': { name: 'Basketball (game)', met: 8.0 },
    'soccer': { name: 'Soccer (game)', met: 10.0 },
    'tennis': { name: 'Tennis (singles)', met: 8.0 },
    'hiking': { name: 'Hiking', met: 6.0 },
  };

  // Calculate calories burned when inputs change
  useEffect(() => {
    calculateCalories();
  }, [weight, weightUnit, duration, activity]);

  // Function to calculate calories burned
  const calculateCalories = () => {
    // Convert weight to kg if needed
    const weightInKg = weightUnit === 'lbs' ? weight * 0.453592 : weight;
    
    if (weightInKg <= 0 || duration <= 0) {
      setCaloriesBurned(0);
      setCaloriesPerHour(0);
      setMetValue(0);
      return;
    }
    
    // Get MET value for selected activity
    const selectedActivity = activities[activity as keyof typeof activities];
    const met = selectedActivity.met;
    
    // Calculate calories burned using MET formula
    // Calories = MET × weight (kg) × duration (hours)
    const durationInHours = duration / 60;
    const calories = met * weightInKg * durationInHours;
    const caloriesHour = met * weightInKg;
    
    setCaloriesBurned(Math.round(calories));
    setCaloriesPerHour(Math.round(caloriesHour));
    setMetValue(met);
  };

  // Function to reset all values
  const handleReset = () => {
    setWeight(70);
    setWeightUnit('kg');
    setDuration(30);
    setActivity('running-8');
  };

  // Function to copy result to clipboard
  const handleCopy = () => {
    const activityName = activities[activity as keyof typeof activities].name;
    const resultText = `Activity: ${activityName}
Duration: ${duration} minutes
Calories Burned: ${caloriesBurned} cal
Calories per Hour: ${caloriesPerHour} cal/hr
MET Value: ${metValue}`;
    navigator.clipboard.writeText(resultText);
    toast({
      title: "Copied to clipboard!",
      description: "Calories burned calculation results copied successfully.",
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Calories Burned Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate calories burned during exercise based on activity, weight, and duration
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Flame className="mr-2 h-5 w-5" /> Exercise Details
          </h2>
          
          <div className="space-y-6">
            {/* Activity */}
            <div>
              <Label htmlFor="activity">Activity Type</Label>
              <Select value={activity} onValueChange={setActivity}>
                <SelectTrigger id="activity" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  <SelectItem value="walking-slow">{activities['walking-slow'].name}</SelectItem>
                  <SelectItem value="walking-moderate">{activities['walking-moderate'].name}</SelectItem>
                  <SelectItem value="walking-brisk">{activities['walking-brisk'].name}</SelectItem>
                  <SelectItem value="running-5">{activities['running-5'].name}</SelectItem>
                  <SelectItem value="running-6">{activities['running-6'].name}</SelectItem>
                  <SelectItem value="running-8">{activities['running-8'].name}</SelectItem>
                  <SelectItem value="cycling-light">{activities['cycling-light'].name}</SelectItem>
                  <SelectItem value="cycling-moderate">{activities['cycling-moderate'].name}</SelectItem>
                  <SelectItem value="cycling-vigorous">{activities['cycling-vigorous'].name}</SelectItem>
                  <SelectItem value="swimming-light">{activities['swimming-light'].name}</SelectItem>
                  <SelectItem value="swimming-moderate">{activities['swimming-moderate'].name}</SelectItem>
                  <SelectItem value="swimming-vigorous">{activities['swimming-vigorous'].name}</SelectItem>
                  <SelectItem value="yoga">{activities['yoga'].name}</SelectItem>
                  <SelectItem value="pilates">{activities['pilates'].name}</SelectItem>
                  <SelectItem value="aerobics-low">{activities['aerobics-low'].name}</SelectItem>
                  <SelectItem value="aerobics-high">{activities['aerobics-high'].name}</SelectItem>
                  <SelectItem value="jump-rope">{activities['jump-rope'].name}</SelectItem>
                  <SelectItem value="weight-training">{activities['weight-training'].name}</SelectItem>
                  <SelectItem value="rowing">{activities['rowing'].name}</SelectItem>
                  <SelectItem value="elliptical">{activities['elliptical'].name}</SelectItem>
                  <SelectItem value="dancing">{activities['dancing'].name}</SelectItem>
                  <SelectItem value="basketball">{activities['basketball'].name}</SelectItem>
                  <SelectItem value="soccer">{activities['soccer'].name}</SelectItem>
                  <SelectItem value="tennis">{activities['tennis'].name}</SelectItem>
                  <SelectItem value="hiking">{activities['hiking'].name}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Weight */}
            <div>
              <Label htmlFor="weight">Body Weight</Label>
              <div className="flex gap-2 mt-1.5">
                <Input
                  id="weight"
                  type="number"
                  value={weight}
                  onChange={(e) => setWeight(Number(e.target.value))}
                  className="flex-1"
                />
                <Select value={weightUnit} onValueChange={(value: 'kg' | 'lbs') => setWeightUnit(value)}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg</SelectItem>
                    <SelectItem value="lbs">lbs</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Slider
                className="mt-2"
                defaultValue={[weight]}
                max={200}
                step={0.1}
                value={[weight]}
                onValueChange={(values) => setWeight(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 {weightUnit}</span>
                <span>100 {weightUnit}</span>
                <span>200 {weightUnit}</span>
              </div>
            </div>

            {/* Duration */}
            <div>
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="mt-1.5"
              />
              <Slider
                className="mt-2"
                defaultValue={[duration]}
                max={180}
                step={5}
                value={[duration]}
                onValueChange={(values) => setDuration(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>0 min</span>
                <span>90 min</span>
                <span>180 min</span>
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
              key={caloriesBurned}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <h2 className="text-xl font-semibold mb-4">Calories Burned</h2>
                
                <div className="space-y-4">
                  <div className="bg-primary/10 p-6 rounded-lg text-center">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Calories Burned</h3>
                    <div className="mt-2 text-4xl font-bold text-primary">
                      {caloriesBurned} cal
                    </div>
                    <div className="text-sm text-muted-foreground mt-1">
                      in {duration} minutes
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Per Hour</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {caloriesPerHour} cal
                      </div>
                    </div>
                    
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">MET Value</h3>
                      <div className="mt-1 text-2xl font-bold">
                        {metValue}
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-muted/30 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Food Equivalents</h3>
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span>Bananas (medium):</span>
                        <span className="font-semibold">{Math.round(caloriesBurned / 105)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Apples (medium):</span>
                        <span className="font-semibold">{Math.round(caloriesBurned / 95)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Slices of bread:</span>
                        <span className="font-semibold">{Math.round(caloriesBurned / 80)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <Button onClick={handleCopy} className="w-full">
                    <Copy className="mr-2 h-4 w-4" /> Copy Result
                  </Button>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h2 className="text-lg font-semibold mb-3">About MET Values</h2>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                MET (Metabolic Equivalent of Task) measures the energy cost of physical activities.
              </p>
              <p>
                1 MET = energy spent at rest. Higher MET values indicate more intense activities that burn more calories.
              </p>
              <p>
                Actual calories burned may vary based on fitness level, metabolism, and exercise intensity.
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default CaloriesBurnedCalculator;
