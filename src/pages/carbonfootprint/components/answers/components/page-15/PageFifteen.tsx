import React, { useState } from "react";

// Slider
import { Slider } from "@mantine/core";

// Default Background
import DefaultBackground from "../DefaultBackground";
import NavComponent from "../../../NavComponent";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Redux
import { useDispatch } from "react-redux";
import { addWaste } from "@/state/carbon";

// Utils
import CarbonLanguage from "@/utils/carbonLanguage";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFifteen({ setPage }: Props) {

  return (
    <DefaultBackground
      currPage={15}>
      <div className='w-full h-full relative z-10'>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white pt-[250px]">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]"><CarbonLanguage name="waste_disposal" /></p>
          </div>
          <p className="text-[40px]"><CarbonLanguage name="waste_disposal" /></p>
        </div>


        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-16">
          <RadioButtonsComponent />
        </div>

        <div
          className='absolute bottom-0 right-0'>
          <NavComponent
            setPage={setPage}
            nextPage={16}
            prevPage={14} />
        </div>
      </div>
    </DefaultBackground>
  )
}


const RadioButtonsComponent = () => {
  const [days, setDays] = useState<number>(0);

  const socket = useSocket();
  const dispatch = useDispatch();
  const room = localStorage.getItem("room");

  const updateSlider = (e: any) => {
    setDays(e);

    socket?.emit("page-change-send-data-server", JSON.stringify({
      room: room,
      slider1: e,
      page: "page-15"
    }));

    dispatch(
      addWaste({
        id: 1,
        name: "weekly-collection",
        value: e,
      })
    );
  }


  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">

      {/* Days per week*/}
      <div
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          <CarbonLanguage name="how_many_days_per_week" />
        </p>

        <Slider
          value={days}
          onChange={updateSlider}
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


// PageFifteen