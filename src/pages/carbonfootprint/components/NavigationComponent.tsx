
// Translation
import { useTranslation } from 'react-i18next';

// App Asset
import AppAsset from '@/core/AppAsset';
import { useSocket } from '@/context/SocketProvider';
import { useEffect, useState } from 'react';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  func: () => boolean;
  prevPage: number;
  nextPage: number;
  sections?: number;
  section?: number;
  setSection?: React.Dispatch<React.SetStateAction<number>>;
}

export default function NavigationComponent({ setPage, prevPage, nextPage, sections, section, setSection }: Props) {
  const [isNextClicked, setIsNextCliked] = useState(false);
  const [isPrevClicked, setIsPrevClicked] = useState(false);

  const room = localStorage.getItem("room");

  // React Language Packaged;
  const { t } = useTranslation();
  const savedlanguages = JSON.parse(localStorage.getItem("language") || "");

  const socket = useSocket();


  socket?.emit("change-page", JSON.stringify({

  }));

  useEffect(() => {
    if (isNextClicked) {
      socket?.emit("change-page-next", JSON.stringify({
        pageName: nextPage,
        room: room
      }));
    }
    if (isPrevClicked) {
      socket?.emit("change-page-prev", JSON.stringify({
        pageName: prevPage,
        room: room
      }));
    }

  }, [isNextClicked, isPrevClicked]);

  return (
    <div
      className='w-full h-80 flex items-center justify-end px-5 md:px-40 gap-3 md:gap-[32px] pb-10 md:pb-0'>

      {/* Back Button */}
      <button
        onClick={() => {
          if (section != null) {
            if (section == 1) {
              setPage(prevPage);
            } else {
              setSection!(section! - 1);
            }
          } else {
            setPage(prevPage);
          }
        }}
        className={`w-10 h-10 md:w-[100px] md:h-[100px] rounded-full border border-primary ${prevPage == 1 ? "hidden" : "flex"} items-center justify-center p-2 md:p-0`}>
        <img
          src={AppAsset.LeftArrowIcon}
          className='w-20 h-auto object-contain md:w-[40.56px] md:h-[40.56px]' />
      </button>

      {/* Skip Button */}
      <button
        onClick={() => {

          if (sections != null) {
            if (section == sections) {
              setPage(nextPage);
            } else {
              setSection!(section! + 1);
            }
          } else {
            setPage(nextPage);
          }
        }}
        className='md:w-[159.32px] md:h-[100px] border border-primary rounded-full bg-white text-primary flex flex-row items-center justify-center gap-3 px-6 py-3'>
        <p className='text-lg md:text-[34.56px] font-semibold'>{t("carbon.skip", { lng: savedlanguages.carbon })}</p>
      </button>

      {/* Next Button */}
      <button
        onClick={() => {

          if (sections != null) {
            if (section == sections) {
              setPage(nextPage);
              setIsNextCliked(true);
            } else {
              setSection!(section! + 1);
            }
          } else {
            setPage(nextPage);
          }
        }}
        className='md:w-[221.32px] md:h-[100px] rounded-full bg-primary text-white flex flex-row items-center justify-center gap-3 px-6 py-3'>
        <p className='text-lg md:text-[34.56px] font-semibold'>{t("carbon.next", { lng: savedlanguages.carbon })}</p>
        <img
          src={AppAsset.RightArrowIcon}
          className="w-6 md:w-10 h-auto object-contain" />
      </button>
    </div>
  )
}
