import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Zap, Gauge } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * HorsepowerCalculator Component
 * 
 * Calculate horsepower from torque and RPM, or convert between power units
 */
export function HorsepowerCalculator() {
  const { toast } = useToast();

  // State for calculation method
  const [method, setMethod] = useState<string>('torque'); // torque or convert
  
  // State for torque method inputs
  const [torque, setTorque] = useState<number>(0);
  const [rpm, setRpm] = useState<number>(0);
  const [torqueUnit, setTorqueUnit] = useState<string>('lb-ft'); // lb-ft or Nm
  
  // State for conversion inputs
  const [powerValue, setPowerValue] = useState<number>(0);
  const [powerUnit, setPowerUnit] = useState<string>('hp'); // hp, kW, PS
  
  // State for results
  const [horsepower, setHorsepower] = useState<number>(0);
  const [kilowatts, setKilowatts] = useState<number>(0);
  const [metricHp, setMetricHp] = useState<number>(0);

  // Calculate when inputs change
  useEffect(() => {
    if (method === 'torque') {
      calculateFromTorque();
    } else {
      convertPower();
    }
  }, [method, torque, rpm, torqueUnit, powerValue, powerUnit]);

  // Function to calculate horsepower from torque and RPM
  const calculateFromTorque = () => {
    if (torque <= 0 || rpm <= 0) {
      setHorsepower(0);
      setKilowatts(0);
      setMetricHp(0);
      return;
    }

    // Convert torque to lb-ft if needed
    const torqueInLbFt = torqueUnit === 'Nm' ? torque * 0.737562 : torque;
    
    // HP = (Torque × RPM) / 5252
    const hp = (torqueInLbFt * rpm) / 5252;
    
    setHorsepower(hp);
    setKilowatts(hp * 0.745699872); // 1 HP = 0.745699872 kW
    setMetricHp(hp * 1.01387); // 1 HP = 1.01387 PS (metric horsepower)
  };

  // Function to convert between power units
  const convertPower = () => {
    if (powerValue <= 0) {
      setHorsepower(0);
      setKilowatts(0);
      setMetricHp(0);
      return;
    }

    let hp = 0;
    
    switch (powerUnit) {
      case 'hp':
        hp = powerValue;
        break;
      case 'kW':
        hp = powerValue * 1.34102; // 1 kW = 1.34102 HP
        break;
      case 'PS':
        hp = powerValue * 0.98632; // 1 PS = 0.98632 HP
        break;
    }
    
    setHorsepower(hp);
    setKilowatts(hp * 0.745699872);
    setMetricHp(hp * 1.01387);
  };

  // Function to reset all values
  const handleReset = () => {
    setTorque(0);
    setRpm(0);
    setPowerValue(0);
    setMethod('torque');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    let result = '';
    
    if (method === 'torque') {
      result = `Horsepower Calculation (from Torque):
Torque: ${torque} ${torqueUnit}
RPM: ${rpm}

`;
    } else {
      result = `Power Conversion:
Input: ${powerValue} ${powerUnit}

`;
    }
    
    result += `Results:
Horsepower: ${horsepower.toFixed(2)} HP
Kilowatts: ${kilowatts.toFixed(2)} kW
Metric Horsepower: ${metricHp.toFixed(2)} PS`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Horsepower calculation copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Horsepower Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate horsepower from torque and RPM or convert between power units
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 h-5 w-5" /> Power Inputs
          </h2>
          
          <div className="space-y-6">
            {/* Method Selection */}
            <div>
              <Label htmlFor="method">Calculation Method</Label>
              <Select value={method} onValueChange={setMethod}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="torque">Calculate from Torque & RPM</SelectItem>
                  <SelectItem value="convert">Convert Power Units</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {method === 'torque' ? (
              <>
                {/* Torque */}
                <div>
                  <Label htmlFor="torque">Torque</Label>
                  <div className="relative mt-1.5">
                    <Gauge className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="torque"
                      type="number"
                      step="0.1"
                      className="pl-10"
                      value={torque}
                      onChange={(e) => setTorque(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Torque Unit */}
                <div>
                  <Label htmlFor="torqueUnit">Torque Unit</Label>
                  <Select value={torqueUnit} onValueChange={setTorqueUnit}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="lb-ft">lb-ft (Pound-feet)</SelectItem>
                      <SelectItem value="Nm">Nm (Newton-meters)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* RPM */}
                <div>
                  <Label htmlFor="rpm">Engine Speed (RPM)</Label>
                  <div className="relative mt-1.5">
                    <Gauge className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="rpm"
                      type="number"
                      className="pl-10"
                      value={rpm}
                      onChange={(e) => setRpm(Number(e.target.value))}
                    />
                  </div>
                </div>
              </>
            ) : (
              <>
                {/* Power Value */}
                <div>
                  <Label htmlFor="powerValue">Power Value</Label>
                  <div className="relative mt-1.5">
                    <Zap className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                    <Input
                      id="powerValue"
                      type="number"
                      step="0.1"
                      className="pl-10"
                      value={powerValue}
                      onChange={(e) => setPowerValue(Number(e.target.value))}
                    />
                  </div>
                </div>

                {/* Power Unit */}
                <div>
                  <Label htmlFor="powerUnit">Power Unit</Label>
                  <Select value={powerUnit} onValueChange={setPowerUnit}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hp">HP (Horsepower)</SelectItem>
                      <SelectItem value="kW">kW (Kilowatts)</SelectItem>
                      <SelectItem value="PS">PS (Metric Horsepower)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </>
            )}

            <Button onClick={handleReset} variant="outline" className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" /> Reset Values
            </Button>
          </div>
        </Card>

        {/* Results Section */}
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
                  <h2 className="text-xl font-semibold">Power Output</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-950 dark:to-red-950 p-6 rounded-lg border border-orange-200 dark:border-orange-800">
                    <h3 className="text-sm font-medium text-orange-800 dark:text-orange-200 mb-2">
                      Horsepower (HP)
                    </h3>
                    <div className="text-4xl font-bold text-orange-600 dark:text-orange-400">
                      {horsepower.toFixed(2)}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">
                      Kilowatts (kW)
                    </h3>
                    <div className="mt-1 text-2xl font-bold text-blue-600 dark:text-blue-400">
                      {kilowatts.toFixed(2)}
                    </div>
                  </div>

                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200">
                      Metric Horsepower (PS)
                    </h3>
                    <div className="mt-1 text-2xl font-bold text-green-600 dark:text-green-400">
                      {metricHp.toFixed(2)}
                    </div>
                  </div>

                  {method === 'torque' && (
                    <div className="bg-muted/50 p-4 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground mb-2">
                        Formula Used
                      </h3>
                      <div className="text-sm font-mono">
                        HP = (Torque × RPM) / 5252
                      </div>
                    </div>
                  )}
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Horsepower</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Horsepower measures the rate at which work is done
              </p>
              <p>
                • 1 HP ≈ 0.746 kW ≈ 1.014 PS (metric horsepower)
              </p>
              <p>
                • Torque is rotational force, HP is torque over time
              </p>
              <p>
                • The constant 5252 relates to unit conversions in the formula
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default HorsepowerCalculator;
