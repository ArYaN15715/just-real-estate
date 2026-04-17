import { createContext, useCallback, useContext, useState } from "react";
import type { Property } from "../types/property";

interface ComparisonContextValue {
  comparisonList: Property[];
  addToComparison: (property: Property) => void;
  removeFromComparison: (id: string) => void;
  clearComparison: () => void;
  isInComparison: (id: string) => boolean;
}

const ComparisonContext = createContext<ComparisonContextValue | null>(null);

export function ComparisonProvider({
  children,
}: { children: React.ReactNode }) {
  const [comparisonList, setComparisonList] = useState<Property[]>([]);

  const addToComparison = useCallback((property: Property) => {
    setComparisonList((prev) => {
      if (prev.length >= 3) return prev;
      if (prev.find((p) => p.id === property.id)) return prev;
      return [...prev, property];
    });
  }, []);

  const removeFromComparison = useCallback((id: string) => {
    setComparisonList((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const clearComparison = useCallback(() => {
    setComparisonList([]);
  }, []);

  const isInComparison = useCallback(
    (id: string) => comparisonList.some((p) => p.id === id),
    [comparisonList],
  );

  return (
    <ComparisonContext.Provider
      value={{
        comparisonList,
        addToComparison,
        removeFromComparison,
        clearComparison,
        isInComparison,
      }}
    >
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const ctx = useContext(ComparisonContext);
  if (!ctx)
    throw new Error("useComparison must be used within ComparisonProvider");
  return ctx;
}
