export type Car = {
  id: string;
  alias: string;
  brand: string;
  model: string;
  fuelType: string;
  city: string;
  location: string;
  streetNumber: string;
  latitude: number;
  longitude: number;
  price: {
    id: number;
    hourRate: string;
    kilometerRate: string;
    fuelPerKilometer: string;
    dayRateTotal: string;
  };
  options: {
    automatic: boolean;
    id: number;
    towbar: boolean;
    winterTires: boolean;
  };
};

export type CarFilter = {
  onlyAvailable?: boolean;
  models?: string[];
  fuelType?: string;
  towbar?: boolean;
  winterTires?: boolean;
};
