import {
  CustomAccordion,
  CustomAccordionItem,
  CustomAccordionTrigger,
  CustomAccordionContent,
} from "@/components/ui/faq-accordion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const faqs = [
  {
    question: "How quickly will I receive my eSIM?",
    answer: "Your eSIM QR code is delivered instantly to your email within 2 minutes of successful payment confirmation. No waiting periods or shipping delays."
  },
  {
    question: "When is the optimal time to activate my eSIM?",
    answer: "We recommend activating your eSIM either just before departure or immediately upon arrival in Japan to ensure seamless connectivity from the moment you land."
  },
  {
    question: "Does the eSIM support voice calls and SMS?",
    answer: "Our eSIM provides high-speed data connectivity only. For voice calls, you can use VoIP services like WhatsApp, Skype, or FaceTime. Your primary SIM remains active for traditional calls and SMS."
  },
  {
    question: "What support is available if I encounter issues?",
    answer: "We provide 24/7 multilingual customer support with a 100% satisfaction guarantee. If we cannot resolve your connectivity issues, we offer a full refund with no questions asked."
  },
  {
    question: "Which mobile networks will my eSIM connect to?",
    answer: "Your eSIM automatically connects to Japan's premium tier-1 networks including NTT Docomo, SoftBank, and au by KDDI, ensuring optimal coverage and reliability nationwide."
  },
  {
    question: "Can I share my connection with other devices?",
    answer: "Yes, all our eSIM plans include mobile hotspot functionality, allowing you to share your high-speed connection with multiple devices including laptops, tablets, and other smartphones."
  },
  {
    question: "What happens when my data plan expires?",
    answer: "Your service will automatically cease upon plan expiration. There are no auto-renewals, hidden fees, or surprise charges. You maintain full control over your usage and billing."
  },
  {
    question: "Is my device compatible with eSIM technology?",
    answer: "Most modern smartphones support eSIM, including iPhone XS and newer, Google Pixel 3 and newer, and Samsung Galaxy S20 and newer. Check your device settings for eSIM compatibility."
  }
];

const FAQ = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".faq-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".faq-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        stagger: 0.08,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="relative py-24 px-4 overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 via-teal-50/40 to-cyan-50/60"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-transparent to-white/70"></div>
      
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-emerald-100/50 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-teal-100/40 rounded-full blur-3xl"></div>
      
      <div className="relative max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="faq-title text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-emerald-800 to-teal-800 bg-clip-text text-transparent mb-4" style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto" style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            Everything you need to know about our premium eSIM service
          </p>
        </div>
        
        <CustomAccordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <CustomAccordionItem className="faq-item" 
              key={index} 
              value={`item-${index}`}
            >
              <CustomAccordionTrigger style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                {faq.question}
              </CustomAccordionTrigger>
              <CustomAccordionContent style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                {faq.answer}
              </CustomAccordionContent>
            </CustomAccordionItem>
          ))}
        </CustomAccordion>
      </div>
    </section>
  );
};

export default FAQ;
