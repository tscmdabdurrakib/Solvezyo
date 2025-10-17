import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, RefreshCw, Network, Globe, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * IPSubnetCalculator Component
 * 
 * Calculate IP subnet masks, network addresses, and host ranges
 */
export function IPSubnetCalculator() {
  const { toast } = useToast();

  // State for input values
  const [ipAddress, setIpAddress] = useState<string>('192.168.1.1');
  const [subnetMask, setSubnetMask] = useState<string>('24');
  
  // State for calculated results
  const [networkAddress, setNetworkAddress] = useState<string>('');
  const [broadcastAddress, setBroadcastAddress] = useState<string>('');
  const [firstHost, setFirstHost] = useState<string>('');
  const [lastHost, setLastHost] = useState<string>('');
  const [totalHosts, setTotalHosts] = useState<number>(0);
  const [usableHosts, setUsableHosts] = useState<number>(0);
  const [subnetMaskDecimal, setSubnetMaskDecimal] = useState<string>('');
  const [wildcardMask, setWildcardMask] = useState<string>('');
  const [ipClass, setIpClass] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(true);

  // Calculate subnet when inputs change
  useEffect(() => {
    calculateSubnet();
  }, [ipAddress, subnetMask]);

  // Function to validate IP address
  const isValidIP = (ip: string): boolean => {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    
    return parts.every(part => {
      const num = parseInt(part);
      return num >= 0 && num <= 255 && part === num.toString();
    });
  };

  // Convert IP to binary
  const ipToBinary = (ip: string): number[] => {
    return ip.split('.').map(octet => parseInt(octet));
  };

  // Convert binary to IP
  const binaryToIp = (binary: number[]): string => {
    return binary.join('.');
  };

  // Get IP class
  const getIPClass = (firstOctet: number): string => {
    if (firstOctet >= 1 && firstOctet <= 126) return 'A';
    if (firstOctet >= 128 && firstOctet <= 191) return 'B';
    if (firstOctet >= 192 && firstOctet <= 223) return 'C';
    if (firstOctet >= 224 && firstOctet <= 239) return 'D (Multicast)';
    if (firstOctet >= 240 && firstOctet <= 255) return 'E (Experimental)';
    return 'Unknown';
  };

  // Calculate subnet mask in decimal notation
  const cidrToSubnetMask = (cidr: number): string => {
    const mask = [];
    for (let i = 0; i < 4; i++) {
      const n = Math.min(cidr, 8);
      mask.push((256 - Math.pow(2, 8 - n)).toString());
      cidr -= n;
    }
    return mask.join('.');
  };

  // Calculate wildcard mask
  const getWildcardMask = (subnetMask: string): string => {
    return subnetMask.split('.').map(octet => (255 - parseInt(octet)).toString()).join('.');
  };

  // Function to calculate subnet
  const calculateSubnet = () => {
    // Validate inputs
    if (!isValidIP(ipAddress)) {
      setIsValid(false);
      return;
    }

    const cidr = parseInt(subnetMask);
    if (isNaN(cidr) || cidr < 0 || cidr > 32) {
      setIsValid(false);
      return;
    }

    setIsValid(true);

    // Get IP octets
    const ipOctets = ipToBinary(ipAddress);
    
    // Get subnet mask in decimal
    const subnetMaskDec = cidrToSubnetMask(cidr);
    setSubnetMaskDecimal(subnetMaskDec);
    
    // Get wildcard mask
    const wildcard = getWildcardMask(subnetMaskDec);
    setWildcardMask(wildcard);
    
    // Get IP class
    setIpClass(getIPClass(ipOctets[0]));

    // Calculate network address
    const maskOctets = subnetMaskDec.split('.').map(o => parseInt(o));
    const networkOctets = ipOctets.map((octet, i) => octet & maskOctets[i]);
    setNetworkAddress(binaryToIp(networkOctets));

    // Calculate total hosts
    const hostBits = 32 - cidr;
    const totalHostsCount = Math.pow(2, hostBits);
    setTotalHosts(totalHostsCount);
    setUsableHosts(Math.max(0, totalHostsCount - 2));

    // Calculate broadcast address
    const wildcardOctets = wildcard.split('.').map(o => parseInt(o));
    const broadcastOctets = networkOctets.map((octet, i) => octet | wildcardOctets[i]);
    setBroadcastAddress(binaryToIp(broadcastOctets));

    // Calculate first and last host
    if (totalHostsCount > 2) {
      const firstHostOctets = [...networkOctets];
      firstHostOctets[3] += 1;
      setFirstHost(binaryToIp(firstHostOctets));

      const lastHostOctets = [...broadcastOctets];
      lastHostOctets[3] -= 1;
      setLastHost(binaryToIp(lastHostOctets));
    } else {
      setFirstHost('N/A');
      setLastHost('N/A');
    }
  };

  // Function to reset all values
  const handleReset = () => {
    setIpAddress('192.168.1.1');
    setSubnetMask('24');
  };

  // Copy result to clipboard
  const copyToClipboard = () => {
    const result = `IP Subnet Calculation:
IP Address: ${ipAddress}/${subnetMask}
Network Address: ${networkAddress}
Subnet Mask: ${subnetMaskDecimal}
Wildcard Mask: ${wildcardMask}
Broadcast Address: ${broadcastAddress}
First Host: ${firstHost}
Last Host: ${lastHost}
Total Hosts: ${totalHosts}
Usable Hosts: ${usableHosts}
IP Class: ${ipClass}`;

    navigator.clipboard.writeText(result);
    toast({
      title: "Copied!",
      description: "Subnet details copied to clipboard",
    });
  };

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">IP Subnet Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate network addresses, subnet masks, and host ranges for IP subnets
        </p>
      </div>

      <div className="grid gap-8 md:grid-cols-2">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Network className="mr-2 h-5 w-5" /> Network Details
          </h2>
          
          <div className="space-y-6">
            {/* IP Address */}
            <div>
              <Label htmlFor="ipAddress">IP Address</Label>
              <div className="relative mt-1.5">
                <Globe className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  id="ipAddress"
                  type="text"
                  className="pl-10"
                  value={ipAddress}
                  onChange={(e) => setIpAddress(e.target.value)}
                  placeholder="192.168.1.1"
                />
              </div>
              {!isValid && (
                <p className="text-sm text-red-500 mt-1">Invalid IP address</p>
              )}
            </div>

            {/* Subnet Mask (CIDR) */}
            <div>
              <Label htmlFor="subnetMask">Subnet Mask (CIDR Notation)</Label>
              <Select value={subnetMask} onValueChange={setSubnetMask}>
                <SelectTrigger className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 33 }, (_, i) => (
                    <SelectItem key={i} value={i.toString()}>
                      /{i} - {cidrToSubnetMask(i)}
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
                  <h2 className="text-xl font-semibold">Subnet Information</h2>
                  <Button onClick={copyToClipboard} variant="outline" size="sm">
                    <Copy className="h-4 w-4 mr-2" /> Copy
                  </Button>
                </div>
                
                {isValid ? (
                  <div className="space-y-3">
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Network Address</h3>
                      <div className="mt-1 text-lg font-bold">{networkAddress}/{subnetMask}</div>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Subnet Mask</h3>
                      <div className="mt-1 text-lg font-bold">{subnetMaskDecimal}</div>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Wildcard Mask</h3>
                      <div className="mt-1 text-lg font-bold">{wildcardMask}</div>
                    </div>

                    <div className="bg-muted/50 p-3 rounded-lg">
                      <h3 className="text-sm font-medium text-muted-foreground">Broadcast Address</h3>
                      <div className="mt-1 text-lg font-bold">{broadcastAddress}</div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">First Host</h3>
                        <div className="mt-1 text-sm font-bold">{firstHost}</div>
                      </div>
                      <div className="bg-muted/50 p-3 rounded-lg">
                        <h3 className="text-sm font-medium text-muted-foreground">Last Host</h3>
                        <div className="mt-1 text-sm font-bold">{lastHost}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                        <h3 className="text-sm font-medium text-blue-800 dark:text-blue-200">Total Hosts</h3>
                        <div className="mt-1 text-xl font-bold text-blue-600 dark:text-blue-400">{totalHosts.toLocaleString()}</div>
                      </div>
                      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950 dark:to-pink-950 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                        <h3 className="text-sm font-medium text-purple-800 dark:text-purple-200">Usable Hosts</h3>
                        <div className="mt-1 text-xl font-bold text-purple-600 dark:text-purple-400">{usableHosts.toLocaleString()}</div>
                      </div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950 dark:to-emerald-950 p-3 rounded-lg border border-green-200 dark:border-green-800">
                      <h3 className="text-sm font-medium text-green-800 dark:text-green-200">IP Class</h3>
                      <div className="mt-1 text-lg font-bold text-green-600 dark:text-green-400">{ipClass}</div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-muted-foreground py-8">
                    Please enter a valid IP address
                  </div>
                )}
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Information Card */}
          <Card className="p-6">
            <h3 className="font-semibold text-lg mb-3 flex items-center">
              <Shield className="mr-2 h-5 w-5" /> About Subnetting
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>
                • Subnetting divides large networks into smaller segments
              </p>
              <p>
                • CIDR notation (e.g., /24) specifies the number of network bits
              </p>
              <p>
                • Usable hosts = Total hosts - 2 (network + broadcast addresses)
              </p>
              <p>
                • Wildcard mask is the inverse of the subnet mask
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default IPSubnetCalculator;
