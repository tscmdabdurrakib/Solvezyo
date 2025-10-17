import PowerConverter from "@/tools/unit-conversion/power-converter";
import { Card } from "@/components/ui/card";

export default function PowerConverterPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Power Converter</h1>
      <p className="text-muted-foreground mb-8">
        Convert between different units of power including watts, horsepower, BTU/hour, and more.
      </p>
      
      <div className="mb-10">
        <PowerConverter />
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">About Power Conversion</h2>
        <div className="prose max-w-none">
          <p>
            Power is the rate at which energy is transferred, used, or transformed. It represents how quickly work is being done or energy is being converted. The standard SI unit for power is the watt (W), which equals one joule per second (J/s).
          </p>
          
          <h3>Common Applications</h3>
          <ul>
            <li><strong>Electrical Systems:</strong> Watts and kilowatts measure the rate of electrical energy conversion in appliances and devices.</li>
            <li><strong>Mechanical Systems:</strong> Horsepower typically measures the power output of engines and motors.</li>
            <li><strong>HVAC Systems:</strong> BTU per hour measures heating and cooling capacity.</li>
            <li><strong>Industrial Equipment:</strong> Kilowatts and megawatts measure large-scale power generation and consumption.</li>
            <li><strong>Physics:</strong> Ergs per second and foot-pounds per second are used in specific scientific contexts.</li>
          </ul>
          
          <h3>Power Conversion Formula</h3>
          <p>
            To convert between power units, we first convert the source unit to watts, then convert from watts to the target unit using the appropriate conversion factors. For example, to convert from horsepower to kilowatts:
          </p>
          <ol>
            <li>1 horsepower = 745.7 watts</li>
            <li>745.7 watts = 0.7457 kilowatts</li>
          </ol>
          
          <h3>Why Power Units Matter</h3>
          <p>
            Different power units are optimized for different contexts and historical traditions:
          </p>
          <ul>
            <li>Electrical applications generally use watts, kilowatts, and megawatts.</li>
            <li>Mechanical applications often use horsepower, especially for engines and motors in the US.</li>
            <li>HVAC systems typically use BTU per hour for heating and cooling capacity.</li>
            <li>International scientific work uses watts and its SI derivatives.</li>
          </ul>
          
          <p>
            Our Power Converter tool makes it easy to convert between these different units, ensuring you can work with power measurements across various fields and applications.
          </p>
        </div>
      </Card>
    </div>
  );
}
