
import { useEffect, useState, useCallback, useRef } from "react"

type Key = {
  id: string
  label: string
  value: string
  width?: number // Width multiplier (1 = standard width)
  height?: number // Height multiplier (1 = standard height)
}

interface IVirtualKeyboard {
  setText: React.Dispatch<React.SetStateAction<string>>;
  setShowKeyboard: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGamepadConnected: React.Dispatch<React.SetStateAction<boolean>>;
  addData: any;
}

export default function VirtualKeyboard({ setText, addData, setShowKeyboard, setIsGamepadConnected }: IVirtualKeyboard) {
  const [selectedKey, setSelectedKey] = useState<string>("a")
  // const [text, setText] = useState<string>("")

  const requestRef = useRef<number>()
  const previousTime = useRef<number>()
  const joystickThreshold = 0.5
  const joystickCooldown = 200 // ms
  const lastJoystickMove = useRef<number>(0)
  // Add a new ref for button press cooldown
  const lastButtonPress = useRef<number>(0)
  const buttonCooldown = 300 // ms - longer than joystick cooldown for better usability

  // Define keyboard layout
  const keyboardLayout: Key[][] = [
    [
      { id: "1", label: "1", value: "1" },
      { id: "2", label: "2", value: "2" },
      { id: "3", label: "3", value: "3" },
      { id: "4", label: "4", value: "4" },
      { id: "5", label: "5", value: "5" },
      { id: "6", label: "6", value: "6" },
      { id: "7", label: "7", value: "7" },
      { id: "8", label: "8", value: "8" },
      { id: "9", label: "9", value: "9" },
      { id: "0", label: "0", value: "0" },
    ],
    [
      { id: "q", label: "Q", value: "q" },
      { id: "w", label: "W", value: "w" },
      { id: "e", label: "E", value: "e" },
      { id: "r", label: "R", value: "r" },
      { id: "t", label: "T", value: "t" },
      { id: "y", label: "Y", value: "y" },
      { id: "u", label: "U", value: "u" },
      { id: "i", label: "I", value: "i" },
      { id: "o", label: "O", value: "o" },
      { id: "p", label: "P", value: "p" },
    ],
    [
      { id: "a", label: "A", value: "a" },
      { id: "s", label: "S", value: "s" },
      { id: "d", label: "D", value: "d" },
      { id: "f", label: "F", value: "f" },
      { id: "g", label: "G", value: "g" },
      { id: "h", label: "H", value: "h" },
      { id: "j", label: "J", value: "j" },
      { id: "k", label: "K", value: "k" },
      { id: "l", label: "L", value: "l" },
    ],
    [
      { id: "z", label: "Z", value: "z" },
      { id: "x", label: "X", value: "x" },
      { id: "c", label: "C", value: "c" },
      { id: "v", label: "V", value: "v" },
      { id: "b", label: "B", value: "b" },
      { id: "n", label: "N", value: "n" },
      { id: "m", label: "M", value: "m" },
    ],
    [
      { id: "enter", label: "Enter", value: "enter", width: 10 },
      { id: "space", label: "Space", value: " ", width: 10 },
      { id: "backspace", label: "⌫", value: "backspace", width: 10 },

    ],
  ]

  // Find the row and column of the currently selected key
  const findKeyPosition = useCallback(() => {
    for (let rowIndex = 0; rowIndex < keyboardLayout.length; rowIndex++) {
      const row = keyboardLayout[rowIndex]
      for (let colIndex = 0; colIndex < row.length; colIndex++) {
        if (row[colIndex].id === selectedKey) {
          return { rowIndex, colIndex }
        }
      }
    }
    return { rowIndex: 0, colIndex: 0 }
  }, [selectedKey, keyboardLayout])

  // Handle gamepad input
  const handleGamepadInput = useCallback(() => {
    const gamepad = navigator.getGamepads?.()?.[0]

    if (!gamepad) {
      setIsGamepadConnected(false)
      return
    }

    setIsGamepadConnected(true)
    const now = Date.now()
    const { rowIndex, colIndex } = findKeyPosition()

    // Handle joystick movement with cooldown
    if (now - lastJoystickMove.current > joystickCooldown) {
      // Left joystick horizontal (axis 0)
      if (gamepad.axes[0] < -joystickThreshold || gamepad.buttons[14]?.pressed) {
        // Move left (joystick or left d-pad)
        const newColIndex = Math.max(0, colIndex - 1)
        if (keyboardLayout[rowIndex][newColIndex]) {
          setSelectedKey(keyboardLayout[rowIndex][newColIndex].id)
          lastJoystickMove.current = now
        }
      } else if (gamepad.axes[0] > joystickThreshold || gamepad.buttons[15]?.pressed) {
        // Move right (joystick or right d-pad)
        const newColIndex = Math.min(keyboardLayout[rowIndex].length - 1, colIndex + 1)
        if (keyboardLayout[rowIndex][newColIndex]) {
          setSelectedKey(keyboardLayout[rowIndex][newColIndex].id)
          lastJoystickMove.current = now
        }
      }

      // Left joystick vertical (axis 1)
      if (gamepad.axes[1] < -joystickThreshold || gamepad.buttons[12]?.pressed) {
        // Move up (joystick or up d-pad)
        if (rowIndex > 0) {
          const newColIndex = Math.min(colIndex, keyboardLayout[rowIndex - 1].length - 1)
          setSelectedKey(keyboardLayout[rowIndex - 1][newColIndex].id)
          lastJoystickMove.current = now
        }
      } else if (gamepad.axes[1] > joystickThreshold || gamepad.buttons[13]?.pressed) {
        // Move down (joystick or down d-pad)
        if (rowIndex < keyboardLayout.length - 1) {
          const newColIndex = Math.min(colIndex, keyboardLayout[rowIndex + 1].length - 1)
          setSelectedKey(keyboardLayout[rowIndex + 1][newColIndex].id)
          lastJoystickMove.current = now
        }
      }
    }

    // Handle button press (A button - index 0) with cooldown
    if (gamepad.buttons[0].pressed && now - lastButtonPress.current > buttonCooldown) {
      const key = keyboardLayout[rowIndex][colIndex]

      if (key.value === "backspace") {
        setText((prev) => prev.slice(0, -1))
      } else if (key.value == "enter") {
        addData();
        setShowKeyboard(false);
      } else {
        setText((prev) => prev + key.value)
      }

      lastButtonPress.current = now
    }
  }, [findKeyPosition])

  // Animation frame loop for gamepad polling
  const animate = useCallback(
    (time: number) => {
      if (previousTime.current !== undefined) {
        handleGamepadInput()
      }
      previousTime.current = time
      requestRef.current = requestAnimationFrame(animate)
    },
    [handleGamepadInput],
  )

  // Set up gamepad connection event listeners
  useEffect(() => {
    const handleGamepadConnected = () => {
      setIsGamepadConnected(true)
    }

    const handleGamepadDisconnected = () => {
      setIsGamepadConnected(false)
    }

    window.addEventListener("gamepadconnected", handleGamepadConnected)
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected)

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected)
      window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected)
    }
  }, [])

  // Start and stop the animation frame loop
  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate)
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current)
      }
    }
  }, [animate])

  return (
    <div className="flex flex-col items-center justify-center mt-2 mr-2">
      <div className="w-[25rem] bg-gray-800 rounded-lg shadow-lg p-6 mb-4">
        {keyboardLayout.map((row, rowIndex) => (
          <div key={rowIndex} className="flex justify-center mb-2">
            {row.map((key) => (
              <button
                key={key.id}
                className={`
                  m-1 h-12 font-medium
                  ${key.width ? `w-[${key.width * 2.5}rem]` : "w-10"}
                  ${key.height ? `h-[${key.height * 3}rem]` : ""}
                  ${selectedKey === key.id ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-700 hover:bg-gray-600"}
                `}
                onClick={() => {
                  setSelectedKey(key.id)
                  if (key.value === "backspace") {
                    setText((prev) => prev.slice(0, -1))
                  } else {
                    setText((prev) => prev + key.value)
                  }
                }}>
                {key.label}
              </button>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
