interface IQuestion {
  questions: any;
  currentQuestion: any;
}

export default function Question({ questions, currentQuestion }: IQuestion) {
  return (
    <div className="w-full px-3 md:px-0 md:pt-[140px]">
      <h1
        style={{
          lineHeight: "1.3"
        }}
        className="text-xl md:text-[32px] font-bold md:leading-9 space-y-2 text-center">
        {
          questions &&
          currentQuestion &&
          currentQuestion.translations[0].question
        }
      </h1>
    </div>
  )
}
