import { motion } from "framer-motion";

type Props = {
  value: number;
  secondValue: number;
  firstText?: string;
  secondText?: string;
  firstColror?: string;
  secondColor?: string;
};

const CarbonFootprintProgress = ({ value, secondValue, firstText = "You", secondText = "Global Average", firstColror = "bg-green-400", secondColor = "bg-blue-500" }: Props) => {

  const fullScale = secondValue + 200;
  const yourPercent = Math.min((value / fullScale) * 100, 100);
  const globalPercent = Math.min((secondValue / fullScale) * 100, 100);

  return (
    <div className="w-full max-w-3xl space-y-4">

      {/* Labels Above Bar */}
      <div className="relative h-3">
        <div
          className="absolute text-sm text-white font-medium"
          style={{
            left: `${yourPercent}%`,
            transform: "translateX(-50%)",
          }}>
          {firstText}
        </div>
        <div
          className="absolute text-sm text-white font-medium"
          style={{
            left: `${globalPercent}%`,
            transform: "translateX(-50%)",
          }}>
          <p
            style={{
              whiteSpace: "nowrap"
            }}>
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
            left: `${yourPercent}%`,
            transform: "translateX(-50%)",
          }}>
          <p
            style={{
              whiteSpace: "nowrap"
            }}>
            {value.toLocaleString()} Kg CO₂ - e
          </p>
        </div>
        <div
          className="absolute text-white text-sm font-semibold"
          style={{
            left: `${globalPercent}%`,
            transform: "translateX(-50%)",
          }}>
          <p
            style={{
              whiteSpace: "nowrap"
            }}>
            {secondValue.toLocaleString()} Kg CO₂ - e
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarbonFootprintProgress;

