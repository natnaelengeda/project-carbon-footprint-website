import React, { useState } from "react";

// Slider
import { Slider } from "@mantine/core";

// Default Background
import DefaultBackground from "../DefaultBackground";

// App Asset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwelve({ setPage }: Props) {
  const [selectedType, setSelectedType] = useState<string>("poultry");
  const [selectedDays, setSelectedDays] = useState<number>(0);
  const [currentlySelected, setCurrentlySelected] = useState<number>(0);

  const buttons = [
    { id: 0, name: "Vegetables", type: "vegitables", extra: "Chicken and other poultry consumption" },
  ];

  return (
    <DefaultBackground>
      <div className='w-full h-full relative z-10'>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white pt-[250px]">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]">Diet and Food Consumption</p>
          </div>
          <p className="text-[40px]">Vegetables</p>
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
                  currentlySelected={currentlySelected}
                  setCurrentlySelected={setCurrentlySelected}
                />
              );
            })
          }
        </div>

      </div>
    </DefaultBackground>
  )
}


const RadioButtonsComponent = ({ id, setSelectedType, selectedType, type, text, selectedDays, extraNote, currentlySelected, setCurrentlySelected }: any) => {
  const [days, setDays] = useState<number>(0);

  const updateSlider = (e: any) => {
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
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          How many days per week?
        </p>

        <Slider
          value={days}
          onChange={updateSlider}
          color="#35D36A"
          size="xl"
          className='w-full'
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
    </div>
  );
}

