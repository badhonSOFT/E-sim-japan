import { useState, useEffect } from "react";
import { Check, Wifi, Calendar, Shield } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface Plan {
  id: string;
  name: string;
  data: string;
  validity: number;
  price: number;
  networks: string;
}

const plans: Plan[] = [
  { id: "95871ce3-25bf-4a86-af26-cda2946e1436", name: "1 GB eSIM Data For 3 Days in Japan", data: "1GB", validity: 3, price: 1.54, networks: "KDDI, NTT Docomo" },
  { id: "ee239dfc-044e-407a-84fa-9513bc4c1433", name: "1 GB eSIM Data For 5 Days in Japan", data: "1GB", validity: 5, price: 1.64, networks: "KDDI, NTT Docomo" },
  { id: "11537d92-737c-4290-a0f2-a463e1602fda", name: "1 GB eSIM Data For 7 Days in Japan", data: "1GB", validity: 7, price: 1.74, networks: "KDDI, NTT Docomo" },
  { id: "21bd29be-a670-486e-95c8-79840418c177", name: "1 GB eSIM Data For 10 Days in Japan", data: "1GB", validity: 10, price: 1.84, networks: "KDDI, NTT Docomo" },
  { id: "8cc1eb1c-28c8-4610-8e99-9fda6d7d3168", name: "1 GB eSIM Data For 15 Days in Japan", data: "1GB", validity: 15, price: 1.95, networks: "KDDI, NTT Docomo" },
  { id: "4fcfc02e-b003-4739-bcae-e0e31d73539c", name: "1 GB eSIM Data For 30 Days in Japan", data: "1GB", validity: 30, price: 2.05, networks: "KDDI, NTT Docomo" },
  { id: "8910717b-bb25-4118-b0cc-6892054c386e", name: "3 GB eSIM Data For 3 Days in Japan", data: "3GB", validity: 3, price: 2.77, networks: "KDDI, NTT Docomo" },
  { id: "bd8be646-2fdc-4336-979b-4f2fd9af8ed0", name: "3 GB eSIM Data For 5 Days in Japan", data: "3GB", validity: 5, price: 2.88, networks: "KDDI, NTT Docomo" },
  { id: "0532d1ab-6932-4aec-a514-83625edc7dcf", name: "3 GB eSIM Data For 7 Days in Japan", data: "3GB", validity: 7, price: 2.97, networks: "KDDI, NTT Docomo" },
  { id: "3600b41f-add6-4f5d-85ae-369c7f0eef28", name: "5 GB eSIM Data For 3 Days in Japan", data: "5GB", validity: 3, price: 3.03, networks: "KDDI, NTT Docomo" },
  { id: "a4aa543f-048e-4cfc-9763-fc144330cef1", name: "3 GB eSIM Data For 10 Days in Japan", data: "3GB", validity: 10, price: 3.19, networks: "KDDI, NTT Docomo" },
  { id: "09c70776-cdcc-430c-a8ed-54731fb1c521", name: "5 GB eSIM Data For 5 Days in Japan", data: "5GB", validity: 5, price: 3.28, networks: "KDDI, NTT Docomo" },
  { id: "852be913-d4b3-4c9f-947a-e52646237d57", name: "3 GB eSIM Data For 15 Days in Japan", data: "3GB", validity: 15, price: 3.28, networks: "KDDI, NTT Docomo" },
  { id: "06c5bf41-fee4-4072-9ee1-c83d4f994e12", name: "3 GB eSIM Data For 30 Days in Japan", data: "3GB", validity: 30, price: 3.39, networks: "KDDI, NTT Docomo" },
  { id: "19dd956f-acc6-475e-86cd-9e5a14fc300b", name: "5 GB eSIM Data For 7 Days in Japan", data: "5GB", validity: 7, price: 3.7, networks: "KDDI, NTT Docomo" },
  { id: "88a8aaec-7547-40df-b76c-491e6a59336d", name: "5 GB eSIM Data For 10 Days in Japan", data: "5GB", validity: 10, price: 3.81, networks: "KDDI, NTT Docomo" },
  { id: "b8d3f79b-4b44-41e4-9e9e-e7994a65c3d9", name: "5 GB eSIM Data For 15 Days in Japan", data: "5GB", validity: 15, price: 4.21, networks: "KDDI, NTT Docomo" },
  { id: "08868a6f-89af-46ec-b590-8e6aca677897", name: "5 GB eSIM Data For 30 Days in Japan", data: "5GB", validity: 30, price: 4.52, networks: "KDDI, NTT Docomo" },
  { id: "d4d7920f-04c2-4c9c-a6e3-841113d472ab", name: "10 GB eSIM Data For 3 Days in Japan", data: "10GB", validity: 3, price: 5.55, networks: "KDDI, NTT Docomo" },
  { id: "0e70166b-1d15-4208-bdda-de708e6ce13d", name: "10 GB eSIM Data For 5 Days in Japan", data: "10GB", validity: 5, price: 6.06, networks: "KDDI, NTT Docomo" },
  { id: "49cdd643-8ccf-4e27-95b8-554a2116daf6", name: "10 GB eSIM Data For 7 Days in Japan", data: "10GB", validity: 7, price: 6.48, networks: "KDDI, NTT Docomo" },
  { id: "fefdc163-a3ab-4bdd-bad8-747264252dd3", name: "10 GB eSIM Data For 10 Days in Japan", data: "10GB", validity: 10, price: 6.99, networks: "KDDI, NTT Docomo" },
  { id: "30d8c87e-fb6e-4b74-b7b0-e26b07067126", name: "10 GB eSIM Data For 15 Days in Japan", data: "10GB", validity: 15, price: 7.52, networks: "KDDI, NTT Docomo" },
  { id: "11b8ba03-17ac-435c-8025-faedd76c1f8c", name: "10 GB eSIM Data For 30 Days in Japan", data: "10GB", validity: 30, price: 7.82, networks: "KDDI, NTT Docomo" },
  { id: "b3754b0b-e1bb-41fc-9bc4-89d65deb9d71", name: "20 GB eSIM Data For 3 Days in Japan", data: "20GB", validity: 3, price: 10.91, networks: "KDDI, NTT Docomo" },
  { id: "0fdf6209-664c-4e20-8eb5-2407748e9e3c", name: "20 GB eSIM Data For 5 Days in Japan", data: "20GB", validity: 5, price: 11.42, networks: "KDDI, NTT Docomo" },
  { id: "a95716b1-7252-4f5b-92fe-3b1fdf576b6c", name: "20 GB eSIM Data For 7 Days in Japan", data: "20GB", validity: 7, price: 11.93, networks: "KDDI, NTT Docomo" },
  { id: "e3614c86-771f-42ec-983b-6b382c112f69", name: "20 GB eSIM Data For 10 Days in Japan", data: "20GB", validity: 10, price: 12.66, networks: "KDDI, NTT Docomo" },
  { id: "9e3bcc3e-12ba-49e8-9824-824631010ac0", name: "20 GB eSIM Data For 15 Days in Japan", data: "20GB", validity: 15, price: 13.48, networks: "KDDI, NTT Docomo" },
  { id: "9a6d8993-be42-420a-9ad8-ae3f6c98dfe4", name: "20 GB eSIM Data For 30 Days in Japan", data: "20GB", validity: 30, price: 14.21, networks: "KDDI, NTT Docomo" },
  { id: "01fb327b-14d4-47c7-9eac-cb2214806a15", name: "30 GB eSIM Data For 3 Days in Japan", data: "30GB", validity: 3, price: 15.24, networks: "KDDI, NTT Docomo" },
  { id: "a9e62fdc-ce0f-4ae9-81b7-0b4102c7446c", name: "30 GB eSIM Data For 5 Days in Japan", data: "30GB", validity: 5, price: 16.26, networks: "KDDI, NTT Docomo" },
  { id: "c71d68b2-d968-4307-8e9c-58d0fddb14e3", name: "30 GB eSIM Data For 7 Days in Japan", data: "30GB", validity: 7, price: 17.3, networks: "KDDI, NTT Docomo" },
  { id: "23077bd8-f0e3-4016-be63-2de33236f63a", name: "30 GB eSIM Data For 10 Days in Japan", data: "30GB", validity: 10, price: 18.33, networks: "KDDI, NTT Docomo" },
  { id: "32a2d7d0-bb5a-4be1-9103-6f1122876d90", name: "30 GB eSIM Data For 15 Days in Japan", data: "30GB", validity: 15, price: 19.35, networks: "KDDI, NTT Docomo" },
  { id: "2a36a40d-8a2f-4987-9aa9-5356e1d0ef21", name: "30 GB eSIM Data For 30 Days in Japan", data: "30GB", validity: 30, price: 20.39, networks: "KDDI, NTT Docomo" },
  { id: "1b8aa6e2-aefa-4517-bcd0-039fdce3bbd9", name: "50 GB eSIM Data For 3 Days in Japan", data: "50GB", validity: 3, price: 22.97, networks: "KDDI, NTT Docomo" },
  { id: "03a4c2d8-f1cc-4799-af25-af8de0532853", name: "50 GB eSIM Data For 5 Days in Japan", data: "50GB", validity: 5, price: 24.51, networks: "KDDI, NTT Docomo" },
  { id: "a8c66eae-e131-4606-9b1b-fa481541f4a7", name: "50 GB eSIM Data For 7 Days in Japan", data: "50GB", validity: 7, price: 26.06, networks: "KDDI, NTT Docomo" },
  { id: "8cb74743-0240-4ba3-9c33-d1da58865428", name: "50 GB eSIM Data For 10 Days in Japan", data: "50GB", validity: 10, price: 28.11, networks: "KDDI, NTT Docomo" },
  { id: "660bd123-9056-4f42-bac1-ba129bae8a95", name: "50 GB eSIM Data For 15 Days in Japan", data: "50GB", validity: 15, price: 29.15, networks: "KDDI, NTT Docomo" },
  { id: "0be2ac90-7d69-4c2b-a112-1a38dffc9a89", name: "50 GB eSIM Data For 30 Days in Japan", data: "50GB", validity: 30, price: 31.2, networks: "KDDI, NTT Docomo" }
];

const Plans = () => {
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState("All");
  const dataOptions = ["All", "1GB", "3GB", "5GB", "10GB", "20GB", "30GB", "50GB"];
  
  const filteredPlans = selectedData === "All" ? plans : plans.filter(p => p.data === selectedData);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    navigate('/', { state: { selectedPlan: { data: plan.data, validity: plan.validity } } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Japan eSIM Plans</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect data plan for your trip to Japan. All plans include premium network access.
            </p>
          </div>

          <div className="flex justify-center mb-8">
            <div className="inline-flex gap-2 p-2 bg-muted rounded-lg">
              {dataOptions.map(data => (
                <button
                  key={data}
                  onClick={() => setSelectedData(data)}
                  className={cn(
                    "px-4 py-2 rounded-md font-medium transition-all",
                    selectedData === data
                      ? "bg-primary text-white shadow-sm"
                      : "hover:bg-background"
                  )}
                >
                  {data}
                </button>
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPlans.map(plan => (
              <div key={plan.id} className="bg-background border border-border rounded-xl p-6 hover:shadow-lg transition-shadow">
                <div className="mb-4">
                  <div className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-semibold mb-2">
                    {plan.data}
                  </div>
                  <h3 className="text-xl font-bold">{plan.validity} Days</h3>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-2 text-sm">
                    <Wifi className="h-4 w-4 text-primary" />
                    <span>{plan.data} Data</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-primary" />
                    <span>Valid for {plan.validity} days</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Shield className="h-4 w-4 text-primary" />
                    <span className="text-xs">{plan.networks}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <Check className="h-4 w-4" />
                    <span>Instant Activation</span>
                  </div>
                </div>

                <div className="border-t pt-4 mb-4">
                  <div className="mb-1">
                    <span className="text-3xl font-bold text-primary">${plan.price.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">One-time payment</p>
                </div>

                <Button className="w-full" onClick={() => handleSelectPlan(plan)}>
                  Select Plan
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Plans;
