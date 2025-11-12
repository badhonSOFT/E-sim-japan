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
        .hero-animate-in-video {
          animation: slideInFromBottom 0.3s ease-out 1.2s both;
        }
        .hero-video {
          border-radius: 24px;
        }
      `}</style>
      <section className="relative min-h-[80vh] sm:min-h-screen flex items-start sm:items-center justify-center overflow-hidden pt-16 pb-4 sm:py-8 px-4" style={{ backgroundColor: 'white', fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        <div className="container mx-auto relative z-10 max-w-6xl">
          <div className="text-center space-y-6 sm:space-y-8">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="relative mb-4 sm:mb-6 pb-2 sm:pb-0 flex justify-center">
                <div className="relative inline-block">
                  <h2 
                    className="hero-animate-in-h2 text-center text-lg sm:text-xl md:text-2xl lg:text-3xl text-[#1d1d1f] font-medium mb-3 sm:mb-4"
                    style={{ opacity: 0, transform: 'translateY(-20px)' }}
                  >
                    Japan eSIM for Travelers
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
                      stroke="#ff4444" 
                      strokeWidth="1.5" 
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
                      stroke="#ff4444" 
                      strokeWidth="1.5" 
                      fill="none" 
                      opacity="0"
                      strokeDasharray="320"
                      strokeDashoffset="320"
                    />
                  </svg>
                </div>
              </div>
              <h1 
                className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold leading-tight tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2 text-center max-w-4xl mx-auto"
                style={{ translate: 'none', opacity: 1 }}
              >
                Stay Connected in Japan from Landing to Departure
              </h1>
            </div>

            <div 
              className="hero-animate-in-video relative z-10 flex justify-center my-8 sm:my-12"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <div className="w-full max-w-5xl mx-auto h-[200px] sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
                <video 
                  src="/video/promp.mp4"
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="hero-video w-full h-full object-cover rounded-xl sm:rounded-2xl"
                />
              </div>
            </div>

            <div 
              className="hero-animate-in-tagline space-y-6 mt-8 sm:mt-0"
              style={{ opacity: 0 }}
            >
              <p className="mb-2 gradient-text text-base sm:text-lg md:text-xl text-center font-semibold leading-relaxed max-w-4xl mx-auto" style={{
                translate: 'none',
                rotate: 'none',
                scale: 'none',
                transform: 'translate(0px, 0px)',
                opacity: 1
              }}>
                Instant 5G eSIM. No Airport Queues, No Physical SIM Cards. No roaming bills. No hassle.
              </p>
            </div>

            <div 
              className="hero-animate-in-buttons mt-6 sm:mt-8"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <RainbowButton 
                onClick={scrollToPlans}
                className="rounded-full px-6 sm:px-8 text-sm sm:text-base h-11 sm:h-12 font-medium"
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
