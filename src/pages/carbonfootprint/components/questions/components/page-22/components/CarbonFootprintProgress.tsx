import { motion } from "framer-motion";

type Props = {
  value: number;
  secondValue: number;
  firstText?: string;
  secondText?: string;
  firstColor?: string; // Typo corrected
  secondColor?: string;
};

// Define constants for layout calculations (assuming 1rem = 16px for pixel conversions if needed)
// h-3 for bar = 0.75rem. Let's assume this is 12px.
const BAR_HALF_HEIGHT_PX = 6;
// text-sm for labels. Approximate full height including line-height.
const LABEL_FULL_HEIGHT_PX = 16; // Adjust if actual rendered height is different
const LABEL_HALF_HEIGHT_PX = LABEL_FULL_HEIGHT_PX / 2;
const DESIRED_SEPARATION_FROM_BAR_PX = 5;
// When labels on the same side are too close horizontally, separate them vertically by:
const INTER_LABEL_VERTICAL_SEPARATION_PX = 5;
// Percentage threshold to consider labels horizontally close
const HORIZONTAL_PROXIMITY_THRESHOLD_PERCENT = 10;

const CarbonFootprintProgress = ({
  value,
  secondValue,
  firstText = "You",
  secondText = "Global Average",
  firstColor = "bg-green-400", // Typo corrected
  secondColor = "bg-blue-500",
}: Props) => {
  // Calculate the full scale of the bar
  const fullScale = value > secondValue ? Number(value) + 200 : Number(secondValue) + 200;
  const yourPercent = Math.min((value / fullScale) * 100, 100);
  const globalPercent = Math.min((secondValue / fullScale) * 100, 100);

  // Ensure labels stay within the container boundaries horizontally
  const adjustBoundary = (percent: number) => {
    if (percent < 5) return 5; // Prevent text from going too far left
    if (percent > 95) return 95; // Prevent text from going too far right
    return percent;
  };

  const adjustedYourPercent = adjustBoundary(yourPercent);
  const adjustedGlobalPercent = adjustBoundary(globalPercent);

  // Base Y positions ensuring DESIRED_SEPARATION_FROM_BAR_PX separation from bar edge
  // Negative Y is upwards, Positive Y is downwards from the bar's centerline
  const baseYAbove = -(BAR_HALF_HEIGHT_PX + DESIRED_SEPARATION_FROM_BAR_PX + LABEL_HALF_HEIGHT_PX);
  const baseYBelow = (BAR_HALF_HEIGHT_PX + DESIRED_SEPARATION_FROM_BAR_PX + LABEL_HALF_HEIGHT_PX);

  // Initialize final Y positions
  let finalFirstTextY = baseYAbove;
  let finalSecondTextY = baseYAbove;
  let finalValueY = baseYBelow;
  let finalSecondValueY = baseYBelow;

  const areLabelsHorizontallyClose = Math.abs(adjustedYourPercent - adjustedGlobalPercent) < HORIZONTAL_PROXIMITY_THRESHOLD_PERCENT;

  // Adjust labels ABOVE the bar if they are horizontally close
  if (areLabelsHorizontallyClose) {
    if (adjustedYourPercent <= adjustedGlobalPercent) { // If "You" is to the left or at the same spot
      // Push "Global Average" (secondText) further up
      finalSecondTextY = baseYAbove - (LABEL_FULL_HEIGHT_PX + INTER_LABEL_VERTICAL_SEPARATION_PX);
    } else { // If "Global Average" is to the left
      // Push "You" (firstText) further up
      finalFirstTextY = baseYAbove - (LABEL_FULL_HEIGHT_PX + INTER_LABEL_VERTICAL_SEPARATION_PX);
    }
  }

  // Adjust labels BELOW the bar if they are horizontally close
  if (areLabelsHorizontallyClose) {
    if (adjustedYourPercent <= adjustedGlobalPercent) { // If "value" (You) is to the left or at the same spot
      // Push "secondValue" (Global Average) further down
      finalSecondValueY = baseYBelow + (LABEL_FULL_HEIGHT_PX + INTER_LABEL_VERTICAL_SEPARATION_PX);
    } else { // If "secondValue" (Global Average) is to the left
      // Push "value" (You) further down
      finalValueY = baseYBelow + (LABEL_FULL_HEIGHT_PX + INTER_LABEL_VERTICAL_SEPARATION_PX);
    }
  }

  return (
    <div className="w-full max-w-3xl space-y-4">

      {/* Labels Above Bar */}
      <div className="relative h-3"> {/* Container height might need review depending on how far labels are pushed */}
        <div
          className="absolute text-sm text-white font-medium"
          style={{
            left: `${adjustedYourPercent}%`,
            transform: `translateX(-50%) translateY(${finalFirstTextY}px)`,
          }}
        >
          {firstText}
        </div>
        <div
          className="absolute text-sm text-white font-medium"
          style={{
            left: `${adjustedGlobalPercent}%`,
            transform: `translateX(-50%) translateY(${finalSecondTextY}px)`,
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
        <motion.div
          className={`absolute h-3 ${secondColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{ width: `${globalPercent}%` }}
          transition={{ duration: 1.5 }}
        />
        <motion.div
          className={`absolute h-3 ${firstColor} rounded-full z-10`}
          initial={{ width: 0 }}
          animate={{ width: `${yourPercent}%` }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>

      {/* Values Below Bar */}
      <div className="relative h-6"> {/* Container height might need review */}
        <div
          className="absolute text-white text-sm font-semibold"
          style={{
            left: `${adjustedYourPercent}%`,
            transform: `translateX(-50%) translateY(${finalValueY}px)`,
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
            transform: `translateX(-50%) translateY(${finalSecondValueY}px)`,
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

