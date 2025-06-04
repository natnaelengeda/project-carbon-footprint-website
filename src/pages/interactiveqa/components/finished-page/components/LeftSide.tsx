import React from 'react';

// App Asset
import AppAsset from '@/core/AppAsset';

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
      <ScoreDisplay score={sum} />
    </div>
  );
}

interface ScoreDisplayProps {
  score: number;
}

const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score }) => {
  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));
  const { t } = useTranslation();

  return (
    <>
      <div className="mt-2 text-4xl font-bold text-center text-white max-md:mt-10 max-md:text-4xl ">
        {score}/100
      </div>
      <div className="mt-2 text-2xl text-center leading-[58px] text-white w-[562px] max-md:mt-10 max-md:max-w-full">
        {/* Score Below 50 */}
        {score < 50 && (
          <span className="font-medium">
            {savedlanguages.qa === "en"
              ? "Please try again!"
              : "እባኮትን ደግመው ይሞክሩ!"}
          </span>
        )}

        {/* Score Between 50 and 80 */}
        {score >= 50 && score <= 85 && (
          <span className="font-medium">
            {savedlanguages.qa === "en"
              ? "Good Job, thank you for participating!"
              : "ጥሩ ውጤት ስለተሳተፉ እናመሰግናለን!"}
          </span>
        )}

        {/* Score Above 80 */}
        {score > 85 && (
          <span className="font-medium">
            {savedlanguages.qa === "en"
              ? "Congratulations on excellent performance!"
              : "በጣም ጥሩ ውጤት እንኳን ደስ አለዎት!"}
          </span>
        )}
      </div>
    </>
  );
};
