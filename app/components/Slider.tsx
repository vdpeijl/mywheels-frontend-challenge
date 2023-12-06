import RCSlider from "rc-slider";
import "rc-slider/assets/index.css";

type Props = {
  value: [number, number];
  min: number;
  max: number;
  marks?: {
    [key: number]: any;
  };
  onChange: (value: number[]) => void;
};

export default function Slider(props: Props) {
  const { onChange, marks, min, max, value } = props;

  const onSliderChange = (value: number[]) => {
    onChange(value);
  };

  return (
    <div className="min-h-[30px]">
      <RCSlider
        range
        step={null}
        marks={marks}
        defaultValue={[value[0], value[1]]}
        min={min}
        max={max}
        onChange={onSliderChange}
      />
    </div>
  );
}
