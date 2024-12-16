
// AppAsset
import AppAsset from '@/core/AppAsset';
import BlueBadge from './components/BlueBadge';


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
      className='w-full h-full'>
      <BlueBadge />

    </div>
  )
}
