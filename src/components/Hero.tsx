import { RainbowButton } from "@/components/ui/rainbow-button";
import { useEffect, useRef } from "react";

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);

  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style jsx global>{`
        .hero-animate-in-badge {
          animation: slideInFromTop 0.3s ease-out 0.3s both;
        }
        .hero-animate-in-h1 {
          animation: slideInFromTop 0.3s ease-out 0.6s both;
        }
        .hero-animate-in-text {
          animation: fadeIn 0.3s ease-out 0.9s both;
        }
        .hero-animate-in-button {
          animation: slideInFromBottom 0.3s ease-out 1.2s both;
        }
        .hero-animate-path {
          animation: drawPath 2.0s ease-in-out 0.9s both;
        }
        @keyframes slideInFromTop {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes slideInFromBottom {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes drawPath {
          from {
            stroke-dashoffset: 280;
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 0.8;
          }
        }
      `}</style>
      <section ref={heroRef} className="h-[400px] md:h-[500px] flex items-center px-4 relative overflow-hidden bg-cover bg-center md:bg-top bg-no-repeat" style={{backgroundImage: 'url(/images/hero/banner.png)'}}>
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="text-left space-y-4 md:space-y-6 relative z-10 max-w-xs md:max-w-lg pl-4 md:pl-16">
          <div className="mb-2 hero-animate-in-badge" style={{ opacity: 0, transform: 'translateY(-20px)' }}>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm font-medium">
              Japan eSIM for Travelers
            </span>
          </div>
          
          <div className="relative">
            <h1 className="hero-animate-in-h1 text-2xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white" style={{ opacity: 0, transform: 'translateY(-20px)' }}>
              Stay Connected in Japan from Landing to Departure
            </h1>
            <svg 
              width="100%" 
              height="20" 
              viewBox="0 0 280 20" 
              className="absolute -bottom-2 left-0 w-full max-w-[280px]"
            >
              <path 
                className="hero-animate-path"
                d="M 0,10 Q 70,5 140,10 Q 210,15 280,10" 
                stroke="#ff4444" 
                strokeWidth="2" 
                fill="none" 
                opacity="0"
                strokeDasharray="280"
                strokeDashoffset="280"
              />
            </svg>
          </div>
          
          <p className="hero-animate-in-text text-base md:text-lg lg:text-xl leading-relaxed text-white/90" style={{ opacity: 0 }}>
            Instant 5G eSIM. No Airport Queues, No Physical SIM Cards. No roaming bills. No hassle.
          </p>
          
          <div className="hero-animate-in-button pt-2 md:pt-4" style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <RainbowButton 
              onClick={scrollToPlans}
              className="rounded-full px-6 md:px-8 text-sm md:text-base h-12"
            >
              Get Instant eSIM - 2 Min Setup
            </RainbowButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
