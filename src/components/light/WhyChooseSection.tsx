import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const translations = {
  EN: {
    title: 'Why choose Smart Light?',
    smartControl: 'Smart Control',
    smartControlDesc: 'Easily controlled via app, voice command, remote, or motion sensor.',
    manualControl: 'Manual Control',
    manualControlDesc: 'Requires physical switch access every time you want to turn it on or off.',
    adjustableBrightness: 'Adjustable brightness and color',
    adjustableBrightnessDesc: 'Customize brightness and choose from warm to cool tones or dynamic colors.',
    fixedBrightness: 'Fixed brightness and color',
    fixedBrightnessDesc: 'Limited to one color and brightness level — no customization possible.',
    smartScheduling: 'Smart Scheduling',
    smartSchedulingDesc: 'Set timers, routines, and automation for effortless daily lighting control.',
    noScheduling: 'No Scheduling',
    noSchedulingDesc: 'Cannot automate lighting based on time or routine.'
  },
  বাং: {
    title: '"স্মার্ট লাইট" কেন বেছে নেবেন?',
    smartControl: 'স্মার্ট কন্ট্রোল',
    smartControlDesc: 'অ্যাপ, ভয়েস কমান্ড, রিমোট বা মোশন সেন্সর দিয়ে সহজে নিয়ন্ত্রণ করা যায়।',
    manualControl: 'ম্যানুয়াল কন্ট্রোল',
    manualControlDesc: 'প্রতিবার চালু বা বন্ধ করার জন্য সুইচ টিপতে হয়।',
    adjustableBrightness: 'আলো ও রং কমানো-বাড়ানো যায়',
    adjustableBrightnessDesc: 'আলো কমানো-বাড়ানো এবং উষ্ণ থেকে শীতল বা রঙিন আলো বেছে নেওয়া যায়।',
    fixedBrightness: 'নির্দিষ্ট আলো ও রং',
    fixedBrightnessDesc: 'একটি নির্দিষ্ট রং ও আলোর মধ্যে সীমাবদ্ধ — কাস্টমাইজ করা যায় না।',
    smartScheduling: 'স্মার্ট সময়সূচি',
    smartSchedulingDesc: 'প্রতিদিনের আলোর নিয়ন্ত্রণের জন্য টাইমার, রুটিন ও অটোমেশন সেট করা যায়।',
    noScheduling: 'কোনো সময়সূচি নেই',
    noSchedulingDesc: 'সময় বা রুটিন অনুযায়ী আলো স্বয়ংক্রিয়ভাবে নিয়ন্ত্রণ করা যাচ্ছে না।'
  }
};

const WhyChooseSection = () => {
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
    <section className="pt-8 sm:pt-12 md:pt-16 pb-12 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-8 sm:mb-10 md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-semibold mb-4 tracking-tight leading-tight apple-gradient-text how-it-works-title pb-2" style={{background: 'linear-gradient(180deg, #1f2937, #374151, #6b7280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text', fontSize: window.innerWidth < 768 ? '28px' : undefined, lineHeight: language === 'বাং' ? '1.2' : 'inherit'}}>
            {t.title}
          </div>
        </motion.div>
        
        <div className="relative">
          {/* Timeline - visible on all screens */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gray-300" />
          
          <div className="space-y-6 md:space-y-10">
            {[
              { step: "Smart", title: t.smartControl, description: t.smartControlDesc, image: "/assets/Light/app control.png" },
              { step: "Manual", title: t.manualControl, description: t.manualControlDesc, image: "/assets/Light/manual.jpeg" },
              { step: "Smart", title: t.adjustableBrightness, description: t.adjustableBrightnessDesc, image: "/assets/Light/adjustable.jpeg" },
              { step: "Manual", title: t.fixedBrightness, description: t.fixedBrightnessDesc, image: "/assets/Light/fixed.jpeg" },
              { step: "Smart", title: t.smartScheduling, description: t.smartSchedulingDesc, image: "/assets/Light/smart-scheduling.png" },
              { step: "Manual", title: t.noScheduling, description: t.noSchedulingDesc, image: "/assets/Light/No-scheduling.png" }
            ].map((item, index) => (
              <motion.div
                key={item.step}
                className={`flex items-stretch ${index % 2 === 0 ? 'flex-col md:flex-row' : 'flex-col md:flex-row-reverse'}`}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
              >
                {/* Mobile Layout - Side by side like desktop */}
                <div className={`md:hidden flex items-stretch ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`flex-1 ${index % 2 === 0 ? 'pr-4 text-right' : 'pl-4 text-left'}`}>
                    <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 w-full h-32 flex flex-col justify-start">
                      <h3 className={`text-xs font-bold mb-1 leading-tight break-words ${item.step === 'Manual' ? 'text-red-500' : 'text-black'}`}>{item.title}</h3>
                      <p className="text-gray-400 leading-tight text-[8px] break-words" style={{wordBreak: 'break-word', hyphens: 'auto', textAlign: 'justify'}}>{item.description}</p>
                    </div>
                  </div>
                  
                  <div className="relative z-10 flex items-center flex-shrink-0">
                    {item.step === 'Manual' ? (
                      <div className="w-12 h-6 bg-red-500 flex items-center justify-center" style={{clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 30% 100%, 0 50%)'}}>
                        <span className="text-white font-semibold text-[8px]" style={{marginLeft: '4px'}}>{item.step}</span>
                      </div>
                    ) : (
                      <div className="w-12 h-6 bg-gray-900 flex items-center justify-center" style={{clipPath: 'polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%)'}}>
                        <span className="text-white font-semibold text-[8px]" style={{marginRight: '4px'}}>{item.step}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className={`flex-1 ${index % 2 === 0 ? 'pl-4' : 'pr-4'}`}>
                    <div className="w-full h-32 rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Desktop Layout */}
                <div className={`hidden md:flex md:flex-1 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-200 w-full h-40 flex flex-col justify-center min-w-0">
                    <h3 className={`text-2xl font-bold mb-2 ${item.step === 'Manual' ? 'text-red-500' : 'text-black'}`}>{item.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
                
                <div className="hidden md:flex relative z-10 items-center flex-shrink-0">
                  {item.step === 'Manual' ? (
                    <div className="w-16 h-10 bg-red-500 flex items-center justify-center" style={{clipPath: 'polygon(30% 0, 100% 0, 100% 100%, 30% 100%, 0 50%)'}}>
                      <span className="text-white font-semibold text-[12px]" style={{marginLeft: '6px'}}>{item.step}</span>
                    </div>
                  ) : (
                    <div className="w-16 h-10 bg-gray-900 flex items-center justify-center" style={{clipPath: 'polygon(0 0, 70% 0, 100% 50%, 70% 100%, 0 100%)'}}>
                      <span className="text-white font-semibold text-[12px]" style={{marginRight: '6px'}}>{item.step}</span>
                    </div>
                  )}
                </div>
                
                <div className={`hidden md:flex md:flex-1 ${index % 2 === 0 ? 'pl-8' : 'pr-8'}`}>
                  <div className="w-full h-40 rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;