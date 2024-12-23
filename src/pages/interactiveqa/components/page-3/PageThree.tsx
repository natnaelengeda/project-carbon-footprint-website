import { useState } from "react";

// Page Layout
import PagesLayout from "../../layouts/PagesLayout";

// Components
import Timer from "./components/Timer";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Styles
import "./styles/styles.css";

const questions = [
  {
    id: 1,
    type: "General Awareness Questions (1/15)",
    color: "#CB6EDC",
    question: "What percentage of the Earth's surface is covered by water?",
    choices: [
      { id: 1, text: "14%", isCorrect: true, explanation: "Around 71% of Earth's surface is covered by water, primarily in the form of oceans, seas, rivers, and lakes." },
      { id: 2, text: "50%", isCorrect: false, explanation: "This estimate is too low compared to the actual percentage, which is about 71%." },
      { id: 3, text: "70%", isCorrect: false, explanation: "Close, but the actual figure is slightly over 70%, around 71%." },
      { id: 4, text: "97%", isCorrect: false, explanation: "97% refers to the amount of Earth's water found in oceans, not the surface coverage." }
    ]
  },
  {
    id: 2,
    type: "Carbon Footprint Awareness Questions (1/8)",
    color: "#FFA034",
    question: "Which action reduces the most CO2 emissions?",
    choices: [
      { id: 1, text: "14%", isCorrect: true, explanation: "Reducing CO2 emissions requires significant systemic changes; specific actions are measured based on impact." },
      { id: 2, text: "36%", isCorrect: false, explanation: "This choice is higher than realistic CO2 emission reductions from a single action." },
      { id: 3, text: "65%", isCorrect: false, explanation: "65% is far too high and would require major industrial changes." },
      { id: 4, text: "80%", isCorrect: false, explanation: "While ambitious, such reductions are achieved through long-term, large-scale initiatives." },
      { id: 5, text: "90%", isCorrect: false, explanation: "A 90% reduction is impractical through a single habit or action." }
    ]
  },
  {
    id: 3,
    type: "Decision Challenges (1/7)",
    color: "#3449FF",
    question: "You're buying groceries. What's the most eco-friendly choice?",
    choices: [
      { id: 1, text: "Vegetables", isCorrect: true, explanation: "Vegetables have a lower carbon footprint compared to animal products due to less resource use." },
      { id: 2, text: "Poultry", isCorrect: false, explanation: "Poultry has a smaller footprint than beef but still requires more resources than vegetables." },
      { id: 3, text: "Meat", isCorrect: false, explanation: "Meat, especially beef, has a high environmental impact due to land, water, and methane emissions." }
    ]
  },
  {
    id: 4,
    type: "General Awareness Questions (2/15)",
    color: "#1B9AAA",
    question: "What is the largest ocean on Earth?",
    choices: [
      { id: 1, text: "Atlantic Ocean", isCorrect: false, explanation: "The Atlantic Ocean is the second largest ocean, not the largest." },
      { id: 2, text: "Indian Ocean", isCorrect: false, explanation: "The Indian Ocean is smaller than the Pacific and Atlantic Oceans." },
      { id: 3, text: "Pacific Ocean", isCorrect: true, explanation: "The Pacific Ocean is the largest ocean, covering about 30% of Earth's surface." },
      { id: 4, text: "Arctic Ocean", isCorrect: false, explanation: "The Arctic Ocean is the smallest of the world's oceans." }
    ]
  },
  {
    id: 5,
    type: "Carbon Footprint Awareness Questions (2/8)",
    color: "#E94F37",
    question: "What is the primary greenhouse gas responsible for global warming?",
    choices: [
      { id: 1, text: "Oxygen", isCorrect: false, explanation: "Oxygen is essential for life but does not contribute to greenhouse effects." },
      { id: 2, text: "Nitrogen", isCorrect: false, explanation: "Nitrogen makes up most of Earth's atmosphere but is not a greenhouse gas." },
      { id: 3, text: "Carbon Dioxide", isCorrect: true, explanation: "Carbon dioxide (CO2) is the leading greenhouse gas responsible for climate change." },
      { id: 4, text: "Hydrogen", isCorrect: false, explanation: "Hydrogen does not contribute to greenhouse gas emissions." }
    ]
  },
  {
    id: 6,
    type: "Decision Challenges (2/7)",
    color: "#FFB000",
    question: "Which mode of transportation has the smallest carbon footprint?",
    choices: [
      { id: 1, text: "Car", isCorrect: false, explanation: "Cars contribute significant emissions compared to bicycles." },
      { id: 2, text: "Bicycle", isCorrect: true, explanation: "Bicycles produce no emissions and are the most eco-friendly mode of transportation." },
      { id: 3, text: "Bus", isCorrect: false, explanation: "Buses are efficient but still produce emissions." },
      { id: 4, text: "Airplane", isCorrect: false, explanation: "Airplanes have a very high carbon footprint per passenger mile." }
    ]
  },
  {
    id: 7,
    type: "General Awareness Questions (3/15)",
    color: "#8E44AD",
    question: "Which renewable energy source generates the most electricity worldwide?",
    choices: [
      { id: 1, text: "Car", isCorrect: false, explanation: "Cars contribute significant emissions compared to bicycles." },
      { id: 2, text: "Bicycle", isCorrect: true, explanation: "Bicycles produce no emissions and are the most eco-friendly mode of transportation." },
      { id: 3, text: "Bus", isCorrect: false, explanation: "Buses are efficient but still produce emissions." },
      { id: 4, text: "Airplane", isCorrect: false, explanation: "Airplanes have a very high carbon footprint per passenger mile." }
    ]
  },
  {
    id: 8,
    type: "Carbon Footprint Awareness Questions (3/8)",
    color: "#2980B9",
    question: "What daily habit can save the most water?",
    choices: [
      { id: 1, text: "Car", isCorrect: false, explanation: "Cars contribute significant emissions compared to bicycles." },
      { id: 2, text: "Bicycle", isCorrect: true, explanation: "Bicycles produce no emissions and are the most eco-friendly mode of transportation." },
      { id: 3, text: "Bus", isCorrect: false, explanation: "Buses are efficient but still produce emissions." },
      { id: 4, text: "Airplane", isCorrect: false, explanation: "Airplanes have a very high carbon footprint per passenger mile." }
    ]
  },
  {
    id: 9,
    type: "Decision Challenges (3/7)",
    color: "#27AE60",
    question: "You're choosing a reusable item. Which has the least environmental impact?",
    choices: [
      { id: 1, text: "Car", isCorrect: false, explanation: "Cars contribute significant emissions compared to bicycles." },
      { id: 2, text: "Bicycle", isCorrect: true, explanation: "Bicycles produce no emissions and are the most eco-friendly mode of transportation." },
      { id: 3, text: "Bus", isCorrect: false, explanation: "Buses are efficient but still produce emissions." },
      { id: 4, text: "Airplane", isCorrect: false, explanation: "Airplanes have a very high carbon footprint per passenger mile." }
    ]
  },
  {
    id: 10,
    type: "General Awareness Questions (4/15)",
    color: "#2C3E50",
    question: "Which country emits the most CO2 globally?",
    choices: [
      { id: 1, text: "Car", isCorrect: false, explanation: "Cars contribute significant emissions compared to bicycles." },
      { id: 2, text: "Bicycle", isCorrect: true, explanation: "Bicycles produce no emissions and are the most eco-friendly mode of transportation." },
      { id: 3, text: "Bus", isCorrect: false, explanation: "Buses are efficient but still produce emissions." },
      { id: 4, text: "Airplane", isCorrect: false, explanation: "Airplanes have a very high carbon footprint per passenger mile." }
    ]
  },
]

// Interface
interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageThree({ page, setPage }: Props) {
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
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
    setClick(1);
  };

  const checkAnswer = () => {
    console.log(currentQuestionA);
    setClick(2);
  }
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <PagesLayout>
      <div
        className="w-full h-full min-h-screen flex flex-col items-center justify-start pt-10 md:pt-[66px]">

        {/* Questions */}
        <div
          className="w-full md:w-[724px] flex flex-col items-start justify-start gap-4 md:gap-[95px]">

          {/* Timer */}
          <Timer
            page={page}
            setPage={setPage}
            handleNextQuestion={handleNextQuestion} 
            checkAnswer={checkAnswer}/>

          {/* Type */}
          <div
            className="flex flex-row items-center justify-start gap-2 md:gap-[20px]">
            <div
              style={{
                backgroundColor: currentQuestion.color
              }}
              className={`w-[50px] h-[12px] `}>
            </div>
            <div>
              <p className="text-xl md:text-[36px] font-semibold">{currentQuestion.type}</p>
            </div>
          </div>

          {/* Question */}
          <div className="px-3 md:px-0">
            <h1
              className="text-2xl md:text-[48px] font-bold md:leading-10">{currentQuestion.question}</h1>
          </div>

          {/* Choices */}
          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-5 md:gap-[60px] px-3 md:px-0">
            {
              currentQuestion.choices.map((choice, index) => {
                return (
                  <div
                    key={index}
                    className="w-full h-auto flex flex-row items-start justify-start gap-3 md:gap-[20px]">
                    <label
                      key={choice.id}
                      className="w-full h-auto flex flex-row items-center md:items-start justify-start gap-3 md:gap-[20px] custom-radio">
                      <input
                        type="radio"
                        name={`question-${currentQuestion.id}`}
                        value={choice.id}
                        checked={answers[currentQuestion.id] === choice.id}
                        onChange={() => {
                          if (click == 1) {
                            handleAnswerChange(currentQuestion.id, choice.id)
                          }
                        }}
                      />
                      <span
                        className="custom-radio-button">
                      </span>
                      <span
                        className="text-lg md:text-[30px] font-normal">
                        {choice.text}
                        {
                          click == 2 &&
                          currentQuestionA.answer == choice.id &&
                          <>
                            <div
                              className="pt-5">
                              <p><span className={`${choice.isCorrect ? "text-primary" : "text-red-500"} font-bold`}>{choice.isCorrect ? "Correct: " : "Incorrect Answer: "}</span> {choice.explanation}</p>
                            </div>
                          </>

                        }
                      </span>
                    </label>
                  </div>
                );
              })
            }
          </div>
        </div>


        {/* Next Questions */}
        <div
          className="w-full pt-10 md:pt-40 flex flex-row items-center justify-end pr-10 md:pr-[140px] gap-1 md:gap-5">

          {
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
                className="flex flex-row items-center justify-center md:w-[220.32px] md:h-[100px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2">
                {click == 1 ?
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
    </PagesLayout>
  )
}
