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

// Utils
import CarbonLanguage from "@/utils/carbonLanguage";
import DaysPerWeekHoursPerDay from "../DaysPerWeekHoursPerDay";

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

export default function PageFour({ setPage }: Props) {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 0, 0, 0]);
  const [selectedHours, setSelectedHours] = useState<number[]>([0, 0, 0, 0]);

  const buttons = [
    { id: 0, name: <CarbonLanguage name="electric_stove" />, type: "electric-stove" },
    { id: 1, name: <CarbonLanguage name="gas_stove" />, type: "gas-stove" },
    { id: 2, name: <CarbonLanguage name="charcoal_stove" />, type: "charcoal-stove" },
    { id: 3, name: <CarbonLanguage name="wood_stove" />, type: "wood-stove" },
  ];

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={4}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerFour}
            className="w-[250px] h-[250px] object-cover" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-3 text-white">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[40px]"><CarbonLanguage name="household_energy" /> </p>
          </div>
          <p className="text-[30px]"><CarbonLanguage name="cooking" /> </p>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-3 gap-5">
          {
            buttons &&
            buttons.map((button: { id: number, type: string, name: any }, index: number) => {
              return (
                <CheckboxComponent
                  key={index}
                  id={index}
                  selectedTypes={selectedTypes}
                  type={button.type}
                  text={button.name}
                  selectedDays={selectedDays}
                  selectedHours={selectedHours}
                  setSelectedTypes={setSelectedTypes}
                  setSelectedDays={setSelectedDays}
                  setSelectedHours={setSelectedHours} />
              );
            })
          }
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

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-2 text-white">
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
          display: check ? "flex" : "none"
        }}
        className="pr-10">
        <DaysPerWeekHoursPerDay
          text={text}
          selectedDays={selectedDays[id]}
          selectedHours={selectedHours[id]} />
      </div>
    </div>
  );
}