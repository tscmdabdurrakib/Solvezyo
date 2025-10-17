import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Copy, RefreshCw, Lock, Shield, CheckCircle2, XCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
import { Progress } from '@/components/ui/progress';

/**
 * PasswordGenerator Component
 * 
 * Generate secure random passwords with customizable options
 */
export function PasswordGenerator() {
  const { toast } = useToast();

  // State for password options
  const [length, setLength] = useState<number>(16);
  const [includeUppercase, setIncludeUppercase] = useState<boolean>(true);
  const [includeLowercase, setIncludeLowercase] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [excludeSimilar, setExcludeSimilar] = useState<boolean>(false);
  
  // State for generated password
  const [password, setPassword] = useState<string>('');
  const [strength, setStrength] = useState<number>(0);
  const [strengthLabel, setStrengthLabel] = useState<string>('');
  const [strengthColor, setStrengthColor] = useState<string>('');

  // Character sets
  const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const lowercase = 'abcdefghijklmnopqrstuvwxyz';
  const numbers = '0123456789';
  const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
  const similar = 'il1Lo0O';

  // Generate password on mount and when options change
  useEffect(() => {
    generatePassword();
  }, [length, includeUppercase, includeLowercase, includeNumbers, includeSymbols, excludeSimilar]);

  // Function to generate password
  const generatePassword = () => {
    let charset = '';
    let generatedPassword = '';

    // Build character set based on options
    if (includeUppercase) charset += uppercase;
    if (includeLowercase) charset += lowercase;
    if (includeNumbers) charset += numbers;
    if (includeSymbols) charset += symbols;

    // Remove similar characters if option is selected
    if (excludeSimilar) {
      charset = charset.split('').filter(char => !similar.includes(char)).join('');
    }

    // If no options selected, use lowercase as default
    if (charset === '') {
      charset = lowercase;
    }

    // Generate password
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
    calculateStrength(generatedPassword);
  };

  // Calculate password strength
  const calculateStrength = (pwd: string) => {
    let score = 0;

    // Length check
    if (pwd.length >= 8) score += 20;
    if (pwd.length >= 12) score += 20;
    if (pwd.length >= 16) score += 20;

    // Character variety checks
    if (/[a-z]/.test(pwd)) score += 10;
    if (/[A-Z]/.test(pwd)) score += 10;
    if (/[0-9]/.test(pwd)) score += 10;
    if (/[^a-zA-Z0-9]/.test(pwd)) score += 10;

    setStrength(score);

    // Determine label and color
    if (score < 40) {
      setStrengthLabel('Weak');
      setStrengthColor('red');
    } else if (score < 60) {
      setStrengthLabel('Fair');
      setStrengthColor('orange');
    } else if (score < 80) {
      setStrengthLabel('Good');
      setStrengthColor('yellow');
    } else {
      setStrengthLabel('Strong');
      setStrengthColor('green');
    }
  };

  // Copy password to clipboard
  const copyToClipboard = () => {
    navigator.clipboard.writeText(password);
    toast({
      title: "Copied!",
      description: "Password copied to clipboard",
    });
  };

  // Get strength color class
  const getStrengthColorClass = () => {
    switch (strengthColor) {
      case 'red': return 'bg-red-500';
      case 'orange': return 'bg-orange-500';
      case 'yellow': return 'bg-yellow-500';
      case 'green': return 'bg-green-500';
      default: return 'bg-gray-300';
    }
  };

  const getStrengthTextColor = () => {
    switch (strengthColor) {
      case 'red': return 'text-red-600 dark:text-red-400';
      case 'orange': return 'text-orange-600 dark:text-orange-400';
      case 'yellow': return 'text-yellow-600 dark:text-yellow-400';
      case 'green': return 'text-green-600 dark:text-green-400';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Password Generator</h1>
        <p className="text-muted-foreground mt-2">
          Generate strong, secure passwords with customizable options
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Options Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Shield className="mr-2 h-5 w-5" /> Password Options
          </h2>
          
          <div className="space-y-6">
            {/* Password Length */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <Label htmlFor="length">Password Length</Label>
                <span className="text-sm font-bold">{length}</span>
              </div>
              <Slider
                id="length"
                value={[length]}
                min={4}
                max={64}
                step={1}
                onValueChange={(values) => setLength(values[0])}
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>4</span>
                <span>32</span>
                <span>64</span>
              </div>
            </div>

            {/* Character Options */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="uppercase" className="cursor-pointer">Uppercase Letters (A-Z)</Label>
                <Switch
                  id="uppercase"
                  checked={includeUppercase}
                  onCheckedChange={setIncludeUppercase}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="lowercase" className="cursor-pointer">Lowercase Letters (a-z)</Label>
                <Switch
                  id="lowercase"
                  checked={includeLowercase}
                  onCheckedChange={setIncludeLowercase}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="numbers" className="cursor-pointer">Numbers (0-9)</Label>
                <Switch
                  id="numbers"
                  checked={includeNumbers}
                  onCheckedChange={setIncludeNumbers}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="symbols" className="cursor-pointer">Symbols (!@#$%^&*)</Label>
                <Switch
                  id="symbols"
                  checked={includeSymbols}
                  onCheckedChange={setIncludeSymbols}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label htmlFor="excludeSimilar" className="cursor-pointer">
                  Exclude Similar (i, l, 1, L, o, 0, O)
                </Label>
                <Switch
                  id="excludeSimilar"
                  checked={excludeSimilar}
                  onCheckedChange={setExcludeSimilar}
                />
              </div>
            </div>

            <Button onClick={generatePassword} variant="default" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Generate New Password
            </Button>
          </div>
        </Card>

        {/* Generated Password Section */}
        <div className="space-y-6">
          <AnimatePresence mode="wait">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold flex items-center">
                    <Lock className="mr-2 h-5 w-5" /> Your Password
                  </h2>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                        Generated Password
                      </h3>
                      <Button onClick={copyToClipboard} variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="mt-2 text-2xl font-mono font-bold text-blue-600 dark:text-blue-400 break-all">
                      {password}
                    </div>
                  </div>

                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">
                      Password Strength
                    </h3>
                    <div className="space-y-2">
                      <Progress value={strength} className={getStrengthColorClass()} />
                      <div className="flex justify-between items-center">
                        <span className={`text-lg font-bold ${getStrengthTextColor()}`}>
                          {strengthLabel}
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {strength}%
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        {includeUppercase ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm">Uppercase</span>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        {includeLowercase ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm">Lowercase</span>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        {includeNumbers ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm">Numbers</span>
                      </div>
                    </div>
                    <div className="bg-muted/30 p-3 rounded-lg">
                      <div className="flex items-center gap-2">
                        {includeSymbols ? (
                          <CheckCircle2 className="h-4 w-4 text-green-600" />
                        ) : (
                          <XCircle className="h-4 w-4 text-red-600" />
                        )}
                        <span className="text-sm">Symbols</span>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Security Tips */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Password Security Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Use at least 12 characters for better security
              </p>
              <p>
                • Include a mix of uppercase, lowercase, numbers, and symbols
              </p>
              <p>
                • Never reuse passwords across different accounts
              </p>
              <p>
                • Use a password manager to store passwords securely
              </p>
              <p>
                • Change passwords regularly, especially for sensitive accounts
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default PasswordGenerator;
