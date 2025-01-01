import { useEffect, useState } from 'react'

// Mantine
import { Slider } from '@mantine/core';

// State
import { useDispatch, useSelector } from 'react-redux';
import {
  addWaterUsage,
  //  deleteWaterUsage,
  PledgeState
} from '@/state/pledge';

// Components
import CheckboxComponent from '@/pages/carbonfootprint/components/CheckboxComponent';
import ArrowComponent from '@/pages/carbonfootprint/components/ArrowComponent';

// Interface
interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function Garden({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [slider, setSlider] = useState<number>(1);
  const [sliderMax, setSlidermax] = useState<number | null>(null);

  const [slider1, setSlider1] = useState<number>(1);
  const [sliderMax1, setSliderMax1] = useState<number | null>(null);


  const dispatch = useDispatch();
  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const water = pledge.water_usage;

  const updateSlider = (value: number) => {
    if (sliderMax == null) {

      setSlider(value);
      dispatch(
        addWaterUsage({
          id: 3,
          name: "gardening-water",
          value: value,
          frequency: slider1
        }));
    } else {
      if (value > sliderMax) {

      } else {
        setSlider(value);
        dispatch(
          addWaterUsage({
            id: 3,
            name: "gardening-water",
            value: value,
            frequency: slider1
          }));
      }
    }
  }

  const updateSlider1 = (value: number) => {
    if (sliderMax1 == null) {

      setSlider1(value);
      dispatch(
        addWaterUsage({
          id: 3,
          name: "gardening-water",
          value: slider,
          frequency: value,
        }));
    } else {
      if (value > sliderMax1) {

      } else {

        setSlider1(value);
        dispatch(
          addWaterUsage({
            id: 3,
            name: "gardening-water",
            value: slider,
            frequency: value,
          }));
      }
    }

  }

  useEffect(() => {
    const gardening = water.filter((item: any) => item.name == "gardening-water")

    if (gardening.length != 0) {
      setSelected(true);
      if (gardening) {
        setSlider(gardening[0].value ?? 1);
        setSlidermax(gardening[0].value ?? 1);
        setSlider1(gardening[0].frequency ?? 1);
        setSliderMax1(gardening[0].frequency ?? 1);
      }
    }


    // if (selected) {
    //   dispatch(
    //     addWaterUsage({
    //       id: 3,
    //       name: "gardening-water",
    //       value: 1,
    //     }))
    // } else {
    //   dispatch(
    //     deleteWaterUsage({
    //       id: 1
    //     })
    //   )
    // }
  }, []);

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

        {/* Frequency */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start gap-2">
          {/* Text */}
          <p className="text-[#B7B7B7] text-lg md:text-[24px]">
            Select days frequency per week
          </p>
          <Slider
            value={slider1}
            onChange={updateSlider1}
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

    </div >
  )
}
