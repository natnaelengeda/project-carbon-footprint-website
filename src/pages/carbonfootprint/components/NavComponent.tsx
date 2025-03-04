import React, { useEffect, useState } from 'react';

// Translation
// import { useTranslation } from 'react-i18next';

// Socket
import { useSocket } from '@/context/SocketProvider';

// App Asset
import AppAsset from '@/core/AppAsset';


interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  // func: () => boolean;
  prevPage: number;
  nextPage: number;
  // sections?: number;
  // section?: number;
  // setSection?: React.Dispatch<React.SetStateAction<number>>;
}

export default function NavComponent({ setPage, nextPage, prevPage }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const socketNextPage = () => {
    socket?.emit("page-next-server", JSON.stringify({
      nextPage: nextPage,
      room: room,
    }));
  }

  const socketPreviousPage = () => {
    socket?.emit("page-prev-server", JSON.stringify({
      prevPage: prevPage,
      room: room,
    }))
  }

  const socketSkipPage = () => {
    socket?.emit("page-skip-server", JSON.stringify({
      nextPage: nextPage,
      room: room
    }))
  }

  return (
    <div
      className='w-full h-80 flex items-center justify-end px-5 md:px-40 gap-3 md:gap-[32px] pb-10 md:pb-0'>

      {/* Back Button */}
      <button
        onClick={() => {
          //   if (section != null) {
          //     if (section == 1) {
          setPage(prevPage);
          socketPreviousPage();
          //     } else {
          //       setSection!(section! - 1);
          //     }
          //   } else {
          //     setPage(prevPage);
          //   }
        }}
        className={
          `w-10 h-10 md:w-[100px] md:h-[100px] flex rounded-full border border-primary items-center justify-center p-2 md:p-0`
        }>
        {/* className={
          `w-10 h-10 md:w-[100px] md:h-[100px] rounded-full border border-primary 
          ${prevPage == 1 ? "hidden" : "flex"}
           items-center justify-center p-2 md:p-0`
        }> */}
        <img
          src={AppAsset.LeftArrowIcon}
          className='w-20 h-auto object-contain md:w-[40.56px] md:h-[40.56px]' />
      </button>

      {/* Skip Button */}
      <button
        onClick={() => {
          //   if (sections != null) {
          //     if (section == sections) {
          setPage(nextPage);
          socketSkipPage();
          //     } else {
          //       setSection!(section! + 1);
          //     }
          //   } else {
          //     setPage(nextPage);
          //   }
        }}
        className='md:w-[159.32px] md:h-[100px] border border-primary rounded-full bg-transparent text-primary flex flex-row items-center justify-center gap-3 px-6 py-3'>
        <p className='text-lg md:text-[34.56px] font-semibold'>Skip</p>
      </button>

      {/* Next Button */}
      <button
        onClick={() => {

          //   if (sections != null) {
          //     if (section == sections) {
          setPage(nextPage);
          socketNextPage();
          //       setIsNextCliked(true);
          //     } else {
          //       setSection!(section! + 1);
          //     }
          //   } else {
          //     setPage(nextPage);
          //   }
        }}
        className='md:w-[221.32px] md:h-[100px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
        <p className='text-lg md:text-[34.56px] font-semibold'>Next</p>
        <img
          src={AppAsset.RightArrowIcon}
          className="w-6 md:w-10 h-auto object-contain" />
      </button>
    </div>
  )
}