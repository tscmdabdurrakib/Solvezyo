import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Copy, RefreshCw, GraduationCap, Plus, X } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Course {
  id: string;
  grade: string;
  credits: number;
}

/**
 * GPACalculator Component
 * 
 * Calculates Grade Point Average (GPA) from courses and grades
 */
export function GPACalculator() {
  const [gradeScale, setGradeScale] = useState<string>('4.0');
  const [courses, setCourses] = useState<Course[]>([
    { id: '1', grade: 'A', credits: 3 },
    { id: '2', grade: 'B+', credits: 3 },
    { id: '3', grade: 'A-', credits: 4 },
  ]);
  const [gpa, setGpa] = useState<number>(0);
  const [totalCredits, setTotalCredits] = useState<number>(0);
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const { toast } = useToast();

  // Grade to point mapping (4.0 scale)
  const gradePoints: { [key: string]: number } = {
    'A+': 4.0,
    'A': 4.0,
    'A-': 3.7,
    'B+': 3.3,
    'B': 3.0,
    'B-': 2.7,
    'C+': 2.3,
    'C': 2.0,
    'C-': 1.7,
    'D+': 1.3,
    'D': 1.0,
    'D-': 0.7,
    'F': 0.0,
  };

  // Calculate GPA when courses change
  useEffect(() => {
    calculateGPA();
  }, [courses, gradeScale]);

  // Function to calculate GPA
  const calculateGPA = () => {
    let points = 0;
    let credits = 0;

    courses.forEach(course => {
      const gradeValue = gradePoints[course.grade] || 0;
      points += gradeValue * course.credits;
      credits += course.credits;
    });

    setTotalPoints(points);
    setTotalCredits(credits);
    setGpa(credits > 0 ? points / credits : 0);
  };

  // Add a new course
  const addCourse = () => {
    const newCourse: Course = {
      id: Date.now().toString(),
      grade: 'A',
      credits: 3,
    };
    setCourses([...courses, newCourse]);
  };

  // Remove a course
  const removeCourse = (id: string) => {
    if (courses.length > 1) {
      setCourses(courses.filter(course => course.id !== id));
    }
  };

  // Update course grade
  const updateGrade = (id: string, grade: string) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, grade } : course
    ));
  };

  // Update course credits
  const updateCredits = (id: string, credits: number) => {
    setCourses(courses.map(course =>
      course.id === id ? { ...course, credits } : course
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
    setCourses([
      { id: '1', grade: 'A', credits: 3 },
      { id: '2', grade: 'B+', credits: 3 },
      { id: '3', grade: 'A-', credits: 4 },
    ]);
    setGradeScale('4.0');
  };

  // Get GPA classification
  const getGPAClassification = (gpa: number): string => {
    if (gpa >= 3.9) return 'Summa Cum Laude (Excellent)';
    if (gpa >= 3.7) return 'Magna Cum Laude (Very Good)';
    if (gpa >= 3.5) return 'Cum Laude (Good)';
    if (gpa >= 3.0) return 'Good Standing';
    if (gpa >= 2.5) return 'Satisfactory';
    if (gpa >= 2.0) return 'Passing';
    return 'Below Passing';
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">GPA Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate your Grade Point Average from courses and grades
        </p>
      </div>

      <div className="grid gap-6">
        {/* Settings */}
        <Card className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center">
              <GraduationCap className="mr-2 h-5 w-5" /> Courses
            </h2>
            <Button onClick={addCourse} size="sm">
              <Plus className="mr-2 h-4 w-4" /> Add Course
            </Button>
          </div>

          <div className="space-y-3">
            {courses.map((course, index) => (
              <div key={course.id} className="flex gap-3 items-end">
                <div className="flex-1">
                  <Label htmlFor={`course-${course.id}`}>Course {index + 1}</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2">
                    <Select
                      value={course.grade}
                      onValueChange={(value) => updateGrade(course.id, value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.keys(gradePoints).map(grade => (
                          <SelectItem key={grade} value={grade}>
                            {grade} ({gradePoints[grade].toFixed(1)})
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      type="number"
                      min="0"
                      max="10"
                      step="0.5"
                      value={course.credits}
                      onChange={(e) => updateCredits(course.id, Number(e.target.value))}
                      placeholder="Credits"
                    />
                  </div>
                </div>
                {courses.length > 1 && (
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => removeCourse(course.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          <Button onClick={handleReset} variant="outline" className="w-full mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset
          </Button>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            {/* GPA Display */}
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg mb-4">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-muted-foreground mb-2">Your GPA</h3>
                  <div className="text-5xl font-bold">
                    {gpa.toFixed(2)}
                  </div>
                  <p className="text-sm text-muted-foreground mt-2">
                    {getGPAClassification(gpa)}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(gpa.toFixed(2), 'GPA')}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {/* Total Credits */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Credits</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {totalCredits.toFixed(1)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalCredits.toString(), 'Total Credits')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Total Points */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground">Total Points</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {totalPoints.toFixed(2)}
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalPoints.toFixed(2), 'Total Points')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Letter Grade Equivalent */}
              <div className="bg-muted/50 p-4 rounded-lg">
                <h3 className="text-sm font-medium text-muted-foreground">Equivalent</h3>
                <div className="mt-1 text-2xl font-bold">
                  {gpa >= 3.9 ? 'A+' : gpa >= 3.7 ? 'A' : gpa >= 3.3 ? 'A-' : 
                   gpa >= 3.0 ? 'B+' : gpa >= 2.7 ? 'B' : gpa >= 2.3 ? 'B-' :
                   gpa >= 2.0 ? 'C+' : gpa >= 1.7 ? 'C' : gpa >= 1.3 ? 'C-' :
                   gpa >= 1.0 ? 'D' : 'F'}
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Grade Scale Reference */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Grade Scale (4.0 System)</h2>
          
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {Object.entries(gradePoints).map(([grade, points]) => (
              <div key={grade} className="flex justify-between items-center bg-muted/30 p-3 rounded-lg">
                <span className="font-medium">{grade}</span>
                <span className="text-muted-foreground">{points.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </Card>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding GPA</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">What is GPA?</h3>
              <p className="text-muted-foreground text-sm">
                Grade Point Average is a standard way of measuring academic achievement, calculated by dividing total grade points by total credits.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">How It's Calculated</h3>
              <p className="text-muted-foreground text-sm">
                Each grade is converted to a point value, multiplied by course credits, then all are summed and divided by total credits.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Why It Matters</h3>
              <p className="text-muted-foreground text-sm">
                GPA is used for academic standing, scholarships, honors, graduate school admissions, and job applications.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default GPACalculator;
