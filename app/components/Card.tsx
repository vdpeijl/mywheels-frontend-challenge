import cx from "classnames";

type Props = {
  className?: string;
  children?: React.ReactNode;
};

export default function Card(props: Props) {
  const { children, className } = props;

  return (
    <div
      data-test="card"
      className={cx(
        "p-8 bg-white rounded-3xl min-h-[350px] shadow-xl",
        className
      )}
    >
      {children}
    </div>
  );
}
