import { useState, useEffect } from "react";
import { Check, Wifi, Calendar, Shield, Star, Globe, MapPin, ChevronDown, Search } from "lucide-react";
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

interface Region {
  id: string;
  name: string;
  countries: Country[];
}

interface Country {
  id: string;
  name: string;
  flag: string;
}



const regions: Region[] = [
  {
    id: 'asia',
    name: 'Asia',
    countries: [
      { id: 'afghanistan', name: 'Afghanistan', flag: '🇦🇫' },
      { id: 'bangladesh', name: 'Bangladesh', flag: '🇧🇩' },
      { id: 'brunei', name: 'Brunei', flag: '🇧🇳' },
      { id: 'cambodia', name: 'Cambodia', flag: '🇰🇭' },
      { id: 'china', name: 'China', flag: '🇨🇳' },
      { id: 'hong-kong', name: 'Hong Kong', flag: '🇭🇰' },
      { id: 'india', name: 'India', flag: '🇮🇳' },
      { id: 'indonesia', name: 'Indonesia', flag: '🇮🇩' },
      { id: 'japan', name: 'Japan', flag: '🇯🇵' },
      { id: 'kazakhstan', name: 'Kazakhstan', flag: '🇰🇿' },
      { id: 'kyrgyzstan', name: 'Kyrgyzstan', flag: '🇰🇬' },
      { id: 'laos', name: 'Laos', flag: '🇱🇦' },
      { id: 'macau', name: 'Macau', flag: '🇲🇴' },
      { id: 'malaysia', name: 'Malaysia', flag: '🇲🇾' },
      { id: 'maldives', name: 'Maldives', flag: '🇲🇻' },
      { id: 'mongolia', name: 'Mongolia', flag: '🇲🇳' },
      { id: 'myanmar', name: 'Myanmar', flag: '🇲🇲' },
      { id: 'nepal', name: 'Nepal', flag: '🇳🇵' },
      { id: 'pakistan', name: 'Pakistan', flag: '🇵🇰' },
      { id: 'philippines', name: 'Philippines', flag: '🇵🇭' },
      { id: 'singapore', name: 'Singapore', flag: '🇸🇬' },
      { id: 'south-korea', name: 'South Korea', flag: '🇰🇷' },
      { id: 'sri-lanka', name: 'Sri Lanka', flag: '🇱🇰' },
      { id: 'taiwan', name: 'Taiwan', flag: '🇹🇼' },
      { id: 'tajikistan', name: 'Tajikistan', flag: '🇹🇯' },
      { id: 'thailand', name: 'Thailand', flag: '🇹🇭' },
      { id: 'uzbekistan', name: 'Uzbekistan', flag: '🇺🇿' },
      { id: 'vietnam', name: 'Vietnam', flag: '🇻🇳' }
    ]
  },
  {
    id: 'europe',
    name: 'Europe',
    countries: [
      { id: 'aland-islands', name: 'Aland Islands', flag: '🇦🇽' },
      { id: 'albania', name: 'Albania', flag: '🇦🇱' },
      { id: 'andorra', name: 'Andorra', flag: '🇦🇩' },
      { id: 'austria', name: 'Austria', flag: '🇦🇹' },
      { id: 'azerbaijan', name: 'Azerbaijan', flag: '🇦🇿' },
      { id: 'belarus', name: 'Belarus', flag: '🇧🇾' },
      { id: 'belgium', name: 'Belgium', flag: '🇧🇪' },
      { id: 'bosnia-herzegovina', name: 'Bosnia Herzegovina', flag: '🇧🇦' },
      { id: 'bulgaria', name: 'Bulgaria', flag: '🇧🇬' },
      { id: 'croatia', name: 'Croatia', flag: '🇭🇷' },
      { id: 'cyprus', name: 'Cyprus', flag: '🇨🇾' },
      { id: 'czech-republic', name: 'Czech Republic', flag: '🇨🇿' },
      { id: 'denmark', name: 'Denmark', flag: '🇩🇰' },
      { id: 'estonia', name: 'Estonia', flag: '🇪🇪' },
      { id: 'faroe-islands', name: 'Faroe Islands', flag: '🇫🇴' },
      { id: 'finland', name: 'Finland', flag: '🇫🇮' },
      { id: 'france', name: 'France', flag: '🇫🇷' },
      { id: 'georgia', name: 'Georgia', flag: '🇬🇪' },
      { id: 'germany', name: 'Germany', flag: '🇩🇪' },
      { id: 'gibraltar', name: 'Gibraltar', flag: '🇬🇮' },
      { id: 'greece', name: 'Greece', flag: '🇬🇷' },
      { id: 'greenland', name: 'Greenland', flag: '🇬🇱' },
      { id: 'guernsey', name: 'Guernsey', flag: '🇬🇬' },
      { id: 'hungary', name: 'Hungary', flag: '🇭🇺' },
      { id: 'iceland', name: 'Iceland', flag: '🇮🇸' },
      { id: 'ireland', name: 'Ireland', flag: '🇮🇪' },
      { id: 'isle-of-man', name: 'Isle of Man', flag: '🇮🇲' },
      { id: 'italy', name: 'Italy', flag: '🇮🇹' },
      { id: 'jersey', name: 'Jersey', flag: '🇯🇪' },
      { id: 'kosovo', name: 'Kosovo', flag: '🇽🇰' },
      { id: 'latvia', name: 'Latvia', flag: '🇱🇻' },
      { id: 'liechtenstein', name: 'Liechtenstein', flag: '🇱🇮' },
      { id: 'lithuania', name: 'Lithuania', flag: '🇱🇹' },
      { id: 'luxembourg', name: 'Luxembourg', flag: '🇱🇺' },
      { id: 'malta', name: 'Malta', flag: '🇲🇹' },
      { id: 'moldova', name: 'Moldova', flag: '🇲🇩' },
      { id: 'monaco', name: 'Monaco', flag: '🇲🇨' },
      { id: 'montenegro', name: 'Montenegro', flag: '🇲🇪' },
      { id: 'netherlands', name: 'Netherlands', flag: '🇳🇱' },
      { id: 'north-macedonia', name: 'North Macedonia', flag: '🇲🇰' },
      { id: 'norway', name: 'Norway', flag: '🇳🇴' },
      { id: 'poland', name: 'Poland', flag: '🇵🇱' },
      { id: 'portugal', name: 'Portugal', flag: '🇵🇹' },
      { id: 'romania', name: 'Romania', flag: '🇷🇴' },
      { id: 'russia', name: 'Russia', flag: '🇷🇺' },
      { id: 'san-marino', name: 'San Marino', flag: '🇸🇲' },
      { id: 'serbia', name: 'Serbia', flag: '🇷🇸' },
      { id: 'slovakia', name: 'Slovakia', flag: '🇸🇰' },
      { id: 'slovenia', name: 'Slovenia', flag: '🇸🇮' },
      { id: 'spain', name: 'Spain', flag: '🇪🇸' },
      { id: 'sweden', name: 'Sweden', flag: '🇸🇪' },
      { id: 'switzerland', name: 'Switzerland', flag: '🇨🇭' },
      { id: 'turkey', name: 'Turkey', flag: '🇹🇷' },
      { id: 'ukraine', name: 'Ukraine', flag: '🇺🇦' },
      { id: 'united-kingdom', name: 'United Kingdom', flag: '🇬🇧' },
      { id: 'vatican-city', name: 'Vatican City State', flag: '🇻🇦' }
    ]
  },
  {
    id: 'americas',
    name: 'Americas',
    countries: [
      { id: 'anguilla', name: 'Anguilla', flag: '🇦🇮' },
      { id: 'antigua-barbuda', name: 'Antigua and Barbuda', flag: '🇦🇬' },
      { id: 'argentina', name: 'Argentina', flag: '🇦🇷' },
      { id: 'aruba', name: 'Aruba', flag: '🇦🇼' },
      { id: 'bahamas', name: 'Bahamas', flag: '🇧🇸' },
      { id: 'barbados', name: 'Barbados', flag: '🇧🇧' },
      { id: 'belize', name: 'Belize', flag: '🇧🇿' },
      { id: 'bermuda', name: 'Bermuda', flag: '🇧🇲' },
      { id: 'bolivia', name: 'Bolivia', flag: '🇧🇴' },
      { id: 'bonaire', name: 'Bonaire, Sint Eustatius and Saba', flag: '🇧🇶' },
      { id: 'brazil', name: 'Brazil', flag: '🇧🇷' },
      { id: 'british-virgin-islands', name: 'British Virgin Islands', flag: '🇻🇬' },
      { id: 'canada', name: 'Canada', flag: '🇨🇦' },
      { id: 'cayman-islands', name: 'Cayman Islands', flag: '🇰🇾' },
      { id: 'chile', name: 'Chile', flag: '🇨🇱' },
      { id: 'colombia', name: 'Colombia', flag: '🇨🇴' },
      { id: 'costa-rica', name: 'Costa Rica', flag: '🇨🇷' },
      { id: 'curacao', name: 'Curaçao', flag: '🇨🇼' },
      { id: 'dominica', name: 'Dominica', flag: '🇩🇲' },
      { id: 'dominican-republic', name: 'Dominican Republic', flag: '🇩🇴' },
      { id: 'ecuador', name: 'Ecuador', flag: '🇪🇨' },
      { id: 'el-salvador', name: 'El Salvador', flag: '🇸🇻' },
      { id: 'french-guiana', name: 'French Guiana', flag: '🇬🇫' },
      { id: 'grenada', name: 'Grenada', flag: '🇬🇩' },
      { id: 'guadeloupe', name: 'Guadeloupe', flag: '🇬🇵' },
      { id: 'guatemala', name: 'Guatemala', flag: '🇬🇹' },
      { id: 'guyana', name: 'Guyana', flag: '🇬🇾' },
      { id: 'haiti', name: 'Haiti', flag: '🇭🇹' },
      { id: 'honduras', name: 'Honduras', flag: '🇭🇳' },
      { id: 'jamaica', name: 'Jamaica', flag: '🇯🇲' },
      { id: 'martinique', name: 'Martinique', flag: '🇲🇶' },
      { id: 'mexico', name: 'Mexico', flag: '🇲🇽' },
      { id: 'montserrat', name: 'Montserrat', flag: '🇲🇸' },
      { id: 'nicaragua', name: 'Nicaragua', flag: '🇳🇮' },
      { id: 'panama', name: 'Panama', flag: '🇵🇦' },
      { id: 'paraguay', name: 'Paraguay', flag: '🇵🇾' },
      { id: 'peru', name: 'Peru', flag: '🇵🇪' },
      { id: 'puerto-rico', name: 'Puerto Rico', flag: '🇵🇷' },
      { id: 'saint-barthelemy', name: 'Saint Barthélemy', flag: '🇧🇱' },
      { id: 'saint-kitts-nevis', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
      { id: 'saint-lucia', name: 'Saint Lucia', flag: '🇱🇨' },
      { id: 'saint-martin', name: 'Saint Martin', flag: '🇲🇫' },
      { id: 'saint-vincent-grenadines', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
      { id: 'sint-maarten', name: 'Sint Maarten', flag: '🇸🇽' },
      { id: 'suriname', name: 'Suriname', flag: '🇸🇷' },
      { id: 'trinidad-tobago', name: 'Trinidad and Tobago', flag: '🇹🇹' },
      { id: 'turks-caicos', name: 'Turks and Caicos Islands', flag: '🇹🇨' },
      { id: 'united-states', name: 'United States', flag: '🇺🇸' },
      { id: 'us-virgin-islands', name: 'United States Virgin Islands', flag: '🇻🇮' },
      { id: 'uruguay', name: 'Uruguay', flag: '🇺🇾' },
      { id: 'venezuela', name: 'Venezuela', flag: '🇻🇪' }
    ]
  },
  {
    id: 'africa',
    name: 'Africa',
    countries: [
      { id: 'algeria', name: 'Algeria', flag: '🇩🇿' },
      { id: 'benin', name: 'Benin', flag: '🇧🇯' },
      { id: 'botswana', name: 'Botswana', flag: '🇧🇼' },
      { id: 'burkina-faso', name: 'Burkina Faso', flag: '🇧🇫' },
      { id: 'cabo-verde', name: 'Cabo Verde', flag: '🇨🇻' },
      { id: 'cameroon', name: 'Cameroon', flag: '🇨🇲' },
      { id: 'central-african-republic', name: 'Central African Republic', flag: '🇨🇫' },
      { id: 'chad', name: 'Chad', flag: '🇹🇩' },
      { id: 'congo', name: 'Congo', flag: '🇨🇬' },
      { id: 'cote-divoire', name: 'Cote d\'Ivoire', flag: '🇨🇮' },
      { id: 'dr-congo', name: 'DR Congo', flag: '🇨🇩' },
      { id: 'egypt', name: 'Egypt', flag: '🇪🇬' },
      { id: 'eswatini', name: 'Eswatini', flag: '🇸🇿' },
      { id: 'gabon', name: 'Gabon', flag: '🇬🇦' },
      { id: 'ghana', name: 'Ghana', flag: '🇬🇭' },
      { id: 'guinea', name: 'Guinea', flag: '🇬🇳' },
      { id: 'guinea-bissau', name: 'Guinea-Bissau', flag: '🇬🇼' },
      { id: 'kenya', name: 'Kenya', flag: '🇰🇪' },
      { id: 'lesotho', name: 'Lesotho', flag: '🇱🇸' },
      { id: 'liberia', name: 'Liberia', flag: '🇱🇷' },
      { id: 'madagascar', name: 'Madagascar', flag: '🇲🇬' },
      { id: 'malawi', name: 'Malawi', flag: '🇲🇼' },
      { id: 'mali', name: 'Mali', flag: '🇲🇱' },
      { id: 'mauritania', name: 'Mauritania', flag: '🇲🇷' },
      { id: 'mauritius', name: 'Mauritius', flag: '🇲🇺' },
      { id: 'mayotte', name: 'Mayotte', flag: '🇾🇹' },
      { id: 'morocco', name: 'Morocco', flag: '🇲🇦' },
      { id: 'mozambique', name: 'Mozambique', flag: '🇲🇿' },
      { id: 'namibia', name: 'Namibia', flag: '🇳🇦' },
      { id: 'niger', name: 'Niger', flag: '🇳🇪' },
      { id: 'nigeria', name: 'Nigeria', flag: '🇳🇬' },
      { id: 'reunion', name: 'Reunion', flag: '🇷🇪' },
      { id: 'rwanda', name: 'Rwanda', flag: '🇷🇼' },
      { id: 'senegal', name: 'Senegal', flag: '🇸🇳' },
      { id: 'seychelles', name: 'Seychelles', flag: '🇸🇨' },
      { id: 'south-africa', name: 'South Africa', flag: '🇿🇦' },
      { id: 'sudan', name: 'Sudan', flag: '🇸🇩' },
      { id: 'tanzania', name: 'Tanzania', flag: '🇹🇿' },
      { id: 'togo', name: 'Togo', flag: '🇹🇬' },
      { id: 'tunisia', name: 'Tunisia', flag: '🇹🇳' },
      { id: 'uganda', name: 'Uganda', flag: '🇺🇬' },
      { id: 'western-sahara', name: 'Western Sahara', flag: '🇪🇭' },
      { id: 'zambia', name: 'Zambia', flag: '🇿🇲' }
    ]
  },
  {
    id: 'oceania',
    name: 'Oceania',
    countries: [
      { id: 'australia', name: 'Australia', flag: '🇦🇺' },
      { id: 'canary-islands', name: 'Canary Islands', flag: '🇮🇨' },
      { id: 'fiji', name: 'Fiji', flag: '🇫🇯' },
      { id: 'french-polynesia', name: 'French Polynesia', flag: '🇵🇫' },
      { id: 'guam', name: 'Guam', flag: '🇬🇺' },
      { id: 'hawaii', name: 'Hawaii', flag: '🏝️' },
      { id: 'iran', name: 'Iran', flag: '🇮🇷' },
      { id: 'iraq', name: 'Iraq', flag: '🇮🇶' },
      { id: 'israel', name: 'Israel', flag: '🇮🇱' },
      { id: 'jordan', name: 'Jordan', flag: '🇯🇴' },
      { id: 'kuwait', name: 'Kuwait', flag: '🇰🇼' },
      { id: 'nauru', name: 'Nauru', flag: '🇳🇷' },
      { id: 'netherlands-antilles', name: 'Netherlands Antilles', flag: '🇳🇱' },
      { id: 'new-zealand', name: 'New Zealand', flag: '🇳🇿' },
      { id: 'oman', name: 'Oman', flag: '🇴🇲' },
      { id: 'palestine', name: 'Palestine', flag: '🇵🇸' },
      { id: 'papua-new-guinea', name: 'Papua New Guinea', flag: '🇵🇬' },
      { id: 'qatar', name: 'Qatar', flag: '🇶🇦' },
      { id: 'samoa', name: 'Samoa', flag: '🇼🇸' },
      { id: 'saudi-arabia', name: 'Saudi Arabia', flag: '🇸🇦' },
      { id: 'tonga', name: 'Tonga', flag: '🇹🇴' },
      { id: 'uae', name: 'United Arab Emirates', flag: '🇦🇪' },
      { id: 'vanuatu', name: 'Vanuatu', flag: '🇻🇺' },
      { id: 'yemen', name: 'Yemen', flag: '🇾🇪' }
    ]
  }
];

const Plans = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState<Plan[]>([]);
  const [selectedDuration, setSelectedDuration] = useState(7);
  const [selectedRegion, setSelectedRegion] = useState('africa');
  const [selectedCountry, setSelectedCountry] = useState('algeria');
  const [planType, setPlanType] = useState<'limited' | 'unlimited'>('limited');
  const [regionDropdownOpen, setRegionDropdownOpen] = useState(false);
  const [countryDropdownOpen, setCountryDropdownOpen] = useState(false);
  const [countrySearch, setCountrySearch] = useState('');
  const [planTypeDropdownOpen, setPlanTypeDropdownOpen] = useState(false);
  const [limitedDataCountries, setLimitedDataCountries] = useState<Country[]>([]);
  const [durations, setDurations] = useState<number[]>([]);
  const [dataAmounts, setDataAmounts] = useState<string[]>([]);

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
          flag: getCountryFlag(destination)
        }));
      
      console.log('Processed countries:', uniqueCountries);
      setLimitedDataCountries(uniqueCountries);
      if (uniqueCountries.length > 0) {
        setSelectedCountry(uniqueCountries[0].id);
      }
    } catch (error) {
      console.error('Error fetching limited data countries:', error);
    }
  };

  const fetchPlansForCountry = async (countryName: string) => {
    console.log('Fetching plans for country:', countryName);
    try {
      const { data, error } = await supabase
        .from('limited_data_plans')
        .select('*')
        .eq('destination', countryName);
      
      console.log('Plans data response:', { data, error });
      
      if (error) {
        console.error('Supabase error fetching plans:', error);
        throw error;
      }
      
      if (!data || data.length === 0) {
        console.log('No plans found for country:', countryName);
        setPlans([]);
        return;
      }
      
      const formattedPlans = data.map(plan => ({
        id: plan.id.toString(),
        name: `${plan.data} for ${plan.validity} days`,
        data: plan.data,
        validity: plan.validity,
        price: plan.price,
        networks: 'Premium Networks',
        country: countryName
      }));
      
      console.log('Formatted plans:', formattedPlans);
      setPlans(formattedPlans);
      
      // Extract unique durations and data amounts from plans
      const uniqueDurations = [...new Set(data.map(plan => plan.validity))].sort((a, b) => a - b);
      const uniqueDataAmounts = [...new Set(data.map(plan => plan.data))].sort((a, b) => {
        const aNum = parseFloat(a.replace(/[^0-9.]/g, ''));
        const bNum = parseFloat(b.replace(/[^0-9.]/g, ''));
        return aNum - bNum;
      });
      
      setDurations(uniqueDurations);
      setDataAmounts(uniqueDataAmounts);
      
      // Set default selected duration to first available
      if (uniqueDurations.length > 0) {
        setSelectedDuration(uniqueDurations[0]);
      }
    } catch (error) {
      console.error('Error fetching plans for country:', error);
    }
  };

  const getCountryFlag = (countryName: string): string => {
    const flagMap: { [key: string]: string } = {
      'afghanistan': '🇦🇫', 'albania': '🇦🇱', 'algeria': '🇩🇿', 'andorra': '🇦🇩',
      'angola': '🇦🇴', 'argentina': '🇦🇷', 'armenia': '🇦🇲', 'australia': '🇦🇺',
      'austria': '🇦🇹', 'azerbaijan': '🇦🇿', 'bahrain': '🇧🇭', 'bangladesh': '🇧🇩',
      'belarus': '🇧🇾', 'belgium': '🇧🇪', 'bolivia': '🇧🇴', 'brazil': '🇧🇷',
      'bulgaria': '🇧🇬', 'cambodia': '🇰🇭', 'canada': '🇨🇦', 'chile': '🇨🇱',
      'china': '🇨🇳', 'colombia': '🇨🇴', 'croatia': '🇭🇷', 'cyprus': '🇨🇾',
      'czech republic': '🇨🇿', 'denmark': '🇩🇰', 'egypt': '🇪🇬', 'estonia': '🇪🇪',
      'finland': '🇫🇮', 'france': '🇫🇷', 'georgia': '🇬🇪', 'germany': '🇩🇪',
      'ghana': '🇬🇭', 'greece': '🇬🇷', 'hong kong': '🇭🇰', 'hungary': '🇭🇺',
      'iceland': '🇮🇸', 'india': '🇮🇳', 'indonesia': '🇮🇩', 'iran': '🇮🇷',
      'iraq': '🇮🇶', 'ireland': '🇮🇪', 'israel': '🇮🇱', 'italy': '🇮🇹',
      'japan': '🇯🇵', 'jordan': '🇯🇴', 'kazakhstan': '🇰🇿', 'kenya': '🇰🇪',
      'kuwait': '🇰🇼', 'latvia': '🇱🇻', 'lebanon': '🇱🇧', 'lithuania': '🇱🇹',
      'luxembourg': '🇱🇺', 'malaysia': '🇲🇾', 'malta': '🇲🇹', 'mexico': '🇲🇽',
      'morocco': '🇲🇦', 'netherlands': '🇳🇱', 'new zealand': '🇳🇿', 'nigeria': '🇳🇬',
      'norway': '🇳🇴', 'oman': '🇴🇲', 'pakistan': '🇵🇰', 'philippines': '🇵🇭',
      'poland': '🇵🇱', 'portugal': '🇵🇹', 'qatar': '🇶🇦', 'romania': '🇷🇴',
      'russia': '🇷🇺', 'saudi arabia': '🇸🇦', 'singapore': '🇸🇬', 'slovakia': '🇸🇰',
      'slovenia': '🇸🇮', 'south africa': '🇿🇦', 'south korea': '🇰🇷', 'spain': '🇪🇸',
      'sri lanka': '🇱🇰', 'sweden': '🇸🇪', 'switzerland': '🇨🇭', 'taiwan': '🇹🇼',
      'thailand': '🇹🇭', 'turkey': '🇹🇷', 'ukraine': '🇺🇦', 'united arab emirates': '🇦🇪',
      'united kingdom': '🇬🇧', 'united states': '🇺🇸', 'vietnam': '🇻🇳'
    };
    return flagMap[countryName.toLowerCase()] || '🏳️';
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchLimitedDataCountries();
  }, []);

  useEffect(() => {
    if (planType === 'limited') {
      fetchLimitedDataCountries();
    }
  }, [planType]);

  useEffect(() => {
    if (planType === 'limited' && selectedCountry) {
      const countryName = limitedDataCountries.find(c => c.id === selectedCountry)?.name;
      if (countryName) {
        fetchPlansForCountry(countryName);
      }
    }
  }, [selectedCountry, planType, limitedDataCountries]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest('.relative')) {
        setRegionDropdownOpen(false);
        setCountryDropdownOpen(false);
        setPlanTypeDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSelectPlan = (plan: Plan) => {
    navigate('/', { state: { selectedPlan: { data: plan.data, validity: plan.validity } } });
  };

  const getPlanByDataAndDuration = (data: string, duration: number) => {
    return plans.find(p => p.data === data && p.validity === duration);
  };

  const popularPlans = [
    { data: "10GB", validity: 7, label: "Most Popular" },
    { data: "20GB", validity: 7, label: "Best Value" },
    { data: "10GB", validity: 10, label: "Recommended" }
  ];

  const filteredPlansByDuration = plans.filter(p => p.validity === selectedDuration);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <section className="py-16 px-4 bg-gradient-to-b from-gray-50 to-background">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Global eSIM Plans</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Choose the perfect data plan for your worldwide travels. All plans include premium network access.
            </p>
          </div>

          <div className="mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="relative">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Wifi className="h-4 w-4 text-primary" />
                  Plan Type
                </label>
                <button
                  onClick={() => setPlanTypeDropdownOpen(!planTypeDropdownOpen)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-primary transition-colors"
                >
                  <span>{planType === 'limited' ? 'Limited Data' : 'Unlimited Data'}</span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {planTypeDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <button
                      onClick={() => {
                        setPlanType('limited');
                        setPlanTypeDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full p-3 text-left hover:bg-gray-50 transition-colors border-b border-gray-100",
                        planType === 'limited' && "bg-primary/10 text-primary"
                      )}
                    >
                      <div className="font-medium">Limited Data</div>
                      <div className="text-sm text-gray-500">Fixed data allowance</div>
                    </button>
                    <button
                      onClick={() => {
                        setPlanType('unlimited');
                        setPlanTypeDropdownOpen(false);
                      }}
                      className={cn(
                        "w-full p-3 text-left hover:bg-gray-50 transition-colors",
                        planType === 'unlimited' && "bg-primary/10 text-primary"
                      )}
                    >
                      <div className="font-medium">Unlimited Data</div>
                      <div className="text-sm text-gray-500">No data limits</div>
                    </button>
                  </div>
                )}
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  Select Country
                </label>
                <button
                  onClick={() => setCountryDropdownOpen(!countryDropdownOpen)}
                  className="w-full p-3 bg-white border border-gray-200 rounded-lg flex items-center justify-between hover:border-primary transition-colors"
                >
                  <span className="flex items-center gap-2">
                    <span>{planType === 'limited' 
                      ? limitedDataCountries.find(c => c.id === selectedCountry)?.flag
                      : regions.find(r => r.id === selectedRegion)?.countries.find(c => c.id === selectedCountry)?.flag}</span>
                    {planType === 'limited' 
                      ? limitedDataCountries.find(c => c.id === selectedCountry)?.name
                      : regions.find(r => r.id === selectedRegion)?.countries.find(c => c.id === selectedCountry)?.name}
                  </span>
                  <ChevronDown className="h-4 w-4" />
                </button>
                {countryDropdownOpen && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                    <div className="p-2 border-b border-gray-100">
                      <div className="relative">
                        <Search className="h-4 w-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search countries..."
                          value={countrySearch}
                          onChange={(e) => setCountrySearch(e.target.value)}
                          className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-md text-sm focus:outline-none focus:border-primary"
                        />
                      </div>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {(planType === 'limited' ? limitedDataCountries : regions.find(r => r.id === selectedRegion)?.countries || [])
                        .filter(country => country.name.toLowerCase().includes(countrySearch.toLowerCase()))
                        .map(country => (
                        <button
                          key={country.id}
                          onClick={() => {
                            setSelectedCountry(country.id);
                            setCountryDropdownOpen(false);
                            setCountrySearch('');
                          }}
                          className={cn(
                            "w-full p-3 text-left hover:bg-gray-50 transition-colors flex items-center gap-2",
                            selectedCountry === country.id && "bg-primary/10 text-primary"
                          )}
                        >
                          <span>{country.flag}</span>
                          {country.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mb-12">
            <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Popular Plans</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
              {popularPlans.map((popular, idx) => {
                const plan = getPlanByDataAndDuration(popular.data, popular.validity);
                if (!plan) return null;
                return (
                  <div key={idx} className="relative bg-background border-2 border-primary rounded-xl p-6 shadow-lg">
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                      <Star className="h-3 w-3 fill-white" />
                      {popular.label}
                    </div>
                    <div className="mt-4 mb-4">
                      <div className="text-center">
                        <div className="text-4xl font-bold text-primary mb-2">{plan.data}</div>
                        <div className="text-lg font-semibold">{plan.validity} Days</div>
                      </div>
                    </div>
                    <div className="text-center mb-6">
                      <span className="text-3xl font-bold">${plan.price.toFixed(2)}</span>
                    </div>
                    <Button className="w-full" onClick={() => handleSelectPlan(plan)}>
                      Select Plan
                    </Button>
                  </div>
                );
              })}
            </div>
          </div>

          {planType === 'unlimited' && (
            <div className="mb-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-center">Unlimited Data Plans</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[7, 15, 30].map(days => {
                  const price = days === 7 ? 15.99 : days === 15 ? 28.99 : 45.99;
                  return (
                    <div key={days} className="bg-white rounded-xl p-6 shadow-md">
                      <div className="text-center mb-4">
                        <div className="text-2xl font-bold text-primary mb-2">Unlimited</div>
                        <div className="text-lg font-semibold">{days} Days</div>
                      </div>
                      <div className="text-center mb-4">
                        <span className="text-3xl font-bold">${price}</span>
                      </div>
                      <div className="text-sm text-gray-600 mb-4 text-center">
                        High-speed data with fair usage policy
                      </div>
                      <Button className="w-full" onClick={() => handleSelectPlan({
                        id: `unlimited-${days}`,
                        name: `Unlimited Data for ${days} Days`,
                        data: 'Unlimited',
                        validity: days,
                        price,
                        networks: 'Premium Networks',
                        type: 'unlimited'
                      })}>
                        Select Plan
                      </Button>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {planType === 'limited' && (
            <>
              <div className="mb-8">
                <h2 className="text-xl md:text-2xl font-bold mb-4 md:mb-6 text-center">Compare All Plans</h2>
                <p className="text-center text-sm md:text-base text-muted-foreground mb-4 md:mb-6 px-2">Select your trip duration to see available data options</p>
                <div className="flex justify-center mb-6 md:mb-8 flex-wrap gap-2">
                  {durations.map(duration => (
                    <button
                      key={duration}
                      onClick={() => setSelectedDuration(duration)}
                      className={cn(
                        "px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold transition-all text-sm md:text-base",
                        selectedDuration === duration
                          ? "bg-primary text-white shadow-md"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {duration} Days
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden md:block overflow-x-auto shadow-lg rounded-xl">
            <table className="w-full min-w-[800px] bg-white border-collapse">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-gray-100">
                  <th className="p-3 text-left font-bold text-gray-900 border-b-2 border-gray-200 sticky left-0 bg-primary/5 z-10 min-w-[120px]">
                    <div className="flex items-center gap-2">
                      <Wifi className="h-4 w-4 text-primary" />
                      <span>Data Plan</span>
                    </div>
                  </th>
                  {durations.map(d => (
                    <th key={d} className={cn(
                      "p-3 text-center font-bold border-b-2 border-gray-200 transition-colors",
                      selectedDuration === d ? "bg-primary/10 text-primary" : "text-gray-700"
                    )}>
                      <div className="flex flex-col">
                        <span className="text-lg">{d}</span>
                        <span className="text-xs font-normal">Days</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataAmounts.map((data, idx) => (
                  <tr key={data} className={cn(
                    "hover:bg-gray-50 transition-colors",
                    idx % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  )}>
                    <td className="p-3 border-b border-gray-200 sticky left-0 z-10 min-w-[120px] bg-primary/5">
                      <div className="flex items-center justify-center">
                        <div className="flex-shrink-0 w-16 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-lg">{data}</span>
                        </div>
                      </div>
                    </td>
                    {durations.map(duration => {
                      const plan = getPlanByDataAndDuration(data, duration);
                      const isSelected = selectedDuration === duration;
                      return (
                        <td key={duration} className={cn(
                          "p-3 text-center border-b border-gray-200 transition-all",
                          isSelected && "bg-primary/5"
                        )}>
                          {plan ? (
                            <div className="flex flex-col items-center gap-2">
                              <div className="text-xl font-bold text-gray-900">${plan.price.toFixed(2)}</div>
                              <Button 
                                size="sm" 
                                variant={isSelected ? "default" : "outline"}
                                onClick={() => handleSelectPlan(plan)}
                                className="min-w-[70px] font-semibold text-xs px-2 py-1"
                              >
                                Select
                              </Button>
                            </div>
                          ) : (
                            <span className="text-gray-400 text-sm">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
              </div>

              <div className="md:hidden grid gap-4">
                {filteredPlansByDuration.map((plan) => (
                  <div key={plan.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-md">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-14 rounded-lg bg-primary/10 flex items-center justify-center">
                          <span className="text-primary font-bold text-lg">{plan.data}</span>
                        </div>
                        <div>
                          <div className="font-bold text-gray-900 text-lg">{plan.data}</div>
                          <div className="text-sm text-gray-500">{plan.validity} Days</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">${plan.price.toFixed(2)}</div>
                      </div>
                    </div>
                    <Button className="w-full" onClick={() => handleSelectPlan(plan)}>
                      Select Plan
                    </Button>
                  </div>
                ))}
              </div>
            </>
          )}

        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Plans;
