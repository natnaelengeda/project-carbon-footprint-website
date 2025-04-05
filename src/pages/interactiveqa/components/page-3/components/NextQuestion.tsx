import { useTranslation } from "react-i18next";

// App Asset
import AppAsset from '@/core/AppAsset';

interface INextQuestion {
  questions: any;
  click: number;
  currentQuestionIndex: number;
  checkAnswer: () => void;
  handleNextQuestion: () => void;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function NextQuestion({ questions, click, currentQuestionIndex, checkAnswer, handleNextQuestion, setPage }: INextQuestion) {

  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));
  const { t } = useTranslation();

  return (
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
            className="flex flex-row items-center justify-center w-60 h-60 md:w-[160.32px] md:h-[60px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2">
            {
              click == 1 ?
                <>
                  <p className="text-xl md:text-[24px]">{t("qa.submit", { lng: savedlanguages.qa })}</p>
                </> :
                <>
                  <p className="text-xl md:text-[24px]">{t("qa.next", { lng: savedlanguages.qa })}</p>
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
            className="flex flex-row items-center justify-center md:w-[160.32px] md:h-[60px] bg-primary rounded-full text-white px-3 md:px-0 py-2 md:py-0 gap-2">
            <p
              className="text-xl md:text-[24px]">{t("qa.submit", { lng: savedlanguages.qa })}</p>
          </button>
        )
      }
    </div>
  )
}
