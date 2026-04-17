import type { BudgetFilter, FilterState, Property } from "../types/property";

export function getBudgetRange(budget: BudgetFilter): {
  min: number;
  max: number;
} {
  switch (budget) {
    case "under-25l":
      return { min: 0, max: 25 };
    case "25-50l":
      return { min: 25, max: 50 };
    case "50-75l":
      return { min: 50, max: 75 };
    case "75l-1cr":
      return { min: 75, max: 100 };
    case "above-1cr":
      return { min: 100, max: Number.POSITIVE_INFINITY };
    default:
      return { min: 0, max: Number.POSITIVE_INFINITY };
  }
}

export function formatPrice(priceValue: number): string {
  if (priceValue >= 100) {
    const crore = priceValue / 100;
    return `₹${crore % 1 === 0 ? crore : crore.toFixed(2)} Cr`;
  }
  return `₹${priceValue} Lakh`;
}

export function filterProperties(
  properties: Property[],
  filterState: FilterState,
): Property[] {
  const { category, budget, location, type } = filterState;
  const { min, max } = getBudgetRange(budget);

  return properties.filter((p) => {
    if (category !== "all" && p.category !== category) return false;
    if (type !== "all" && p.type !== type) return false;
    if (location !== "all" && location !== "" && p.location !== location)
      return false;
    if (p.priceValue < min || p.priceValue > max) return false;
    return true;
  });
}
