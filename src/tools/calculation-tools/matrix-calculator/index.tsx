import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Calculator, Plus } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

type Matrix = number[][];

/**
 * MatrixCalculator Component
 * 
 * Performs matrix operations including addition, subtraction, multiplication, and determinant
 */
export function MatrixCalculator() {
  const [rows, setRows] = useState<number>(2);
  const [cols, setCols] = useState<number>(2);
  const [matrixA, setMatrixA] = useState<Matrix>([[1, 2], [3, 4]]);
  const [matrixB, setMatrixB] = useState<Matrix>([[5, 6], [7, 8]]);
  const [operation, setOperation] = useState<'add' | 'subtract' | 'multiply' | 'determinant' | 'transpose'>('add');
  const [result, setResult] = useState<Matrix | number | null>(null);
  const { toast } = useToast();

  // Initialize matrices when size changes
  useEffect(() => {
    initializeMatrices();
  }, [rows, cols]);

  // Calculate result when operation or matrices change
  useEffect(() => {
    calculateResult();
  }, [matrixA, matrixB, operation]);

  const initializeMatrices = () => {
    const newMatrixA: Matrix = Array(rows).fill(0).map(() => Array(cols).fill(0));
    const newMatrixB: Matrix = Array(rows).fill(0).map(() => Array(cols).fill(0));
    
    // Copy existing values
    for (let i = 0; i < Math.min(rows, matrixA.length); i++) {
      for (let j = 0; j < Math.min(cols, matrixA[0].length); j++) {
        newMatrixA[i][j] = matrixA[i]?.[j] || 0;
        newMatrixB[i][j] = matrixB[i]?.[j] || 0;
      }
    }
    
    setMatrixA(newMatrixA);
    setMatrixB(newMatrixB);
  };

  const updateMatrixValue = (matrix: 'A' | 'B', row: number, col: number, value: string) => {
    const numValue = parseFloat(value) || 0;
    const targetMatrix = matrix === 'A' ? [...matrixA] : [...matrixB];
    targetMatrix[row][col] = numValue;
    
    if (matrix === 'A') {
      setMatrixA(targetMatrix);
    } else {
      setMatrixB(targetMatrix);
    }
  };

  const calculateResult = () => {
    try {
      switch (operation) {
        case 'add':
          setResult(addMatrices(matrixA, matrixB));
          break;
        case 'subtract':
          setResult(subtractMatrices(matrixA, matrixB));
          break;
        case 'multiply':
          setResult(multiplyMatrices(matrixA, matrixB));
          break;
        case 'determinant':
          if (rows === cols) {
            setResult(calculateDeterminant(matrixA));
          } else {
            setResult(null);
          }
          break;
        case 'transpose':
          setResult(transposeMatrix(matrixA));
          break;
      }
    } catch (error) {
      setResult(null);
    }
  };

  // Matrix addition
  const addMatrices = (a: Matrix, b: Matrix): Matrix => {
    return a.map((row, i) => row.map((val, j) => val + b[i][j]));
  };

  // Matrix subtraction
  const subtractMatrices = (a: Matrix, b: Matrix): Matrix => {
    return a.map((row, i) => row.map((val, j) => val - b[i][j]));
  };

  // Matrix multiplication
  const multiplyMatrices = (a: Matrix, b: Matrix): Matrix => {
    if (a[0].length !== b.length) {
      throw new Error('Invalid matrix dimensions for multiplication');
    }
    
    const result: Matrix = Array(a.length).fill(0).map(() => Array(b[0].length).fill(0));
    
    for (let i = 0; i < a.length; i++) {
      for (let j = 0; j < b[0].length; j++) {
        for (let k = 0; k < b.length; k++) {
          result[i][j] += a[i][k] * b[k][j];
        }
      }
    }
    
    return result;
  };

  // Calculate determinant (2x2 and 3x3 matrices)
  const calculateDeterminant = (matrix: Matrix): number => {
    const n = matrix.length;
    
    if (n === 1) {
      return matrix[0][0];
    }
    
    if (n === 2) {
      return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }
    
    if (n === 3) {
      return (
        matrix[0][0] * (matrix[1][1] * matrix[2][2] - matrix[1][2] * matrix[2][1]) -
        matrix[0][1] * (matrix[1][0] * matrix[2][2] - matrix[1][2] * matrix[2][0]) +
        matrix[0][2] * (matrix[1][0] * matrix[2][1] - matrix[1][1] * matrix[2][0])
      );
    }
    
    throw new Error('Determinant calculation only supported for 1x1, 2x2, and 3x3 matrices');
  };

  // Transpose matrix
  const transposeMatrix = (matrix: Matrix): Matrix => {
    return matrix[0].map((_, colIndex) => matrix.map(row => row[colIndex]));
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  const handleReset = () => {
    setRows(2);
    setCols(2);
    setMatrixA([[1, 2], [3, 4]]);
    setMatrixB([[5, 6], [7, 8]]);
    setOperation('add');
  };

  const renderMatrix = (matrix: Matrix, label: string, matrixType?: 'A' | 'B') => (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <div className="inline-block p-3 bg-background rounded-lg border">
        {matrix.map((row, i) => (
          <div key={i} className="flex gap-2 mb-2 last:mb-0">
            {row.map((val, j) => (
              matrixType ? (
                <Input
                  key={`${i}-${j}`}
                  type="number"
                  step="any"
                  value={val}
                  onChange={(e) => updateMatrixValue(matrixType, i, j, e.target.value)}
                  className="w-16 h-10 text-center"
                />
              ) : (
                <div
                  key={`${i}-${j}`}
                  className="w-16 h-10 flex items-center justify-center bg-muted rounded font-semibold"
                >
                  {typeof val === 'number' ? val.toFixed(2) : val}
                </div>
              )
            ))}
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Matrix Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Perform matrix operations: addition, subtraction, multiplication, determinant, and transpose
        </p>
      </div>

      <div className="grid gap-6">
        {/* Settings */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Calculator className="mr-2 h-5 w-5" /> Matrix Settings
          </h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="rows">Rows</Label>
              <Select value={rows.toString()} onValueChange={(v) => setRows(parseInt(v))}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map(n => (
                    <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="cols">Columns</Label>
              <Select value={cols.toString()} onValueChange={(v) => setCols(parseInt(v))}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {[1, 2, 3, 4].map(n => (
                    <SelectItem key={n} value={n.toString()}>{n}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="operation">Operation</Label>
              <Select value={operation} onValueChange={(v: any) => setOperation(v)}>
                <SelectTrigger className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="add">Addition (A + B)</SelectItem>
                  <SelectItem value="subtract">Subtraction (A - B)</SelectItem>
                  <SelectItem value="multiply">Multiplication (A × B)</SelectItem>
                  <SelectItem value="determinant">Determinant (det A)</SelectItem>
                  <SelectItem value="transpose">Transpose (A<sup>T</sup>)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </Card>

        {/* Input Matrices */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Input Matrices</h2>
          
          <div className="grid gap-6 md:grid-cols-2">
            {renderMatrix(matrixA, 'Matrix A', 'A')}
            {operation !== 'determinant' && operation !== 'transpose' && renderMatrix(matrixB, 'Matrix B', 'B')}
          </div>
        </Card>

        {/* Result */}
        {result !== null && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <Card className="p-6">
              <h2 className="text-xl font-semibold mb-4">Result</h2>
              
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg">
                {typeof result === 'number' ? (
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">Determinant</h3>
                      <div className="text-4xl font-bold">{result.toFixed(4)}</div>
                    </div>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => copyToClipboard(result.toString(), 'Determinant')}
                    >
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div>
                    {renderMatrix(result, 'Result Matrix')}
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => copyToClipboard(JSON.stringify(result), 'Matrix')}
                      className="mt-4"
                    >
                      <Copy className="mr-2 h-4 w-4" /> Copy Matrix
                    </Button>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Matrix Operations</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Addition & Subtraction</h3>
              <p className="text-muted-foreground text-sm">
                Add or subtract corresponding elements. Matrices must have the same dimensions.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Multiplication</h3>
              <p className="text-muted-foreground text-sm">
                Multiply matrices using row-by-column multiplication. Columns of A must equal rows of B.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Determinant & Transpose</h3>
              <p className="text-muted-foreground text-sm">
                Calculate determinant (square matrices only) or transpose by swapping rows and columns.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default MatrixCalculator;
