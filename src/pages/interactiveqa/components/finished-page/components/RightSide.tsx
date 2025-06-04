import React, { useState, useEffect, useRef } from 'react';

// App Asset
import AppAsset from '@/core/AppAsset';

// Translation
import { useTranslation } from "react-i18next";

// Icons
import { CiUser } from "react-icons/ci";

// Style
import "../styles.css";
import VirtualKeyboard from './VirtualKeyboard';
import { Oval } from 'react-loader-spinner';

interface IRightSide {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  addData: () => void;
  setGamepadConnected: React.Dispatch<React.SetStateAction<boolean>>;
  isLoading: boolean;
}

export default function RightSide({ name, setName, addData, setGamepadConnected, isLoading }: IRightSide) {
  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    qa: "en"
  }));
  const { t } = useTranslation();

  const [showKeyboard, setShowKeyboard] = useState(true);

  // Cooldown and edge detection refs for X button
  const xButtonCooldownRef = useRef(false);
  const prevXPressedRef = useRef(false);

  // Track the ith user today
  const [userCount, setUserCount] = useState(0);

  useEffect(() => {
    // Fetch the current user count from localStorage or initialize it
    const count = parseInt(localStorage.getItem("userCount") || "0", 10);
    setUserCount(count);
  }, []);

  const generateRandomName = () => {
    const randomSuffix = Math.floor(1000 + Math.random() * 9000); // Generate a random 4-digit number
    return `user-${randomSuffix}`;
  };

  const handleSubmit = () => {
    // Generate a default name if the user doesn't input one
    const generatedName = name.trim() === "" ? generateRandomName() : name;

    // Update the user count in localStorage
    localStorage.setItem("userCount", String(userCount + 1));

    // Call the addData function with the generated name
    setName(generatedName);
    addData();
  };

  useEffect(() => {
    let gamepadCheckInterval: NodeJS.Timeout;

    const checkGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];

      if (gamepad) {
        setGamepadConnected(true);
        const xPressed = gamepad.buttons[0]?.pressed;

        // Only trigger handleSubmit if X is pressed, wasn't pressed last frame, and not in cooldown, and keyboard is hidden
        if (
          !showKeyboard && // Only allow when keyboard is hidden (submit button visible)
          xPressed &&
          !prevXPressedRef.current &&
          !xButtonCooldownRef.current &&
          !isLoading
        ) {
          xButtonCooldownRef.current = true;
          handleSubmit();
          setTimeout(() => {
            xButtonCooldownRef.current = false;
          }, 2000); // 2 second cooldown
        }
        prevXPressedRef.current = xPressed;
      }
    };

    gamepadCheckInterval = setInterval(checkGamepad, 100);

    return () => {
      clearInterval(gamepadCheckInterval);
    };
  }, [handleSubmit, setGamepadConnected, isLoading, showKeyboard]);

  return (
    <div
      className={`w-full h-full flex flex-col items-center justify-end gap-4 ${showKeyboard ? "pt-44" : "pt-52"}`}>
      <div className="flex flex-col items-center mt-2 max-w-full w-[750px]">

        {/* Title */}
        <label
          htmlFor="nameInput"
          className="text-2xl md:text-[28px] font-medium text-white max-md:max-w-full">
          {t("qa.do_you_want_to_share_your_name", { lng: savedlanguages.qa })}
        </label>

        <div
          className="flex overflow-hidden gap-2.5 items-center px-6 py-4 mt-10 w-full text-2xl rounded-lg border border-solid border-white max-w-[400px] text-white mr-4">

          {/* Text Input */}
          <div className="flex gap-2.5 justify-center items-center self-stretch my-auto">
            <CiUser
              className="shrink-0 self-stretch my-auto aspect-square w-[20px]" />
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              id="nameInput"
              placeholder={t("qa.eg_john_doe", { lng: savedlanguages.qa })}
              className="self-stretch my-auto bg-transparent border-none outline-none w-full"
              aria-label="Enter your name" />
          </div>
        </div>

        {
          showKeyboard &&
          <VirtualKeyboard
            setText={setName}
            addData={handleSubmit} // Trigger handleSubmit on Enter
            setShowKeyboard={setShowKeyboard}
            setIsGamepadConnected={setGamepadConnected} />
        }

        {/* Submit Button */}
        <div
          className={`${showKeyboard ? "pt-5" : "pt-20"}`}>
          <button
            onClick={handleSubmit} // Trigger handleSubmit on button click
            disabled={isLoading}
            className="flex flex-row items-center justify-center md:w-[240px] md:h-[70px] bg-transparent border border-primary text-primary rounded-full px-3 md:px-0 py-2 md:py-0 gap-2 pt-10">
            <p className="text-xl md:text-[20px]"> {t("qa.see_leader_board", { lng: savedlanguages.qa })}</p>
            {
              isLoading ?
                <Oval
                  width={25}
                  height={25} /> :
                <img
                  src={AppAsset.RightArrowIcon}
                  className="w-[28px] h-[28px]" />
            }
          </button>
        </div>
      </div>
    </div>
  );
}
