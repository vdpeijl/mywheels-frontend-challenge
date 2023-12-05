import { create } from "zustand";
import { Resource } from "../types/data";
import { Car } from "../types/car";

interface FilterState {
  query: string;
  towbar: boolean;
  setTowbar: (towbar: boolean) => void;
  setQuery: (query: string) => void;
  filter: (resources: Resource<Car>[]) => Resource<Car>[];
  search: (resources: Resource<Car>[], query: string) => Resource<Car>[];
}

const useFilterStore = create<FilterState>()((set, get) => ({
  query: "",
  towbar: false,
  setTowbar: (towbar) => set({ towbar }),
  setQuery: (query) => set({ query }),

  /** Client side filters */
  filter: (resources) => {
    return resources.filter(({ resource }) => {
      return resource.brand === null;
    });
  },

  /** Client side search */
  search: (resources, query) => {
    return resources.filter(({ resource }) => {
      if (query === "") return true;
      const isQuery = resource.brand
        ?.toLowerCase()
        .includes(query.toLowerCase());
      return isQuery;
    });
  },
}));

export default useFilterStore;
