import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Zap, DollarSign, Clock } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * ElectricityCalculator Component
 * 
 * Calculate electricity cost, usage, and energy consumption
 */
export function ElectricityCalculator() {
  const { toast } = useToast();

  // State for inputs
  const [powerRating, setPowerRating] = useState<number>(0); // Watts
  const [powerUnit, setPowerUnit] = useState<string>('watts'); // watts or kilowatts
  const [hoursPerDay, setHoursPerDay] = useState<number>(0);
  const [daysPerMonth, setDaysPerMonth] = useState<number>(30);
  const [electricityRate, setElectricityRate] = useState<number>(0.12); // $ per kWh
  
  // State for appliance type (preset values)
  const [applianceType, setApplianceType] = useState<string>('custom');
  
  // Preset appliances with typical wattage
  const appliances = {
    'custom': 0,
    'led-bulb': 10,
    'incandescent-bulb': 60,
    'laptop': 50,
    'desktop': 200,
    'tv-32': 55,
    'tv-55': 100,
    'refrigerator': 150,
    'air-conditioner': 3500,
    'microwave': 1000,
    'washing-machine': 500,
    'dishwasher': 1800,
    'hair-dryer': 1500,
  };
  
  // State for results
  const [dailyEnergy, setDailyEnergy] = useState<number>(0); // kWh
  const [monthlyEnergy, setMonthlyEnergy] = useState<number>(0); // kWh
  const [yearlyEnergy, setYearlyEnergy] = useState<number>(0); // kWh
  const [dailyCost, setDailyCost] = useState<number>(0);
  const [monthlyCost, setMonthlyCost] = useState<number>(0);
  const [yearlyCost, setYearlyCost] = useState<number>(0);

  // Calculate when inputs change
  useEffect(() => {
    calculateElectricity();
  }, [powerRating, powerUnit, hoursPerDay, daysPerMonth, electricityRate]);

  // Update power rating when appliance type changes
  useEffect(() => {
    if (applianceType !== 'custom') {
      setPowerRating(appliances[applianceType as keyof typeof appliances]);
      setPowerUnit('watts');
    }
  }, [applianceType]);

  // Function to calculate electricity consumption and cost
  const calculateElectricity = () => {
    if (powerRating <= 0 || hoursPerDay <= 0) {
      resetResults();
      return;
    }

    // Convert power to kilowatts
    const powerInKw = powerUnit === 'kilowatts' ? powerRating : powerRating / 1000;
    
    // Calculate energy consumption (kWh)
    const dailyKwh = powerInKw * hoursPerDay;
    const monthlyKwh = dailyKwh * daysPerMonth;
    const yearlyKwh = dailyKwh * 365;
    
    setDailyEnergy(dailyKwh);
    setMonthlyEnergy(monthlyKwh);
    setYearlyEnergy(yearlyKwh);
    
    // Calculate costs
    setDailyCost(dailyKwh * electricityRate);
    setMonthlyCost(monthlyKwh * electricityRate);
    setYearlyCost(yearlyKwh * electricityRate);
  };

  const resetResults = () => {
    setDailyEnergy(0);
    setMonthlyEnergy(0);
    setYearlyEnergy(0);
    setDailyCost(0);
    setMonthlyCost(0);
    setYearlyCost(0);
  };

  // Function to reset all values
  const handleReset = () => {
    setPowerRating(0);
    setPowerUnit('watts');
    setHoursPerDay(0);
    setDaysPerMonth(30);
    setElectricityRate(0.12);
    setApplianceType('custom');
  };

  // Format currency
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(value);
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `Electricity Consumption & Cost:

Power Rating: ${powerRating} ${powerUnit}
Usage: ${hoursPerDay} hours/day for ${daysPerMonth} days/month
Electricity Rate: ${formatCurrency(electricityRate)}/kWh

Energy Consumption:
Daily: ${dailyEnergy.toFixed(3)} kWh
Monthly: ${monthlyEnergy.toFixed(2)} kWh
Yearly: ${yearlyEnergy.toFixed(2)} kWh

Electricity Cost:
Daily: ${formatCurrency(dailyCost)}
Monthly: ${formatCurrency(monthlyCost)}
Yearly: ${formatCurrency(yearlyCost)}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Electricity calculations copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Electricity Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate electricity consumption and cost for your appliances
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Zap className="mr-2 h-5 w-5" /> Appliance Details
          </h2>
          
          <div className="space-y-6">
            {/* Appliance Type */}
            <div>
              <Label htmlFor="applianceType">Appliance Type (Optional)</Label>
              <Select value={applianceType} onValueChange={setApplianceType}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="custom">Custom</SelectItem>
                  <SelectItem value="led-bulb">LED Bulb (10W)</SelectItem>
                  <SelectItem value="incandescent-bulb">Incandescent Bulb (60W)</SelectItem>
                  <SelectItem value="laptop">Laptop (50W)</SelectItem>
                  <SelectItem value="desktop">Desktop Computer (200W)</SelectItem>
                  <SelectItem value="tv-32">32" TV (55W)</SelectItem>
                  <SelectItem value="tv-55">55" TV (100W)</SelectItem>
                  <SelectItem value="refrigerator">Refrigerator (150W)</SelectItem>
                  <SelectItem value="air-conditioner">Air Conditioner (3500W)</SelectItem>
                  <SelectItem value="microwave">Microwave (1000W)</SelectItem>
                  <SelectItem value="washing-machine">Washing Machine (500W)</SelectItem>
                  <SelectItem value="dishwasher">Dishwasher (1800W)</SelectItem>
                  <SelectItem value="hair-dryer">Hair Dryer (1500W)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Power Rating */}
            <div>
              <Label htmlFor="powerRating">Power Rating</Label>
              <div className="flex gap-2 mt-1.5">
                <div className="relative flex-1">
                  <Zap className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    id="powerRating"
                    type="number"
                    step="0.1"
                    className="pl-10"
                    value={powerRating}
                    onChange={(e) => {
                      setPowerRating(Number(e.target.value));
                      setApplianceType('custom');
                    }}
                  />
                </div>
                <Select value={powerUnit} onValueChange={setPowerUnit}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="watts">Watts</SelectItem>
                    <SelectItem value="kilowatts">kW</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Hours Per Day */}
            <div>
              <Label htmlFor="hoursPerDay">Usage Hours per Day</Label>
              <div className="relative mt-1.5">
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="hoursPerDay"
                  type="number"
                  step="0.5"
                  className="pl-10"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(Number(e.target.value))}
                />
              </div>
            </div>

            {/* Days Per Month */}
            <div>
              <Label htmlFor="daysPerMonth">Days Per Month</Label>
              <Input
                id="daysPerMonth"
                type="number"
                className="mt-1.5"
                value={daysPerMonth}
                onChange={(e) => setDaysPerMonth(Number(e.target.value))}
              />
            </div>

            {/* Electricity Rate */}
            <div>
              <Label htmlFor="electricityRate">Electricity Rate ($/kWh)</Label>
              <div className="relative mt-1.5">
                <DollarSign className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="electricityRate"
                  type="number"
                  step="0.01"
                  className="pl-10"
                  value={electricityRate}
                  onChange={(e) => setElectricityRate(Number(e.target.value))}
                />
              </div>
            </div>

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
                  <h2 className="text-xl font-semibold">Energy & Cost</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {/* Energy Consumption */}
                  <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-3">
                      Energy Consumption
                    </h3>
                    <div className="space-y-2 text-blue-900 dark:text-blue-100">
                      <div className="flex justify-between">
                        <span className="text-sm">Daily:</span>
                        <span className="font-bold">{dailyEnergy.toFixed(3)} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly:</span>
                        <span className="font-bold">{monthlyEnergy.toFixed(2)} kWh</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Yearly:</span>
                        <span className="font-bold">{yearlyEnergy.toFixed(2)} kWh</span>
                      </div>
                    </div>
                  </div>

                  {/* Electricity Cost */}
                  <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-4 rounded-lg border border-green-200 dark:border-green-800">
                    <h3 className="text-sm font-medium text-green-800 dark:text-green-200 mb-3">
                      Electricity Cost
                    </h3>
                    <div className="space-y-2 text-green-900 dark:text-green-100">
                      <div className="flex justify-between">
                        <span className="text-sm">Daily:</span>
                        <span className="font-bold">{formatCurrency(dailyCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Monthly:</span>
                        <span className="font-bold">{formatCurrency(monthlyCost)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm">Yearly:</span>
                        <span className="font-bold text-lg">{formatCurrency(yearlyCost)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Summary Card */}
                  <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-6 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Annual Operating Cost
                    </h3>
                    <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">
                      {formatCurrency(yearlyCost)}
                    </div>
                    <p className="text-xs text-purple-700 dark:text-purple-300 mt-1">
                      Based on {hoursPerDay} hours/day usage
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">Energy Saving Tips</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Use LED bulbs instead of incandescent for 75% less energy
              </p>
              <p>
                • Unplug devices when not in use to avoid phantom power draw
              </p>
              <p>
                • Energy Star appliances can reduce consumption by 10-50%
              </p>
              <p>
                • Formula: Energy (kWh) = Power (kW) × Time (hours)
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default ElectricityCalculator;
