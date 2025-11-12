import { useState, useEffect } from 'react';

const controlImage = "/assets/Light/Landscape.png";

const translations = {
  EN: {
    title: 'Control Your Atmosphere.',
    description: 'In our homes, we still live by the flip of a switch—stuck with harsh light, fumbling in the dark, and wasting energy. Sohub is your tool to change that.',
    subtitle: 'Built for your life. Designed for comfort.'
  },
  বাং: {
    title: 'আপনার পরিবেশ নিয়ন্ত্রণ করুন।',
    description: 'সুইচ টিপে আলো জ্বালানোর পুরনো অভ্যাসে আটকে আছে আমাদের ঘর—কড়া আলো, অন্ধকারে খোঁজাখুঁজি এবং বিদ্যুতের অপচয়। SOHUB এই পরিস্থিতি বদলাতে আপনার সঙ্গী।',
    subtitle: 'আপনার জীবনের জন্য বানানো | আরামদায়কতার কথা ভেবে ডিজাইন করা।'
  }
};

export const MissionSection = () => {
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
  return (
    <>
      <style jsx>{`
        .mission-heading {
          font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        }
        .mission-text {
          font-family: 'SF Pro Display', 'SF Pro Icons', 'Helvetica Neue', Helvetica, Arial, sans-serif !important;
        }
      `}</style>
      <section className="relative w-full py-8 sm:py-16 md:py-24 lg:py-32 px-4 sm:px-6" style={{ backgroundColor: 'white', fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
        <div className="mx-auto max-w-7xl">
          {/* Section Title */}
          <div className="mb-8 sm:mb-12 md:mb-16 text-center">
            <h2 className="mission-heading mb-4 sm:mb-6 font-semibold leading-tight tracking-tight bg-gradient-to-r from-black to-gray-400 bg-clip-text text-transparent text-[46px] sm:text-[36px] md:text-[48px] lg:text-[64px] xl:text-[96px]">
              {t.title}
            </h2>
            <p className="mission-text mx-auto max-w-3xl font-medium leading-relaxed text-sm sm:text-base md:text-lg lg:text-xl px-4" style={{ color: '#737373' }}>
              {t.description} {t.subtitle}
            </p>
          </div>

        {/* Split Image */}
        <div className="fade-in-up relative">
          <div className="absolute inset-0 bg-orange-300 blur-2xl opacity-40 rounded-2xl sm:rounded-3xl"></div>
          <div className="overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl relative z-10">
            <img 
              src={controlImage} 
              alt="Traditional vs smart lighting comparison"
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