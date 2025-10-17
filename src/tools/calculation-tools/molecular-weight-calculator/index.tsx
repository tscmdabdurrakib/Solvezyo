import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Atom, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * MolecularWeightCalculator Component
 * 
 * Calculates molecular weight from chemical formula
 */
export function MolecularWeightCalculator() {
  const [formula, setFormula] = useState<string>('H2O');
  const [molecularWeight, setMolecularWeight] = useState<number>(0);
  const [breakdown, setBreakdown] = useState<{ element: string; count: number; weight: number }[]>([]);
  const { toast } = useToast();

  // Atomic weights of elements (in g/mol)
  const atomicWeights: { [key: string]: number } = {
    H: 1.008, He: 4.003, Li: 6.941, Be: 9.012, B: 10.811, C: 12.011, N: 14.007, O: 15.999,
    F: 18.998, Ne: 20.180, Na: 22.990, Mg: 24.305, Al: 26.982, Si: 28.086, P: 30.974, S: 32.065,
    Cl: 35.453, Ar: 39.948, K: 39.098, Ca: 40.078, Sc: 44.956, Ti: 47.867, V: 50.942, Cr: 51.996,
    Mn: 54.938, Fe: 55.845, Co: 58.933, Ni: 58.693, Cu: 63.546, Zn: 65.38, Ga: 69.723, Ge: 72.64,
    As: 74.922, Se: 78.96, Br: 79.904, Kr: 83.798, Rb: 85.468, Sr: 87.62, Y: 88.906, Zr: 91.224,
    Nb: 92.906, Mo: 95.96, Tc: 98, Ru: 101.07, Rh: 102.906, Pd: 106.42, Ag: 107.868, Cd: 112.411,
    In: 114.818, Sn: 118.710, Sb: 121.760, Te: 127.60, I: 126.904, Xe: 131.293, Cs: 132.905,
    Ba: 137.327, La: 138.905, Ce: 140.116, Pr: 140.908, Nd: 144.242, Pm: 145, Sm: 150.36,
    Eu: 151.964, Gd: 157.25, Tb: 158.925, Dy: 162.500, Ho: 164.930, Er: 167.259, Tm: 168.934,
    Yb: 173.054, Lu: 174.967, Hf: 178.49, Ta: 180.948, W: 183.84, Re: 186.207, Os: 190.23,
    Ir: 192.217, Pt: 195.084, Au: 196.967, Hg: 200.59, Tl: 204.383, Pb: 207.2, Bi: 208.980,
    Po: 209, At: 210, Rn: 222, Fr: 223, Ra: 226, Ac: 227, Th: 232.038, Pa: 231.036, U: 238.029,
  };

  // Calculate molecular weight when formula changes
  useEffect(() => {
    calculateMolecularWeight();
  }, [formula]);

  // Function to parse chemical formula
  const parseFormula = (f: string): { [key: string]: number } => {
    const elements: { [key: string]: number } = {};
    const regex = /([A-Z][a-z]?)(\d*)/g;
    let match;

    while ((match = regex.exec(f)) !== null) {
      const element = match[1];
      const count = match[2] ? parseInt(match[2]) : 1;
      
      if (atomicWeights[element]) {
        elements[element] = (elements[element] || 0) + count;
      }
    }

    return elements;
  };

  // Function to calculate molecular weight
  const calculateMolecularWeight = () => {
    if (!formula) {
      setMolecularWeight(0);
      setBreakdown([]);
      return;
    }

    const elements = parseFormula(formula);
    let totalWeight = 0;
    const breakdownArray: { element: string; count: number; weight: number }[] = [];

    for (const [element, count] of Object.entries(elements)) {
      const weight = atomicWeights[element] * count;
      totalWeight += weight;
      breakdownArray.push({ element, count, weight });
    }

    setMolecularWeight(totalWeight);
    setBreakdown(breakdownArray);
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
    setFormula('H2O');
  };

  // Common molecules preset
  const commonMolecules = [
    { name: 'Water', formula: 'H2O' },
    { name: 'Carbon Dioxide', formula: 'CO2' },
    { name: 'Glucose', formula: 'C6H12O6' },
    { name: 'Ethanol', formula: 'C2H5OH' },
    { name: 'Sulfuric Acid', formula: 'H2SO4' },
    { name: 'Ammonia', formula: 'NH3' },
    { name: 'Methane', formula: 'CH4' },
    { name: 'Table Salt', formula: 'NaCl' },
  ];

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Molecular Weight Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate molecular weight from chemical formula
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Atom className="mr-2 h-5 w-5" /> Chemical Formula
          </h2>
          
          <div className="space-y-4">
            {/* Formula */}
            <div>
              <Label htmlFor="formula">Enter Chemical Formula</Label>
              <Input
                id="formula"
                type="text"
                value={formula}
                onChange={(e) => setFormula(e.target.value.trim())}
                placeholder="e.g., H2O, C6H12O6, NaCl"
                className="mt-2 text-lg font-mono"
              />
              <p className="text-sm text-muted-foreground mt-1">
                Use element symbols (case-sensitive) followed by numbers. Example: H2O, CO2, C6H12O6
              </p>
            </div>

            {/* Common Molecules */}
            <div>
              <Label>Quick Select Common Molecules</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-2">
                {commonMolecules.map((molecule) => (
                  <Button
                    key={molecule.formula}
                    variant="outline"
                    size="sm"
                    onClick={() => setFormula(molecule.formula)}
                    className="text-xs"
                  >
                    {molecule.name}
                  </Button>
                ))}
              </div>
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
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <Atom className="mr-2 h-5 w-5" /> Calculation Result
            </h2>
            
            {/* Molecular Weight Result */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Molecular Weight</h3>
                  <div className="text-4xl font-bold">
                    {molecularWeight.toFixed(3)} g/mol
                  </div>
                  <div className="mt-2 text-sm text-muted-foreground">
                    Formula: {formula || 'N/A'}
                  </div>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(molecularWeight.toFixed(3), 'Molecular Weight')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Breakdown */}
            {breakdown.length > 0 && (
              <div className="mt-4">
                <h3 className="text-lg font-semibold mb-3">Element Breakdown</h3>
                <div className="space-y-2">
                  {breakdown.map((item, index) => (
                    <div key={index} className="bg-muted/50 p-3 rounded-lg flex justify-between items-center">
                      <div className="flex items-center space-x-3">
                        <div className="font-mono font-bold text-lg">{item.element}</div>
                        <div className="text-sm text-muted-foreground">× {item.count}</div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold">{item.weight.toFixed(3)} g/mol</div>
                        <div className="text-xs text-muted-foreground">
                          {atomicWeights[item.element]?.toFixed(3)} × {item.count}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </motion.div>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Molecular Weight</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Definition</h3>
              <p className="text-muted-foreground text-sm">
                Molecular weight (or molecular mass) is the sum of atomic weights of all atoms in a molecule, measured in g/mol.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Calculation</h3>
              <p className="text-muted-foreground text-sm">
                Sum the atomic weights of each element multiplied by the number of atoms of that element in the molecule.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Applications</h3>
              <p className="text-muted-foreground text-sm">
                Essential for stoichiometry, solution preparation, converting between moles and grams, and analytical chemistry.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MolecularWeightCalculator;
