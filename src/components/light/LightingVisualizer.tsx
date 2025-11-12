import { useState, useMemo, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Lightbulb, Sun, Moon, Zap } from "lucide-react";
const cellImage = "/assets/Light/cell.png";
const spotImage = "/assets/Light/Spot.png";
const spotlightForRoom = "/assets/Light/Spotlight for room.webp";
const roomImage = "/assets/Light/Visualizer.png";

const translations = {
  EN: {
    title: 'See It In Action',
    subtitle: 'Click the phone buttons to see how the lights work'
  },
  বাং: {
    title: 'কাজে দেখুন',
    subtitle: 'আলো কীভাবে কাজ করে তা দেখতে ফোনের বাটন গুলিতে ক্লিক করুন।'
  }
};

export const LightingVisualizer = () => {
  const [ceilingLampOn, setCeilingLampOn] = useState(false);
  const [spotlightsOn, setSpotlightsOn] = useState(false);
  const [lightMode, setLightMode] = useState<"cool" | "warm">("warm");
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

  // Get consistent colors based on light mode
  const lightColor = useMemo(() => {
    return lightMode === "cool" 
      ? { r: 173, g: 216, b: 255 } // Blue
      : { r: 255, g: 224, b: 178 }; // Warm orange
  }, [lightMode]);
  const [ceilingBrightness, setCeilingBrightness] = useState(80);
  const [spotlightBrightness, setSpotlightBrightness] = useState(60);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [windowWidth, setWindowWidth] = useState(1024);

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{
        __html: `
          .animate-glow {
            animation: glow 2s ease-in-out infinite alternate;
          }
          @keyframes glow {
            from { opacity: 0.3; }
            to { opacity: 0.6; }
          }
        `
      }} />
      <section className="py-2 sm:py-4 lg:py-8 px-4 sm:px-6" style={{ backgroundColor: 'white' }} data-section="lighting-visualizer">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-3 sm:mb-6">
          <h2 className="text-sm sm:text-lg md:text-3xl lg:text-4xl xl:text-5xl font-semibold leading-tight tracking-tight mb-4 sm:mb-6 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent pb-2 apple-gradient-text" style={{lineHeight: 1.09, fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
            {t.title}
          </h2>
          <p className="text-sm sm:text-base max-w-xl mx-auto px-4" style={{color: 'rgba(0, 0, 0, 0.6)', fontFamily: '"SF Pro Display", "SF Pro Icons", "Helvetica Neue", Helvetica, Arial, sans-serif'}}>
            {t.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 md:gap-8 items-center justify-items-center">
          {/* Room Visualization */}
          <div className="relative flex justify-center">
            <img
              src={roomImage}
              alt="Room with smart lighting"
              className="object-cover rounded-3xl mx-auto transition-all duration-500"
              style={{
                width: windowWidth < 768 ? '320px' : '580px',
                height: windowWidth < 768 ? '260px' : '480px',
                filter: `brightness(${
                  (() => {
                    let brightness = 0.5; // base brightness
                    if (ceilingLampOn) brightness += (ceilingBrightness / 100) * 1.2;
                    if (spotlightsOn) brightness += (spotlightBrightness / 100) * 0.8;
                    return Math.min(brightness, 2.0);
                  })()
                })`,
              }}
            />
            
            {/* Spotlights overlaid on room */}
            <img 
              src={spotlightForRoom}
              alt="Spotlight"
              className="absolute top-2 left-1/4 transform -translate-x-1/2 w-8 h-8 object-contain mix-blend-multiply opacity-80"
            />
            <img 
              src={spotlightForRoom}
              alt="Spotlight"
              className="absolute top-2 right-1/4 transform translate-x-1/2 w-8 h-8 object-contain mix-blend-multiply opacity-80"
            />
            <img 
              src={spotlightForRoom}
              alt="Spotlight"
              className="absolute top-8 left-1/3 transform -translate-x-1/2 w-8 h-8 object-contain mix-blend-multiply opacity-80"
            />
            <img 
              src={spotlightForRoom}
              alt="Spotlight"
              className="absolute top-8 right-1/3 transform translate-x-1/2 w-8 h-8 object-contain mix-blend-multiply opacity-80"
            />
            
            {/* Ceiling Lamp */}
            <div className="absolute top-2 left-1/2 transform -translate-x-1/2">
              <div className="relative w-12 h-12">
                {/* Lamp base */}
                <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-2 bg-gray-300 rounded-full shadow-sm"></div>
                {/* Lamp shade */}
                <div 
                  className="absolute top-4 left-1/2 transform -translate-x-1/2 w-10 h-6 rounded-full border-2 transition-all duration-500"
                  style={{
                    backgroundColor: ceilingLampOn 
                      ? `rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${0.2 + (ceilingBrightness / 100) * 0.6})`
                      : '#f3f4f6',
                    borderColor: ceilingLampOn 
                      ? `rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${0.4 + (ceilingBrightness / 100) * 0.6})`
                      : '#d1d5db',
                    boxShadow: ceilingLampOn 
                      ? `0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 ${10 + (ceilingBrightness / 100) * 20}px rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${0.3 + (ceilingBrightness / 100) * 0.4})` 
                      : 'none'
                  }}
                ></div>
                {/* Light glow effect */}
                {ceilingLampOn && (
                  <div 
                    className="absolute top-4 left-1/2 transform -translate-x-1/2 w-10 h-6 rounded-full transition-all duration-500"
                    style={{
                      background: `radial-gradient(ellipse, rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, 0.6) 0%, transparent 70%)`,
                      filter: 'blur(1px)'
                    }}
                  />
                )}
              </div>
            </div>
            
            {/* Light beams when spotlights are on */}
            {spotlightsOn && (
              <>
                <div 
                  className="absolute top-10 left-1/4 transform -translate-x-1/2 w-12 h-20 transition-all duration-500"
                  style={{
                    opacity: 0.3 + (spotlightBrightness / 100) * 0.4,
                    background: `linear-gradient(180deg, rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${0.3 + (spotlightBrightness / 100) * 0.4}) 0%, transparent 100%)`,
                    clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)'
                  }}
                />
                <div 
                  className="absolute top-10 right-1/4 transform translate-x-1/2 w-12 h-20 transition-all duration-500"
                  style={{
                    opacity: 0.3 + (spotlightBrightness / 100) * 0.4,
                    background: `linear-gradient(180deg, rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${0.3 + (spotlightBrightness / 100) * 0.4}) 0%, transparent 100%)`,
                    clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)'
                  }}
                />
                <div 
                  className="absolute top-16 left-1/3 transform -translate-x-1/2 w-12 h-20 transition-all duration-500"
                  style={{
                    opacity: 0.3 + (spotlightBrightness / 100) * 0.4,
                    background: `linear-gradient(180deg, rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${0.3 + (spotlightBrightness / 100) * 0.4}) 0%, transparent 100%)`,
                    clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)'
                  }}
                />
                <div 
                  className="absolute top-16 right-1/3 transform translate-x-1/2 w-12 h-20 transition-all duration-500"
                  style={{
                    opacity: 0.3 + (spotlightBrightness / 100) * 0.4,
                    background: `linear-gradient(180deg, rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, ${0.3 + (spotlightBrightness / 100) * 0.4}) 0%, transparent 100%)`,
                    clipPath: 'polygon(45% 0%, 55% 0%, 100% 100%, 0% 100%)'
                  }}
                />
              </>
            )}
            
            {/* Ceiling lamp light effect */}
            {ceilingLampOn && (
              <div 
                className="absolute top-16 left-1/2 transform -translate-x-1/2 w-32 h-32 rounded-full opacity-40 transition-all duration-500"
                style={{
                  background: `radial-gradient(circle, rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, 0.7) 0%, transparent 70%)`
                }}
              />
            )}
            
            {(ceilingLampOn || spotlightsOn) && (
              <div
                className="absolute inset-0 pointer-events-none animate-glow"
                style={{
                  background: `radial-gradient(circle at 50% 20%, rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, 0.25), transparent 70%)`,
                }}
              />
            )}
          </div>

          {/* Mobile Phone Mockup */}
          <div className="flex justify-center">
            <div className="relative">
              <img 
                src={cellImage} 
                alt="Mobile Phone" 
                className="w-[240px] h-auto"
              />
              
              {/* Real-time clock - positioned at very top left beside dynamic island */}
              <div className="absolute top-[5%] left-[10%] text-[10px] font-bold text-black z-10">
                {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false })}
              </div>
              
              {/* Clipping mask for phone screen */}
              <div className="absolute top-[16%] left-[8%] right-[16%] bottom-[12%] overflow-visible rounded-2xl">
                {/* Ambient light overlay contained within phone */}
                {(ceilingLampOn || spotlightsOn) && (
                  <div
                    className="absolute inset-0 pointer-events-none animate-glow"
                    style={{
                      background: `radial-gradient(circle at 50% 20%, rgba(${lightColor.r}, ${lightColor.g}, ${lightColor.b}, 0.25), transparent 70%)`,
                    }}
                  />
                )}
                
                {/* App Content Overlay */}
                <div className="relative px-2 py-1 h-full overflow-y-auto">
                  <h3 className="font-display text-xs font-bold mb-1 text-center">
                    Light Control
                  </h3>

                  {/* Ceiling Lamp Control */}
                  <div className="mb-2 p-2 bg-secondary rounded">
                    <div className="flex items-center justify-between mb-0.5 lg:mb-2">
                      <div className="flex items-center gap-1 lg:gap-1">
                        <Lightbulb className="h-2 w-2 lg:h-3 lg:w-3" />
                        <span className="font-semibold text-[8px] lg:text-xs">Ceiling Lamp</span>
                      </div>
                      <Button
                        size="sm"
                        variant={ceilingLampOn ? "default" : "outline"}
                        onClick={() => setCeilingLampOn(!ceilingLampOn)}
                        className={`h-4 lg:h-5 px-1 lg:px-2 text-[7px] lg:text-xs min-w-[20px] lg:min-w-auto ${ceilingLampOn ? 'bg-black text-white hover:bg-gray-800' : ''}`}
                      >
                        {ceilingLampOn ? 'ON' : 'OFF'}
                      </Button>
                    </div>
                    {ceilingLampOn && (
                      <div className="mt-1">
                        <label className="text-[7px] lg:text-xs text-text-secondary mb-0.5 lg:mb-1 block">Brightness: {ceilingBrightness}%</label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={ceilingBrightness}
                          onChange={(e) => setCeilingBrightness(Number(e.target.value))}
                          className="w-full h-0.5 lg:h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Spotlights Control */}
                  <div className="mb-2 p-2 bg-secondary rounded">
                    <div className="flex items-center justify-between mb-0.5 lg:mb-2">
                      <div className="flex items-center gap-1 lg:gap-1">
                        <Zap className="h-2 w-2 lg:h-3 lg:w-3" />
                        <span className="font-semibold text-[8px] lg:text-xs">Spotlights</span>
                      </div>
                      <Button
                        size="sm"
                        variant={spotlightsOn ? "default" : "outline"}
                        onClick={() => setSpotlightsOn(!spotlightsOn)}
                        className={`h-4 lg:h-5 px-1 lg:px-2 text-[7px] lg:text-xs min-w-[20px] lg:min-w-auto ${spotlightsOn ? 'bg-black text-white hover:bg-gray-800' : ''}`}
                      >
                        {spotlightsOn ? 'ON' : 'OFF'}
                      </Button>
                    </div>
                    {spotlightsOn && (
                      <div className="mt-1">
                        <label className="text-[7px] lg:text-xs text-text-secondary mb-0.5 lg:mb-1 block">Brightness: {spotlightBrightness}%</label>
                        <input
                          type="range"
                          min="10"
                          max="100"
                          value={spotlightBrightness}
                          onChange={(e) => setSpotlightBrightness(Number(e.target.value))}
                          className="w-full h-0.5 lg:h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                      </div>
                    )}
                  </div>

                  {/* Light Mode */}
                  <div className="p-2 bg-secondary rounded mb-4">
                    <p className="font-semibold mb-1 lg:mb-2 text-[8px] lg:text-xs">Light Mode</p>
                    <div className="flex flex-col gap-1 lg:gap-1">
                      <Button
                        size="sm"
                        variant={lightMode === "cool" ? "default" : "outline"}
                        onClick={() => setLightMode("cool")}
                        className={`w-full h-4 lg:h-5 text-[7px] lg:text-xs px-1 lg:px-1 py-0 lg:py-auto leading-none min-h-0 ${lightMode === "cool" ? 'bg-black text-white hover:bg-gray-800' : ''}`}
                      >
                        <Moon className="h-2 w-2 lg:h-2 lg:w-2 mr-0.5 lg:mr-1" />
                        Cool
                      </Button>
                      <Button
                        size="sm"
                        variant={lightMode === "warm" ? "default" : "outline"}
                        onClick={() => setLightMode("warm")}  
                        className={`w-full h-4 lg:h-5 text-[7px] lg:text-xs px-1 lg:px-1 py-0 lg:py-auto leading-none min-h-0 ${lightMode === "warm" ? 'bg-black text-white hover:bg-gray-800' : ''}`}
                      >
                        <Sun className="h-2 w-2 lg:h-2 lg:w-2 mr-0.5 lg:mr-1" />
                        Warm
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};