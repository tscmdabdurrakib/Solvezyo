import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * GolfHandicapCalculator Component
 * 
 * Calculates golf handicap index from scores and course ratings
 */
export function GolfHandicapCalculator() {
  const [scores, setScores] = useState<string[]>(['85', '88', '90', '87', '92']);
  const [courseRatings, setCourseRatings] = useState<string[]>(['72.0', '72.0', '72.0', '72.0', '72.0']);
  const [slopeRatings, setSlopeRatings] = useState<string[]>(['113', '113', '113', '113', '113']);
  const [handicapIndex, setHandicapIndex] = useState<number>(0);
  const [averageDifferential, setAverageDifferential] = useState<number>(0);
  const { toast } = useToast();

  // Calculate handicap when inputs change
  useEffect(() => {
    calculateHandicap();
  }, [scores, courseRatings, slopeRatings]);

  // Function to calculate score differential
  const calculateDifferential = (score: number, rating: number, slope: number): number => {
    // Handicap Differential = (Score - Course Rating) × 113 / Slope Rating
    return ((score - rating) * 113) / slope;
  };

  // Function to calculate handicap
  const calculateHandicap = () => {
    const validScores: number[] = [];
    const differentials: number[] = [];

    // Calculate differentials for each round
    for (let i = 0; i < scores.length; i++) {
      const score = parseFloat(scores[i]);
      const rating = parseFloat(courseRatings[i]);
      const slope = parseFloat(slopeRatings[i]);

      if (!isNaN(score) && !isNaN(rating) && !isNaN(slope) && slope > 0) {
        const diff = calculateDifferential(score, rating, slope);
        differentials.push(diff);
        validScores.push(score);
      }
    }

    if (differentials.length === 0) {
      setHandicapIndex(0);
      setAverageDifferential(0);
      return;
    }

    // Sort differentials (lowest to highest)
    differentials.sort((a, b) => a - b);

    // Use best differentials based on number of scores
    let numBest = 1;
    if (differentials.length >= 20) numBest = 10;
    else if (differentials.length >= 10) numBest = 3;
    else if (differentials.length >= 5) numBest = 1;

    const bestDifferentials = differentials.slice(0, numBest);
    const avgDiff = bestDifferentials.reduce((a, b) => a + b, 0) / bestDifferentials.length;

    // Handicap Index = Average of best differentials × 0.96
    const handicap = avgDiff * 0.96;

    setHandicapIndex(handicap);
    setAverageDifferential(avgDiff);
  };

  // Function to add a new score
  const addScore = () => {
    if (scores.length < 20) {
      setScores([...scores, '']);
      setCourseRatings([...courseRatings, '72.0']);
      setSlopeRatings([...slopeRatings, '113']);
    }
  };

  // Function to remove a score
  const removeScore = (index: number) => {
    if (scores.length > 1) {
      setScores(scores.filter((_, i) => i !== index));
      setCourseRatings(courseRatings.filter((_, i) => i !== index));
      setSlopeRatings(slopeRatings.filter((_, i) => i !== index));
    }
  };

  // Function to update score
  const updateScore = (index: number, value: string) => {
    const newScores = [...scores];
    newScores[index] = value;
    setScores(newScores);
  };

  // Function to update course rating
  const updateCourseRating = (index: number, value: string) => {
    const newRatings = [...courseRatings];
    newRatings[index] = value;
    setCourseRatings(newRatings);
  };

  // Function to update slope rating
  const updateSlopeRating = (index: number, value: string) => {
    const newSlopes = [...slopeRatings];
    newSlopes[index] = value;
    setSlopeRatings(newSlopes);
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
    setScores(['85', '88', '90', '87', '92']);
    setCourseRatings(['72.0', '72.0', '72.0', '72.0', '72.0']);
    setSlopeRatings(['113', '113', '113', '113', '113']);
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Golf Handicap Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your USGA Handicap Index from your golf scores
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> Golf Scores
          </h2>
          
          <div className="space-y-4">
            {/* Score Entries */}
            <div className="space-y-3">
              {scores.map((score, index) => (
                <div key={index} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-1 text-sm font-medium text-muted-foreground">
                    #{index + 1}
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      value={score}
                      onChange={(e) => updateScore(index, e.target.value)}
                      placeholder="Score"
                      min="50"
                      max="150"
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-4">
                    <Input
                      type="number"
                      value={courseRatings[index]}
                      onChange={(e) => updateCourseRating(index, e.target.value)}
                      placeholder="Course Rating"
                      step="0.1"
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-3">
                    <Input
                      type="number"
                      value={slopeRatings[index]}
                      onChange={(e) => updateSlopeRating(index, e.target.value)}
                      placeholder="Slope"
                      min="55"
                      max="155"
                      className="text-sm"
                    />
                  </div>
                  <div className="col-span-1">
                    {scores.length > 1 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeScore(index)}
                        className="h-8 w-8 p-0"
                      >
                        ×
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2">
              <Button onClick={addScore} variant="outline" disabled={scores.length >= 20} className="flex-1">
                Add Score
              </Button>
              <Button onClick={handleReset} variant="outline" className="flex-1">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>

            <p className="text-sm text-muted-foreground">
              Enter at least 5 scores for accurate handicap calculation. Course Rating (typically 67-75) and Slope Rating (55-155, standard is 113).
            </p>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <TrendingUp className="mr-2 h-5 w-5" /> Handicap Results
            </h2>
            
            {/* Handicap Index */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Handicap Index</h3>
                  <div className="text-4xl font-bold">
                    {handicapIndex.toFixed(1)}
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Based on {scores.filter(s => s && !isNaN(parseFloat(s))).length} rounds
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(handicapIndex.toFixed(1), 'Handicap Index')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 mt-4">
              {/* Average Differential */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Average Differential</h3>
                <div className="text-2xl font-bold">
                  {averageDifferential.toFixed(2)}
                </div>
              </div>

              {/* Number of Rounds */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Rounds Entered</h3>
                <div className="text-2xl font-bold">
                  {scores.filter(s => s && !isNaN(parseFloat(s))).length}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Golf Handicap</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">USGA Formula</h3>
              <p className="text-muted-foreground text-sm">
                Handicap Index = (Average of best differentials) × 0.96. Differential = (Score - Rating) × 113 / Slope.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Score Requirements</h3>
              <p className="text-muted-foreground text-sm">
                Minimum 5 scores for calculation. More scores (up to 20) provide better accuracy and representation of your ability.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Course & Slope</h3>
              <p className="text-muted-foreground text-sm">
                Course Rating measures difficulty for scratch golfers. Slope Rating (113 standard) measures difficulty for bogey golfers.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GolfHandicapCalculator;
