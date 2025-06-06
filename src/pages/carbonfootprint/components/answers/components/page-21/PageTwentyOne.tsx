import React, { useEffect, useRef } from 'react';

// Background
import DefaultBackground from '../DefaultBackground';

// Sockets
import { useSocket } from '@/context/SocketProvider';

// Utils
import CarbonLanguage from '@/utils/carbonLanguage';

// Components
import Result from './components/Result';
import CarbonFootprintProgress from '../../../questions/components/page-22/components/CarbonFootprintProgress';
import { useSelector } from 'react-redux';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  carbonFootPrint: any;
}

export default function PageTwentyOne({ setPage, carbonFootPrint }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");
  const ethiopianAverage = 170;
  const globalAverage = 4700;
  const carbon = useSelector((state: any) => state.carbon);

  const inactivityTimeoutRef = useRef<NodeJS.Timeout | null>(null); // Ref for inactivity timeout

  const resetInactivityTimeout = () => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    inactivityTimeoutRef.current = setTimeout(() => {
      console.log("Navigating to page 0 due to inactivity.");
      setPage(0); // Navigate to page 0 after 30 seconds of inactivity
      socket?.emit("page-next-server", JSON.stringify({
        nextPage: 0,
        room: room,
      }));
    }, 30000); // 30 seconds inactivity timeout
  };

  useEffect(() => {
    // Reset inactivity timeout on user interactions
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
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">

        {/* Main Component */}
        <div
          className='w-full flex flex-row items-center justify-start'>
          {/* Left Side */}
          <Result
            value={carbonFootPrint}
            isLoading={true} />

          {/* Right Side */}
          <div className='w-full h-auto flex flex-col items-center justify-start space-y-8'>
            <div className="gap-20 w-full flex flex-col items-center justify-center mb-20 ">
              <div className="w-5/6 flex flex-col items-center justify-center gap-2 space-y-8">
                <span className=" text-white ">
                  <p className="text-4xl">
                    <CarbonLanguage name="global_average_carbon_footprint_per_person_is_per_year" />
                      {" "}{globalAverage} KG CO₂-e{" "}
                    <CarbonLanguage name="is" />
                  </p>
                </span>
                { carbonFootPrint < globalAverage?
              <CarbonFootprintProgress
                value={carbonFootPrint}
                secondValue={globalAverage}
                firstText={carbon.name || "You"}
                secondText={"Global Average"}
                firstColror = {"bg-green-400"}
                secondColor = {"bg-blue-500"}
                />:
                <CarbonFootprintProgress
                value={globalAverage}
                secondValue={carbonFootPrint}
                firstText={"Global Average"}
                secondText={carbon.name || "You"}
                firstColror = {"bg-blue-500"}
                secondColor = {"bg-green-400"} /> 
               
            }
              </div>
             
              <div className="w-5/6 flex flex-col items-center justify-center gap-2 space-y-8">
                <span className=" text-white pb-2">
                  <p className="text-4xl">
                    <CarbonLanguage name="ethiopian_average_carbon_footprint_per_person_is_per_year" />
                      {" "} {ethiopianAverage} KG CO₂-e
                     <CarbonLanguage name="is" />
                  </p>
                </span>
                { carbonFootPrint < ethiopianAverage?
                  <CarbonFootprintProgress
                    value={carbonFootPrint}
                    secondValue={ethiopianAverage}
                    firstText={carbon.name || "You"}
                    secondText={"Ethiopian Average"}
                    firstColror = {"bg-green-400"}
                    secondColor = {"bg-blue-500"}
                    />:
                    <CarbonFootprintProgress
                    value={ethiopianAverage}
                    secondValue={carbonFootPrint}
                    firstText={"Ethiopian Average"}
                    secondText={carbon.name || "You"}
                    firstColror = {"bg-blue-500"}
                    secondColor = {"bg-green-400"} /> 
                }
              </div>
            </div>

            {/* Bottom */}
            <div>
              <div className=" w-full flex flex-col items-center justify-between px-[106px] gap-8 ">
                <span style={{ fontSize: "25px" }}>
                  <p className="text-white ">
                    <CarbonLanguage name="the_page_will_reset_in_30_seconds_you_can_start_again_using_the_button_below" />
                  </p>
                </span>
              </div>
            </div>

          </div>
        </div>

        <div
          className='absolute bottom-10 right-0 w-full flex flex-row items-center justify-end gap-10'>

          {/* Insights */}
          <button
            onClick={() => {
              setPage(22)
              socket?.emit("page-next-server", JSON.stringify({
                nextPage: 22,
                room: room,
              }));
            }}
            className={
              `w-10 h-10 md:w-[187px] md:h-[83px] flex rounded-full border border-primary items-center justify-center p-2 md:p-0 text-[32px] text-primary`}>
            Insights
          </button>

          {/* Finish */}
          <button
            onClick={() => {
              setPage(0)
              socket?.emit("page-next-server", JSON.stringify({
                nextPage: 0,
                room: room,
              }));
            }}
            className={
              `w-10 h-10 md:w-[187px] md:h-[83px] flex rounded-full border border-primary items-center justify-center p-2 md:p-0 text-[32px] text-white bg-primary`}>
            Finish
          </button>
        </div>

      </div>
    </DefaultBackground>
  )
}
