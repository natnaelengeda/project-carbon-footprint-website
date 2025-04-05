import { useState } from "react";
import PageOne from "./components/PageOne";

export default function QANew() {
  const [page, setPage] = useState<number>(1);

  const [questions, setQuestions] = useState<any>(null);
  const [answers, setAnswers] = useState<{ [key: number]: number }>({});
  const [check, setCheck] = useState<{ question: number, answer: number, isCorrect: boolean }[] | []>([]);
  const [score, setScore] = useState<number>(0);
  const [cuserId, setcUserId] = useState<number | null>(null);

  return (
    <div
      className="w-full h-screen">
      {
        page == 1 ?
          <PageOne setPage={setPage}/> : null
      }

    </div>
  )
}
