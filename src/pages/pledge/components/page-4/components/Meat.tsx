import { useEffect, useState } from "react";

// Mantine
import { Slider } from "@mantine/core";

// State
import { useDispatch } from "react-redux";
import { addDiet, deleteDiet } from "@/state/pledge";

// Components
import CheckboxComponent from "@/pages/carbonfootprint/components/CheckboxComponent";
import ArrowComponent from "@/pages/carbonfootprint/components/ArrowComponent";

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function Meat({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  const [slider, setSlider] = useState<number>(1);

  const dispatch = useDispatch();

  const updateSlider = (value: number) => {
    setSlider(value);
    dispatch(
      addDiet({
        id: 3,
        name: "meat",
        selected: true,
        value: value,
      }));
  }

  useEffect(() => {
    if (selected) {
      dispatch(
        addDiet({
          id: 3,
          name: "meat",
          selected: true,
          value: 1,
        })
      )
    } else {
      dispatch(
        deleteDiet({
          id: 3
        })
      )
    }
  }, [selected]);


  return (
    <div
      className='w-full h-auto flex flex-col items-start justify-start gap-3'>
      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        {/* Check Box */}
        <CheckboxComponent
          selected={selected}
          setSelected={setSelected}
          setOpened={setOpened}
          location="meat"
          text="Meat" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: opened == "meat" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5'>

        {/* Form */}
        <div
          className='w-full h-auto flex flex-col items-start justify-start gap-5 pr-5'>
          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-2">
            {/* Text */}
            <p
              className="text-[#B7B7B7] text-lg md:text-[24px]">
              Select days usage per week
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
        </div>
      </div>

    </div>
  )
}
