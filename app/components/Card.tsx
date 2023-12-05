type Props = {
  children?: React.ReactNode;
};

export default function Card(props: Props) {
  const { children } = props;

  return (
    <div className="p-4 bg-white rounded-xl min-h-[300px] shadow-xl">
      <div>{children}</div>
    </div>
  );
}
