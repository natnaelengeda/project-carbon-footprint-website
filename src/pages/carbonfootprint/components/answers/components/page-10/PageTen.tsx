import { useState } from "react";

// Slider
import { Slider } from "@mantine/core";

// Default Background
import DefaultBackground from "../DefaultBackground";

// App Asset

import NavComponent from "../../../NavComponent";
import { useDispatch } from "react-redux";
import { addTransportationMode } from "@/state/carbon";
import { useSocket } from "@/context/SocketProvider";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTen({ setPage }: Props) {

  const buttons = [
    { id: 0, name: "Walking", type: "walking", extra: "Gas Powered Personal Vehicle - Automobile" },
  ];

  return (
    <DefaultBackground
      currPage={10}>
      <div className='w-full h-full relative z-10'>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white pt-[250px]">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]">Transportation Mode</p>
          </div>
          <p className="text-[40px]">Walking</p>
        </div>


        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-16">
          {
            buttons &&
            buttons.map((_, index: number) => {
              return (
                <RadioButtonsComponent
                  key={index} />
              );
            })
          }
        </div>

        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={11}
            currPage={10}
            prevPage={7} />
        </div>
      </div>
    </DefaultBackground>
  )
}


const RadioButtonsComponent = () => {
  const [kms, setKms] = useState<number>(0);
  const [days, setDays] = useState<number>(0);

  const dispatch = useDispatch();
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const updateSlider1 = (e: any) => {
    setKms(e);

    dispatch(
      addTransportationMode({
        id: 5,
        name: "walking",
        selected: true,
        value: e,
        frequency: days,
      })
    );

    socket?.emit("page-change-send-data-server", JSON.stringify({
      room: room,
      slider1: e,
      slider2: days,
      page: "page-10"
    }));
  }

  const updateSlider2 = (e: any) => {
    setDays(e);

    dispatch(
      addTransportationMode({
        id: 5,
        name: "walking",
        selected: true,
        value: kms,
        frequency: e,
      })
    );

    socket?.emit("page-change-send-data-server", JSON.stringify({
      room: room,
      slider1: kms,
      slider2: e,
      page: "page-10"
    }));
  }

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">

      {/* Days per week*/}
      <div
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-10'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          How many kilometers per day?
        </p>

        <Slider
          value={kms}
          onChange={updateSlider1}
          className='w-full'
          color="#35D36A"
          size="xl"
          min={0}
          max={50}
          marks={[
            { value: 5, label: '5' },
            { value: 10, label: '10' },
            { value: 15, label: '15' },
            { value: 20, label: '20' },
            { value: 25, label: '25' },
            { value: 30, label: '30' },
            { value: 35, label: '35' },
            { value: 40, label: '40' },
            { value: 45, label: '45' },
            { value: 50, label: '50' },
          ]}
        />
      </div>

      {/* Hours Per Day*/}
      <div
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          How many days per week?
        </p>

        <Slider
          value={days}
          onChange={updateSlider2}
          color="#35D36A"
          size="xl"
          className='w-full'
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
    </div>
  );
}
