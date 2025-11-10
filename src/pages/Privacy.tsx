import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const Privacy = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".page-title", {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: "power3.out"
      });
      gsap.from(".content-section", {
        opacity: 0,
        y: 30,
        duration: 0.8,
        stagger: 0.15,
        delay: 0.3,
        ease: "power2.out"
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={pageRef} className="min-h-screen bg-background">
      <Navbar />
      
      <main className="pt-32 pb-24 px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="page-title space-y-4">
            <h1 className="text-5xl md:text-6xl font-semibold">Privacy Policy</h1>
            <p className="text-xl text-muted-foreground">
              Last updated: {new Date().toLocaleDateString()}
            </p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8">
            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">1. Information We Collect</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We collect information you provide directly to us, such as when you create an account, make a purchase, 
                or contact our support team. This may include your name, email address, payment information, and device details.
              </p>
            </section>

            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">2. How We Use Your Information</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We use the information we collect to provide, maintain, and improve our services, process transactions, 
                send you technical notices and support messages, and respond to your comments and questions.
              </p>
            </section>

            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">3. Information Sharing</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We do not sell, trade, or rent your personal information to third parties. We may share your information 
                with our trusted partners who help us operate our services, subject to strict confidentiality obligations.
              </p>
            </section>

            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">4. Data Security</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                We take reasonable measures to help protect your personal information from loss, theft, misuse, 
                unauthorized access, disclosure, alteration, and destruction.
              </p>
            </section>

            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">5. Your Rights</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                You have the right to access, update, or delete your personal information at any time. 
                Contact our support team for assistance with these requests.
              </p>
            </section>

            <section className="content-section">
              <h2 className="text-3xl font-semibold mb-4">6. Contact Us</h2>
              <p className="text-lg leading-relaxed text-muted-foreground">
                If you have any questions about this Privacy Policy, please contact us at privacy@japanconnect.com
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Privacy;
