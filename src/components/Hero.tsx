import { RainbowButton } from "@/components/ui/rainbow-button";

const Hero = () => {
  const scrollToPlans = () => {
    const plansSection = document.getElementById('plans');
    if (plansSection) {
      plansSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style jsx global>{`
        .hero-animate-in-h2 {
          animation: slideInFromTop 0.3s ease-out 0.3s both;
        }
        .hero-animate-in-h1 {
          animation: slideInFromTop 0.3s ease-out 0.6s both;
        }
        .hero-animate-in-tagline {
          animation: fadeIn 0.3s ease-out 1.5s both;
        }
        .hero-animate-in-buttons {
          animation: slideInFromBottom 0.3s ease-out 1.8s both;
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
            opacity: 0;
          }
          to {
            stroke-dashoffset: 0;
            opacity: 0.8;
          }
        }
        .gradient-text {
          background: linear-gradient(to right, #00bfff 20%, #8a2be2 40%, #ff69b4 60%, #ff0000 80%, #ff8c00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .hero-banner {
          animation: fadeIn 0.3s ease-out 0.9s both;
        }
      `}</style>
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden py-8 sm:py-12 px-4 sm:px-6" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        <div 
          className="hero-banner absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/images/hero/banner.png)', opacity: 0 }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="container mx-auto relative z-10 max-w-6xl px-4">
          <div className="text-center space-y-4 sm:space-y-8">
            <div className="space-y-3 sm:space-y-4">
              <div className="relative mb-4 sm:mb-8 pb-3 sm:pb-0 flex justify-center">
                <div className="relative inline-block">
                  <h2 
                    className="hero-animate-in-h2 text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white font-bold mb-3 sm:mb-4 px-2"
                    style={{ opacity: 0, transform: 'translateY(-20px)' }}
                  >
                    Global eSIM for Travelers
                  </h2>
                  <svg 
                    width="100%" 
                    height="30" 
                    viewBox="0 0 280 20" 
                    className="block sm:hidden absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[110%]"
                  >
                    <path 
                      className="hero-animate-path"
                      d="M 0,10 Q 70,5 140,10 Q 210,15 280,10" 
                      stroke="#000000" 
                      strokeWidth="2" 
                      fill="none" 
                      opacity="0"
                      strokeDasharray="280"
                      strokeDashoffset="280"
                    />
                  </svg>
                  <svg 
                    width="100%" 
                    height="30" 
                    viewBox="0 0 320 20" 
                    className="hidden sm:block absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-[105%]"
                  >
                    <path 
                      className="hero-animate-path"
                      d="M 0,10 Q 80,5 160,10 Q 240,15 320,10" 
                      stroke="#000000" 
                      strokeWidth="2" 
                      fill="none" 
                      opacity="0"
                      strokeDasharray="320"
                      strokeDashoffset="320"
                    />
                  </svg>
                </div>
              </div>
              <h1 
                className="hero-animate-in-h1 text-xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white text-center max-w-4xl mx-auto px-2"
                style={{ opacity: 0, transform: 'translateY(-20px)' }}
              >
                Stay Connected Worldwide from Landing to Departure
              </h1>
            </div>

            <div 
              className="hero-animate-in-tagline mt-4 sm:mt-6"
              style={{ opacity: 0 }}
            >
              <p className="text-white text-base sm:text-xl md:text-2xl text-center font-semibold leading-relaxed max-w-4xl mx-auto px-4">
                Instant 5G eSIM. No Airport Queues, No Physical SIM Cards. No roaming bills. No hassle.
              </p>
            </div>

            <div 
              className="hero-animate-in-buttons mt-6 sm:mt-8"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <RainbowButton 
                onClick={scrollToPlans}
                className="rounded-full px-8 sm:px-12 text-base sm:text-lg h-14 sm:h-16 font-medium w-full sm:w-auto max-w-sm mx-auto"
              >
                Get Instant eSIM - 2 Min Setup
              </RainbowButton>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;
