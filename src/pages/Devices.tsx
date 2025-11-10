import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, Info, Smartphone } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Devices = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".device-header", {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".device-alert", {
        opacity: 0,
        scale: 0.95,
        duration: 0.6,
        delay: 0.3,
        ease: "back.out(1.7)"
      });
      gsap.from(".device-tabs", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        delay: 0.5,
        ease: "power3.out"
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="device-header text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-6">
              <Smartphone className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Device Compatibility
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Check if your device supports eSIM technology
            </p>
          </div>

          <Alert className="device-alert mb-8 border-primary/20 bg-primary/5">
            <Info className="h-4 w-4" />
            <AlertDescription className="font-medium">
              Important: Your device must be unlocked to use eSIM technology.
            </AlertDescription>
          </Alert>

          <Tabs defaultValue="ios" className="device-tabs w-full">
            <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 h-auto p-1 bg-muted rounded-lg">
              <TabsTrigger value="ios" className="flex items-center gap-2 py-3 px-4 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                </svg>
                iOS
              </TabsTrigger>
              <TabsTrigger value="samsung" className="flex items-center gap-2 py-3 px-4 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M7.27 3.82c-1.25.28-2.25 1.32-2.25 2.68 0 1.5 1.2 2.7 2.7 2.7h8.56c1.5 0 2.7-1.2 2.7-2.7 0-1.36-1-2.4-2.25-2.68L12 2.5 7.27 3.82zm9.46 6.68H7.27c-1.5 0-2.7 1.2-2.7 2.7v4.3c0 1.5 1.2 2.7 2.7 2.7h9.46c1.5 0 2.7-1.2 2.7-2.7v-4.3c0-1.5-1.2-2.7-2.7-2.7zm-7.46 6h-1v-3h1v3zm3 0h-1v-3h1v3zm3 0h-1v-3h1v3z"/>
                </svg>
                Samsung
              </TabsTrigger>
              <TabsTrigger value="pixel" className="flex items-center gap-2 py-3 px-4 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                </svg>
                Google Pixel
              </TabsTrigger>
              <TabsTrigger value="other" className="flex items-center gap-2 py-3 px-4 text-sm font-medium data-[state=active]:bg-primary data-[state=active]:text-primary-foreground rounded-md transition-all">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Other Brands
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ios" className="mt-8 space-y-6">
              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Check Your Device</h3>
                    <p className="text-sm text-muted-foreground">Settings → General → About</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Compatible Models
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "iPhone 16 Series",
                      "iPhone 15 Series",
                      "iPhone 14 Series",
                      "iPhone 13 Series",
                      "iPhone 12 Series",
                      "iPhone 11 Series"
                    ].map((model, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm font-medium">{model}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-destructive mb-1">Regional Restrictions</h4>
                      <p className="text-sm text-muted-foreground">
                        iPhones from China, Hong Kong, Macao may not support eSIM (some exceptions apply).
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Manual Check</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Not sure? Check manually:
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Settings → Cellular → Add Cellular Plan
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="samsung" className="mt-8 space-y-6">
              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Check Your Device</h3>
                    <p className="text-sm text-muted-foreground">Settings → About Phone → Product Name</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Compatible Models
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Galaxy S23 Series",
                      "Galaxy S22 Series",
                      "Galaxy S21 Series",
                      "Galaxy S20 Series",
                      "Galaxy Note 20 Series",
                      "Galaxy Z Fold Series",
                      "Galaxy Z Flip Series",
                      "Galaxy A54, A55"
                    ].map((model, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm font-medium">{model}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-destructive mb-1">Incompatible Models</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>• Galaxy S20 FE, US versions of S20/S21</p>
                        <p>• US/HK versions of Note 20 Ultra, Z Fold 2</p>
                        <p>• Models from South Korea</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Manual Check</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Not sure? Check manually:
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Settings → Connections → SIM Manager → Add Plan
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pixel" className="mt-8 space-y-6">
              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Check Your Device</h3>
                    <p className="text-sm text-muted-foreground">Settings → About Phone → Device Name</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Compatible Models
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {[
                      "Pixel 8 Series",
                      "Pixel 7 Series",
                      "Pixel 6 Series",
                      "Pixel 5 Series",
                      "Pixel 4 Series",
                      "Pixel 3 Series*",
                      "Pixel 2 Series*",
                      "Pixel Fold"
                    ].map((model, index) => (
                      <div key={index} className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg border border-primary/10">
                        <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                        <span className="text-foreground text-sm font-medium">{model}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4 mb-6">
                  <div className="flex items-start gap-2">
                    <AlertTriangle className="w-4 h-4 text-destructive flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-destructive mb-1">Regional Restrictions</h4>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <p>• Pixel 3: Limited support in Australia, Japan, Taiwan</p>
                        <p>• Pixel 3a: Not supported in Japan, East Asia</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Manual Check</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        Not sure? Check manually:
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Settings → Network & Internet → SIMs → Add Plan
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="other" className="mt-8 space-y-6">
              <div className="bg-background border border-border rounded-xl p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Info className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Check Your Device</h3>
                    <p className="text-sm text-muted-foreground">Settings → About Phone → Device Name</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    Compatible Brands
                  </h3>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-3">Huawei Devices</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {[
                          "P40 Series",
                          "Mate 40 Pro",
                          "Pura 70 Pro"
                        ].map((model, index) => (
                          <div key={index} className="flex items-center gap-2 p-2 bg-primary/5 rounded border border-primary/10">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                            <span className="text-foreground text-sm">{model}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4">
                      <h4 className="font-semibold text-foreground mb-3">Other Supported Brands</h4>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                        {[
                          "Oppo",
                          "Sony",
                          "Xiaomi",
                          "Motorola",
                          "Sharp",
                          "Honor",
                          "OnePlus",
                          "Rakuten"
                        ].map((brand, index) => (
                          <div key={index} className="flex items-center gap-1 p-2 bg-primary/5 rounded border border-primary/10">
                            <CheckCircle className="w-3 h-3 text-primary flex-shrink-0" />
                            <span className="text-foreground text-xs font-medium">{brand}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-muted/50 border border-border rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Universal Check</h4>
                      <p className="text-sm text-muted-foreground mb-2">
                        For any device, check eSIM support:
                      </p>
                      <Badge variant="outline" className="text-xs">
                        Settings → Connections → SIM Manager → Add Plan
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Devices;