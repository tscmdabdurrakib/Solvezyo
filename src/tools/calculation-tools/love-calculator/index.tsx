import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Heart, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * LoveCalculator Component
 * 
 * Calculate love compatibility percentage between two people
 */
export function LoveCalculator() {
  const { toast } = useToast();

  // State for inputs
  const [firstName, setFirstName] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  
  // State for results
  const [lovePercentage, setLovePercentage] = useState<number>(0);
  const [compatibilityMessage, setCompatibilityMessage] = useState<string>('');
  const [showResult, setShowResult] = useState<boolean>(false);

  // Calculate love percentage when names change
  useEffect(() => {
    if (firstName.trim() && secondName.trim()) {
      calculateLove();
      setShowResult(true);
    } else {
      setShowResult(false);
    }
  }, [firstName, secondName]);

  // Function to calculate love percentage
  const calculateLove = () => {
    // Simple hash-based algorithm for consistency
    const combined = (firstName.toLowerCase() + secondName.toLowerCase()).replace(/\s/g, '');
    
    let hash = 0;
    for (let i = 0; i < combined.length; i++) {
      hash = combined.charCodeAt(i) + ((hash << 5) - hash);
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    // Generate a percentage between 1-100
    const percentage = Math.abs(hash % 100) + 1;
    setLovePercentage(percentage);
    
    // Set compatibility message based on percentage
    if (percentage >= 90) {
      setCompatibilityMessage('Perfect Match! 💖 You two are absolutely meant for each other!');
    } else if (percentage >= 70) {
      setCompatibilityMessage('Great Match! 💕 You have wonderful chemistry together!');
    } else if (percentage >= 50) {
      setCompatibilityMessage('Good Match! ❤️ You complement each other nicely!');
    } else if (percentage >= 30) {
      setCompatibilityMessage('Fair Match! 💛 There\'s potential with some work!');
    } else {
      setCompatibilityMessage('Challenging Match! 💙 Every relationship needs effort!');
    }
  };

  // Function to reset all values
  const handleReset = () => {
    setFirstName('');
    setSecondName('');
    setShowResult(false);
  };

  // Get color based on percentage
  const getColorClasses = () => {
    if (lovePercentage >= 70) {
      return 'from-pink-500 to-red-500';
    } else if (lovePercentage >= 50) {
      return 'from-purple-500 to-pink-500';
    } else if (lovePercentage >= 30) {
      return 'from-yellow-500 to-orange-500';
    } else {
      return 'from-blue-500 to-indigo-500';
    }
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Love Calculator Result:
${firstName} + ${secondName}
Love Percentage: ${lovePercentage}%
${compatibilityMessage}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Love calculation copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Love Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your love compatibility percentage - just for fun! 💕
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Heart className="mr-2 h-5 w-5 text-pink-500" /> Enter Names
          </h2>
          
          <div className="space-y-6">
            {/* First Name */}
            <div>
              <Label htmlFor="firstName">First Person's Name</Label>
              <div className="relative mt-1.5">
                <Heart className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="firstName"
                  type="text"
                  placeholder="Enter first name"
                  className="pl-10"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>

            {/* Second Name */}
            <div>
              <Label htmlFor="secondName">Second Person's Name</Label>
              <div className="relative mt-1.5">
                <Heart className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="secondName"
                  type="text"
                  placeholder="Enter second name"
                  className="pl-10"
                  value={secondName}
                  onChange={(e) => setSecondName(e.target.value)}
                />
              </div>
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Names
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        <div className="space-y-6">
          {showResult ? (
            <AnimatePresence mode="wait">
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.5 }}
              >
                <Card className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold flex items-center">
                      <Sparkles className="mr-2 h-5 w-5 text-yellow-500" /> Love Result
                    </h2>
                    <Button onClick={copyToClipboard} variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" /> Copy
                    </Button>
                  </div>
                  
                  <div className="space-y-4">
                    {/* Love Percentage Display */}
                    <div className={`bg-gradient-to-br ${getColorClasses()} p-8 rounded-2xl text-center text-white shadow-lg`}>
                      <div className="flex items-center justify-center gap-2 mb-4">
                        <Heart className="h-8 w-8" fill="currentColor" />
                        <span className="text-2xl font-semibold">{firstName} + {secondName}</span>
                        <Heart className="h-8 w-8" fill="currentColor" />
                      </div>
                      <div className="text-7xl font-bold mb-2">
                        {lovePercentage}%
                      </div>
                      <div className="text-xl font-medium">
                        Love Match
                      </div>
                    </div>
                    
                    {/* Compatibility Message */}
                    <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-950 dark:to-purple-950 p-6 rounded-lg border border-pink-200 dark:border-pink-800">
                      <h3 className="text-sm font-medium text-pink-800 dark:text-pink-200 mb-2 text-center">
                        Compatibility Status
                      </h3>
                      <p className="text-center text-lg font-semibold text-pink-700 dark:text-pink-300">
                        {compatibilityMessage}
                      </p>
                    </div>

                    {/* Progress Bar */}
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Love Meter
                      </h3>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                        <motion.div
                          className={`h-full bg-gradient-to-r ${getColorClasses()}`}
                          initial={{ width: 0 }}
                          animate={{ width: `${lovePercentage}%` }}
                          transition={{ duration: 1, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          ) : (
            <Card className="p-6">
              <div className="text-center py-12">
                <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground/50" />
                <p className="text-muted-foreground">
                  Enter both names to calculate your love compatibility!
                </p>
              </div>
            </Card>
          )}

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Sparkles className="mr-2 h-5 w-5 text-yellow-500" /> About This Calculator
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • This love calculator is for entertainment purposes only
              </p>
              <p>
                • The percentage is based on a mathematical algorithm
              </p>
              <p>
                • Real relationships depend on mutual respect and understanding
              </p>
              <p>
                • Have fun, but remember true love requires effort from both sides!
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default LoveCalculator;
