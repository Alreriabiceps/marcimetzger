export interface PropertyItem {
  id: string;
  title: string;
  location: string;
  category: 'Coastal' | 'Alpine' | 'Urban Penthouse' | 'Desert Monolith';
  price: string;
  sqft: string;
  bedrooms: number;
  bathrooms: number;
  architect: string;
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
  architect: string;
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
