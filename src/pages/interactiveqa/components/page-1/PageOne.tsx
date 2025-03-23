import { useState, useRef, useEffect } from 'react';

// Layout
import QABackground from '../QABackground';

// Translation
import { useTranslation } from 'react-i18next';

// AppAsset
import AppAsset from "@/core/AppAsset";

// Import Swiper styles
import 'swiper/css';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageOne({ setPage }: Props) {
  const isKeyPressed = useRef(false);
  const [key, setKey] = useState(null);

  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    qa: "en"
  }));

  const [language, setLanguage] = useState(savedlanguages);
  const { t } = useTranslation();

  useEffect(() => {
    if (isKeyPressed.current) {
      console.log(key);
      setPage(2)
    }
  }, [isKeyPressed.current]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      isKeyPressed.current = true;
      setKey(event.key);
    };

    const handleKeyUp = () => {
      isKeyPressed.current = false;
      setKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLanguage((prevLanguage: any) => ({
        qa: prevLanguage.qa === "en" ? "am" : "en"
      }));
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <QABackground
      page={1}
      setPage={setPage}>
      <div
        onKeyDown={() => {
          setPage(2)
        }}
        className="relative w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-20 z-10">

        {/* Top Content */}
        <div
          style={{
            paddingTop: "20px"
          }}
          className="flex flex-col items-center justify-center gap-5 md:gap-40">
          <img
            src={AppAsset.Logo}
            width={180}
            height={180}
            className="object-contain" />
          <div
            className="h-auto flex flex-col items-center justify-start gap-5 md:gap-16 text-[40px]">
            <p className="text-2xl md:text-[70px] font-semibold">{t("qa.welcome_to_interactive", { lng: language.qa })}</p>
            <p className="text-2xl md:text-[70px] font-semibold">{t("qa.qa", { lng: language.qa })}</p>
          </div>
        </div>

        {/* Buttons */}
        <div
          className="w-auto flex flex-col items-center justify-start gap-10 pt-10 md:pt-[10rem] pb-10 md:pb-0">
          <button
            onClick={() => {
              setPage(2);
            }}
            style={{
              width: "250px",
              height: "100px",
            }}
            className=" bg-primary text-white font-semibold rounded-full text-lg md:text-[30px] px- py-4 hover:opacity-80 flex items-center justify-center gap-3 px-5 md:px-0">
            {t("qa.start_now", { lng: language.qa })}
            <img
              src={AppAsset.RightArrowIcon}
              className="w-5 md:w-10 h-auto object-contain" />
          </button>
        </div>
      </div>
    </QABackground>
  )
}
