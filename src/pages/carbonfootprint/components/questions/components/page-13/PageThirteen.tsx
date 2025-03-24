

import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addDiet } from '@/state/carbon';

// Components
import QuestionsLayout from "../QuestionsLayout";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageThirteen({ setPage }: Props) {

  const [selectedDays, setSelectedDays] = useState<number>(0);

  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data = JSON.parse(temp);

      if (data.page == "page-13") {
        setSelectedDays(data.slider1);

        dispatch(
          addDiet({
            id: 3,
            name: "meat",
            selected: true,
            value: data.slider1,
          })
        );
      }
    });

  }, [socket]);

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={13}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerEighteen}
            className="w-[300px] h-[300px] object-cover" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-12 text-white">
          <div
            className="flex flex-row items-start justify-start gap-5">
            <div
              className="w-8 h-2 bg-pink-500 mt-7">
            </div>
            <div className="flex flex-col items-start justify-start">
              <p className="text-white text-[30px]">Diet and Food Consumption</p>
              <p className="text-[25px]">Meat</p>
            </div>

          </div>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-10 gap-10">
          <p className="text-[25px] text-white">You use <span className="text-primary">Meat for {selectedDays} days</span> per week.</p>
        </div>
      </div>
    </QuestionsLayout>
  )
}

