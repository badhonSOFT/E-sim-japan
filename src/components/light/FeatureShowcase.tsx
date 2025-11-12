const transformVideo = "/assets/Light/transform.mp4";
const voiceVideo = "/assets/Light/Alexa.mp4";
import { useEffect, useRef, useState } from "react";

const translations = {
  EN: {
    oneTapControl: 'One Tap, Total Control.',
    oneTapCaption: 'Your entire home, in the palm of your hand. Adjust every room with precision and ease.',
    justAsk: 'Just Ask.',
    justAskCaption: 'Works seamlessly with Google Home and Alexa. Your voice is all you need.'
  },
  বাং: {
    oneTapControl: 'একটি ট্যাপে, সম্পূর্ণ নিয়ন্ত্রণ।',
    oneTapCaption: 'পুরো বাড়ি আপনার হাতের মুঠোয়। প্রতিটি ঘরকে নিখুঁত ও সহজভাবে নিয়ন্ত্রণ করুন।',
    justAsk: 'শুধু জিজ্ঞেস করুন',
    justAskCaption: 'গুগল হোম এবং অ্যালেক্সার সাথে এটি নির্বিঘ্নে কাজ করে। আপনার কণ্ঠস্বরই সবকিছু নিয়ন্ত্রণের জন্য যথেষ্ট।'
  }
};

export const FeatureShowcase = () => {
  const sectionRef = useRef(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          } else {
            entry.target.classList.remove('visible');
          }
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('.scroll-animate');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);
  const features = [
    {
      image: transformVideo,
      title: t.oneTapControl,
      caption: t.oneTapCaption,
      isVideo: true,
      textOrder: 'left'
    },
    {
      image: voiceVideo,
      title: t.justAsk,
      caption: t.justAskCaption,
      isVideo: true,
      textOrder: 'right'
    }
  ];

  return (
    <>
      <style jsx>{`
        .gradient-heading {
          background: linear-gradient(to bottom, #000000 0%, #000000 30%, rgba(0, 0, 0, 0.3) 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }
        .scroll-animate {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.6s ease-out;
        }
        .scroll-animate.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
      <section className="relative w-full" style={{ backgroundColor: 'white' }}>
      {features.map((feature, index) => (
        <div 
          key={index}
          className="relative w-full"
          style={{ backgroundColor: 'white' }}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-12 md:py-16">
            <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-4 sm:gap-8 md:gap-12">
              {/* Text Content */}
              <div className={`scroll-animate text-center md:text-left ${feature.textOrder === 'left' ? 'md:order-1' : 'md:order-2'}`}>
                <h2 className="mb-3 sm:mb-6 font-semibold leading-tight tracking-tight text-sm sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2 apple-gradient-text px-2" style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif', lineHeight: language === 'বাং' ? '1.2' : 'inherit' }}>
                  {feature.title}
                </h2>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed text-muted-foreground px-2" style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                  {feature.caption}
                </p>
              </div>

              {/* Image/Video */}
              <div className={`scroll-animate w-full ${feature.textOrder === 'left' ? 'md:order-2' : 'md:order-1'}`} style={{ transitionDelay: "0.2s" }}>
                <div className="overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl">
                  {feature.isVideo ? (
                    <video 
                      src={feature.image}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-auto"
                    />
                  ) : (
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-auto transition-transform hover:scale-105"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      </section>
    </>
  );
};