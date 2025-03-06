import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addHouseholdEnegryCategory, addHouseholdEnergy } from '@/state/carbon';

// Components
import QuestionsLayout from "../QuestionsLayout";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface InData {
  room: string;
  slider1: number;
  slider2: number;
  type: string;
}

export default function PageThirteen({ setPage }: Props) {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 0, 0, 0]);
  const [selectedHours, setSelectedHours] = useState<number[]>([0, 0, 0, 0]);

  const buttons = [
    { id: 0, name: "Iron", type: "iron" },
    { id: 1, name: "Fridge", type: "fridge" },
    { id: 2, name: "TV", type: "tv" },
    { id: 3, name: "Water Boiler", type: "water-boiler" },
  ];

  return (
    <QuestionsLayout
      setPage={setPage}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerFish}
            className="w-[550px] h-[550px] object-cover" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-28 text-white">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-pink-500">
            </div>
            <p className="text-white text-[60px]">Diet and Food Consumption</p>
          </div>
          <p className="text-[50px]">Fish</p>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-10">
          <p className="text-[30px] text-white">You use <span className="text-primary">Meat for {selectedDays[0]} days</span> per week.</p>
        </div>
      </div>
    </QuestionsLayout>
  )
}

interface ICheckboxComponent {
  id: number,
  selectedTypes: string[],
  type: string,
  text: string,
  selectedDays: number[],
  selectedHours: number[],
  setSelectedTypes: any,
  setSelectedDays: any,
  setSelectedHours: any,
}

const CheckboxComponent = (
  {
    id,
    selectedTypes,
    type,
    text,
    selectedDays,
    selectedHours,
    setSelectedTypes,
    setSelectedDays,
    setSelectedHours
  }: ICheckboxComponent) => {

  const socket: any = useSocket();

  // State
  const dispatch = useDispatch();


  const checkSelectedTypes = () => {
    return selectedTypes.includes(type);
  }

  const addRemoveTyeps = () => {
    const check = selectedTypes.includes(type);
    console.log(check);

    if (check) {
      const newSelectedTypes = selectedTypes.filter((item: any) => item !== type); // Remove the item immutably
      setSelectedTypes(newSelectedTypes);
    } else {
      setSelectedTypes([...selectedTypes, type]); // Add the item immutably
    }
  }

  const updateSelectedDays = ({ index, value }: { index: number, value: number }) => {
    setSelectedDays((prevSelectedDays: any) => {
      const newSelectedDays = [...prevSelectedDays];
      newSelectedDays[index] = value;
      return newSelectedDays;
    });
  };

  const updateSelectedHours = ({ index, value }: { index: number, value: number }) => {
    setSelectedHours((prevSelectedHours: any) => {
      const newSelectedHours = [...prevSelectedHours];
      newSelectedHours[index] = value;
      return newSelectedHours;
    });
  };

  const check: boolean = checkSelectedTypes();

  useEffect(() => {
    socket?.on("page-update-slider-client", (temp: any) => {
      const data: InData = JSON.parse(temp);

      setSelectedTypes((prevSelectedTypes: any) => {
        const checkSelected = prevSelectedTypes.includes(data.type);

        if (!checkSelected) {
          return [...prevSelectedTypes, data.type]; // Add the item immutably
        }

        return prevSelectedTypes;
      });

      dispatch(
        addHouseholdEnergy({
          id: 2,
          name: "cooking",
          selected: true,
          value: 1
        })
      );

      dispatch(
        addHouseholdEnegryCategory({
          parent_id: 2,
          category_id:
            data.type == "electric-stove" ? 1 :
              data.type == "gas-stove" ? 2 :
                data.type == "charcoal-stove" ? 3 :
                  4,
          id: data.type == "electric-stove" ? 1 :
            data.type == "gas-stove" ? 2 :
              data.type == "charcoal-stove" ? 3 :
                4,
          name: data.type == "electric-stove" ? "cooking-electric-stove" :
            data.type == "gas-stove" ? "cooking-gas-stove" :
              data.type == "charcoal-stove" ? "cooking-charcoal" :
                "cooking-wood-stove",
          selected: true,
          value: data.slider1,
          frequency: data.slider2,
        })
      );



      updateSelectedDays({
        index: data.type == "electric-stove" ? 0 :
          data.type == "gas-stove" ? 1 :
            data.type == "charcoal-stove" ? 2 :
              data.type == "wood-stove" ? 3 : 0,
        value: data.slider1
      });

      updateSelectedHours({
        index: data.type == "electric-stove" ? 0 :
          data.type == "gas-stove" ? 1 :
            data.type == "charcoal-stove" ? 2 :
              data.type == "wood-stove" ? 3 : 0,
        value: data.slider2
      });
    });

  }, [socket]);

  console.log(selectedTypes)


  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">
      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
        <img
          onClick={() => {
            addRemoveTyeps();
          }}
          src={check ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
          className='w-7 md:w-[40px] md:h-[40px] object-contain cursor-pointer' />
        <p
          className='text-xl md:text-[45px] font-normal'>
          {text}
        </p>
      </div>

      {/* Usage */}
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}
      />
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px]">

        {/* Top */}
        <div
          className='w-full flex flex-row items-center justify-start px-[106px]'>
          <img
            src={AppAsset.Logo}
            style={{
              width: '72px',
              height: '109px',
            }}
            className="w-32 h-32 object-contain" />
        </div>

        {/* Center */}
        <div
          className='w-full flex flex-col items-center justify-center gap-14 pt-[186px]'>

          <img
            src={AppAsset.BannerTwo}
            style={{
              width: '500px',
              height: '500px'
            }} />

          <span
            style={{
              fontSize: '48px'
            }}
            className='flex flex-col items-center justify-center gap-2 text-white font-semibold'>
            <h1
              className=''>
              Would you mind sharing your
            </h1>
            <h1>
              name? (Optional)
            </h1>
          </span>

          {/* Name */}
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <p className="text-white text-2xl md:text-[64px] font-semibold">
              {name}
              <span className="animate-pulse">_</span>
            </p>
          </div>

        </div>

      </div>
    </div>
  );;
}
