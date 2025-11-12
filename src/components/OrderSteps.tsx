import { CheckSquare, Mail, QrCode } from "lucide-react";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const OrderSteps = () => {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".step-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        },
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-semibold text-black">
            How to order and activate eSIM
          </h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 md:gap-12">
          {/* Step 1: Order */}
          <div className="step-card text-center space-y-4">
            <div className="flex justify-center mb-4">
              <CheckSquare className="h-16 w-16 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-black">Order</h3>
            <p className="text-black leading-relaxed">
              First, book your eSIM by choosing your usage dates in the calendar above.
            </p>
          </div>

          {/* Step 2: Check e-mail */}
          <div className="step-card text-center space-y-4">
            <div className="flex justify-center mb-4">
              <Mail className="h-16 w-16 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-black">Check e-mail</h3>
            <p className="text-black leading-relaxed">
              An e-mail will be sent to you right after your order is completed. Please access the QR code from the link inside the e-mail.
            </p>
          </div>

          {/* Step 3: Activate */}
          <div className="step-card text-center space-y-4">
            <div className="flex justify-center mb-4">
              <QrCode className="h-16 w-16 text-black" />
            </div>
            <h3 className="text-xl font-semibold text-black">Activate</h3>
            <p className="text-black leading-relaxed">
              Use QR code and install the eSIM. You will then be able to use it immediately.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default OrderSteps;