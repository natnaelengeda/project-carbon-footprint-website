import { useEffect, useState } from "react";

// Layout
import QuestionsLayout from "../QuestionsLayout";

// Sockets
import { useSocket } from "@/context/SocketProvider";

// AppAsset
import AppAsset from "@/core/AppAsset";
import CarbonLanguage from "@/utils/carbonLanguage";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPublicTransports: React.Dispatch<React.SetStateAction<string[]>>;
  setPersonalTransports: React.Dispatch<React.SetStateAction<string[]>>;
  personalTransportArray: any;
  setPersonalTransportsArray: any;
  publicTransportArray: any;
  setPublicTransportArray: any;
}

export default function PageSeven({
  setPage,
  setPublicTransports,
  setPersonalTransports,
  personalTransportArray,
  setPersonalTransportsArray,
  publicTransportArray,
  setPublicTransportArray,
}: Props) {
  const [selectedPersonal, setSelectedPersonal] = useState<string[]>([]);
  const [selectedPublic, setSelectedPublic] = useState<string[]>([]);

  const personalVehicles = [
    { id: 0, name: <CarbonLanguage name="automobile" />, label: "automobile" },
    { id: 1, name: <CarbonLanguage name="motorcycle" />, label: "motor-cycle" },
    { id: 2, name: <CarbonLanguage name="bicycle" />, label: "bicycle" },
  ];

  const publicTransports = [
    { id: 0, name: <CarbonLanguage name="bus" />, label: "bus" },
    { id: 1, name: <CarbonLanguage name="mini_bus" />, label: "mini-bus" },
    { id: 2, name: <CarbonLanguage name="light_rail" />, label: "light-rail" },
    { id: 3, name: <CarbonLanguage name="ride_hailing_service" />, label: "ride-hailing" },
  ];

  useEffect(() => {
    setPublicTransports(selectedPublic);
    setPersonalTransports(selectedPersonal);
  }, [selectedPersonal, selectedPublic]);

  useEffect(() => {
    const updatedPersonalTransportArray = personalTransportArray.map((per: any) => {
      if (selectedPersonal.includes(per.name)) {
        return { ...per, isSelected: true };
      }
      return { ...per, isSelected: false };
    });

    setPersonalTransportsArray(updatedPersonalTransportArray);
  }, [selectedPersonal]);

  useEffect(() => {
    const updatePublicTransportArray = publicTransportArray.map((per: any) => {
      if (selectedPublic.includes(per.name)) {
        return { ...per, isSelected: true };
      }

      return { ...per, isSelected: false };
    });

    setPublicTransportArray(updatePublicTransportArray);
  }, [selectedPublic]);

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={7}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start  py-10">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerFive}
            style={{
              width: '250px',
              height: '250px'
            }}
            className=" object-contain" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 text-white">
          <div
            className="flex flex-row items-start justify-start gap-5">
            <div
              className="w-8 h-2 bg-orange-500 mt-8">
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-white text-[40px]"><CarbonLanguage name="transportation_mode" /></p>
              <p className="text-white text-[25px]"><CarbonLanguage name="please_provide_your_usual_transportation_option" /></p>
            </div>
          </div>
        </div>

        {/* Personal Vehicle */}
        <div
          className="w-full flex flex-col items-start justify-start pl-10 pt-5 gap-5">

          {/* Title */}
          <div className="">
            <h1 className="text-[40px] font-bold text-white"><CarbonLanguage name="personal_transportation" /></h1>
          </div>

          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-5 pl-10">
            {
              personalVehicles.map((vehicles: { id: number, name: any, label: string }, index: number) => {
                return (
                  <CheckboxComponent
                    key={index}
                    id={index}
                    name={vehicles.name}
                    label={vehicles.label}
                    type={"personal"}
                    selectedPersonal={selectedPersonal}
                    selectedPublic={selectedPublic}
                    setSelectedPersonal={setSelectedPersonal}
                    setSelectedPublic={setSelectedPublic} />
                );
              })
            }
          </div>

        </div>

        {/* Public Transport */}
        <div
          className="w-full h- flex flex-col items-start justify-start pl-10 pt-5 gap-5">
          {/* Title */}
          <div className="">
            <h1 className="text-[40px] font-bold text-white"><CarbonLanguage name="public_transportation" /></h1>
          </div>

          <div className="w-full h-auto flex flex-col items-start justify-start gap-5 pl-10">
            {
              publicTransports.map((vehicles: { id: number, name: any, label: string }, index: number) => {
                return (
                  <CheckboxComponent
                    key={index}
                    id={index}
                    name={vehicles.name}
                    label={vehicles.label}
                    type={"public"}
                    selectedPersonal={selectedPersonal}
                    selectedPublic={selectedPublic}
                    setSelectedPersonal={setSelectedPersonal}
                    setSelectedPublic={setSelectedPublic} />
                );
              })
            }
          </div>
        </div>

      </div>

    </QuestionsLayout>
  )
}

interface ICheckboxComponent {
  id: number,
  name: string,
  type: string,
  label: string;
  selectedPersonal: any,
  selectedPublic: any,
  setSelectedPersonal: any,
  setSelectedPublic: any,
}

const CheckboxComponent = ({ name, type, label, selectedPersonal, selectedPublic, setSelectedPersonal, setSelectedPublic }: ICheckboxComponent) => {
  const socket = useSocket();

  const addRemoveTyeps = () => {
    if (type == "personal") {
      const check = selectedPersonal.includes(label);

      if (check) {
        const newSelectedTypes = selectedPersonal.filter((item: any) => item !== label); // Remove the item immutably
        setSelectedPersonal(newSelectedTypes);

      } else {
        setSelectedPersonal([...selectedPersonal, label]); // Add the item immutably
      }
    }

    if (type == "public") {
      const check = selectedPublic.includes(label);

      if (check) {
        const newSelectedTypes = selectedPublic.filter((item: any) => item !== label); // Remove the item immutably
        setSelectedPublic(newSelectedTypes);
      } else {
        setSelectedPublic([...selectedPublic, label]); // Add the item immutably
      }
    }
  }

  const changeCheckboxState = ({ statetype, stateLabel, isOn }: { statetype: string, stateLabel: string, isOn: boolean }) => {
    if (statetype == "personal") {
      setSelectedPersonal((prevSelectedTypes: any) => {
        const checkSelected = prevSelectedTypes.includes(stateLabel);

        if (isOn && !checkSelected) {
          return [...prevSelectedTypes, stateLabel]; // Add the item immutably
        } else if (!isOn && checkSelected) {
          return prevSelectedTypes.filter((item: any) => item !== stateLabel); // Remove the item immutably
        }

        return prevSelectedTypes;
      });
    }

    if (statetype == "public") {
      setSelectedPublic((prevSelectedTypes: any) => {
        const checkSelected = prevSelectedTypes.includes(stateLabel);

        if (isOn && !checkSelected) {
          return [...prevSelectedTypes, stateLabel]; // Add the item immutably
        } else if (!isOn && checkSelected) {
          return prevSelectedTypes.filter((item: any) => item !== stateLabel); // Remove the item immutably
        }

        return prevSelectedTypes;
      });
    }
  }

  const checkSelectedTypes = () => {
    if (type == "personal") {
      return selectedPersonal.includes(label);
    }

    if (type == "public") {
      return selectedPublic.includes(label);
    }
  }

  const check: boolean = checkSelectedTypes();

  useEffect(() => {
    socket?.on("page-7-emit-checkbox-change-server", (temp) => {
      const data = JSON.parse(temp);

      changeCheckboxState({
        statetype: data.type,
        stateLabel: data.label,
        isOn: data.isOn
      });

    })
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
          className='text-xl md:text-[45px] font-normal'>
          {name}
        </p>
      </div>

    </div>
  );
}