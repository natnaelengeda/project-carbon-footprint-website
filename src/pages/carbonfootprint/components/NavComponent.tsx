import React from 'react';

// Redux
import { useSelector } from 'react-redux';
import { CarbonState } from '@/state/carbon';

// Socket
import { useSocket } from '@/context/SocketProvider';

// App Asset
import AppAsset from '@/core/AppAsset'

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  func?: () => boolean;
  prevPage: number;
  nextPage: number;
  currPage?: number;
  noOfPages?: number;
  selectedComponent?: number;
  setSelectedComponent?: any;
}

export default function NavComponent({ setPage, func, currPage, nextPage, prevPage, noOfPages, selectedComponent, setSelectedComponent }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const carbonData = useSelector((state: { carbon: CarbonState }) => state.carbon);

  const socketNextPage = () => {
    if (currPage == 1) {
      if (!func) {
        socket?.emit("page-next-server", JSON.stringify({
          id: carbonData.id,
          name: carbonData.name,
          func: func,
          currPage: currPage,
          nextPage: nextPage,
          room: room,
        }));
      } else {
        socket?.emit("page-next-server", JSON.stringify({
          nextPage: nextPage,
          room: room,
        }));
      }
    } else if (currPage == 8 || currPage == 9) {
      if (noOfPages == 1) {
        socket?.emit("page-next-server", JSON.stringify({
          nextPage: nextPage,
          room: room,
        }));
      } else {
        if (selectedComponent! >= noOfPages!) {
          socket?.emit("page-next-server", JSON.stringify({
            nextPage: nextPage,
            room: room,
          }));
        } else {
          socket?.emit("page-next-component-server", JSON.stringify({
            nextPage: nextPage,
            room: room,
            currComponent: selectedComponent
          }));
        }
      }
    } else {
      socket?.emit("page-next-server", JSON.stringify({
        nextPage: nextPage,
        room: room,
      }));
    }
  }

  const socketSkipPage = () => {
    if (currPage == 1) {
      socket?.emit("page-skip-server", JSON.stringify({
        id: carbonData.id,
        name: carbonData.name,
        func: func,
        currPage: currPage,
        nextPage: nextPage,
        room: room,
      }))
    } else {
      socket?.emit("page-skip-server", JSON.stringify({
        nextPage: nextPage,
        room: room
      }))
    }
  }

  const socketPreviousPage = () => {
    if (currPage == 8 || currPage == 9) {
      if (noOfPages == 1) {
        socket?.emit("page-prev-server", JSON.stringify({
          prevPage: prevPage,
          room: room,
        }))
      } else {
        if (selectedComponent == 0) {
          socket?.emit("page-prev-server", JSON.stringify({
            prevPage: prevPage,
            room: room,
          }))
        } else {
          setSelectedComponent(selectedComponent! - 1);
          socket?.emit("page-prev-component-server", JSON.stringify({
            nextPage: nextPage,
            room: room,
            currComponent: selectedComponent
          }));
        }
      }
    } else {
      socket?.emit("page-prev-server", JSON.stringify({
        prevPage: prevPage,
        room: room,
      }))
    }
  }

  const handlePrevPage = () => {
    socketPreviousPage();
    if (currPage == 8 || currPage == 9) {
      if (noOfPages == 1) {
        setPage(prevPage);
      } else {
        if (selectedComponent == 0) {
          setPage(prevPage);
        } else {
          setSelectedComponent(selectedComponent! - 1);
        }
      }
    } else {
      setPage(prevPage);
    }
  }

  const handleSkipPage = () => {
    if (currPage == 8 || currPage == 9) {
      if (noOfPages == 1) {
        setPage(nextPage);
      } else {
        if (selectedComponent! >= noOfPages!) {
          setPage(nextPage);
        } else {
          setSelectedComponent(selectedComponent! + 1);
        }
      }
    } else {
      setPage(nextPage);
      socketSkipPage();
    }
  }

  const handleNextPage = () => {
    socketNextPage();
    if (currPage == 8 || currPage == 9) {
      if (noOfPages == 1) {
        setPage(nextPage);
      } else {
        if (selectedComponent! >= noOfPages!) {
          setPage(nextPage);
        } else {
          setSelectedComponent(selectedComponent! + 1);
        }
      }
    } else {
      setPage(nextPage);
    }
  }


  return (
    <div
      className='w-full h-80 flex items-center justify-end px-5 md:px-40 gap-3 md:gap-[32px] pb-10 md:pb-0'>

      {/* Back Button */}
      <button
        onClick={handlePrevPage}
        className={
          `w-10 h-10 md:w-[100px] md:h-[100px] flex rounded-full border border-primary items-center justify-center p-2 md:p-0`
        }>
        <img
          src={AppAsset.LeftArrowIcon}
          className='w-20 h-auto object-contain md:w-[40.56px] md:h-[40.56px]' />
      </button>

      {/* Skip Button */}
      <button
        onClick={handleSkipPage}
        className='md:w-[159.32px] md:h-[100px] border border-primary rounded-full bg-transparent text-primary flex flex-row items-center justify-center gap-3 px-6 py-3'>
        <p className='text-lg md:text-[34.56px] font-semibold'>Skip</p>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNextPage}
        className='md:w-[221.32px] md:h-[100px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
        <p className='text-lg md:text-[34.56px] font-semibold'>Next</p>
        <img
          src={AppAsset.RightArrowIcon}
          className="w-6 md:w-10 h-auto object-contain" />
      </button>
    </div>
  )
}