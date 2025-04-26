import React, { useState } from "react";

// Slider
import { Slider } from "@mantine/core";

// Default Background
import DefaultBackground from "../DefaultBackground";

// App Asset
import NavComponent from "../../../NavComponent";
import { useSocket } from "@/context/SocketProvider";
import { useDispatch } from "react-redux";
import { addWaterUsage } from "@/state/carbon";
import CarbonLanguage from "@/utils/carbonLanguage";
// Redux state

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageNineteen({ setPage }: Props) {
  

  return (
    <DefaultBackground
      currPage={19}>
      <div className='w-full h-full relative z-10'>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white pt-[250px]">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]"><CarbonLanguage name="water_usage" /></p>
          </div>
          <p className="text-[40px]"><CarbonLanguage name="watering_the_garden" /></p>
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
            nextPage={20}
            prevPage={18} />
        </div>
      </div>
    </DefaultBackground>
  )
}


const RadioButtonsComponent = () => {
  const [days, setDays] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);


  const socket = useSocket();
  const dispatch = useDispatch();
  const room = localStorage.getItem("room");

  const updateSlider = (e: any) => {
    setDays(e);

    socket?.emit("page-change-send-data-server", JSON.stringify({
      room: room,
      slider1: e,
      slider2: minutes,
      page: "page-19"
    }));

    dispatch(
      addWaterUsage({
        id: 3,
        name: "watering-garden",
        value: e,
        frequency: minutes,
      })
    );
  }

  const updateSlider1 = (e: any) => {
    setMinutes(e);

    socket?.emit("page-change-send-data-server", JSON.stringify({
      room: room,
      slider1: days,
      slider2: e,
      page: "page-19"
    }));

    dispatch(
      addWaterUsage({
        id: 3,
        name: "watering-garden",
        value: days,
        frequency: e,
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

      {/* Minutes per day*/}
      <div
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          <CarbonLanguage name="average_duration_in_minutes" />
        </p>

        <Slider
          value={minutes}
          onChange={updateSlider1}
          color="#35D36A"
          size="xl"
          className='w-full'
          min={0}
          max={80}
          marks={[
            { value: 10, label: '10' },
            { value: 20, label: '20' },
            { value: 30, label: '30' },
            { value: 40, label: '40' },
            { value: 50, label: '50' },
            { value: 60, label: '60' },
            { value: 70, label: '60+' },
          ]}
        />
      </div>
    </div>
  );
}

