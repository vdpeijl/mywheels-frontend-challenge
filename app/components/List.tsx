import get from "lodash.get";

type Props<T> = {
  className?: string;
  values: T[];
  render: (item: T, index: number, keyAttributeValue: any) => JSX.Element;
  /** @param string Used to define a key. Uses path resolution from Lodash's 'get' function. */
  keyAttribute?: string;
};

export default function List<T>(props: Props<T>) {
  const { className, values, render, keyAttribute = "id" } = props;

  return (
    <div className={className} data-test="list">
      {values.map((item, index) => (
        <div key={get(item, keyAttribute)} data-test="list-item">
          {render(item, index, get(item, keyAttribute))}
        </div>
      ))}
    </div>
  );
}
