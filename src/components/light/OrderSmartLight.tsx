import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { SpotLightModal } from "@/components/ui/SpotLightModal";
import { CeilingLampModal } from "@/components/ui/Ceiling_lamb_modal";
import { useCart } from "@/hooks/useCart";
const spotlightImage = "/assets/Light/Spotlight.png";
const ceilingImage = "/assets/Light/Ceiling.png";
const stripLightImage = "/assets/Light/Strip-light.png";

const translations = {
  EN: {
    title: 'Choose Your Desired Light',
    subtitle: 'Complete your order in simple steps',
    delivery: 'FREE Delivery. 1-Year Warranty.',
    hashtag: '#SmartLightRevolution',
    buyNow: 'Buy Now',
    comingSoon: 'Coming Soon',
    spotlight: {
      name: 'Smart Spotlight',
      features: [
        'Multiple control options: Switch, remote, and mobile app',
        'RGBCW color modes with dimmable brightness',
        'Works with Alexa, Google Home, and Apple HomeKit',
        'Easy installation and setup'
      ]
    },
    ceiling: {
      name: 'Smart Ceiling Light',
      features: [
        'Adjustable color temperature: Warm ↔ Cool',
        'Mobile, voice, and remote control options',
        'RGBCW color modes for perfect ambiance',
        'Works with Alexa, Google Home, and Apple HomeKit',
        'Easy installation and setup'
      ]
    },
    strip: {
      name: 'Smart LED Strip',
      features: [
        'Voice Control with Alexa & Google Assistant',
        'App Control for brightness, color & effects',
        'Music Mode - syncs with sound & rhythm',
        'Remote Control included for quick operation',
        'Easy installation and setup'
      ]
    }
  },
  বাং: {
    title: 'আপনার পছন্দের আলো বেছে নিন',
    subtitle: 'সহজ ধাপে আপনার অর্ডার সম্পন্ন করুন',
    delivery: 'বিনামূল্যে ডেলিভারি। ১ বছরের ওয়ারেন্টি।',
    hashtag: '#স্মার্টলাইটবিপ্লব',
    buyNow: 'এখনই কিনুন',
    comingSoon: 'খুব শীঘ্রই',
    spotlight: {
      name: 'স্মার্ট স্পটলাইট',
      features: [
        'নিয়ন্ত্রণের জন্য একাধিক সুবিধা: সুইচ, রিমোট ও মোবাইল অ্যাপ।',
        'RGBCW রঙের বিভিন্ন মোড, যা উজ্জ্বলতা কমানো-বাড়ানোর সুবিধা দেয়',
        'অ্যালেক্সা, গুগল হোম এবং অ্যাপল হোমকিটের সাথে কাজ করে',
        'সহজেই ইন্সটল ও সেটআপ'
      ]
    },
    ceiling: {
      name: 'স্মার্ট সিলিং লাইট',
      features: [
        'আলোর রং পরিবর্তনযোগ্য: উষ্ণ ↔ শীতল',
        'মোবাইল, ভয়েস এবং রিমোটের মাধ্যমে নিয়ন্ত্রণ',
        'নিখুঁত পরিবেশের জন্য RGBCW রঙের বিভিন্ন মোড',
        'অ্যালেক্সা, গুগল হোম এবং অ্যাপল হোমকিটের সাথে কাজ করে',
        'সহজেই ইন্সটল ও সেটআপ'
      ]
    },
    strip: {
      name: 'স্মার্ট এলইডি স্ট্রিপ',
      features: [
        'অ্যালেক্সা এবং গুগল অ্যাসিস্ট্যান্ট দিয়ে ভয়েস কন্ট্রোল',
        'আলো, রং ও ইফেক্টের জন্য অ্যাপ কন্ট্রোল',
        'মিউজিক মোড - শব্দ এবং ছন্দের সাথে তাল মেলায়।',
        'দ্রুত ব্যবহারের জন্য রয়েছে রিমোট কন্ট্রোল',
        'সহজেই ইন্সটল ও সেটআপ'
      ]
    }
  }
};

const OrderSmartLight = () => {
  const [selectedProduct, setSelectedProduct] = useState("spotlight");
  const [expandedProduct, setExpandedProduct] = useState("spotlight");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedProductForModal, setSelectedProductForModal] = useState(null);
  const [ceilingModalOpen, setCeilingModalOpen] = useState(false);
  const [selectedCeilingProduct, setSelectedCeilingProduct] = useState(null);
  const { addItem } = useCart();
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

  const products = {
    "spotlight": {
      name: "Smart Spotlight",
      price: "4,500 BDT",
      image: spotlightImage,
      features: [
        "Multiple control options: Switch, remote, and mobile app",
        "RGBCW color modes with dimmable brightness",
        "Works with Alexa, Google Home, and Apple HomeKit",
        "Easy installation and setup"
      ]
    },
    "ceiling": {
      name: "Smart Ceiling Lamp",
      price: "5,999 BDT",
      image: ceilingImage,
      features: [
        "Adjustable color temperature: Warm ↔ Cool",
        "Mobile, voice, and remote control options",
        "RGBCW color modes for perfect ambiance",
        "Works with Alexa, Google Home, and Apple HomeKit",
        "Easy installation and setup"
      ]
    },
    "strip": {
      name: "Smart Strip Light",
      price: "6,399 BDT",
      image: stripLightImage,
      features: [
        "Voice Control with Alexa & Google Assistant",
        "App Control for brightness, color & effects",
        "Music Mode - syncs with sound & rhythm",
        "Remote Control included for quick operation",
        "Easy installation and setup"
      ]
    }
  };

  const toggleExpanded = (productId) => {
    setExpandedProduct(productId);
  };

  const handleBuyNow = (productId) => {
    if (productId === "spotlight") {
      const productData = {
        id: "spotlight",
        name: "Smart Spotlight",
        category: "Smart Lighting",
        price: 4500,
        stock: 10,
        image: spotlightImage
      };
      setSelectedProductForModal(productData);
      setModalOpen(true);
    } else if (productId === "ceiling") {
      const productData = {
        id: "ceiling",
        name: "Smart Ceiling Lamp",
        category: "Smart Lighting",
        price: 5999,
        stock: 10,
        image: ceilingImage
      };
      setSelectedCeilingProduct(productData);
      setCeilingModalOpen(true);
    } else {
      console.log('Buy now:', productId);
      // Add buy now functionality for other products here
    }
  };

  return (
    <>
      <section className="pt-8 sm:pt-12 pb-8 sm:pb-16 px-4 sm:px-6" style={{ backgroundColor: 'white' }} data-section="order-smart-light">
      <div className="container mx-auto">
        <motion.div 
          className="text-center space-y-3 sm:space-y-4"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ amount: 0.2 }}
        >
          <h2 className="text-sm sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2 apple-gradient-text px-2" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: language === 'বাং' ? '1.2' : 'inherit' }}>
            {t.title}
          </h2>
          <p className="text-base sm:text-lg px-2" style={{ color: 'rgba(0,0,0,0.7)', fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif', lineHeight: language === 'বাং' ? '1.5' : 'inherit' }}>
            {t.subtitle}
          </p>
          <p className="text-sm sm:text-base px-2" style={{ color: 'rgba(0,0,0,0.6)', fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
            {t.delivery}{" "}
            <span className="text-red-600">{t.hashtag}</span>
          </p>
        </motion.div>
        
        <motion.div 
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto mt-8 sm:mt-12"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          viewport={{ amount: 0.2 }}
        >
          {/* Left side - Image */}
          <div className="p-4 sm:p-6 md:p-8 rounded-lg" style={{ backgroundColor: '#fbfbfb' }}>
            <img 
              src={products[selectedProduct].image}
              alt={products[selectedProduct].name}
              className="w-full h-auto object-contain max-h-[300px] sm:max-h-[400px] mx-auto"
            />
          </div>
          
          {/* Right side - Product Selection */}
          <div className="space-y-4 sm:space-y-6">
            <div className="space-y-4">
              <div 
                className={`border rounded-lg cursor-pointer transition-colors ${
                  selectedProduct === "spotlight" ? "border-black" : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: '#fbfbfb' }}
                onMouseEnter={() => setSelectedProduct("spotlight")}
                onClick={() => toggleExpanded("spotlight")}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm sm:text-base" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>{t.spotlight.name}</span>
                    <div className="text-right">
                      <div className="font-bold mb-2 text-sm sm:text-base" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>4,500 BDT</div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow("spotlight");
                        }}
                        className="bg-black hover:bg-gray-800 text-white py-1 px-2 sm:px-3 rounded text-xs font-medium transition-colors"
                        style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
                      >
                        {t.buyNow}
                      </button>
                    </div>
                  </div>
                </div>
                {expandedProduct === "spotlight" && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t border-gray-200 mt-2">
                    <ul className="text-xs sm:text-sm text-gray-600 mt-2 space-y-1" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                      {t.spotlight.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
              
              <div 
                className={`border rounded-lg cursor-pointer transition-colors ${
                  selectedProduct === "ceiling" ? "border-black" : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: '#fbfbfb' }}
                onMouseEnter={() => setSelectedProduct("ceiling")}
                onClick={() => toggleExpanded("ceiling")}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm sm:text-base" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>{t.ceiling.name}</span>
                    <div className="text-right">
                      <div className="font-bold mb-2 text-sm sm:text-base" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>5,999 BDT</div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow("ceiling");
                        }}
                        className="bg-black hover:bg-gray-800 text-white py-1 px-2 sm:px-3 rounded text-xs font-medium transition-colors"
                        style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>
                </div>
                {expandedProduct === "ceiling" && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t border-gray-200 mt-2">
                    <ul className="text-xs sm:text-sm text-gray-600 mt-2 space-y-1" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                      {t.ceiling.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div 
                className={`border rounded-lg cursor-pointer transition-colors ${
                  selectedProduct === "strip" ? "border-black" : "border-gray-300 hover:border-gray-400"
                }`}
                style={{ backgroundColor: '#fbfbfb' }}
                onMouseEnter={() => setSelectedProduct("strip")}
                onClick={() => toggleExpanded("strip")}
              >
                <div className="p-3 sm:p-4">
                  <div className="flex justify-between items-start">
                    <span className="font-semibold text-sm sm:text-base" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>{t.strip.name}</span>
                    <div className="text-right">
                      <div className="font-bold mb-2 text-sm sm:text-base" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>0 BDT</div>
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          handleBuyNow("strip");
                        }}
                        className="bg-gray-400 text-white py-1 px-2 sm:px-3 rounded text-xs font-medium cursor-not-allowed"
                        style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}
                        disabled
                      >
                        {t.comingSoon}
                      </button>
                    </div>
                  </div>
                </div>
                {expandedProduct === "strip" && (
                  <div className="px-3 sm:px-4 pb-3 sm:pb-4 pt-0 border-t border-gray-200 mt-2">
                    <ul className="text-xs sm:text-sm text-gray-600 mt-2 space-y-1" style={{ fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif' }}>
                      {t.strip.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-gray-400 mt-1 flex-shrink-0">•</span>
                          <span className="leading-relaxed">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
      </section>
      
      {/* SpotLight Modal */}
      {selectedProductForModal && (
        <SpotLightModal
          open={modalOpen}
          onOpenChange={setModalOpen}
          product={selectedProductForModal}
          onAddToCart={async (payload) => {
            console.log('Add to cart:', payload);
          }}
          onBuyNow={async (payload) => {
            console.log('Buy now:', payload);
          }}
          addToCart={addItem}
        />
      )}
      
      {/* Ceiling Lamp Modal */}
      {selectedCeilingProduct && (
        <CeilingLampModal
          open={ceilingModalOpen}
          onOpenChange={setCeilingModalOpen}
          product={selectedCeilingProduct}
          onAddToCart={async (payload) => {
            console.log('Add to cart:', payload);
          }}
          onBuyNow={async (payload) => {
            console.log('Buy now:', payload);
          }}
          addToCart={addItem}
        />
      )}
    </>
  );
};

export default OrderSmartLight;