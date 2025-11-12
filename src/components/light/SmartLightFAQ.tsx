import { useState, useEffect } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const SmartLightFAQ = () => {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('language') || 'EN';
  });

  const translations = {
    EN: {
      title: 'Frequently Asked Question(FAQ)',
      subtitle: 'Find answers to common questions about our smart lighting solutions'
    },
    বাং: {
      title: 'স্মার্ট লাইট FAQ',
      subtitle: 'আমাদের স্মার্ট লাইটিং সমাধান সম্পর্কে সাধারণ প্রশ্নের উত্তর খুঁজে নিন'
    }
  };

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

  const getFaqData = (lang: string) => {
    const data = {
      EN: {
        "Product Information": [
          {
            question: "What types of smart lights does SOHUB offer?",
            answer: "We provide three types of smart lighting solutions — Smart Spotlights, Smart Ceiling Lamps, and Smart LED Strip Lights, each designed to enhance comfort, energy efficiency, and modern aesthetics."
          },
          {
            question: "Can I control all lights from my mobile phone?",
            answer: "Yes! All SOHUB smart lights can be controlled directly from your mobile app, allowing you to switch on/off, dim, or change colors anytime, anywhere."
          },
          {
            question: "Do these lights support voice control?",
            answer: "Absolutely. You can control your lights using Google Assistant, Amazon Alexa, or Siri for a completely hands-free experience."
          }
        ],
        "Features & Functionality": [
          {
            question: "Can I schedule lighting or set automation?",
            answer: "Yes. You can easily set timers, schedules, and scenes — for example, have your lights dim automatically at night or turn on when you arrive home."
          },
          {
            question: "Are the lights dimmable and color-changeable?",
            answer: "Spotlight & Ceiling Lamp: Available in warm, cool, and adjustable white tones.\n\nLED Strip Light: Offers 16 million color options and dynamic lighting effects."
          },
          {
            question: "Do these lights save energy?",
            answer: "Definitely! Smart lights are energy-efficient, allowing you to reduce unnecessary usage through automation and remote control."
          }
        ]
      },
      বাং: {
        "পণ্যের তথ্য": [
          {
            question: "SOHUB কি ধরনের স্মার্ট লাইট অফার করে?",
            answer: "আমরা তিন ধরনের স্মার্ট লাইটিং সমাধান প্রদান করি — স্মার্ট স্পটলাইট, স্মার্ট সিলিং ল্যাম্প এবং স্মার্ট LED স্ট্রিপ লাইট, প্রতিটি আরাম, শক্তি দক্ষতা এবং আধুনিক নান্দনিকতা বৃদ্ধির জন্য ডিজাইন করা।"
          },
          {
            question: "আমি কি আমার মোবাইল ফোন থেকে সব লাইট নিয়ন্ত্রণ করতে পারি?",
            answer: "হ্যাঁ! সমস্ত SOHUB স্মার্ট লাইট সরাসরি আপনার মোবাইল অ্যাপ থেকে নিয়ন্ত্রণ করা যায়, যা আপনাকে যেকোনো সময়, যেকোনো জায়গায় চালু/বন্ধ, ডিম বা রঙ পরিবর্তন করতে দেয়।"
          },
          {
            question: "এই লাইটগুলি কি ভয়েস কন্ট্রোল সাপোর্ট করে?",
            answer: "একেবারেই। আপনি সম্পূর্ণ হ্যান্ডস-ফ্রি অভিজ্ঞতার জন্য Google Assistant, Amazon Alexa, বা Siri ব্যবহার করে আপনার লাইট নিয়ন্ত্রণ করতে পারেন।"
          }
        ],
        "বৈশিষ্ট্য ও কার্যকারিতা": [
          {
            question: "আমি কি লাইটিং শিডিউল করতে বা অটোমেশন সেট করতে পারি?",
            answer: "হ্যাঁ। আপনি সহজেই টাইমার, শিডিউল এবং দৃশ্য সেট করতে পারেন — উদাহরণস্বরূপ, রাতে আপনার লাইট স্বয়ংক্রিয়ভাবে ম্লান হতে বা আপনি বাড়িতে পৌঁছালে চালু হতে পারে।"
          },
          {
            question: "লাইটগুলি কি ডিমেবল এবং রঙ পরিবর্তনযোগ্য?",
            answer: "স্পটলাইট ও সিলিং ল্যাম্প: উষ্ণ, ঠান্ডা এবং সামঞ্জস্যযোগ্য সাদা টোনে উপলব্ধ।\n\nLED স্ট্রিপ লাইট: ১৬ মিলিয়ন রঙের বিকল্প এবং ডায়নামিক লাইটিং এফেক্ট অফার করে।"
          },
          {
            question: "এই লাইটগুলি কি শক্তি সাশ্রয় করে?",
            answer: "অবশ্যই! স্মার্ট লাইট শক্তি-দক্ষ, যা আপনাকে অটোমেশন এবং রিমোট কন্ট্রোলের মাধ্যমে অপ্রয়োজনীয় ব্যবহার কমাতে দেয়।"
          }
        ]
      }
    };
    return data[lang] || data.EN;
  };

  const faqData = getFaqData(language);

  return (
    <section className="pt-8 sm:pt-12 md:pt-16 pb-8 md:pb-10 lg:pb-12 bg-gray-50">
      <div className="container-width px-4 md:px-6">
        <div className="text-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-[28px] sm:text-[36px] md:text-[42px] lg:text-[48px] font-semibold text-primary mb-2 sm:mb-4 px-2 sm:px-4 pb-2 sm:pb-4" style={{background: 'linear-gradient(180deg, #1f2937, #374151, #6b7280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>{t.title}</h2>
          <p className="text-sm sm:text-base md:text-lg text-muted-foreground px-2 sm:px-4" style={{background: 'linear-gradient(180deg, #1f2937, #374151, #6b7280)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text'}}>
            {t.subtitle}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-lg border border-gray-200 p-4 sm:p-6">
            <Accordion type="single" collapsible className="space-y-3">
              {Object.entries(faqData).map(([category, faqs], categoryIndex) => 
                faqs.map((faq, index) => (
                  <AccordionItem 
                    key={`${categoryIndex}-${index}`} 
                    value={`faq-${categoryIndex}-${index}`} 
                    className="bg-white border border-gray-200 rounded-lg"
                  >
                    <AccordionTrigger className="text-left font-medium px-4 sm:px-5 py-3 sm:py-4 hover:no-underline text-gray-700 hover:text-gray-900 leading-relaxed" style={{fontSize: '14px'}}>
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 px-4 sm:px-5 pb-3 sm:pb-4 leading-relaxed" style={{fontSize: '14px'}}>
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))
              )}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SmartLightFAQ;