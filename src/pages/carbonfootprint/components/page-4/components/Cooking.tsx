import { useEffect, useState } from 'react';

// Mantine
import { Slider } from '@mantine/core';

// State
import { useDispatch, useSelector } from 'react-redux';
import {
  addHouseholdEnergy,
  CarbonState,
  deleteHouseholdEnergy,
  selectHouseholdEnergyById,
} from '@/state/carbon';

// Components
import ArrowComponent from '../../ArrowComponent';
import CheckboxComponent from '../../CheckboxComponent';

export default function Cooking() {
  const [selected, setSelected] = useState<boolean>(false);
  const [sliderValue, setSliderValue] = useState<number>(0);

  const dispatch = useDispatch();
  const carbon = useSelector((state: { carbon: CarbonState }) => state.carbon);
  const heatingCoolingEnergy = useSelector((state: any) =>
    selectHouseholdEnergyById(state, 2) // Replace '1' with the ID you want
  );

  const updateSlider = (value: number) => {
    setSliderValue(value);
    dispatch(
      addHouseholdEnergy({
        id: 2,
        name: "cooking",
        selected: true,
        value: value
      })
    )
  }

  useEffect(() => {
    if (selected == true) {
      dispatch(
        addHouseholdEnergy({
          id: 2,
          name: "cooking",
          selected: true,
          value: 1
        })
      )
    } else {
      dispatch(
        deleteHouseholdEnergy({ id: 2 })
      )
    }
  }, [selected]);

  // Update When Page is Opened
  useEffect(() => {

    if (carbon.house_hold_energy!.length > 0) {
      if (heatingCoolingEnergy && heatingCoolingEnergy.selected == true) {
        setSelected(true);
        setSliderValue(heatingCoolingEnergy.value!);
      }
    }
  }, []);

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
          text="Cooking" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Context */}
      <div
        style={{
          display: selected ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-7 md:gap-10'>
        {/* Slider */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start gap-2">
          {/* Text */}
          <p className="text-[#B7B7B7] text-lg md:text-[24px]">
            Select Average cooking Time in Minutes

          </p>
          <Slider
            value={sliderValue}
            onChange={updateSlider}
            className="w-full"
            color="#35D36A"
            size="xl"
            min={1}
            max={120}
            marks={[
              { value: 10, label: '10' },
              { value: 20, label: '20' },
              { value: 30, label: '30' },
              { value: 40, label: '40' },
              { value: 50, label: '50' },
              { value: 60, label: '60' },
              { value: 70, label: '70' },
              { value: 80, label: '80' },
              { value: 90, label: '90' },
              { value: 100, label: '100' },
              { value: 110, label: '110' },
            ]}
          />
        </div>

      </div>
    </div>
  )
}
