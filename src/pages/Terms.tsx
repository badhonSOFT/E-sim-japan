import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Terms = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
      gsap.from(".content-section", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
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
            <h1 className="text-5xl md:text-6xl font-semibold">Terms of Service</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                By accessing and using JapanConnect's services, you accept and agree to be bound by the terms 
                and provision of this agreement.
              </p>
            </section>

            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">2. Service Description</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                JapanConnect provides eSIM services for use in Japan. Our services include data connectivity 
                through partner networks in Japan.
              </p>
            </section>

            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">3. Fair Use Policy</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                For Freedom Plan users: You receive 3GB of high-speed 5G/LTE data per day. After reaching this 
                limit, your connection continues at 3G speeds until the next day. This ensures network quality 
                for all users.
              </p>
            </section>

            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">4. Refund Policy</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We offer a 100% money-back guarantee if you cannot connect due to a fault with our eSIM. 
                Contact our support team within 7 days of purchase for assistance or refund.
              </p>
            </section>

            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">5. Device Compatibility</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                Our eSIMs are compatible with eSIM-enabled devices (iPhone 11+, Google Pixel 4+, Samsung S20+ and newer). 
                It is your responsibility to ensure your device is compatible before purchase.
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Terms;
