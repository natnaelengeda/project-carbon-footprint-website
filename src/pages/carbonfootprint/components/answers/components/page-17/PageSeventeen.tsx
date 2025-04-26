import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Slider } from "@mantine/core";

// Default Background
import DefaultBackground from "../DefaultBackground";
import NavComponent from "../../../NavComponent";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Redux
import { addWaterUsage } from "@/state/carbon";

// Utils
import CarbonLanguage from "@/utils/carbonLanguage";

// App Asset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageSeventeen({ setPage }: Props) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [currentlySelected, setCurrentlySelected] = useState<number>(0);

  const options = [
    { id: 0, name: <CarbonLanguage name="washing_machine" />, type: "washing-machine" },
    { id: 1, name: <CarbonLanguage name="handwash" />, type: "handwash" },
  ];

  const socket = useSocket();

  // Log socket connection status
  console.log("Socket connected:", socket?.connected);

  return (
    <DefaultBackground currPage={17}>
      <div className="relative z-10 w-full h-full mx-auto flex flex-col items-center justify-start gap-5 py-10 md:py-20">

        {/* Title */}
        <div className="w-[90rem] h-auto flex flex-col items-start justify-start pl-40 pt-14 text-white">
          <div className="flex flex-row items-center justify-start gap-5">
            <div className="w-10 h-3 bg-purple-500"></div>
            <p className="text-white text-[60px]"><CarbonLanguage name="water_usage" /></p>
          </div>
          <p className="text-[50px]"><CarbonLanguage name="washing_clothes" /></p>
        </div>

        {/* Options */}
        <div className="w-[70rem] h-auto flex flex-col items-start justify-start pl-5 gap-7 md:gap-1 text-white">
          {options.map((option) => (
            <SliderComponent
              key={option.id}
              id={option.id}
              selectedTypes={selectedTypes}
              type={option.type}
              text={option.name}
              setSelectedTypes={setSelectedTypes}
              currentlySelected={currentlySelected}
              setCurrentlySelected={setCurrentlySelected}
            />
          ))}
        </div>

        <div className="absolute bottom-0 right-0">
          <NavComponent setPage={setPage} nextPage={18} prevPage={16} />
        </div>
      </div>
    </DefaultBackground>
  );
}

interface ICheckboxComponent {
  id: number;
  selectedTypes: string[];
  type: string;
  text: any;
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  currentlySelected: number;
  setCurrentlySelected: React.Dispatch<React.SetStateAction<number>>;
}

const SliderComponent = ({
  id,
  selectedTypes,
  type,
  text,
  setSelectedTypes,
  currentlySelected,
  setCurrentlySelected,
}: ICheckboxComponent) => {
  const [value, setValue] = useState<number>(0);

  const dispatch = useDispatch();
  const socket = useSocket();
  const room = localStorage.getItem("room");

  // Log when the component renders
  console.log(`Rendering SliderComponent for type: ${type}, id: ${id}`);

  const updateSlider = (value: number) => {
    console.log(`Updating slider for type: ${type}, value: ${value}`);
    addSelectedToTypes();
    setValue(value);

    // Log the data being dispatched to Redux
    console.log("Dispatching data to Redux:", {
      id: 1,
      name: "washing-clothes",
      value: 1,
      washing_machine: type === "washing-machine",
      handwash: type === "handwash",
      frequency: value,
    });

    dispatch(
      addWaterUsage({
        id: 1,
        name: "washing-clothes",
        value: 1,
        washing_machine: type === "washing-machine" ? true : false,
        handwash: type === "handwash" ? true : false,
        frequency: value,
      })
    );

    // Log the data being emitted through the socket
    const emittedData = {
      type: type,
      room: room,
      slider1: value,
      page: "page-17",
    };
    console.log("Emitting socket event: page-change-send-data-server with data:", emittedData);

    socket?.emit("page-change-send-data-server", JSON.stringify(emittedData));
  };

  const checkSelectedTypes = () => {
    const isSelected = selectedTypes.includes(type);
    console.log(`Checking if type is selected: ${type}, isSelected: ${isSelected}`);
    return isSelected;
  };

  const addRemoveTypes = () => {
    const check = selectedTypes.includes(type);

    if (check) {
      console.log(`Removing type from selectedTypes: ${type}`);
      const newSelectedTypes = selectedTypes.filter((item) => item !== type); // Remove the item immutably
      setSelectedTypes(newSelectedTypes);
    } else {
      console.log(`Adding type to selectedTypes: ${type}`);
      setSelectedTypes([...selectedTypes, type]); // Add the item immutably
    }
  };

  const addSelectedToTypes = () => {
    if (!selectedTypes.includes(type)) {
      console.log(`Adding type to selectedTypes: ${type}`);
      setSelectedTypes([...selectedTypes, type]); // Add the item immutably
    }
  };

  const check: boolean = checkSelectedTypes();

  return (
    <div className="w-full flex flex-col items-start justify-start gap-2 md:gap-5 pt-4 md:pt-[48px]">

      {/* Select Option */}
      <div
        onClick={() => {
          console.log(`Option clicked: ${type}`);
          setCurrentlySelected(id);
          addRemoveTypes();
        }}
        className="flex flex-row items-center justify-start gap-3 md:gap-[20px]"
      >
        <img
          onClick={() => {
            console.log(`Checkbox clicked: ${type}`);
            addRemoveTypes();
          }}
          src={check ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
          className="w-7 md:w-[40px] md:h-[40px] object-contain cursor-pointer"
        />
        <p className="text-xl md:text-[40px] font-normal">{text}</p>
      </div>

      {/* Days per week */}
      <div
        style={{
          display: currentlySelected === id ? "block" : "none",
        }}
        className="w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2"
      >
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          <CarbonLanguage name="how_many_days_per_week" />
        </p>

        <Slider
          value={value}
          onChange={updateSlider}
          className="w-full"
          color="#35D36A"
          size="xl"
          min={0}
          max={7}
          marks={[
            { value: 1, label: "1" },
            { value: 2, label: "2" },
            { value: 3, label: "3" },
            { value: 4, label: "4" },
            { value: 5, label: "5" },
            { value: 6, label: "6" },
            { value: 7, label: "7" },
          ]}
        />
      </div>
    </div>
  );
};