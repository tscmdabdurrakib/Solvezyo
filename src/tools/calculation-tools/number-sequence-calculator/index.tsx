import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * NumberSequenceCalculator Component
 * 
 * Generates and analyzes number sequences:
 * - Arithmetic progression
 * - Geometric progression
 * - Custom sequences
 */
export function NumberSequenceCalculator() {
  const [sequenceType, setSequenceType] = useState<string>('arithmetic');
  const [firstTerm, setFirstTerm] = useState<string>('1');
  const [commonDiff, setCommonDiff] = useState<string>('2');
  const [commonRatio, setCommonRatio] = useState<string>('2');
  const [terms, setTerms] = useState<string>('10');
  const [sequence, setSequence] = useState<number[]>([]);
  const [sum, setSum] = useState<number>(0);
  const [nthTerm, setNthTerm] = useState<number>(0);
  
  const { toast } = useToast();

  // Generate sequence
  useEffect(() => {
    const a = parseFloat(firstTerm) || 0;
    const n = parseInt(terms) || 0;

    if (n <= 0 || n > 1000) {
      setSequence([]);
      setSum(0);
      setNthTerm(0);
      return;
    }

    const seq: number[] = [];

    if (sequenceType === 'arithmetic') {
      // Arithmetic progression: a, a+d, a+2d, ...
      const d = parseFloat(commonDiff) || 0;
      for (let i = 0; i < n; i++) {
        seq.push(a + i * d);
      }
      // nth term = a + (n-1)d
      setNthTerm(a + (n - 1) * d);
      // Sum = n/2 * (2a + (n-1)d)
      setSum((n / 2) * (2 * a + (n - 1) * d));
    } else if (sequenceType === 'geometric') {
      // Geometric progression: a, ar, ar², ...
      const r = parseFloat(commonRatio) || 1;
      for (let i = 0; i < n; i++) {
        seq.push(a * Math.pow(r, i));
      }
      // nth term = a * r^(n-1)
      setNthTerm(a * Math.pow(r, n - 1));
      // Sum = a * (1 - r^n) / (1 - r) for r ≠ 1
      if (r !== 1) {
        setSum(a * (1 - Math.pow(r, n)) / (1 - r));
      } else {
        setSum(a * n);
      }
    }

    setSequence(seq);
  }, [sequenceType, firstTerm, commonDiff, commonRatio, terms]);

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
    setFirstTerm('1');
    setCommonDiff('2');
    setCommonRatio('2');
    setTerms('10');
    setSequenceType('arithmetic');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Number Sequence Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Generate and analyze arithmetic and geometric sequences
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <TrendingUp className="mr-2 h-5 w-5" /> Sequence Configuration
          </h2>
          
          <div className="space-y-4">
            <div>
              <Label htmlFor="sequenceType">Sequence Type</Label>
              <Select value={sequenceType} onValueChange={setSequenceType}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="arithmetic">Arithmetic Progression</SelectItem>
                  <SelectItem value="geometric">Geometric Progression</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <Label htmlFor="firstTerm">First Term (a)</Label>
                <Input
                  id="firstTerm"
                  type="number"
                  step="0.01"
                  value={firstTerm}
                  onChange={(e) => setFirstTerm(e.target.value)}
                  placeholder="First term"
                  className="mt-2"
                />
              </div>
              
              {sequenceType === 'arithmetic' ? (
                <div>
                  <Label htmlFor="commonDiff">Common Difference (d)</Label>
                  <Input
                    id="commonDiff"
                    type="number"
                    step="0.01"
                    value={commonDiff}
                    onChange={(e) => setCommonDiff(e.target.value)}
                    placeholder="Common difference"
                    className="mt-2"
                  />
                </div>
              ) : (
                <div>
                  <Label htmlFor="commonRatio">Common Ratio (r)</Label>
                  <Input
                    id="commonRatio"
                    type="number"
                    step="0.01"
                    value={commonRatio}
                    onChange={(e) => setCommonRatio(e.target.value)}
                    placeholder="Common ratio"
                    className="mt-2"
                  />
                </div>
              )}
            </div>

            <div>
              <Label htmlFor="terms">Number of Terms (max 1000)</Label>
              <Input
                id="terms"
                type="number"
                min="1"
                max="1000"
                value={terms}
                onChange={(e) => setTerms(e.target.value)}
                placeholder="Number of terms"
                className="mt-2"
              />
            </div>

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset
            </Button>
          </div>
        </Card>

        {/* Results Section */}
        {sequence.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Sequence Results</h2>
              
              <div className="grid gap-4 md:grid-cols-3 mb-4">
                <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Sum of Series</h3>
                      <div className="text-3xl font-bold">
                        {sum.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(sum.toString(), 'Sum')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">nth Term</h3>
                      <div className="text-3xl font-bold">
                        {nthTerm.toLocaleString(undefined, { maximumFractionDigits: 4 })}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(nthTerm.toString(), 'nth Term')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Total Terms</h3>
                      <div className="text-3xl font-bold">
                        {sequence.length}
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(sequence.length.toString(), 'Count')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>

              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-sm font-medium text-muted-foreground">Sequence</h3>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(sequence.join(', '), 'Sequence')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
                <Textarea
                  value={sequence.map(n => n.toFixed(4)).join(', ')}
                  readOnly
                  className="min-h-[150px] font-mono text-sm"
                />
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Number Sequences</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-medium text-lg mb-2">Arithmetic Progression</h3>
              <p className="text-muted-foreground text-sm mb-2">
                A sequence where each term differs from the previous by a constant difference (d).
              </p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• nth term: aₙ = a + (n-1)d</li>
                <li>• Sum: Sₙ = n/2 × (2a + (n-1)d)</li>
                <li>• Example: 2, 4, 6, 8, 10 (d=2)</li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Geometric Progression</h3>
              <p className="text-muted-foreground text-sm mb-2">
                A sequence where each term is multiplied by a constant ratio (r).
              </p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• nth term: aₙ = a × r^(n-1)</li>
                <li>• Sum: Sₙ = a(1-rⁿ)/(1-r)</li>
                <li>• Example: 2, 4, 8, 16, 32 (r=2)</li>
              </ul>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default NumberSequenceCalculator;
