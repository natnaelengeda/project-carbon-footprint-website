
// App Asset
import AppAsset from '@/core/AppAsset';

interface ILanguageButton {
  functions: () => void;
  language: string;
  selected: number;
  currLanuage: string;
  viewLanguage: string;
}

export default function LanguageButton({ functions, selected, language, currLanuage, viewLanguage }: ILanguageButton) {
  return (
    <button
      onClick={functions}
      className={`w-full h-20 md:w-[700px] md:h-[100px] 3xl:w-[800px] 3xl:h-[150px]  flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px] border-2 border-[#35D36A] rounded-lg ${language == currLanuage ? "bg-[#35D36A] " : ""} ${selected == ((currLanuage == "english") ? 0 : 1) ? "border-2 border-white" : ""}`}>
      <img
        src={language == currLanuage ? AppAsset.RadioOneWHite : AppAsset.RadioOffIcon}
        className="w-7 h-auto object-contain" />
      <p
        className={`text-xl md:text-[30px] 3xl:text-[50px] ${language == currLanuage ? "font-bold" : ""}`}>
        {viewLanguage}
      </p>
    </button>
  );
}
