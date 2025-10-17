import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Percent } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ProbabilityCalculator Component
 * 
 * Calculates various probability measures and combinations
 */
export function ProbabilityCalculator() {
  const [calculationType, setCalculationType] = useState<string>('single');
  const [favorableOutcomes, setFavorableOutcomes] = useState<string>('1');
  const [totalOutcomes, setTotalOutcomes] = useState<string>('6');
  const [eventAProbability, setEventAProbability] = useState<string>('0.5');
  const [eventBProbability, setEventBProbability] = useState<string>('0.5');
  const [probability, setProbability] = useState<number>(0);
  const [percentage, setPercentage] = useState<number>(0);
  const [odds, setOdds] = useState<string>('');
  const { toast } = useToast();

  // Calculate probability when inputs change
  useEffect(() => {
    calculateProbability();
  }, [calculationType, favorableOutcomes, totalOutcomes, eventAProbability, eventBProbability]);

  // Function to calculate probability
  const calculateProbability = () => {
    let prob = 0;

    if (calculationType === 'single') {
      // Simple probability: P(A) = favorable outcomes / total outcomes
      const favorable = parseFloat(favorableOutcomes) || 0;
      const total = parseFloat(totalOutcomes) || 1;
      prob = total > 0 ? favorable / total : 0;
    } else if (calculationType === 'and') {
      // P(A and B) = P(A) × P(B) for independent events
      const pA = parseFloat(eventAProbability) || 0;
      const pB = parseFloat(eventBProbability) || 0;
      prob = pA * pB;
    } else if (calculationType === 'or') {
      // P(A or B) = P(A) + P(B) - P(A and B) for independent events
      const pA = parseFloat(eventAProbability) || 0;
      const pB = parseFloat(eventBProbability) || 0;
      prob = pA + pB - (pA * pB);
    } else if (calculationType === 'not') {
      // P(not A) = 1 - P(A)
      const pA = parseFloat(eventAProbability) || 0;
      prob = 1 - pA;
    } else if (calculationType === 'conditional') {
      // P(A|B) = P(A and B) / P(B)
      const pA = parseFloat(eventAProbability) || 0;
      const pB = parseFloat(eventBProbability) || 0;
      const pAandB = pA * pB; // Assuming independence
      prob = pB > 0 ? pAandB / pB : 0;
    }

    // Ensure probability is between 0 and 1
    prob = Math.max(0, Math.min(1, prob));

    setProbability(prob);
    setPercentage(prob * 100);

    // Calculate odds
    if (prob === 0) {
      setOdds('0:1 (impossible)');
    } else if (prob === 1) {
      setOdds('1:0 (certain)');
    } else {
      const oddsFor = prob;
      const oddsAgainst = 1 - prob;
      const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
      const divisor = gcd(Math.round(oddsFor * 1000), Math.round(oddsAgainst * 1000));
      const simplifiedFor = Math.round(oddsFor * 1000) / divisor;
      const simplifiedAgainst = Math.round(oddsAgainst * 1000) / divisor;
      setOdds(`${simplifiedFor.toFixed(0)}:${simplifiedAgainst.toFixed(0)}`);
    }
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
    setFavorableOutcomes('1');
    setTotalOutcomes('6');
    setEventAProbability('0.5');
    setEventBProbability('0.5');
    setCalculationType('single');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Probability Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate probabilities for single events and combined events
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Percent className="mr-2 h-5 w-5" /> Probability Type
          </h2>
          
          <div className="space-y-4">
            {/* Calculation Type */}
            <div>
              <Label htmlFor="calculationType">Select Calculation Type</Label>
              <Select value={calculationType} onValueChange={setCalculationType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="single">Single Event</SelectItem>
                  <SelectItem value="and">Both Events (A AND B)</SelectItem>
                  <SelectItem value="or">Either Event (A OR B)</SelectItem>
                  <SelectItem value="not">Complement (NOT A)</SelectItem>
                  <SelectItem value="conditional">Conditional (A given B)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Single Event Inputs */}
            {calculationType === 'single' && (
              <>
                <div>
                  <Label htmlFor="favorableOutcomes">Favorable Outcomes</Label>
                  <Input
                    id="favorableOutcomes"
                    type="number"
                    value={favorableOutcomes}
                    onChange={(e) => setFavorableOutcomes(e.target.value)}
                    placeholder="Number of favorable outcomes"
                    className="mt-2"
                    min="0"
                  />
                </div>
                <div>
                  <Label htmlFor="totalOutcomes">Total Possible Outcomes</Label>
                  <Input
                    id="totalOutcomes"
                    type="number"
                    value={totalOutcomes}
                    onChange={(e) => setTotalOutcomes(e.target.value)}
                    placeholder="Total number of outcomes"
                    className="mt-2"
                    min="1"
                  />
                </div>
              </>
            )}

            {/* Multiple Event Inputs */}
            {(calculationType === 'and' || calculationType === 'or' || calculationType === 'conditional') && (
              <>
                <div>
                  <Label htmlFor="eventAProbability">Probability of Event A</Label>
                  <Input
                    id="eventAProbability"
                    type="number"
                    value={eventAProbability}
                    onChange={(e) => setEventAProbability(e.target.value)}
                    placeholder="P(A) as decimal (0-1)"
                    className="mt-2"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Enter as decimal (e.g., 0.5 for 50%)</p>
                </div>
                <div>
                  <Label htmlFor="eventBProbability">Probability of Event B</Label>
                  <Input
                    id="eventBProbability"
                    type="number"
                    value={eventBProbability}
                    onChange={(e) => setEventBProbability(e.target.value)}
                    placeholder="P(B) as decimal (0-1)"
                    className="mt-2"
                    min="0"
                    max="1"
                    step="0.01"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Enter as decimal (e.g., 0.5 for 50%)</p>
                </div>
              </>
            )}

            {/* NOT Event Input */}
            {calculationType === 'not' && (
              <div>
                <Label htmlFor="eventAProbability">Probability of Event A</Label>
                <Input
                  id="eventAProbability"
                  type="number"
                  value={eventAProbability}
                  onChange={(e) => setEventAProbability(e.target.value)}
                  placeholder="P(A) as decimal (0-1)"
                  className="mt-2"
                  min="0"
                  max="1"
                  step="0.01"
                />
                <p className="text-xs text-muted-foreground mt-1">Enter as decimal (e.g., 0.5 for 50%)</p>
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
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            {/* Primary Result */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Probability</h3>
                  <div className="text-4xl font-bold">
                    {probability.toFixed(6)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-1">
                    Decimal form
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(probability.toFixed(6), 'Probability')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Percentage */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Percentage</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {percentage.toFixed(4)}%
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      As a percentage
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${percentage.toFixed(4)}%`, 'Percentage')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Odds */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Odds</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {odds}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Odds format (for:against)
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(odds, 'Odds')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Complement */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Complement (NOT)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {(1 - probability).toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Probability event does NOT occur
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard((1 - probability).toFixed(6), 'Complement')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Fraction */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Fraction</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {calculationType === 'single' 
                        ? `${favorableOutcomes}/${totalOutcomes}` 
                        : `≈ ${Math.round(probability * 1000)}/1000`}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Fractional representation
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Probability</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Basic Probability</h3>
              <p className="text-muted-foreground text-sm">
                Probability ranges from 0 (impossible) to 1 (certain). For a single event: P(A) = favorable outcomes / total outcomes.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Combined Events</h3>
              <p className="text-muted-foreground text-sm">
                AND: Both events occur (multiply). OR: At least one occurs (add minus overlap). NOT: Event doesn't occur (subtract from 1).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in gambling, weather forecasting, risk assessment, insurance, quality control, genetics, and decision-making under uncertainty.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ProbabilityCalculator;
