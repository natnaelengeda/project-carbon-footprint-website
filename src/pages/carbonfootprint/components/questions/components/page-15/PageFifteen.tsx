import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import { addWaste } from '@/state/carbon';

// Components
import QuestionsLayout from "../QuestionsLayout";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFifteen({ setPage }: Props) {

  const [selectedDays, setSelectedDays] = useState<number>(0);
  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data = JSON.parse(temp);

      if (data.page == "page-15") {
        setSelectedDays(data.slider1);

        dispatch(
          addWaste({
            id: 1,
            name: "weekly-collection",
            value: data.slider1,
          })
        );
      }
    });

  }, [socket]);

  return (
    <QuestionsLayout
      setPage={setPage}
      currPage={15}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:pt-[100px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerTwentyOne}
            className="w-[300px] h-[300px] object-contain" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-1 text-white">
          <div
            className="flex flex-row items-start justify-start gap-5">
            <div
              className="w-8 h-2 bg-pink-500 mt-7">
            </div>
            <div className="flex flex-col items-start justify-start ">
              <p className="text-white text-[30px]">Waste Disposal</p>
              <p className="text-[25px]">Waste Disposal</p>
            </div>

          </div>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-10 gap-10">
          <div className="text-[25px] flex flex-row items-center justify-start gap-3">
            <span className="text-white">You dispose </span>
            <span className="text-primary">Waste</span>
            <span className="text-white"> for</span>
            <span className="text-primary">{selectedDays} days per week</span>
          </div>
        </div>
      </div>
    </QuestionsLayout>
  )
}
