import { RainbowButton } from "@/components/ui/rainbow-button";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
      gsap.from(textRef.current, {
        opacity: 0,
        y: 30,
        duration: 1,
        delay: 0.3,
        ease: "power3.out"
      });
      gsap.from(btnRef.current, {
        opacity: 0,
        scale: 0.8,
        duration: 0.8,
        delay: 0.6,
        ease: "back.out(1.7)"
      });
    }, heroRef);
    return () => ctx.revert();
  }, []);

  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} className="h-[400px] md:h-[500px] flex items-center px-4 relative overflow-hidden pt-16 md:pt-20 pb-8 bg-cover bg-center md:bg-top bg-no-repeat" style={{backgroundImage: 'url(/images/hero/banner.png)'}}>
      <div className="absolute inset-0 bg-black/40"></div>
      <div className="text-left space-y-4 md:space-y-6 relative z-10 max-w-xs md:max-w-lg pl-4 md:pl-16">
        <div className="mb-2">
          <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
            Japan eSIM for Travelers
          </span>
        </div>
        
        <h1 ref={titleRef} className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white">
          Stay Connected in Japan from Landing to Departure
        </h1>
        
        <p ref={textRef} className="text-base md:text-lg lg:text-xl leading-relaxed text-white/90">
          Instant 5G eSIM. No Airport Queues, No Physical SIM Cards. No roaming bills. No hassle.
        </p>
        
        <div ref={btnRef} className="pt-2 md:pt-4">
          <RainbowButton 
            onClick={scrollToPlans}
            className="rounded-full px-6 md:px-8 text-sm md:text-base h-12"
          >
            Get Instant eSIM - 2 Min Setup
          </RainbowButton>
        </div>
      </div>
    </section>
  );
};

export default Hero;
