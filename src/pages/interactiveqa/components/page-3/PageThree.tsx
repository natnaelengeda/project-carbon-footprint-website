import { useEffect, useState } from "react";

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
}

const questionsCAR = [
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

// const questions = [
//   {
//     _id: "676a8b25ba2d2f8f2d154186",
//     category: "Transportation",
//     difficulty: "Medium",
//     translations: [
//       {
//         language: "English",
//         question: "What is the main source of renewable energy?",
//         options: [
//           {
//             text: "Solar",
//             isCorrect: true,
//             explanation: "Solar energy is the main source of renewable energy.",
//             _id: "676a8b25ba2d2f8f2d154188"
//           },
//           {
//             text: "Coal",
//             isCorrect: false,
//             explanation: "Coal is not renewable energy.",
//             _id: "676a8b25ba2d2f8f2d154189"
//           },
//           {
//             text: "Oil",
//             isCorrect: false,
//             explanation: "Oil is a fossil fuel, not renewable energy.",
//             _id: "676a8b25ba2d2f8f2d15418a"
//           },
//           {
//             text: "Natural Gas",
//             isCorrect: false,
//             explanation: "Natural gas is not a renewable energy source.",
//             _id: "676a8b25ba2d2f8f2d15418b"
//           }
//         ],
//         _id: "676a8b25ba2d2f8f2d154187"
//       }
//     ],
//     createdAt: "2024-12-24T10:21:25.299Z",
//     updatedAt: "2024-12-24T10:21:25.299Z",
//     __v: 0
//   },
//   {
//     _id: "676d8b25ba2d2f8f2d154186",
//     category: "Transportation",
//     difficulty: "Easy",
//     translations: [
//       {
//         language: "English",
//         question: "What is the fastest mode of transportation?",
//         options: [
//           {
//             text: "Airplane",
//             isCorrect: true,
//             explanation: "Airplanes are currently the fastest mode of transportation.",
//             _id: "676d8b25ba2d2f8f2d154188"
//           },
//           {
//             text: "Train",
//             isCorrect: false,
//             explanation: "Trains are fast, but not faster than airplanes.",
//             _id: "676d8b25ba2d2f8f2d154189"
//           },
//           {
//             text: "Car",
//             isCorrect: false,
//             explanation: "Cars are slower compared to airplanes.",
//             _id: "676d8b25ba2d2f8f2d15418a"
//           },
//           {
//             text: "Bicycle",
//             isCorrect: false,
//             explanation: "Bicycles are much slower than airplanes.",
//             _id: "676d8b25ba2d2f8f2d15418b"
//           }
//         ],
//         _id: "676d8b25ba2d2f8f2d154187"
//       }
//     ],
//     createdAt: "2024-12-25T10:00:00.000Z",
//     updatedAt: "2024-12-25T10:00:00.000Z",
//     __v: 0
//   },
//   {
//     _id: "676e8b25ba2d2f8f2d154186",
//     category: "Environment",
//     difficulty: "Medium",
//     translations: [
//       {
//         language: "English",
//         question: "What is the most eco-friendly mode of transportation?",
//         options: [
//           {
//             text: "Bicycle",
//             isCorrect: true,
//             explanation: "Bicycles have no emissions and are eco-friendly.",
//             _id: "676e8b25ba2d2f8f2d154188"
//           },
//           {
//             text: "Car",
//             isCorrect: false,
//             explanation: "Cars emit greenhouse gases, making them less eco-friendly.",
//             _id: "676e8b25ba2d2f8f2d154189"
//           },
//           {
//             text: "Train",
//             isCorrect: false,
//             explanation: "Trains are more eco-friendly than cars but not as much as bicycles.",
//             _id: "676e8b25ba2d2f8f2d15418a"
//           },
//           {
//             text: "Airplane",
//             isCorrect: false,
//             explanation: "Airplanes have high carbon emissions, making them less eco-friendly.",
//             _id: "676e8b25ba2d2f8f2d15418b"
//           }
//         ],
//         _id: "676e8b25ba2d2f8f2d154187"
//       }
//     ],
//     createdAt: "2024-12-25T10:05:00.000Z",
//     updatedAt: "2024-12-25T10:05:00.000Z",
//     __v: 0
//   }
// ];

export default function PageThree({ page, setPage, answers, setAnswers, questions }: Props) {
  const [colorStep, setColorStep] = useState<number>(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [incorrect, setIncorrect] = useState(false);

  // Timer
  const duration = 20;
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
      console.log("Empty Answers");
      setIncorrect(true);
      setClick(2);
    } else {
      console.log("Answers are present");
      setClick(2);
    }
  }

  const currentQuestion: any = questions && questions[currentQuestionIndex];

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
            duration={duration}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            handleNextQuestion={handleNextQuestion}
            questionLength={questionLength}
            checkAnswer={checkAnswer} />

          {/* Type */}
          <div
            className="flex flex-row items-center justify-start gap-2 md:gap-[20px]">
            <div
              style={{
                backgroundColor: colors[colorStep]
              }}
              className={`w-[50px] h-[12px] `}>
            </div>
            <div>
              <p
                className="text-xl md:text-[36px] font-semibold">
                {currentQuestion.category}
              </p>
            </div>
          </div>

          {/* Question */}
          <div className="px-3 md:px-0">
            <h1
              className="text-2xl md:text-[48px] font-bold md:leading-10">
              {currentQuestion.translations[0].question}
            </h1>
          </div>

          {/* Choices */}
          <div
            className="w-full h-auto flex flex-col items-start justify-start gap-5 md:gap-[60px] px-3 md:px-0">
            {
              currentQuestion.translations[0].options.map((choice: any, index: number) => {
                return (
                  <div
                    key={index}
                    className="w-full h-auto flex flex-row items-start justify-start gap-3 md:gap-[20px]">
                    <label
                      key={choice._id}
                      className="w-full h-auto flex flex-row items-center md:items-start justify-start gap-3 md:gap-[20px] custom-radio">
                      <input
                        type="radio"
                        name={`question-${currentQuestion._id}`}
                        value={choice._id}
                        checked={answers[currentQuestion._id] === choice._id}
                        onChange={() => {
                          if (click == 1) {
                            handleAnswerChange(currentQuestion._id, choice._id)
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
                          currentQuestionA.answer == choice._id &&
                          <>
                            <div
                              className="pt-5">
                              <p><span className={`${choice.isCorrect ? "text-primary" : "text-red-500"} font-bold`}>{choice.isCorrect ? "Correct: " : "Incorrect Answer: "}</span> {choice.explanation}</p>
                            </div>
                          </>
                        }
                        {
                          // click == 2 &&
                        }
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
