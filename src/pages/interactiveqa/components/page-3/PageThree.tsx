import React, { useEffect, useRef, useState } from "react";

// Components
import Timer from "./components/Timer";
import QABackground from "../QABackground";
import Choice from "./components/Choice";
import EmptyAnswer from "./components/EmptyAnswer";
import NextQuestion from "./components/NextQuestion";
import CorrectAnswer from "./components/CorrentAnswer";
import IncorrectAnswer from "./components/IncorrectAnswer";
import Question from "./components/Question";

// Styles
import "./styles/styles.css";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  questions: any[];
  answers: { [key: number]: number };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  setCheck: React.Dispatch<React.SetStateAction<{ question: number, answer: number, isCorrect: boolean }[] | []>>;
  setQuestions: any;
}

export default function xPageThree({ setPage, answers, setAnswers, setQuestions, setCheck, questions }: Props) {
  const [colorStep, setColorStep] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrect, setIncorrect] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<any>();

  // const [selected, setSelected] = useState<number>(0);
  const [firstSelected, setFirstSelected] = useState<boolean>(false);

  const [gamepadConnected, setGamepadConnected] = useState(false);

  const savedQuestions = localStorage.getItem("questions");

  const isKeyPressed = useRef(false);
  const [key, setKey] = useState(null);


  // Check Joystick Connectivity
  useEffect(() => {
    let gamepadCheckInterval: NodeJS.Timeout;

    const checkGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0]

      if (gamepad) {
        setGamepadConnected(true);

        // Detect if buttons were just pressed (to avoid repeated actions)
        const buttonPressed = (index: number) => {
          return gamepad.buttons[index]?.pressed
        }

        console.log(firstSelected)
        if (firstSelected) {
          // Up Direction
          if (gamepad.axes[1] < -0.5 || buttonPressed(12)) {
            console.log("Go Up");
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[0]._id, currentQuestion.translations[0].options[0].isCorrect);
            setSelectedChoice(currentQuestion.translations[0].options[0]);
          }

          // Down Direction
          if (gamepad.axes[1] > 0.5 || buttonPressed(13)) {
            console.log("Go Down");
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[2]._id, currentQuestion.translations[0].options[2].isCorrect);
            setSelectedChoice(currentQuestion.translations[0].options[2]);
          }

          // Left Direction
          if (gamepad.axes[0] < -0.5 || buttonPressed(14)) {

          }

          // Right Direction
          if (gamepad.axes[0] > 0.5 || buttonPressed(15)) {

          }

        } else {
          if (gamepad.axes[1] < -0.5 || buttonPressed(12) || gamepad.axes[1] > 0.5 || buttonPressed(13) || gamepad.axes[0] < -0.5 || gamepad.axes[0] > 0.5 || buttonPressed(14) || buttonPressed(13)) {
            handleFirstQuestion();
          }
        }

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

  }, [firstSelected]);

  const handleFirstQuestion = () => {
    handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[0]._id, currentQuestion.translations[0].options[0].isCorrect);
    setSelectedChoice(currentQuestion.translations[0].options[0]);
    setFirstSelected(true);
  }

  useEffect(() => {
    if (isKeyPressed.current) {
      switch (key!) {
        case "a":
          if (click == 1) {
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[0]._id, currentQuestion.translations[0].options[0].isCorrect);
            setSelectedChoice(currentQuestion.translations[0].options[0]);
          }
          break;
        case "b":
          if (click == 1) {
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[1]._id, currentQuestion.translations[0].options[1].isCorrect);
            setSelectedChoice(currentQuestion.translations[0].options[1]);
          }
          break;
        case "c":
          if (click == 1) {
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[2]._id, currentQuestion.translations[0].options[2].isCorrect);
            setSelectedChoice(currentQuestion.translations[0].options[2]);
          }
          break;
        case "d":
          if (click == 1) {
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[3]._id, currentQuestion.translations[0].options[3].isCorrect);
            setSelectedChoice(currentQuestion.translations[0].options[3]);
          }
          break;

        case "Enter":
          switch (click) {
            case 1:
              checkAnswer();
              break;
            case 2:
              handleNextQuestion();
              break;
          }
          break;
        default:
          return;
      }
    }
  }, [isKeyPressed.current]);

  useEffect(() => {
    const handleKeyDown = (event: any) => {
      isKeyPressed.current = true;
      setKey(event.key);
    };

    const handleKeyUp = () => {
      isKeyPressed.current = false;
      setKey(null);
    };

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  // Timer
  const duration = 100;
  const [timeLeft, setTimeLeft] = useState(duration);

  const [currentQuestionA, setCurruentQuestion] = useState({
    question: 0,
    answer: 0,
  });

  const [click, setClick] = useState<number>(1);

  const handleAnswerChange = (questionId: number, choiceId: number, isCorrect: boolean) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: choiceId
    }));

    setCheck(prevCheck => [
      ...prevCheck,
      {
        question: questionId,
        answer: choiceId,
        isCorrect: isCorrect
      }
    ]);

    setCurruentQuestion({
      question: questionId,
      answer: choiceId
    });
  };

  const handleNextQuestion = () => {
    console.log(currentQuestionIndex + 1);
    if (currentQuestionIndex >= 9) {
      setPage(4);
    } else {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setColorStep(colorStep + 1);
      setClick(1);
      setIncorrect(false);
      setTimeLeft(duration);
    }
  };

  const checkAnswer = () => {
    console.log(answers, currentQuestionIndex);
    if (!answers || Object.keys(answers).length === 0) {
      handleAnswerChange(currentQuestion._id, 0, false);
      setSelectedChoice('null');
      setIncorrect(true);
      setClick(2);
      if (currentQuestionIndex >= 9) {
        setPage(4);
      } else {
        setTimeout(() => {
          handleNextQuestion();
        }, 2000);
      }
    } else {
      if (Object.keys(answers).length == currentQuestionIndex) {
        handleAnswerChange(currentQuestion._id, 0, false);
        setTimeout(() => {
          handleNextQuestion();
        }, 4000);
      }
      if (currentQuestionIndex >= 9) {
        setPage(4);
      } else {
        setClick(2);
      }
    }
  }

  const currentQuestion: any = questions && questions[currentQuestionIndex];

  useEffect(() => {
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  return (
    <QABackground>

      {gamepadConnected && (
        <div className="absolute top-2 right-6 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
          Gamepad Connected
        </div>
      )}

      {/* Timer */}
      <div className="absolute top-0 right-0 pr-[5px] pt-[5px] z-10">
        <Timer
          setPage={setPage}
          duration={duration}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          checkAnswer={checkAnswer} />
      </div>

      {/* Main */}
      <div className="w-full h-full mx-auto min-h-screen flex flex-col items-center justify-start relative z-10">

        {/* Questions */}
        <div
          className="w-full md:w-[auto] flex flex-col items-start justify-start gap-4 md:gap-[60px] text-white pt-[150px]">
          {/* Question */}
          <Question
            questions={questions}
            currentQuestion={currentQuestion} />

          {/* Choices */}
          <Choice
            questions={questions}
            currentQuestion={currentQuestion}
            click={click}
            handleAnswerChange={handleAnswerChange}
            setSelectedChoice={setSelectedChoice}
            answers={answers} />

          <div>
            <EmptyAnswer incorrect={incorrect} />
            <CorrectAnswer click={click} currentQuestionA={currentQuestionA} selectedChoice={selectedChoice} />
            <IncorrectAnswer click={click} currentQuestionA={currentQuestionA} selectedChoice={selectedChoice} />
          </div>
        </div>

        {/* Next Questions */}
        <NextQuestion
          questions={questions}
          click={click}
          currentQuestionIndex={currentQuestionIndex}
          checkAnswer={checkAnswer}
          handleNextQuestion={handleNextQuestion}
          setPage={setPage} />
      </div>
    </QABackground>
  )
}
