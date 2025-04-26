import React, { useEffect } from "react";
import CarbonLanguage from "@/utils/carbonLanguage";
import Skeleton from "react-loading-skeleton";
import AppAsset from "@/core/AppAsset";
import confetti from "canvas-confetti";

const count = 200;
const defaults = {
  origin: { y: 0.7 },
};

function fire(particleRatio: number, opts: any) {
  confetti({
    ...defaults,
    ...opts,
    particleCount: Math.floor(count * particleRatio),
  });
}

function fireConfetti(level: "excellent" | "very_good" | "good") {
  const particleSettings = {
    excellent: {
      particleRatio: 0.5,
      spread: 120,
      startVelocity: 70,
      scalar: 1.4,
    },
    very_good: {
      particleRatio: 0.25,
      spread: 80,
      startVelocity: 50,
      scalar: 1.0,
    },
    good: {
      particleRatio: 0.1,
      spread: 50,
      startVelocity: 30,
      scalar: 0.8,
    },
  };

  const settings = particleSettings[level];

  fire(settings.particleRatio, {
    spread: settings.spread,
    startVelocity: settings.startVelocity,
    scalar: settings.scalar,
  });

  fire(settings.particleRatio * 0.8, {
    spread: settings.spread + 20,
    startVelocity: settings.startVelocity - 10,
    decay: 0.92,
    scalar: settings.scalar * 1.1,
  });

  fire(settings.particleRatio * 0.6, {
    spread: settings.spread + 40,
    startVelocity: settings.startVelocity - 20,
    decay: 0.91,
    scalar: settings.scalar * 1.2,
  });
}

export default function Result({ value, isLoading }: { value: string; isLoading: boolean }) {
  const BadgeChecker = (number: number) => {
    if (number < 1000) {
      return AppAsset.ExcellentBadge; // Excellent
    } else if (number >= 1000 && number <= 1750) {
      return AppAsset.VeryGoodBadge; // Very Good
    } else if (number >= 1751 && number <= 2500) {
      return AppAsset.GoodBadge; // Good
    } else if (number >= 2501 && number <= 3000) {
      return AppAsset.PoorBadge; // Poor
    } else if (number >= 3001 && number <= 4500) {
      return AppAsset.BadBadge; // Bad
    } else if (number > 4500) {
      return AppAsset.VeryVeryBadBadge; // Very Very Bad
    } else {
      return AppAsset.GoodBadge; // Optional fallback
    }
  };

  const GradeChecker = (number: number) => {
    if (number < 1000) {
      return "excellent"; // Excellent
    } else if (number >= 1000 && number <= 1750) {
      return "very_good";
    } else if (number >= 1751 && number <= 2500) {
      return "good";
    } else if (number >= 2501 && number <= 3000) {
      return "poor";
    } else if (number >= 3001 && number <= 4500) {
      return "very_poor";
    } else if (number > 4500) {
      return "very_very_bad";
    } else {
      return "good";
    }
  };

  useEffect(() => {
    const grade = GradeChecker(parseInt(value));
    if (["excellent", "very_good", "good"].includes(grade)) {
      fireConfetti(grade as "excellent" | "very_good" | "good");
    }
  }, [value]);

  return (
    <div className="w-full flex flex-col items-center justify-center gap-8 mb-20">
      {isLoading ? (
        <>
          <div
            style={{
              width: "464px",
              height: "408px",
            }}
            className="rounded-2xl overflow-hidden"
          >
            <Skeleton className="w-full h-full" />
          </div>

          <span
            style={{
              fontSize: "76px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold"
          >
            <div className="w-80 h-20">
              <Skeleton className="w-full h-full" />
            </div>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <div className="w-[40rem] h-12 my-2">
              <Skeleton className="w-full h-full" />
            </div>
            <div className="w-80 h-20">
              <Skeleton className="w-full h-full" />
            </div>
          </span>
        </>
      ) : (
        <>
          <img
            src={BadgeChecker(parseInt(value))}
            style={{
              width: "464px",
              height: "408px",
            }}
          />

          <span
            style={{
              fontSize: "76px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold"
          >
            <h1 className="font-bold">
              <CarbonLanguage name={GradeChecker(parseInt(value))} />
            </h1>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <p style={{ fontSize: "29px" }} className="font-semibold">
              <CarbonLanguage name="your_carbon_footprint_per_year_is" />
              
            </p>
            <h2 style={{ fontSize: "56px" }} className="font-bold">
              {value} KG CO₂-e
            </h2>
          </span>
        </>
      )}
    </div>
  );
}
