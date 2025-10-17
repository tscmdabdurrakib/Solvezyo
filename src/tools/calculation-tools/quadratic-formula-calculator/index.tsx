import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calculator } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * QuadraticFormulaCalculator Component
 * 
 * Solves quadratic equations of the form ax² + bx + c = 0
 * Formula: x = (-b ± √(b² - 4ac)) / 2a
 * Discriminant: Δ = b² - 4ac
 */
export function QuadraticFormulaCalculator() {
  const [a, setA] = useState<string>('1');
  const [b, setB] = useState<string>('-5');
  const [c, setC] = useState<string>('6');
  const [discriminant, setDiscriminant] = useState<number>(0);
  const [root1, setRoot1] = useState<string>('');
  const [root2, setRoot2] = useState<string>('');
  const [solutionType, setSolutionType] = useState<string>('');
  const [vertex, setVertex] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const { toast } = useToast();

  // Calculate quadratic formula when inputs change
  useEffect(() => {
    calculateQuadratic();
  }, [a, b, c]);

  // Function to calculate quadratic formula
  const calculateQuadratic = () => {
    const aVal = parseFloat(a) || 0;
    const bVal = parseFloat(b) || 0;
    const cVal = parseFloat(c) || 0;

    if (aVal === 0) {
      setSolutionType('Not a quadratic equation (a cannot be 0)');
      setRoot1('');
      setRoot2('');
      setDiscriminant(0);
      return;
    }

    // Calculate discriminant: Δ = b² - 4ac
    const delta = bVal * bVal - 4 * aVal * cVal;
    setDiscriminant(delta);

    // Calculate vertex: (-b/2a, f(-b/2a))
    const vertexX = -bVal / (2 * aVal);
    const vertexY = aVal * vertexX * vertexX + bVal * vertexX + cVal;
    setVertex({ x: vertexX, y: vertexY });

    if (delta > 0) {
      // Two distinct real roots
      const sqrtDelta = Math.sqrt(delta);
      const x1 = (-bVal + sqrtDelta) / (2 * aVal);
      const x2 = (-bVal - sqrtDelta) / (2 * aVal);
      setRoot1(x1.toFixed(6));
      setRoot2(x2.toFixed(6));
      setSolutionType('Two distinct real roots');
    } else if (delta === 0) {
      // One repeated real root
      const x = -bVal / (2 * aVal);
      setRoot1(x.toFixed(6));
      setRoot2(x.toFixed(6));
      setSolutionType('One repeated real root');
    } else {
      // Two complex conjugate roots
      const realPart = -bVal / (2 * aVal);
      const imaginaryPart = Math.sqrt(-delta) / (2 * aVal);
      setRoot1(`${realPart.toFixed(6)} + ${imaginaryPart.toFixed(6)}i`);
      setRoot2(`${realPart.toFixed(6)} - ${imaginaryPart.toFixed(6)}i`);
      setSolutionType('Two complex conjugate roots');
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
    setA('1');
    setB('-5');
    setC('6');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Quadratic Formula Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Solve quadratic equations of the form ax² + bx + c = 0
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Equation Coefficients
          </h2>
          
          <div className="space-y-4">
            <div className="text-center p-4 bg-muted/50 rounded-lg mb-4">
              <div className="text-2xl font-mono">
                {a || '0'}x² {parseFloat(b) >= 0 ? '+' : ''} {b || '0'}x {parseFloat(c) >= 0 ? '+' : ''} {c || '0'} = 0
              </div>
            </div>

            {/* Coefficient a */}
            <div>
              <Label htmlFor="a">Coefficient a (x² term)</Label>
              <Input
                id="a"
                type="number"
                value={a}
                onChange={(e) => setA(e.target.value)}
                placeholder="Enter coefficient a"
                className="mt-2"
                step="any"
              />
              <p className="text-xs text-muted-foreground mt-1">Cannot be zero</p>
            </div>

            {/* Coefficient b */}
            <div>
              <Label htmlFor="b">Coefficient b (x term)</Label>
              <Input
                id="b"
                type="number"
                value={b}
                onChange={(e) => setB(e.target.value)}
                placeholder="Enter coefficient b"
                className="mt-2"
                step="any"
              />
            </div>

            {/* Coefficient c */}
            <div>
              <Label htmlFor="c">Coefficient c (constant term)</Label>
              <Input
                id="c"
                type="number"
                value={c}
                onChange={(e) => setC(e.target.value)}
                placeholder="Enter coefficient c"
                className="mt-2"
                step="any"
              />
            </div>

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
            <h2 className="text-xl font-semibold mb-4">Solution</h2>
            
            {/* Solution Type */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Solution Type</h3>
                  <div className="text-2xl font-bold">
                    {solutionType}
                  </div>
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              {/* Discriminant */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Discriminant (Δ)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {discriminant.toFixed(6)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      b² - 4ac
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(discriminant.toFixed(6), 'Discriminant')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Root 1 */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Root 1 (x₁)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {root1 || 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      First solution
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(root1, 'Root 1')}
                    disabled={!root1}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Root 2 */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Root 2 (x₂)</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {root2 || 'N/A'}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Second solution
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(root2, 'Root 2')}
                    disabled={!root2}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Vertex */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Vertex</h3>
                    <div className="mt-1 text-2xl font-bold">
                      ({vertex.x.toFixed(4)}, {vertex.y.toFixed(4)})
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Parabola vertex point
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`(${vertex.x.toFixed(4)}, ${vertex.y.toFixed(4)})`, 'Vertex')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Quadratic Formula</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">The Formula</h3>
              <p className="text-muted-foreground text-sm">
                The quadratic formula x = (-b ± √(b² - 4ac)) / 2a solves any quadratic equation ax² + bx + c = 0, where a ≠ 0.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Discriminant</h3>
              <p className="text-muted-foreground text-sm">
                The discriminant Δ = b² - 4ac determines the nature of roots: Δ {'>'} 0 (two real roots), Δ = 0 (one root), Δ {'<'} 0 (complex roots).
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Used in physics for projectile motion, engineering for optimization problems, and mathematics for finding parabola properties.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default QuadraticFormulaCalculator;
