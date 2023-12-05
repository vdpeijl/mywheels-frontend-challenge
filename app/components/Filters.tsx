import useFilterStore from "../store/filters";

type Props = {
  total: number;
};

export default function Filters(props: Props) {
  const { total } = props;
  const towbar = useFilterStore((state) => state.towbar);
  const query = useFilterStore((state) => state.query);

  const setQuery = useFilterStore((state) => state.setQuery);
  const setTowbar = useFilterStore((state) => state.setTowbar);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />

      <label data-test="filter-towbar">
        <h1>total: {total}</h1>
        <h1>Trekhaak?</h1>
        <input
          type="checkbox"
          checked={towbar}
          onChange={() => setTowbar(!towbar)}
        />
      </label>
    </div>
  );
}
