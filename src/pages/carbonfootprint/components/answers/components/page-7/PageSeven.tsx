import { useEffect, useState } from "react";

// Background
import DefaultBackground from '../DefaultBackground';

import NavComponent from '../../../NavComponent';
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setPublicTransports: React.Dispatch<React.SetStateAction<string[]>>;
  setPersonalTransports: React.Dispatch<React.SetStateAction<string[]>>;
  personalTransports: string[];
  pubilcTransports: string[];
  personalTransportArray: any;
  setPersonalTransportsArray: any;
  publicTransportArray: any;
  setPublicTransportArray: any
}

export default function PageSeven({
  setPage,
  personalTransports,
  pubilcTransports,
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
    <DefaultBackground
      currPage={7}>
      <div className="relative z-10 w-full h-full mx-auto flex flex-col items-center justify-start gap-5 py-10 md:pt-[150px]">

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-[500px] text-white">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-orange-500">
            </div>
            <p className="text-white text-[60px]">Transportation Mode</p>
          </div>
        </div>

        <div className="w-[1000px] mx-auto h-auto grid grid-cols-2 items-center gap-20 pt-14">
          {/* Personal Vehicle */}
          <div
            className="w-full h- flex flex-col items-start justify-start-10 gap-10 ">

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
                      setSelectedPublic={setSelectedPublic}
                      personalTransports={personalTransports}
                      pubilcTransports={pubilcTransports}
                      setPublicTransports={setPublicTransports}
                      setPersonalTransports={setPersonalTransports}
                      personalTransportArray={personalTransportArray}
                      publicTransportArray={publicTransportArray} />
                  );
                })
              }
            </div>
          </div>

          {/* Public Transport */}
          <div
            className="w-full h- flex flex-col items-start justify-start pt-14 gap-10">
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
                      setSelectedPublic={setSelectedPublic}
                      personalTransports={personalTransports}
                      pubilcTransports={pubilcTransports}
                      setPublicTransports={setPublicTransports}
                      setPersonalTransports={setPersonalTransports}
                      personalTransportArray={personalTransportArray}
                      publicTransportArray={publicTransportArray} />
                  );
                })
              }
            </div>
          </div>
        </div>

        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={8}
            prevPage={6} />
        </div>
      </div>
    </DefaultBackground>
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
  personalTransports: any,
  pubilcTransports: any,
  setPublicTransports: any,
  setPersonalTransports: any,
  personalTransportArray: any,
  publicTransportArray: any,
}

const CheckboxComponent = ({
  name,
  type,
  label,
  selectedPersonal,
  selectedPublic,
  setSelectedPersonal,
  setSelectedPublic,
  personalTransports,
  pubilcTransports,
  setPublicTransports,
  setPersonalTransports,
  personalTransportArray,
  publicTransportArray
}: ICheckboxComponent) => {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const addRemoveTyeps = () => {
    if (type == "personal") {
      const check = selectedPersonal.includes(label);

      if (check) {
        const newSelectedTypes = selectedPersonal.filter((item: any) => item !== label); // Remove the item immutably
        setSelectedPersonal(newSelectedTypes);
        // setPersonalTransports(newSelectedTypes)
        setPersonalTransports(newSelectedTypes);
      } else {
        setSelectedPersonal([...selectedPersonal, label]); // Add the item immutably
        // setPublicTransports([...selectedPersonal, label]); // Add the item immutably
        setPersonalTransports([...personalTransports, label]);
      }

      socket?.emit("page-7-emit-checkbox-change-server", JSON.stringify({
        room: room,
        type: type,
        label: label,
        arrayPersonal: personalTransportArray,
        isOn: !check
      }));

    }

    if (type == "public") {
      const check = selectedPublic.includes(label);

      if (check) {
        const newSelectedTypes = selectedPublic.filter((item: any) => item !== label); // Remove the item immutably
        setSelectedPublic(newSelectedTypes);
        setPublicTransports(newSelectedTypes);
      } else {
        setSelectedPublic([...selectedPublic, label]); // Add the item immutably
        setPublicTransports([...pubilcTransports, label]);
      }

      socket?.emit("page-7-emit-checkbox-change-server", JSON.stringify({
        room: room,
        type: type,
        label: label,
        arrayPublic: publicTransportArray,
        isOn: !check
      }));
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
