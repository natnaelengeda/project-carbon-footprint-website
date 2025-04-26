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
    // Listen for the "page-21-results-client" event
    socket?.on("page-21-results-client", (temp) => {
      const data = JSON.parse(temp);

      // Set the value and carbon footprint
      setValue(data.value.toFixed(0));
      setCarbonFootPrint(data.value.toFixed(0));

      // Set loading to false
      setIsLoading(false);

      // Trigger confetti
      fire(0.25, {
        spread: 26,
        startVelocity: 55,
      });
      fire(0.2, {
        spread: 60,
      });
      fire(0.35, {
        spread: 100,
        decay: 0.91,
        scalar: 0.8,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 25,
        decay: 0.92,
        scalar: 1.2,
      });
      fire(0.1, {
        spread: 120,
        startVelocity: 45,
      });
    });

    // Clean up the socket listener on unmount
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
            <span style={{ fontSize: "26px" }}>
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
