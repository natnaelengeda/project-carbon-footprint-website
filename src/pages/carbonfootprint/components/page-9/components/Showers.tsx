import { useState } from "react";

// Components
import ArrowComponent from "../../ArrowComponent";
import CheckboxComponent from "../../CheckboxComponent";
import { Slider } from "@mantine/core";

export default function Showers() {
  const [selected, setSelected] = useState<boolean>(false);

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
          text="Showers" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: selected ? "flex" : "none"
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
              className="w-full"
              color="#35D36A"
              size="xl"
              min={1}
              max={70}
              marks={[
                { value: 10, label: '1' },
                { value: 20, label: '2' },
                { value: 30, label: '3' },
                { value: 40, label: '4' },
                { value: 50, label: '5' },
                { value: 60, label: '6' },
                { value: 70, label: '60+' },
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  )
}
