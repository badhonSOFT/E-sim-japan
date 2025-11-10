import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Mission = () => {
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
            <h1 className="text-5xl md:text-6xl font-semibold">Our Mission</h1>
            <p className="text-xl text-muted-foreground">
              Bringing premium quality to everyone at the #TruePrice
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-6 text-foreground">
            <p className="content-block text-lg leading-relaxed">
              In today's world, we all know the truth — many "branded" products sell at 5 to 10 times their actual cost. 
              People now understand what <span className="text-primary font-semibold">#TruePrice</span> is.
            </p>

            <p className="content-block text-lg leading-relaxed">
              But millions worldwide still pay these high prices.
            </p>

            <p className="content-block text-lg leading-relaxed">
              We believe this is unfair. We believe that premium quality and innovation should not be locked behind a 
              brand name. We are here to change that — through honest sourcing and the courage to bring you products 
              as good as the best brands, but at the real #TruePrice.
            </p>

            <p className="content-block text-lg leading-relaxed">
              This is not about copying. It is about giving people the same quality, or better, while protecting them 
              from broken promises or overpriced labels.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Mission;
