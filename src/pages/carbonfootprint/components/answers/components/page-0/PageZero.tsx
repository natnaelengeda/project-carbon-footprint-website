import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

// Socket.io
import { useSocket } from "@/context/SocketProvider";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageZero({ setPage }: Props) {
  const [lanuage, setLanguage] = useState<string>("english");
  const room = localStorage.getItem("room");
  const mode = localStorage.getItem("page_mode");

  // Socket
  const socket: any = useSocket();

  // React Language Packaged;
  const { t } = useTranslation();
  const [sectionLanguage, setSectionLanguage] = useState({
    carbon: "en",
    pledge: "en"
  });

  // Change language for a specific section
  const changeLanguage = (section: string, lang: string) => {
    const updatedLanuages = { ...sectionLanguage, [section]: lang };
    setSectionLanguage(updatedLanuages);
    localStorage.setItem("language", JSON.stringify(updatedLanuages));
  }

  // Restore Languages On App Load
  useEffect(() => {
    const defaultLanguage = JSON.stringify({
      carbon: "en",
      pledge: "en"
    });

    const savedlanguages = JSON.parse(localStorage.getItem("language") || defaultLanguage);
    if (savedlanguages) {
      if (savedlanguages.carbon == "am") {
        setLanguage("amharic")
      }
      setSectionLanguage(savedlanguages);
    }
  }, []);

  const changeToEnglish = () => {
    setLanguage("english");
    changeLanguage("carbon", "en");

    socket?.emit("language-change-option-server", JSON.stringify({
      language: "english",
      section: "carbon",
      mode: mode,
      page_number: "0",
      room: room
    }));

  }

  const changeToAmharic = () => {
    setLanguage("amharic");
    changeLanguage("carbon", "am");

    socket?.emit("language-change-option-server", JSON.stringify({
      language: "amharic",
      section: "carbon",
      mode: mode,
      page_number: "0",
      room: room
    }));
  }

  const changePage = () => {
    setPage(1);

    socket?.emit("change-page-server-1", JSON.stringify({
      page_number: 1,
      mode: mode,
    }));
  }

  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.Background})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className="w-full h-full min-h-screen font-Urbanist">

      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}
      />

      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-end gap-5 py-10 md:py-[100px]">

        {/* Choice */}
        <div
          className="w-full md:w-[640px] flex flex-col items-start justify-start gap-10 md:gap-[80px] px-3 md:px-0 text-white">
          <button
            onClick={changeToEnglish}
            className={`w-full h-20 md:w-[650px] md:h-[88px] bg-[#35D36A73] flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px] rounded-lg ${lanuage == "english" ? "border-4 border-black" : ""}`}>
            <img
              src={lanuage == "english" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className="w-7 h-auto object-contain" />
            <p
              className={`text-2xl md:text-[36px] ${lanuage == "english" ? "font-bold" : ""}`}>
              English
            </p>

          </button>

          <button
            onClick={changeToAmharic}
            className={`w-full h-20 md:w-[650px] md:h-[88px] bg-[#35D36A73] flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px] rounded-lg ${lanuage == "amharic" ? "border-4 border-black" : ""}`}>
            <img
              src={lanuage == "amharic" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
              className={`w- md:w-7 h-auto object-contain`} />
            <p
              className={`text-2xl md:text-[36px] ${lanuage == "amharic" ? "font-bold" : ""}`}>
              አማርኛ
            </p>
          </button>
        </div>

        {/* Start Button */}
        <div className="w-full flex items-center justify-center pt-28 md:pt-[202px]">
          <button
            onClick={changePage}
            className="bg-primary hover:opacity-70 flex flex-row items-center justify-end md:w-[650px] md:h-[88.9px] rounded-full gap-3 md:gap-[235.4px] md:px-[26.45px] px-5 py-3">
            <p
              className="font-semibold text-2xl md:text-[30px] text-white">
              {/* {t("start")} */}
              {t("carbon.start", { lng: sectionLanguage.carbon })}
            </p>
            <img
              src={AppAsset.RightArrowIcon}
              className="w-5 md:w-[36px] h-auto object-contain" />
          </button>
        </div>

      </div>

    </div>
  )
}