import { useEffect } from "react";
import DataTransferConverter from "@/tools/unit-conversion/data-transfer-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Wifi, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function DataTransferConverterPage() {
  const [location] = useLocation();
  
  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
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
            <BreadcrumbLink className="font-medium">Data Transfer Rate Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* Main Tool Section */}
      <div className="space-y-8">
        {/* Header with title and description */}
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <Wifi className="h-6 w-6 text-primary" />
            <span>Data Transfer Rate Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Convert between different units of data transmission speed and bandwidth.
            Perfect for networking, internet connections, and data communication analysis.
          </p>
        </div>

        {/* The Converter Tool */}
        <DataTransferConverter />

        {/* Additional Information Section - Good for SEO */}
        <div className="space-y-8 mt-10">
          <Separator />
          
          <section className="mt-6">
            <h2 className="text-2xl font-semibold mb-4">Understanding Data Transfer Rates</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Bits vs Bytes</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-primary">Bits per Second (bps)</h4>
                    <p className="text-sm text-muted-foreground">
                      Used for network speeds and internet connections. 1 bit is the smallest unit of data.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Bytes per Second (B/s)</h4>
                    <p className="text-sm text-muted-foreground">
                      Used for file transfer speeds. 1 byte = 8 bits. File downloads are usually measured in bytes.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Key Relationship</h4>
                    <p className="text-sm text-muted-foreground">
                      To convert: Divide Mbps by 8 to get MB/s. Multiply MB/s by 8 to get Mbps.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Common Speeds</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span>Dial-up modem</span>
                    <span>56 kbps</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>DSL broadband</span>
                    <span>1-10 Mbps</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Cable internet</span>
                    <span>10-100 Mbps</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Fiber optic</span>
                    <span>100-1000 Mbps</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>Gigabit Ethernet</span>
                    <span>1 Gbps</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span>10G Ethernet</span>
                    <span>10 Gbps</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Practical Applications</h2>
            <div className="grid gap-6 md:grid-cols-3">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Internet & Networking</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">• Internet service provider speeds</div>
                  <div className="text-sm">• Wi-Fi connection rates</div>
                  <div className="text-sm">• Network bandwidth planning</div>
                  <div className="text-sm">• Data center capacity</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">File Operations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">• Download time calculations</div>
                  <div className="text-sm">• File transfer speeds</div>
                  <div className="text-sm">• Backup duration estimates</div>
                  <div className="text-sm">• Streaming bandwidth needs</div>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Professional Use</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <div className="text-sm">• Network administration</div>
                  <div className="text-sm">• Server capacity planning</div>
                  <div className="text-sm">• Cloud service calculations</div>
                  <div className="text-sm">• Performance optimization</div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-4">Speed Conversions</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>100 Mbps</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>12.5 MB/s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 Gbps</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>125 MB/s</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>1 GiB/s</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>8.59 Gbps</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted rounded-lg">
                    <span>10 MB/s</span>
                    <ArrowRight className="h-4 w-4" />
                    <span>80 Mbps</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </div>
    </div>
  );
}
