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

  // Adjust label positions to avoid overlap
  const labelOffsetAbove = Math.abs(yourPercent - globalPercent) < 10 ? 15 : 0; // Offset for labels above the bar
  const labelOffsetBelow = Math.abs(yourPercent - globalPercent) < 10 ? 25 : 10; // Extra separation for labels below the bar

  // Ensure labels stay within the container boundaries
  const adjustBoundary = (percent: number) => {
    if (percent < 5) return 5; // Prevent text from going too far left
    if (percent > 95) return 95; // Prevent text from going too far right
    return percent;
  };

  return (
    <div className="w-full max-w-3xl space-y-4">

      {/* Labels Above Bar */}
      <div className="relative h-3">
        <div
          className="absolute text-sm text-white font-medium"
          style={{
            left: `${adjustBoundary(yourPercent)}%`,
            transform: `translateX(-50%) translateY(${labelOffsetAbove}px)`, // Offset for labels above the bar
          }}
        >
          {firstText}
        </div>
        <div
          className="absolute text-sm text-white font-medium"
          style={{
            left: `${adjustBoundary(globalPercent)}%`,
            transform: `translateX(-50%) translateY(-${labelOffsetAbove}px)`, // Offset for labels above the bar
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
            left: `${adjustBoundary(yourPercent)}%`,
            transform: `translateX(-50%) translateY(${labelOffsetBelow}px)`, // Extra separation for labels below the bar
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
            left: `${adjustBoundary(globalPercent)}%`,
            transform: `translateX(-50%) translateY(-${labelOffsetBelow}px)`, // Extra separation for labels below the bar
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

