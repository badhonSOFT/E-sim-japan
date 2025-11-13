export interface Country {
  code: string;
  name: string;
  flag: string;
  region: string;
  networks: string[];
}

export const countries: Country[] = [
  { code: "JP", name: "Japan", flag: "🇯🇵", region: "Asia", networks: ["KDDI", "NTT Docomo", "SoftBank"] },
  { code: "US", name: "United States", flag: "🇺🇸", region: "North America", networks: ["AT&T", "T-Mobile", "Verizon"] },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧", region: "Europe", networks: ["EE", "Vodafone", "O2"] },
  { code: "FR", name: "France", flag: "🇫🇷", region: "Europe", networks: ["Orange", "SFR", "Bouygues"] },
  { code: "DE", name: "Germany", flag: "🇩🇪", region: "Europe", networks: ["Deutsche Telekom", "Vodafone", "O2"] },
  { code: "IT", name: "Italy", flag: "🇮🇹", region: "Europe", networks: ["TIM", "Vodafone", "Wind Tre"] },
  { code: "ES", name: "Spain", flag: "🇪🇸", region: "Europe", networks: ["Movistar", "Vodafone", "Orange"] },
  { code: "AU", name: "Australia", flag: "🇦🇺", region: "Oceania", networks: ["Telstra", "Optus", "Vodafone"] },
  { code: "CA", name: "Canada", flag: "🇨🇦", region: "North America", networks: ["Rogers", "Bell", "Telus"] },
  { code: "KR", name: "South Korea", flag: "🇰🇷", region: "Asia", networks: ["SK Telecom", "KT", "LG U+"] },
  { code: "SG", name: "Singapore", flag: "🇸🇬", region: "Asia", networks: ["Singtel", "StarHub", "M1"] },
  { code: "TH", name: "Thailand", flag: "🇹🇭", region: "Asia", networks: ["AIS", "TrueMove", "dtac"] },
  { code: "AE", name: "UAE", flag: "🇦🇪", region: "Middle East", networks: ["Etisalat", "du"] },
  { code: "TR", name: "Turkey", flag: "🇹🇷", region: "Europe", networks: ["Turkcell", "Vodafone", "Turk Telekom"] },
  { code: "MX", name: "Mexico", flag: "🇲🇽", region: "North America", networks: ["Telcel", "AT&T", "Movistar"] },
];

export const regions = ["All", "Asia", "Europe", "North America", "Oceania", "Middle East"];
