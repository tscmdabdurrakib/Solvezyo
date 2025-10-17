import ForceConverter from "@/tools/unit-conversion/force-converter";
import { Card } from "@/components/ui/card";

export default function ForceConverterPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Force Converter</h1>
      <p className="text-muted-foreground mb-8">
        Convert between different units of force including newtons, pounds-force, kilogram-force, and more.
      </p>
      
      <div className="mb-10">
        <ForceConverter />
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">About Force Conversion</h2>
        <div className="prose max-w-none">
          <p>
            Force is a push or pull that can cause an object with mass to accelerate. It is a vector quantity, having both magnitude and direction. The standard SI unit for force is the newton (N), which is defined as the force needed to accelerate one kilogram of mass at a rate of one meter per second squared.
          </p>
          
          <h3>Common Applications</h3>
          <ul>
            <li><strong>Physics and Engineering:</strong> Newtons are used in physics and engineering to measure forces in mechanical systems.</li>
            <li><strong>Construction and Structural Engineering:</strong> Kilonewtons and meganewtons are used for large-scale forces in construction.</li>
            <li><strong>American Engineering:</strong> Pounds-force and kips (kilopounds-force) are common in American engineering standards.</li>
            <li><strong>Weight Measurement:</strong> Kilogram-force and gram-force are used to express weight (which is technically a force) in relation to Earth's gravity.</li>
            <li><strong>Marine and Aviation:</strong> Specific force units may be used in specialized fields like marine engineering or aviation.</li>
          </ul>
          
          <h3>Force Conversion Formula</h3>
          <p>
            To convert between force units, we first convert the source unit to newtons, then convert from newtons to the target unit using the appropriate conversion factors. For example, to convert from pounds-force to newtons:
          </p>
          <ol>
            <li>1 pound-force = 4.44822 newtons</li>
          </ol>
          
          <h3>Understanding Force Units</h3>
          <p>
            Different force units have evolved for different contexts and disciplines:
          </p>
          <ul>
            <li><strong>Newton (N):</strong> The SI unit, used internationally in science and engineering.</li>
            <li><strong>Pound-force (lbf):</strong> The imperial/US customary unit, still common in American engineering.</li>
            <li><strong>Kilogram-force (kgf):</strong> A gravitational force unit representing the force exerted by Earth's gravity on one kilogram of mass.</li>
            <li><strong>Dyne:</strong> A small unit of force in the CGS system, sometimes used in scientific contexts.</li>
          </ul>
          
          <p>
            Our Force Converter tool makes it easy to convert between these different units, helping you work across different standards, disciplines, and measurement systems.
          </p>
        </div>
      </Card>
    </div>
  );
}
