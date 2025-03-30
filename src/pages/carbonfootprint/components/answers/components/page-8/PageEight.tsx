import React, { useEffect, useState } from 'react'

// Background
import DefaultBackground from '../DefaultBackground';

// Translation
import { useTranslation } from 'react-i18next';

// Components
import Automobile from './components/Automobile';
import Motorcycle from './components/Motorcycle';
import Bicycle from './components/Bicycle';

// Nav Component
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from '@/core/AppAsset';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  personalTransports?: string[];
  personalTransportArray: { id: number, name: string, isSelected: boolean }[];
}

export default function PageEight({ setPage, personalTransportArray }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const [selectedComponent, setSelectedComponent] = useState(0);
  const [sortedTransports, setSortedTransports] = useState<string[]>([]);

  const [currentSection, setCurrentSection] = useState(1);

  const renderComponent = (label: string) => {
    switch (label) {
      case 'automobile':
        return <Automobile />;
      case 'motor-cycle':
        return <Motorcycle />;
      case 'bicycle':
        return <Bicycle />;
      default:
        return null;
    }
  };

  const handleNextPage = () => {
    const selectedCount = personalTransportArray.filter(transport => transport.isSelected).length;

    if (currentSection == selectedCount) {
      setPage(9);
      socket?.emit("page-next-server", JSON.stringify({
        nextPage: 9,
        room: room,
      }));
    } else {
      socket?.emit("page-next-component-server", JSON.stringify({
        nextPage: 9,
        room: room,
        currComponent: selectedComponent,
        nextComponent: selectedComponent + 1,
      }));
      setCurrentSection((prev) => prev + 1);
      setSelectedComponent((prev) => prev + 1);
    }
  }

  const handlePrevPage = () => {
    if (currentSection == 1) {
      setPage(7);
      socket?.emit("page-prev-server", JSON.stringify({
        prevPage: 7,
        room: room,
      }))
    } else {
      socket?.emit("page-prev-component-server", JSON.stringify({
        prevPage: 7,
        room: room,
        currComponent: selectedComponent,
        prevComponent: selectedComponent - 1,
      }));
      setCurrentSection((prev) => prev - 1);
      setSelectedComponent((prev) => prev - 1);
    }
  }


  useEffect(() => {
    const selectedCount = personalTransportArray.filter(transport => transport.isSelected).length;
    if (selectedCount === 0) {
      setPage(9);
      socket?.emit("page-next-server", JSON.stringify({
        nextPage: 9,
        room: room,
      }));
      return;
    }

    // Filter and sort the transports according to the predefined order and isSelected property
    const sorted = personalTransportArray
      .filter(transport => transport.isSelected)
      .map(transport => transport.name);

    setSortedTransports(sorted);
  }, [personalTransportArray]);

  return (
    <DefaultBackground currPage={8}>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {renderComponent(sortedTransports[selectedComponent])}
        <div className='absolute bottom-0 right-0'>
          <ChangePageFunction
            handleNextPage={handleNextPage}
            handlePrevPage={handlePrevPage} />
        </div>
      </div>
    </DefaultBackground>
  )
}

interface IChangePageFunction {
  handleNextPage: () => void;
  handlePrevPage: () => void;
}

const ChangePageFunction = ({ handleNextPage, handlePrevPage }: IChangePageFunction) => {
  const { t } = useTranslation();
  const sectionLanguage = JSON.parse(localStorage.getItem("language") || "");


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
        onClick={handleNextPage}
        className='md:w-[159.32px] md:h-[100px] border border-primary rounded-full bg-transparent text-primary flex flex-row items-center justify-center gap-3 px-6 py-3'>
        <p className='text-lg md:text-[34.56px] font-semibold'>{t("carbon.skip", { lng: sectionLanguage.carbon })}</p>
      </button>

      {/* Next Button */}
      <button
        onClick={handleNextPage}
        className='md:w-[221.32px] md:h-[100px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
        <p className='text-lg md:text-[34.56px] font-semibold'>{t("carbon.next", { lng: sectionLanguage.carbon })}</p>
        <img
          src={AppAsset.RightArrowIcon}
          className="w-6 md:w-10 h-auto object-contain" />
      </button>
    </div>
  );
}