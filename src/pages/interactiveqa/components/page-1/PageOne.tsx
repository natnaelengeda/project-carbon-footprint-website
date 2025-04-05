import { useState, useEffect } from 'react';

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
  // const isKeyPressed = useRef(false);
  // const [key, setKey] = useState(null);
  const [gamepadConnected, setGamepadConnected] = useState(false)

  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    qa: "en"
  }));

  const [language, setLanguage] = useState(savedlanguages);
  const { t } = useTranslation();

  // useEffect(() => {
  //   if (isKeyPressed.current) {
  //     console.log(key);
  //     setPage(2)
  //   }
  // }, [isKeyPressed.current]);

  // Check Joystick Connectivity
  useEffect(() => {
    let gamepadCheckInterval: NodeJS.Timeout

    const checkGamepad = () => {
      const gamepads = navigator.getGamepads()
      const gamepad = gamepads[0]

      if (gamepad) {
        setGamepadConnected(true)

        // Detect if buttons were just pressed (to avoid repeated actions)
        const buttonPressed = (index: number) => {
          return gamepad.buttons[index]?.pressed
        }

        if (buttonPressed(0)) {
          setPage(2);
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
          className="flex flex-col items-center justify-center gap-5 md:gap-28">
          <img
            src={AppAsset.Logo}
            width={100}
            height={100}
            className="object-contain" />
          <div
            className="h-auto flex flex-col items-center justify-start gap-5 md:gap-5 text-[40px]">
            <p className="text-2xl md:text-[40px] font-semibold">{t("qa.welcome_to_interactive", { lng: language.qa })}</p>
            <p className="text-2xl md:text-[40px] font-semibold">{t("qa.qa", { lng: language.qa })}</p>
          </div>
        </div>

        {gamepadConnected && (
          <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
            Gamepad Connected
          </div>
        )}

        {/* Buttons */}
        <div
          className="w-auto flex flex-col items-center justify-start gap-10 pt-10 md:pt-[10rem] pb-10 md:pb-0">
          <button
            onClick={() => {
              setPage(2);
            }}
            style={{
              width: "350px",
              height: "80px",
            }}
            className=" bg-primary text-white font-semibold rounded-full text-lg md:text-[30px] px- py-4 hover:opacity-80 flex items-center justify-center gap-3 px-5 md:px-0">
            {t("qa.press_x_to_start", { lng: language.qa })}
            <img
              src={AppAsset.RightArrowIcon}
              className="w-5 md:w-10 h-auto object-contain" />
          </button>
        </div>
      </div>
    </QABackground>
  )
}
