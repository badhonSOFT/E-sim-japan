import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Shield, Lock, Infinity, MapPin, CalendarDays, CreditCard, Mail, User } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type PlanType = "freedom" | "traveler";

const PricingCard = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [selectedPlan, setSelectedPlan] = useState<PlanType>("freedom");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [customerInfo, setCustomerInfo] = useState({
    email: "",
    firstName: "",
    lastName: "",
    cardNumber: "",
    expiryDate: "",
    cvv: ""
  });

  const calculateDays = () => {
    if (startDate && endDate) {
      const days = differenceInDays(endDate, startDate) + 1;
      return Math.max(1, days);
    }
    return 0;
  };

  const calculatePrice = () => {
    const days = calculateDays();
    const pricePerDay = selectedPlan === "freedom" ? 2.25 : 1.50;
    return (days * pricePerDay).toFixed(2);
  };

  const days = calculateDays();

  const handleInputChange = (field: string, value: string) => {
    setCustomerInfo(prev => ({ ...prev, [field]: value }));
  };

  const isFormValid = () => {
    return startDate && endDate && 
           customerInfo.email && customerInfo.firstName && customerInfo.lastName &&
           customerInfo.cardNumber && customerInfo.expiryDate && customerInfo.cvv;
  };

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
            <h3 className="text-xl font-semibold text-foreground mb-4">Choose Your Plan</h3>
            {/* Plan Options */}
            <div className="space-y-3">
              <div 
                onClick={() => setSelectedPlan("freedom")}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all",
                  selectedPlan === "freedom" 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2",
                    selectedPlan === "freedom" ? "border-primary bg-primary" : "border-muted-foreground"
                  )} />
                  <Infinity className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="font-semibold">Freedom Plan - $2.25/day</div>
                    <div className="text-sm text-muted-foreground">Unlimited data (3GB 5G, then 3G)</div>
                  </div>
                </div>
              </div>
              
              <div 
                onClick={() => setSelectedPlan("traveler")}
                className={cn(
                  "p-4 rounded-lg border-2 cursor-pointer transition-all",
                  selectedPlan === "traveler" 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                )}
              >
                <div className="flex items-center gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2",
                    selectedPlan === "traveler" ? "border-primary bg-primary" : "border-muted-foreground"
                  )} />
                  <MapPin className="h-5 w-5 text-primary" />
                  <div className="flex-1">
                    <div className="font-semibold">Traveler Plan - $1.50/day</div>
                    <div className="text-sm text-muted-foreground">2GB high-speed data daily</div>
                  </div>
                </div>
              </div>
            </div>



            {/* Date Selection */}
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">Travel Dates</h4>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-sm font-medium mb-1 block">Start Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        {startDate ? format(startDate, "MMM dd") : "Select"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        disabled={(date) => date < new Date()}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
                <div>
                  <label className="text-sm font-medium mb-1 block">End Date</label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-full justify-start text-left">
                        {endDate ? format(endDate, "MMM dd") : "Select"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={endDate}
                        onSelect={setEndDate}
                        disabled={(date) => !startDate || date < startDate}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Price Summary */}
            {days > 0 && (
              <div className="bg-muted rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="font-semibold">{days} Days</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rate:</span>
                  <span>${selectedPlan === "freedom" ? "2.25" : "1.50"}/day</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-xl text-primary">${calculatePrice()}</span>
                </div>
              </div>
            )}
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
            {days > 0 && (
              <div className="bg-primary/5 rounded-lg p-4 space-y-2">
                <h4 className="font-semibold text-foreground mb-2">Order Summary</h4>
                <div className="flex justify-between text-sm">
                  <span>{selectedPlan === "freedom" ? "Freedom" : "Traveler"} Plan</span>
                  <span>{days} days</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Dates:</span>
                  <span>
                    {startDate && endDate && 
                      `${format(startDate, "MMM dd")} - ${format(endDate, "MMM dd")}`
                    }
                  </span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total:</span>
                  <span className="text-primary">${calculatePrice()}</span>
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
                : `Pay $${calculatePrice()} & Get eSIM`
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
