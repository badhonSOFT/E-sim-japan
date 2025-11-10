import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Vision = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
      gsap.from(".vision-statement", {
        opacity: 0,
        scale: 0.95,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });
      gsap.from(".value-item", {
        opacity: 0,
        x: -30,
        duration: 0.6,
        stagger: 0.15,
        delay: 0.6,
        ease: "power2.out"
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="page-title space-y-4">
            <h1 className="text-5xl md:text-6xl font-semibold">Our Vision</h1>
            <p className="text-xl text-muted-foreground">
              A world where quality is accessible to all
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <p className="vision-statement text-2xl leading-relaxed font-medium">
              To make global-quality products accessible to everyone — at an honest #TruePrice — with full transparency, 
              no compromise, and deep respect for the people we serve.
            </p>

            <div className="pt-8 space-y-6">
              <h2 className="text-3xl font-semibold">Our Values</h2>
              
              <div className="space-y-4">
                <div className="value-item border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Freedom</h3>
                  <p className="text-lg text-muted-foreground">Empower people to reclaim their journey.</p>
                </div>

                <div className="value-item border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Simplicity</h3>
                  <p className="text-lg text-muted-foreground">Design products that are minimal, beautiful, and functional.</p>
                </div>

                <div className="value-item border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Affordability</h3>
                  <p className="text-lg text-muted-foreground">Make premium quality accessible to all.</p>
                </div>

                <div className="value-item border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Honesty</h3>
                  <p className="text-lg text-muted-foreground">Full transparency on quality and price. #TruePrice</p>
                </div>

                <div className="value-item border-l-4 border-primary pl-6">
                  <h3 className="text-xl font-semibold mb-2">Connection</h3>
                  <p className="text-lg text-muted-foreground">Encourage self-expression and sharing.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Vision;
