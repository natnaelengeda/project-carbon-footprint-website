import React, { useEffect, useState } from "react";
type Progress = number[];

const StackedProgressBar: React.FC = () => {
  // Example progress values for each stacked section
  const [progress, setProgress] = useState<Progress>([20, 50]);

  const totalProgress = progress.reduce((acc, curr) => acc + curr, 0);
  const remainingProgress = 100 - totalProgress;

  // Labels for each segment
  const labels = ["You", "Global"];

  useEffect(() => {
    setProgress([10, 20]);
  }, []);

  return (
    <div className="w-full mx-auto">
      <div className="relative">
        {/* Top Labels */}
        <div className="flex justify-between mt-2">
          {progress.map((_, index) => (
            <div key={index} className="text-center">
              <span className=" text-white text-lg" >
                {labels[index]}
              </span>
            </div>
          ))}
        </div>
        {/* Progress Bar */}
        <div className="flex h-3 rounded-3xl overflow-hidden">
          {progress.map((value, index) => (
            <div
              key={index}
              className={`flex items-center justify-center text-white ${getSegmentClasses(
                index
              )}`}
              style={{ width: `${value}%` }}
            ></div>
          ))}
          {remainingProgress > 0 && (
            <div
              className="flex items-center justify-center bg-white text-sm"
              style={{ width: `${remainingProgress}%` }}
            ></div>
          )}
        </div>

        {/* Bottom Values */}
        <div className="flex justify-between mt-2 text-sm">
          {progress.map((value, index) => (
            <div key={index} className="text-center">
              {/* Exact values down the bar */}
              <span
                className="text-white font-bold text-sm">
                {value}
              </span>
            </div>
          ))}
          {remainingProgress > 0 && (
            <div className="text-center text-white text-sm">
              {/* Remaining progress value */}
              <span>{remainingProgress}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to choose segment color (optional)
const getSegmentClasses = (index: number): string => {
  const classes = [
    "bg-green-500", // Green
    "bg-blue-500", // Blue
  ];
  return classes[index % classes.length];
};

export default StackedProgressBar;