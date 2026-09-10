import { PropertyItem, GalleryImage, StatItem } from '../types';

export const ESTATES_DATA: PropertyItem[] = [
  {
    id: 'estate-1',
    title: 'The Solarium Cliff Residence',
    location: 'Big Sur, California',
    category: 'Coastal',
    price: '$28,500,000',
    sqft: '11,400 sq ft',
    bedrooms: 6,
    bathrooms: 8,
    architect: 'Kengo & Associates',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85',
    description: 'Cantilevered monolithic glass and raw poured titanium concrete, suspended 300 feet above the Pacific Ocean with uninterrupted horizon panoramas.',
    features: ['Infinity Ocean Pool', 'Private Funicular Access', 'Geothermal Heating', '1,200-Bottle Wine Vault']
  },
  {
    id: 'estate-2',
    title: 'The Glass Pavilion at Engadin',
    location: 'St. Moritz, Switzerland',
    category: 'Alpine',
    price: '$34,000,000',
    sqft: '14,200 sq ft',
    bedrooms: 7,
    bathrooms: 9,
    architect: 'Valerio & Studio Olgiati',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=85',
    description: 'Triple-glazed thermal structural glass walls framed with flamed Valser quartzite stone, offering direct ski-in/ski-out alpine sanctuary living.',
    features: ['Heated Heli-Pad', 'Spa & Hydrothermal Suite', 'Subterranean Car Gallery', 'Double-Height Hearth']
  },
  {
    id: 'estate-3',
    title: 'Penthouse Aurelia at 57th',
    location: 'Billionaires’ Row, Manhattan, NY',
    category: 'Urban Penthouse',
    price: '$45,000,000',
    sqft: '9,800 sq ft',
    bedrooms: 5,
    bathrooms: 6,
    architect: 'Atelier Jean Nouvel',
    year: 2025,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=85',
    description: 'Triplex sky mansion boasting 360-degree Central Park and skyline views, private internal bronze elevator, and an open-air glass loggia.',
    features: ['Private Sky Elevator', '360° Wrap Terrace', 'Chef & Butler Quarters', 'Sound-Isolated Screening Room']
  },
  {
    id: 'estate-4',
    title: 'The Obsidian Ocotillo Sanctuary',
    location: 'Paradise Valley, Arizona',
    category: 'Desert Monolith',
    price: '$21,800,000',
    sqft: '12,600 sq ft',
    bedrooms: 5,
    bathrooms: 7,
    architect: 'Rick Joy Design Guild',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=85',
    description: 'Rammed earth structures harmoniously sculpted into Camelback Mountain terrain, celebrating dramatic desert light, reflection pools, and desert tranquility.',
    features: ['Rammed Earth Monoliths', 'Reflecting Courtyard Pool', 'Astronomy Observatory Deck', 'Passive Solar Cooling']
  },
  {
    id: 'estate-5',
    title: 'Villa Mare Tranquillitas',
    location: 'Cap d’Antibes, French Riviera',
    category: 'Coastal',
    price: '$39,500,000',
    sqft: '13,800 sq ft',
    bedrooms: 8,
    bathrooms: 10,
    architect: 'Norm Architects Copenhagen',
    year: 2023,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=1200&auto=format&fit=crop&q=85',
    description: 'Minimalist Mediterranean purity with sun-bleached travertine colognes, century-old olive groves, and a private dock on the azure Mediterranean sea.',
    features: ['Private Deep-Water Pier', 'Olympic Length Lap Pool', 'Guest Villa Compound', 'Organic Olive Orchard']
  },
  {
    id: 'estate-6',
    title: 'The Kyōto Pavilion Estate',
    location: 'Higashiyama, Kyoto, Japan',
    category: 'Alpine',
    price: '$24,200,000',
    sqft: '8,900 sq ft',
    bedrooms: 4,
    bathrooms: 5,
    architect: 'Shigeru Ban Associates',
    year: 2024,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&auto=format&fit=crop&q=85',
    description: 'Modern interpretation of traditional Sukiya-zukuri joinery integrated with carbon-fiber reinforced hinoki timber and private moss rock gardens.',
    features: ['Onsen Thermal Springs', 'Heritage Tea House', 'Centuries-Old Bonsai Court', 'Smart Acoustic Glazing']
  }
];

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'gal-1',
    title: 'Cantilevered Glass Terrace Over Big Sur',
    subtitle: 'The Solarium Cliff Residence',
    category: 'Exterior Architecture',
    location: 'Big Sur, California',
    architect: 'Kengo & Associates',
    year: '2024',
    thumbUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=2400&auto=format&fit=crop&q=95',
    aspectRatio: '16/10',
    caption: 'Frameless 14-foot floor-to-ceiling glass sliding doors opening to the 300-foot drop above the Pacific surf.',
    spanClass: 'col-span-12 lg:col-span-8'
  },
  {
    id: 'gal-2',
    title: 'Monolithic Titanium Quartz Lounge',
    subtitle: 'Interior Atrium & Hearth',
    category: 'Interior Design',
    location: 'Engadin, Switzerland',
    architect: 'Valerio & Studio Olgiati',
    year: '2023',
    thumbUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&auto=format&fit=crop&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=2400&auto=format&fit=crop&q=95',
    aspectRatio: '4/5',
    caption: 'Sunken living lounge finished in flamed Swiss quartzite with custom wool bouclé banquettes.',
    spanClass: 'col-span-12 sm:col-span-6 lg:col-span-4'
  },
  {
    id: 'gal-3',
    title: 'Billionaires’ Row Skylight Salon',
    subtitle: 'Penthouse Aurelia Double-Height Salon',
    category: 'Urban Architecture',
    location: 'Manhattan, New York',
    architect: 'Atelier Jean Nouvel',
    year: '2025',
    thumbUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&auto=format&fit=crop&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=2400&auto=format&fit=crop&q=95',
    aspectRatio: '1/1',
    caption: 'Custom bronze-clad floating staircase suspended against illuminated fluted glass panels.',
    spanClass: 'col-span-12 sm:col-span-6 lg:col-span-4'
  },
  {
    id: 'gal-4',
    title: 'Minimalist Travertine Water Court',
    subtitle: 'Villa Mare Tranquillitas Reflections',
    category: 'Landscape Architecture',
    location: 'Cap d’Antibes, France',
    architect: 'Norm Architects',
    year: '2023',
    thumbUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&auto=format&fit=crop&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=2400&auto=format&fit=crop&q=95',
    aspectRatio: '4/3',
    caption: 'Seamless edge infinity pool blending with the Mediterranean horizon during golden hour.',
    spanClass: 'col-span-12 sm:col-span-6 lg:col-span-4'
  },
  {
    id: 'gal-5',
    title: 'Desert Rammed Earth Colonnade',
    subtitle: 'The Obsidian Ocotillo Shadow Play',
    category: 'Monolithic Structure',
    location: 'Paradise Valley, Arizona',
    architect: 'Rick Joy Design Guild',
    year: '2024',
    thumbUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=2400&auto=format&fit=crop&q=95',
    aspectRatio: '16/10',
    caption: 'Sculpted deep shadow reveals framing native saguaros and sunset amber gradients.',
    spanClass: 'col-span-12 sm:col-span-6 lg:col-span-4'
  },
  {
    id: 'gal-6',
    title: 'Primary Sanctuary Suite & Hinoki Bath',
    subtitle: 'Kyōto Pavilion Forest View',
    category: 'Interior Design',
    location: 'Higashiyama, Kyoto',
    architect: 'Shigeru Ban Associates',
    year: '2024',
    thumbUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=2400&auto=format&fit=crop&q=95',
    aspectRatio: '16/9',
    caption: 'Private onsen tub sculpted from a single block of black granite overlooking maple trees.',
    spanClass: 'col-span-12 lg:col-span-6'
  },
  {
    id: 'gal-7',
    title: 'Subterranean Collector Gallery & Vault',
    subtitle: 'Engadin Alpine Motor Court',
    category: 'Engineering & Gallery',
    location: 'St. Moritz, Switzerland',
    architect: 'Valerio & Studio Olgiati',
    year: '2023',
    thumbUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&auto=format&fit=crop&q=80',
    highResUrl: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=2400&auto=format&fit=crop&q=95',
    aspectRatio: '16/9',
    caption: 'Temperature-stabilized museum gallery with recessed architectural light wells.',
    spanClass: 'col-span-12 lg:col-span-6'
  }
];

export const STATS_DATA: StatItem[] = [
  {
    id: 'stat-portfolio',
    targetValue: 2.8,
    prefix: '$',
    suffix: 'B+',
    decimals: 1,
    label: 'Private Portfolio Volume',
    description: 'Exclusive off-market estates curated globally across 9 territories.'
  },
  {
    id: 'stat-estates',
    targetValue: 34,
    suffix: '',
    decimals: 0,
    label: 'Landmark Sanctuaries',
    description: 'Pritzker-laureate commissioned estates in our active collection.'
  },
  {
    id: 'stat-discretion',
    targetValue: 99.8,
    suffix: '%',
    decimals: 1,
    label: 'Off-Market Discretion',
    description: 'Privately transacted with non-disclosure fiduciary standards.'
  },
  {
    id: 'stat-ateliers',
    targetValue: 12,
    suffix: '',
    decimals: 0,
    label: 'Global Architecture Ateliers',
    description: 'Bespoke advisory presences in Zurich, Tokyo, New York, and London.'
  }
];
