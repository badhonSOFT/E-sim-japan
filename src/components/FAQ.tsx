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
    question: "How quickly can I get my eSIM?",
    answer: "Instantly! QR code delivered to email within 2 minutes of payment."
  },
  {
    question: "When should I activate it?",
    answer: "Activate just before departure or upon landing in Japan."
  },
  {
    question: "Can I make phone calls?",
    answer: "Data-only eSIM. Use WhatsApp, Skype for calls. Your main SIM stays active for regular calls."
  },
  {
    question: "What if it doesn't work?",
    answer: "24/7 support + 100% money-back guarantee if we can't resolve issues."
  },
  {
    question: "Which network will I use?",
    answer: "Premium networks: NTT Docomo and SoftBank - Japan's most reliable."
  },
  {
    question: "Can I share internet with others?",
    answer: "Yes! Hotspot feature included in all plans."
  },
  {
    question: "What happens after my plan expires?",
    answer: "Service stops automatically. No auto-renewal or surprise charges."
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
        x: -30,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="faq" className="py-20 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <h2 className="faq-title text-4xl md:text-5xl font-semibold text-center mb-16">
          Frequently Asked Questions
        </h2>
        
        <CustomAccordion type="single" collapsible className="space-y-6">
          {faqs.map((faq, index) => (
            <CustomAccordionItem className="faq-item" 
              key={index} 
              value={`item-${index}`}
            >
              <CustomAccordionTrigger>
                {faq.question}
              </CustomAccordionTrigger>
              <CustomAccordionContent>
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
