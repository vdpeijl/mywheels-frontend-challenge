import get from "lodash.get";

type Props<T> = {
  values: T[];
  render: (item: T, index: number) => JSX.Element;
  /** @param string Used to define a key. Uses path resolution from Lodash's 'get' function. */
  keyAttribute?: string;
};

export default function List<T>(props: Props<T>) {
  const { values, render, keyAttribute = "id" } = props;

  return (
    <div>
      {values.map((item, index) => (
        <div key={get(item, keyAttribute)}>{render(item, index)}</div>
      ))}
    </div>
  );
}
