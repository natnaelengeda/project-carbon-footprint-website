import React from 'react'

// Background
import DefaultBackground from '../DefaultBackground';
import AppAsset from '@/core/AppAsset';
import StackedProgressBar from '../../../questions/components/page-22/components/StackedProgressBar';
import { useSocket } from '@/context/SocketProvider';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwentyOne({ setPage }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  return (
    <DefaultBackground>
      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">

        {/* Main Component */}
        <div
          className='w-full flex flex-row items-center justify-start'>
          {/* Left Side */}
          <div
            className='w-full h-auto flex flex-col items-center justify-start'>
            <div className="w-full flex flex-col items-center justify-center gap-8 mb-20 ">
              <img
                src={AppAsset.BannerThirteen}
                style={{
                  width: "400px",
                  height: "400px",
                }} />

              <span
                style={{
                  fontSize: "48px",
                }}
                className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
                <h1 className=" font-bold">Excellent</h1>
              </span>
              <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
                <p className="text-4xl">your carbon foot print per is </p>
                <h2 style={{ fontSize: "48px" }} className=" font-bold">
                  49kg Co2 -e
                </h2>
              </span>
            </div>
          </div>

          {/* Right Side */}
          <div className='w-full h-auto flex flex-col items-center justify-start'>
            <div className="gap-20 w-full flex flex-col items-center justify-center mb-20 ">
              <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
                <span className=" text-white ">
                  <p className="text-4xl">
                    Global carbon foot print per person is 4,700 kg Co2-e per year{" "}
                  </p>
                </span>
                <StackedProgressBar />
              </div>
              <div className="w-5/6 flex flex-col items-center justify-center gap-2 ">
                <span className=" text-white ">
                  <p className="text-4xl">
                    Global carbon foot print per person is 4,700 kg Co2-e per year
                  </p>
                </span>
                <StackedProgressBar />
              </div>
            </div>

            {/* Bottom */}
            <div>
              <div className=" w-full flex flex-col items-center justify-between px-[106px] gap-8 ">
                <span style={{ fontSize: "25px" }}>
                  <p className="text-white ">
                    This page will reset in 30 seconds. You can start again using
                    the button below.
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
