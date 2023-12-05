"use client";

import { useCars } from "./hooks/cars";
import useFilterStore from "./store/filters";
import List from "./components/List";
import Card from "./components/Card";
import Filters from "./components/Filters";
import { useEffect } from "react";
import Label from "./components/Label";
import { Location } from "./components/icons";
import { format } from "./lib/currency";

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
    <div className="p-12 w-[1024px] m-auto max-w-full">
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
          render={(item) => {
            return (
              <Card className="flex flex-col">
                <h3 className="text-xl font-medium">{item.resource.brand}</h3>
                <p className="text-sm">{item.resource.model}</p>

                <p className="text-md mt-1  font-medium">
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
                  <p className="text-sm">
                    {item.availability ? "Beschikbaar" : "Niet beschikbaar"}
                  </p>
                  <p className="text-sm">
                    {item.resource.options.towbar
                      ? "Trekhaak"
                      : "Geen trekhaak"}
                  </p>

                  <p className="text-sm">
                    {item.resource.options.winterTires
                      ? "Winterbanden"
                      : "Geen winterbanden"}
                  </p>
                </div>
              </Card>
            );
          }}
        />
      </div>
    </div>
  );
}
