import { useState, useEffect } from 'react';

const controlImage = "/images/hero/banner.png";

const translations = {
  EN: {
    title: 'Stay Connected Seamlessly.',
    description: 'Traveling to Japan shouldn\'t mean losing connection with the world. No more expensive roaming charges, no more searching for WiFi hotspots.',
    subtitle: 'Built for travelers. Designed for convenience.'
  }
};

export const MissionSection = () => {
  const [language, setLanguage] = useState('EN');
  const t = translations[language];

  return (
    <>
      <style jsx>{`
        .mission-heading {
          font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        }
        .mission-text {
          font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        }
        .fade-in-up {
          animation: fadeInUp 0.6s ease-out;
        }
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
      <section className="relative w-full py-8 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: 'white', fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
        <div className="mx-auto max-w-7xl">
          {/* Section Title */}
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="mission-heading mb-4 sm:mb-6 font-semibold leading-tight tracking-tight bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent text-[32px] sm:text-[36px] md:text-[48px] lg:text-[64px] xl:text-[96px]">
              {t.title}
            </h2>
            <p className="mission-text mx-auto max-w-3xl font-medium leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl px-4" style={{ color: '#737373' }}>
              {t.description} {t.subtitle}
            </p>
          </div>

          {/* Split Image */}
          <div className="fade-in-up relative">
            <div className="absolute inset-0 bg-blue-300 blur-2xl opacity-40 rounded-2xl sm:rounded-3xl"></div>
            <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl relative z-10">
              <img 
                src={controlImage} 
                alt="Japan connectivity experience"
                className="w-full h-full object-cover"
                style={{ height: 'auto', minHeight: '200px', maxHeight: '587px' }}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
};