import cx from "classnames";

type Props = {
  className?: string;
  children?: React.ReactNode;
  color?: "red" | "green" | "blue";
};

export default function Label(props: Props) {
  const { children, className, color = "blue" } = props;
  return (
    <div
      data-test="label"
      className={cx(
        "rounded-full text-sm inline-block px-3 py-0.5",
        {
          "bg-red-500 text-white": color === "red",
          "bg-green-500 text-white": color === "green",
          "bg-blue-500 text-white": color === "blue",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
