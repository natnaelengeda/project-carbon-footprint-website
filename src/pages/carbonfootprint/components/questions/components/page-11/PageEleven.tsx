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


export default function PageEleven({ setPage }: Props) {
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 0, 0, 0]);

  const socket = useSocket();
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data = JSON.parse(temp);

      if (data.page == "page-11") {
        setSelectedDays(data.slider1);

        dispatch(
          addDiet({
            id: 1,
            name: "poultry",
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
      currPage={11}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerSixteen}
            className="w-[550px] h-[550px] object-cover" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-28 text-white">
          <div
            className="flex flex-row items-center justify-start gap-5">
            <div
              className="w-10 h-3 bg-purple-500">
            </div>
            <p className="text-white text-[60px]">Diet and Food Consumption</p>
          </div>
          <p className="text-[50px]">Poultry (Chicken)</p>
        </div>

        {/* Options */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-10">
          <p className="text-[30px] text-white">You use <span className="text-primary">Poultry (Chicken) for {selectedDays} days</span> per week.</p>
        </div>
      </div>
    </QuestionsLayout>
  )
}
