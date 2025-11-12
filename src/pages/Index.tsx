import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import { MissionSection } from "@/components/MissionSection";
import Story from "@/components/Story";
import VideoSection from "@/components/VideoSection";
import OrderSteps from "@/components/OrderSteps";
import ActivationGuide from "@/components/ActivationGuide";
import PricingCard from "@/components/PricingCard";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";


const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleBeforeUnload = () => {
      window.history.replaceState({}, document.title);
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <MissionSection />
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
