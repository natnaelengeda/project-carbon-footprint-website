import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addWaterUsage } from '@/state/carbon';

// Components
import QuestionsLayout from "../QuestionsLayout";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}



export default function PageNineteen({ setPage }: Props) {
  const [selectedDays, setSelectedDays] = useState<number>(0);
  const [selectedHours, setSelectedHours] = useState<number>(0);

  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data = JSON.parse(temp);

      if (data.page == "page-18") {
        setSelectedDays(data.slider1);
        setSelectedHours(data.slider2);

        dispatch(
          addWaterUsage({
            id: 2,
            name: "showers",
            value: data.slider1,
            frequency: data.slider2,
          })
        );
      }
    });
  }, [socket]);

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={18}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerTwentyTwo}
            className="w-[300px] h-[300px] object-cover" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-1 text-white">
          <div
            className="flex flex-row items-start justify-start gap-5">
            <div
              className="w-8 h-2 bg-pink-500 mt-7">
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-white text-[30px]">Water Usage</p>
              <p className="text-[25px]">Showers</p>
            </div>

          </div>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-4 gap-10">
          <p className="text-[25px]">
            <span className="text-white">You use </span>
            <span className="text-primary">Water for {selectedDays} days</span>
            <span className="text-white"> per week and </span>
            <span className="text-primary">{selectedHours} minutes per day</span>
          </p>
        </div>
      </div>
    </QuestionsLayout>
  )
}
