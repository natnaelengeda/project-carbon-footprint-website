import { useEffect, useState } from 'react';

// Mantine 
import {
  Slider,
} from '@mantine/core';

// Components
import ArrowComponent from '../../ArrowComponent';
import CheckboxComponent from '../../CheckboxComponent';

// AppAsset
import AppAsset from '@/core/AppAsset';

export default function HeatingCooling() {
  const [selected, setSelected] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<string>("electric-air-conditioning");


  useEffect(() => {
    if (selected == true) {
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
          text="Heating / Cooling" />

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

        {/* Electric Air Conditioning */}
        <div
          className='w-full flex flex-col items-start justify-start gap-6 pt-5 md:pt-[48px]'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setSelectedType("electric-air-conditioning")}
              src={selectedType == "electric-air-conditioning" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Electric Air Conditioning</p>
          </div>

          {/* Form - Electric Air Conditionint */}
          <div
            style={{
              display: selectedType == "electric-air-conditioning" ? "block" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32'>
            <Slider
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
          className='w-full flex flex-col items-start justify-start gap-8 '>

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
            className='w-full h-auto hidden'>
            <input
              type="text"
              placeholder='Enter hourly usage per day'
              className='w-full h-16 rounded-xl border border-[#CBCBCB] px-5 text-[24px]' />

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
