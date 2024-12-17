import { useEffect, useState } from 'react';

// Mantine
import { Slider } from '@mantine/core';

// State
import { useDispatch, useSelector } from 'react-redux';
import { addHouseholdEnergy, CarbonState, deleteHouseholdEnergy, selectHouseholdEnergyById } from '@/state/carbon';

// Components
import CheckboxComponent from '../../CheckboxComponent'
import ArrowComponent from '../../ArrowComponent';

export default function LightBulbs() {
  const [selected, setSelected] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const dispatch = useDispatch();
  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);
  const heatingCoolingEnergy = useSelector((state: any) =>
    selectHouseholdEnergyById(state, 4) // Replace '1' with the ID you want
  );

  const updateSlider = (value: number) => {
    setSliderValue(value);
    dispatch(
      addHouseholdEnergy({
        id: 4,
        name: "light-bulbs",
        selected: true,
        value: value,
      })
    )
  }

  useEffect(() => {
    if (selected == true) {
      dispatch(
        addHouseholdEnergy({
          id: 4,
          name: "light-bulbs",
          selected: true,
          value: 1,
        })
      )
    } else {
      dispatch(
        deleteHouseholdEnergy({ id: 4 })
      )
    }
  }, [selected]);

  // Update When Page is Opened

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
          text="Light Bulbs" />

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
            Select Average Light Use Time in Hours

          </p>
          <Slider
            value={sliderValue}
            onChange={updateSlider}
            className="w-full"
            color="#35D36A"
            size="xl"
            min={1}
            max={8}
            marks={[
              { value: 1, label: '1' },
              { value: 2, label: '2' },
              { value: 3, label: '3' },
              { value: 4, label: '4' },
              { value: 5, label: '5' },
              { value: 6, label: '6' },
              { value: 7, label: '7' },
              { value: 8, label: '8' },
            ]}
          />
        </div>
      </div>
    </div>
  )
}
