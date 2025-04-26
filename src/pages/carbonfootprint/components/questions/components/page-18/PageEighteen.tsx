import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addWaterUsage } from "@/state/carbon";

// Components
import QuestionsLayout from "../QuestionsLayout";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Utils
import CarbonLanguage from "@/utils/carbonLanguage";
import DaysPerWeek from "../DaysPerWeek";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

interface InData {
  room: string;
  slider1: number;
  type: string;
  page: string; // Added the missing 'page' property
}

export default function PageEighteen({ setPage }: Props) {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 0]);

  const buttons = [
    { id: 0, name: <CarbonLanguage name="washing_machine" />, type: "washing-machine" },
    { id: 1, name: <CarbonLanguage name="handwash" />, type: "handwash" },
  ];

  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log("Setting up socket listener for page-change-send-data-server...");

    // Check if the socket is connected
    console.log("Socket connected:", socket?.connected);

    // Add listener for socket events
    socket?.on("page-change-send-data-server", (temp: any) => {
      console.log("Data received from socket:", temp);

      try {
        const data: InData = JSON.parse(temp);
        console.log("Parsed data:", data);

        // Update selected types
        setSelectedTypes((prevSelectedTypes: any) => {
          const checkSelected = prevSelectedTypes.includes(data.type);

          if (!checkSelected) {
            console.log(`Adding type to selectedTypes: ${data.type}`);
            return [...prevSelectedTypes, data.type];
          }

          return prevSelectedTypes;
        });

        // Dispatch data to Redux
        console.log("Dispatching data to Redux:", {
          id: 1,
          name: "washing-clothes",
          value: 1,
          washing_machine: data.type === "washing-machine",
          handwash: data.type === "handwash",
          frequency: data.slider1,
        });

        dispatch(
          addWaterUsage({
            id: 1,
            name: "washing-clothes",
            value: 1,
            washing_machine: data.type === "washing-machine",
            handwash: data.type === "handwash",
            frequency: data.slider1,
          })
        );

        // Update selected days
        updateSelectedDays({
          index: data.type === "washing-machine" ? 0 : 1,
          value: data.slider1,
        });
      } catch (error) {
        console.error("Error parsing socket data:", error);
      }
    });

    // Cleanup listener on unmount
    return () => {
      console.log("Cleaning up socket listener for page-change-send-data-server...");
      socket?.off("page-change-send-data-server");
    };
  }, [socket]);

  const updateSelectedDays = ({ index, value }: { index: number; value: number }) => {
    console.log(`Updating selectedDays at index ${index} with value ${value}`);
    setSelectedDays((prevSelectedDays: any) => {
      const newSelectedDays = [...prevSelectedDays];
      newSelectedDays[index] = value;
      return newSelectedDays;
    });
  };

  return (
    <QuestionsLayout setPage={setPage} currPage={17}>
      <div className="relative z-10 w-full h-full mx-auto flex flex-col items-center justify-start gap-5 py-10 md:py-20">
        {/* Image Content */}
        <div className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerTwentyTwo}
            className="w-[300px] h-[300px] object-cover"
          />
        </div>
        {/* Title */}
        <div className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-1 text-white">
          <div className="flex flex-row items-start justify-start gap-5">
            <div className="w-8 h-2 bg-pink-500 mt-7"></div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-white text-[30px]">
                <CarbonLanguage name="water_usage" />
              </p>
              <p className="text-[25px]">
                <CarbonLanguage name="washing_clothes" />
              </p>
            </div>
          </div>
        </div>

        {/* Options */}
        <div className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-1 gap-5">
          {
            buttons &&          
            buttons.map((button: { id: number, type: string, name: any }, index: number) => {
            console.log(`Rendering button: ${button.type}`);
            return (
              <CheckboxComponent
                key={index}
                id={index}
                selectedTypes={selectedTypes}
                type={button.type}
                text={button.name}
                selectedDays={selectedDays}
                setSelectedTypes={setSelectedTypes}
                setSelectedDays={setSelectedDays}
              />
            );
          })}
        </div>
      </div>
    </QuestionsLayout>
  );
}

interface ICheckboxComponent {
  id: number;
  selectedTypes: string[];
  type: string;
  text: React.ReactNode;
  selectedDays: number[];
  setSelectedTypes: any;
  setSelectedDays: any;
}


const CheckboxComponent = ({
  id,
  selectedTypes,
  type,
  text,
  selectedDays,
  setSelectedTypes,
  setSelectedDays
}: ICheckboxComponent) => {
  const dispatch = useDispatch();

  const socket: any = useSocket();


  const checkSelectedTypes = () => {
    return selectedTypes.includes(type);
  };

  const addRemoveTypes = () => {
    const check = selectedTypes.includes(type);

    if (check) {
      console.log(`Removing type from selectedTypes: ${type}`);
      const newSelectedTypes = selectedTypes.filter((item: any) => item !== type);
      setSelectedTypes(newSelectedTypes);
    } else {
      console.log(`Adding type to selectedTypes: ${type}`);
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const updateSelectedDays = ({ index, value }: { index: number, value: number }) => {
    setSelectedDays((prevSelectedDays: any) => {
      const newSelectedDays = [...prevSelectedDays];
      newSelectedDays[index] = value;
      return newSelectedDays;
    });
  };

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data: InData = JSON.parse(temp);

      if (data.page == "page-17") {

        setSelectedTypes((prevSelectedTypes: any) => {
          const checkSelected = prevSelectedTypes.includes(data.type);

          if (!checkSelected) {
            return [...prevSelectedTypes, data.type]; // Add the item immutably
          }

          return prevSelectedTypes;
        });

        dispatch(
          addWaterUsage({
            id: 1,
            name: "washing-clothes",
            value: 1,
            washing_machine: data.type === "washing-machine",
            handwash: data.type === "handwash",
            frequency: data.slider1,
          })
        );
        
        updateSelectedDays({
          index: data.type == "washing-machine" ? 0 : 1,
          value: data.slider1
        });


  
        
      }

    });

  }, [socket]);
  const check: boolean = checkSelectedTypes();

  return (
    <div className="w-full h-full flex flex-col items-start justify-start gap-2 text-white">
      <div
        className="flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white"
        onClick={() => addRemoveTypes()}
      >
        <img
          src={check ? AppAsset.CheckedIcon : AppAsset.UncheckedIcon}
          className="w-7 md:w-[40px] md:h-[40px] object-contain cursor-pointer"
        />
        <p className="text-xl md:text-[45px] font-normal">{text}</p>
      </div>

      {/* Usage */}
      <div
        style={{
          display: check ? "flex" : "none",
        }}
        className="pr-10"
      >
       {} <DaysPerWeek
          text={typeof text === "string" ? text : ""}
          selectedDays={selectedDays[id]}
        />
      </div>
    </div>
  );
};