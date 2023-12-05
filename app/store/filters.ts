import { create } from "zustand";
import { Resource } from "../types/data";
import { Car } from "../types/car";

interface FilterState {
  availableFuelTypes: string[];
  availableModels: string[];
  query: string;
  towbar: boolean;
  models: string[];
  fuelType: string;
  onlyAvailable: boolean;
  winterTires: boolean;

  setTowbar: (towbar: boolean) => void;
  setQuery: (query: string) => void;
  setModels: (models: string[]) => void;
  setFuelType: (fuelType: string) => void;
  setOnlyAvailable: (onlyAvailable: boolean) => void;
  setWinterTires: (winterTires: boolean) => void;

  filter: (resources: Resource<Car>[]) => Resource<Car>[];
  search: (resources: Resource<Car>[], query: string) => Resource<Car>[];
  setInitialFilterData: (resources: Resource<Car>[]) => void;
}

const useFilterStore = create<FilterState>()((set, get) => ({
  availableFuelTypes: [],
  availableModels: [],

  query: "",
  towbar: false,
  models: [],
  fuelType: null,
  onlyAvailable: false,
  winterTires: false,

  setTowbar: (towbar) => set({ towbar }),
  setQuery: (query) => set({ query }),
  setModels: (models) => set({ models }),
  setFuelType: (fuelType) => set({ fuelType }),
  setOnlyAvailable: (onlyAvailable) => set({ onlyAvailable }),
  setWinterTires: (winterTires) => set({ winterTires }),

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

  /** Set initial filter data */
  setInitialFilterData: (resources) => {
    const models = resources
      .map(({ resource }) => resource.model)
      .filter((m) => m !== null);
    const fuelTypes = resources
      .map(({ resource }) => resource.fuelType)
      .filter((m) => m !== null);

    const uniqueModels = [...new Set(models)];
    const uniqueFuelTypes = [...new Set(fuelTypes)];

    set({ availableModels: uniqueModels, availableFuelTypes: uniqueFuelTypes });
  },
}));

export default useFilterStore;
