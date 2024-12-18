import { useState } from "react";

// Mantine
import { Slider } from "@mantine/core";

// App Asset
import AppAsset from "@/core/AppAsset";

// Components
import ArrowComponent from "../../ArrowComponent";
import CheckboxComponent from "../../CheckboxComponent";

export default function Automotives() {
  const [selected, setSelected] = useState<boolean>(false);

  const [selectedType, setSelectedType] = useState<string>("gas-powered");

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
          text='Own Automobile' />

        {/* Arrow */}
        <ArrowComponent
          selected={selected} />
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: selected ? "flex" : "none"
        }}
        className='w-full h-auto flex flex-col items-start justify-start pl-5 md:pl-16 gap-8 md:gap-16'>

        {/* Gas powered */}
        <div
          className='w-full flex flex-col items-start justify-start gap-6 pt-5 md:pt-[48px]'>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setSelectedType("gas-powered")}
              src={selectedType == "gas-powered" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Gas Powered</p>
          </div>

          {/* Form - Gas Powered */}
          <div
            style={{
              display: selectedType == "gas-powered" ? "flex" : "none"
            }}
            className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-5 md:gap-7'>

            {/* Distance */}
            <div
              className="w-full h-auto flex flex-col items-start justify-start gap-2">
              {/* Text */}
              <p className="text-[#B7B7B7] text-lg md:text-[24px]">
                Select distance usage in km per day
              </p>
              <Slider
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
                Select days usage per week
              </p>
              <Slider
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
                ]}
              />
            </div>
          </div>
        </div>


        {/* Electric powered */}
        <div
          className='w-full flex flex-col items-start justify-start gap-8 '>

          {/* Select Option */}
          <div
            className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
            <img
              onClick={() => setSelectedType("electric-powered")}
              src={selectedType == "electric-powered" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className='w-7 md:w-[28px] md:h-[28px] object-contain cursor-pointer' />
            <p className='text-xl md:text-[26px] font-normal'>Electric Powered</p>
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
    </div>
  )
}
