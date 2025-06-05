import React, { useEffect, useState } from "react";

// AppAsset
import QuestionsLayout from "../QuestionsLayout";
import CarbonLanguage from "@/utils/carbonLanguage";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Confetti Effect
import confetti from "canvas-confetti";

// Utils
import Result from "./components/Result";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setCarbonFootPrint: React.Dispatch<React.SetStateAction<any>>;
}

export default function TwentyOne({ setPage, setCarbonFootPrint }: Props) {
  const socket = useSocket();

  const [value, setValue] = useState<string>(""); // Total emissions value
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state

  console.log("Page 21 Results:", value);
  // Confetti
  const count = 200;
  const defaults = {
    origin: { y: 0.7 },
  };

  function fire(particleRatio: any, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
    });
  }

  useEffect(() => {
    if (socket?.connected) {
      console.log("Socket is connected");
      socket.on("page-21-results-client", (temp) => {
        try {
          const data = JSON.parse(temp);
          console.log("Received data:", data);

          // Validate data.value
          const parsedValue = Number(data.value);
          if (!isNaN(parsedValue)) {
            setValue(parsedValue.toString());
            setCarbonFootPrint(parsedValue.toString());
          } else {
            console.error("Invalid value received:", data.value);
            setValue("0"); // Fallback to a default value
            setCarbonFootPrint("0");
          }
        } catch (error) {
          console.error("Error parsing socket data:", error);
          setValue("0"); // Fallback to a default value
          setCarbonFootPrint("0");
        }
      });
    } else {
      console.log("Socket is not connected");
    }

    return () => {
      socket?.off("page-21-results-client");
    };
  }, [socket]);

  return (
    <QuestionsLayout setPage={setPage} currPage={20}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 pt-20 md:py-[89px] ">
        {/* Show Results */}
        <Result value={value} isLoading={false} />

        {/* Reset Message */}
        <div>
          <div className="w-full flex flex-col items-center justify-between px-[106px] gap-8 pt-28">
            <span style={{ fontSize: "22px" }}>
              <p className="text-white text-center">
                <CarbonLanguage name="the_page_will_reset_in_30_seconds_you_can_start_again_using_the_button_below" />
              </p>
            </span>
          </div>
        </div>
      </div>
    </QuestionsLayout>
  );
}
