import { useEffect, useState } from "react";

// AppAsset
import AppAsset from "@/core/AppAsset";

interface Props {
  page?: number;
  setPage?: React.Dispatch<React.SetStateAction<number>>;
  children: React.ReactNode;
}

export default function QABack({ page, children, setPage }: Props) {
  const [gamepadConnected, setGamepadConnected] = useState(false)

  // Handle gamepad input
  useEffect(() => {
    let gamepadCheckInterval: NodeJS.Timeout

    const checkGamepad = () => {
      const gamepads = navigator.getGamepads()
      const gamepad = gamepads[0];

      if (gamepad) {
        setGamepadConnected(true)

        // Detect if buttons were just pressed (to avoid repeated actions)
        // const buttonPressed = (index: number) => {
        //   return gamepad.buttons[index]?.pressed
        // }


        // Handle D-pad or left stick for navigation
        // if ((gamepad.axes[1] < -0.5 || buttonPressed(12)) && selectedIndex > 0) {
        //   // Up direction
        //   setSelectedIndex((prev) => prev - 1)
        //   if (selectedIndex === 2) {
        //     // If on Start button, move to language options
        //     setSelectedLanguage("amharic")
        //   } else {
        //     setSelectedLanguage("english")
        //   }
        // } else if (gamepad.axes[1] > 0.5 || buttonPressed(13)) {
        //   // Down direction
        //   if (selectedIndex < 2) {
        //     // If on language options, allow moving down
        //     setSelectedIndex((prev) => prev + 1)
        //     if (selectedIndex === 0) {
        //       setSelectedLanguage("amharic")
        //     }
        //   }
        // }

        // Handle button press (X button on PS4 controller)
        // if (buttonPressed(0)) {
        //   if (selectedIndex === 2) {
        //     // If on Start button
        //     handleStart()
        //   } else {
        //     // If on language option, select it and move to Start button
        //     setSelectedLanguage(selectedIndex === 0 ? "english" : "amharic")
        //     setSelectedIndex(2)
        //   }
        // }

      } else {
        setGamepadConnected(false)
      }
    }

    window.addEventListener("gamepadconnected", () => {
      setGamepadConnected(true)
      gamepadCheckInterval = setInterval(checkGamepad, 100);
      console.log("Connected")
    })

    window.addEventListener("gamepaddisconnected", () => {
      setGamepadConnected(false)
      if (gamepadCheckInterval) clearInterval(gamepadCheckInterval)
    })

    // Check if gamepad is already connected
    if (navigator.getGamepads && navigator.getGamepads()[0]) {
      setGamepadConnected(true)
      gamepadCheckInterval = setInterval(checkGamepad, 100)
    }

    return () => {
      if (gamepadCheckInterval) clearInterval(gamepadCheckInterval)
    }
  }, []);


  return (
    <div
      onClick={() => {
        if (page == 1 && setPage) {
          setPage(2);
        }
      }}
      style={{
        backgroundImage: `url(${AppAsset.BackgroundHorizontal})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className='relative w-full h-full min-h-screen text-white flex flex-col items-center'>

      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }} />

      {/* Logo */}
      <div
        style={{
          display: page == 1 ? "none" : ""
        }}
        className='absolute top-0 left-0 z-20 pl-[99px] pt-[74px]'>
        <img
          style={{
            width: "250px",
            height: "167px",
            objectFit: "contain"
          }}
          src={AppAsset.Logo}
          className='' />
      </div>

      {
        gamepadConnected &&
        (
          <div className="absolute top-4 right-4 bg-green-100 text-green-800 px-3 py-1 rounded-md text-3xl z-10">
            Gamepad Connected
          </div>
        )}

      {children}
    </div>
  )
}
