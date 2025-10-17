import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Wifi, HardDrive } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * BandwidthCalculator Component
 * 
 * Calculates download/upload time and data transfer rates
 */
export function BandwidthCalculator() {
  const [fileSize, setFileSize] = useState<string>('1');
  const [fileSizeUnit, setFileSizeUnit] = useState<string>('GB');
  const [bandwidth, setBandwidth] = useState<string>('100');
  const [bandwidthUnit, setBandwidthUnit] = useState<string>('Mbps');

  // Results
  const [downloadTime, setDownloadTime] = useState<number>(0);
  const [timeFormatted, setTimeFormatted] = useState<string>('');
  const [dataPerSecond, setDataPerSecond] = useState<number>(0);
  const [dataPerMinute, setDataPerMinute] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    calculateBandwidth();
  }, [fileSize, fileSizeUnit, bandwidth, bandwidthUnit]);

  const calculateBandwidth = () => {
    const size = parseFloat(fileSize) || 0;
    const bw = parseFloat(bandwidth) || 0;

    // Convert file size to megabits (Mb)
    let fileSizeMb = 0;
    switch (fileSizeUnit) {
      case 'KB':
        fileSizeMb = size * 0.008; // KB to Mb
        break;
      case 'MB':
        fileSizeMb = size * 8; // MB to Mb
        break;
      case 'GB':
        fileSizeMb = size * 8 * 1024; // GB to Mb
        break;
      case 'TB':
        fileSizeMb = size * 8 * 1024 * 1024; // TB to Mb
        break;
    }

    // Convert bandwidth to Mbps
    let bandwidthMbps = 0;
    switch (bandwidthUnit) {
      case 'Kbps':
        bandwidthMbps = bw / 1024;
        break;
      case 'Mbps':
        bandwidthMbps = bw;
        break;
      case 'Gbps':
        bandwidthMbps = bw * 1024;
        break;
    }

    // Calculate download time in seconds
    const timeSeconds = bandwidthMbps > 0 ? fileSizeMb / bandwidthMbps : 0;
    setDownloadTime(timeSeconds);

    // Format time
    const formatted = formatTime(timeSeconds);
    setTimeFormatted(formatted);

    // Calculate data transfer rates
    // Data per second in MB
    const mbPerSecond = (bandwidthMbps / 8);
    setDataPerSecond(mbPerSecond);
    setDataPerMinute(mbPerSecond * 60);
  };

  const formatTime = (seconds: number): string => {
    if (seconds < 1) {
      return `${(seconds * 1000).toFixed(0)} milliseconds`;
    } else if (seconds < 60) {
      return `${seconds.toFixed(1)} seconds`;
    } else if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      const secs = Math.floor(seconds % 60);
      return `${mins} min ${secs} sec`;
    } else if (seconds < 86400) {
      const hours = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      return `${hours} hr ${mins} min`;
    } else {
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      return `${days} day${days > 1 ? 's' : ''} ${hours} hr`;
    }
  };

  const copyToClipboard = (value: string, label: string) => {
    navigator.clipboard.writeText(value);
    toast({
      title: "Copied!",
      description: `${label} copied to clipboard`,
    });
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Bandwidth Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate download time and data transfer rates
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <HardDrive className="mr-2 h-5 w-5" /> File Size
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="fileSize">File Size</Label>
              <Input
                id="fileSize"
                type="number"
                value={fileSize}
                onChange={(e) => setFileSize(e.target.value)}
                placeholder="1"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="fileSizeUnit">Unit</Label>
              <Select value={fileSizeUnit} onValueChange={setFileSizeUnit}>
                <SelectTrigger id="fileSizeUnit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="KB">Kilobytes (KB)</SelectItem>
                  <SelectItem value="MB">Megabytes (MB)</SelectItem>
                  <SelectItem value="GB">Gigabytes (GB)</SelectItem>
                  <SelectItem value="TB">Terabytes (TB)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Wifi className="mr-2 h-5 w-5" /> Connection Speed
          </h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="bandwidth">Bandwidth</Label>
              <Input
                id="bandwidth"
                type="number"
                value={bandwidth}
                onChange={(e) => setBandwidth(e.target.value)}
                placeholder="100"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="bandwidthUnit">Unit</Label>
              <Select value={bandwidthUnit} onValueChange={setBandwidthUnit}>
                <SelectTrigger id="bandwidthUnit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Kbps">Kbps (Kilobits per second)</SelectItem>
                  <SelectItem value="Mbps">Mbps (Megabits per second)</SelectItem>
                  <SelectItem value="Gbps">Gbps (Gigabits per second)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Results Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Results</h2>
            
            <div className="grid gap-4 md:grid-cols-2">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-6 rounded-lg md:col-span-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Download Time</h3>
                    <div className="text-4xl font-bold">
                      {timeFormatted}
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Time to download {fileSize} {fileSizeUnit} at {bandwidth} {bandwidthUnit}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(timeFormatted, 'Download Time')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Data per Second</h3>
                    <div className="text-2xl font-bold">
                      {dataPerSecond.toFixed(2)} MB/s
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Transfer rate
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${dataPerSecond.toFixed(2)} MB/s`, 'Data per Second')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Data per Minute</h3>
                    <div className="text-2xl font-bold">
                      {dataPerMinute.toFixed(2)} MB
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Transfer per minute
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${dataPerMinute.toFixed(2)} MB`, 'Data per Minute')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Information */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Understanding Bandwidth</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Bits vs Bytes</h3>
              <p className="text-muted-foreground text-sm">
                Internet speeds are measured in bits per second (bps), while file sizes use bytes. 1 byte = 8 bits.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Real-World Speeds</h3>
              <p className="text-muted-foreground text-sm">
                Actual download speeds are often lower than advertised due to network overhead, congestion, and connection quality.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Common Speeds</h3>
              <p className="text-muted-foreground text-sm">
                DSL: 1-100 Mbps, Cable: 10-500 Mbps, Fiber: 100-10,000 Mbps. 5G can reach 1-10 Gbps.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default BandwidthCalculator;
