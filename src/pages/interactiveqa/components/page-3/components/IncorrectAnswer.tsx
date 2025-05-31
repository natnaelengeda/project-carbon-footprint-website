import { useTranslation } from "react-i18next";

interface ICorrectAnswer {
  click: number;
  currentQuestionA: any;
  selectedChoice: any;
}

export default function IncorrectAnswer({ click, currentQuestionA, selectedChoice }: ICorrectAnswer) {
  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));
  const { t } = useTranslation();

  return (
    <>
      {
        click == 2 &&
        selectedChoice &&
        selectedChoice._id &&
        currentQuestionA.answer == selectedChoice._id &&
        !selectedChoice.isCorrect &&
        <>
          <div
            className="pt-5 w-full">
            <p
              style={{
                lineHeight: "1.5"
              }}
              className="text-5xl md:text-[15px]">
              <span
                style={{
                  lineHeight: "1.2"
                }}
                className={`${!selectedChoice.isCorrect && "text-red-500"} font-bold`}>{!selectedChoice.isCorrect && `${t("qa.incorrect_answer", { lng: savedlanguages.qa })}: `}</span>
              {selectedChoice.explanation}
            </p>
          </div>
        </>
      }

    </>
  )
}
