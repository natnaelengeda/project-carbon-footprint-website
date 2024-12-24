import { useEffect, useState } from "react";

// Mantine
import { Slider } from "@mantine/core";

// State
import { useDispatch } from "react-redux";
import { addWaterUsage, deleteWaterUsage } from "@/state/pledge";

// Components
import CheckboxComponent from "@/pages/carbonfootprint/components/CheckboxComponent";
import ArrowComponent from "@/pages/carbonfootprint/components/ArrowComponent";


// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}
export default function Showers({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [slider, setSlider] = useState<number>(1);
  const [slider1, setSlider1] = useState<number>(1);

  const dispatch = useDispatch();

  const updateSlider = (value: number) => {
    setSlider(value);
    dispatch(
      addWaterUsage({
        id: 2,
        name: "showers",
        value: value,
        frequency: slider1
      }))
  }

  const updateSlider1 = (value: number) => {
    setSlider1(value);
    dispatch(
      addWaterUsage({
        id: 2,
        name: "showers",
        value: slider,
        frequency: value,
      }))
  }

  useEffect(() => {
    if (selected) {
      dispatch(
        addWaterUsage({
          id: 2,
          name: "showers",
          value: 1,
        }))
    } else {
      dispatch(
        deleteWaterUsage({
          id: 2
        })
      )
    }
  }, [selected]);

  return (
    <div
      className='w-full h-auto flex flex-col items-start justify-start gap-5'>
      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        {/* Check Box */}
        <CheckboxComponent
          selected={selected}
          setSelected={setSelected}
          setOpened={setOpened}
          location="showers"
          text="Showers" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: opened == "showers" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5'>

        {/* Form */}
        <div
          className='w-full h-auto flex flex-col items-start justify-start gap-5 pr-5'>

          {/* Frequency */}
          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-2">
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px]">
              Select days frequency per week
            </p>
            <Slider
              value={slider}
              onChange={updateSlider}
              className="w-full"
              color="#35D36A"
              size="xl"
              min={1}
              max={7}
              marks={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
              ]}
            />
          </div>

          {/* Duration */}
          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-2">
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px]">
              Select average duration in minutes
            </p>
            <Slider
              value={slider1}
              onChange={updateSlider1}
              className="w-full"
              color="#35D36A"
              size="xl"
              min={1}
              max={70}
              marks={[
                { value: 10, label: '10' },
                { value: 20, label: '20' },
                { value: 30, label: '30' },
                { value: 40, label: '40' },
                { value: 50, label: '50' },
                { value: 60, label: '60' },
                { value: 70, label: '60+' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}