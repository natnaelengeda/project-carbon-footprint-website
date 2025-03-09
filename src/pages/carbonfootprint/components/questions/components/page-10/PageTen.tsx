import { useEffect, useState } from "react";

// Layout
import QuestionsLayout from "../QuestionsLayout";

// AppAsset
import AppAsset from "@/core/AppAsset";
import { useDispatch } from "react-redux";
import { useSocket } from "@/context/SocketProvider";
import { addTransportationMode } from "@/state/carbon";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTen({ setPage }: Props) {
  const [km, setKm] = useState(0);
  const [days, setDays] = useState(0);

  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data = JSON.parse(temp);

      if (data.page == "page-10") {
        setKm(data.slider1);
        setDays(data.slider2);

        dispatch(
          addTransportationMode({
            id: 5,
            name: "walking",
            selected: true,
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
      currPage={10}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-[200px]">

        {/* Image Content */}
        <div
          className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
          {/* Image */}
          <img
            src={AppAsset.BannerWalk}
            className="w-[700px] h-[700px] object-contain" />
        </div>

        {/* Title */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white">
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
          className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-16 text-white text-[40px] pr-14">
          <p>You use  <span className='text-primary'>Walking {km} Kilometers</span> per day and <span className='text-primary'>{days} days per week</span></p>

        </div>

      </div>

    </QuestionsLayout>
  )
}