import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const translations = {
  EN: {
    title: 'Designed for Every Mood',
    description: 'Lighting shouldn\'t be one-size-fits-all. It should adapt to your life — your energy, your activities, your moments. With Smart Light, every room becomes a canvas for your mood. From energizing mornings to relaxing evenings, create the perfect atmosphere for every part of your day.'
  },
  বাং: {
    title: 'আপনার প্রতিটি অনুভূতির জন্য তৈরি',
    description: 'আলো সবার জন্য এক নয়। আপনার এনার্জি, কাজ এবং মুহূর্ত অনুযায়ী এটি আপনার জীবনের সঙ্গে মানিয়ে চলবে। স্মার্ট লাইট দিয়ে, আপনার ঘর হয়ে উঠুক আপনার মনের ক্যানভাস। সকালের প্রাণবন্ত মুহূর্ত থেকে সন্ধ্যার শান্তিময় সময় পর্যন্ত, আপনার দিনের প্রতিটি মুহূর্তের জন্য নিখুঁত পরিবেশ তৈরি করুন।'
  }
};

const DesignedForMood = () => {
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
    <section className="pt-8 sm:pt-12 pb-8 sm:pb-16 px-4 sm:px-6" style={{ backgroundColor: '#fef3f3' }}>
      <div className="container mx-auto">
        <motion.div 
          className="text-center space-y-4 sm:space-y-6 md:space-y-8"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ amount: 0.2 }}
        >
          <h2 className="text-sm sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2 apple-gradient-text px-2" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: language === 'বাং' ? '1.2' : 'inherit' }}>
            {t.title}
          </h2>
          <div className="max-w-2xl mx-auto px-4">
            <p className="text-sm sm:text-base md:text-lg font-light text-muted-foreground mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: language === 'বাং' ? '1.6' : 'inherit' }}>
              {t.description}
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default DesignedForMood;