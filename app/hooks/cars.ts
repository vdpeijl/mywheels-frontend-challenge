"use client";

import { useQuery } from "@tanstack/react-query";
import type { Car, CarFilter } from "../types/car";
import { api } from "../lib/api";

export const useCars = (filter: CarFilter) => {
  return useQuery({
    queryKey: ["cars", filter],
    queryFn: () =>
      api<Car>({
        method: "search.map",
        params: {
          filter,
          locationPoint: {
            latitudeMax: 56,
            latitudeMin: 48,
            longitudeMax: 9,
            longitudeMin: 1,
          },
        },
      }),
  });
};
