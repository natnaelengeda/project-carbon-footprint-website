import React from 'react'

// App Asset
import AppAsset from '@/core/AppAsset'

// Translation
import { useTranslation } from "react-i18next";

export default function LeftSide({ sum }: { sum: number }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-start gap-5 pt-52">
      <img
        loading="lazy"
        src={AppAsset.SplashImage}
        alt="Score achievement illustration"
        className="object-contain max-w-full aspect-[1.13] w-[200px]" />
      <ScoreDisplay
        score={`${sum.toFixed(0)}/100`}
        rank="Top 10" />
    </div>
  );
}

interface ScoreDisplayProps {
  score: string;
  rank: string;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, rank }) => {
  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-2 text-4xl font-bold text-center text-white max-md:mt-10 max-md:text-4xl ">
        {score}
      </div>
      <div className="mt-2 text-2xl text-center leading-[58px] text-white w-[562px] max-md:mt-10 max-md:max-w-full">
        <span className="font-medium">{t("qa.congrats_your_one_of_the", { lng: savedlanguages.qa })}</span>{" "}
        {
          rank &&
          parseInt(rank) <= 10 &&
          <><span className="font-bold ">{t("qa.top_10", { lng: savedlanguages.qa })}</span>{" "}</>
        }
        {
          savedlanguages.qu == "en" ?
            <span
              className="font-medium">
              {t("qa.participants", { lng: savedlanguages.qa })}
            </span> :
            parseInt(rank) <= 10 ?
              <span
                className="font-medium">
                {t("qa.participants", { lng: savedlanguages.qa })}
              </span> : null
        }
      </div>
    </>
  );
};
