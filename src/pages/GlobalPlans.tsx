import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Globe, Wifi } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { countries, regions } from "@/data/countries";
import { globalPlans } from "@/data/plans";
import { cn } from "@/lib/utils";

const GlobalPlans = () => {
  const navigate = useNavigate();
  const [selectedRegion, setSelectedRegion] = useState("All");
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const filteredCountries = selectedRegion === "All" 
    ? countries 
    : countries.filter(c => c.region === selectedRegion);

  const filteredPlans = selectedCountry 
    ? globalPlans.filter(p => p.countryCode === selectedCountry)
    : [];

  const selectedCountryData = countries.find(c => c.code === selectedCountry);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Globe className="h-10 w-10 text-primary" />
              <h1 className="text-4xl md:text-5xl font-bold">Global eSIM Plans</h1>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Stay connected worldwide with our premium eSIM data plans. Choose your destination and get instant connectivity.
            </p>
          </div>

          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4 text-center">Select Region</h2>
            <div className="flex justify-center flex-wrap gap-2">
              {regions.map(region => (
                <button
                  key={region}
                  onClick={() => {
                    setSelectedRegion(region);
                    setSelectedCountry("");
                  }}
                  className={cn(
                    "px-6 py-2 rounded-lg font-semibold transition-all",
                    selectedRegion === region
                      ? "bg-primary text-white shadow-md"
                      : "bg-muted hover:bg-muted/80"
                  )}
                >
                  {region}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl font-bold mb-6 text-center">Select Country</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {filteredCountries.map(country => (
                <button
                  key={country.code}
                  onClick={() => setSelectedCountry(country.code)}
                  className={cn(
                    "p-4 rounded-xl border-2 transition-all hover:shadow-lg",
                    selectedCountry === country.code
                      ? "border-primary bg-primary/5"
                      : "border-gray-200 hover:border-primary/50"
                  )}
                >
                  <div className="text-4xl mb-2">{country.flag}</div>
                  <div className="font-semibold text-sm">{country.name}</div>
                </button>
              ))}
            </div>
          </div>

          {selectedCountry && (
            <div className="mb-8">
              <div className="bg-white rounded-xl p-6 shadow-md mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-5xl">{selectedCountryData?.flag}</span>
                  <div>
                    <h2 className="text-2xl font-bold">{selectedCountryData?.name} eSIM Plans</h2>
                    <p className="text-muted-foreground">Networks: {selectedCountryData?.networks.join(", ")}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPlans.map(plan => (
                  <div key={plan.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:border-primary transition-all hover:shadow-lg">
                    <div className="flex items-center gap-2 mb-4">
                      <Wifi className="h-5 w-5 text-primary" />
                      <span className="text-sm font-semibold text-primary">
                        {plan.validity} Days
                      </span>
                    </div>
                    <div className="mb-4">
                      <div className={cn(
                        "text-4xl font-bold mb-2",
                        plan.isUnlimited ? "text-primary" : "text-gray-900"
                      )}>
                        {plan.data}
                      </div>
                      {plan.isUnlimited && (
                        <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full">
                          Unlimited Data
                        </span>
                      )}
                    </div>
                    <div className="mb-6">
                      <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" onClick={() => navigate('/', { state: { selectedPlan: plan } })}>
                      Select Plan
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!selectedCountry && (
            <div className="text-center py-12">
              <Globe className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg text-muted-foreground">Select a country to view available eSIM plans</p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GlobalPlans;
