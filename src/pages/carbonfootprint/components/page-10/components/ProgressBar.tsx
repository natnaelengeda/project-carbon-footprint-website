
// Styles
import "../styles/styles.css";

// Interface
interface ProgressBarProps {
  percentage: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const width = `${percentage}%`;

  return (
    <div className="flex overflow-hidden relative flex-col md:mt-5 w-full rounded-2xl min-h-[10px] md:min-h-[18px] max-md:max-w-full">
      <div
        className="progress-bar-container">
        <div
          className="progress-bar-indicator"
          style={{ width: width }}>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;