import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, Calculator, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Assignment {
  id: string;
  name: string;
  score: number;
  maxScore: number;
  weight: number;
}

/**
 * GradeCalculator Component
 * 
 * Calculates weighted final grades from assignments and tests
 */
export function GradeCalculator() {
  const [assignments, setAssignments] = useState<Assignment[]>([
    { id: '1', name: 'Homework 1', score: 85, maxScore: 100, weight: 10 },
    { id: '2', name: 'Midterm Exam', score: 78, maxScore: 100, weight: 30 },
    { id: '3', name: 'Final Project', score: 92, maxScore: 100, weight: 40 },
    { id: '4', name: 'Final Exam', score: 88, maxScore: 100, weight: 20 },
  ]);
  const [finalGrade, setFinalGrade] = useState<number>(0);
  const [letterGrade, setLetterGrade] = useState<string>('');
  const [totalWeight, setTotalWeight] = useState<number>(0);
  const { toast } = useToast();

  // Calculate grade when assignments change
  useEffect(() => {
    calculateGrade();
  }, [assignments]);

  // Function to calculate weighted grade
  const calculateGrade = () => {
    let weightedSum = 0;
    let totalW = 0;

    assignments.forEach(assignment => {
      const percentage = (assignment.score / assignment.maxScore) * 100;
      weightedSum += percentage * (assignment.weight / 100);
      totalW += assignment.weight;
    });

    setTotalWeight(totalW);
    const grade = totalW > 0 ? weightedSum : 0;
    setFinalGrade(grade);
    setLetterGrade(getLetterGrade(grade));
  };

  // Convert numerical grade to letter grade
  const getLetterGrade = (grade: number): string => {
    if (grade >= 97) return 'A+';
    if (grade >= 93) return 'A';
    if (grade >= 90) return 'A-';
    if (grade >= 87) return 'B+';
    if (grade >= 83) return 'B';
    if (grade >= 80) return 'B-';
    if (grade >= 77) return 'C+';
    if (grade >= 73) return 'C';
    if (grade >= 70) return 'C-';
    if (grade >= 67) return 'D+';
    if (grade >= 63) return 'D';
    if (grade >= 60) return 'D-';
    return 'F';
  };

  // Add a new assignment
  const addAssignment = () => {
    const newAssignment: Assignment = {
      id: Date.now().toString(),
      name: `Assignment ${assignments.length + 1}`,
      score: 0,
      maxScore: 100,
      weight: 10,
    };
    setAssignments([...assignments, newAssignment]);
  };

  // Remove an assignment
  const removeAssignment = (id: string) => {
    if (assignments.length > 1) {
      setAssignments(assignments.filter(a => a.id !== id));
    }
  };

  // Update assignment
  const updateAssignment = (id: string, field: keyof Assignment, value: string | number) => {
    setAssignments(assignments.map(a =>
      a.id === id ? { ...a, [field]: value } : a
    ));
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
    setAssignments([
      { id: '1', name: 'Homework 1', score: 85, maxScore: 100, weight: 10 },
      { id: '2', name: 'Midterm Exam', score: 78, maxScore: 100, weight: 30 },
      { id: '3', name: 'Final Project', score: 92, maxScore: 100, weight: 40 },
      { id: '4', name: 'Final Exam', score: 88, maxScore: 100, weight: 20 },
    ]);
  };

  // Get grade status
  const getGradeStatus = (grade: number): string => {
    if (grade >= 90) return 'Excellent';
    if (grade >= 80) return 'Good';
    if (grade >= 70) return 'Satisfactory';
    if (grade >= 60) return 'Passing';
    return 'Failing';
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Grade Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your weighted final grade from assignments and exams
        </p>
      </div>

      <div className="grid gap-6">
        {/* Assignments Section */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <Calculator className="mr-2 h-5 w-5" /> Assignments & Exams
            </h2>
            <Button onClick={addAssignment} size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add
            </Button>
          </div>

          <div className="space-y-4">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 text-sm font-medium text-muted-foreground px-2">
              <div className="col-span-4">Name</div>
              <div className="col-span-2">Score</div>
              <div className="col-span-2">Max</div>
              <div className="col-span-2">Weight %</div>
              <div className="col-span-2">Percentage</div>
            </div>

            {/* Assignments */}
            {assignments.map((assignment) => {
              const percentage = assignment.maxScore > 0 
                ? (assignment.score / assignment.maxScore) * 100 
                : 0;
              
              return (
                <div key={assignment.id} className="grid grid-cols-12 gap-2 items-center">
                  <div className="col-span-4">
                    <Input
                      value={assignment.name}
                      onChange={(e) => updateAssignment(assignment.id, 'name', e.target.value)}
                      placeholder="Assignment name"
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      min="0"
                      value={assignment.score}
                      onChange={(e) => updateAssignment(assignment.id, 'score', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      min="1"
                      value={assignment.maxScore}
                      onChange={(e) => updateAssignment(assignment.id, 'maxScore', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={assignment.weight}
                      onChange={(e) => updateAssignment(assignment.id, 'weight', Number(e.target.value))}
                    />
                  </div>
                  <div className="col-span-1 text-center font-medium">
                    {percentage.toFixed(1)}%
                  </div>
                  <div className="col-span-1 flex justify-end">
                    {assignments.length > 1 && (
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => removeAssignment(assignment.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </div>
              );
            })}

            {totalWeight !== 100 && (
              <div className="bg-yellow-50 dark:bg-yellow-950/30 p-3 rounded-lg">
                <p className="text-sm text-yellow-800 dark:text-yellow-200">
                  ⚠️ Total weight is {totalWeight}% (should be 100% for accurate calculation)
                </p>
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
            <h2 className="text-xl font-semibold mb-4">Final Grade</h2>
            
            {/* Grade Display */}
            <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Your Grade</h3>
                  <div className="flex items-baseline gap-4">
                    <div className="text-5xl font-bold">
                      {finalGrade.toFixed(2)}%
                    </div>
                    <div className="text-3xl font-bold text-muted-foreground">
                      {letterGrade}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {getGradeStatus(finalGrade)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(`${finalGrade.toFixed(2)}% (${letterGrade})`, 'Grade')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Breakdown */}
            <div className="grid gap-3">
              {assignments.map((assignment) => {
                const percentage = assignment.maxScore > 0 
                  ? (assignment.score / assignment.maxScore) * 100 
                  : 0;
                const contribution = percentage * (assignment.weight / 100);
                
                return (
                  <div key={assignment.id} className="bg-muted/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="font-medium">{assignment.name}</span>
                      <span className="text-sm">
                        {assignment.score}/{assignment.maxScore} ({percentage.toFixed(1)}%) 
                        × {assignment.weight}% = {contribution.toFixed(2)}%
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </motion.div>

        {/* Grade Scale Reference */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Letter Grade Scale</h2>
          
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="font-medium">A+ to A-</div>
              <div className="text-sm text-muted-foreground">90-100%</div>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="font-medium">B+ to B-</div>
              <div className="text-sm text-muted-foreground">80-89%</div>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="font-medium">C+ to C-</div>
              <div className="text-sm text-muted-foreground">70-79%</div>
            </div>
            <div className="bg-muted/30 p-3 rounded-lg">
              <div className="font-medium">D+ to F</div>
              <div className="text-sm text-muted-foreground">Below 70%</div>
            </div>
          </div>
        </Card>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">How It Works</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Weighted Average</h3>
              <p className="text-muted-foreground text-sm">
                Each assignment contributes to your final grade based on its weight. Higher weight assignments have more impact.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Calculation</h3>
              <p className="text-muted-foreground text-sm">
                Each score is converted to a percentage, multiplied by its weight, then summed to get your final grade.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Total Weight</h3>
              <p className="text-muted-foreground text-sm">
                For accurate results, ensure all weights add up to 100%. Adjust weights to match your course syllabus.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GradeCalculator;
