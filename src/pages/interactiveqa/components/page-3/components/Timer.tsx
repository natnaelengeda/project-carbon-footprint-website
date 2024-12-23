import { useState, useEffect } from 'react';

// Interface
interface Props {
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  handleNextQuestion: () => void;
  checkAnswer: () => void;
}

export default function Timer({ page, setPage, handleNextQuestion, checkAnswer }: Props) {
  const width = window.innerWidth;

  // Duration
  const duration = 20;
  const [timeLeft, setTimeLeft] = useState(duration);

  // Progress calculation
  const radius = width > 768 ? 150 : 50; // Circle radius
  const circumference = 2 * Math.PI * radius;
  const progress = ((duration - timeLeft) / duration) * circumference;

  useEffect(() => {
    if (timeLeft <= 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  console.log(page);
  // Update Time when reacher 0
  useEffect(() => {
    if (timeLeft === 0) {
      handleNextQuestion();
      // setPage((prev) => prev + 1);
      checkAnswer();
      setTimeLeft(duration);
    }
  }, [timeLeft, setPage, duration]);

  return (
    <div className='w-full flex items-center justify-center'>
      <div
        className="relative w-36 h-36 md:w-[343px] md:h-[343px] object-contain">
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
            strokeWidth={width > 640 ? 40 : 10}
            fill="transparent"
          />
          {/* Animated Circle */}
          <circle
            cx="50%"
            cy="50%"
            r={radius}
            stroke="#10b981"
            strokeWidth={width > 640 ? 30 : 10}

            fill="transparent"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - progress}
            className="transition-all duration-1000"
          />
        </svg>

        {/* Center Content */}
        <div
          className="absolute inset-0 flex flex-col justify-center items-center md:gap-5">
          <span
            className="text-4xl md:text-[84.24px] font-bold text-gray-900">
            {timeLeft}
          </span>
          <span
            className="text-sm md:text-[37px] text-gray-600 font-normal">
            Seconds
          </span>
        </div>
      </div>
    </div>
  )
}
