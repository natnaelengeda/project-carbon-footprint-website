// import React from 'react'

import AppAsset from "@/core/AppAsset";
import { Slider } from "@mantine/core";
import { useState } from "react";

export default function Motorcycle() {
  const [selectedType, setSelectedType] = useState<string>("gas-powered");
  const [selectedKMs, setSelectedKMs] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(0);

  const [currentlySelected, setCurrentlySelected] = useState<number>(0);

  const buttons = [
    { id: 0, name: "Bicycle", type: "bicycle", extra: "Gas Powered Personal Vehicle - Automobile" },
  ];

  return (
    <div className='w-full h-full'>

      {/* Title */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white">
        <div
          className="flex flex-row items-center justify-start gap-5">
          <div
            className="w-10 h-3 bg-purple-500">
          </div>
          <p className="text-white text-[60px]">Transportation Mode</p>
        </div>
        <p className="text-[40px]">Personal Vehicle - Motorcycle</p>
      </div>


      {/* Options */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-16">
        {
          buttons &&
          buttons.map((button: { id: number, name: string, type: string, extra: string }, index: number) => {
            return (
              <RadioButtonsComponent
                key={index}
                id={index}
                index={index}
                setSelectedType={setSelectedType}
                selectedType={selectedType}
                type={button.type}
                text={button.name}
                extraNote={button.extra}
                selectedDays={selectedDays}
                selectedKMs={selectedKMs}
                currentlySelected={currentlySelected}
                setCurrentlySelected={setCurrentlySelected}
              />
            );
          })
        }
      </div>

    </div>
  )
}

const RadioButtonsComponent = ({ id, setSelectedType, selectedType, type, text, selectedDays, selectedKMs, extraNote, currentlySelected, setCurrentlySelected }: any) => {
  const [kms, setKms] = useState<number>(0);
  const [days, setDays] = useState<number>(0);

  const updateSlider1 = (e: any) => {
    setKms(e);
  }

  const updateSlider2 = (e: any) => {
    setDays(e);
  }

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">

      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
        <img
          onClick={() => {
            setSelectedType(type);
            setCurrentlySelected(id);
          }}
          src={selectedType == type ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
          className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
        <p
          className='text-xl md:text-[45px] font-normal'>
          {text}
        </p>
      </div>

      {/* Days per week*/}
      <div
        style={{
          display: currentlySelected == id ? "block" : "none"
        }}
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-10'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          How many kilometers per day?
        </p>

        <Slider
          value={kms}
          onChange={updateSlider1}
          className='w-full'
          color="#35D36A"
          size="xl"
          min={0}
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

      {/* Hours Per Day*/}
      <div
        style={{
          display: currentlySelected == id ? "block" : "none"
        }}
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          How many days per week?
        </p>

        <Slider
          value={days}
          onChange={updateSlider2}
          color="#35D36A"
          size="xl"
          className='w-full'
          min={0}
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
  );
}
