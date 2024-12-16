// AppAsset
import AppAsset from "@/core/AppAsset";

export interface MetricItemProps {
  label: string;
  percentage: number;
}

export interface ProgressBarProps {
  percentage: number;
}

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function BlueBadge({ setPage }: Props) {

  const metricsData: MetricItemProps[] = [
    { label: 'Water Usage', percentage: 82 },
    { label: 'Transportation Impact', percentage: 79 },
    { label: 'Diet Sustainability', percentage: 73 },
    { label: 'Food Waste', percentage: 68 },
    { label: 'Waste Disposal & Recycling', percentage: 68 },
    { label: 'Energy Usage', percentage: 68 }
  ];

  return (
    <div
      className="w-full h-full min-h-screen flex flex-col items-center justify-start py-10 md:py-40 ">

      {/* Badge Image */}
      <div
        className="w-full h-auto px-5 md:px-0 flex justify-center">
        <img
          src={AppAsset.BlueBadge}
          className="w-full h-auto md:w-[598px] md:h-[527px] object-contain" />
      </div>

      {/* Text */}
      <div className="w-full h-full flex flex-col items-center justify-start gap-5 md:gap-[52px]">
        <p className="text-primary-blue text-4xl md:text-[64px] font-bold">Aqua - Warrior</p>
        <p className="text-xl md:text-[28px]">Congrats, You Got the "Aqua - Warrior" Badge!</p>
      </div>

      {/* Results */}
      <div
        className="w-full h-full flex flex-col items-center justify-start pt-5 md:pt-10  px-3 md:px-0 pb-10 md:pb-0">

        {/* Title */}
        <div
          className="flex flex-col items-center justify-start gap-10">
          <p
            className="text-xl md:text-[28px] text-[#B8B8B8] text-center">
            Here are your results compared to Ethiopian metrics
          </p>

          <hr className="w-full border border-[#B8B8B8]" />
        </div>

        {/* List */}
        <div
          className="w-full h-full md:w-[666px] pt-5">
          <div className="flex flex-col w-full ">
            {metricsData.map((metric, index) => (
              <MetricItem
                key={index}
                label={metric.label}
                percentage={metric.percentage}
              />
            ))}
          </div>
        </div>

        <div
          className="w-full h-auto flex items-center justify-center pt-10 md:pt-20">

          {/* Statics Page Button */}
          <button
            onClick={() => {
              setPage(11);
            }}
            className="w-auto md:w-[340px] md:h-[80px] rounded-full bg-white border border-primary text-primary flex items-center justify-center gap-3 hover:bg-primary hover:text-white px-3 md:px-0 py-2 md:py-0">
            <p
              className="text-lg md:text-[24px]">
              See impact statistics
            </p>
            <img
              src={AppAsset.RightArrowGreenicon}
              className="w-6 md:w-[27.65px] object-contain" />
          </button>
        </div>
      </div>
    </div>
  )
}

const MetricItem: React.FC<MetricItemProps> = ({ label, percentage }) => {
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
        <div className="flex-1 shrink text-right basis-0">{percentage}%</div>
      </div>
      <ProgressBar
        percentage={percentage} />
    </div>
  );
};

const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const width = `${percentage}%`;

  return (
    <div className="flex overflow-hidden relative flex-col md:mt-3.5 w-full rounded-2xl min-h-[10px] md:min-h-[18px] max-md:max-w-full">
      <div className="flex z-0 w-full bg-gray-200 min-h-[10px] md:min-h-[18px] max-md:max-w-full" />
      <div
        className="flex absolute bottom-0 left-0 z-0 max-w-full bg-primary-blue rounded-full h-[10px] md:h-[18px] md:min-h-[18px]"
        style={{ width }}
      />
    </div>
  );
};
