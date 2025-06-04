import React, { useEffect, useState, useRef } from "react";

// Components
import Result from "./components/Result";

// Background
import DefaultBackground from "../DefaultBackground";

// State
import { useSelector } from "react-redux";

// Axios
import axios from "@/utils/axios";

// Socket
import { useSocket } from "@/context/SocketProvider";

// Utils
import CarbonLanguage from "@/utils/carbonLanguage";
import { mapData } from "@/utils/convertDataFunc";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setCarbonFootPrint: React.Dispatch<React.SetStateAction<any>>;
}

interface ResponseData {
  waterUsage: number;
  foodWastage: number;
  transportationMode: number;
  dietAndFood: number;
  wasteDisposal: number;
  householdEnergy: number;
}

function calculateTotalEmissions(responseData: ResponseData): number {
  const waterEmission = responseData.waterUsage || 0;
  const foodWasteEmission = responseData.foodWastage || 0;
  const transportEmission = responseData.transportationMode || 0;
  const dietEmission = responseData.dietAndFood || 0;
  const wasteEmission = responseData.wasteDisposal || 0;
  const energyEmission = responseData.householdEnergy || 0;

  const totalEmission =
    Number(waterEmission) +
    Number(foodWasteEmission) +
    Number(transportEmission) +
    Number(dietEmission) +
    Number(wasteEmission) +
    Number(energyEmission);

  console.log("Total Emission (Number):", totalEmission);

  return totalEmission;
}

export default function PageTwenty({ setPage, setCarbonFootPrint }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const [value, setValue] = useState<string>(""); // Total emissions value
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [isRun, setIsRun] = useState<boolean>(false); // Loading state

  const carbon = useSelector((state: any) => state.carbon);
  const data = mapData(carbon);

  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for inactivity timeout

  const resetInactivityTimeout = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      console.log("Navigating to page 0 due to inactivity.");
      setPage(0); // Navigate to page 0 after 30 seconds of inactivity
      socket?.emit(
        "page-next-server",
        JSON.stringify({
          nextPage: 0,
          room: room,
        })
      );
    }, 30000); // 30 seconds inactivity timeout
  };

  const sendFunction = async (): Promise<void> => {
    if (isLoading) {
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post("/api/v1/carbonFootPrint", data);
      const responseData = response.data.data;

      // Validate responseData
      if (!responseData || typeof responseData !== "object") {
        throw new Error("Invalid response data");
      }

      // Compute total emissions
      const totalEmission = calculateTotalEmissions(responseData);

      // Validate totalEmission
      if (isNaN(totalEmission)) {
        throw new Error("Invalid total emission value");
      }

      // Set total emissions
      setValue(totalEmission.toString());
      setCarbonFootPrint(totalEmission.toString());

      // Emit results to the server
      socket?.emit(
        "page-21-results-server",
        JSON.stringify({
          value: totalEmission,
          room: room,
        })
      );
    } catch (error) {
      console.error("Error fetching data:", error);
      setValue("0"); // Fallback to a default value
      setCarbonFootPrint("0");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!isRun) {
      sendFunction();
      setIsRun(true); // Mark as executed
    }
  }, []); // Empty dependency array ensures this runs only once

  useEffect(() => {
    // Reset inactivity timeout on user interactions (mouse, keyboard, touch)
    window.addEventListener("mousemove", resetInactivityTimeout);
    window.addEventListener("keydown", resetInactivityTimeout);
    window.addEventListener("click", resetInactivityTimeout);
    window.addEventListener("touchstart", resetInactivityTimeout); // Handle touch interactions

    // Initialize inactivity timeout
    resetInactivityTimeout();

    return () => {
      // Cleanup event listeners and timeout
      window.removeEventListener("mousemove", resetInactivityTimeout);
      window.removeEventListener("keydown", resetInactivityTimeout);
      window.removeEventListener("click", resetInactivityTimeout);
      window.removeEventListener("touchstart", resetInactivityTimeout); // Cleanup touch interactions

      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [socket]);

  return (
    <DefaultBackground>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px] ">
        {/* Show Results */}
        {!isLoading && <Result value={value} isLoading={false} />}

        {/* Show a fallback if needed */}
        {isLoading && (
          <p className="text-white text-2xl">Loading results...</p>
        )}

        <div className="absolute bottom-20 right-0 w-full flex flex-row items-center justify-center gap-10">
          {/* Insights */}
          <button
            onClick={() => {
              setPage(21);
              socket?.emit(
                "page-next-server",
                JSON.stringify({
                  nextPage: 21,
                  room: room,
                })
              );
            }}
            className={`w-10 h-10 md:w-[187px] md:h-[83px] flex rounded-full border border-primary items-center justify-center p-2 md:p-0 text-[32px] text-primary`}
          >
            <CarbonLanguage name="insights" />
          </button>

          {/* Finish */}
          <button
            onClick={() => {
              setPage(0);
              socket?.emit(
                "page-next-server",
                JSON.stringify({
                  nextPage: 0,
                  room: room,
                })
              );
            }}
            className={`w-10 h-10 md:w-[187px] md:h-[83px] flex rounded-full border border-primary items-center justify-center p-2 md:p-0 text-[32px] text-white bg-primary`}
          >
            <CarbonLanguage name="finish" />
          </button>
        </div>
      </div>
    </DefaultBackground>
  );
}
