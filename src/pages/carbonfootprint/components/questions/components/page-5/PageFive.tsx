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
import DaysPerWeekMinutesPerDay from "../DaysPerWeekMinutesPerDay";

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

export default function PageFive({ setPage }: Props) {

  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 0, 0, 0]);
  const [selectedHours, setSelectedHours] = useState<number[]>([0, 0, 0, 0]);


  const buttons = [
    { id: 0, name: <CarbonLanguage name="iron" />, type: "iron" },
    { id: 1, name: <CarbonLanguage name="fridge" />, type: "fridge" },
    { id: 2, name: <CarbonLanguage name="tv" />, type: "television" },
    { id: 3, name: <CarbonLanguage name="water_boiler" />, type: "water-boiler" },
  ];

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={5}>
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
          <p className="text-[30px]"><CarbonLanguage name="electric_appliances" /></p>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-1 gap-5">
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
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data: InData = JSON.parse(temp);

      if (data.page == "page-5") {

        setSelectedTypes((prevSelectedTypes: any) => {
          const checkSelected = prevSelectedTypes.includes(data.type);

          if (!checkSelected) {
            return [...prevSelectedTypes, data.type]; // Add the item immutably
          }

          return prevSelectedTypes;
        });

        updateSelectedDays({
          index: data.type == "iron" ? 0 :
            data.type == "fridge" ? 1 :
              data.type == "television" ? 2 :
                data.type == "water-boiler" ? 3 : 0,
          value: data.slider1
        });

        updateSelectedHours({
          index: data.type == "iron" ? 0 :
            data.type == "fridge" ? 1 :
              data.type == "television" ? 2 :
                data.type == "water-boiler" ? 3 : 0,
          value: data.slider2
        });


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
              data.type == "iron" ? 1 :
                data.type == "fridge" ? 2 :
                  data.type == "television" ? 3 :
                    4,
            id: data.type == "iron" ? 1 :
              data.type == "fridge" ? 2 :
                data.type == "television" ? 3 :
                  4,
            name: data.type == "iron" ? "electric-appliances-iron-clothes" :
              data.type == "fridge" ? "electric-appliances-fridge" :
                data.type == "television" ? "electric-appliances-tv" :
                  "electric-appliances-water-boiler",
            selected: true,
            value: data.slider1,
            frequency: data.slider2,
          })
        );
      }

    });

  }, [socket]);

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-3 text-white">
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
    {type === "fridge" || type === "television" ? (
      // Use DaysPerWeekHoursPerDay for Fridge and Television
      <DaysPerWeekHoursPerDay
        text={text}
        selectedDays={selectedDays[id]}
        selectedHours={selectedHours[id]} />
    ) : (
      // Use DaysPerWeekMinutesPerDay for Iron and Water Boiler
      <DaysPerWeekMinutesPerDay
        text={text}
        selectedDays={selectedDays[id]}
        selectedHours={selectedHours[id]} />
    )}
  </div>
    </div>
  );
}