import { useState } from "react";
import get from "lodash.get";
import { useOutsideClick } from "../hooks/event";
import { Caret } from "./icons";

type Props<T> = {
  values: T[];
  render: (item: T, index: number) => React.ReactNode;
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
        className="rounded-full border px-4 py-0.5 flex items-center gap-1 select-none"
      >
        <span className="text-sm">{title}</span>
        <Caret className={open ? "text-xs" : "text-xs rotate-180"} />
      </div>

      {open && (
        <div
          data-test="dropdown-content"
          className="absolute bg-white rounded-xl shadow-xl top-9 border border-zinc-100"
        >
          {values.map((item, index) => (
            <div key={get(item, keyAttribute)}>{render(item, index)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
