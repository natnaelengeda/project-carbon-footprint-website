import { useEffect, useState } from "react";

import { useTranslation } from "react-i18next";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageZero({ setPage }: Props) {
  const [lanuage, setLanguage] = useState<string>("english");

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
      className="w-full h-full min-h-screen flex flex-col items-center justify-start pt-10 md:pt-[74px] gap-20 md:gap-[236px]">

      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }}
      />

      <div className="w-full relative z-10  h-full min-h-screen flex flex-col items-center justify-start pt-10 gap-20 md:gap-[281px]">

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

        {/* Choice */}
        <div
          className="w-full md:w-[640px] flex flex-col items-start justify-start gap-10 md:gap-[80px] px-3 md:px-0 text-white">
          <button
            onClick={() => {
              setLanguage("english");
              changeLanguage("carbon", "en");
            }}
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
            onClick={() => {
              setLanguage("amharic");
              changeLanguage("carbon", "am");
            }}
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
        <div className="w-full flex items-center justify-center pt-28 md:pt-[302px]">
          <button
            onClick={() => setPage(1)}
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
