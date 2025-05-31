import React, { useState, useEffect } from "react";
import axios from "axios";
import QABackground from "../QABackground";
import { useTranslation } from "react-i18next";
import AppAsset from "@/core/AppAsset";
import "swiper/css";

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function UploadQuestions({ setPage }: Props) {
  const [file1, setFile1] = useState<File | null>(null);
  const [file2, setFile2] = useState<File | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isReviewing, setIsReviewing] = useState(false);
  const [gamepadConnected, setGamepadConnected] = useState(false);
  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({ qa: "en" }));
  const [language, setLanguage] = useState(savedlanguages);
  const { t } = useTranslation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<File | null>>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file1 || !file2) {
      alert("Please upload both files.");
      return;
    }

    try {
      const file1Content = await file1.text();
      const file2Content = await file2.text();

      const parsedFile1 = JSON.parse(file1Content);
      const parsedFile2 = JSON.parse(file2Content);

      // Combine questions from both files
      const combinedQuestions = [...parsedFile1, ...parsedFile2];

      // Randomize options for each question
      combinedQuestions.forEach((question: any) => {
        question.translations.forEach((translation: any) => {
          translation.options = translation.options.sort(() => Math.random() - 0.5);
        });
      });

      setQuestions(combinedQuestions);
      setIsReviewing(true);
    } catch (error) {
      console.error("Error parsing files:", error);
      alert("Failed to parse files. Please ensure they are valid JSON.");
    }
  };

  const handleConfirm = async () => {
    if (currentQuestionIndex >= questions.length) {
      alert("All questions have been reviewed.");
      return;
    }

    const question = questions[currentQuestionIndex];

    try {
      const response = await axios.post("/api/v1/question", question);
      console.log("Question inserted:", response.data);

      // Move to the next question
      if (currentQuestionIndex + 1 < questions.length) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
        alert("All questions have been inserted successfully.");
        setIsReviewing(false);
        setQuestions([]);
        setCurrentQuestionIndex(0);
      }
    } catch (error) {
      console.error("Error inserting question:", error);
      alert("Failed to insert question. Please try again.");
    }
  };

  const handleReject = () => {
    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      alert("All questions have been reviewed.");
      setIsReviewing(false);
      setQuestions([]);
      setCurrentQuestionIndex(0);
    }
  };

  // Check Joystick Connectivity
  useEffect(() => {
    let gamepadCheckInterval: NodeJS.Timeout;

    const checkGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];

      if (gamepad) {
        setGamepadConnected(true);

        // Detect if buttons were just pressed (to avoid repeated actions)
        const buttonPressed = (index: number) => {
          return gamepad.buttons[index]?.pressed;
        };

        if (buttonPressed(0)) {
          setPage(1);
        }
      } else {
        setGamepadConnected(false);
      }
    };

    // Check if gamepad is already connected
    if (navigator.getGamepads && navigator.getGamepads()[0]) {
      setGamepadConnected(true);
      gamepadCheckInterval = setInterval(checkGamepad, 100);
    }

    const handleGamepadConnected = () => {
      setGamepadConnected(true);
      gamepadCheckInterval = setInterval(checkGamepad, 100);
    };

    const handleGamepadDisconnected = () => {
      setGamepadConnected(false);
      if (gamepadCheckInterval) clearInterval(gamepadCheckInterval);
    };

    window.addEventListener("gamepadconnected", handleGamepadConnected);
    window.addEventListener("gamepaddisconnected", handleGamepadDisconnected);

    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected);
      window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
      if (gamepadCheckInterval) clearInterval(gamepadCheckInterval);
    };
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
    <QABackground page={1} setPage={setPage}>
      <div className="relative w-full h-full mx-auto flex flex-col items-center justify-center gap-5 py-10 md:py-20">
        {!isReviewing ? (
          <>
            <h1 className="text-2xl font-bold">{t("qa.upload_questions")}</h1>
            <div className="flex flex-col gap-4">
              <input
                type="file"
                accept=".json"
                onChange={(e) => handleFileChange(e, setFile1)}
                className="border p-2"
              />
              <input
                type="file"
                accept=".json"
                onChange={(e) => handleFileChange(e, setFile2)}
                className="border p-2"
              />
              <button
                onClick={handleUpload}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                {t("qa.upload")}
              </button>
            </div>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold">{t("qa.review_question")}</h1>
            <div className="flex flex-col gap-4">
              <div className="border p-4">
                <h2 className="text-xl font-semibold">{t("qa.translations")}</h2>
                {questions[currentQuestionIndex].translations.map((translation: any, index: number) => (
                  <div key={index} className="border p-2">
                    <p>
                      <strong>{t("qa.language")}: </strong>
                      {translation.language}
                    </p>
                    <p>
                      <strong>{t("qa.question")}: </strong>
                      {translation.question}
                    </p>
                    <p>
                      <strong>{t("qa.options")}: </strong>
                    </p>
                    <ul>
                      {translation.options.map((option: any, idx: number) => (
                        <li key={idx}>
                          {option.text} {option.isCorrect ? "(Correct)" : ""}
                          {option.explanation && ` - ${option.explanation}`}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
              <div className="flex gap-4">
                <button
                  onClick={handleConfirm}
                  className="bg-green-500 text-white px-4 py-2 rounded"
                >
                  {t("qa.confirm")}
                </button>
                <button
                  onClick={handleReject}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  {t("qa.reject")}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </QABackground>
  );
}
