// Components
import ProgressBar from "./ProgressBar";

// Types
interface MetricItemProps {
  label: string;
  percentage: number;
}


const MetricItem: React.FC<MetricItemProps> = ({ label, percentage }) => {

  const checkGrade = () => {
    if (percentage >= 90) {
      return (
        <div className="flex-1 shrink text-right basis-0">Poor</div>
      );
    }
    if (percentage >= 75) {
      return (
        <div className="flex-1 shrink text-right basis-0">Very Good</div>
      );
    }

    if (percentage >= 65) {
      return (
        <div className="flex-1 shrink text-right basis-0">Average</div>
      );
    }

    if (percentage >= 45) {
      return (
        <div className="flex-1 shrink text-right basis-0">Good</div>
      );
    }

    if (percentage >= 35) {
      return (
        <div className="flex-1 shrink text-right basis-0">Very Good</div>
      );
    }

    return (
      <div className="flex-1 shrink text-right basis-0">Excellent</div>
    );

  }
  
  return (
    <div className="flex flex-col md:mt-14 w-full max-md:mt-5 md:max-md:mt-10 max-md:max-w-full">
      <div className="flex flex-wrap gap-7 items-start w-full text-md md:text-2xl leading-loose text-slate-900 max-md:max-w-full">
        <div
          className="flex-1 shrink basis-0">
          <p
            style={{
              whiteSpace: 'nowrap',
            }}>
            {label}
          </p>
        </div>
        {checkGrade()}
      </div>
      <ProgressBar
        percentage={percentage} />
    </div>
  );
};

export default MetricItem;