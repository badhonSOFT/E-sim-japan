import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const spotlightImage = "/assets/Light/Spotlight.png";
const ceilingImage = "/assets/Light/Ceiling.png";
const stripLightImage = "/assets/Light/Strip-light.png";

const translations = {
  EN: {
    title: 'Choose Your Desired Light',
    buyNow: 'Buy Now',
    comingSoon: 'Coming Soon',
    seeInAction: 'See It In Action',
    products: [
      {
        name: "Spotlight",
        type: "Smart Spotlight",
        description: "Perfect for accent lighting.",
        features: [
          "Multiple control options: Switch, remote, and mobile app",
          "RGBCW color modes with dimmable brightness",
          "Works with Alexa, Google Home, and Apple HomeKit",
          "Easy installation and setup"
        ]
      },
      {
        name: "Ceiling Lamp",
        type: "Smart Ceiling Light",
        description: "Complete room illumination.",
        features: [
          "Adjustable color temperature: Warm ↔ Cool",
          "Mobile, voice, and remote control options",
          "RGBCW color modes for perfect ambiance",
          "Works with Alexa, Google Home, and Apple HomeKit",
          "Easy installation and setup"
        ]
      },
      {
        name: "Strip Light",
        type: "Smart LED Strip",
        description: "Ambient and decorative lighting.",
        features: [
          "Voice Control with Alexa & Google Assistant",
          "App Control for brightness, color & effects",
          "Music Mode - syncs with sound & rhythm",
          "Remote Control included for quick operation",
          "Easy installation and setup"
        ]
      }
    ]
  },
  বাং: {
    title: 'আপনার পছন্দের আলো বেছে নিন',
    buyNow: 'এখনই কিনুন',
    comingSoon: 'খুব শীঘ্রই',
    seeInAction: 'কার্যক্রমে দেখুন',
    products: [
      {
        name: "স্পটলাইট",
        type: "স্মার্ট স্পটলাইট",
        description: "অ্যাকসেন্ট লাইটিং-এর জন্য সেরা।",
        features: [
          "নিয়ন্ত্রণের জন্য একাধিক সুবিধা: সুইচ, রিমোট ও মোবাইল অ্যাপ।",
          "RGBCW রঙের বিভিন্ন মোড, যা উজ্জ্বলতা কমানো-বাড়ানোর সুবিধা দেয়",
          "অ্যালেক্সা, গুগল হোম এবং অ্যাপল হোমকিটের সাথে কাজ করে",
          "সহজেই ইন্সটল ও সেটআপ"
        ]
      },
      {
        name: "সিলিং ল্যাম্প",
        type: "স্মার্ট সিলিং লাইট",
        description: "পুরো ঘরকে আলোকিত করে।",
        features: [
          "আলোর রং পরিবর্তনযোগ্য: উষ্ণ ↔ শীতল",
          "মোবাইল, ভয়েস এবং রিমোটের মাধ্যমে নিয়ন্ত্রণ",
          "নিখুঁত পরিবেশের জন্য RGBCW রঙের বিভিন্ন মোড",
          "অ্যালেক্সা, গুগল হোম এবং অ্যাপল হোমকিটের সাথে কাজ করে",
          "সহজেই ইন্সটল ও সেটআপ"
        ]
      },
      {
        name: "স্ট্রিপ লাইট",
        type: "স্মার্ট এলইডি স্ট্রিপ",
        description: "আরামদায়ক এবং আকর্ষণীয় আলো।",
        features: [
          "অ্যালেক্সা এবং গুগল অ্যাসিস্ট্যান্ট দিয়ে ভয়েস কন্ট্রোল",
          "আলো, রং ও ইফেক্টের জন্য অ্যাপ কন্ট্রোল",
          "মিউজিক মোড - শব্দ এবং ছন্দের সাথে তাল মেলায়।",
          "দ্রুত ব্যবহারের জন্য রয়েছে রিমোট কন্ট্রোল",
          "সহজেই ইন্সটল ও সেটআপ"
        ]
      }
    ]
  }
};

const ChooseDesiredLight = () => {
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

  const products = [
    {
      image: spotlightImage,
      name: "Spotlight",
      type: "Smart Spotlight",
      description: "Perfect for accent lighting.",
      features: [
        { text: "Multiple control options: Switch, remote, and mobile app", icon: "control" },
        { text: "RGBCW color modes with dimmable brightness", icon: "color" },
        { text: "Works with Alexa, Google Home, and Apple HomeKit", icon: "voice" },
        { text: "Easy installation and setup", icon: "setup" }
      ]
    },
    {
      image: ceilingImage,
      name: "Ceiling Lamp",
      type: "Smart Ceiling Light",
      description: "Complete room illumination.",
      features: [
        { text: "Adjustable color temperature: Warm ↔ Cool", icon: "temperature" },
        { text: "Mobile, voice, and remote control options", icon: "control" },
        { text: "RGBCW color modes for perfect ambiance", icon: "color" },
        { text: "Works with Alexa, Google Home, and Apple HomeKit", icon: "voice" },
        { text: "Easy installation and setup", icon: "setup" }
      ]
    },
    {
      image: stripLightImage,
      name: "Strip Light",
      type: "Smart LED Strip",
      description: "Ambient and decorative lighting.",
      features: [
        { text: "Voice Control with Alexa & Google Assistant", icon: "voice" },
        { text: "App Control for brightness, color & effects", icon: "app" },
        { text: "Music Mode - syncs with sound & rhythm", icon: "music" },
        { text: "Remote Control included for quick operation", icon: "remote" },
        { text: "Easy installation and setup", icon: "setup" }
      ]
    }
  ];

  const getIcon = (iconType: string) => {
    switch (iconType) {
      case "control":
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        );
      case "color":
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zM3 15a1 1 0 011-1h1a1 1 0 011 1v1a1 1 0 01-1 1H4a1 1 0 01-1-1v-1zm6-11a1 1 0 011-1h4a1 1 0 011 1v7a1 1 0 01-1 1h-4a1 1 0 01-1-1V4zm6 7a1 1 0 011-1h1a1 1 0 011 1v4a1 1 0 01-1 1h-1a1 1 0 01-1-1v-4z" clipRule="evenodd" />
          </svg>
        );
      case "voice":
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M7 4a3 3 0 016 0v4a3 3 0 11-6 0V4zm4 10.93A7.001 7.001 0 0017 8a1 1 0 10-2 0A5 5 0 015 8a1 1 0 00-2 0 7.001 7.001 0 006 6.93V17H6a1 1 0 100 2h8a1 1 0 100-2h-3v-2.07z" clipRule="evenodd" />
          </svg>
        );
      case "setup":
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
      case "temperature":
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 16a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
          </svg>
        );
      case "app":
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1V4zm2 2V5h1v1H5zM3 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1H4a1 1 0 01-1-1v-3zm2 2v-1h1v1H5zM13 3a1 1 0 00-1 1v3a1 1 0 001 1h3a1 1 0 001-1V4a1 1 0 00-1-1h-3zm1 2v1h1V5h-1zM12 13a1 1 0 011-1h3a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-3zm2 2v-1h1v1h-1z" clipRule="evenodd" />
          </svg>
        );
      case "music":
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M18 3a1 1 0 00-1.196-.98l-10 2A1 1 0 006 5v9.114A4.369 4.369 0 005 14c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V7.82l8-1.6v5.894A4.37 4.37 0 0015 12c-1.657 0-3 .895-3 2s1.343 2 3 2 3-.895 3-2V3z" />
          </svg>
        );
      case "remote":
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V4a2 2 0 00-2-2H6zm1 2a1 1 0 000 2h6a1 1 0 100-2H7zm6 7a1 1 0 11-2 0 1 1 0 012 0zm-3 3a1 1 0 11-2 0 1 1 0 012 0zm-3-3a1 1 0 11-2 0 1 1 0 012 0zm3-3a1 1 0 11-2 0 1 1 0 012 0z" clipRule="evenodd" />
          </svg>
        );
      default:
        return (
          <svg className="w-4 h-4 text-gray-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        );
    }
  };

  return (
    <section className="pt-8 pb-12 sm:pt-16 sm:pb-16 lg:pb-[120px] px-4 sm:px-6" style={{ backgroundColor: 'white' }}>
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-8 sm:mb-12 md:mb-16"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ amount: 0.2 }}
        >
          <h2 className="text-sm sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2 apple-gradient-text px-2" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: language === 'বাং' ? '1.2' : 'inherit' }}>
            {t.title}
          </h2>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ amount: 0.2 }}
        >
          {t.products.map((product, index) => (
            <div key={index} className="text-center">
              <div className="p-4 sm:p-6 md:p-8 rounded-lg h-[240px] sm:h-[280px] md:h-[320px] flex items-center justify-center" style={{ backgroundColor: '#fbfbfb' }}>
                <img src={products[index].image} alt={product.name} className="w-full h-full object-contain" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mt-3 sm:mt-4 px-2" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                {product.name}
              </h3>
              <p className="text-sm sm:text-base mt-2 px-2" style={{ color: 'rgba(0,0,0,0.6)', fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                {product.type}
              </p>
              <p className="text-sm mt-1 px-2" style={{ color: 'black', fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                {product.description}
              </p>
              
              <div className="w-full h-px bg-gray-300 mt-4 mb-4"></div>
              
              <div className="text-left space-y-2 px-2">
                {product.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start gap-2">
                    <div className="mt-0.5 flex-shrink-0">{getIcon(products[index].features[featureIndex].icon)}</div>
                    <span className="text-xs sm:text-sm md:text-base leading-relaxed" style={{ color: 'rgba(0,0,0,0.6)', fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 sm:mt-6 text-left px-2">
                {index === 2 ? (
                  <button 
                    disabled
                    className="bg-gray-400 text-white py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium w-full sm:w-auto cursor-not-allowed"
                    style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
                  >
                    {t.comingSoon}
                  </button>
                ) : (
                  <button 
                    onClick={() => {
                      const orderSection = document.querySelector('[data-section="order-smart-light"]');
                      if (orderSection) {
                        orderSection.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="bg-black hover:bg-gray-800 text-white py-2 px-3 sm:px-4 rounded-lg text-xs sm:text-sm font-medium transition-colors w-full sm:w-auto"
                    style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
                  >
                    {t.buyNow}
                  </button>
                )}
              </div>
            </div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-8 sm:mt-12 px-4"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.4 }}
          viewport={{ amount: 0.2 }}
        >
          <button
            onClick={() => {
              const lightingSection = document.querySelector('[data-section="lighting-visualizer"]');
              if (lightingSection) {
                lightingSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-white text-black border-2 border-black rounded-lg font-semibold transition-all duration-300 hover:bg-black hover:text-white text-sm sm:text-base w-full sm:w-auto"
            style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
          >
            {t.seeInAction}
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default ChooseDesiredLight;