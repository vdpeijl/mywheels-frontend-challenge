"use client";

import { useCars } from "./hooks/cars";
import useFilterStore from "./store/filters";
import List from "./components/List";
import Card from "./components/Card";
import Filters from "./components/Filters";
import { useEffect, useMemo, useState } from "react";
import Label from "./components/Label";
import { Location, Check, Cross } from "./components/icons";
import { format } from "./lib/currency";

export default function Page() {
  const [initialized, setInitialized] = useState(false);

  const filters = useFilterStore((state) => ({
    towbar: state.towbar,
    models: state.models,
    fuelType: state.fuelType,
    onlyAvailable: state.onlyAvailable,
    winterTires: state.winterTires,
  }));

  const query = useFilterStore((state) => state.query);
  const priceRange = useFilterStore((state) => state.priceRange);

  const filter = useFilterStore((state) => state.filter);
  const search = useFilterStore((state) => state.search);
  const setInitialFilterData = useFilterStore(
    (state) => state.setInitialFilterData
  );

  const { data, isLoading } = useCars(filters);

  useEffect(() => {
    if (initialized || !data) return;
    setInitialFilterData(data.result.results);
    setInitialized(true);
  }, [initialized, data]);

  const cars = useMemo(() => {
    if (!data) return [];
    const filtered = filter(data.result.results);
    const searched = search(data.result.results, query);

    const inPriceRange = searched.filter((car) => {
      const hourRate = parseFloat(car.resource.price.hourRate);
      return hourRate >= priceRange[0] && hourRate <= priceRange[1];
    });

    return inPriceRange.filter((car) => {
      return !filtered.find((item) => item.resource.id === car.resource.id);
    });
  }, [data, query, filters, priceRange]);

  return (
    <div className="p-12 w-[1024px] m-auto max-w-full">
      <div className="mb-4">
        <div className="bg-white rounded-full p-6 shadow-xl">
          <Filters />
        </div>

        <div className="text-right text-white mt-4 pr-8">
          {isLoading ? (
            <span>Bezig met zoeken...</span>
          ) : (
            <span>
              {cars.length === 0 ? "Geen" : cars.length} resultaten gevonden
            </span>
          )}
        </div>
      </div>

      <div className="flex-1">
        <List
          className="grid grid-cols-3 gap-6"
          keyAttribute="resource.id"
          values={cars}
          render={(item) => {
            return (
              <Card className="flex flex-col">
                <h3 className="text-xl font-medium">{item.resource.brand}</h3>
                <p className="text-sm">{item.resource.model}</p>

                <p data-test="price" className="text-md mt-1 font-medium">
                  {format(item.resource.price.hourRate)} per uur
                </p>

                <Label
                  className="my-4 capitalize w-fit"
                  color={
                    item.resource.fuelType === "elektrisch" ? "green" : "blue"
                  }
                >
                  {item.resource.fuelType ?? "Benzine"}
                </Label>

                {/* Address: */}
                <div className="flex items-start">
                  <div>
                    <Location className="inline-block w-6 mr-1 text-xl" />
                  </div>
                  <div>
                    <p className="text-sm mt-1">
                      <span className="font-medium">{item.resource.city}</span>,{" "}
                      {item.resource.location}
                      {item.resource.streetNumber
                        ? ` ${item.resource.streetNumber}`
                        : ""}
                    </p>
                  </div>
                </div>

                <div className="grid flex-grow content-end">
                  {/* Options: */}
                  <div className="text-sm">
                    {item.availability ? (
                      <div className="flex">
                        <Check className="text-xl text-green-500" />
                        <span>Beschikbaar</span>
                      </div>
                    ) : (
                      <div className="flex">
                        <Cross className="text-xl text-red-500" />
                        <span>Niet beschikbaar</span>
                      </div>
                    )}
                  </div>
                  <div className="text-sm">
                    {item.resource.options.towbar ? (
                      <div className="flex">
                        <Check className="text-xl text-green-500" />
                        <span>Trekhaak</span>
                      </div>
                    ) : (
                      <div className="flex">
                        <Cross className="text-xl text-red-500" />
                        <span>Geen trekhaak</span>
                      </div>
                    )}
                  </div>

                  <div className="text-sm">
                    {item.resource.options.winterTires ? (
                      <div className="flex">
                        <Check className="text-xl text-green-500" />
                        <span>Winterbanden</span>
                      </div>
                    ) : (
                      <div className="flex">
                        <Cross className="text-xl text-red-500" />
                        <span>Geen winterbanden</span>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            );
          }}
        />
      </div>
    </div>
  );
}
