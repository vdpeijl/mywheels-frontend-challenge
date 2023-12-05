"use client";

import { useCars } from "./hooks/cars";
import useFilterStore from "./store/filters";

export default function Page() {
  const towbar = useFilterStore((state) => state.towbar);
  const setTowbar = useFilterStore((state) => state.setTowbar);
  const { data, error } = useCars({ towbar });

  if (!data.result || error) {
    return <div>Something went wrong!</div>;
  }

  return (
    <div className="flex gap-12 p-12">
      <div>
        <div className="bg-white rounded-xl p-6 w-96">
          <label data-test="filter-towbar">
            <h1>Trekhaak?</h1>
            <input
              type="checkbox"
              checked={towbar}
              onChange={() => setTowbar(!towbar)}
            />
          </label>
        </div>
      </div>

      <div className="bg-white rounded-xl flex-1">
        {data.result.results.map((car) => (
          <div key={car.resource.id} className="py-2 px-6">
            <div className="car">
              {car.resource.brand} {car.resource.model}{" "}
              {car.resource.options.towbar && "trekhaak"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
