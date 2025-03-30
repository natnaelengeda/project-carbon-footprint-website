
interface IChoice {
  questions: any[];
  currentQuestion: any;
  click: number;
  handleAnswerChange: any;
  setSelectedChoice: any;
  answers: any;
}

export default function Choice({ click, questions, answers, currentQuestion, handleAnswerChange, setSelectedChoice }: IChoice) {
  return (
    <div
      className="w-full h-auto grid grid-cols-2 space-y-5 items-center justify-start gap-5 md:gap-[30px] px-3 md:px-0 m">
      {
        questions &&
        currentQuestion &&
        currentQuestion.translations &&
        currentQuestion.translations[0].options.map((choice: any, index: number) => {
          return (
            <div
              key={index}
              onClick={() => {
                if (click == 1) {
                  handleAnswerChange(currentQuestion._id, choice._id, choice.isCorrect)
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
  )
}
