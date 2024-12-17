import { useEffect, useState } from 'react';

// Mantine
import { Slider } from '@mantine/core';

// State
import { useDispatch } from 'react-redux';
import { addHouseholdEnergy, deleteHouseholdEnergy } from '@/state/carbon';

// Components
import CheckboxComponent from '../../CheckboxComponent'
import ArrowComponent from '../../ArrowComponent';


export default function ElectricAppliances() {
  const [selected, setSelected] = useState<boolean>(false);

  const dispatch = useDispatch();

  useEffect(() => {
    if (selected == true) {
      dispatch(
        addHouseholdEnergy({
          id: 3,
          name: "electric-appliances",
          selected: true,
          value: 1
        })
      )
    } else {
      dispatch(
        deleteHouseholdEnergy({ id: 3 })
      )
    }
  }, [selected]);

  return (
    <div
      className='w-full h-auto flex flex-col items-start justify-start'>
      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-row items-center justify-between'>

        {/* Check Box */}
        <CheckboxComponent
          selected={selected}
          setSelected={setSelected}
          text="Electric Appliances" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>


      {/* Bottom Content */}
      <div
        style={{
          display: selected ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pt-3 pl-5 md:pl-16 gap-8 md:gap-16'>

        <div
          className="w-full h-auto flex flex-col items-start justify-start gap-2">
          {/* Text */}
          <p className="text-[#B7B7B7] text-lg md:text-[24px]">
            Select Average Usage in kilowatt-hours / Per Month

          </p>
          <Slider
            className="w-full"
            color="#35D36A"
            size="xl"
            min={1}
            max={1400}
            marks={[
              { value: 500, label: '500' },
              { value: 600, label: '600' },
              { value: 700, label: '700' },
              { value: 800, label: '800' },
              { value: 900, label: '900' },
              { value: 1000, label: '1000' },
              { value: 1100, label: '1100' },
              { value: 1200, label: '1200' },
              { value: 1300, label: '1300' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
