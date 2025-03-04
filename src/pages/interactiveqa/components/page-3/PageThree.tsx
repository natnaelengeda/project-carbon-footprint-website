import React, { useEffect, useRef, useState } from "react";

// Page Layout
import PagesLayout from "../../layouts/PagesLayout";

// Components
import Timer from "./components/Timer";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Styles
import "./styles/styles.css";


// Interface
interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  questions: any[];
  answers: { [key: number]: number };
  setAnswers: React.Dispatch<React.SetStateAction<{ [key: number]: number }>>;
  setQuestions: any;
}


const colors = [
  "#CB6EDC", // Question 1
  "#FFA034", // Question 2
  "#3449FF", // Question 3
  "#1B9AAA", // Question 4
  "#E94F37", // Question 5
  "#FFB000", // Question 6
  "#8E44AD", // Question 7
  "#2980B9", // Question 8
  "#27AE60", // Question 9
  "#2C3E50"  // Question 10
];


export default function PageThree({ page, setPage, answers, setAnswers, setQuestions, questions }: Props) {
  const [colorStep, setColorStep] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrect, setIncorrect] = useState(false);
  const [selectedChoice, setSelectedChoice] = useState<any>();

  const [currentQuestionId, setCurrentQuestionId] = useState<number | null>(0);
  const [currentAnswerId, setCurrentAnswerId] = useState<number | null>(0);

  const savedQuestions = localStorage.getItem("questions");

  const isKeyPressed = useRef(false);
  const [key, setKey] = useState(null);

  useEffect(() => {
    if (isKeyPressed.current) {
      console.log(key);

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
  const duration = 10;
  const [timeLeft, setTimeLeft] = useState(duration);

  // Question Length 
  const questionLength = questions.length;

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
    setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    setColorStep(colorStep + 1);
    setClick(1);
    setIncorrect(false);
    setTimeLeft(duration);
  };

  const checkAnswer = () => {
    if (!answers || Object.keys(answers).length === 0) {
      // handleAnswerChange(currentQuestion._id, currentQuestion.translations[0].options[0]._id);
      setSelectedChoice('000');
      console.log("Empty Answers");
      setIncorrect(true);
      setClick(2);

      setTimeout(() => {
        handleNextQuestion();
      }, 2000);
    } else {
      console.log("Answers are present");
      setClick(2);
    }
  }

  const currentQuestion: any = questions && questions[currentQuestionIndex];

  useEffect(() => {
    if (savedQuestions) {
      setQuestions(JSON.parse(savedQuestions));
    }
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${AppAsset.BackgroundHorizontal})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "contain",
        position: "relative",
      }}
      className="w-full h-full min-h-screen flex flex-col items-start justify-start pl-[400px]">

      {/* Logo */}
      <div
        className='absolute top-0 left-0 z-20 pl-[99px] pt-[74px]'>
        <img
          style={{
            width: "250px",
            height: "167px",
            objectFit: "contain"
          }}
          src={AppAsset.Logo}
          className='' />
      </div>

      {/* TImer */}
      <div className="absolute top-0 right-0 pr-[112px] pt-[92px] z-10">
        <Timer
          page={page}
          setPage={setPage}
          duration={duration}
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          handleNextQuestion={handleNextQuestion}
          questionLength={questionLength}
          checkAnswer={checkAnswer} />

      </div>

      {/* Background Overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)", // You can adjust the last value (0.5) to change opacity
          zIndex: 1,
        }} />

      {/* Main */}
      <div className="w-full h-full min-h-screen flex flex-col items-start justify-start relative z-10">

        {/* Questions */}
        <div
          className="w-full md:w-[auto] flex flex-col items-start justify-start gap-4 md:gap-[60px] text-white">


          {/* Question */}
          <div className="w-[1200px] px-3 md:px-0 md:pt-[100px]">
            <h1
              style={{
                lineHeight: "1.3"
              }}
              className="text-2xl md:text-[48px] font-bold md:leading-10 space-y-2">
              {questions && currentQuestion.translations[0].question}
            </h1>
          </div>

          {/* Choices */}
          <div
            className="w-full h-auto grid grid-cols-2 space-y-5 items-center justify-start gap-5 md:gap-[30px] px-3 md:px-0 m">
            {
              questions &&
              currentQuestion.translations[0].options.map((choice: any, index: number) => {
                return (
                  <div
                    key={index}
                    onClick={() => {
                      if (click == 1) {
                        handleAnswerChange(currentQuestion._id, choice._id)
                        setSelectedChoice(choice);
                      }
                    }}
                    className={`w-full h-auto flex flex-row items-center justify-start gap-3 md:gap-[20px] border rounded-lg py-5 pl-3 md:w-[480px] md:min-h-[120px] ${answers[currentQuestion._id] === choice._id ? "bg-[#35D36A40] border-primary" : "border-white "}`}>
                    <label
                      key={choice._id}
                      className="w-full h-auto flex flex-row items-center md:items-start justify-start gap-3 md:gap-[20px] custom-radio">
                      <span className="text-lg md:text-[30px]">
                        {
                          ["A) ", "B) ", "C) ", "D) "][index] || null
                        }
                      </span>
                      <span
                        className="text-lg md:text-[30px] font-normal">
                        <p
                          style={{
                            whiteSpace: 'wrap',
                            flex: 'wrap',
                            lineHeight: "1.2",
                          }}>
                          {choice.text}
                        </p>

                      </span>
                    </label>
                  </div>
                );
              })
            }
          </div>

          <div>
            {
              incorrect &&
              <div
                className="w-full h-auto rounded-lg">
                <p className="text-2xl md:text-[30px]"><span className="font-bold text-red-500">Incorrect Answer:</span> Empty Answers</p>
              </div>
            }

            {
              click == 2 &&
              currentQuestionA.answer == selectedChoice._id &&
              <>
                <div
                  className="pt-5 w-[80rem]">
                  <p
                    style={{
                      lineHeight: "1.5"
                    }}
                    className="text-2xl md:text-[30px]">
                    <span
                      style={{
                        lineHeight: "1.2"
                      }}
                      className={`${selectedChoice.isCorrect ? "text-primary" : "text-red-500"} font-bold`}>{selectedChoice.isCorrect ? "Correct: " : "Incorrect Answer: "}</span>
                    {selectedChoice.explanation}</p>
                </div>
              </>
            }
          </div>
        </div>


        {/* Next Questions */}
        <div
          className="w-full pt-0 md:pt-10 flex flex-row items-center justify-end pr-10 md:pr-[140px] gap-1 md:gap-5 ">

          {
            questions &&
            currentQuestionIndex < questions.length - 1 &&
            (
              <button
                onClick={() => {
                  switch (click) {
                    case 1:
                      checkAnswer();
                      break;
                    case 2:
                      handleNextQuestion();
                      break;

                  }
                }}
                className="flex flex-row items-center justify-center w-60 h-60 md:w-[220.32px] md:h-[100px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2">
                {
                  click == 1 ?
                    <>
                      <p className="text-xl md:text-[34px]">Submit</p>
                    </> :
                    <>
                      <p className="text-xl md:text-[34px]">Next</p>
                      <img
                        className="w-6 md:w-[34.56px] h-auto object-contain"
                        src={AppAsset.RightArrowIcon} />
                    </>
                }
              </button>
            )}
          {
            questions &&
            currentQuestionIndex === questions.length - 1 && (
              <button
                onClick={() => {
                  setPage(4);
                }}
                className="flex flex-row items-center justify-center md:w-[220.32px] md:h-[100px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2">
                <p
                  className="text-xl md:text-[34px]">Submit</p>
              </button>
            )
          }
        </div>
      </div>

    </div>
  )
}
