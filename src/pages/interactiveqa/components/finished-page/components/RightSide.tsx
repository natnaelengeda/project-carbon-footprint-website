import React, { useEffect, useRef, useState } from 'react'

// App Asset
import AppAsset from '@/core/AppAsset';

// Translation
import { useTranslation } from "react-i18next";

// Icons
import { CiUser } from "react-icons/ci";

// Style
import "../styles.css"

interface IRightSide {
  name: string;
  setName: React.Dispatch<React.SetStateAction<string>>;
  addData: () => void;
  setGamepadConnected: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function RightSide({ name, setName, addData, setGamepadConnected }: IRightSide) {
  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    qa: "en"
  }));
  // React Language Packaged;
  const { t } = useTranslation();


  const [showKeyboard, setShowKeyboard] = useState(true); // toggle with button/gamepad

  const layout = [
    ["Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P"],
    ["A", "S", "D", "F", "G", "H", "J", "K", "L"],
    ["Z", "X", "C", "V", "B", "N", "M"],
    ["←", "Space", "Enter"]
  ];

  interface Props {
    onKeyPress: (key: string) => void;
    onClose: () => void;
  }


  const FloatingKeyboard: React.FC<Props> = ({ onKeyPress, onClose }) => {
    const [selectedRow, setSelectedRow] = useState(0);
    const [selectedCol, setSelectedCol] = useState(0);
    const moveCooldown = useRef(0);
    const lastButtonState = useRef<boolean[]>([]);
    const lastAxesState = useRef<number[]>([]);

    useEffect(() => {
      let gamepadCheckInterval: NodeJS.Timeout;

      const move = (rowOffset: number, colOffset: number) => {
        setSelectedRow((prevRow) => {
          const newRow = Math.max(0, Math.min(layout.length - 1, prevRow + rowOffset));
          const maxCol = layout[newRow].length - 1;
          setSelectedCol((prevCol) => Math.max(0, Math.min(maxCol, prevCol + colOffset)));
          return newRow;
        });
      };

      const pressKey = () => {
        const key = layout[selectedRow][selectedCol];
        if (key === "Enter") {
          addData();
          onClose()
        }
        else if (key === "←") onKeyPress("Backspace");
        else if (key === "Space") onKeyPress(" ");
        else onKeyPress(key);
      };

      const checkGamepad = () => {
        const gamepad = navigator.getGamepads()[0];
        if (!gamepad) return;

        const now = Date.now();
        if (now - moveCooldown.current < 150) return;

        const axes = gamepad.axes;
        const buttons = gamepad.buttons;

        const x = axes[0];
        const y = axes[1];

        const dpadUp = buttons[12]?.pressed;
        const dpadDown = buttons[13]?.pressed;
        const dpadLeft = buttons[14]?.pressed;
        const dpadRight = buttons[15]?.pressed;

        // Move with left stick or D-pad
        if ((x < -0.5 || dpadLeft) && !(lastAxesState.current[0] < -0.5 || lastButtonState.current[14])) {
          move(0, -1);
          moveCooldown.current = now;
        } else if ((x > 0.5 || dpadRight) && !(lastAxesState.current[0] > 0.5 || lastButtonState.current[15])) {
          move(0, 1);
          moveCooldown.current = now;
        } else if ((y < -0.5 || dpadUp) && !(lastAxesState.current[1] < -0.5 || lastButtonState.current[12])) {
          move(-1, 0);
          moveCooldown.current = now;
        } else if ((y > 0.5 || dpadDown) && !(lastAxesState.current[1] > 0.5 || lastButtonState.current[13])) {
          move(1, 0);
          moveCooldown.current = now;
        }

        // A button (press key)
        const isAPressed = buttons[0]?.pressed;
        const wasAPressed = lastButtonState.current[0];

        if (isAPressed && !wasAPressed) {
          pressKey();
          moveCooldown.current = now;
        }

        // Start button or Enter key (button 9)
        if (buttons[9]?.pressed && !lastButtonState.current[9]) {
          onClose();
        }

        if (gamepad.buttons[3]?.pressed && !lastButtonState.current[3]) {
          onKeyPress("Backspace");
        }

        // Save current state for edge detection
        lastAxesState.current = [...axes];
        lastButtonState.current = buttons.map(b => b.pressed);
      };

      gamepadCheckInterval = setInterval(checkGamepad, 100);

      return () => {
        if (gamepadCheckInterval) {
          setGamepadConnected(true);
          clearInterval(gamepadCheckInterval)
        };
      };
    }, [selectedRow, selectedCol, onKeyPress, onClose]);

    return (
      <div className="keyboard">
        {layout.map((row, rowIndex) => (
          <div key={rowIndex} className="keyboard-row">
            {row.map((key, colIndex) => (
              <button
                key={key + rowIndex + colIndex}
                className={`keyboard-key ${selectedRow === rowIndex && selectedCol === colIndex ? "selected" : ""
                  }`}
                onClick={() => {
                  if (key === "Enter") onClose();
                  else if (key === "←") onKeyPress("Backspace");
                  else if (key === "Space") onKeyPress(" ");
                  else onKeyPress(key);
                }}>
                {key}
              </button>
            ))}
          </div>
        ))}
      </div>
    );
  };

  const handleKeyPress = (key: any) => {
    // if (key === "Space") {
    //   setName(name + " ");
    // } else if (key === "←") {
    //   setName(name.slice(0, -1));
    // } else if (key === "Enter") {
    //   setShowKeyboard(false);
    // } else {
    //   setName(name + key);
    // }
    if (key === "Backspace") setName(name.slice(0, -1));
    else setName(prev => prev + key);
  };

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
              className=" shrink-0 self-stretch my-auto aspect-square w-[20px]" />
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
          <FloatingKeyboard
            onKeyPress={handleKeyPress}
            onClose={() => setShowKeyboard(false)} />
        }

        {/* Submit Button */}
        <div
          className={`${showKeyboard ? "pt-5" : "pt-20"}`}>
          <button
            onClick={addData}
            className="flex flex-row items-center justify-center md:w-[240px] md:h-[70px] bg-transparent border border-primary text-primary rounded-full px-3 md:px-0 py-2 md:py-0 gap-2 pt-10">
            <p className="text-xl md:text-[20px]"> {t("qa.see_leader_board", { lng: savedlanguages.qa })}</p>
            <img
              src={AppAsset.RightArrowIcon}
              className="w-[28px] h-[28px]" />
          </button>
        </div>
      </div>

    </div>
  )
}
