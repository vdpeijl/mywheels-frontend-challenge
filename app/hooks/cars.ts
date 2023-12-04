"use client";

import { useSuspenseQuery } from "@tanstack/react-query";
import type { Car } from "../types/car";
import { api } from "../lib/api";

export const useCars = () =>
  useSuspenseQuery({
    queryKey: ["cars"],
    queryFn: () =>
      api<Car>({
        method: "search.map",
        params: {
          filter: {
            // onlyAvailable: false,
            // models: ["Corsa"],
            // fuelType: "benzine",
            // towbar: true,
            // winterTires: true,
          },
          locationPoint: {
            latitudeMax: 56,
            latitudeMin: 48,
            longitudeMax: 9,
            longitudeMin: 1,
          },
        },
      }),
  });
