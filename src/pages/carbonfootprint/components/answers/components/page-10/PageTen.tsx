import { useState } from "react";

// Slider
import { Slider } from "@mantine/core";

// Default Background
import DefaultBackground from "../DefaultBackground";
import NavComponent from "../../../NavComponent";

// Redux
import { useDispatch } from "react-redux";
import { addTransportationMode } from "@/state/carbon";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Utils
import CarbonLanguage from "@/utils/carbonLanguage";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTen({ setPage }: Props) {

  const buttons = [
    { id: 0, name: "Walking", type: "walking", extra: "Walking!" },
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
            <p className="text-white text-[60px]"><CarbonLanguage name="transportation_mode" /></p>
          </div>
          <p className="text-[40px]"><CarbonLanguage name="walking" /></p>
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
          <CarbonLanguage name="how_many_kilometers_per_day" />
        </p>

        <Slider
          value={kms}
          onChange={updateSlider1}
          className='w-full'
          color="#35D36A"
          size="xl"
          min={1}
          max={15}
          marks={[
            { value: 1, label: '1' },
            { value: 2, label: '2' },
            { value: 4, label: '4' },
            { value: 6, label: '6' },
            { value: 8, label: '8' },
            { value: 10, label: '10' },
            { value: 12, label: '12' },
            { value: 14, label: '14' },
          ]}
        />
      </div>

      {/* Hours Per Day*/}
      <div
        className='w-full h-auto pl-2 pr-5 md:pr-32 flex flex-col items-start justify-start gap-2 pt-5'>
        {/* Text */}
        <p className="text-[#efefef] text-lg md:text-[30px] pb-2 md:pb-4">
          <CarbonLanguage name="how_many_days_per_week" />
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
