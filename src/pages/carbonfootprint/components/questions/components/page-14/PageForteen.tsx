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
import CarbonLanguage from "@/utils/carbonLanguage";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageFourteen({ setPage }: Props) {

  const [selectedDays, setSelectedDays] = useState<number>(0);

  const socket = useSocket();
  const dispatch = useDispatch();


  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data = JSON.parse(temp);

      if (data.page == "page-14") {
        setSelectedDays(data.slider1);

        dispatch(
          addDiet({
            id: 4,
            name: "fish",
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
      currPage={14}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerFish}
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
              <p className="text-white text-[30px]"><CarbonLanguage name="diet_and_food_consumption" /></p>
              <p className="text-[25px]"><CarbonLanguage name="fish" /></p>
            </div>
          </div>

        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-10 gap-10">
          <p className="text-[25px] text-white"><CarbonLanguage name="you_use" /> <span className="text-primary"><CarbonLanguage name="fish" /> <CarbonLanguage name="for" /> {selectedDays} <CarbonLanguage name="days" /></span> <CarbonLanguage name="per_week" /></p>
        </div>
      </div>
    </QuestionsLayout>
  )
}

