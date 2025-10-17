import { useEffect } from "react";
import LengthConverter from "@/tools/unit-conversion/length-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Ruler, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function LengthConverterPage() {
  const [location] = useLocation();
  
  // Set SEO meta tags and scroll to top when component mounts
  useEffect(() => {
    // Set document title and meta tags for SEO
    const originalTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || '';
    
    // Update title and description
    document.title = "Length Converter – Convert Meters, Miles, Inches, Feet, Light Years & More";
    
    if (metaDescription) {
      metaDescription.setAttribute('content', "Free online length converter with 90+ units including meter, mile, inch, foot, light year, astronomical unit, parsec, Planck length, and more.");
    } else {
      // Create meta description if it doesn't exist
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Free online length converter with 90+ units including meter, mile, inch, foot, light year, astronomical unit, parsec, Planck length, and more.";
      document.head.appendChild(meta);
    }
    
    // Add Open Graph tags for social sharing
    const addMetaTag = (property: string, content: string) => {
      let existingTag = document.querySelector(`meta[property="${property}"]`);
      if (existingTag) {
        existingTag.setAttribute('content', content);
      } else {
        const metaTag = document.createElement('meta');
        metaTag.setAttribute('property', property);
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    };
    
    addMetaTag('og:title', 'Length Converter – Convert Meters, Miles, Inches, Feet, Light Years & More');
    addMetaTag('og:description', 'Free online length converter with 90+ units including meter, mile, inch, foot, light year, astronomical unit, parsec, Planck length, and more.');
    addMetaTag('og:type', 'website');
    
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Cleanup function to restore original values when component unmounts
    return () => {
      document.title = originalTitle;
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, [location]);

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
      {/* Breadcrumb Navigation */}
      <Breadcrumb className="mb-6">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/" className="flex items-center gap-1">
              <Home className="h-3 w-3" />
              <span>Home</span>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="/category/unit-conversion">Unit Conversion Tools</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium">Length Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Ruler className="h-6 w-6 text-primary" />
            <span>Length Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Quickly and accurately convert between different units of length and distance.
            Supports metric (meters, centimeters) and imperial (feet, inches) measurements.
          </p>
        </div>

        {/* The Converter Tool */}
        <LengthConverter />

        {/* Comprehensive Educational Content Section */}
        <div className="space-y-12 mt-16">
          <Separator className="bg-gradient-to-r from-blue-500 to-purple-500 h-0.5" />
          
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Understanding Length Conversion: A Complete Guide
            </h2>
            
            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <p className="text-lg mb-6">
                A length converter is an essential digital tool that enables you to transform measurements from one unit of length to another with precision and ease. In our interconnected world, where global collaboration spans industries from construction to space exploration, the ability to quickly convert between different measurement systems has become indispensable.
              </p>
              
              <p className="mb-6">
                Whether you're an architect working with international building specifications, a scientist conducting research that requires precise measurements, or simply someone trying to understand your height in different units, a comprehensive length converter serves as your reliable companion for accurate conversions between over 90 different units of measurement.
              </p>
              
              <p className="mb-6">
                The beauty of modern length converters lies in their ability to handle everything from the smallest subatomic scales (like the Planck length at 1.6 × 10⁻³⁵ meters) to the vast cosmic distances (such as megaparsecs used to measure distances between galaxies). This versatility makes them invaluable tools for professionals across diverse fields.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Everyday Length Conversions You'll Actually Use</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="p-2 bg-blue-100 rounded-lg">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </span>
                    Personal Measurements
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                    <span className="font-medium text-foreground">Height: 5'8"</span>
                    <ArrowRight className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-foreground">172.7 cm</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-800">
                    <span className="font-medium text-foreground">Room: 12 feet</span>
                    <ArrowRight className="h-4 w-4 text-green-500 dark:text-green-400" />
                    <span className="text-foreground">3.66 meters</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-100 dark:border-purple-800">
                    <span className="font-medium text-foreground">TV: 65 inches</span>
                    <ArrowRight className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    <span className="text-foreground">165 cm</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="p-2 bg-green-100 rounded-lg">
                      <ArrowRight className="h-4 w-4 text-green-600" />
                    </span>
                    Travel & Navigation
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                    <span className="font-medium text-foreground">100 kilometers</span>
                    <ArrowRight className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-foreground">62.14 miles</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-800">
                    <span className="font-medium text-foreground">Marathon: 26.2 mi</span>
                    <ArrowRight className="h-4 w-4 text-green-500 dark:text-green-400" />
                    <span className="text-foreground">42.2 km</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-950/30 rounded-lg border border-purple-100 dark:border-purple-800">
                    <span className="font-medium text-foreground">Bridge clearance: 13'6"</span>
                    <ArrowRight className="h-4 w-4 text-purple-500 dark:text-purple-400" />
                    <span className="text-foreground">4.11 meters</span>
                  </div>
                </CardContent>
              </Card>
            </div>
            
            <p className="mt-6 text-muted-foreground">
              These everyday conversions highlight why length converters have become essential tools. When traveling internationally, shopping for imported goods, or communicating measurements across different regions, having instant access to accurate conversions eliminates confusion and ensures clear communication.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Scientific and Astronomical Applications</h2>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-950/30 dark:to-blue-950/30 p-6 rounded-xl border border-purple-200 dark:border-purple-800">
                <h3 className="text-xl font-semibold mb-4 text-purple-800 dark:text-purple-200">Microscopic World</h3>
                <p className="text-muted-foreground mb-4">
                  In the realm of nanotechnology and molecular biology, scientists work with incredibly small measurements. A nanometer (nm) - one billionth of a meter - is crucial for describing DNA width (2.5 nm), virus sizes (20-400 nm), and semiconductor features in computer chips.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-4">
                  <div className="bg-background dark:bg-card p-3 rounded-lg text-center border border-border">
                    <div className="font-semibold text-purple-600 dark:text-purple-400">DNA Width</div>
                    <div className="text-sm text-muted-foreground">2.5 nanometers</div>
                  </div>
                  <div className="bg-background dark:bg-card p-3 rounded-lg text-center border border-border">
                    <div className="font-semibold text-blue-600 dark:text-blue-400">Red Blood Cell</div>
                    <div className="text-sm text-muted-foreground">7,000 nanometers</div>
                  </div>
                  <div className="bg-background dark:bg-card p-3 rounded-lg text-center border border-border">
                    <div className="font-semibold text-green-600 dark:text-green-400">Transistor (2023)</div>
                    <div className="text-sm text-muted-foreground">3 nanometers</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/30 dark:to-purple-950/30 p-6 rounded-xl border border-indigo-200 dark:border-indigo-800">
                <h3 className="text-xl font-semibold mb-4 text-indigo-800 dark:text-indigo-200">Cosmic Distances</h3>
                <p className="text-muted-foreground mb-4">
                  Astronomers use specialized units to describe the vast scales of the universe. A light-year represents the distance light travels in one year (approximately 9.46 trillion kilometers), while an Astronomical Unit (AU) measures the average distance from Earth to the Sun (about 150 million kilometers).
                </p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-background dark:bg-card p-4 rounded-lg border border-border">
                    <div className="font-semibold text-indigo-600 dark:text-indigo-400 mb-2">1 Light Year =</div>
                    <div className="text-sm space-y-1 text-foreground">
                      <div>9.46 trillion kilometers</div>
                      <div>5.88 trillion miles</div>
                      <div>63,241 Astronomical Units</div>
                    </div>
                  </div>
                  <div className="bg-background dark:bg-card p-4 rounded-lg border border-border">
                    <div className="font-semibold text-purple-600 dark:text-purple-400 mb-2">1 Parsec =</div>
                    <div className="text-sm space-y-1 text-foreground">
                      <div>3.26 light years</div>
                      <div>30.86 trillion kilometers</div>
                      <div>206,265 Astronomical Units</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <p className="text-muted-foreground">
              These scientific applications demonstrate the critical importance of precise length conversions in advancing human knowledge. From designing computer processors at the nanoscale to mapping the structure of galaxies millions of light-years away, accurate unit conversion enables breakthrough discoveries.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Understanding Uncommon but Fascinating Units</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-2 border-orange-200 dark:border-orange-800 bg-gradient-to-br from-orange-50 to-yellow-50 dark:from-orange-950/30 dark:to-yellow-950/30">
                <CardHeader>
                  <CardTitle className="text-lg text-orange-800 dark:text-orange-200">The Extreme Small: Planck Length</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    The Planck length (1.616 × 10⁻³⁵ meters) represents the theoretical limit of meaningful measurement in physics. Below this scale, the concept of distance itself breaks down according to quantum mechanics.
                  </p>
                  <div className="bg-background dark:bg-card p-3 rounded-lg border border-border">
                    <div className="text-xs text-orange-600 dark:text-orange-400 font-medium">Fun Comparison:</div>
                    <div className="text-xs text-muted-foreground">A proton is larger than a Planck length by the same ratio that a human is larger than a proton!</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-red-200 dark:border-red-800 bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/30 dark:to-orange-950/30">
                <CardHeader>
                  <CardTitle className="text-lg text-red-800 dark:text-red-200">The Extreme Large: Sun's Radius</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    The Sun's radius (696,000 kilometers or 432,000 miles) is so vast that it would take a commercial airplane flying non-stop about 80 days to travel this distance.
                  </p>
                  <div className="bg-background dark:bg-card p-3 rounded-lg border border-border">
                    <div className="text-xs text-red-600 dark:text-red-400 font-medium">Mind-Blowing Scale:</div>
                    <div className="text-xs text-muted-foreground">You could fit about 1.3 million Earths inside the Sun!</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-blue-200 dark:border-blue-800 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30">
                <CardHeader>
                  <CardTitle className="text-lg text-blue-800 dark:text-blue-200">Historical Units: Cubit & Ell</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Ancient civilizations used body-based measurements. A cubit (about 45-52 cm) was the length from elbow to fingertip, while an ell (about 114 cm) was roughly the length of an arm.
                  </p>
                  <div className="bg-background dark:bg-card p-3 rounded-lg border border-border">
                    <div className="text-xs text-blue-600 dark:text-blue-400 font-medium">Historical Note:</div>
                    <div className="text-xs text-muted-foreground">Noah's Ark was described as 300 cubits long - about 137-156 meters!</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-2 border-green-200 dark:border-green-800 bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30">
                <CardHeader>
                  <CardTitle className="text-lg text-green-800 dark:text-green-200">Specialized Units: Fermi & Angstrom</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-3">
                    Nuclear physicists use the fermi (10⁻¹⁵ meters) to measure atomic nuclei, while crystallographers use the angstrom (10⁻¹⁰ meters) for atomic-scale structures.
                  </p>
                  <div className="bg-background dark:bg-card p-3 rounded-lg border border-border">
                    <div className="text-xs text-green-600 dark:text-green-400 font-medium">Scientific Usage:</div>
                    <div className="text-xs text-muted-foreground">Diamond's carbon-carbon bond length is about 1.54 angstroms</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Step-by-Step Guide: Using the Length Converter</h2>
            
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950/30 dark:to-purple-950/30 p-8 rounded-2xl border border-blue-200 dark:border-blue-800">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-blue-600 dark:bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Enter Your Value</h3>
                    <p className="text-muted-foreground mb-2">Type the numerical value you want to convert in the input field. The converter accepts both whole numbers and decimals (e.g., 5.5, 100, 0.25).</p>
                    <div className="bg-background dark:bg-card p-3 rounded-lg border border-border">
                      <span className="text-sm text-muted-foreground">Example: Enter "6" if you want to convert 6 feet to meters</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-purple-600 dark:bg-purple-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Select Your Source Unit</h3>
                    <p className="text-muted-foreground mb-2">Click the "From Unit" dropdown and search through our 90+ available units. Units are organized by categories (Metric, Imperial, Astronomical, etc.) for easy browsing.</p>
                    <div className="bg-background dark:bg-card p-3 rounded-lg border border-border">
                      <span className="text-sm text-muted-foreground">Tip: Start typing to quickly find your desired unit (e.g., type "foot" to find foot-related units)</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-600 dark:bg-green-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Choose Your Target Unit</h3>
                    <p className="text-muted-foreground mb-2">Select the unit you want to convert to using the "To Unit" dropdown. The same search functionality helps you quickly locate any unit.</p>
                    <div className="bg-background dark:bg-card p-3 rounded-lg border border-border">
                      <span className="text-sm text-muted-foreground">Pro tip: Use the swap button (↔) to quickly reverse your conversion</span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-orange-600 dark:bg-orange-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">View Instant Results</h3>
                    <p className="text-muted-foreground mb-2">The conversion appears immediately in the results section, along with detailed conversion information showing the exact calculation and conversion factor used.</p>
                    <div className="bg-background dark:bg-card p-3 rounded-lg border border-border">
                      <span className="text-sm text-muted-foreground">Bonus: The detailed breakdown helps you understand the relationship between units</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-700 dark:text-blue-300">What's the difference between miles and nautical miles?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A standard (statute) mile equals 5,280 feet or 1.609 kilometers, commonly used for land distances. A nautical mile equals 6,076 feet or 1.852 kilometers, based on the Earth's circumference and primarily used in maritime and aviation navigation. Nautical miles are about 15% longer than regular miles.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-700 dark:text-green-300">How do I convert meters to feet quickly in my head?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    For a quick mental approximation, multiply meters by 3.3. For example, 10 meters ≈ 33 feet. For precise conversions, multiply by 3.28084. The reverse (feet to meters) can be approximated by dividing by 3.3, or precisely by multiplying by 0.3048.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-purple-700 dark:text-purple-300">Why do astronomers use light years instead of kilometers?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Astronomical distances are so vast that using kilometers or miles results in unwieldy numbers. For example, the nearest star is about 40 trillion kilometers away - much easier to express as 4.2 light years. Light years also provide intuitive meaning: they represent how far light (the fastest thing in the universe) travels in one year.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-orange-700 dark:text-orange-300">Are there any length units still based on the human body?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Yes! The "hand" unit (4 inches) is still used to measure horse height, and "foot" obviously derives from human feet. Historically, many cultures used body-based measurements like the cubit (elbow to fingertip), span (extended hand width), and pace (step length). Modern standardization has replaced most of these with precise definitions.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-red-700 dark:text-red-300">How accurate are the conversions in this tool?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    Our length converter uses internationally recognized conversion factors with high precision (typically 8+ decimal places). Results are accurate for virtually all practical applications. For extremely specialized scientific work requiring maximum precision, consult official standards organizations like NIST or BIPM.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 text-white p-8 rounded-2xl">
            <div className="text-center max-w-3xl mx-auto">
              <h2 className="text-2xl font-bold mb-4 text-white">Ready to Master Length Conversions?</h2>
              <p className="text-blue-100 dark:text-blue-200 mb-6 text-lg">
                Whether you're working on a home improvement project, planning international travel, conducting scientific research, or simply satisfying your curiosity about the vast scales of our universe, this comprehensive length converter puts the power of precise measurement conversion at your fingertips.
              </p>
              <p className="text-blue-100 dark:text-blue-200 mb-6">
                From the infinitesimal Planck length to the cosmic scale of megaparsecs, from everyday feet and meters to specialized units like fermis and angstroms, you now have access to accurate conversions across more than 90 different units of length.
              </p>
              <p className="text-white font-medium">
                Start exploring the fascinating world of length measurements - try converting your height to different units, calculate distances in light years, or discover how many nanometers fit in a meter. The universe of measurement is waiting for you!
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
