import React from 'react'

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

  const carbon = useSelector((state: any) => state.carbon);

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
            isLoading={false} />

          {/* Right Side */}
          <div className='w-full h-auto flex flex-col items-center justify-start'>
            <div className="gap-20 w-full flex flex-col items-center justify-center mb-20 ">
              <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
                <span className=" text-white ">
                  <p className="text-4xl">
                    <CarbonLanguage name="your_carbon_footprint_per_year_is" />
                    4,700 kg Co2-e{" "}
                    <CarbonLanguage name="per_year" />
                  </p>
                </span>
                <CarbonFootprintProgress
                  value={400}
                  secondValue={800}
                  firstText={carbon.name || "You"}
                  secondText={"Global Average"} />
              </div>
              <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
                <span className=" text-white pb-2">
                  <p className="text-4xl">
                    <CarbonLanguage name="global_average_carbon_footprint_per_person_is_per_year" />
                    4,700 kg Co2-e{" "}
                    <CarbonLanguage name="per_year" />
                  </p>
                </span>
                <CarbonFootprintProgress
                  value={200}
                  secondValue={500}
                  firstText={carbon.name || "You"}
                  secondText={"Ethiopian"} />
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
