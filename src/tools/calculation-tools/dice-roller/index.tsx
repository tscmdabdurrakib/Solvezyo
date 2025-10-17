import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Dices } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * DiceRoller Component
 * 
 * Roll virtual dice with customizable number and sides
 */
export function DiceRoller() {
  const { toast } = useToast();

  // State for input values
  const [numberOfDice, setNumberOfDice] = useState<number>(2);
  const [sidesPerDie, setSidesPerDie] = useState<number>(6);
  
  // State for results
  const [rolls, setRolls] = useState<number[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [isRolling, setIsRolling] = useState<boolean>(false);

  // Function to roll dice
  const rollDice = () => {
    setIsRolling(true);
    
    setTimeout(() => {
      const results: number[] = [];
      let sum = 0;

      for (let i = 0; i < numberOfDice; i++) {
        const roll = Math.floor(Math.random() * sidesPerDie) + 1;
        results.push(roll);
        sum += roll;
      }

      setRolls(results);
      setTotal(sum);
      setIsRolling(false);
    }, 500);
  };

  // Function to reset
  const handleReset = () => {
    setNumberOfDice(2);
    setSidesPerDie(6);
    setRolls([]);
    setTotal(0);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Dice Roll Results:
Number of Dice: ${numberOfDice}
Sides per Die: ${sidesPerDie}
Individual Rolls: ${rolls.join(', ')}
Total: ${total}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Dice results copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Dice Roller</h1>
        <p className="text-muted-foreground mt-2">
          Roll virtual dice for games, decisions, and random number generation
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Dices className="mr-2 h-5 w-5" /> Dice Settings
          </h2>
          
          <div className="space-y-6">
            {/* Number of Dice */}
            <div>
              <Label htmlFor="numberOfDice">Number of Dice</Label>
              <Input
                id="numberOfDice"
                type="number"
                min="1"
                max="20"
                className="mt-1.5"
                value={numberOfDice}
                onChange={(e) => setNumberOfDice(Math.max(1, Math.min(20, Number(e.target.value))))}
              />
              <p className="text-xs text-muted-foreground mt-1">
                Choose 1-20 dice
              </p>
            </div>

            {/* Sides per Die */}
            <div>
              <Label htmlFor="sidesPerDie">Sides per Die</Label>
              <Select value={sidesPerDie.toString()} onValueChange={(val) => setSidesPerDie(Number(val))}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="4">D4 (4 sides)</SelectItem>
                  <SelectItem value="6">D6 (6 sides)</SelectItem>
                  <SelectItem value="8">D8 (8 sides)</SelectItem>
                  <SelectItem value="10">D10 (10 sides)</SelectItem>
                  <SelectItem value="12">D12 (12 sides)</SelectItem>
                  <SelectItem value="20">D20 (20 sides)</SelectItem>
                  <SelectItem value="100">D100 (100 sides)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Button 
                onClick={rollDice} 
                variant="default" 
                className="w-full"
                disabled={isRolling}
              >
                <Dices className="mr-2 h-4 w-4" /> 
                {isRolling ? 'Rolling...' : 'Roll Dice'}
              </Button>

              <Button onClick={handleReset} variant="outline" className="w-full">
                <RefreshCw className="mr-2 h-4 w-4" /> Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              key={total}
              initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.9, rotate: 5 }}
              transition={{ duration: 0.5, type: 'spring' }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Roll Results</h2>
                  {rolls.length > 0 && (
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                  )}
                </div>
                
                {rolls.length > 0 ? (
                  <div className="space-y-4">
                    <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                      <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">
                        Total
                      </h3>
                      <div className="mt-2 text-5xl font-bold text-purple-600 dark:text-purple-400">
                        {total}
                      </div>
                    </div>

                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-3">
                        Individual Rolls
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {rolls.map((roll, index) => (
                          <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 dark:from-blue-900 dark:to-indigo-900 rounded-lg flex items-center justify-center border-2 border-blue-200 dark:border-blue-700"
                          >
                            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                              {roll}
                            </span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">Min</div>
                        <div className="text-lg font-bold">{Math.min(...rolls)}</div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">Max</div>
                        <div className="text-lg font-bold">{Math.max(...rolls)}</div>
                      </div>
                      <div className="bg-muted/30 p-3 rounded-lg">
                        <div className="text-xs text-muted-foreground">Average</div>
                        <div className="text-lg font-bold">
                          {(rolls.reduce((a, b) => a + b, 0) / rolls.length).toFixed(1)}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-12">
                    <Dices className="mx-auto h-16 w-16 mb-4 opacity-50" />
                    <p>Click "Roll Dice" to get started!</p>
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Common Dice Types</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • D4: Tetrahedron (4 sides) - Dungeons & Dragons damage
              </p>
              <p>
                • D6: Standard cube (6 sides) - Most board games
              </p>
              <p>
                • D8: Octahedron (8 sides) - RPG damage rolls
              </p>
              <p>
                • D10: Pentagonal trapezohedron (10 sides) - Percentile rolls
              </p>
              <p>
                • D12: Dodecahedron (12 sides) - Specialty RPG rolls
              </p>
              <p>
                • D20: Icosahedron (20 sides) - Main die in D&D
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default DiceRoller;
