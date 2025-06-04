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
  page: string;
}

export default function PageSix({ setPage }: Props) {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 0, 0, 0]);
  const [selectedHours, setSelectedHours] = useState<number[]>([0, 0, 0, 0]);

  const buttons = [
    { id: 0, name: <CarbonLanguage name="incandescent_bulb" />, type: "incandescent-bulb" },
    { id: 1, name: <CarbonLanguage name="florescent" />, type: "fluorescent-bulb" },
    { id: 2, name: <CarbonLanguage name="compact_florescent" />, type: "compact-fluorescent-bulb" },
    { id: 3, name: <CarbonLanguage name="led_bulb" />, type: "led-lighting" },
  ]

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={6}>
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
          className="w-full h-auto flex flex-col items-start justify-start pl-10 text-white">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[40px]"><CarbonLanguage name="household_energy" /></p>
          </div>
          <p className="text-[30px]"><CarbonLanguage name="electric_light_usage" /></p>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 gap-3">
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
  };

  const addRemoveTyeps = () => {
    const check = selectedTypes.includes(type);

    if (check) {
      const newSelectedTypes = selectedTypes.filter((item: any) => item !== type); // Remove the item immutably
      setSelectedTypes(newSelectedTypes);
    } else {
      setSelectedTypes([...selectedTypes, type]); // Add the item immutably
    }
  };

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
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data: InData = JSON.parse(temp);

      if (data.page == "page-6") {
        setSelectedTypes((prevSelectedTypes: any) => {
          const checkSelected = prevSelectedTypes.includes(data.type);
          if (!checkSelected) {
            return [...prevSelectedTypes, data.type]; // Add the item immutably
          }
          return prevSelectedTypes;
        });

        updateSelectedDays({
          index: data.type == "incandescent-bulb" ? 0 :
            data.type == "fluorescent-bulb" ? 1 :
              data.type == "compact-fluorescent-bulb" ? 2 :
                data.type == "led-lighting" ? 3 : 0,
          value: data.slider1
        });

        const timeValue = data.slider2; // All lighting types use hours

        updateSelectedHours({
          index: data.type == "incandescent-bulb" ? 0 :
            data.type == "fluorescent-bulb" ? 1 :
              data.type == "compact-fluorescent-bulb" ? 2 :
                data.type == "led-lighting" ? 3 : 0,
          value: timeValue
        });

        dispatch(
          addHouseholdEnergy({
            id: 4,
            name: "light-bulbs",
            selected: true,
            value: 1
          })
        );

        dispatch(
          addHouseholdEnegryCategory({
            parent_id: 4,
            category_id:
              type === "incandescent-bulb" ? 1 :
                type === "fluorescent-bulb" ? 2 :
                  type === "compact-fluorescent-bulb" ? 3 :
                    type === "led-lighting" ? 4 : 0,
            id: type === "incandescent-bulb" ? 1 :
              type === "fluorescent-bulb" ? 2 :
                type === "compact-fluorescent-bulb" ? 3 :
                  type === "led-lighting" ? 4 : 0,
            name: type === "incandescent-bulb" ? "lighting-incandescent" :
              type === "fluorescent-bulb" ? "light-bulb-incandecent" :
                type === "compact-fluorescent-bulb" ? "light-bulb-cfl" :
                  type === "led-lighting" ? "light-bulb-florecent" : "",
            selected: true,
            value: data.slider1,
            frequency: data.slider2
          })
        );
      }
    });
  }, [socket]);

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
          className='text-sm md:text-base lg:text-lg xl:text-xl font-normal'>
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
};