import { useTranslation } from "react-i18next";

interface IIncorrectAnswer {
  incorrect: boolean;
}

export default function EmptyAnswer({ incorrect }: IIncorrectAnswer) {
  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));
  const { t } = useTranslation();

  return (
    <div
      style={{
        display: !incorrect ? "none" : ""
      }}
      className="w-full h-auto rounded-lg">
      <p className="text-2xl md:text-[30px]"><span className="font-bold text-red-500">{t("qa.incorrect_answer", { lng: savedlanguages.qa })}:</span> {t("qa.empty_answer", { lng: savedlanguages.qa })}</p>
    </div>
  )
}
