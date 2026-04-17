export type PropertyType = "flat" | "villa" | "plot" | "commercial";

export type PropertyCategory = "buy" | "sell" | "rent" | "invest";

export type BudgetFilter =
  | "any"
  | "under-25l"
  | "25-50l"
  | "50-75l"
  | "75l-1cr"
  | "above-1cr";

export interface Property {
  id: string;
  title: string;
  price: string;
  priceValue: number; // in lakhs
  area: number; // sqft
  areaLabel: string;
  bedrooms: number; // 0 for plots/commercial
  location: string;
  type: PropertyType;
  category: PropertyCategory;
  description: string;
  amenities: string[];
  isRecentlyAdded: boolean;
  isFeatured: boolean;
  imageUrl: string;
  badge?: string;
}

export interface FilterState {
  category: PropertyCategory | "all";
  budget: BudgetFilter;
  location: string;
  type: PropertyType | "all";
}
