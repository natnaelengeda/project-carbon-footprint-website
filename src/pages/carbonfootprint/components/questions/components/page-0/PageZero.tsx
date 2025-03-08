
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

// Socket.io
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from "@/core/AppAsset";

// Validate Questions
import { ValidateQuestions } from "@/pages/carbonfootprint/components/questions/components/VallidateQuestions";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageZero({ setPage }: Props) {
  const [language, setLanguage] = useState("english");
  const mode = localStorage.getItem("page_mode");

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


  // Recieve Updated From Server
  useEffect(() => {
    socket?.on("language-change-option-client", (data) => {
      const parseData = JSON.parse(data);
      const check = ValidateQuestions(mode, parseData.mode);

      if (check) {
        const language = parseData.language == "አማርኛ" ? "አማርኛ" : "english";
        setLanguage(language);

        if (parseData.language == "አማርኛ") {
          changeLanguage("carbon", "am");
        } else {
          changeLanguage("carbon", "en");
        }
      }
    });


    // Change Page 
    socket?.on("change-page-client-1", (data) => {
      const parseData = JSON.parse(data);
      const check = ValidateQuestions(mode, parseData.mode);

      if (check) {
        setPage(1);
      }
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
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 font-Urbanist">


        {/* Center */}
        <div
          className='w-full flex flex-col items-center justify-center gap-14 pt-[125px]'>

          {/* Title */}
          <div className="flex flex-col items-center justify-start gap-2 md:gap-[111px]">
            <img
              src={AppAsset.Logo}
              style={{
                width: '200px',
                height: '304px',
              }}
              className="h-auto object-contain" />
            <div className="flex flex-col items-center justify-center gap-10">
              <p
                className="text-2xl md:text-[64px] font-semibold text-white">
                {t("carbon.welcome_to", { lng: sectionLanguage.carbon })}
              </p>
              <p
                className="text-2xl md:text-[64px] font-semibold text-white">
                {t("carbon.carbon_footprint", { lng: sectionLanguage.carbon })}
              </p>
            </div>
          </div>

          <p className="text-white text-2xl md:text-[44px] pt-20">
            {t("carbon.language", { lng: sectionLanguage.carbon })}
          </p>

          {/* Choice */}
          <div
            className="w-full md:w-[640px] flex flex-col items-start justify-start gap-10 md:gap-[80px] md:pt-[107px] px-3 md:px-0 text-white">
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
            <p className="absolute bottom-0 left-0 w-full mx-auto flex items-center justify-center text-white text-2xl md:text-[44px] pt-20 pb-[175px] gap-4">
              <span
                className="font-bold text-primary">
                {language == "english" || language == "English" ? "English" : "አማርኛ"}
              </span>
              {t("carbon.isTheSelectedLanguage", { lng: sectionLanguage.carbon })}
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
      className={`w-full h-20 md:w-[650px] md:h-[88px]  border border-primary flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px] rounded-lg ${choice.label == selectedLanguage ? "border-4 bg-primary" : "bg-transparent"}`}>
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
