import AngleConverter from "@/tools/unit-conversion/angle-converter";
import { Card } from "@/components/ui/card";

export default function AngleConverterPage() {
  return (
    <div className="container mx-auto py-8 px-4 sm:px-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-2">Angle Converter</h1>
      <p className="text-muted-foreground mb-8">
        Convert between different units of angle measurement including degrees, radians, gradians, and more.
      </p>
      
      <div className="mb-10">
        <AngleConverter />
      </div>

      <Card className="p-6 mb-8">
        <h2 className="text-2xl font-bold mb-4">About Angle Conversion</h2>
        <div className="prose max-w-none">
          <p>
            Angles measure the amount of rotation or the space between two intersecting lines or planes. The concept of angles is fundamental to geometry, trigonometry, navigation, physics, engineering, and many other fields. Various units have been developed to measure angles for different applications.
          </p>
          
          <h3>Common Applications</h3>
          <ul>
            <li><strong>Mathematics and Science:</strong> Radians are the standard unit in calculus, physics, and advanced mathematics due to their natural mathematical properties.</li>
            <li><strong>Engineering and Construction:</strong> Degrees are widely used in engineering, construction, and everyday applications.</li>
            <li><strong>Navigation and Geography:</strong> Degrees, minutes, and seconds (DMS) are used in navigation, cartography, and GPS systems.</li>
            <li><strong>Astronomy:</strong> Hour angles and arc measures are used to describe celestial positions and movements.</li>
            <li><strong>Military and Surveying:</strong> Mils and gradians are used in artillery, surveying, and certain specialized fields.</li>
          </ul>
          
          <h3>Angle Conversion Formula</h3>
          <p>
            To convert between angle units, we first convert the source unit to radians, then convert from radians to the target unit using the appropriate conversion factors. For example, to convert from degrees to radians:
          </p>
          <ol>
            <li>Degrees to radians: multiply by π/180</li>
            <li>Radians to degrees: multiply by 180/π</li>
          </ol>
          
          <h3>Understanding Angle Measurements</h3>
          <p>
            Different angle units divide a full circle in different ways:
          </p>
          <ul>
            <li><strong>Degrees:</strong> A full circle is 360°, derived from ancient Babylonian astronomy.</li>
            <li><strong>Radians:</strong> A full circle is 2π radians (≈ 6.28318 radians), based on the radius of a circle.</li>
            <li><strong>Gradians:</strong> A full circle is 400 gradians, making a right angle exactly 100 gradians.</li>
            <li><strong>Turns:</strong> A full circle is 1 turn, making it intuitive for describing complete rotations.</li>
          </ul>
          
          <p>
            Our Angle Converter tool makes it easy to convert between these different units, helping you work across various fields and applications that use different angular measurement systems.
          </p>
        </div>
      </Card>
    </div>
  );
}
