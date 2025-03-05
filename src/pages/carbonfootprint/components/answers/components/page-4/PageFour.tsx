import React, { useState } from 'react'

// Mantine
import { Slider } from '@mantine/core';

// State
import {
  useDispatch,
} from 'react-redux';

// CarbonState,
import {
  addHouseholdEnegryCategory,
  addHouseholdEnergy,
} from '@/state/carbon';



// AppAsset
import AppAsset from "@/core/AppAsset";

// Background
import DefaultBackground from '../DefaultBackground';

// Socket
import { useSocket } from '@/context/SocketProvider';
import NavComponent from '../../../NavComponent';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFour({ setPage }: Props) {

  // Values
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentlySelected, setCurrentlySelected] = useState<number>(0);

  const buttons = [
    { id: 0, name: "Electric Stove", type: "electric-stove" },
    { id: 2, name: "Gas Stove", type: "gas-stove" },
    { id: 3, name: "Charcoal Stove", type: "charcoal-stove" },
    { id: 4, name: "Wood Stove", type: "wood-stove" },
  ]

  return (
    <DefaultBackground>
      <div className="relative z-10 w-full h-full mx-auto flex flex-col items-center justify-start gap-5 py-10 md:py-20">

        {/* Title */}
        <div
          className="w-[90rem] h-auto flex flex-col items-start justify-start pl-40 pt-14 text-white">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]">Household Energy</p>
          </div>
          <p className="text-[50px]">Cooking</p>
        </div>

        {/* Bottom Context */}
        <div
          className='w-[70rem] h-auto flex flex-col items-start justify-start pl-5 gap-7 md:gap-1 text-white'>

          {
            buttons &&
            buttons.map((button: { id: number, type: string, name: string }, index: number) => {
              return (
                <SliderComponent
                  key={index}
                  id={index}
                  selectedTypes={selectedTypes}
                  type={button.type}
                  text={button.name}
                  setSelectedTypes={setSelectedTypes}
                  currentlySelected={currentlySelected}
                  setCurrentlySelected={setCurrentlySelected} />
              );
            })
          }

        </div>

        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={5}
            prevPage={3} />
        </div>

      </div>
    </DefaultBackground>
  )
}

interface ICheckboxComponent {
  id: number,
  selectedTypes: string[],
  type: string,
  text: string,
  setSelectedTypes: any,
  currentlySelected: number,
  setCurrentlySelected: any,
}

const SliderComponent = ({ id, selectedTypes, type, text, setSelectedTypes, currentlySelected, setCurrentlySelected }: ICheckboxComponent) => {
  const [value, setValue] = useState<number>(0);
  const [frequency, setFrequency] = useState<number>(0);

  // State
  const dispatch = useDispatch();
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const updateSlider1 = (value: any) => {
    addSelectedToTypes();

    setValue(value);
    dispatch(
      addHouseholdEnergy({
        id: 2,
        name: "cooking",
        selected: true,
        value: 1
      })
    )

    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 2,
        category_id:
          type == "electric-stove" ? 1 :
            type == "gas-stove" ? 2 :
              type == "charcoal-stove" ? 3 :
                4,
        id: type == "electric-stove" ? 1 :
          type == "gas-stove" ? 2 :
            type == "charcoal-stove" ? 3 :
              4,
        name: type == "electric-stove" ? "cooking-electric-stove" :
          type == "gas-stove" ? "cooking-gas-stove" :
            type == "charcoal-stove" ? "cooking-charcoal" :
              "cooking-wood-stove",
        selected: true,
        value: value,
        frequency: frequency
      })
    );

    socket?.emit("page-update-slider-server", JSON.stringify({
      type: type,
      room: room,
      slider1: value,
      slider2: frequency
    }));
  }

  const updateSlider2 = (frequency: any) => {
    addSelectedToTypes();

    setFrequency(frequency);
    dispatch(
      addHouseholdEnergy({
        id: 2,
        name: "cooking",
        selected: true,
        value: 1
      })
    )

    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 2,
        category_id:
          type == "electric-stove" ? 1 :
            type == "gas-stove" ? 2 :
              type == "charcoal-stove" ? 3 :
                4,
        id: type == "electric-stove" ? 1 :
          type == "gas-stove" ? 2 :
            type == "charcoal-stove" ? 3 :
              4,
        name: type == "electric-stove" ? "cooking-electric-stove" :
          type == "gas-stove" ? "cooking-gas-stove" :
            type == "charcoal-stove" ? "cooking-charcoal" :
              "cooking-wood-stove",
        selected: true,
        value: value,
        frequency: frequency
      })
    );

    socket?.emit("page-update-slider-server", JSON.stringify({
      type: type,
      room: room,
      slider1: value,
      slider2: frequency
    }));
  }

  const checkSelectedTypes = () => {
    return selectedTypes.includes(type);
  }

  const addRemoveTyeps = () => {
    const check = selectedTypes.includes(type);

    if (check) {
      const newSelectedTypes = selectedTypes.filter((item: any) => item !== type); // Remove the item immutably
      setSelectedTypes(newSelectedTypes);
    } else {
      setSelectedTypes([...selectedTypes, type]); // Add the item immutably
    }
  }

  const addSelectedToTypes = () => {
    setSelectedTypes([...selectedTypes, type]); // Add the item immutably
  }

  const check: boolean = checkSelectedTypes();

  return (
    <div
      className='w-full flex flex-col items-start justify-start gap-2 md:gap-5 pt-4 md:pt-[48px]'>

      {/* Select Option */}
      <div
        onClick={() => {
          setCurrentlySelected(id)
          addRemoveTyeps();
        }}
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px]'>
        <img
          onClick={() => {
            addRemoveTyeps();
          }}
          src={check ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
          className='w-7 md:w-[40px] md:h-[40px] object-contain cursor-pointer' />
        <p
          className='text-xl md:text-[40px] font-normal'>
          {text}
        </p>
      </div>

      {/* Days per week*/}
      <div
        style={{
          display: currentlySelected == id ? "block" : "none"
        }}
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          How many days per week?
        </p>

        <Slider
          value={value}
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
          How many hours per day?
        </p>

        <Slider
          value={frequency}
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