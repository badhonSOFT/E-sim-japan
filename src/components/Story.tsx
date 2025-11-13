import { useEffect, useRef } from "react";

const Story = () => {
  const sectionRef = useRef(null);

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
      image: "/images/another/problems.png",
      title: "Tired of These Travel Internet Problems?",
      items: [
        "Long airport queues for local SIM cards",
        "Expensive roaming charges ($10-50/day)",
        "Complex registration processes",
        "No internet for maps, bookings, translation",
        "Missing important calls/messages",
        "Unreliable public WiFi"
      ],
      isVideo: false,
      textOrder: 'right',
      itemColor: 'bg-red-500'
    },
    {
      image: "/images/another/why_choose.png",
      title: "Why Choose Our Global eSIM?",
      items: [
        "Instant QR code delivery via email",
        "Activate before/during flight",
        "Connected the moment you land",
        "Keep your home number active",
        "Premium local networks worldwide",
        "Hotspot sharing enabled",
        "24/7 English support"
      ],
      isVideo: false,
      textOrder: 'left',
      itemColor: 'bg-green-500'
    }
  ];

  return (
    <>
      <style jsx>{`
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
      <section className="relative w-full" style={{ backgroundColor: '#f9fafb' }}>
        {/* Header */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-12 md:py-16">
          <h1 className="text-center mb-8 sm:mb-12 md:mb-16 font-semibold leading-tight tracking-tight text-lg sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent" style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            Common Travel Connectivity Challenges
          </h1>
          <p className="text-center text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed text-muted-foreground max-w-2xl mx-auto" style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
            Don't let connectivity issues ruin your travel experience
          </p>
        </div>

        {features.map((feature, index) => (
          <div 
            key={index}
            className="relative w-full"
            style={{ backgroundColor: '#f9fafb' }}
          >
            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-12 md:py-16">
              <div className="flex flex-col md:grid md:grid-cols-2 items-center gap-4 sm:gap-8 md:gap-12">
                {/* Text Content */}
                <div className={`scroll-animate text-center md:text-left ${feature.textOrder === 'left' ? 'md:order-1' : 'md:order-2'}`}>
                  <h2 className="mb-3 sm:mb-6 font-semibold leading-tight tracking-tight text-sm sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2 px-2" style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                    {feature.title}
                  </h2>
                  <div className="space-y-4 px-2">
                    {feature.items.map((item, itemIndex) => (
                      <div key={itemIndex} className="flex items-start gap-3">
                        <div className={`w-2 h-2 ${feature.itemColor} rounded-full mt-3 flex-shrink-0`}></div>
                        <p className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-muted-foreground" style={{ fontFamily: 'SF Pro Display, SF Pro Icons, Helvetica Neue, Helvetica, Arial, sans-serif' }}>
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image */}
                <div className={`scroll-animate w-full ${feature.textOrder === 'left' ? 'md:order-2' : 'md:order-1'}`} style={{ transitionDelay: "0.2s" }}>
                  <div className="overflow-hidden rounded-xl sm:rounded-2xl md:rounded-3xl shadow-2xl">
                    <img 
                      src={feature.image} 
                      alt={feature.title}
                      className="w-full h-auto transition-transform hover:scale-105"
                    />
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

export default Story;