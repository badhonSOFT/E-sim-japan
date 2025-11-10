import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ActivationGuide = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeTab, setActiveTab] = useState<"iPhone" | "Android">("iPhone");

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".guide-title", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        },
        opacity: 0,
        y: 30,
        duration: 0.8,
        ease: "power3.out"
      });
      gsap.from(".guide-tabs", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%"
        },
        opacity: 0,
        y: 20,
        duration: 0.6,
        delay: 0.2,
        ease: "power2.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        {/* Title and Subtitle */}
        <div className="guide-title text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-black mb-4">
            How to activate
          </h2>
          <p className="text-lg text-black">
            A WiFi connection is required when activating your eSIM.
          </p>
        </div>

        {/* Tabs */}
        <div className="guide-tabs flex justify-center mb-8">
          <div className="flex space-x-8">
            <button
              onClick={() => setActiveTab("iPhone")}
              className={`pb-2 text-lg transition-all ${
                activeTab === "iPhone"
                  ? "text-[#e6007e] font-bold border-b-2 border-[#e6007e]"
                  : "text-black hover:text-[#e6007e]"
              }`}
            >
              iPhone
            </button>
            <button
              onClick={() => setActiveTab("Android")}
              className={`pb-2 text-lg transition-all ${
                activeTab === "Android"
                  ? "text-[#e6007e] font-bold border-b-2 border-[#e6007e]"
                  : "text-black hover:text-[#e6007e]"
              }`}
            >
              Android
            </button>
          </div>
        </div>

        {/* Image Display */}
        <div className="flex justify-center">
          <div className="max-w-4xl w-full">
            <img
              src={activeTab === "iPhone" ? "/images/another/iphone.png" : "/images/another/andorid.png"}
              alt={`${activeTab} eSIM activation guide`}
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ActivationGuide;