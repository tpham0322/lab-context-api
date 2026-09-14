import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Filter } from "../types";

interface FilterContextType {
  filter: Filter;
  setFilter: (filter: Filter) => void;
}

const FilterContext = createContext<FilterContextType | undefined>(
  undefined
);

interface FilterProviderProps {
  children: ReactNode;
}

export function FilterProvider({ children }: FilterProviderProps) {
  const [filter, setFilterState] = useState<Filter>("all");

  const setFilter = useCallback((newFilter: Filter) => {
    setFilterState(newFilter);
  }, []);

  const value = useMemo(
    () => ({
      filter,
      setFilter,
    }),
    [filter, setFilter]
  );

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
}

export function useFilter() {
  const context = useContext(FilterContext);

  if (!context) {
    throw new Error("useFilter must be used inside FilterProvider");
  }

  return context;
}