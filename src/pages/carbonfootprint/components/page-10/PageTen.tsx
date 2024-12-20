import { useEffect } from 'react';

// State
import { useSelector } from 'react-redux';

// Components
// import BlueBadge from './components/BlueBadge';
// import GreenBadge from './components/GreenBadge';
// import MintBadge from './components/MintBadge';
// import VioletBadge from './components/VioletBadge';

// Axios
import axios from 'axios';

// Utils
import { mapData } from '@/utils/convertDataFunc';

// App Asset
import AppAsset from '@/core/AppAsset';
import MetricItem from './components/MetricItem';

// Types
interface MetricItemProps {
  label: string;
  percentage: number;
}


// Page Type
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTen({ setPage }: Props) {
  const carbon = useSelector((state: any) => state.carbon);
  const data = mapData(carbon);

  const metricsData: MetricItemProps[] = [
    { label: 'Water Usage', percentage: 10 },
    { label: 'Food Waste', percentage: 30 },
    { label: 'Transportation Impact', percentage: 45 },
    { label: 'Diet Sustainability', percentage: 73 },
    { label: 'Waste Disposal & Recycling', percentage: 65 },
    { label: 'Energy Usage', percentage: 75 }
  ];


  const sendFunction = () => {
    axios.post("http://192.168.0.100:5001/api/v1/carbonFootPrint", data)
      .then((response) => {
        console.log(response);
      })
  }

  useEffect(() => {
    sendFunction();
  }, []);


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
      <div className="w-full h-auto flex flex-col items-center justify-start gap-5 md:gap-[52px] ">
        <p className="text-primary-blue text-4xl md:text-[64px] font-bold">Aqua - Warrior</p>
        <p className="text-xl md:text-[28px]">Congrats, You Got the "Aqua - Warrior" Badge!</p>
      </div>

      {/* Results */}
      <div
        className="w-full h-full flex flex-col items-center justify-start pt-5 md:pt-10  px-3 md:px-0 pb-10 md:pb-0 bg-">

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
          <div className="flex flex-col w-full px-2 md:px-0">
            {
              metricsData.map((metric, index) => (
                <MetricItem
                  key={index}
                  label={metric.label}
                  percentage={metric.percentage}
                />
              ))
            }
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
  );

}
