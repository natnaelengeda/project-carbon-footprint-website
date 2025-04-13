import { useEffect, useState } from "react";

// Layout
import QABackground from "../QABackground";

// Axios
import axios from "@/utils/axios";

// Translation
import { useTranslation } from "react-i18next";
import LeaderboardsTable from "./components/LeaderboardsTable";
import GamePadStatus from "../GamePadStatus";


export interface ParticipantData {
  userId: string;
  name: string;
  score: number;
  isCurrentUser?: boolean;
}

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  score?: number;
  cuserId: number | null;
}

export default function LeadersBoard({ setPage, cuserId }: Props) {
  const [leaderboardData, setLeaderboardData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  console.log(isLoading);

  const [gamepadConnected, setGamepadConnected] = useState(false);

  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));

  // React Language Packaged;
  const { t } = useTranslation();

  const fetchLeaderboardData = () => {
    axios.get(`/api/v1/questionAttempts/top10/${cuserId}`)
      .then((response) => {
        if (response.status == 201) {
          setLeaderboardData(response.data);
          setIsLoading(false);
        }
      });
  }

  useEffect(() => {
    if (true) {
      fetchLeaderboardData();
    }
  }, [cuserId]);

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
          setPage(1);
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

  return (
    <QABackground>
      <div
        style={{
          zIndex: 100,
        }}
        className="w-full h-full grid grid-cols-2 gap-5 items-start">
        <GamePadStatus gamepadConnected={gamepadConnected} />

        {/* Grid 1 */}
        <div className="w-full flex flex-col items-start justify-start pt-52 pl-20">
          <LeaderboardsTable
            participants={leaderboardData}
            cuserId={cuserId} />

        </div>

        {/* Grid 2 */}
        <div
          className="w-full h-auto flex flex-col items-center justify-center text-3xl pt-80 px-10">
          <span
            className="flex flex-col items-center justify-center xl:text-[50px] gap-7 text-center">
            <p
              style={{
                fontSize: savedlanguages.qa == "am" ? "60px" : "20px",
                lineHeight: savedlanguages.qa == "am" ? "1.5" : "1.2"
              }}>
              {t("qa.great_job_share_with_friends_and_family", { lng: savedlanguages.qa })}
            </p>
          </span>

          <div className="py-10">
            <button
              onClick={() => {
                setPage(1);
              }}
              className="flex flex-row items-center justify-center md:w-[200.32px] md:h-[60px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2 pt-10">
              <p className="text-xl md:text-[24px]"> {t("qa.finish", { lng: savedlanguages.qa })}</p>
            </button>
          </div>
        </div>

      </div>
    </QABackground>
  )
}
