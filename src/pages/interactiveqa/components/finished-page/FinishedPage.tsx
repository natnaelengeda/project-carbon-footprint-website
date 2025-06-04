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
    let totalWeight = 0; // Total weight of all questions
    const totalQuestions = questions.length; // Total number of questions

    // Calculate the total weight of all questions based on their difficulty
    questions.forEach((question) => {
      switch (question.difficulty) {
        case "Easy":
          totalWeight += 0.75; // Easy questions contribute 0.75 weight
          break;
        case "Medium":
          totalWeight += 1; // Medium questions contribute 1 weight
          break;
        case "Difficult":
          totalWeight += 1.33; // Difficult questions contribute 1.33 weight
          break;
      }
    });

    // Compute the user's score based on their answers
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
                sum += 0.75; // Add 0.75 for correct Easy answers
                break;
              case "Medium":
                sum += 1; // Add 1 for correct Medium answers
                break;
              case "Difficult":
                sum += 1.33; // Add 1.33 for correct Difficult answers
                break;
            }
          }
        }
      });
    }

    // Normalize the score to fit within 100
    const normalizedScore = (sum / totalWeight) * 100;

    // Round off the score to the nearest integer
    const finalScore = Math.round(normalizedScore);

    setSum(finalScore);
    setScore(finalScore);
  };

  const addData = () => {
    // Debug: Check the current name and sum values
    console.log("addData called");
    console.log("Name:", name);
    console.log("Score (sum):", sum);

    if (name === "") {
      console.log("Name is empty, generating a random name...");
      setIsLoading(true);
      var cname = generateRandomName();

      // Debug: Check the generated random name
      console.log("Generated Random Name:", cname);

      axios.post("/api/v1/questionAttempts/", {
        name: cname,
        score: sum
      }).then((response) => {
        // Debug: Log the API response
        console.log("API Response:", response.data);

        setcUserId(response.data.data._id);
        setPage(5);
      }).catch((error) => {
        // Debug: Log any errors from the API call
        console.error("Error in API call:", error);
      }).finally(() => {
        setIsLoading(false);
      });
    } else {
      console.log("Name provided by user:", name);
      setIsLoading(true);

      axios.post("/api/v1/questionAttempts/", {
        name: name,
        score: sum
      }).then((response) => {
        // Debug: Log the API response
        console.log("API Response:", response.data);

        setcUserId(response.data.data._id);
        setPage(5);
      }).catch((error) => {
        // Debug: Log any errors from the API call
        console.error("Error in API call:", error);
      }).finally(() => {
        setIsLoading(false);
      });
    }
  };

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



