import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Clock, Globe } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * TimeZoneCalculator Component
 * 
 * Convert times between different time zones with real-time display
 */
export function TimeZoneCalculator() {
  const { toast } = useToast();

  // Common time zones with UTC offsets
  const timeZones = [
    { name: 'UTC', offset: 0, label: 'UTC (Coordinated Universal Time)' },
    { name: 'EST', offset: -5, label: 'EST (Eastern Standard Time)' },
    { name: 'CST', offset: -6, label: 'CST (Central Standard Time)' },
    { name: 'MST', offset: -7, label: 'MST (Mountain Standard Time)' },
    { name: 'PST', offset: -8, label: 'PST (Pacific Standard Time)' },
    { name: 'GMT', offset: 0, label: 'GMT (Greenwich Mean Time)' },
    { name: 'CET', offset: 1, label: 'CET (Central European Time)' },
    { name: 'EET', offset: 2, label: 'EET (Eastern European Time)' },
    { name: 'IST', offset: 5.5, label: 'IST (India Standard Time)' },
    { name: 'CST-China', offset: 8, label: 'CST (China Standard Time)' },
    { name: 'JST', offset: 9, label: 'JST (Japan Standard Time)' },
    { name: 'AEST', offset: 10, label: 'AEST (Australian Eastern Standard Time)' },
    { name: 'NZST', offset: 12, label: 'NZST (New Zealand Standard Time)' },
  ];

  // State for inputs
  const [sourceTime, setSourceTime] = useState<string>('12:00');
  const [sourceDate, setSourceDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [sourceTimezone, setSourceTimezone] = useState<string>('UTC');
  const [targetTimezone, setTargetTimezone] = useState<string>('EST');
  
  // State for results
  const [convertedTime, setConvertedTime] = useState<string>('');
  const [convertedDate, setConvertedDate] = useState<string>('');
  const [timeDifference, setTimeDifference] = useState<number>(0);

  // Calculate converted time when inputs change
  useEffect(() => {
    convertTime();
  }, [sourceTime, sourceDate, sourceTimezone, targetTimezone]);

  // Function to convert time between time zones
  const convertTime = () => {
    const sourceZone = timeZones.find(tz => tz.name === sourceTimezone);
    const targetZone = timeZones.find(tz => tz.name === targetTimezone);
    
    if (!sourceZone || !targetZone) return;

    // Parse source time
    const [hours, minutes] = sourceTime.split(':').map(Number);
    const sourceDateTime = new Date(sourceDate);
    sourceDateTime.setHours(hours, minutes, 0, 0);

    // Convert to UTC first (subtract source offset)
    const utcTime = new Date(sourceDateTime.getTime() - sourceZone.offset * 60 * 60 * 1000);
    
    // Convert from UTC to target timezone (add target offset)
    const targetDateTime = new Date(utcTime.getTime() + targetZone.offset * 60 * 60 * 1000);

    // Format the result
    const targetHours = targetDateTime.getUTCHours().toString().padStart(2, '0');
    const targetMinutes = targetDateTime.getUTCMinutes().toString().padStart(2, '0');
    
    setConvertedTime(`${targetHours}:${targetMinutes}`);
    setConvertedDate(targetDateTime.toISOString().split('T')[0]);
    setTimeDifference(targetZone.offset - sourceZone.offset);
  };

  // Function to reset all values
  const handleReset = () => {
    setSourceTime('12:00');
    setSourceDate(new Date().toISOString().split('T')[0]);
    setSourceTimezone('UTC');
    setTargetTimezone('EST');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const sourceZoneName = timeZones.find(tz => tz.name === sourceTimezone)?.label;
    const targetZoneName = timeZones.find(tz => tz.name === targetTimezone)?.label;
    
    const result = `Time Zone Conversion:
Source: ${sourceTime} on ${sourceDate} (${sourceZoneName})
Target: ${convertedTime} on ${convertedDate} (${targetZoneName})
Time Difference: ${timeDifference >= 0 ? '+' : ''}${timeDifference} hours`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Time zone conversion copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Time Zone Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Convert times between different time zones around the world
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Clock className="mr-2 h-5 w-5" /> Source Time
          </h2>
          
          <div className="space-y-6">
            {/* Source Time */}
            <div>
              <Label htmlFor="sourceTime">Time</Label>
              <div className="relative mt-1.5">
                <Clock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="sourceTime"
                  type="time"
                  className="pl-10"
                  value={sourceTime}
                  onChange={(e) => setSourceTime(e.target.value)}
                />
              </div>
            </div>

            {/* Source Date */}
            <div>
              <Label htmlFor="sourceDate">Date</Label>
              <Input
                id="sourceDate"
                type="date"
                className="mt-1.5"
                value={sourceDate}
                onChange={(e) => setSourceDate(e.target.value)}
              />
            </div>

            {/* Source Timezone */}
            <div>
              <Label htmlFor="sourceTimezone">Source Time Zone</Label>
              <Select value={sourceTimezone} onValueChange={setSourceTimezone}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeZones.map((tz) => (
                    <SelectItem key={tz.name} value={tz.name}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Target Timezone */}
            <div>
              <Label htmlFor="targetTimezone">Target Time Zone</Label>
              <Select value={targetTimezone} onValueChange={setTargetTimezone}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {timeZones.map((tz) => (
                    <SelectItem key={tz.name} value={tz.name}>
                      {tz.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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
                  <h2 className="text-xl font-semibold flex items-center">
                    <Globe className="mr-2 h-5 w-5" /> Converted Time
                  </h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-6 rounded-lg border border-blue-200 dark:border-blue-800">
                    <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
                      Target Time
                    </h3>
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400">
                      {convertedTime}
                    </div>
                    <div className="text-lg text-blue-700 dark:text-blue-300 mt-2">
                      {convertedDate}
                    </div>
                  </div>
                  
                  <div className="bg-muted/50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-muted-foreground">Time Difference</h3>
                    <div className="mt-1 text-2xl font-bold">
                      {timeDifference >= 0 ? '+' : ''}{timeDifference} hours
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
                    <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200 mb-2">
                      Summary
                    </h3>
                    <div className="text-sm space-y-1">
                      <p>
                        <strong>From:</strong> {sourceTime} on {sourceDate}
                      </p>
                      <p>
                        <strong>To:</strong> {convertedTime} on {convertedDate}
                      </p>
                      <p>
                        <strong>Zone:</strong> {timeZones.find(tz => tz.name === sourceTimezone)?.name} → {timeZones.find(tz => tz.name === targetTimezone)?.name}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3">About Time Zones</h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Time zones are regions that observe a uniform standard time
              </p>
              <p>
                • UTC is the primary time standard used worldwide
              </p>
              <p>
                • Some regions observe Daylight Saving Time (not reflected here)
              </p>
              <p>
                • The date may change when converting across time zones
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default TimeZoneCalculator;
