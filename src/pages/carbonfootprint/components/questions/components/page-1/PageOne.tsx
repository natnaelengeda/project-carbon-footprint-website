import React, { useEffect, useState } from "react";

// Socket
import { useSocket } from "@/context/SocketProvider";

// React Redux
import { useDispatch, useSelector } from "react-redux";

// State
import { addName, CarbonState } from "@/state/carbon";

// Components
import QuestionsLayout from "../QuestionsLayout";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Translation
import { useTranslation } from "react-i18next";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ setPage }: Props) {
  const [name, setName] = useState<string>(""); // Local state for the name

  const socket = useSocket();
  const dispatch = useDispatch();

  const { t } = useTranslation();
  const sectionLanguage = JSON.parse(localStorage.getItem("language") || "");

  // Get the name from Redux state
  const nameFromState = useSelector((state: { carbon: CarbonState }) => state.carbon.name);
  useEffect(() => {
    // Listen for the "name-change-client-1" event from the socket
    socket?.on("name-change-client-1", (data: any) => {
      try {
        const parsedData = JSON.parse(data); // Parse the received data
        const id = parsedData.id;
        const receivedName = parsedData.name;
       
        // Update the local state
        setName(receivedName);

        // Dispatch the name to Redux
        dispatch(
          addName({
            id: id,
            name: receivedName,
          })
        );

        
      } catch (error) {
        console.error("Error parsing socket data:", error);
      }
    });

    // Cleanup the socket listener on component unmount
    return () => {
      socket?.off("name-change-client-1");
    };
  }, [socket, dispatch]);

  useEffect(() => {
    // If the name exists in Redux, update the local state
    if (nameFromState) {
      console.log("Name from Redux:", nameFromState);
      setName(nameFromState);
    }
  }, [nameFromState]);

  return (
    <QuestionsLayout setPage={setPage} currPage={1}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px]">
        {/* Center */}
        <div className="w-full flex flex-col items-center justify-center gap-14 pt-5">
          <img
            src={AppAsset.BannerTwo}
            style={{
              width: "350px",
              height: "350px",
            }}
          />

          <span
            style={{
              fontSize: "34px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold"
          >
            <h1 className="text-center">
              {t("carbon.would_you_mind_sharing_your_name_optional", { lng: sectionLanguage.carbon })}
            </h1>
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
  );
}