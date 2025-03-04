import { useEffect, useState } from "react";

// Layout
import Layout from "../Layout";

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
    pledge: "en",
  });

  // Change language for a specific section
  const changeLanguage = (section: string, lang: string) => {
    const updatedLanuages = { ...sectionLanguage, [section]: lang };
    setSectionLanguage(updatedLanuages);
    localStorage.setItem("language", JSON.stringify(updatedLanuages));
  };

  const changeToEnglish = () => {
    setLanguage("english");
    changeLanguage("pledge", "en");
  };

  const changeToAmharic = () => {
    setLanguage("amharic");
    changeLanguage("pledge", "am");
  };

  useEffect(() => {
    changeLanguage("pledge", "en");
  }, []);

  return (
    <Layout>
      <div className="relative w-full h-full min-h-screen flex flex-col items-center justify-start pt-10 md:pt-[120px] gap-20  z-10 text-white font-Urbanist">

        {/* Title */}
        <div className="flex flex-col items-center justify-start gap-2 md:gap-[55px]">
          <img
            src={AppAsset.Logo}
            className="md:[150px] h-auto object-contain"
          />
          <div className="w-[32rem] mx-auto">
            <p
              style={{
                lineHeight: 1
              }}
              className="text-2xl md:text-[80px] font-semibold text-center">
              {t("pledge.welcome", { lng: sectionLanguage.pledge })}
            </p>
          </div>

          {/* Choose Language */}
          <div className="w-auto mx-auto mt-40">
            <p className="text-[64px]">
              {t("pledge.choose_language", { lng: sectionLanguage.pledge })}
            </p>

          </div>
        </div>

        {/* Choice */}
        <div className="w-full md:w-[640px] flex flex-col items-start justify-start gap-7 md:gap-[80px] px-3 md:px-0">
          <CustomButton
            functions={changeToEnglish}
            language={lanuage}
            currLanuage="english"
            viewLanguage="English"
          />

          <CustomButton
            functions={changeToAmharic}
            language={lanuage}
            currLanuage="amharic"
            viewLanguage="አማርኛ"
          />
        </div>

        {/* Start Button */}
        <div className="w-full flex items-center justify-center pt-28 md:pt-[200px]">
          <button
            onClick={() => setPage(1)}
            className="bg-primary hover:opacity-70 flex flex-row items-center justify-end md:w-[650px] md:h-[88.9px] rounded-full gap-3 md:gap-[235.4px] md:px-[26.45px] px-5 py-3"
          >
            <p className="font-semibold text-2xl md:text-[30px] text-white">
              {t("pledge.start", { lng: sectionLanguage.pledge })}
            </p>
            <img
              src={AppAsset.RightArrowIcon}
              className="w-5 md:w-[36px] h-auto object-contain"
            />
          </button>
        </div>
      </div>
    </Layout>
  );
}

const CustomButton = ({
  functions,
  language,
  currLanuage,
  viewLanguage,
}: any) => {
  return (
    <button
      onClick={functions}
      className={`w-full h-20 md:w-[650px] md:h-[88px] 3xl:w-[800px] 3xl:h-[150px]  flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px] border-2 border-[#35D36A] rounded-lg ${language == currLanuage ? "bg-[#35D36A] " : ""
        }`}
    >
      <img
        src={
          language == currLanuage
            ? AppAsset.RadioOneWHite
            : AppAsset.RadioOffIcon
        }
        className="w-7 h-auto object-contain"
      />
      <p
        className={`text-2xl md:text-[36px] 3xl:text-[50px] ${language == currLanuage ? "font-bold" : ""
          }`}
      >
        {viewLanguage}
      </p>
    </button>
  );
};
