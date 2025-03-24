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
  setQuestions: any;
}

export default function xPageThree({ setPage, answers, setAnswers, setQuestions, questions }: Props) {
  const [colorStep, setColorStep] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrect, setIncorrect] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<any>();

  const savedQuestions = localStorage.getItem("questions");

  const isKeyPressed = useRef(false);
  const [key, setKey] = useState(null);

  useEffect(() => {
    if (isKeyPressed.current) {
      switch (key!) {
        case "a":
          if (click == 1) {
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[0]._id);
            setSelectedChoice(currentQuestion.translations[0].options[0]);
          }
          break;
        case "b":
          if (click == 1) {
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[1]._id);
            setSelectedChoice(currentQuestion.translations[0].options[1]);
          }
          break;
        case "c":
          if (click == 1) {
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[2]._id);
            setSelectedChoice(currentQuestion.translations[0].options[2]);
          }
          break;
        case "d":
          if (click == 1) {
            handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[3]._id);
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
  const duration = 2;
  const [timeLeft, setTimeLeft] = useState(duration);

  const [currentQuestionA, setCurruentQuestion] = useState({
    question: 0,
    answer: 0,
  });

  const [click, setClick] = useState<number>(1);

  const handleAnswerChange = (questionId: number, choiceId: number) => {
    setAnswers(prevAnswers => ({
      ...prevAnswers,
      [questionId]: choiceId
    }));

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
    if (!answers || Object.keys(answers).length === 0) {
      // handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[0]._id);
      setSelectedChoice('000');
      console.log("Empty Answers");
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
      {/* TImer */}
      <div className="absolute top-0 right-0 pr-[112px] pt-[92px] z-10">
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
