import useFilterStore from "../store/filters";

type Props = {
  total: number;
};

export default function Filters(props: Props) {
  const { total } = props;
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
    <div>
      <h1>total: {total}</h1>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />

      <label data-test="filter-towbar">
        <h1>Trekhaak?</h1>
        <input
          type="checkbox"
          checked={towbar}
          onChange={() => setTowbar(!towbar)}
        />
      </label>

      <label data-test="filter-available">
        <h1>Beschikbaar?</h1>
        <input
          type="checkbox"
          checked={onlyAvailable}
          onChange={() => setOnlyAvailable(!onlyAvailable)}
        />
      </label>

      <label data-test="filter-available">
        <h1>Winterbanden?</h1>
        <input
          type="checkbox"
          checked={winterTires}
          onChange={() => setWinterTires(!winterTires)}
        />
      </label>

      <h1>Models</h1>
      {availableModels.map((model) => (
        <label key={model} className="flex flex-row">
          <input
            type="checkbox"
            checked={models.includes(model)}
            onChange={() => handleModelChange(model)}
          />
          {model}
        </label>
      ))}

      <h1>FuelType</h1>
      {availableFuelTypes.map((ft) => (
        <label key={ft} className="flex flex-row">
          <input
            type="radio"
            checked={fuelType === ft}
            onChange={() => setFuelType(ft)}
          />
          {ft}
        </label>
      ))}
    </div>
  );
}
