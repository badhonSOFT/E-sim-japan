const VideoSection = () => {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Stay Connected in Japan
          </h1>
          <h2 className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto">
            Discover seamless connectivity with our premium eSIM solution designed specifically for travelers exploring Japan
          </h2>
        </div>
        <div className="relative rounded-2xl overflow-hidden bg-black">
          <div className="relative aspect-video">
            <video 
              className="w-full h-full object-cover"
              autoPlay 
              muted 
              loop 
              playsInline
              poster="/images/hero/banner.png"
            >
              <source src="/video/promp.mp4" type="video/mp4" />
            </video>
            
            <div className="absolute inset-0 bg-black/40"></div>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white px-6">
                <h2 className="text-3xl md:text-5xl font-bold mb-4">
                  Experience Japan Connected
                </h2>
                <p className="text-lg md:text-xl text-white/90 max-w-2xl">
                  See how our eSIM keeps you connected throughout your entire Japan journey
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;