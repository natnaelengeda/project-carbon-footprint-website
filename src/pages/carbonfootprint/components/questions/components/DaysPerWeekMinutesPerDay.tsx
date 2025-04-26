import { useTranslation } from 'react-i18next';

interface IPage {
  text: string;
  selectedDays: any;
  selectedHours: any;
}

export default function DaysPerWeekMinutesPerDay({ text, selectedDays, selectedHours }: IPage) {
  const { t } = useTranslation();
  const sectionLanguage = JSON.parse(localStorage.getItem("language") || "");

  return (
    <p className="text-[20px]">{t("carbon.you_choose", { lng: sectionLanguage.carbon })} <span className="text-primary">{text} {t("carbon.for", { lng: sectionLanguage.carbon })} {selectedDays} {t("carbon.days", { lng: sectionLanguage.carbon })}</span> {t("carbon.per_week_and", { lng: sectionLanguage.carbon })} <span className="text-primary">{selectedHours} {t("carbon.minutes_per_day", { lng: sectionLanguage.carbon })}</span></p>
  )
}
