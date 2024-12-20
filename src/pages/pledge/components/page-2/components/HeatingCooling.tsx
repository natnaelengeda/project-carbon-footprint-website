import React, { useState } from 'react'

// Mantine
import { Slider } from '@mantine/core';

// Components
import ArrowComponent from '@/pages/carbonfootprint/components/ArrowComponent';
import CheckboxComponent from '@/pages/carbonfootprint/components/CheckboxComponent';

// AppAsset
import AppAsset from '@/core/AppAsset';

interface Props {
  opened: string;
  setOpened: React.Dispatch<React.SetStateAction<string>>;
}

export default function HeatingCooling({ opened, setOpened }: Props) {
  const [selected, setSelected] = useState<boolean>(false);
  const [selectedType, setSelectedType] = useState<string>("electric-air-conditioning");

  // Sliders
  const [electricAirConditioning, setElectricAirConditioning] = useState<number>(1);
  const [charcoal, setCharcoal] = useState<number>(1);

  const updateElectricAirConditioning = (value: number) => {
    setElectricAirConditioning(value);
  }

  const updateCharcoal = (value: number) => {
    setCharcoal(value);
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
          location="heating-cooling"
          text="Heating / Cooling" />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Context */}
      <div
        style={{
          display: opened == "heating-cooling" ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-7 md:gap-10'>

        {/* Electric Air Conditioning */}
        <div
          className='w-full flex flex-col items-start justify-start gap-2 pt-4 md:pt-[48px]'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setSelectedType("electric-air-conditioning")}
              src={selectedType == "electric-air-conditioning" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Electric Air Conditioning</p>
          </div>

          {/* Form - Electric Air Conditioning */}
          <div
            style={{
              display: selectedType == "electric-air-conditioning" ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={electricAirConditioning}
              onChange={updateElectricAirConditioning}
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
          className='w-full flex flex-col items-start justify-start gap-2 md:gap-8 '>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setSelectedType("charcoal")}
              src={selectedType == "charcoal" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Charcoal</p>
          </div>

          {/* Form */}

          <div
            style={{
              display: selectedType == "charcoal" ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start g'>
            {/* Text */}
            <p className="text-[#B7B7B7] text-lg md:text-[24px] pb-2">
              Select hourly usage per day
            </p>

            <Slider
              value={charcoal}
              onChange={updateCharcoal}
              color="#35D36A"
              size="xl"
              min={1}
              max={12}
              marks={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
                { value: 8, label: '8' },
                { value: 9, label: '9' },
                { value: 10, label: '10' },
                { value: 11, label: '11' },
                { value: 12, label: '12' },

              ]}
            />
          </div>

        </div>

        {/* None */}
        <div
          className='w-full flex flex-col items-start justify-start gap-8'>

          {/* Select Option */}
          <div
            className='flex flex-row items-start justify-start gap-[20px]'>
            <img
              onClick={() => setSelectedType("none")}
              src={selectedType == "none" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p
              className='text-xl md:text-[26px] font-normal'>
              I don't use any energy for heating/cooling
            </p>
          </div>

          {/* Form */}
          <div
            className='w-full h-auto hidden'>
            <input
              type="text"
              placeholder='Enter hourly usage per day'
              className='w-full h-16 rounded-xl border border-[#CBCBCB] px-5 text-[24px]' />

          </div>
        </div>

      </div>
    </div >
  )
}
