import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Shield, Lock, CreditCard, Mail, User } from "lucide-react";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLocation } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

type Package = {
  id: string;
  name: string;
  data: string;
  validity: number;
  price: number;
};

const packages: Package[] = [
  { id: "95871ce3-25bf-4a86-af26-cda2946e1436", name: "1 GB eSIM Data For 3 Days", data: "1GB", validity: 3, price: 1.54 },
  { id: "ee239dfc-044e-407a-84fa-9513bc4c1433", name: "1 GB eSIM Data For 5 Days", data: "1GB", validity: 5, price: 1.64 },
  { id: "11537d92-737c-4290-a0f2-a463e1602fda", name: "1 GB eSIM Data For 7 Days", data: "1GB", validity: 7, price: 1.74 },
  { id: "21bd29be-a670-486e-95c8-79840418c177", name: "1 GB eSIM Data For 10 Days", data: "1GB", validity: 10, price: 1.84 },
  { id: "8cc1eb1c-28c8-4610-8e99-9fda6d7d3168", name: "1 GB eSIM Data For 15 Days", data: "1GB", validity: 15, price: 1.95 },
  { id: "4fcfc02e-b003-4739-bcae-e0e31d73539c", name: "1 GB eSIM Data For 30 Days", data: "1GB", validity: 30, price: 2.05 },
  { id: "8910717b-bb25-4118-b0cc-6892054c386e", name: "3 GB eSIM Data For 3 Days", data: "3GB", validity: 3, price: 2.77 },
  { id: "bd8be646-2fdc-4336-979b-4f2fd9af8ed0", name: "3 GB eSIM Data For 5 Days", data: "3GB", validity: 5, price: 2.88 },
  { id: "0532d1ab-6932-4aec-a514-83625edc7dcf", name: "3 GB eSIM Data For 7 Days", data: "3GB", validity: 7, price: 2.97 },
  { id: "a4aa543f-048e-4cfc-9763-fc144330cef1", name: "3 GB eSIM Data For 10 Days", data: "3GB", validity: 10, price: 3.19 },
  { id: "852be913-d4b3-4c9f-947a-e52646237d57", name: "3 GB eSIM Data For 15 Days", data: "3GB", validity: 15, price: 3.28 },
  { id: "06c5bf41-fee4-4072-9ee1-c83d4f994e12", name: "3 GB eSIM Data For 30 Days", data: "3GB", validity: 30, price: 3.39 },
  { id: "3600b41f-add6-4f5d-85ae-369c7f0eef28", name: "5 GB eSIM Data For 3 Days", data: "5GB", validity: 3, price: 3.03 },
  { id: "09c70776-cdcc-430c-a8ed-54731fb1c521", name: "5 GB eSIM Data For 5 Days", data: "5GB", validity: 5, price: 3.28 },
  { id: "19dd956f-acc6-475e-86cd-9e5a14fc300b", name: "5 GB eSIM Data For 7 Days", data: "5GB", validity: 7, price: 3.7 },
  { id: "88a8aaec-7547-40df-b76c-491e6a59336d", name: "5 GB eSIM Data For 10 Days", data: "5GB", validity: 10, price: 3.81 },
  { id: "b8d3f79b-4b44-41e4-9e9e-e7994a65c3d9", name: "5 GB eSIM Data For 15 Days", data: "5GB", validity: 15, price: 4.21 },
  { id: "08868a6f-89af-46ec-b590-8e6aca677897", name: "5 GB eSIM Data For 30 Days", data: "5GB", validity: 30, price: 4.52 },
  { id: "d4d7920f-04c2-4c9c-a6e3-841113d472ab", name: "10 GB eSIM Data For 3 Days", data: "10GB", validity: 3, price: 5.55 },
  { id: "0e70166b-1d15-4208-bdda-de708e6ce13d", name: "10 GB eSIM Data For 5 Days", data: "10GB", validity: 5, price: 6.06 },
  { id: "49cdd643-8ccf-4e27-95b8-554a2116daf6", name: "10 GB eSIM Data For 7 Days", data: "10GB", validity: 7, price: 6.48 },
  { id: "fefdc163-a3ab-4bdd-bad8-747264252dd3", name: "10 GB eSIM Data For 10 Days", data: "10GB", validity: 10, price: 6.99 },
  { id: "30d8c87e-fb6e-4b74-b7b0-e26b07067126", name: "10 GB eSIM Data For 15 Days", data: "10GB", validity: 15, price: 7.52 },
  { id: "11b8ba03-17ac-435c-8025-faedd76c1f8c", name: "10 GB eSIM Data For 30 Days", data: "10GB", validity: 30, price: 7.82 },
  { id: "b3754b0b-e1bb-41fc-9bc4-89d65deb9d71", name: "20 GB eSIM Data For 3 Days", data: "20GB", validity: 3, price: 10.91 },
  { id: "0fdf6209-664c-4e20-8eb5-2407748e9e3c", name: "20 GB eSIM Data For 5 Days", data: "20GB", validity: 5, price: 11.42 },
  { id: "a95716b1-7252-4f5b-92fe-3b1fdf576b6c", name: "20 GB eSIM Data For 7 Days", data: "20GB", validity: 7, price: 11.93 },
  { id: "e3614c86-771f-42ec-983b-6b382c112f69", name: "20 GB eSIM Data For 10 Days", data: "20GB", validity: 10, price: 12.66 },
  { id: "9e3bcc3e-12ba-49e8-9824-824631010ac0", name: "20 GB eSIM Data For 15 Days", data: "20GB", validity: 15, price: 13.48 },
  { id: "9a6d8993-be42-420a-9ad8-ae3f6c98dfe4", name: "20 GB eSIM Data For 30 Days", data: "20GB", validity: 30, price: 14.21 },
  { id: "01fb327b-14d4-47c7-9eac-cb2214806a15", name: "30 GB eSIM Data For 3 Days", data: "30GB", validity: 3, price: 15.24 },
  { id: "a9e62fdc-ce0f-4ae9-81b7-0b4102c7446c", name: "30 GB eSIM Data For 5 Days", data: "30GB", validity: 5, price: 16.26 },
  { id: "c71d68b2-d968-4307-8e9c-58d0fddb14e3", name: "30 GB eSIM Data For 7 Days", data: "30GB", validity: 7, price: 17.3 },
  { id: "23077bd8-f0e3-4016-be63-2de33236f63a", name: "30 GB eSIM Data For 10 Days", data: "30GB", validity: 10, price: 18.33 },
  { id: "32a2d7d0-bb5a-4be1-9103-6f1122876d90", name: "30 GB eSIM Data For 15 Days", data: "30GB", validity: 15, price: 19.35 },
  { id: "2a36a40d-8a2f-4987-9aa9-5356e1d0ef21", name: "30 GB eSIM Data For 30 Days", data: "30GB", validity: 30, price: 20.39 },
  { id: "1b8aa6e2-aefa-4517-bcd0-039fdce3bbd9", name: "50 GB eSIM Data For 3 Days", data: "50GB", validity: 3, price: 22.97 },
  { id: "03a4c2d8-f1cc-4799-af25-af8de0532853", name: "50 GB eSIM Data For 5 Days", data: "50GB", validity: 5, price: 24.51 },
  { id: "a8c66eae-e131-4606-9b1b-fa481541f4a7", name: "50 GB eSIM Data For 7 Days", data: "50GB", validity: 7, price: 26.06 },
  { id: "8cb74743-0240-4ba3-9c33-d1da58865428", name: "50 GB eSIM Data For 10 Days", data: "50GB", validity: 10, price: 28.11 },
  { id: "660bd123-9056-4f42-bac1-ba129bae8a95", name: "50 GB eSIM Data For 15 Days", data: "50GB", validity: 15, price: 29.15 },
  { id: "0be2ac90-7d69-4c2b-a112-1a38dffc9a89", name: "50 GB eSIM Data For 30 Days", data: "50GB", validity: 30, price: 31.2 },
];

const PricingCard = () => {
  const location = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  const hasProcessedState = useRef(false);
  const [selectedData, setSelectedData] = useState<string>("");
  const [selectedValidity, setSelectedValidity] = useState<string>("");
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const dataOptions = [...new Set(packages.map(p => p.data))];
  const validityOptions = selectedData ? packages.filter(p => p.data === selectedData) : packages.filter(p => p.data === "1GB");
  const selectedPackage = packages.find(p => p.data === selectedData && p.validity.toString() === selectedValidity);

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return selectedPackage && 
           customerInfo.email && customerInfo.firstName && customerInfo.lastName &&
           customerInfo.cardNumber && customerInfo.expiryDate && customerInfo.cvv;
  };

  useEffect(() => {
    const state = location.state as { selectedPlan?: { data: string; validity: number } };
    if (state?.selectedPlan && !hasProcessedState.current) {
      hasProcessedState.current = true;
      setSelectedData(state.selectedPlan.data);
      setSelectedValidity(state.selectedPlan.validity.toString());
      setTimeout(() => {
        sectionRef.current?.scrollIntoView({ behavior: 'smooth' });
        window.history.replaceState({}, document.title);
      }, 100);
    }
  }, [location]);

  useEffect(() => {
    return () => {
      window.history.replaceState({}, document.title);
    };
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".pricing-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%"
        },
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="plans" className="py-12 px-4 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Get Connected Instantly
          </h2>
          <p className="text-lg text-muted-foreground">
            Select your plan and complete your purchase
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Plan Selection Section */}
          <div className="pricing-card bg-background border border-border rounded-xl p-6 space-y-6 shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-4">Choose Your eSIM Package</h3>
            
            {/* Data Tabs */}
            <div className="space-y-3">
              <label className="text-lg font-bold">Select Data Amount</label>
              <div className="grid grid-cols-7 gap-2">
                {dataOptions.map(data => (
                  <button
                    key={data}
                    onClick={() => {
                      setSelectedData(data);
                      setSelectedValidity("");
                    }}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all text-center font-semibold",
                      selectedData === data
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    {data}
                  </button>
                ))}
              </div>
            </div>

            {/* Validity Tabs */}
            <div className="space-y-3">
              <label className={cn("text-lg font-bold", !selectedData && "text-muted-foreground")}>Select Validity Period</label>
              <div className="grid grid-cols-6 gap-2">
                {validityOptions.map(pkg => (
                  <button
                    key={pkg.id}
                    onClick={() => setSelectedValidity(pkg.validity.toString())}
                    disabled={!selectedData}
                    className={cn(
                      "p-3 rounded-lg border-2 transition-all text-center",
                      !selectedData && "opacity-50 cursor-not-allowed",
                      selectedValidity === pkg.validity.toString()
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="font-semibold">{pkg.validity} Days</div>
                    <div className="text-sm text-primary">${pkg.price.toFixed(2)}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-muted rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Data:</span>
                <span className="font-semibold">{selectedPackage?.data || '0GB'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Validity:</span>
                <span className="font-semibold">{selectedPackage?.validity || 0} Days</span>
              </div>
              <div className="flex justify-between pt-2 border-t">
                <span className="font-semibold">Total Price:</span>
                <span className="font-bold text-xl text-primary">${selectedPackage?.price.toFixed(2) || '0.00'}</span>
              </div>
            </div>
          </div>

          {/* Checkout Form Section */}
          <div className="pricing-card bg-background border border-border rounded-xl p-6 space-y-6 shadow-lg">
            <h3 className="text-xl font-semibold text-foreground mb-4">Complete Your Purchase</h3>
            
            {/* Customer Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <User className="h-4 w-4" />
                Contact Information
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Email Address</label>
                  <Input 
                    type="email" 
                    placeholder="your@email.com"
                    value={customerInfo.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">First Name</label>
                    <Input 
                      placeholder="John"
                      value={customerInfo.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">Last Name</label>
                    <Input 
                      placeholder="Doe"
                      value={customerInfo.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Information */}
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="h-4 w-4" />
                Payment Details
              </h4>
              <div className="space-y-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Card Number</label>
                  <Input 
                    placeholder="1234 5678 9012 3456"
                    value={customerInfo.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-sm font-medium mb-1 block">Expiry Date</label>
                    <Input 
                      placeholder="MM/YY"
                      value={customerInfo.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium mb-1 block">CVV</label>
                    <Input 
                      placeholder="123"
                      value={customerInfo.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Order Summary */}
            {selectedPackage && (
              <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-foreground mb-2">Order Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>Package:</span>
                  <span>{selectedPackage.data} for {selectedPackage.validity} days</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-primary">${selectedPackage.price.toFixed(2)}</span>
                </div>
              </div>
            )}

            {/* Purchase Button */}
            <Button 
              size="lg" 
              className="w-full text-lg"
              disabled={!isFormValid()}
            >
              {!isFormValid() 
                ? "Complete All Fields" 
                : `Pay $${selectedPackage?.price.toFixed(2)} & Get eSIM`
              }
            </Button>

            {/* Trust Signals */}
            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground pt-3 border-t">
              <div className="flex items-center gap-1">
                <Shield className="h-3 w-3" />
                <span>Money-Back Guarantee</span>
              </div>
              <div className="flex items-center gap-1">
                <Lock className="h-3 w-3" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                <span>Instant Delivery</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingCard;
