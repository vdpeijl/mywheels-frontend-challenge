"use client";

import { format } from "../lib/currency";
import useFilterStore from "../store/filters";
import Dropdown from "./Dropdown";
import Slider from "./Slider";

export default function Filters() {
  const models = useFilterStore((state) => state.models);
  const fuelType = useFilterStore((state) => state.fuelType);
  const towbar = useFilterStore((state) => state.towbar);
  const query = useFilterStore((state) => state.query);
  const onlyAvailable = useFilterStore((state) => state.onlyAvailable);
  const winterTires = useFilterStore((state) => state.winterTires);
  const priceRange = useFilterStore((state) => state.priceRange);

  const availableRates = useFilterStore((state) => state.availableRates);
  const availableModels = useFilterStore((state) => state.availableModels);
  const availableFuelTypes = useFilterStore(
    (state) => state.availableFuelTypes
  );

  const marks = availableRates.reduce((acc, item) => {
    acc[item] = format(item);
    return acc;
  }, {});

  const setQuery = useFilterStore((state) => state.setQuery);
  const setTowbar = useFilterStore((state) => state.setTowbar);
  const setModels = useFilterStore((state) => state.setModels);
  const setFuelType = useFilterStore((state) => state.setFuelType);
  const setOnlyAvailable = useFilterStore((state) => state.setOnlyAvailable);
  const setWinterTires = useFilterStore((state) => state.setWinterTires);
  const setPriceRange = useFilterStore((state) => state.setPriceRange);

  function handleModelChange(model: string) {
    if (models.includes(model)) {
      setModels(models.filter((item) => item !== model));
    } else {
      setModels([...models, model]);
    }
  }

  function resetFilters() {
    setQuery("");
    setTowbar(false);
    setModels([]);
    setFuelType(null);
    setOnlyAvailable(false);
    setWinterTires(false);
    setPriceRange([
      availableRates[0],
      availableRates[availableRates.length - 1],
    ]);
  }

  return (
    <div className="flex gap-4">
      <div>
        <input
          data-test="search"
          placeholder="Zoek op merk of model"
          className="rounded-full border text-sm px-4 py-[2px] w-[300px]"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <Dropdown
        title="Opties"
        values={[
          {
            id: 1,
            title: "Trekhaak",
            value: towbar,
            onChange: () => setTowbar(!towbar),
          },
          {
            id: 2,
            title: "Nu beschikbaar",
            value: onlyAvailable,
            onChange: () => setOnlyAvailable(!onlyAvailable),
          },
          {
            id: 3,
            title: "Winterbanden",
            value: winterTires,
            onChange: () => setWinterTires(!winterTires),
          },
        ]}
        render={(item, index) => {
          return (
            <label
              key={index}
              className="flex flex-row gap-2 py-2 px-3 min-w-[200px] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={item.value}
                onChange={() => item.onChange()}
              />
              <span className="text-sm">{item.title}</span>
            </label>
          );
        }}
      />

      <Dropdown
        title="Modellen"
        values={availableModels.map((model, index) => ({
          id: index,
          title: model,
          value: models.includes(model),
          onChange: () => handleModelChange(model),
        }))}
        render={(item, index) => {
          return (
            <label
              key={index}
              className="flex flex-row gap-2 py-2 px-3 min-w-[200px] cursor-pointer"
            >
              <input
                type="checkbox"
                checked={item.value}
                onChange={() => item.onChange()}
              />
              <span className="text-sm">{item.title}</span>
            </label>
          );
        }}
      />

      <Dropdown
        title="Brandstof"
        values={availableFuelTypes.map((ft, index) => ({
          id: index,
          title: ft,
          value: fuelType === ft,
          onChange: () => setFuelType(ft),
        }))}
        render={(item, index) => {
          return (
            <label
              key={index}
              className="flex flex-row gap-2 py-2 px-3 min-w-[200px] cursor-pointer"
            >
              <input
                type="radio"
                checked={item.value}
                onChange={() => item.onChange()}
              />
              <span className="text-sm capitalize">{item.title}</span>
            </label>
          );
        }}
      />

      <Dropdown
        title="Prijs"
        values={[
          {
            id: 1,
            min: 0,
            max: 100,
          },
        ]}
        render={() => {
          return (
            <div className="py-2 px-6 min-w-[250px]">
              <Slider
                value={priceRange}
                min={availableRates[0]}
                max={availableRates[availableRates.length - 1]}
                marks={marks}
                onChange={setPriceRange}
              />
            </div>
          );
        }}
      />

      <div className="flex grow items-center justify-end">
        <span
          className="text-xs hover:underline cursor-pointer"
          onClick={() => resetFilters()}
        >
          Herstel filters
        </span>
      </div>
    </div>
  );
}
