import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

// Socket.io
import { useSocket } from "@/context/SocketProvider";

// AppAsset
import AppAsset from "@/core/AppAsset";
import { useDispatch } from "react-redux";
import { clearEverything } from "@/state/carbon";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageZero({ setPage }: Props) {
  const [lanuage, setLanguage] = useState<string>("english");
  const room = localStorage.getItem("room");
  const mode = localStorage.getItem("page_mode");
  const dispatch = useDispatch();

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
      language: "አማርኛ",
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
      room: room,
    }));
  }

  const choices = [
    {
      id: 0,
      label: "English",
      onClick: changeToEnglish,
      isSelected: lanuage === "english"
    },
    {
      id: 1,
      label: "አማርኛ",
      onClick: changeToAmharic,
      isSelected: lanuage === "amharic"
    }
  ]

  useEffect(() => {
    dispatch(clearEverything());
  }, []);


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

      <div className="absolute top-0 left-0 pt-[74px] pl-[99px] w-full h-full flex items-start justify-start z-10">
        <img
          src={AppAsset.Logo}
          style={{
            width: '120px',
            height: '167px',
          }}
          className="h-auto object-contain" />
      </div>

      <div
        className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:pt-[184px] font-Urbanist">

        {/* Title  */}
        <div
          className="w-full flex flex-col items-center justify-start gap-5 md:gap-[111px]">
          <p className="text-white text-2xl md:text-[64px] font-bold">
            {t("carbon.welcome_to_carbon_footprint", { lng: sectionLanguage.carbon })}
          </p>
          <p
            className="text-white text-2xl md:text-[44px] font-bold">
            {t("carbon.choose_language", { lng: sectionLanguage.carbon })}
          </p>
        </div>

        {/* Choice */}
        <div
          className="w-full md:w-[640px] flex flex-col items-start justify-start gap-10 md:gap-[80px] md:pt-[107px] px-3 md:px-0 text-white">
          {
            choices.map((choice, index) => (
              <ChoiceButton
                key={index}
                choice={choice}
                index={index} />
            ))}
        </div>

        {/* Start Button */}
        <div
          className="w-full flex items-center justify-end pt-28 md:pt-[108px]">
          <button
            onClick={changePage}
            className="bg-primary hover:opacity-70 flex flex-row items-center justify-end md:w-[303px] md:h-[100px] rounded-full gap-3 md:gap-[45px] md:pl-[26.45px] px-10 py-3">
            <p
              className="font-semibold text-2xl md:text-[34px] text-white">
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

const ChoiceButton = ({ choice, index }: { choice: any, index: number }) => {
  return (
    <button
      key={index}
      onClick={choice.onClick}
      className={`w-full h-20 md:w-[650px] md:h-[88px]  border border-primary flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px] rounded-lg ${choice.isSelected ? "border-4 bg-primary" : "bg-transparent"}`}>
      <img
        src={choice.isSelected ? AppAsset.RadioOneWHite : AppAsset.RadioOffIcon}
        className="w-7 h-auto object-contain" />
      <p
        className={`text-2xl md:text-[36px] ${choice.isSelected ? "font-bold" : ""}`}>
        {choice.label}
      </p>
    </button>
  )
}
