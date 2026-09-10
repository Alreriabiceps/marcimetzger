export interface PropertyItem {
  id: string;
  title: string;
  location: string;
  category: 'Residential' | 'Luxury' | 'Investment' | 'Land';
  price: string;
  sqft: string;
  bedrooms: number;
  bathrooms: number;
  agent: string;
  year: number;
  image: string;
  description: string;
  features: string[];
}

export interface GalleryImage {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  location: string;
  photographer: string;
  year: string;
  thumbUrl: string;
  highResUrl: string;
  aspectRatio: string;
  caption: string;
  spanClass?: string;
}

export interface StatItem {
  id: string;
  targetValue: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
  description: string;
}
