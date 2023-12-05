"use client";

import { useCars } from "./hooks/cars";
import useFilterStore from "./store/filters";
import List from "./components/List";
import Card from "./components/Card";
import Filters from "./components/Filters";
import { useEffect } from "react";

export default function Page() {
  const query = useFilterStore((state) => state.query);
  const towbar = useFilterStore((state) => state.towbar);
  const models = useFilterStore((state) => state.models);
  const fuelType = useFilterStore((state) => state.fuelType);
  const onlyAvailable = useFilterStore((state) => state.onlyAvailable);
  const winterTires = useFilterStore((state) => state.winterTires);

  const filter = useFilterStore((state) => state.filter);
  const search = useFilterStore((state) => state.search);
  const setInitialFilterData = useFilterStore(
    (state) => state.setInitialFilterData
  );

  const { data } = useCars({
    towbar,
    models,
    fuelType,
    onlyAvailable,
    winterTires,
  });

  useEffect(() => {
    setInitialFilterData(data.result.results);
  }, []);

  const filtered = filter(data.result.results);
  const searched = search(data.result.results, query);
  const cars = searched.filter((car) => {
    return !filtered.find((item) => item.resource.id === car.resource.id);
  });

  return (
    <div className="p-12 w-[1024px] m-auto">
      <div className="mb-4">
        <div className="bg-white rounded-full p-6 shadow-xl">
          <Filters />
        </div>

        <div className="text-right text-white mt-4 pr-8">
          <span>
            {cars.length === 0 ? "Geen" : cars.length} resultaten gevonden
          </span>
        </div>
      </div>

      <div className="flex-1">
        <List
          className="grid grid-cols-3 gap-6"
          keyAttribute="resource.id"
          values={cars}
          render={(item, index) => {
            return (
              <Card>
                <h3 className="text-xl font-medium">{item.resource.brand}</h3>
                <p className="text-sm">{item.resource.model}</p>
                <p className="text-sm">{item.resource.fuelType}</p>

                {/* Address: */}
                <p className="text-sm">
                  {item.resource.location}
                  {item.resource.streetNumber
                    ? ` ${item.resource.streetNumber}`
                    : ""}
                  , {item.resource.city}
                </p>

                {/* Options: */}

                <p className="text-sm">
                  {item.availability ? "Beschikbaar" : "Niet beschikbaar"}
                </p>
                <p className="text-sm">
                  {item.resource.options.towbar ? "Trekhaak" : "Geen trekhaak"}
                </p>

                <p className="text-sm">
                  {item.resource.options.winterTires
                    ? "Winterbanden"
                    : "Geen winterbanden"}
                </p>
              </Card>
            );
          }}
        />
      </div>
    </div>
  );
}
