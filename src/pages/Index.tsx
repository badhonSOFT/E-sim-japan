import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Story from "@/components/Story";
import VideoSection from "@/components/VideoSection";
import OrderSteps from "@/components/OrderSteps";
import ActivationGuide from "@/components/ActivationGuide";
import PricingCard from "@/components/PricingCard";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";


const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Story />
      <VideoSection />
      <OrderSteps />
      <ActivationGuide />
      <PricingCard />
      <FAQ />
      <Footer />
    </div>
  );
};

export default Index;
