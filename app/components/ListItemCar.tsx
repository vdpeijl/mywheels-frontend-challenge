import { Car } from "../types/car";

type Props = {
  item: Car;
  index: number;
};

export default function ListItemCar(props: Props) {
  const { item, index } = props;

  return (
    <div className="p-4">
      {item.brand} {item.model}
    </div>
  );
}
