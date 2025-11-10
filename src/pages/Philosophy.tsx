import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Philosophy = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
      gsap.from(".content-block", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.2,
        delay: 0.3,
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
            <h1 className="text-5xl md:text-6xl font-semibold">Our Philosophy</h1>
            <p className="text-xl text-muted-foreground">
              Redefining what connectivity should be
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p className="content-block text-lg leading-relaxed">
              A signal travels through the air. It should be simple. Yet we pay for it every day — trapped by borders, 
              high fees, and old systems. We are here to change that.
            </p>

            <p className="content-block text-lg leading-relaxed">
              This is more than an eSIM. It is a statement: <span className="font-semibold">Roam Freely</span>. Secure 
              beyond public WiFi, convenient beyond the ordinary. Instant 5G, exactly when you land. Premium, affordable, 
              and built with world-class quality — not just for big carriers, but for all of us.
            </p>

            <p className="content-block text-lg leading-relaxed">
              By using your own phone — with an instant QR code — you take back the freedom to connect as it was meant 
              to be. You stop paying 10x roaming fees. You become part of a lifestyle that respects simplicity, fairness, 
              and your journey.
            </p>

            <p className="content-block text-lg leading-relaxed font-semibold">
              Will you keep paying for what should be simple? Or will you help make data fair again — one connection 
              at a time?
            </p>
          </div>

          <div className="content-block pt-12 border-t border-border space-y-6">
            <h2 className="text-3xl font-semibold">Our Manifesto</h2>
            <p className="text-lg leading-relaxed">
              We believe data should be simple. We believe great design belongs to everyone. We believe in changing 
              the way the world travels — one connection at a time. We believe in building a more conscious, connected 
              society starting with the simplest of things: the signal we use. Join the movement.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Philosophy;
