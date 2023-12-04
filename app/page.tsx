"use client";

import { useCars } from "./hooks/cars";

export default function Page() {
  const { data } = useCars();

  return (
    <div>
      {data.result.results.map((car) => (
        <div key={car.resource.id}>{car.resource.id}</div>
      ))}
    </div>
  );
}
