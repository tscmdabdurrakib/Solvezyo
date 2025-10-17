import { useEffect } from "react";
import DataStorageConverter from "@/tools/unit-conversion/data-storage-converter";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, HardDrive, ArrowRight } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useLocation } from "wouter";

export default function DataStorageConverterPage() {
  const [location] = useLocation();
  
  useEffect(() => {
    const originalTitle = document.title;
    const metaDescription = document.querySelector('meta[name="description"]');
    const originalDescription = metaDescription?.getAttribute('content') || '';
    
    document.title = "Data Storage Converter – Convert Bytes, KB, MB, GB, TB & More";
    
    if (metaDescription) {
      metaDescription.setAttribute('content', "Free online data storage converter. Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, and various storage media formats.");
    } else {
      const meta = document.createElement('meta');
      meta.name = 'description';
      meta.content = "Free online data storage converter. Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, and various storage media formats.";
      document.head.appendChild(meta);
    }
    
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
    
    addMetaTag('og:title', 'Data Storage Converter – Convert Bytes, KB, MB, GB, TB & More');
    addMetaTag('og:description', 'Free online data storage converter. Convert between bits, bytes, kilobytes, megabytes, gigabytes, terabytes, petabytes, and various storage media formats.');
    addMetaTag('og:type', 'website');
    
    window.scrollTo(0, 0);
    
    return () => {
      document.title = originalTitle;
      if (metaDescription && originalDescription) {
        metaDescription.setAttribute('content', originalDescription);
      }
    };
  }, [location]);

  return (
    <div className="container mx-auto py-6 px-4 max-w-5xl">
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
            <BreadcrumbLink className="font-medium">Data Storage Converter</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="space-y-8">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mb-3">
            <HardDrive className="h-6 w-6 text-primary" />
            <span>Data Storage Converter Tool</span>
          </h1>
          <p className="text-muted-foreground">
            Quickly and accurately convert between different units of digital data storage.
          </p>
        </div>

        <DataStorageConverter />

        <div className="space-y-12 mt-16">
          <Separator className="bg-gradient-to-r from-blue-500 to-purple-500 h-0.5" />
          
          <section>
            <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Understanding Data Storage Conversion
            </h2>
            
            <div className="prose max-w-none text-muted-foreground leading-relaxed">
              <p className="text-lg mb-6">
                A data storage converter is a tool that allows you to convert between different units of digital information. From the smallest bit to massive terabytes, this tool helps in understanding and comparing storage capacities.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Common Data Storage Conversions</h2>
            
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-l-4 border-l-blue-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="p-2 bg-blue-100 rounded-lg">
                      <ArrowRight className="h-4 w-4 text-blue-600" />
                    </span>
                    File Sizes
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                    <span className="font-medium text-foreground">1 Megabyte (MB)</span>
                    <ArrowRight className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-foreground">1,024 Kilobytes (KB)</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-800">
                    <span className="font-medium text-foreground">1 Gigabyte (GB)</span>
                    <ArrowRight className="h-4 w-4 text-green-500 dark:text-green-400" />
                    <span className="text-foreground">1,024 Megabytes (MB)</span>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="border-l-4 border-l-green-500">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span className="p-2 bg-green-100 rounded-lg">
                      <ArrowRight className="h-4 w-4 text-green-600" />
                    </span>
                    Storage Media
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-950/30 rounded-lg border border-blue-100 dark:border-blue-800">
                    <span className="font-medium text-foreground">CD (700 MB)</span>
                    <ArrowRight className="h-4 w-4 text-blue-500 dark:text-blue-400" />
                    <span className="text-foreground">~0.68 GB</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-950/30 rounded-lg border border-green-100 dark:border-green-800">
                    <span className="font-medium text-foreground">DVD (4.7 GB)</span>
                    <ArrowRight className="h-4 w-4 text-green-500 dark:text-green-400" />
                    <span className="text-foreground">~4,812 MB</span>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-6">Frequently Asked Questions</h2>
            
            <div className="space-y-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-blue-700 dark:text-blue-300">What is the difference between a bit and a byte?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    A bit is the smallest unit of data in a computer. A byte is a group of 8 bits.
                  </p>
                </CardContent>
              </Card>
              
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-green-700 dark:text-green-300">Why are there two standards for kilobytes (1000 vs 1024 bytes)?</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">
                    The powers-of-10 (1000) definition is used in telecommunications and by storage manufacturers. The powers-of-2 (1024) definition is used by operating systems and for memory capacity.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
