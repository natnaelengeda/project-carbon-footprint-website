import { useTranslation } from 'react-i18next';

export default function CarbonLanguage({ name }: { name: string }) {
  const { t } = useTranslation();
  const sectionLanguage = JSON.parse(localStorage.getItem("language") || "{}");

  return <>{t(`carbon.${name}`, { lng: sectionLanguage?.carbon })}</>;
}