export interface Plan {
  id: string;
  countryCode: string;
  name: string;
  data: string;
  validity: number;
  price: number;
  networks: string;
  isUnlimited?: boolean;
}

export const globalPlans: Plan[] = [
  // Japan Plans
  { id: "jp-1gb-7d", countryCode: "JP", name: "1 GB eSIM Data For 7 Days", data: "1GB", validity: 7, price: 1.74, networks: "KDDI, NTT Docomo" },
  { id: "jp-3gb-7d", countryCode: "JP", name: "3 GB eSIM Data For 7 Days", data: "3GB", validity: 7, price: 2.97, networks: "KDDI, NTT Docomo" },
  { id: "jp-5gb-7d", countryCode: "JP", name: "5 GB eSIM Data For 7 Days", data: "5GB", validity: 7, price: 3.7, networks: "KDDI, NTT Docomo" },
  { id: "jp-10gb-7d", countryCode: "JP", name: "10 GB eSIM Data For 7 Days", data: "10GB", validity: 7, price: 6.48, networks: "KDDI, NTT Docomo" },
  { id: "jp-20gb-7d", countryCode: "JP", name: "20 GB eSIM Data For 7 Days", data: "20GB", validity: 7, price: 11.93, networks: "KDDI, NTT Docomo" },
  { id: "jp-unl-7d", countryCode: "JP", name: "Unlimited eSIM Data For 7 Days", data: "Unlimited", validity: 7, price: 19.99, networks: "KDDI, NTT Docomo", isUnlimited: true },
  { id: "jp-10gb-15d", countryCode: "JP", name: "10 GB eSIM Data For 15 Days", data: "10GB", validity: 15, price: 7.52, networks: "KDDI, NTT Docomo" },
  { id: "jp-unl-15d", countryCode: "JP", name: "Unlimited eSIM Data For 15 Days", data: "Unlimited", validity: 15, price: 34.99, networks: "KDDI, NTT Docomo", isUnlimited: true },
  { id: "jp-20gb-30d", countryCode: "JP", name: "20 GB eSIM Data For 30 Days", data: "20GB", validity: 30, price: 14.21, networks: "KDDI, NTT Docomo" },
  { id: "jp-unl-30d", countryCode: "JP", name: "Unlimited eSIM Data For 30 Days", data: "Unlimited", validity: 30, price: 49.99, networks: "KDDI, NTT Docomo", isUnlimited: true },
  
  // USA Plans
  { id: "us-5gb-7d", countryCode: "US", name: "5 GB eSIM Data For 7 Days", data: "5GB", validity: 7, price: 4.99, networks: "AT&T, T-Mobile" },
  { id: "us-10gb-7d", countryCode: "US", name: "10 GB eSIM Data For 7 Days", data: "10GB", validity: 7, price: 8.99, networks: "AT&T, T-Mobile" },
  { id: "us-20gb-15d", countryCode: "US", name: "20 GB eSIM Data For 15 Days", data: "20GB", validity: 15, price: 15.99, networks: "AT&T, T-Mobile" },
  { id: "us-unl-7d", countryCode: "US", name: "Unlimited eSIM Data For 7 Days", data: "Unlimited", validity: 7, price: 24.99, networks: "AT&T, T-Mobile", isUnlimited: true },
  { id: "us-unl-30d", countryCode: "US", name: "Unlimited eSIM Data For 30 Days", data: "Unlimited", validity: 30, price: 59.99, networks: "AT&T, T-Mobile", isUnlimited: true },
  
  // UK Plans
  { id: "gb-5gb-7d", countryCode: "GB", name: "5 GB eSIM Data For 7 Days", data: "5GB", validity: 7, price: 4.49, networks: "EE, Vodafone" },
  { id: "gb-10gb-15d", countryCode: "GB", name: "10 GB eSIM Data For 15 Days", data: "10GB", validity: 15, price: 8.99, networks: "EE, Vodafone" },
  { id: "gb-unl-7d", countryCode: "GB", name: "Unlimited eSIM Data For 7 Days", data: "Unlimited", validity: 7, price: 19.99, networks: "EE, Vodafone", isUnlimited: true },
  { id: "gb-unl-30d", countryCode: "GB", name: "Unlimited eSIM Data For 30 Days", data: "Unlimited", validity: 30, price: 44.99, networks: "EE, Vodafone", isUnlimited: true },
  
  // Add more countries as needed
];
