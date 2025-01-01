import { useEffect, useState } from 'react'

// Mantine
import { Slider } from '@mantine/core';

// State
import { useDispatch, useSelector } from 'react-redux';
import {
  addTransportationMode,
  // deleteTransportationMode,
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

export default function Walking({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [slider1, setSlider1] = useState<number>(1);
  const [sliderMax1, setSliderMax1] = useState<number | null>(null);
  const [slider2, setSlider2] = useState<number>(1);
  const [sliderMax2, setSliderMax2] = useState<number | null>(null);

  // State
  const dispatch = useDispatch();

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const transportationMode = pledge.transportation_mode;

  const updateSlider1 = (value: number) => {
    if (sliderMax1 == null) {
      setSlider1(value);
      dispatch(
        addTransportationMode({
          id: 4,
          name: 'walking',
          selected: selected,
          value: value,
          frequency: slider2,
        }));
    } else {
      if (value > sliderMax1) {

      } else {
        setSlider1(value);
        dispatch(
          addTransportationMode({
            id: 4,
            name: 'walking',
            selected: selected,
            value: value,
            frequency: slider2,
          }));
      }
    }
  }

  const updateSlider2 = (value: number) => {
    if (sliderMax2 == null) {
      setSlider2(value);
      dispatch(
        addTransportationMode({
          id: 4,
          name: 'walking',
          selected: selected,
          value: slider1,
          frequency: value,
        }));
    } else {
      if (value > sliderMax2) {

      } else {
        setSlider2(value);
        dispatch(
          addTransportationMode({
            id: 4,
            name: 'walking',
            selected: selected,
            value: slider1,
            frequency: value,
          }));
      }
    }
  }

  useEffect(() => {
    const walking = transportationMode.filter((item: any) => item.name == "walking");

    if (walking.length != 0) {
      setSelected(true);

      if (walking) {
        setSlider1(walking[0].value ?? 1);
        setSliderMax1(walking[0].value ?? 1);
        setSlider2(walking[0].frequency ?? 1);
        setSliderMax2(walking[0].frequency ?? 1);
      }

    }
    // if (selected) {
    //   dispatch(
    //     addTransportationMode({
    //       id: 4,
    //       name: 'walking',
    //       selected: selected,
    //       value: 1,
    //       frequency: 1,
    //     })
    //   )
    // } else {
    //   dispatch(
    //     deleteTransportationMode({
    //       id: 4
    //     })
    //   )
    // }

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
          text='Walking'
          location='walking'
          setOpened={setOpened} />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: opened == "walking" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pt-3 pl-5 md:pl-16 gap-8 md:gap-1'>
        <div
          className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-5 md:gap-7'>

          {/* Distance */}
          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-2">
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px]">
              Select distance you walk in km per day
            </p>
            <Slider
              value={slider1}
              onChange={updateSlider1}
              className="w-full"
              color="#35D36A"
              size="xl"
              min={1}
              max={40}
              marks={[
                { value: 5, label: '5' },
                { value: 10, label: '10' },
                { value: 15, label: '15' },
                { value: 20, label: '20' },
                { value: 25, label: '25' },
                { value: 30, label: '30' },
                { value: 35, label: '35' },
              ]}
            />
          </div>

          {/* Days  */}
          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-2">
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px]">
              Select days days you walk per week
            </p>
            <Slider
              value={slider2}
              onChange={updateSlider2}
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
