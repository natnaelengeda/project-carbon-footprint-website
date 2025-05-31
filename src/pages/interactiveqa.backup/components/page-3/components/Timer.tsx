import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  duration: number;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  checkAnswer: () => void;
}

export default function Timer({ setPage, duration, timeLeft, setTimeLeft, checkAnswer }: Props) {
  const width = window.innerWidth;

  const savedlanguages = JSON.parse(localStorage.getItem("language") || JSON.stringify({
    carbon: "en",
    pledge: "en",
    qa: "en"
  }));

  // React Language Packaged;
  const { t } = useTranslation();

  // Progress calculation
  const radius = 50; // Circle radius
  const circumference = 2 * Math.PI * radius;
  const progress = ((duration - timeLeft) / duration) * circumference;

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Update Time when reacher 0
  useEffect(() => {
    if (timeLeft === 0) {
      checkAnswer();
    }
  }, [timeLeft, setPage, duration]);

  return (
    <div className='w-full flex items-center justify-center'>
      <div
        className="relative w-36 h-36 md:w-[200px] md:h-[200px] object-contain text-white">

        {/* Circular Progress */}
        <svg
          className="transform -rotate-90"
          width="100%"
          height="100%">

          {/* Background Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#e0f2f1"
            strokeWidth={12}
            fill="transparent"
          />
          {/* Animated Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#10b981"
            strokeWidth={width > 640 ? 10 : 10}

            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000"
          />
        </svg>

        {/* Center Content */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center md:gap-1">
          <span
            className="text-xl md:text-[40px] font-bold text-white">
            {timeLeft}
          </span>
          <span
            className="text-xs md:text-[12px] text-white font-normal">
            {t("qa.seconds", { lng: savedlanguages.qa })}
          </span>
        </div>
      </div>
    </div>
  )
}
