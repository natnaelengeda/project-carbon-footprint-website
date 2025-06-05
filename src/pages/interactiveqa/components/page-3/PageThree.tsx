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
import DevTools from "../DevToolts";

// Styles
import "./styles/styles.css";

// Interface for props
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  questions: any[];
  answers: { [key: number]: number };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  setCheck: React.Dispatch<React.SetStateAction<{ question: number, answer: number, isCorrect: boolean }[] | []>>;
  setQuestions: any;
}

export default function xPageThree({ setPage, answers, setAnswers, setQuestions, setCheck, questions }: Props) {
  // State for color progress bar
  const [colorStep, setColorStep] = useState<number>(0);
  // Index of the current question
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  // State for marking incorrect answers
  const [incorrect, setIncorrect] = useState(false);
  // State for the currently selected choice
  const [selectedChoice, setSelectedChoice] = useState<any>();
  // State to track if a choice has been selected for the first time
  const [firstSelected, setFirstSelected] = useState<boolean>(false);
  // State for gamepad connection
  const [gamepadConnected, setGamepadConnected] = useState(false);

  // Retrieve saved questions from localStorage
  const savedQuestions = localStorage.getItem("questions");
  //console.log("Saved Questions from localStorage:", savedQuestions);

  //console.log("Questions prop:", questions);

  // Ref for timer timeout
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // State for tracking the current question and answer
  const [currentQuestionA, setCurruentQuestion] = useState({
    question: 0,
    answer: 0,
  });

  // Get the current question object
  //const currentQuestion: any = questions && questions[currentQuestionIndex];
  const maxQuestions = Math.min(questions.length,10);
  const currentQuestion = questions && questions.slice(0,10)[currentQuestionIndex];

  // Timer duration and state
  const duration = 30;
  const [timeLeft, setTimeLeft] = useState(duration);

  // State to track click phase: 1 = answering, 2 = reviewing
  const [click, setClick] = useState<number>(1);

  // Ref for X button cooldown (prevents rapid repeat actions)
  const xButtonCooldownRef = useRef(false);

  // --- Gamepad logic and navigation ---
  useEffect(() => {
    let gamepadCheckInterval: NodeJS.Timeout;
    let prevXPressed = false; // For edge detection of X button

    // Polls the gamepad state and handles navigation/answering
    const checkGamepad = () => {
      const gamepads = navigator.getGamepads();
      const gamepad = gamepads[0];

      if (gamepad) {
        setGamepadConnected(true);

        // Helper to check if a button is pressed
        const buttonPressed = (index: number) => gamepad.buttons[index]?.pressed;
        const options = currentQuestion.translations[0].options;

        // If no choice selected yet, select the first one on any navigation input
        if (!firstSelected && click === 1) {
          if (
            Math.abs(gamepad.axes[0]) > 0.5 ||
            Math.abs(gamepad.axes[1]) > 0.5 ||
            buttonPressed(12) || buttonPressed(13) || buttonPressed(14) || buttonPressed(15)
          ) {
            const a = options[0];
            setSelectedChoice(a);
            handleAnswerChange(currentQuestion._id, a._id, a.isCorrect);
            setFirstSelected(true);
          }
          return;
        }

        // Find the index of the currently selected choice
        const selectedId = selectedChoice?._id;
        const index = options.findIndex((o: any) => o._id === selectedId);

        // Helper to move selection to a new option
        const moveTo = (newIndex: number) => {
          const opt = options[newIndex];
          setSelectedChoice(opt);
          handleAnswerChange(currentQuestion._id, opt._id, opt.isCorrect);
        };

        // Navigation logic for D-pad/axes/buttons
        if ((gamepad.axes[0] > 0.5 || buttonPressed(15)) && click === 1) {
          if (index === 0) moveTo(1);
          else if (index === 2) moveTo(3);
        }
        if ((gamepad.axes[0] < -0.5 || buttonPressed(14)) && click === 1) {
          if (index === 1) moveTo(0);
          else if (index === 3) moveTo(2);
        }
        if ((gamepad.axes[1] < -0.5 || buttonPressed(12)) && click === 1) {
          if (index === 2) moveTo(0);
          else if (index === 3) moveTo(1);
        }
        if ((gamepad.axes[1] > 0.5 || buttonPressed(13)) && click === 1) {
          if (index === 0) moveTo(2);
          else if (index === 1) moveTo(3);
        }

        // --- X button edge detection with 2s cooldown ---
        // Only trigger on transition from not pressed to pressed, and only if not in cooldown
        const xPressed = buttonPressed(0);
        if (xPressed && !prevXPressed && !xButtonCooldownRef.current) {
          xButtonCooldownRef.current = true; // Start cooldown
          switch (click) {
            case 1:
              checkAnswer();
              break;
            case 2:
              handleNextQuestion();
              break;
          }
          // Set a 2 second delay before X can be triggered again
          setTimeout(() => {
            xButtonCooldownRef.current = false;
          }, 500);
        }
        prevXPressed = xPressed; // Update previous X button state
      }
    };

    // Start polling for gamepad input if connected
    if (navigator.getGamepads && navigator.getGamepads()[0]) {
      setGamepadConnected(true);
      gamepadCheckInterval = setInterval(checkGamepad, 100);
    }

    // Handlers for gamepad connect/disconnect events
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

    // Cleanup on unmount
    return () => {
      window.removeEventListener("gamepadconnected", handleGamepadConnected);
      window.removeEventListener("gamepaddisconnected", handleGamepadDisconnected);
      if (gamepadCheckInterval) clearInterval(gamepadCheckInterval);
    };
  }, [currentQuestion, selectedChoice, firstSelected, click]);

  // --- Handles answer selection and updates state ---
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

  // --- Handles moving to the next question or results page ---
  const handleNextQuestion = () => {
    console.log(currentQuestionIndex + 1);
    if (currentQuestionIndex >= maxQuestions - 1) {
      setPage(4); // Go to results page if last question
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

  // --- Checks the answer and moves to next question after a delay ---
  const checkAnswer = () => {
    const isLastQuestion = currentQuestionIndex >= maxQuestions - 1;
    const hasAnswered = answers && answers[currentQuestion._id];

    if (!hasAnswered) {
      // No answer given, mark as incorrect
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

  // --- Loads saved questions from localStorage on mount ---
  useEffect(() => {
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  // --- Render UI ---
  return (
    <QABackground>
      {/* Show gamepad connection status */}
      {gamepadConnected && (
        <div className="absolute top-2 right-6 bg-green-100 text-green-800 px-3 py-1 rounded-md text-sm">
          Gamepad Connected
        </div>
      )}

      {/* Dev tools for development mode */}
      {
        import.meta.env.MODE == "development" &&
        <DevTools
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

      {/* Main content */}
      <div
        className="w-full h-full mx-auto min-h-screen flex flex-col items-center justify-start relative z-10">

        {/* Questions and choices */}
        <div
          className="w-full md:w-[auto] flex flex-col items-start justify-start gap-4 md:gap-[60px] text-white pt-[150px]">
          {/* Question */}
          <div
            className="relative w-full flex flex-col items-center justify-center"
            style={{
              maxWidth: "600px",  // Restricts width for wrapping
              margin: "0 auto",   // Centers the content horizontally
              minHeight: "200px", // Increased height to accommodate up to four lines
              maxHeight: "250px", // Restricts height to prevent overflow
              marginBottom: "20px", // Adds spacing below the question box
            }}
          >
            <div
              className="w-full bg-white bg-opacity-0 rounded-lg p-4"
              style={{
                minHeight: "200px", // Increased height to accommodate up to four lines
                maxHeight: "250px", // Restricts height to prevent overflow
                display: "flex",    // Enables flexbox layout
                flexDirection: "column", // Ensures content stacks vertically
                alignItems: "center", // Centers content horizontally
                justifyContent: "center", // Centers content vertically
                wordBreak: "break-word", // Ensures long words wrap
                textAlign: "center", // Centers text horizontally
                lineHeight: "1.5", // Sets line height for consistent spacing
              }}
            >
              <Question
                questions={questions}
                currentQuestion={currentQuestion}
              />
            </div>
          </div>

          {/* Choices */}
          <Choice
            questions={questions}
            currentQuestion={currentQuestion}
            click={click}
            handleAnswerChange={handleAnswerChange}
            setSelectedChoice={setSelectedChoice}
            answers={answers} />

          {/* Feedback for answers */}
          <div
            className="relative w-full flex flex-col items-center justify-center"
            style={{
              minHeight: "100px", // Ensures space is always reserved
              maxWidth: "600px",  // Restricts width for wrapping
              margin: "0 auto",
            }}
          >
            <div
              className="w-full bg-white bg-opacity-10 rounded-lg p-4"
              style={{
                minHeight: "80px", // Ensures the box is always visible
                maxHeight: "150px", // Restricts height to prevent overflow
                overflow: "hidden", // Prevents layout shifts caused by long text
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                wordBreak: "break-word",
              }}
            >
              <EmptyAnswer incorrect={incorrect} />
              <CorrectAnswer click={click} currentQuestionA={currentQuestionA} selectedChoice={selectedChoice} />
              <IncorrectAnswer click={click} currentQuestionA={currentQuestionA} selectedChoice={selectedChoice} />
            </div>
          </div>
        </div>

        {/* Next question navigation */}
        <NextQuestion
          questions={questions}
          click={click}
          currentQuestionIndex={currentQuestionIndex}
          checkAnswer={checkAnswer}
          handleNextQuestion={handleNextQuestion}
          setPage={setPage} />
      </div>
    </QABackground>
  );
}
