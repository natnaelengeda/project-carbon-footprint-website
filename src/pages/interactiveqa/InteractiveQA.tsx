import { useState } from "react";

// Pages
import PageOne from "./components/page-1";
import PageTwo from "./components/page-2";
import PageThree from "./components/page-3";
import FinishedPage from "./components/finished-page";
import LeadersBoard from "./components/leadersboard";
import UploadQuestions from "./components/uploadQuestions";

export default function InteractiveQA() {
  const [page, setPage] = useState<number>(1);

  const [questions, setQuestions] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [check, setCheck] = useState<{ question: number, answer: number, isCorrect: boolean }[] | []>([]);
  const [score, setScore] = useState<number>(0);
  const [cuserId, setcUserId] = useState<number | null>(null);

  return (
    <div className="w-full h-screen">
      {
        page == 1 ?
          <PageOne
            setPage={setPage} /> :
          page == 2 ?
            <PageTwo
              setPage={setPage}
              setQuestions={setQuestions} /> :
            page == 3 ?
              questions &&
              <PageThree
                setPage={setPage}
                questions={questions}
                answers={answers}
                setAnswers={setAnswers}
                setCheck={setCheck}
                setQuestions={setQuestions} /> :
              page == 4 ?
                <FinishedPage
                  setPage={setPage}
                  answers={answers}
                  questions={questions}
                  setScore={setScore}
                  check={check}
                  setcUserId={setcUserId} /> :
                page == 5 ?
                  <LeadersBoard
                    score={score}
                    setPage={setPage}
                    cuserId={cuserId} /> :
                
                  null

      }
    </div>
  )
}
