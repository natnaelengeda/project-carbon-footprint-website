import { useEffect, useState } from 'react'

// Mantine
import { Slider } from '@mantine/core';

// State
import { useDispatch } from 'react-redux';
import { addWaterUsage, deleteWaterUsage } from '@/state/carbon';

// Components
import ArrowComponent from '../../ArrowComponent';
import CheckboxComponent from '../../CheckboxComponent';

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}


export default function Garden({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  const [slider, setSlider] = useState<number>(1);

  const dispatch = useDispatch();

  const updateSlider = (value: number) => {
    setSlider(value);
    dispatch(
      addWaterUsage({
        id: 3,
        name: "gardening-water",
        value: value,
      }))
  }


  useEffect(() => {
    if (selected) {
      dispatch(
        addWaterUsage({
          id: 3,
          name: "gardening-water",
          value: 1,
        }))
    } else {
      dispatch(
        deleteWaterUsage({
          id: 1
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
          location="garden-watering"
          text="Garden Watering" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: opened == "garden-watering" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5'>
        <div
          className="w-full h-auto flex flex-col items-start justify-start gap-2">
          {/* Text */}
          <p className="text-[#B7B7B7] text-lg md:text-[24px]">
            Select average  amount in liters
          </p>
          <Slider
            value={slider}
            onChange={updateSlider}
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
