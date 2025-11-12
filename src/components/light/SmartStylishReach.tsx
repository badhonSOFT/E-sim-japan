import { motion } from "framer-motion";
import { useState, useEffect } from "react";
const spotImage = "/assets/Light/Spotlight.png";
const ceilingImage = "/assets/Light/Ceiling.png";
const stripLightImage = "/assets/Light/Strip-light.png";

const translations = {
  EN: {
    title: 'Smart, Stylish, Within Reach',
    subtitle: 'Beautiful lighting that doesn\'t break the bank.',
    description: 'Smart technology, elegant design, and seamless control — giving you premium lighting experience at a price that truly respects your budget.',
    hashtag: '#SmartLightRevolution'
  },
  বাং: {
    title: 'স্মার্ট, স্টাইলিশ, হাতের নাগালে',
    subtitle: 'সুন্দর আলো, যা আপনার পকেটে চাপ সৃষ্টি করবে না।',
    description: 'স্মার্ট প্রযুক্তি, চমৎকার ডিজাইন এবং সহজ নিয়ন্ত্রণ—যা আপনার বাজেটকে সম্মান জানিয়ে একটি প্রিমিয়াম আলোর অভিজ্ঞতা দেয়।',
    hashtag: '#স্মার্টলাইটবিপ্লব'
  }
};

const SmartStylishReach = () => {
  const images = [spotImage, ceilingImage, stripLightImage];
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 2000); // Change image every 2 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <section className="pt-8 pb-8 sm:pt-16 sm:pb-16 px-4 sm:px-6" style={{ backgroundColor: 'white' }}>
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-2 items-center">
          <motion.div 
            className="space-y-3 sm:space-y-4 text-center lg:text-left"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ amount: 0.2 }}
          >
            <h2 className="text-sm sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2 apple-gradient-text px-2" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: language === 'বাং' ? '1.2' : 'inherit' }}>
              {t.title}
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-500 leading-relaxed px-2" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: language === 'বাং' ? '1.6' : 'inherit' }}>
              {t.subtitle}<br className="hidden sm:block" />
              {t.description}
            </p>
            <p className="text-red-600 font-medium text-sm sm:text-base px-2" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
              {t.hashtag}
            </p>
          </motion.div>
          <motion.div 
            className="flex justify-center lg:justify-end lg:ml-8 mt-6 lg:mt-0"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            viewport={{ amount: 0.2 }}
          >
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-md h-60 sm:h-72 md:h-80">
              <motion.img
                key={currentImageIndex}
                src={images[currentImageIndex]}
                alt={`Smart Light Product ${currentImageIndex + 1}`}
                className="absolute inset-0 w-full h-full object-contain"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SmartStylishReach;