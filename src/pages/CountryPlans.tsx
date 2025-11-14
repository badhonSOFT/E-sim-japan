import { useState, useEffect } from "react";
import { Check, Wifi, Calendar, Shield, Star, Globe, MapPin, ChevronDown, Search, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "@/lib/supabase";

interface Plan {
  id: string;
  name: string;
  data: string;
  validity: number;
  price: number;
  networks: string;
  popular?: boolean;
  category?: string;
  region?: string;
  country?: string;
  type?: 'limited' | 'unlimited';
}

const CountryPlans = () => {
  const navigate = useNavigate();
  const { countryId } = useParams();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedDuration, setSelectedDuration] = useState(0);
  const [planType, setPlanType] = useState<'limited' | 'unlimited'>('limited');
  const [durations, setDurations] = useState<number[]>([]);
  const [dataAmounts, setDataAmounts] = useState<string[]>([]);
  const [countryName, setCountryName] = useState('');

  const fetchPlansForCountry = async (countryName: string, type: 'limited' | 'unlimited' = 'limited') => {
    try {
      const tableName = type === 'limited' ? 'limited_data_plans' : 'unlimited_data_plans';
      console.log(`Fetching ${type} plans for ${countryName} from table: ${tableName}`);
      
      const { data, error } = await supabase
        .from(tableName)
        .select('*')
        .eq('destination', countryName);
      
      if (error) {
        console.error(`Error fetching ${type} plans:`, error);
        if (error.code === 'PGRST116' && type === 'unlimited') {
          console.warn('unlimited_data_plans table does not exist. Please create it using create-unlimited-plans.sql');
        }
        setPlans([]);
        setDurations([]);
        setDataAmounts([]);
        return;
      }
      
      console.log(`Found ${data?.length || 0} ${type} plans for ${countryName}:`, data);
      
      if (!data || data.length === 0) {
        setPlans([]);
        setDurations([]);
        setDataAmounts([]);
        return;
      }
      
      const formattedPlans = data.map(plan => ({
        id: plan.id.toString(),
        name: `${plan.data} for ${plan.validity} days`,
        data: plan.data,
        validity: plan.validity,
        price: plan.price,
        networks: 'Premium Networks',
        country: countryName,
        type: type
      }));
      
      setPlans(formattedPlans);
      
      const uniqueDurations = [...new Set(data.map(plan => plan.validity))].sort((a, b) => a - b);
      const uniqueDataAmounts = [...new Set(data.map(plan => plan.data))].sort((a, b) => {
        const aNum = parseFloat(a.replace(/[^0-9.]/g, ''));
        const bNum = parseFloat(b.replace(/[^0-9.]/g, ''));
        return aNum - bNum;
      });
      
      setDurations(uniqueDurations);
      setDataAmounts(uniqueDataAmounts);
    } catch (error) {
      console.error('Error fetching plans for country:', error);
      setPlans([]);
      setDurations([]);
      setDataAmounts([]);
    }
  };

  const getCountryFlagUrl = (countryName: string): string => {
    const countryCodeMap: { [key: string]: string } = {
      'afghanistan': 'af', 'albania': 'al', 'algeria': 'dz', 'andorra': 'ad',
      'angola': 'ao', 'argentina': 'ar', 'armenia': 'am', 'australia': 'au',
      'austria': 'at', 'azerbaijan': 'az', 'bahrain': 'bh', 'bangladesh': 'bd',
      'belarus': 'by', 'belgium': 'be', 'bolivia': 'bo', 'brazil': 'br',
      'bulgaria': 'bg', 'cambodia': 'kh', 'canada': 'ca', 'chile': 'cl',
      'china': 'cn', 'colombia': 'co', 'croatia': 'hr', 'cyprus': 'cy',
      'czech republic': 'cz', 'czechia': 'cz', 'denmark': 'dk', 'egypt': 'eg',
      'estonia': 'ee', 'finland': 'fi', 'france': 'fr', 'georgia': 'ge',
      'germany': 'de', 'ghana': 'gh', 'greece': 'gr', 'hong kong': 'hk',
      'hungary': 'hu', 'iceland': 'is', 'india': 'in', 'indonesia': 'id',
      'iran': 'ir', 'iraq': 'iq', 'ireland': 'ie', 'israel': 'il', 'italy': 'it',
      'japan': 'jp', 'jordan': 'jo', 'kazakhstan': 'kz', 'kenya': 'ke',
      'kuwait': 'kw', 'latvia': 'lv', 'lebanon': 'lb', 'lithuania': 'lt',
      'luxembourg': 'lu', 'malaysia': 'my', 'malta': 'mt', 'mexico': 'mx',
      'morocco': 'ma', 'netherlands': 'nl', 'new zealand': 'nz', 'nigeria': 'ng',
      'norway': 'no', 'oman': 'om', 'pakistan': 'pk', 'philippines': 'ph',
      'poland': 'pl', 'portugal': 'pt', 'qatar': 'qa', 'romania': 'ro',
      'russia': 'ru', 'russian federation': 'ru', 'saudi arabia': 'sa',
      'singapore': 'sg', 'slovakia': 'sk', 'slovenia': 'si', 'south africa': 'za',
      'south korea': 'kr', 'korea': 'kr', 'spain': 'es', 'sri lanka': 'lk',
      'sweden': 'se', 'switzerland': 'ch', 'taiwan': 'tw', 'thailand': 'th',
      'turkey': 'tr', 'ukraine': 'ua', 'united arab emirates': 'ae', 'uae': 'ae',
      'united kingdom': 'gb', 'uk': 'gb', 'britain': 'gb', 'england': 'gb',
      'united states': 'us', 'usa': 'us', 'america': 'us', 'vietnam': 'vn',
      'aland islands': 'ax', 'åland islands': 'ax',
      'bonaire, sint eustatius and saba': 'bq', 'bonaire': 'bq',
      'canary islands': 'es', 'canarias': 'es',
      'cote d&#39;ivoire': 'ci', 'côte d\'ivoire': 'ci', 'ivory coast': 'ci',
      'curaqao': 'cw', 'curaçao': 'cw', 'curacao': 'cw',
      'macau': 'mo', 'macao': 'mo', 'palestine': 'ps', 'kosovo': 'xk',
      'faroe islands': 'fo', 'greenland': 'gl', 'gibraltar': 'gi',
      'isle of man': 'im', 'jersey': 'je', 'guernsey': 'gg',
      'puerto rico': 'pr', 'virgin islands': 'vi', 'cayman islands': 'ky',
      'turks and caicos': 'tc', 'british virgin islands': 'vg',
      'anguilla': 'ai', 'montserrat': 'ms', 'saint helena': 'sh',
      'falkland islands': 'fk', 'french guiana': 'gf', 'guadeloupe': 'gp',
      'martinique': 'mq', 'mayotte': 'yt', 'reunion': 're', 'new caledonia': 'nc',
      'french polynesia': 'pf', 'wallis and futuna': 'wf', 'cook islands': 'ck',
      'niue': 'nu', 'tokelau': 'tk', 'american samoa': 'as', 'guam': 'gu',
      'northern mariana islands': 'mp', 'norfolk island': 'nf'
    };
    
    const countryCode = countryCodeMap[countryName.toLowerCase()];
    return countryCode ? `https://flagcdn.com/w80/${countryCode}.png` : 'https://flagcdn.com/w80/xx.png';
  };

  useEffect(() => {
    const fetchCountryData = async () => {
      if (!countryId) return;
      
      try {
        const [limitedData, unlimitedData] = await Promise.all([
          supabase.from('limited_data_plans').select('destination'),
          supabase.from('unlimited_data_plans').select('destination')
        ]);
        
        if (limitedData.error && unlimitedData.error) {
          throw new Error('Failed to fetch country data');
        }
        
        const allCountries = [
          ...(limitedData.data || []).map(item => item.destination),
          ...(unlimitedData.data || []).map(item => item.destination)
        ];
        
        const countries = [...new Set(allCountries)];
        const country = countries.find(c => 
          c.toLowerCase().replace(/\s+/g, '-') === countryId
        );
        
        if (country) {
          setCountryName(country);
          fetchPlansForCountry(country, planType);
        }
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchCountryData();
  }, [countryId]);

  useEffect(() => {
    if (countryName) {
      setSelectedDuration(0);
      fetchPlansForCountry(countryName, planType);
    }
  }, [planType, countryName]);

  const handleSelectPlan = (plan: Plan) => {
    navigate('/', { state: { selectedPlan: { data: plan.data, validity: plan.validity } } });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-16 px-4 bg-gradient-to-b from-blue-50/30 via-white to-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <Button 
              variant="outline" 
              onClick={() => navigate('/plans')}
              className="mb-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Countries
            </Button>
            
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-20 h-15">
                  <img 
                    src={getCountryFlagUrl(countryName)} 
                    alt={`${countryName} flag`}
                    className="w-full h-full object-cover rounded-lg shadow-md"
                    onError={(e) => {
                      e.currentTarget.src = 'https://flagcdn.com/w80/xx.png';
                    }}
                  />
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{countryName} eSIM Plans</h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Choose the perfect data plan for your trip to {countryName}. All plans include premium network access.
              </p>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Select Plan</h2>
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-lg p-1 shadow-md border border-gray-200">
                <button
                  onClick={() => setPlanType('limited')}
                  className={cn(
                    "px-6 py-3 rounded-md font-semibold transition-all",
                    planType === 'limited'
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Limited Plan
                </button>
                <button
                  onClick={() => setPlanType('unlimited')}
                  className={cn(
                    "px-6 py-3 rounded-md font-semibold transition-all",
                    planType === 'unlimited'
                      ? "bg-primary text-white shadow-sm"
                      : "text-gray-600 hover:text-gray-900"
                  )}
                >
                  Unlimited Plan
                </button>
              </div>
            </div>
          </div>

          {plans.length > 0 && (
            <div className="mb-12">
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-center">Available {planType.charAt(0).toUpperCase() + planType.slice(1)} Plans</h2>
              <p className="text-center text-base md:text-lg text-muted-foreground mb-8 px-2 max-w-3xl mx-auto">
                Choose from our {planType} data plans for {countryName}. All plans include premium network coverage and instant activation.
              </p>
              
              <div className="mb-8">
                <h3 className="text-lg font-semibold mb-4 text-center">Filter by Validity Period</h3>
                <div className="flex justify-center flex-wrap gap-3">
                  <button
                    onClick={() => setSelectedDuration(0)}
                    className={cn(
                      "px-4 py-3 rounded-lg font-medium transition-all text-sm border-2",
                      selectedDuration === 0
                        ? "bg-primary text-white border-primary shadow-md"
                        : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                    )}
                  >
                    All Plans
                  </button>
                  {durations.map(duration => {
                    const validUntil = new Date();
                    validUntil.setDate(validUntil.getDate() + duration);
                    return (
                      <button
                        key={duration}
                        onClick={() => setSelectedDuration(duration)}
                        className={cn(
                          "px-4 py-3 rounded-lg font-medium transition-all text-sm border-2 text-center",
                          selectedDuration === duration
                            ? "bg-primary text-white border-primary shadow-md"
                            : "bg-white text-gray-700 border-gray-200 hover:border-primary hover:text-primary"
                        )}
                      >
                        <div>{duration} Days</div>
                        <div className="text-xs opacity-80">
                          Valid until {validUntil.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
            {(selectedDuration === 0 ? plans : plans.filter(p => p.validity === selectedDuration)).map((plan) => (
              <div key={plan.id} className="group relative bg-white border-2 border-gray-100 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:border-primary hover:-translate-y-1">
                {plan.price === Math.min(...plans.map(p => p.price)) && plans.length > 1 && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <div className="bg-gradient-to-r from-orange-400 to-pink-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-md">
                      Best Value
                    </div>
                  </div>
                )}
                
                <div className="text-center mb-4">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-50 to-indigo-100 rounded-full mb-3">
                    <Wifi className="h-8 w-8 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-gray-900 mb-1">{plan.data}</div>
                  <div className="text-sm text-gray-500 font-medium">{plan.validity} Days Coverage</div>
                </div>
                
                <div className="text-center mb-6">
                  <div className="text-4xl font-bold text-primary mb-1">${plan.price.toFixed(2)}</div>
                  <div className="text-sm text-gray-500">One-time payment</div>
                  <div className="text-xs text-gray-400 mt-1">
                    ${(plan.price / plan.validity).toFixed(2)}/day
                  </div>
                </div>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-sm">
                    <Check className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Premium Network Access</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Globe className="h-4 w-4 text-blue-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Instant Activation</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Shield className="h-4 w-4 text-purple-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700">Secure Connection</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <Calendar className="h-4 w-4 text-orange-500 mr-2 flex-shrink-0" />
                    <span className="text-gray-700 capitalize">{planType} Data</span>
                  </div>
                </div>
                
                <Button 
                  className="w-full py-3 text-base font-semibold bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 transition-all duration-300 shadow-md hover:shadow-lg" 
                  onClick={() => handleSelectPlan(plan)}
                >
                  Choose Plan - ${plan.price.toFixed(2)}
                </Button>
              </div>
            ))}
          </div>
          
          {plans.length === 0 && (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-100 rounded-full mb-6">
                <Wifi className="h-10 w-10 text-gray-400" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No {planType.charAt(0).toUpperCase() + planType.slice(1)} Plans Available</h3>
              <p className="text-lg text-gray-500 mb-6">
                {planType === 'unlimited' 
                  ? `Unlimited plans for ${countryName} are currently being added to our system. Please check back soon or try our limited data plans.`
                  : `No ${planType} plans found for ${countryName}. Try switching to unlimited plans.`
                }
              </p>
              <Button 
                variant="outline" 
                onClick={() => setPlanType(planType === 'limited' ? 'unlimited' : 'limited')}
                className="mx-auto"
              >
                Switch to {planType === 'limited' ? 'Unlimited' : 'Limited'} Plans
              </Button>
            </div>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default CountryPlans;