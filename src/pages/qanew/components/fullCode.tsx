import { useState, useEffect } from "react";

const API_URL = "https://carbonfootprint.smartcsvtool.com/api/v1/question/rnd"; // Replace with actual API URL

type Option = {
  text: string;
  isCorrect: boolean;
  explanation: string;
  _id: string;
};

type Question = {
  _id: string;
  difficulty: string;
  translations: {
    language: string;
    question: string;
    options: Option[];
  }[];
};

export default function fullCode() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedChoice, setSelectedChoice] = useState<Option | null>(null);
  const [status, setStatus] = useState<"correct" | "wrong" | "empty" | null>(null);
  const [timer, setTimer] = useState(5);
  const [score, setScore] = useState(0);
  const [quizEnded, setQuizEnded] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ language: "English" }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setQuestions(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000);
      return () => clearTimeout(countdown);
    } else if (status === null) {
      setStatus("empty");
      setTimeout(handleNext, 3000);
    }
  }, [timer]);

  if (loading) return <div className="text-center p-8">Loading...</div>;
  if (questions.length === 0) return <div className="text-center p-8">No questions available</div>;

  const questionData = questions[currentQuestion].translations.find((t) => t.language === "English");

  const handleSelect = (option: Option) => setSelectedChoice(option);

  const handleSubmit = () => {
    if (!selectedChoice) return;
    setStatus(selectedChoice.isCorrect ? "correct" : "wrong");
    if (selectedChoice.isCorrect) setScore(score + 1);
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedChoice(null);
      setStatus(null);
      setTimer(5);
    } else {
      setQuizEnded(true);
    }
  };

  if (quizEnded) {
    return (
      <div className="flex flex-col items-center p-8 text-center">
        <h1 className="text-2xl font-bold">Quiz Completed!</h1>
        <p className="text-lg mt-4">Your Score: {score} / {questions.length}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-8">
      <h1 className="text-xl font-bold">{questionData?.question}</h1>
      <div className="mt-4">
        {questionData?.options.map((option) => (
          <button
            key={option._id}
            onClick={() => handleSelect(option)}
            className={`block w-full p-2 my-2 border rounded ${selectedChoice?._id === option._id ? "bg-blue-500 text-white" : "bg-gray-200"
              }`}
          >
            {option.text}
          </button>
        ))}
      </div>
      <p className="mt-2">Time Left: {timer} sec</p>
      <button
        onClick={status ? handleNext : handleSubmit}
        className="mt-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        {status ? "Next" : "Submit"}
      </button>
      {status && (
        <p className={`mt-2 ${status === "correct" ? "text-green-500" : status === "wrong" ? "text-red-500" : "text-gray-500"}`}>
          {status === "correct" ? "Correct!" : status === "wrong" ? "Wrong!" : "No Answer!"}
        </p>
      )}
      {status && selectedChoice && <p className="text-sm mt-2">{selectedChoice.explanation}</p>}
    </div>
  );
}