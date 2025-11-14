import { useState, useEffect } from "react";
import { Check, Wifi, Calendar, Shield, Star, Globe, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
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

interface Country {
  id: string;
  name: string;
  flag: string;
}

const Plans = () => {
  const navigate = useNavigate();
  const [limitedDataCountries, setLimitedDataCountries] = useState<Country[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchLimitedDataCountries = async () => {
    console.log('Fetching limited data countries...');
    try {
      const { data, error } = await supabase
        .from('limited_data_plans')
        .select('destination')
        .order('destination');
      
      console.log('Supabase response:', { data, error });
      
      if (error) {
        console.error('Supabase error:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('No data found in limited_data_plans table');
        return;
      }
      
      const uniqueCountries = [...new Set(data.map(item => item.destination))]
        .map(destination => ({
          id: destination.toLowerCase().replace(/\s+/g, '-'),
          name: destination,
          flag: getCountryFlagUrl(destination)
        }));
      
      console.log('Processed countries:', uniqueCountries);
      setLimitedDataCountries(uniqueCountries);

    } catch (error) {
      console.error('Error fetching limited data countries:', error);
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
      // Additional countries and common variations
      'antigua and barbuda': 'ag', 'aruba': 'aw', 'bahamas': 'bs',
      'barbados': 'bb', 'belize': 'bz', 'benin': 'bj', 'bermuda': 'bm',
      'bhutan': 'bt', 'bosnia and herzegovina': 'ba', 'bosnia': 'ba', 'botswana': 'bw',
      'brunei': 'bn', 'brunei darussalam': 'bn', 'burkina faso': 'bf', 'burundi': 'bi', 
      'cabo verde': 'cv', 'cape verde': 'cv', 'cameroon': 'cm', 'central african republic': 'cf', 
      'chad': 'td', 'comoros': 'km', 'congo': 'cg', 'democratic republic of congo': 'cd',
      'dr congo': 'cd', 'costa rica': 'cr', 'cote d\'ivoire': 'ci', 'ivory coast': 'ci',
      'cuba': 'cu', 'curacao': 'cw', 'djibouti': 'dj', 'dominica': 'dm',
      'dominican republic': 'do', 'ecuador': 'ec', 'el salvador': 'sv',
      'equatorial guinea': 'gq', 'eritrea': 'er', 'eswatini': 'sz', 'swaziland': 'sz',
      'ethiopia': 'et', 'fiji': 'fj', 'gabon': 'ga', 'gambia': 'gm', 'the gambia': 'gm',
      'grenada': 'gd', 'guatemala': 'gt', 'guinea': 'gn', 'guinea-bissau': 'gw',
      'guyana': 'gy', 'haiti': 'ht', 'honduras': 'hn', 'jamaica': 'jm',
      'kiribati': 'ki', 'laos': 'la', 'lao': 'la', 'lesotho': 'ls', 'liberia': 'lr',
      'libya': 'ly', 'liechtenstein': 'li', 'madagascar': 'mg', 'malawi': 'mw',
      'maldives': 'mv', 'mali': 'ml', 'marshall islands': 'mh',
      'mauritania': 'mr', 'mauritius': 'mu', 'micronesia': 'fm', 'moldova': 'md',
      'monaco': 'mc', 'mongolia': 'mn', 'montenegro': 'me', 'mozambique': 'mz',
      'myanmar': 'mm', 'burma': 'mm', 'namibia': 'na', 'nauru': 'nr', 'nepal': 'np',
      'nicaragua': 'ni', 'niger': 'ne', 'north korea': 'kp', 'north macedonia': 'mk',
      'macedonia': 'mk', 'palau': 'pw', 'panama': 'pa', 'papua new guinea': 'pg', 
      'paraguay': 'py', 'peru': 'pe', 'rwanda': 'rw', 'saint kitts and nevis': 'kn',
      'st kitts and nevis': 'kn', 'saint lucia': 'lc', 'st lucia': 'lc',
      'saint vincent and the grenadines': 'vc', 'st vincent and the grenadines': 'vc',
      'samoa': 'ws', 'san marino': 'sm', 'sao tome and principe': 'st',
      'senegal': 'sn', 'serbia': 'rs', 'seychelles': 'sc', 'sierra leone': 'sl',
      'solomon islands': 'sb', 'somalia': 'so', 'sudan': 'sd', 'south sudan': 'ss',
      'suriname': 'sr', 'tajikistan': 'tj', 'tanzania': 'tz', 'timor-leste': 'tl',
      'east timor': 'tl', 'togo': 'tg', 'tonga': 'to', 'trinidad and tobago': 'tt',
      'tunisia': 'tn', 'turkmenistan': 'tm', 'tuvalu': 'tv', 'uganda': 'ug', 
      'uruguay': 'uy', 'uzbekistan': 'uz', 'vanuatu': 'vu', 'venezuela': 've', 
      'yemen': 'ye', 'zambia': 'zm', 'zimbabwe': 'zw',
      // Special territories and regions
      'aland islands': 'ax', 'åland islands': 'ax',
      'bonaire, sint eustatius and saba': 'bq', 'bonaire': 'bq',
      'canary islands': 'es', 'canarias': 'es',
      'cote d&#39;ivoire': 'ci', 'côte d\'ivoire': 'ci',
      'curaqao': 'cw', 'curaçao': 'cw',
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
    
    // Debug: Log countries without flag mappings
    if (!countryCode) {
      console.warn(`Missing flag mapping for country: "${countryName}"`);
    }
    
    return countryCode ? `https://flagcdn.com/w80/${countryCode}.png` : 'https://flagcdn.com/w80/xx.png';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLimitedDataCountries();
  }, []);





  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Global eSIM Plans</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Choose the perfect data plan for your worldwide travels. All plans include premium network access.
            </p>
            
            <div className="max-w-md mx-auto">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search countries..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                />
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">
              Select Country
            </h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {limitedDataCountries
                .filter(country => country.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((country) => (
                <div
                  key={country.id}
                  onClick={() => navigate(`/plans/${country.id}`)}
                  className="bg-white border border-gray-200 rounded-xl p-6 shadow-md hover:shadow-lg transition-all cursor-pointer hover:border-primary group"
                >
                  <div className="text-center">
                    <div className="w-16 h-12 mx-auto mb-3 group-hover:scale-110 transition-transform">
                      <img 
                        src={country.flag} 
                        alt={`${country.name} flag`}
                        className="w-full h-full object-cover rounded-md shadow-sm"
                        onError={(e) => {
                          e.currentTarget.src = 'https://flagcdn.com/w80/xx.png';
                        }}
                      />
                    </div>
                    <h3 className="font-semibold text-gray-900 group-hover:text-primary transition-colors">
                      {country.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Plans;
