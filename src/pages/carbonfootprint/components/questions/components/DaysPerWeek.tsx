import { useTranslation } from 'react-i18next';

interface IPage {
  text: string;
  selectedDays: any;
}

export default function DaysPerWeekHoursPerDay({ text, selectedDays }: IPage) {
  const { t } = useTranslation();
  const sectionLanguage = JSON.parse(localStorage.getItem("language") || "");

  return (
    <p className="text-[20px]"> <span className="text-primary">{text} {selectedDays} {t("carbon.days", { lng: sectionLanguage.carbon })}</span> {t("carbon.per_week_chosen", { lng: sectionLanguage.carbon })} </p>
  )
}
