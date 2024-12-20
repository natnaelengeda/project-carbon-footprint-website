import { useState } from "react";

// AppAsset
import AppAsset from "@/core/AppAsset";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageZero({ setPage }: Props) {
  const [lanuage, setLanguage] = useState<string>("amharic");

  return (
    <div className="w-full h-full min-h-screen flex flex-col items-center justify-start pt-10 md:pt-[220px] gap-20 md:gap-[236px]">

      {/* Title */}
      <div className="flex flex-col items-center justify-start gap-2 md:gap-[55px]">
        <img
          src={AppAsset.Logo}
          className="md:[150px] h-auto object-contain" />
        <p className="text-2xl md:text-[64px] font-semibold">Choose language</p>
      </div>

      {/* Choice */}
      <div
        className="w-full md:w-[640px] flex flex-col items-start justify-start gap-7 md:gap-[80px] px-3 md:px-0">

        <button
          onClick={() => setLanguage("amharic")}
          className="w-full h-20 md:w-[650px] md:h-[88px] bg-[#35D36A1A] flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px]">
          <img
            src={lanuage == "amharic" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
            className={`w- md:w-7 h-auto object-contain`} />
          <p
            className={`text-2xl md:text-[36px] ${lanuage == "amharic" ? "font-bold" : ""}`}>
            አማርኛ
          </p>

        </button>

        <button
          onClick={() => setLanguage("english")}
          className="w-full h-20 md:w-[650px] md:h-[88px] bg-[#35D36A1A] flex flex-row items-center justify-start gap-5 md:gap-[32px] px-3 md:px-[33px]">
          <img
            src={lanuage == "english" ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
            className="w-7 h-auto object-contain" />
          <p
            className={`text-2xl md:text-[36px] ${lanuage == "english" ? "font-bold" : ""}`}>
            English
          </p>

        </button>

      </div>

      {/* Start Button */}
      <div className="w-full flex items-center justify-center pt-28 md:pt-[200px]">
        <button
          onClick={() => setPage(1)}
          className="bg-primary hover:opacity-70 flex flex-row items-center justify-end md:w-[650px] md:h-[88.9px] rounded-full gap-3 md:gap-[235.4px] md:px-[26.45px] px-5 py-3">
          <p
            className="font-semibold text-2xl md:text-[30px] text-white">
            Start
          </p>
          <img
            src={AppAsset.RightArrowIcon}
            className="w-5 md:w-[36px] h-auto object-contain"
          />
        </button>

      </div>

    </div>
  )
}
