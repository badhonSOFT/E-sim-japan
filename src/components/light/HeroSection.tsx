import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { RainbowButton } from "@/components/ui/rainbow-button";
import { User } from "lucide-react";
const heroVideo = "/assets/Light/Hero-light.mp4";

const translations = {
  EN: {
    introducing: 'Introducing Smart light',
    title: 'Light That Understands You',
    tagline: 'Peaceful living starts with the right light',
    buy: 'Buy',
    seeInAction: 'See It In Action',
    price: 'From 4,500 BDT',
    delivery: 'FREE Delivery. 1-Year Warranty.',
    hashtag: '#SmartLightRevolution',
    needHelp: 'Need help with Smart Light?',
    askSpecialist: 'Ask a specialist →'
  },
  বাং: {
    introducing: 'স্মার্ট আলোর পরিচিতি',
    title: 'আলো, যা আপনাকে বুঝে নেয়',
    tagline: 'শান্তির জীবনের শুরু হোক সঠিক আলোয়।',
    buy: 'কিনুন',
    seeInAction: 'কার্যক্রমে দেখুন',
    price: '৪,৫০০ টাকা থেকে',
    delivery: 'বিনামূল্যে ডেলিভারি। ১ বছরের ওয়ারেন্টি।',
    hashtag: '#স্মার্টলাইটবিপ্লব',
    needHelp: 'স্মার্ট লাইট বিষয়ে সাহায্য দরকার?',
    askSpecialist: 'বিশেষজ্ঞের সাহায্য নিন →'
  }
};

const HeroSection = () => {
  const [showSpecsModal, setShowSpecsModal] = useState(false);
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'EN';
  });

  const t = translations[language];

  useEffect(() => {
    const interval = setInterval(() => {
      const currentLang = localStorage.getItem('language') || 'EN';
      if (currentLang !== language) {
        setLanguage(currentLang);
      }
    }, 50);
    return () => clearInterval(interval);
  }, [language]);

  const scrollToOrderSection = () => {
    const orderSection = document.querySelector('[data-section="order-smart-light"]');
    if (orderSection) {
      orderSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToSeeItInAction = () => {
    const seeItInActionSection = document.querySelector('[data-section="lighting-visualizer"]');
    if (seeItInActionSection) {
      seeItInActionSection.scrollIntoView({ behavior: 'smooth' });
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
        .hero-animate-in-video {
          animation: slideInFromBottom 0.3s ease-out 1.2s both;
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
        .hero-video {
          border-radius: 24px;
        }
        .gradient-heading {
          background: linear-gradient(to bottom, #000000 0%, #000000 30%, rgba(0, 0, 0, 0.3) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .gradient-text {
          background: linear-gradient(to right, #00bfff 20%, #8a2be2 40%, #ff69b4 60%, #ff0000 80%, #ff8c00 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        :root {
          --color-1: 210 100% 56%;
          --color-2: 235 100% 50%;
          --color-3: 330 100% 71%;
          --color-4: 0 100% 50%;
          --color-5: 30 100% 50%;
        }
        .animate-rainbow {
          animation: rainbow 3s ease-in-out infinite;
        }
        @keyframes rainbow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        .animate-rainbow {
          animation: rainbow 3s ease-in-out infinite;
        }

      `}</style>
      <section className="relative min-h-screen flex items-start sm:items-center justify-center overflow-hidden pt-8 sm:pt-20 pb-8" style={{ backgroundColor: 'white', fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
        <div className="container mx-auto relative z-10 max-w-6xl mt-8 sm:mt-0">
          <div className="text-center space-y-8 sm:space-y-6 md:space-y-8 px-4">
            <div className="space-y-2 sm:space-y-3 md:space-y-4">
              <div className="relative mb-4 sm:mb-6 pb-2 sm:pb-0 flex justify-center">
                <div className="relative inline-block">
                  <h2 
                    className="hero-animate-in-h2 text-center text-xl sm:text-2xl lg:text-3xl xl:text-4xl text-[#1d1d1f] font-semibold mb-2 sm:mb-4"
                    style={{ opacity: 0, transform: 'translateY(-20px)', marginTop: window.innerWidth < 640 ? '20px' : '48px' }}
                  >
                    {t.introducing}
                  </h2>
                  {/* Mobile SVG */}
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
                  {/* Desktop SVG */}
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
                className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[51.86px] font-semibold leading-tight tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2 apple-gradient-text"
                style={{ translate: 'none', opacity: 1 }}
              >
                {t.title}
              </h1>
            </div>

            <div 
              className="hero-animate-in-video relative z-10 flex justify-center mt-6 sm:mt-16 mb-16 sm:mb-8 px-0 sm:px-6"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <div className="w-full max-w-[98vw] sm:max-w-5xl mx-auto h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] overflow-hidden">
                <video 
                  src={heroVideo}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="hero-video w-full h-full object-cover rounded-2xl"
                />
              </div>
            </div>

            <div 
              className="hero-animate-in-tagline space-y-6 mt-8 sm:mt-0"
              style={{ opacity: 0 }}
            >
              <p className="hero-tagline mb-2 gradient-text px-2 sm:px-4 text-2xl sm:text-[32px] text-center font-bold leading-tight" style={{
                translate: 'none',
                rotate: 'none',
                scale: 'none',
                transform: 'translate(0px, 0px)',
                opacity: 1
              }}>
                {t.tagline}
              </p>
            </div>

            <div 
              className="hero-animate-in-buttons space-y-4 sm:space-y-6 mt-8 sm:mt-0"
              style={{ opacity: 0, transform: 'translateY(20px)' }}
            >
              <div className="flex flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 px-6 sm:px-0 max-w-5xl mx-auto">
                <RainbowButton 
                  onClick={scrollToOrderSection}
                  className="text-sm px-6 py-2 w-full sm:w-auto sm:flex-none h-10 sm:h-11"
                >
                  {t.buy}
                </RainbowButton>
                <button 
                  onClick={scrollToSeeItInAction}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background h-10 sm:h-10 hover:bg-foreground hover:text-background text-sm px-6 py-2 w-full sm:w-auto sm:flex-none"
                >
                  {t.seeInAction}
                </button>
              </div>

              <div className="flex flex-col lg:flex-row items-center lg:items-center justify-center lg:justify-between gap-4 lg:gap-6 max-w-5xl mx-auto">
                <div className="text-[#1d1f1f] font-semibold px-4 sm:px-0 text-center lg:text-left" style={{fontSize: '14px', margin: '4px 0px 0px', lineHeight: '1.4'}}>
                  <p className="text-center lg:text-left">{t.price}</p>
                  <p className="text-center lg:text-left text-xs sm:text-sm">
                    {t.delivery}
                  </p>
                  <p className="text-center lg:text-left text-xs sm:text-sm mt-1">
                    <span className="text-red-600">{t.hashtag}</span>
                  </p>
                </div>
                
                <div className="flex flex-col items-center lg:items-end text-center lg:text-right">
                  <h3 className="text-sm font-semibold text-gray-800 mb-2">
                    {t.needHelp}
                  </h3>
                  <button 
                    onClick={() => window.open('/customer-support', '_blank')}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium transition-colors"
                  >
                    <span className="w-4 h-4">👤</span>
                    {t.askSpecialist}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Specs Modal */}
        {showSpecsModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowSpecsModal(false)}>
            <div className="bg-white p-4 rounded-lg max-w-4xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
              <img 
                src="/assets/sohub-protect/image_3.png" 
                alt="Specifications" 
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export { HeroSection };