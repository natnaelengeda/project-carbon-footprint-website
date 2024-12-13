
// AppAsset
import AppAsset from '@/core/AppAsset';

// interface Props {
//   setPage?: React.Dispatch<React.SetStateAction<number>>;
// }

export interface MetricItemProps {
  label: string;
  percentage: number;
}

export interface ProgressBarProps {
  percentage: number;
}

export default function PageTen() {

  const metricsData: MetricItemProps[] = [
    { label: 'Water Usage', percentage: 82 },
    { label: 'Transportation Impact', percentage: 79 },
    { label: 'Diet Sustainability', percentage: 73 },
    { label: 'Food Waste', percentage: 68 },
    { label: 'Waste Disposal & Recycling', percentage: 68 },
    { label: 'Energy Usage', percentage: 68 }
  ];

  const MetricItem: React.FC<MetricItemProps> = ({ label, percentage }) => {
    return (
      <div className="flex flex-col mt-14 w-full max-md:mt-10 max-md:max-w-full">
        <div className="flex flex-wrap gap-7 items-start w-full text-2xl leading-loose text-slate-900 max-md:max-w-full">
          <div className="flex-1 shrink basis-0">{label}</div>
          <div className="flex-1 shrink text-right basis-0">{percentage}%</div>
        </div>
        <ProgressBar percentage={percentage} />
      </div>
    );
  };

  const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
    const width = `${percentage}%`;

    return (
      <div className="flex overflow-hidden relative flex-col mt-3.5 w-full rounded-2xl min-h-[18px] max-md:max-w-full">
        <div className="flex z-0 w-full bg-gray-200 min-h-[18px] max-md:max-w-full" />
        <div
          className="flex absolute bottom-0 left-0 z-0 max-w-full bg-blue-400 rounded-none h-[18px] min-h-[18px]"
          style={{ width }}
        />
      </div>
    );
  };
  return (
    <div
      className='relative w-full h-full min-h-screen flex flex-col items-center justify-start py-40'>

      {/* Top Content */}
      <div
        className='w-full h-auto flex flex-col items-center justify-center gap-[71px]'>
        <img
          src={AppAsset.BlueBadge}
          className='w-[598px] h-[527px] object-contain' />
        <div className='flex flex-col items-center justify-start gap-[40px]'>
          <p className="text-[64px] text-primary-blue font-bold">Aqua - Warrior</p>
          <p className='text-[#343434] text-[28px]'>Congrats, You Got the “Aqua - Warrior” Badge!</p>
        </div>
      </div>

      {/* Graphs */}
      <div className='w-full h-full pb-20 flex items-center justify-center pt-10'>
        <div className="w-full flex flex-col max-w-[700px]">
          <div className="self-start text-3xl font-medium leading-loose text-center text-zinc-400 max-md:max-w-full">
            Here are your results compared to Ethiopian metrics.
          </div>
          <div className="mt-12 w-full border border-solid border-zinc-300 min-h-[1px] max-md:mt-10 max-md:max-w-full" />
          <div className="flex flex-col mt-12 w-full max-md:mt-10 max-md:max-w-full">
            {metricsData.map((metric, index) => (
              <MetricItem
                key={index}
                label={metric.label}
                percentage={metric.percentage}
              />
            ))}
          </div>
        </div>
      </div>


    </div>
  )
}
