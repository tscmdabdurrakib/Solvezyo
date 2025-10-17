import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Copy, Grid3x3 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

/**
 * TileCalculator Component
 * 
 * Calculates number of tiles needed for flooring or wall projects
 */
export function TileCalculator() {
  // Room dimensions
  const [roomLength, setRoomLength] = useState<string>('12');
  const [roomWidth, setRoomWidth] = useState<string>('10');
  const [unit, setUnit] = useState<string>('feet');

  // Tile dimensions
  const [tileLength, setTileLength] = useState<string>('12');
  const [tileWidth, setTileWidth] = useState<string>('12');
  const [tileUnit, setTileUnit] = useState<string>('inches');

  // Waste and pricing
  const [wastePercentage, setWastePercentage] = useState<string>('10');
  const [pricePerTile, setPricePerTile] = useState<string>('2.50');

  // Results
  const [roomArea, setRoomArea] = useState<number>(0);
  const [tileArea, setTileArea] = useState<number>(0);
  const [tilesNeeded, setTilesNeeded] = useState<number>(0);
  const [totalTiles, setTotalTiles] = useState<number>(0);
  const [totalCost, setTotalCost] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    calculateTiles();
  }, [roomLength, roomWidth, unit, tileLength, tileWidth, tileUnit, wastePercentage, pricePerTile]);

  const calculateTiles = () => {
    const rl = parseFloat(roomLength) || 0;
    const rw = parseFloat(roomWidth) || 0;
    const tl = parseFloat(tileLength) || 0;
    const tw = parseFloat(tileWidth) || 0;
    const waste = parseFloat(wastePercentage) || 0;
    const price = parseFloat(pricePerTile) || 0;

    // Convert room dimensions to square feet
    let roomSqFt = 0;
    if (unit === 'feet') {
      roomSqFt = rl * rw;
    } else if (unit === 'meters') {
      roomSqFt = (rl * rw) * 10.764; // Convert m² to ft²
    }
    setRoomArea(roomSqFt);

    // Convert tile dimensions to square feet
    let tileSqFt = 0;
    if (tileUnit === 'inches') {
      tileSqFt = (tl * tw) / 144; // Convert in² to ft²
    } else if (tileUnit === 'centimeters') {
      tileSqFt = (tl * tw) / 929.03; // Convert cm² to ft²
    } else if (tileUnit === 'feet') {
      tileSqFt = tl * tw;
    }
    setTileArea(tileSqFt);

    // Calculate tiles needed (without waste)
    const tiles = tileSqFt > 0 ? roomSqFt / tileSqFt : 0;
    setTilesNeeded(tiles);

    // Calculate total tiles (with waste)
    const total = Math.ceil(tiles * (1 + waste / 100));
    setTotalTiles(total);

    // Calculate total cost
    const cost = total * price;
    setTotalCost(cost);
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
        <h1 className="text-3xl font-bold tracking-tight">Tile Calculator</h1>
        <p className="text-muted-foreground mt-2">
          Calculate tiles needed for your flooring or wall project
        </p>
      </div>

      <div className="grid gap-6">
        {/* Room Dimensions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center">
            <Grid3x3 className="mr-2 h-5 w-5" /> Room Dimensions
          </h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="roomLength">Length</Label>
              <Input
                id="roomLength"
                type="number"
                value={roomLength}
                onChange={(e) => setRoomLength(e.target.value)}
                placeholder="12"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="roomWidth">Width</Label>
              <Input
                id="roomWidth"
                type="number"
                value={roomWidth}
                onChange={(e) => setRoomWidth(e.target.value)}
                placeholder="10"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="unit">Unit</Label>
              <Select value={unit} onValueChange={setUnit}>
                <SelectTrigger id="unit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="feet">Feet</SelectItem>
                  <SelectItem value="meters">Meters</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Room Area:</div>
            <div className="text-xl font-bold">{roomArea.toFixed(2)} sq ft</div>
          </div>
        </Card>

        {/* Tile Dimensions */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Tile Dimensions</h2>
          
          <div className="grid gap-4 md:grid-cols-3">
            <div>
              <Label htmlFor="tileLength">Tile Length</Label>
              <Input
                id="tileLength"
                type="number"
                value={tileLength}
                onChange={(e) => setTileLength(e.target.value)}
                placeholder="12"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="tileWidth">Tile Width</Label>
              <Input
                id="tileWidth"
                type="number"
                value={tileWidth}
                onChange={(e) => setTileWidth(e.target.value)}
                placeholder="12"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="tileUnit">Unit</Label>
              <Select value={tileUnit} onValueChange={setTileUnit}>
                <SelectTrigger id="tileUnit" className="mt-2">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="inches">Inches</SelectItem>
                  <SelectItem value="centimeters">Centimeters</SelectItem>
                  <SelectItem value="feet">Feet</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4 p-3 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground">Tile Area:</div>
            <div className="text-xl font-bold">{tileArea.toFixed(4)} sq ft per tile</div>
          </div>
        </Card>

        {/* Additional Options */}
        <Card className="p-6">
          <h2 className="text-xl font-semibold mb-4">Additional Options</h2>
          
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="waste">Waste Allowance (%)</Label>
              <Input
                id="waste"
                type="number"
                value={wastePercentage}
                onChange={(e) => setWastePercentage(e.target.value)}
                placeholder="10"
                className="mt-2"
              />
            </div>

            <div>
              <Label htmlFor="price">Price per Tile ($)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                value={pricePerTile}
                onChange={(e) => setPricePerTile(e.target.value)}
                placeholder="2.50"
                className="mt-2"
              />
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
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Tiles Needed (No Waste)</h3>
                    <div className="text-2xl font-bold">
                      {Math.ceil(tilesNeeded)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Exact: {tilesNeeded.toFixed(1)} tiles
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(Math.ceil(tilesNeeded).toString(), 'Tiles Needed')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 p-4 rounded-lg">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Total Tiles to Buy</h3>
                    <div className="text-2xl font-bold">
                      {totalTiles}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Includes {wastePercentage}% waste
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(totalTiles.toString(), 'Total Tiles')}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 p-4 rounded-lg md:col-span-2">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-sm font-medium text-muted-foreground mb-1">Estimated Total Cost</h3>
                    <div className="text-3xl font-bold">
                      ${totalCost.toFixed(2)}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {totalTiles} tiles × ${pricePerTile} per tile
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`$${totalCost.toFixed(2)}`, 'Total Cost')}
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
          <h2 className="text-xl font-semibold mb-4">Tiling Tips</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div>
              <h3 className="font-medium text-lg mb-2">Waste Factor</h3>
              <p className="text-muted-foreground text-sm">
                Add 10% for simple layouts, 15% for diagonal patterns, and 20% for complex designs with many cuts.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Ordering Extra</h3>
              <p className="text-muted-foreground text-sm">
                Always order extra tiles from the same batch for future repairs, as colors may vary between batches.
              </p>
            </div>
            <div>
              <h3 className="font-medium text-lg mb-2">Grout Lines</h3>
              <p className="text-muted-foreground text-sm">
                This calculator doesn't account for grout lines. For large tiles with wide grout lines, add extra tiles.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TileCalculator;
