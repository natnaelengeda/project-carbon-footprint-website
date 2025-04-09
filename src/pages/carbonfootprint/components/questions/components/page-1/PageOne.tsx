// AppAsset
import AppAsset from "@/core/AppAsset";
import { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch } from "react-redux";

// State
import {
  addName,
  // CarbonState,
} from '@/state/carbon';
import QuestionsLayout from "../QuestionsLayout";
import { useTranslation } from "react-i18next";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ setPage }: Props) {
  const [name, setName] = useState<string>("");

  const socket: any = useSocket();

  const { t } = useTranslation();
  const sectionLanguage = JSON.parse(localStorage.getItem("language") || "");
  // State
  const dispatch = useDispatch();

  useEffect(() => {
    socket?.on("name-change-client-1", (data: any) => {
      const parsedData = JSON.parse(data);
      const id = parsedData.id;
      const name = parsedData.name;

      setName(parsedData.name);
      dispatch(addName({
        id: id,
        name: name,
      }));
    });
  }, [socket]);

  return (
    <QuestionsLayout
      setPage={setPage}>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px]">

        {/* Top */}
        <div
          className='w-full flex flex-row items-center justify-start px-[106px]'>
        </div>

        {/* Center */}
        <div
          className='w-full flex flex-col items-center justify-center gap-14 pt-5'>

          <img
            src={AppAsset.BannerTwo}
            style={{
              width: '350px',
              height: '350px'
            }} />

          <span
            style={{
              fontSize: '34px'
            }}
            className='flex flex-col items-center justify-center gap-2 text-white font-semibold'>
            <h1
              className='text-center'>
              {t("carbon.would_you_mind_sharing_your_name_optional", { lng: sectionLanguage.carbon })}
            </h1>
            {/* <h1>
              {t("carbon.would_you_mind_sharing_your_name_2", { lng: sectionLanguage.carbon })}
            </h1> */}
          </span>

          {/* Name */}
          <div className="w-full flex flex-col items-center justify-center gap-2">
            <p className="text-white text-2xl md:text-[64px] font-semibold">
              {name}
              <span className="animate-pulse">_</span>
            </p>
          </div>

        </div>
      </div>
    </QuestionsLayout>
  )
}