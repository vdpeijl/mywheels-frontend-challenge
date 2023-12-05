"use client";

import { useCars } from "./hooks/cars";
import useFilterStore from "./store/filters";
import List from "./components/List";
import ListItemCar from "./components/ListItemCar";
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
    <div className="flex gap-12 p-12">
      <div>
        <div className="bg-white rounded-xl p-6 w-96">
          <Filters total={cars.length} />
        </div>
      </div>

      <div className="flex-1">
        <div className="bg-white rounded-xl">
          <List
            keyAttribute="resource.id"
            values={cars}
            render={(item, index) => {
              return <ListItemCar item={item.resource} index={index} />;
            }}
          />
        </div>
      </div>
    </div>
  );
}
