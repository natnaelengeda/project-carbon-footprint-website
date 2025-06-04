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
    let sum = 0;
    const totalQuestions = questions.length; // Total number of questions
    const maxScorePerQuestion = 100 / totalQuestions; // Maximum score per question to fit 100

    for (let i = 0; i < length; i++) {
      const data = Object.entries(answers)[i];
      const q = questions.find((question) => question._id === data[0]);
      if (!q) continue; // Skip if question not found

      const choices = q.translations[0]?.options || [];
      const difficulty = q.difficulty;

      choices.forEach((choice: any) => {
        if (choice._id === data[1]) {
          if (choice.isCorrect) {
            switch (difficulty) {
              case "Easy":
                sum += maxScorePerQuestion * 0.75; // 75% of max score for Easy
                break;
              case "Medium":
                sum += maxScorePerQuestion; // 100% of max score for Medium
                break;
              case "Difficult":
                sum += maxScorePerQuestion * 1.33; // 133% of max score for Difficult
                break;
            }
          }
        }
      });
    }

    sum = Math.round(sum); // Round off the sum to the nearest integer
    setSum(sum);
    setScore(sum);
  };

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



