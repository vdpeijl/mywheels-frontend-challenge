import { useState } from "react";
import get from "lodash.get";
import { useOutsideClick } from "../hooks/event";

type Props<T> = {
  values: T[];
  render: (item: T, index: number) => JSX.Element;
  /** @param string Used to define a key. Uses path resolution from Lodash's 'get' function. */
  keyAttribute?: string;
  title: string;
};

export default function Dropdown<T>(props: Props<T>) {
  const [open, setOpen] = useState(false);
  const { values, render, keyAttribute = "id", title } = props;
  const ref = useOutsideClick(() => setOpen(false));

  return (
    <div ref={ref} className="relative cursor-pointer">
      <div
        data-test="dropdown-trigger"
        onClick={() => setOpen(!open)}
        className="rounded-full border px-4"
      >
        <span className="text-sm">{title}</span>
      </div>

      {open && (
        <div
          data-test="dropdown-content"
          className="absolute bg-white rounded-xl shadow-xl"
        >
          {values.map((item, index) => (
            <div key={get(item, keyAttribute)}>{render(item, index)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
