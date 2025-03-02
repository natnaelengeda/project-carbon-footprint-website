
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
  const [language, setLanguage] = useState("English");
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
        const language = parseData.language == "amharic" ? "አማርኛ" : "English";
        setLanguage(language);

        if (parseData.language == "amharic") {
          changeLanguage("carbon", "am");
        } else {
          changeLanguage("carbon", "en");
        }
      }
      // console.log(parseData);
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
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px]">


        {/* Center */}
        <div
          className='w-full flex flex-col items-center justify-center gap-14 pt-[186px]'>

          {/* Title */}
          <div className="flex flex-col items-center justify-start gap-2 md:gap-[111px]">
            <img
              src={AppAsset.Logo}
              style={{
                width: '146px',
                height: '222px',
              }}
              className="h-auto object-contain" />
            <p
              className="text-2xl md:text-[64px] font-semibold text-white">
              {t("carbon.choose_language", { lng: sectionLanguage.carbon })}
            </p>
          </div>

          {/* Answer */}
          <div className="flex flex-col items-center justify-center gap-2 pt-80">
            <span className="px-10 py-10 bg-primary rounded-xl">
              <p
                className="text-white text-2xl md:text-[64px] font-semibold">
                {language}
              </p>
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}