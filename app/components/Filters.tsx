import useFilterStore from "../store/filters";
import Dropdown from "./Dropdown";

export default function Filters() {
  const models = useFilterStore((state) => state.models);
  const fuelType = useFilterStore((state) => state.fuelType);
  const towbar = useFilterStore((state) => state.towbar);
  const query = useFilterStore((state) => state.query);
  const onlyAvailable = useFilterStore((state) => state.onlyAvailable);
  const winterTires = useFilterStore((state) => state.winterTires);

  const availableModels = useFilterStore((state) => state.availableModels);
  const availableFuelTypes = useFilterStore(
    (state) => state.availableFuelTypes
  );

  const setQuery = useFilterStore((state) => state.setQuery);
  const setTowbar = useFilterStore((state) => state.setTowbar);
  const setModels = useFilterStore((state) => state.setModels);
  const setFuelType = useFilterStore((state) => state.setFuelType);
  const setOnlyAvailable = useFilterStore((state) => state.setOnlyAvailable);
  const setWinterTires = useFilterStore((state) => state.setWinterTires);

  function handleModelChange(model: string) {
    if (models.includes(model)) {
      setModels(models.filter((item) => item !== model));
    } else {
      setModels([...models, model]);
    }
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
            title: "Trekhaak",
            value: towbar,
            onChange: () => setTowbar(!towbar),
          },
          {
            title: "Nu beschikbaar",
            value: onlyAvailable,
            onChange: () => setOnlyAvailable(!onlyAvailable),
          },
          {
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
        values={availableModels.map((model) => ({
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
        values={availableFuelTypes.map((ft) => ({
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
    </div>
  );
}
