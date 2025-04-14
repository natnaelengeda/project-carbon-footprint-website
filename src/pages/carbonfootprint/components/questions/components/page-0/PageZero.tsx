
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Socket.io
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from "@/core/AppAsset";

// Validate Questions
import { useDispatch } from "react-redux";
import { clearEverything } from "@/state/carbon";
import CarbonLanguage from "@/utils/carbonLanguage";
import toast from "react-hot-toast";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageZero({ setPage }: Props) {
  const [language, setLanguage] = useState("english");
  const mode = localStorage.getItem("page_mode");
  const dispatch = useDispatch();

  // React Language Packaged;
  const { t } = useTranslation();
  const [sectionLanguage, setSectionLanguage] = useState({
    carbon: "en",
    pledge: "en"
  });

  // Socket
  const socket = useSocket();

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

  useEffect(() => {
    const handleLanguageChange = (data: any) => {
      toast("Change Language Socket");

      const parseData = JSON.parse(data);

      const language = parseData.language === "አማርኛ" ? "አማርኛ" : "english";
      setLanguage(language);

      if (parseData.language === "አማርኛ") {
        changeLanguage("carbon", "am");
      } else {
        changeLanguage("carbon", "en");
      }
    };

    // Attach the event listener
    socket?.on("language-change-option-client", handleLanguageChange);

    // Cleanup: remove the listener when the component unmounts
    return () => {
      socket?.off("language-change-option-client", handleLanguageChange);
    };
  }, [mode, socket]);


  // Recieve Updated From Server
  useEffect(() => {

    // Change Page 
    socket?.on("change-page-client-1", () => {
      toast("Change-Page Client 1");
      setPage(1);
    });
  }, [socket]);

  const choices = [
    {
      id: 0,
      label: "english",
      name: "English",
      isSelected: language === "english"
    },
    {
      id: 1,
      label: "አማርኛ",
      name: "አማርኛ",
      isSelected: language === "amharic"
    }
  ]

  useEffect(() => {
    dispatch(clearEverything());
    // window.setScreenSize(520,960)
    window.resizeTo(1080, 1920);
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.BackgroundVertical})`,
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
          backgroundColor: "rgba(0, 0, 0, 0.4)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}
      />
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 font-Urbanist">

        {/* Center */}
        <div
          className='w-full flex flex-col items-center justify-center gap-7'>

          {/* Title */}
          <div className="flex flex-col items-center justify-start gap-2 md:gap-[11px]">
            <img
              src={AppAsset.Logo}
              style={{
                width: '120px',
                height: '304px',
              }}
              className="h-auto object-contain" />
            <div className="flex flex-col items-center justify-center gap-1">
              <p
                className="text-4xl md:text-[64px] font-semibold text-white text-center">
                <CarbonLanguage name="project_title_1" />
              </p>
            </div>
          </div>

          <p className="text-white text-2xl md:text-[44px]">
            {t("carbon.choose_language", { lng: sectionLanguage.carbon })}
          </p>
          <span
            className="hidden flex-col items-center justify-center text-3xl text-white">
            <p>{`Height: ${window.innerHeight}`}</p>
            <p>{`Width: ${window.innerWidth}`}</p>
          </span>

          {/* Choice */}
          <div
            className="w-full md:w-[640px] flex flex-col items-start justify-start gap-10 md:gap-[80px] md:pt-[10px] md:px-0 text-white px-6">
            {
              choices.map((choice, index) => (
                <ChoiceButton
                  key={index}
                  choice={choice}
                  index={index}
                  selectedLanguage={language} />
              ))}
          </div>

          {/* Choosen Lanuage */}
          <div>
            <p className="absolute bottom-0 left-0 w-full mx-auto flex items-center justify-center text-white text-2xl md:text-[44px] pt-24 pb-[175px] gap-4">
              <span
                className="font-bold text-primary">
                {language == "english" || language == "English" ? "English" : "አማርኛ"}
              </span>
              <CarbonLanguage name="isTheSelectedLanguage" />
            </p>
          </div>

        </div>
      </div>
    </div>
  )
}

const ChoiceButton = ({ choice, index, selectedLanguage }: { choice: any, index: number, selectedLanguage: string }) => {
  return (
    <button
      key={index}
      onClick={choice.onClick}
      className={`w-full h-[4.6rem] md:w-[600px] md:h-[60px]  border border-primary flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px] rounded-lg ${choice.label == selectedLanguage ? "border-4 bg-primary" : "bg-transparent"}`}>
      <img
        src={choice.label == selectedLanguage ? AppAsset.RadioOneWHite : AppAsset.RadioOffIcon}
        className="w-7 h-auto object-contain" />
      <p
        className={`text-2xl md:text-[36px] ${choice.isSelected ? "font-bold" : ""}`}>
        {choice.name}
      </p>
    </button>
  )
}
