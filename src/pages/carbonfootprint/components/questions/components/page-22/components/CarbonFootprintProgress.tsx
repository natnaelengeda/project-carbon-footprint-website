import { motion } from "framer-motion";

type Props = {
  value: number;
  secondValue: number;
  firstText?: string;
  secondText?: string;
  firstColror?: string;
  secondColor?: string;
};

const LABEL_VERTICAL_OFFSET = 18; // Base vertical distance from the bar to the label's center
const LINE_WIDTH = 2; // px
const LABEL_HORIZONTAL_OFFSET = 6; // px - Horizontal gap between the line and the label
const VERTICAL_STACK_GAP = 18; // px - Vertical separation between stacked labels
const TAILWIND_SPACEY_GAP_PX = 0; // px - Tailwind's `space-y-4` gap equivalent

function getTextColor(bg: string | undefined, fallback = "text-white") {
  if (!bg) return fallback;
  return bg.replace("bg-", "text-");
}

const CarbonFootprintProgress = ({
  value,
  secondValue,
  firstText = "You",
  secondText = "Global Average",
  firstColror = "bg-green-400",
  secondColor = "bg-blue-500",
}: Props) => {
  const fullScale = value > secondValue ? Number(value) + 200 : Number(secondValue) + 200;
  const yourPercent = Math.min((value / fullScale) * 100, 100);
  const globalPercent = Math.min((secondValue / fullScale) * 100, 100);

  // Helper to decide label side based on 50% mark
  const getLabelSide = (percent: number) => (percent < 50 ? "left" : "right");

  // Render label+line for a value
  const renderLabelWithLine = (
    percent: number,
    label: string,
    color: string,
    _textColor: string, // not used, always white
    above: boolean,
    lineLength: number = 24,
    valueLabel?: React.ReactNode,
    additionalVerticalOffset: number = 0
  ) => {
    const side = getLabelSide(percent);
    const totalLineLength = lineLength + additionalVerticalOffset;

    // Container for the line and label
    const containerStyle: React.CSSProperties = {
      position: "absolute",
      left: 0,
      width: "100%",
      pointerEvents: "none",
      zIndex: 2,
      height: `${totalLineLength}px`,
      ...(above
        ? { bottom: "100%" } // aligns container's bottom with bar's top
        : { top: "100%" }    // aligns container's top with bar's bottom
      ),
    };

    // The vertical line itself
    const lineStyle: React.CSSProperties = {
      position: "absolute",
      left: `${percent}%`,
      width: LINE_WIDTH,
      height: `${totalLineLength}px`,
      background: color.startsWith("bg-") ? undefined : color,
      backgroundColor: color.startsWith("bg-") ? undefined : color,
      zIndex: 1,
      top: 0,
      transform: "translateX(-50%)",
    };

    // The label
    const labelStyle: React.CSSProperties = above
      ? {
          position: "absolute",
          left: `${percent}%`,
          whiteSpace: "nowrap",
          pointerEvents: "auto",
          zIndex: 2,
          top: 0,
          transform:
            side === "right"
              ? `translate(calc(-100% - ${LABEL_HORIZONTAL_OFFSET}px), -50%)`
              : `translate(${LABEL_HORIZONTAL_OFFSET}px, -50%)`,
        }
      : {
          position: "absolute",
          left: `${percent}%`,
          whiteSpace: "nowrap",
          pointerEvents: "auto",
          zIndex: 2,
          bottom: 0,
          transform:
            side === "right"
              ? `translate(calc(-100% - ${LABEL_HORIZONTAL_OFFSET}px), 50%)`
              : `translate(${LABEL_HORIZONTAL_OFFSET}px, 50%)`,
        };

    const labelClass = `text-sm font-medium text-white`;

    return (
      <div style={containerStyle}>
        <div style={lineStyle} className={color.startsWith("bg-") ? color : ""} />
        <span style={labelStyle} className={labelClass}>{label}{valueLabel}</span>
      </div>
    );
  };

  const yourSide = getLabelSide(yourPercent);
  const globalSide = getLabelSide(globalPercent);

  let firstLabelAboveOffset = 0;
  let secondLabelAboveOffset = 0;
  let firstLabelBelowOffset = 0;
  let secondLabelBelowOffset = 0;

  // Logic for vertical stacking when labels are on the same side
  if (yourSide === globalSide) {
    const distYour = Math.abs(yourPercent - 50);
    const distGlobal = Math.abs(globalPercent - 50);

    // The label that is further from the 50% mark gets the additional vertical offset
    if (distYour > distGlobal) {
      firstLabelAboveOffset = VERTICAL_STACK_GAP;
      firstLabelBelowOffset = VERTICAL_STACK_GAP;
    } else if (distGlobal > distYour) {
      secondLabelAboveOffset = VERTICAL_STACK_GAP;
      secondLabelBelowOffset = VERTICAL_STACK_GAP;
    }
    // If distances are equal, they are at the same point, so no additional offset is needed.
  }

  return (
    <div className="w-full max-w-3xl  relative">
      {/* Labels Above Bar */}
      <div className="relative" style={{ height: 0 }}>
        {renderLabelWithLine(
          yourPercent,
          firstText,
          firstColror,
          getTextColor(firstColror),
          true, // above bar
          LABEL_VERTICAL_OFFSET, // base line length
          undefined, // no value label for top labels
          firstLabelAboveOffset // dynamic vertical offset
        )}
        {renderLabelWithLine(
          globalPercent,
          secondText,
          secondColor,
          getTextColor(secondColor),
          true, // above bar
          LABEL_VERTICAL_OFFSET, // base line length
          undefined, // no value label for top labels
          secondLabelAboveOffset // dynamic vertical offset
        )}
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
          className={`absolute h-3 ${firstColror} rounded-full z-10`}
          initial={{ width: 0 }}
          animate={{ width: `${yourPercent}%` }}
          transition={{ duration: 1.5, delay: 0.2 }}
        />
      </div>

      {/* Values Below Bar */}
      <div className="relative" style={{ height: 0 }}>
        {renderLabelWithLine(
          yourPercent,
          "", // No main label for bottom values
          firstColror,
          getTextColor(firstColror),
          false, // below bar
          LABEL_VERTICAL_OFFSET, // base line length
          <span className={getTextColor(firstColror)}> {value.toLocaleString()} Kg CO₂ - e</span>, // value label
          firstLabelBelowOffset // dynamic vertical offset
        )}
        {renderLabelWithLine(
          globalPercent,
          "", // No main label for bottom values
          secondColor,
          getTextColor(secondColor),
          false, // below bar
          LABEL_VERTICAL_OFFSET, // base line length
          <span className={getTextColor(secondColor)}> {secondValue.toLocaleString()} Kg CO₂ - e</span>, // value label
          secondLabelBelowOffset // dynamic vertical offset
        )}
      </div>
    </div>
  );
};

export default CarbonFootprintProgress;