import { useState } from 'react';

// Mantine
import { Slider } from '@mantine/core';

// Components
import CheckboxComponent from '@/pages/carbonfootprint/components/CheckboxComponent';
import ArrowComponent from '@/pages/carbonfootprint/components/ArrowComponent';

// App Asset
import AppAsset from '@/core/AppAsset';

interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function Cooking({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);

  const [stoveSelected, setStoveSelected] = useState<boolean>(false);
  const [stoveSlider, setStoveSlider] = useState<number>(0);

  const [charcoalSelected, setCharcoalSelected] = useState<boolean>(false);
  const [charcoalSlider, setCharcoalSlider] = useState<number>(0);

  const [gasSelected, setGasSelected] = useState<boolean>(false);
  const [gasSlider, setGasSlider] = useState<number>(0);



  const updateStoveSlider = (value: number) => {
    setStoveSlider(value);

  }

  const updateCharcoalSlider = (value: number) => {
    setCharcoalSlider(value);

  }

  const updateGasSlider = (value: number) => {
    setGasSlider(value);

  }


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
          setOpened={setOpened}
          location="cooking"
          text="Cooking" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Context */}
      <div
        style={{
          display: opened == "cooking" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-5 md:gap-7 pt-4'>

        {/* Electric Stove */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setStoveSelected(!stoveSelected)}
              src={stoveSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Electric Stove</p>
          </div>

          {/* Form - Electric Stove */}
          <div
            style={{
              display: stoveSelected ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={stoveSlider}
              onChange={updateStoveSlider}
              color="#35D36A"
              size="xl"
              min={1}
              max={24}
              marks={[
                { value: 1, label: '1' },
                { value: 4, label: '4' },
                { value: 8, label: '8' },
                { value: 12, label: '12' },
                { value: 16, label: '16' },
                { value: 20, label: '20' },
                { value: 24, label: '24' },
              ]}
            />

          </div>
        </div>

        {/* Charcoal */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setCharcoalSelected(!charcoalSelected)}
              src={charcoalSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Charcoal</p>
          </div>

          {/* Form - Charcoal */}
          <div
            style={{
              display: charcoalSelected ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={charcoalSlider}
              onChange={updateCharcoalSlider}
              color="#35D36A"
              size="xl"
              min={1}
              max={24}
              marks={[
                { value: 1, label: '1' },
                { value: 4, label: '4' },
                { value: 8, label: '8' },
                { value: 12, label: '12' },
                { value: 16, label: '16' },
                { value: 20, label: '20' },
                { value: 24, label: '24' },
              ]}
            />

          </div>
        </div>

        {/* Gas Stove */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setGasSelected(!gasSelected)}
              src={gasSelected ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Gas Stove</p>
          </div>

          {/* Form - Charcoal */}
          <div
            style={{
              display: gasSelected ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={gasSlider}
              onChange={updateGasSlider}
              color="#35D36A"
              size="xl"
              min={1}
              max={24}
              marks={[
                { value: 1, label: '1' },
                { value: 4, label: '4' },
                { value: 8, label: '8' },
                { value: 12, label: '12' },
                { value: 16, label: '16' },
                { value: 20, label: '20' },
                { value: 24, label: '24' },
              ]}
            />

          </div>
        </div>


      </div>
    </div>
  )
}
