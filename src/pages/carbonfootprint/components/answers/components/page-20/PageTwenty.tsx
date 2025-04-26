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

export default function PageTwenty({ setPage, setCarbonFootPrint }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const [value, setValue] = useState<string>(""); // Total emissions value
  const [isLoading, setIsLoading] = useState<boolean>(false); // Loading state
  const [isRun, setIsRun] = useState<boolean>(false); // Loading state


  const carbon = useSelector((state: any) => state.carbon);
  const data = mapData(carbon);

  const hasExecuted = useRef(false); // Ref to track if sendFunction has been executed

  const sendFunction = async (): Promise<void> => {
    if (isLoading) {
      console.log("sendFunction is already running, skipping...");
      return;
    }
    setIsLoading(true);
    try {
      console.log("Sending data to server...");
      console.log("Data: ", data);

      const response = await axios.post("/api/v1/carbonFootPrint", data);
      const responseData = response.data;
      console.log("Successfully added to the server");
      console.log("Data: ", responseData);

      // Compute emissions for each category
      const waterEmission = responseData.waterUsage;
      const foodWasteEmission = responseData.foodWastage;
      const transportEmission = responseData.transportationMode;
      const dietEmission = responseData.dietAndFood;
      const wasteEmission = responseData.wasteDisposal;
      const energyEmission = responseData.householdEnergy;

      // Compute total emissions
      const totalEmission =
        waterEmission +
        foodWasteEmission +
        transportEmission +
        dietEmission +
        wasteEmission +
        energyEmission;

      // Set total emissions
      setValue(totalEmission.toFixed(0));
      setCarbonFootPrint(totalEmission.toFixed(0));

      console.log("Carbon Footprint: " + totalEmission.toFixed(2) + " kg CO₂-e");

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
    } finally {
      // Ensure loading is set to false even if there is an error
      setIsLoading(false);
    }
  };

  useEffect(() => {
    /*if (!hasExecuted.current) {
      hasExecuted.current = true; // Mark as executed
      sendFunction();
    }*/
    if (!isRun) {
      sendFunction();
      setIsRun(true); // Mark as executed
    }
  }, []); // Empty dependency array ensures this runs only once

  return (
    <DefaultBackground>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px] ">
        {/* Show Results */}
        {!isLoading && (
          <Result value={value} isLoading={false} />
        )}

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
