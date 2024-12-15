import { useState } from 'react'

// Mantine
import { Slider } from '@mantine/core';

// Components
import ArrowComponent from '../../ArrowComponent';
import CheckboxComponent from '../../CheckboxComponent';

export default function Garden() {
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
          text="Garden Watering" />

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
        <div
          className="w-full h-auto flex flex-col items-start justify-start gap-2">
          {/* Text */}
          <p className="text-[#B7B7B7] text-lg md:text-[24px]">
            Select average amount in liters
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

    </div >
  )
}
