import RCSlider from "rc-slider";
import "rc-slider/assets/index.css";

type Props = {
  min: number;
  max: number;
  marks?: {
    [key: number]: any;
  };
  onChange: (value: number[]) => void;
};

export default function Slider(props: Props) {
  const { onChange, marks, min, max } = props;

  const onSliderChange = (value: number[]) => {
    onChange(value);
  };

  return (
    <div className="min-h-[30px]">
      <RCSlider
        range
        step={null}
        marks={marks}
        defaultValue={[min, max]}
        min={min}
        max={max}
        onChange={onSliderChange}
      />
    </div>
  );
}
