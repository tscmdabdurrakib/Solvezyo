import EnergyConverter from "@/tools/unit-conversion/energy-converter";
import { Card } from "@/components/ui/card";

export default function EnergyConverterPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Energy Converter</h1>
      <p className="text-muted-foreground mb-8">
        Convert between different units of energy including joules, calories, kilowatt-hours, and more.
      </p>
      
      <div className="mb-10">
        <EnergyConverter />
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">About Energy Conversion</h2>
        <div className="prose max-w-none">
          <p>
            Energy is the capacity to do work and is measured in various units depending on the context. The standard SI unit for energy is the joule (J), but other units like calories, kilowatt-hours, and BTUs are commonly used in different fields.
          </p>
          
          <h3>Common Applications</h3>
          <ul>
            <li><strong>Scientific Research:</strong> Joules and ergs are used to measure energy in scientific experiments.</li>
            <li><strong>Electricity:</strong> Kilowatt-hours (kWh) are used to measure electrical energy consumption in homes and businesses.</li>
            <li><strong>Nutrition:</strong> Calories (technically kilocalories) are used to measure the energy content of food.</li>
            <li><strong>Heating and Cooling:</strong> BTUs (British Thermal Units) are commonly used in HVAC systems.</li>
            <li><strong>Nuclear Energy:</strong> Electron volts (eV) are used for atomic-scale energy measurements.</li>
          </ul>
          
          <h3>Energy Conversion Formula</h3>
          <p>
            Energy conversion follows the principle of energy conservation. To convert between energy units, we first convert the source unit to joules, then convert from joules to the target unit using the appropriate conversion factors.
          </p>
          
          <h3>Why Energy Units Matter</h3>
          <p>
            Different energy units are optimized for different scales and contexts:
          </p>
          <ul>
            <li>Small-scale physics uses joules or even smaller units like electron volts.</li>
            <li>Human-scale energy consumption typically uses kilowatt-hours or megajoules.</li>
            <li>Industrial applications might use gigajoules or therms.</li>
            <li>Nutritional information uses kilocalories (often just called calories).</li>
          </ul>
          
          <p>
            Our Energy Converter tool makes it easy to convert between these different units, ensuring you can work with energy measurements regardless of the context or field.
          </p>
        </div>
      </Card>
    </div>
  );
}
