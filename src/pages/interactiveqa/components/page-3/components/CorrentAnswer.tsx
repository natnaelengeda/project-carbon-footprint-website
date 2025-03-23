import { useTranslation } from "react-i18next";

interface ICorrectAnswer {
  click: number;
  currentQuestionA: any;
  selectedChoice: any;
}

export default function CorrectAnswer({ click, currentQuestionA, selectedChoice }: ICorrectAnswer) {
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
        currentQuestionA.answer == selectedChoice._id &&
        selectedChoice.isCorrect &&
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
                className={`${selectedChoice.isCorrect && "text-primary"} font-bold`}>{selectedChoice.isCorrect && `${t("qa.correct", { lng: savedlanguages.qa })}:`}</span>
              {selectedChoice.explanation}
            </p>
          </div>
        </>
      }

    </>
  )
}
