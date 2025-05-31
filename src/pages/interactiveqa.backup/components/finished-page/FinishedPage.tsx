import { useEffect, useState } from "react";

// Axios
import axios from "@/utils/axios";
import { generateRandomName } from "@/utils/randomNameGenerator";

// Layout
import QABackground from "../QABackground";


import LeftSide from "./components/LeftSide";
import RightSide from "./components/RightSide";
import GamePadStatus from "../GamePadStatus";

export interface FeedbackCardProps {
  icon: string;
  message: string;
}

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  answers: { [key: number]: number };
  questions: any[];
  setScore: React.Dispatch<React.SetStateAction<number>>;
  setcUserId: any;
  check?: { question: number, answer: number, isCorrect: boolean }[] | [];
}

export default function FinishedPage({ setPage, answers, questions, setcUserId, setScore }: Props) {
  const [sum, setSum] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [isGamepadConnected, setIsGamepadConnected] = useState<boolean>(false)

  const length = Object.keys(answers).length;

  const calculateAnswers = () => {
    var sum = 0;
    for (var i = 0; i < length; i++) {
      var data = Object.entries(answers)[i];
      console.log(data[0])
      var q = questions.filter((question) => {
        return question._id === data[0];
      })[0];

      const choices = q.translations[0].options;
      const difficulty = q.difficulty;

      choices.filter((choice: any) => {
        if (choice._id === data[1]) {
          if (choice.isCorrect) {
            switch (difficulty) {
              case "Easy":
                sum += 7.5;
                break;
              case "Medium":
                sum += 10;
                break;
              case "Difficult":
                sum += 40 / 3;
                break;
            }
          }
        }
      })
    }
    setSum(sum);
    setScore(sum);
  }

  const addData = () => {
    if (name === "") {
      setIsLoading(true);
      var cname = generateRandomName();

      axios.post("/api/v1/questionAttempts/", {
        name: cname,
        score: sum
      }).then((response) => {
        console.log(response.data);
        setcUserId(response.data.data._id)
        setPage(5);

      })
    } else {
      setIsLoading(true);
      axios.post("/api/v1/questionAttempts/", {
        name: name,
        score: sum
      }).then((response) => {
        console.log(response.data);
        setcUserId(response.data.data._id)
        setPage(5);
      })
    }
  }

  useEffect(() => {
    calculateAnswers();
  }, []);

  return (
    <QABackground>
      <div
        className="relative grid grid-cols-2 items-start w-full z-10">
        <GamePadStatus gamepadConnected={isGamepadConnected} />
        <LeftSide sum={sum} />
        <RightSide name={name} setName={setName} addData={addData} setGamepadConnected={setIsGamepadConnected} isLoading={isLoading} />
      </div>
    </QABackground>
  )
}



