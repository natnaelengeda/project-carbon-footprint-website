import React, { useEffect, useRef, useState } from "react";

// Components
import Timer from "./components/Timer";
import Choice from "./components/Choice";
import Question from "./components/Question";
import QABackground from "../QABackground";
import EmptyAnswer from "./components/EmptyAnswer";
import NextQuestion from "./components/NextQuestion";
import CorrectAnswer from "./components/CorrentAnswer";
import IncorrectAnswer from "./components/IncorrectAnswer";

// Styles
import "./styles/styles.css";
import DevTools from "../DevToolts";

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

  const [firstSelected, setFirstSelected] = useState<boolean>(false);

  // Game Pad Conneciton
  const [gamepadConnected, setGamepadConnected] = useState(false);

  // Saved Questions
  const savedQuestions = localStorage.getItem("questions");

  // Timer Ref
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Current Question A
  const [currentQuestionA, setCurruentQuestion] = useState({
    question: 0,
    answer: 0,
  });

  // Current Question
  const currentQuestion: any = questions && questions[currentQuestionIndex];

  // Timer
  const duration = 30;
  const [timeLeft, setTimeLeft] = useState(duration);

  // Click Checker
  const [click, setClick] = useState<number>(1);

  // Check Joystick Connectivity
  useEffect(() => {
    let gamepadCheckInterval: NodeJS.Timeout;

    const checkGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0]

      if (gamepad) {
        setGamepadConnected(true);

        // Detect if buttons were just pressed (to avoid repeated actions)
        const buttonPressed = (index: number) => gamepad.buttons[index]?.pressed;
        const options = currentQuestion.translations[0].options;

        if (!firstSelected && click == 1) {
          if (
            Math.abs(gamepad.axes[0]) > 0.5 ||
            Math.abs(gamepad.axes[1]) > 0.5 ||
            buttonPressed(12) || buttonPressed(13) || buttonPressed(14) || buttonPressed(15)
          ) {
            // Select A initially
            const a = options[0];
            setSelectedChoice(a);
            handleAnswerChange(currentQuestion._id, a._id, a.isCorrect);
            setFirstSelected(true);
          }
          return;
        }

        const selectedId = selectedChoice?._id;
        const index = options.findIndex((o: any) => o._id === selectedId);

        // Grid structure: [A, B, C, D] → index 0,1,2,3
        const moveTo = (newIndex: number) => {
          const opt = options[newIndex];
          setSelectedChoice(opt);
          handleAnswerChange(currentQuestion._id, opt._id, opt.isCorrect);
        };

        if ((gamepad.axes[0] > 0.5 || buttonPressed(15)) && click == 1) {
          // RIGHT
          if (index === 0) moveTo(1); // A → B
          else if (index === 2) moveTo(3); // C → D
        }

        if ((gamepad.axes[0] < -0.5 || buttonPressed(14)) && click == 1) {
          // LEFT
          if (index === 1) moveTo(0); // B → A
          else if (index === 3) moveTo(2); // D → C
        }

        if ((gamepad.axes[1] < -0.5 || buttonPressed(12)) && click == 1) {
          // UP
          if (index === 2) moveTo(0); // C → A
          else if (index === 3) moveTo(1); // D → B
        }

        if ((gamepad.axes[1] > 0.5 || buttonPressed(13)) && click == 1) {
          // DOWN
          if (index === 0) moveTo(2); // A → C
          else if (index === 1) moveTo(3); // B → D
        }

        if (buttonPressed(0)) {
          console.log("Click", click);
          switch (click) {
            case 1:
              checkAnswer();
              break;
            case 2:
              handleNextQuestion();
              break;
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

  }, [currentQuestion, selectedChoice, firstSelected, click]);

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
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
      setColorStep(colorStep + 1);
      setClick(1);
      setIncorrect(false);
      setTimeLeft(duration);
      setSelectedChoice(null);
      setFirstSelected(false);
    }
  };

  const checkAnswer = () => {
    const isLastQuestion = currentQuestionIndex >= 9;
    const hasAnswered = answers && answers[currentQuestion._id];

    if (!hasAnswered) {
      // toast.error("Please select an answer before proceeding.");
      // No answer given, mark as incorrect
      console.log(currentQuestion)
      // handleAnswerChange(currentQuestion._id, 0, false);
      setSelectedChoice(null);
      setIncorrect(true);
      setClick(2);
    } else {

      setClick(2);
    }

    // Clear any existing timeout before setting a new one
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Wait 5 seconds, then proceed
    timeoutRef.current = setTimeout(() => {
      if (isLastQuestion) {
        setPage(4); // Show result page
      } else {
        handleNextQuestion(); // Move to next question
      }
    }, 5000);
  };

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

      {
        import.meta.env.MODE == "development" &&
        < DevTools
          click={click}
          isLastQuestion={currentQuestionIndex >= 9}
          hasAnswered={answers && answers[currentQuestion._id]} />
      }

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
      <div
        className="w-full h-full mx-auto min-h-screen flex flex-col items-center justify-start relative z-10">

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
