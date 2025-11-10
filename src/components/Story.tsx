import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Story = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".section-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%"
        },
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".problem-image", {
        scrollTrigger: {
          trigger: ".problem-image",
          start: "top 80%"
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.from(".problem-title", {
        scrollTrigger: {
          trigger: ".problem-title",
          start: "top 80%"
        },
        opacity: 0,
        x: 50,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".problem-item", {
        scrollTrigger: {
          trigger: ".problem-item",
          start: "top 80%"
        },
        opacity: 0,
        x: -50,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
      gsap.from(".solution-title", {
        scrollTrigger: {
          trigger: ".solution-title",
          start: "top 80%"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".solution-image", {
        scrollTrigger: {
          trigger: ".solution-image",
          start: "top 80%"
        },
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        ease: "power2.out"
      });
      gsap.from(".solution-item", {
        scrollTrigger: {
          trigger: ".solution-item",
          start: "top 80%"
        },
        opacity: 0,
        x: 50,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="section-title text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Common Japan Travel Connectivity Challenges
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Don't let connectivity issues ruin your Japan experience
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Images */}
          <div className="problem-image relative">
            <img 
              src="/images/another/problems.png" 
              alt="Japan travel connectivity problems" 
              className="w-full h-80 object-contain rounded-lg"
            />
          </div>
          
          {/* Right Column - Problem Statement */}
          <div>
            <h3 className="problem-title text-2xl md:text-3xl font-bold text-foreground mb-6">
              Tired of These Japan Travel Internet Problems?
            </h3>
            
            <div className="space-y-4">
              <div className="problem-item flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-muted-foreground">Long airport queues for local SIM cards</p>
              </div>
              
              <div className="problem-item flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-muted-foreground">Expensive roaming charges ($10-50/day)</p>
              </div>
              
              <div className="problem-item flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-muted-foreground">Complex registration processes</p>
              </div>
              
              <div className="problem-item flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-muted-foreground">No internet for maps, bookings, translation</p>
              </div>
              
              <div className="problem-item flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-muted-foreground">Missing important calls/messages</p>
              </div>
              
              <div className="problem-item flex items-start gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-muted-foreground">Unreliable public WiFi</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Solution Benefits Section */}
        <div className="mt-20">
          <div className="solution-title text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose Our Japan eSIM?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Instant connectivity with premium networks and 24/7 support
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Column - Benefits */}
            <div>
              
              <div className="space-y-4">
                <div className="solution-item flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Instant QR code delivery via email</p>
                </div>
                
                <div className="solution-item flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Activate before/during flight</p>
                </div>
                
                <div className="solution-item flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Connected the moment you land</p>
                </div>
                
                <div className="solution-item flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Keep your home number active</p>
                </div>
                
                <div className="solution-item flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Japan's premium networks (Docomo/SoftBank)</p>
                </div>
                
                <div className="solution-item flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">Hotspot sharing enabled</p>
                </div>
                
                <div className="solution-item flex items-start gap-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full mt-3 flex-shrink-0"></div>
                  <p className="text-lg text-muted-foreground">24/7 English support</p>
                </div>
              </div>
            </div>
            
            {/* Right Column - Image */}
            <div className="solution-image relative">
              <img 
                src="/images/another/why_choose.png" 
                alt="Japan eSIM solution benefits" 
                className="w-full h-80 object-contain rounded-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Story;
