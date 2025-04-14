import { useState, useEffect } from 'react';

import { Oval } from 'react-loader-spinner';

// Layout
import QABackground from '../QABackground';

// Components
import LanguageButton from './components/LanguageButton';

// Axios
// import axios from "@/utils/axios";

// AppAsset
import AppAsset from '@/core/AppAsset';

// Toast
// import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';
import { sampleQA } from '@/data/questions';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setQuestions: React.Dispatch<React.SetStateAction<any[]>>;
}

export default function PageTwo({ setPage, setQuestions }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [lanuage, setLanguage] = useState<string>("english");

  const [selected, setSelected] = useState<number>(0);
  const [gamepadConnected, setGamepadConnected] = useState(false);

  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));

  const [sectionLanguage, setSectionLanguage] = useState({
    carbon: "en",
    pledge: "en",
    qa: "en"
  });

  // React Language Packaged;
  const { t } = useTranslation();

  // Change language for a specific section
  const changeLanguage = (section: string, lang: string) => {
    const updatedLanuages = { ...sectionLanguage, [section]: lang };
    setSectionLanguage(updatedLanuages);
    localStorage.setItem("language", JSON.stringify(updatedLanuages));
  }

  const fetchQuestions = () => {
    setLoading(true);
    try {
      // axios.post("/api/v1/question/rnd", {
      //   language: lanuage == "amharic" ? "Amharic" : "English"
      // })
      //   .then((response) => {
      //     const questions = response.data;

      //     if (questions.length == 0) {
      //       toast("No Questions Found");
      //     } else {
      //       toast.success("Questions Succefully Fetched")
      //       setQuestions(response.data);
      //       localStorage.setItem("questions", JSON.stringify(response.data));
      //       setPage(3);
      //     }
      //     setLoading(false);

      //   }).catch((error) => {
      //     setLoading(false);
      //     console.error(error);
      //     toast.error("Questions Fetch Unsuccessful");

      setQuestions(sampleQA);
      setPage(3);
      //   })

    } catch (error) {
      console.error(error);
    }
  }

  // Check Joystick Connectivity
  useEffect(() => {
    let gamepadCheckInterval: NodeJS.Timeout

    const checkGamepad = () => {
      const gamepads = navigator.getGamepads()
      const gamepad = gamepads[0];

      if (gamepad) {
        setGamepadConnected(true);

        // Detect if buttons were just pressed (to avoid repeated actions)
        const buttonPressed = (index: number) => {
          return gamepad.buttons[index]?.pressed
        }

        if (gamepad.axes[1] < -0.5 || buttonPressed(12)) {
          if (selected >= 0) {
            setSelected(0);
            changeToEnglish();
          }
        } else if (gamepad.axes[1] > 0.5 || buttonPressed(13)) {
          if (selected != 1) {
            setSelected(1);
            changeToAmharic();
          }
        }

        if (buttonPressed(0)) {
          fetchQuestions();
        }

      } else {
        setGamepadConnected(false)
      }
    }

    // Check if gamepad is already connected
    if (navigator.getGamepads && navigator.getGamepads()[0]) {
      setGamepadConnected(true)
      gamepadCheckInterval = setInterval(checkGamepad, 100)
    }

    const handleGamepadConnected = () => {
      setGamepadConnected(true)
      gamepadCheckInterval = setInterval(checkGamepad, 100)
    }

    const handleGamepadDisconnected = () => {
      setGamepadConnected(false)
      if (gamepadCheckInterval) clearInterval(gamepadCheckInterval)
    }

    window.addEventListener("gamepadconnected", handleGamepadConnected)
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected)

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected)
      window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected)
      if (gamepadCheckInterval) clearInterval(gamepadCheckInterval)
    }
  }, []);


  useEffect(() => {
    const defaultLanguage = JSON.stringify({
      carbon: "en",
      pledge: "en",
      qa: "en"
    });

    const savedlanguages = JSON.parse(localStorage.getItem("language") || defaultLanguage);

    if (savedlanguages) {
      if (savedlanguages.qa == "am") {
        setLanguage("amharic")
      }
      setSectionLanguage(savedlanguages);
    }
  }, []);

  const changeToEnglish = () => {
    setLanguage("english");
    changeLanguage("qa", "en")
  }

  const changeToAmharic = () => {
    setLanguage("amharic");
    changeLanguage("qa", "am")
  }

  return (
    <QABackground>
      <div className='relative w-full h-full flex flex-col items-center justify-start z-10  md:pt-[140px] 3xl:pt-[550px]'>

        {gamepadConnected && (
          <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
            Gamepad Connected
          </div>
        )}

        {/* Title */}
        <div
          className='relative flex flex-col items-center justify-start gap-1 md:gap-10 3xl:gap-32 font-semibold text-white'>
          <p className='text-2xl md:text-[40px] 3xl:text-[100px]'>{t("qa.welcome_to_interactive", { lng: savedlanguages.qa })}</p>
          <p className='text-2xl md:text-[40px] 3xl:text-[130px]'>{t("qa.qa", { lng: savedlanguages.qa })}</p>
        </div>

        {/* Choose Language */}
        <div className='flex items-center justify-center mt-[30px] 3xl:mt-[120px] text-white'>
          <p className='text-[35px] 3xl:text-[90px]'>{t("qa.choose_language", { lng: savedlanguages.qa })}</p>
        </div>

        {/* Choice */}
        <div
          className="w-full md:w-[640px] flex flex-col items-center justify-start gap-10 md:gap-[40px] px-3 md:px-0 text-white mt-[80px]">
          <LanguageButton
            functions={changeToEnglish}
            selected={selected}
            language={lanuage}
            currLanuage="english"
            viewLanguage="English" />

          <LanguageButton
            functions={changeToAmharic}
            selected={selected}
            language={lanuage}
            currLanuage="amharic"
            viewLanguage="አማርኛ" />

        </div>

        {/* Continue Page */}
        <div className='w-full h-full flex flex-row items-center justify-end pr-[100px] 3xl:pr-[190px] pt-28'>
          <button
            onClick={fetchQuestions}
            className={`text-[19px] 3xl:text-[60px] font-semibold text-white flex flex-row items-center justify-center gap-2 rounded-full min-w-[220px] h-[60px] 3xl:min-w-[500px] 3xl:min-h-[150px]  px-5 transition-all ${loading ? "bg-gray-300" : "bg-primary"} ${selected == 2 ? "border-4 border-white" : ""}`}
            disabled={loading}>
            {
              !loading ? (
                <>
                  <span>{t("qa.press_x_to_start", { lng: savedlanguages.qa })}</span>
                  <img
                    src={AppAsset.RightArrowIcon}
                  />
                </>
              ) :
                (
                  <>
                    <span>{t("qa.loading", { lng: savedlanguages.qa })}...</span>
                    <Oval
                      height="25"
                      width="25"
                      color="#efefef"
                      ariaLabel="oval-loading"
                      strokeWidth={6}
                      wrapperStyle={{
                      }}
                      wrapperClass="" />
                  </>
                )
            }
          </button>
        </div>
      </div>
    </QABackground>
  )
}
