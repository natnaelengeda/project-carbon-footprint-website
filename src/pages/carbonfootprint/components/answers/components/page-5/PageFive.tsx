import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
// Background
import DefaultBackground from '../DefaultBackground';
import { useSocket } from '@/context/SocketProvider';

// Socket
import NavComponent from '../../../NavComponent';
import { addHouseholdEnegryCategory } from '@/state/carbon';
import { addHouseholdEnergy } from '@/state/carbon';
import { Slider } from '@mantine/core';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Utils
import CarbonLanguage from '@/utils/carbonLanguage';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFive({ setPage }: Props) {
  // Values
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentlySelected, setCurrentlySelected] = useState<number>(0);

  const buttons = [
    { id: 0, name: <CarbonLanguage name="iron" />, type: "iron" },
    { id: 1, name: <CarbonLanguage name="fridge" />, type: "fridge" },
    { id: 2, name: <CarbonLanguage name="tv" />, type: "television" },
    { id: 3, name: <CarbonLanguage name="water_boiler" />, type: "water-boiler" },
  ];

  return (
    <DefaultBackground
      currPage={5}>
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
          <p className="text-[50px]">Electric Appliances</p>
        </div>

        {/* Bottom Context */}
        <div
          className='w-[70rem] h-auto flex flex-col items-start justify-start pl-5 gap-7 md:gap-1 text-white'>

          {
            buttons &&
            buttons.map((button: { id: number, type: string, name: any }, index: number) => {
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
          className={`absolute bottom-0 right-0 ${currentlySelected == 3 ? "pb-44" : ""}`}>
          <NavComponent
            setPage={setPage}
            nextPage={6}
            prevPage={4} />
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
  const [minutes, setMinutes] = useState<number>(0);

  // State
  const dispatch = useDispatch();
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const updateSlider1 = (value: any) => {
    addSelectedToTypes();

    setValue(value);
    dispatch(
      addHouseholdEnergy({
        id: 3,
        name: "electric-appliances",
        selected: true,
        value: 1
      })
    );

    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 3,
        category_id:
          type == "iron" ? 1 :
            type == "fridge" ? 2 :
              type == "television" ? 3 :
                4,
        id: type == "iron" ? 1 :
          type == "fridge" ? 2 :
            type == "television" ? 3 :
              4,
        name: type == "iron" ? "electric-appliances-iron-clothes" :
          type == "fridge" ? "electric-appliances-fridge" :
            type == "television" ? "electric-appliances-tv" :
              "electric-appliances-water-boiler",
        selected: true,
        value: value,
        frequency: frequency,
      })
    );

    socket?.emit("page-change-send-data-server", JSON.stringify({
      type: type,
      room: room,
      slider1: value,
      slider2: frequency,
      page: "page-5"
    }));
  }

  const updateSlider2 = (efreq: any) => {
    addSelectedToTypes();

    setFrequency(efreq);
    dispatch(
      addHouseholdEnergy({
        id: 3,
        name: "electric-appliances",
        selected: true,
        value: 1
      })
    );

    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 3,
        category_id:
          type == "iron" ? 1 :
            type == "fridge" ? 2 :
              type == "television" ? 3 :
                4,
        id: type == "iron" ? 1 :
          type == "fridge" ? 2 :
            type == "television" ? 3 :
              4,
        name: type == "iron" ? "electric-appliances-iron-clothes" :
          type == "fridge" ? "electric-appliances-fridge" :
            type == "television" ? "electric-appliances-tv" :
              "electric-appliances-water-boiler",
        selected: true,
        value: value,
        frequency: efreq,
      })
    );

    socket?.emit("page-change-send-data-server", JSON.stringify({
      type: type,
      room: room,
      slider1: value,
      slider2: efreq,
      page: "page-5",
    }));
  }

  const updateSlider3 = (minutes: any) => {
    addSelectedToTypes();
    setMinutes(minutes);

    // addSelectedToTypes();

    // setFrequency(efreq);
    dispatch(
      addHouseholdEnergy({
        id: 3,
        name: "electric-appliances",
        selected: true,
        value: 1
      })
    );

    dispatch(
      addHouseholdEnegryCategory({
        parent_id: 3,
        category_id:
          type == "iron" ? 1 :
            type == "fridge" ? 2 :
              type == "television" ? 3 :
                4,
        id: type == "iron" ? 1 :
          type == "fridge" ? 2 :
            type == "television" ? 3 :
              4,
        name: type == "iron" ? "electric-appliances-iron-clothes" :
          type == "fridge" ? "electric-appliances-fridge" :
            type == "television" ? "electric-appliances-tv" :
              "electric-appliances-water-boiler",
        selected: true,
        value: value,
        frequency: minutes,
      })
    );

    socket?.emit("page-change-send-data-server", JSON.stringify({
      type: type,
      room: room,
      slider1: value,
      slider2: minutes,
      page: "page-5",
    }));
    // For iron and water boiler, we'll use minutes as the frequency
    // const frequencyValue = minutes;

    // dispatch(
    //   addHouseholdEnegryCategory({
    //     parent_id: 2,
    //     category_id: type === "iron" ? 1 : type === "fridge" ? 2 : type === "television" ? 3 : 4,
    //     id: type === "iron" ? 1 : type === "fridge" ? 2 : type === "television" ? 3 : 4,
    //     name: type === "iron" ? "electric-appliance-iron" : type === "fridge" ? "electric-appliance-fridge" : type === "television" ? "electric-appliance-television" : "electric-appliance-water-boiler",
    //     selected: true,
    //     value: value,
    //     frequency: frequencyValue
    //   })
    // );

    // socket?.emit("page-change-send-data-server", JSON.stringify({
    //   type: type,
    //   room: room,
    //   slider1: value,
    //   slider2: frequencyValue,
    //   page: "page-5"
    // }));
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
          {/* How many days per week do you use the appliance? */}
          <CarbonLanguage name="how_many_days_per_week" />
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

      {/* Hours Per Day - Only for Fridge and TV */}
      <div
        style={{
          display: currentlySelected == id && (type === "fridge" || type === "television") ? "block" : "none"
        }}
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>

        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          <CarbonLanguage name="how_many_hours_per_day" />
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

      {/* Minutes Per Day - Only for Iron and Water Boiler */}
      <div
        style={{
          display:
            currentlySelected == id &&
              (type === "iron" || type === "water-boiler") ?
              "block" :
              "none"
        }}
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          <CarbonLanguage name="how_many_minutes_per_day" />
        </p>

        <Slider
          value={minutes}
          onChange={updateSlider3}
          color="#35D36A"
          size="xl"
          className='w-full'
          min={0}
          max={35}
          marks={[
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 15, label: '15' },
            { value: 20, label: '20' },
            { value: 25, label: '25' },
            { value: 30, label: '30' },
            { value: 35, label: '35+' },
          ]}
        />
      </div>
    </div>
  );
}