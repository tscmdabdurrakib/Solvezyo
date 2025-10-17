import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Copy, RefreshCw, Box } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * VolumeCalculator Component
 * 
 * Calculates volumes of various 3D shapes:
 * - Cube, Rectangular Prism, Cylinder, Sphere, Cone, Pyramid
 */
export function VolumeCalculator() {
  const [shape, setShape] = useState<string>('cube');
  
  // Cube
  const [cubeSide, setCubeSide] = useState<string>('5');
  const [cubeVolume, setCubeVolume] = useState<number>(0);
  
  // Rectangular Prism
  const [prismLength, setPrismLength] = useState<string>('5');
  const [prismWidth, setPrismWidth] = useState<string>('4');
  const [prismHeight, setPrismHeight] = useState<string>('3');
  const [prismVolume, setPrismVolume] = useState<number>(0);
  
  // Cylinder
  const [cylinderRadius, setCylinderRadius] = useState<string>('3');
  const [cylinderHeight, setCylinderHeight] = useState<string>('5');
  const [cylinderVolume, setCylinderVolume] = useState<number>(0);
  
  // Sphere
  const [sphereRadius, setSphereRadius] = useState<string>('4');
  const [sphereVolume, setSphereVolume] = useState<number>(0);
  
  // Cone
  const [coneRadius, setConeRadius] = useState<string>('3');
  const [coneHeight, setConeHeight] = useState<string>('6');
  const [coneVolume, setConeVolume] = useState<number>(0);
  
  // Pyramid
  const [pyramidBase, setPyramidBase] = useState<string>('4');
  const [pyramidHeight, setPyramidHeight] = useState<string>('5');
  const [pyramidVolume, setPyramidVolume] = useState<number>(0);
  
  const { toast } = useToast();

  // Calculate Cube Volume: V = a³
  useEffect(() => {
    const a = parseFloat(cubeSide) || 0;
    setCubeVolume(Math.pow(a, 3));
  }, [cubeSide]);

  // Calculate Rectangular Prism Volume: V = l × w × h
  useEffect(() => {
    const l = parseFloat(prismLength) || 0;
    const w = parseFloat(prismWidth) || 0;
    const h = parseFloat(prismHeight) || 0;
    setPrismVolume(l * w * h);
  }, [prismLength, prismWidth, prismHeight]);

  // Calculate Cylinder Volume: V = π × r² × h
  useEffect(() => {
    const r = parseFloat(cylinderRadius) || 0;
    const h = parseFloat(cylinderHeight) || 0;
    setCylinderVolume(Math.PI * Math.pow(r, 2) * h);
  }, [cylinderRadius, cylinderHeight]);

  // Calculate Sphere Volume: V = (4/3) × π × r³
  useEffect(() => {
    const r = parseFloat(sphereRadius) || 0;
    setSphereVolume((4 / 3) * Math.PI * Math.pow(r, 3));
  }, [sphereRadius]);

  // Calculate Cone Volume: V = (1/3) × π × r² × h
  useEffect(() => {
    const r = parseFloat(coneRadius) || 0;
    const h = parseFloat(coneHeight) || 0;
    setConeVolume((1 / 3) * Math.PI * Math.pow(r, 2) * h);
  }, [coneRadius, coneHeight]);

  // Calculate Pyramid Volume: V = (1/3) × base² × h
  useEffect(() => {
    const b = parseFloat(pyramidBase) || 0;
    const h = parseFloat(pyramidHeight) || 0;
    setPyramidVolume((1 / 3) * Math.pow(b, 2) * h);
  }, [pyramidBase, pyramidHeight]);

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
    setCubeSide('5');
    setPrismLength('5');
    setPrismWidth('4');
    setPrismHeight('3');
    setCylinderRadius('3');
    setCylinderHeight('5');
    setSphereRadius('4');
    setConeRadius('3');
    setConeHeight('6');
    setPyramidBase('4');
    setPyramidHeight('5');
  };

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold tracking-tight">Volume Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate volumes of various 3D shapes
        </p>
      </div>

      <div className="grid gap-6">
        {/* Input Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Box className="mr-2 h-5 w-5" /> Select Shape
          </h2>
          
          <Tabs value={shape} onValueChange={setShape} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="cube">Cube</TabsTrigger>
              <TabsTrigger value="prism">Prism</TabsTrigger>
              <TabsTrigger value="cylinder">Cylinder</TabsTrigger>
            </TabsList>
            <TabsList className="grid w-full grid-cols-3 mt-2">
              <TabsTrigger value="sphere">Sphere</TabsTrigger>
              <TabsTrigger value="cone">Cone</TabsTrigger>
              <TabsTrigger value="pyramid">Pyramid</TabsTrigger>
            </TabsList>
            
            {/* Cube */}
            <TabsContent value="cube" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="cubeSide">Side Length</Label>
                <Input
                  id="cubeSide"
                  type="number"
                  min="0"
                  step="0.01"
                  value={cubeSide}
                  onChange={(e) => setCubeSide(e.target.value)}
                  placeholder="Enter side length"
                  className="mt-2"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Volume</h3>
                    <div className="text-4xl font-bold">
                      {cubeVolume.toFixed(2)} cubic units
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formula: V = a³
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(cubeVolume.toFixed(2), 'Cube Volume')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Rectangular Prism */}
            <TabsContent value="prism" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-3">
                <div>
                  <Label htmlFor="prismLength">Length</Label>
                  <Input
                    id="prismLength"
                    type="number"
                    min="0"
                    step="0.01"
                    value={prismLength}
                    onChange={(e) => setPrismLength(e.target.value)}
                    placeholder="Length"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="prismWidth">Width</Label>
                  <Input
                    id="prismWidth"
                    type="number"
                    min="0"
                    step="0.01"
                    value={prismWidth}
                    onChange={(e) => setPrismWidth(e.target.value)}
                    placeholder="Width"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="prismHeight">Height</Label>
                  <Input
                    id="prismHeight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={prismHeight}
                    onChange={(e) => setPrismHeight(e.target.value)}
                    placeholder="Height"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Volume</h3>
                    <div className="text-4xl font-bold">
                      {prismVolume.toFixed(2)} cubic units
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formula: V = l × w × h
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(prismVolume.toFixed(2), 'Prism Volume')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Cylinder */}
            <TabsContent value="cylinder" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="cylinderRadius">Radius</Label>
                  <Input
                    id="cylinderRadius"
                    type="number"
                    min="0"
                    step="0.01"
                    value={cylinderRadius}
                    onChange={(e) => setCylinderRadius(e.target.value)}
                    placeholder="Radius"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="cylinderHeight">Height</Label>
                  <Input
                    id="cylinderHeight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={cylinderHeight}
                    onChange={(e) => setCylinderHeight(e.target.value)}
                    placeholder="Height"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Volume</h3>
                    <div className="text-4xl font-bold">
                      {cylinderVolume.toFixed(2)} cubic units
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formula: V = π × r² × h
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(cylinderVolume.toFixed(2), 'Cylinder Volume')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Sphere */}
            <TabsContent value="sphere" className="space-y-4 mt-4">
              <div>
                <Label htmlFor="sphereRadius">Radius</Label>
                <Input
                  id="sphereRadius"
                  type="number"
                  min="0"
                  step="0.01"
                  value={sphereRadius}
                  onChange={(e) => setSphereRadius(e.target.value)}
                  placeholder="Radius"
                  className="mt-2"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Volume</h3>
                    <div className="text-4xl font-bold">
                      {sphereVolume.toFixed(2)} cubic units
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formula: V = (4/3) × π × r³
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(sphereVolume.toFixed(2), 'Sphere Volume')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Cone */}
            <TabsContent value="cone" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="coneRadius">Radius</Label>
                  <Input
                    id="coneRadius"
                    type="number"
                    min="0"
                    step="0.01"
                    value={coneRadius}
                    onChange={(e) => setConeRadius(e.target.value)}
                    placeholder="Radius"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="coneHeight">Height</Label>
                  <Input
                    id="coneHeight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={coneHeight}
                    onChange={(e) => setConeHeight(e.target.value)}
                    placeholder="Height"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/30 dark:to-pink-950/30 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Volume</h3>
                    <div className="text-4xl font-bold">
                      {coneVolume.toFixed(2)} cubic units
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formula: V = (1/3) × π × r² × h
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(coneVolume.toFixed(2), 'Cone Volume')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
            
            {/* Pyramid */}
            <TabsContent value="pyramid" className="space-y-4 mt-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <Label htmlFor="pyramidBase">Base Side</Label>
                  <Input
                    id="pyramidBase"
                    type="number"
                    min="0"
                    step="0.01"
                    value={pyramidBase}
                    onChange={(e) => setPyramidBase(e.target.value)}
                    placeholder="Base side"
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label htmlFor="pyramidHeight">Height</Label>
                  <Input
                    id="pyramidHeight"
                    type="number"
                    min="0"
                    step="0.01"
                    value={pyramidHeight}
                    onChange={(e) => setPyramidHeight(e.target.value)}
                    placeholder="Height"
                    className="mt-2"
                  />
                </div>
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-lg"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-2">Volume</h3>
                    <div className="text-4xl font-bold">
                      {pyramidVolume.toFixed(2)} cubic units
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">
                      Formula: V = (1/3) × base² × h
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(pyramidVolume.toFixed(2), 'Pyramid Volume')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>

          <Button onClick={handleReset} variant="outline" className="w-full mt-4">
            <RefreshCw className="mr-2 h-4 w-4" /> Reset All
          </Button>
        </Card>

        {/* Information Section */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">About Volume Calculations</h2>
          
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Common Shapes</h3>
              <p className="text-muted-foreground text-sm">
                Calculate volumes for the most common 3D geometric shapes including cube, prism, cylinder, sphere, cone, and pyramid.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Accurate Formulas</h3>
              <p className="text-muted-foreground text-sm">
                All calculations use standard geometric formulas with precise mathematical constants like π for circular shapes.
              </p>
            </div>
            
            <div>
              <h3 className="font-medium text-lg mb-2">Real-World Applications</h3>
              <p className="text-muted-foreground text-sm">
                Useful for engineering, construction, physics, chemistry, and everyday calculations involving 3D measurements.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default VolumeCalculator;
