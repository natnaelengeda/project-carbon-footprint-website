import { motion } from "framer-motion";

type Props = {
  value: number;
  secondValue: number;
  firstText?: string;
  secondText?: string;
  firstColror?: string;
  secondColor?: string;
};

const CarbonFootprintProgress = ({
  value,
  secondValue,
  firstText = "You",
  secondText = "Global Average",
  firstColror = "bg-green-400",
  secondColor = "bg-blue-500",
}: Props) => {
  // Calculate the full scale of the bar
  const fullScale = value > secondValue ? Number(value) + 200 : Number(secondValue) + 200;
  const yourPercent = Math.min((value / fullScale) * 100, 100);
  const globalPercent = Math.min((secondValue / fullScale) * 100, 100);

  // Ensure labels stay within the container boundaries
  const adjustBoundary = (percent: number) => {
    if (percent < 5) return 5; // Prevent text from going too far left
    if (percent > 95) return 95; // Prevent text from going too far right
    return percent;
  };

  // Dynamically adjust vertical offsets to prevent overlap and enforce separation
  const proximity = Math.abs(yourPercent - globalPercent);
  const labelOffsetAbove = proximity < 10 ? 20 : 10; // Increase offset for labels above the bar
  const labelOffsetBelow = proximity < 10 ? 30 : 15; // Increase offset for labels below the bar
  const minimumSeparation = 5; // Minimum separation between labels

  // Adjust positions to ensure minimum separation
  const adjustedYourPercent = adjustBoundary(yourPercent);
  const adjustedGlobalPercent = adjustBoundary(globalPercent);

  const aboveLabelOffset = adjustedYourPercent > adjustedGlobalPercent
    ? labelOffsetAbove + minimumSeparation
    : labelOffsetAbove;

  const belowLabelOffset = adjustedYourPercent < adjustedGlobalPercent
    ? labelOffsetBelow + minimumSeparation
    : labelOffsetBelow;

  return (
    <div className="w-full max-w-3xl space-y-4">

      {/* Labels Above Bar */}
      <div className="relative h-3">
        <div
          className="absolute text-sm text-white font-medium"
          style={{
            left: `${adjustedYourPercent}%`,
            transform: `translateX(-50%) translateY(${aboveLabelOffset}px)`, // Offset for labels above the bar
          }}
        >
          {firstText}
        </div>
        <div
          className="absolute text-sm text-white font-medium"
          style={{
            left: `${adjustedGlobalPercent}%`,
            transform: `translateX(-50%) translateY(-${aboveLabelOffset}px)`, // Offset for labels above the bar
          }}
        >
          <p
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {secondText}
          </p>
        </div>
      </div>

      {/* Bar */}
      <div className="relative h-3 bg-gray-200 rounded-full overflow-hidden">
        {/* Global average fill */}
        <motion.div
          className={`absolute h-3 ${secondColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${globalPercent}%` }}
          transition={{ duration: 1.5 }}
        />
        {/* Your value fill */}
        <motion.div
          className={`absolute h-3 ${firstColror} rounded-full z-10`}
          initial={{ width: 0 }}
          animate={{ width: `${yourPercent}%` }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>

      {/* Values Below Bar */}
      <div className="relative h-6">
        <div
          className="absolute text-white text-sm font-semibold"
          style={{
            left: `${adjustedYourPercent}%`,
            transform: `translateX(-50%) translateY(${belowLabelOffset}px)`, // Extra separation for labels below the bar
          }}
        >
          <p
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {value.toLocaleString()} Kg CO₂ - e
          </p>
        </div>
        <div
          className="absolute text-white text-sm font-semibold"
          style={{
            left: `${adjustedGlobalPercent}%`,
            transform: `translateX(-50%) translateY(-${belowLabelOffset}px)`, // Extra separation for labels below the bar
          }}
        >
          <p
            style={{
              whiteSpace: "nowrap",
            }}
          >
            {secondValue.toLocaleString()} Kg CO₂ - e
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintProgress;

