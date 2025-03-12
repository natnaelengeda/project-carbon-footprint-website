// AppAsset
import AppAsset from "@/core/AppAsset";
import QuestionsLayout from "../QuestionsLayout";
import { useEffect, useState } from "react";
import { useSocket } from "@/context/SocketProvider";


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
    { id: 0, name: "Automobile", label: "automobile" },
    { id: 1, name: "Motor Cycle", label: "motor-cycle" },
    { id: 2, name: "Bicycle", label: "bicycle" },
  ];

  const publicTransports = [
    { id: 0, name: "Bus", label: "bus" },
    { id: 1, name: "Mini-Bus", label: "mini-bus" },
    { id: 2, name: "Light-rail", label: "light-rail" },
    { id: 3, name: "Ride Hailing", label: "ride-hailing" },
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
              width: '700px',
              height: '700px'
            }}
            className=" object-contain" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-20 text-white">
          <div
            className="flex flex-row items-start justify-start gap-5">
            <div
              className="w-10 h-3 bg-orange-500 mt-10">
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-white text-[60px]">Transportation Mode</p>
              <p className="text-white text-[40px]">Please provide your usual transportation option</p>
            </div>
          </div>
        </div>

        {/* Personal Vehicle */}
        <div
          className="w-full h- flex flex-col items-start justify-start pl-40 pt-10 gap-10">

          {/* Title */}
          <div className="">
            <h1 className="text-[50px] font-bold text-white">Personal Vehicle</h1>
          </div>

          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-5 pl-10">
            {
              personalVehicles.map((vehicles: { id: number, name: string, label: string }, index: number) => {
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
          className="w-full h- flex flex-col items-start justify-start pl-40 pt-14 gap-10">
          {/* Title */}
          <div className="">
            <h1 className="text-[50px] font-bold text-white">Public Transport</h1>
          </div>

          <div className="w-full h-auto flex flex-col items-start justify-start gap-5 pl-10">
            {
              publicTransports.map((vehicles: { id: number, name: string, label: string }, index: number) => {
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