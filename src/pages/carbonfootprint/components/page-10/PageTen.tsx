import { useEffect, useState } from 'react';

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
import Skeleton from 'react-loading-skeleton';

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

  const [loading, setLoading] = useState<boolean>(true);

  const [allData, setAllData] = useState<number>(0);

  const [waterUsage, setWaterUsage] = useState<number>(0);
  const [foodWaste, setFoodWaste] = useState<number>(0);
  const [transport, setTransport] = useState<number>(0);
  const [diet, setDiet] = useState<number>(0);
  const [waste, setWaste] = useState<number>(0);
  const [energyUsage, setEnergyUsage] = useState<number>(0);

  const sendFunction = () => {
    axios.post("http://159.69.19.171/api/v1/carbonFootPrint", data)
      .then((response) => {
        const data = response.data;
        var allSum = 0;
        allSum = data.dietAndFood + data.foodWastage + data.householdEnergy + data.transportationMode + data.wasteDisposal + data.waterUsage;

        setAllData(data);

        var waterUsage = (data.waterUsage / allSum) * 100;
        var foodWaste = (data.foodWastage / allSum) * 100;
        var transport = (data.transportationMode / allSum) * 100;
        var diet = (data.dietAndFood / allSum) * 100;
        var waste = (data.wasteDisposal / allSum) * 100;
        var energyUsage = (data.householdEnergy / allSum) * 100;

        setWaterUsage(waterUsage);
        setFoodWaste(foodWaste);
        setTransport(transport);
        setDiet(diet);
        setWaste(waste);
        setEnergyUsage(energyUsage);

        console.table({
          waterUsage,
          foodWaste,
          transport,
          diet,
          waste,
          energyUsage
        });

        setLoading(false);
      })
  }

  const metricsData: MetricItemProps[] = [
    { label: 'Water Usage', percentage: waterUsage },
    { label: 'Food Waste', percentage: foodWaste },
    { label: 'Transportation Impact', percentage: transport },
    { label: 'Diet Sustainability', percentage: diet },
    { label: 'Waste Disposal & Recycling', percentage: waste },
    { label: 'Energy Usage', percentage: energyUsage }
  ];


  useEffect(() => {
    sendFunction();
    window.scrollTo(0, 0);
  }, []);


  return (
    <div
      className="w-full h-full min-h-screen flex flex-col items-center justify-start py-10 md:py-40 ">

      {/* Badge Image */}
      <div
        className="w-full h-auto px-5 md:px-0 flex justify-center">
        {
          loading ?
            <div className='w-80 h-80 md:w-[598px] md:h-[527px] '>
              <Skeleton
                className='w-full h-full'
                borderRadius={20} />
            </div> :
            <img
              src={AppAsset.BlueBadge}
              className="w-80 h-80 md:w-[598px] md:h-[527px] object-contain" />
        }
      </div>

      {/* Text */}
      {
        loading ?
          <div className="w-full h-auto flex flex-col items-center justify-start gap-5 md:gap-[52px] pt-2 px-4 md:px-0">
            <div className='w-36 h-8 md:w-60 md:h-16'>
              <Skeleton className='w-full h-full' />
            </div>
            <div className='w-full md:w-[35rem] h-8'>
              <Skeleton className='w-full h-full' />
            </div>
          </div> :
          <div className="w-full h-auto flex flex-col items-center justify-start gap-5 md:gap-[52px] ">
            <p className="text-primary-blue text-4xl md:text-[64px] font-bold">Aqua - Warrior</p>
            <p className="text-xl md:text-[28px]">Congrats, You Got the "Aqua - Warrior" Badge!</p>
          </div>
      }

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
              !loading &&
              allData &&
              metricsData.map((metric, index) => (
                <MetricItem
                  key={index}
                  label={metric.label}
                  percentage={metric.percentage}
                />
              ))
            }
            <LoadingSkeleton
              loading={loading} />
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


const LoadingSkeleton = ({ loading }: { loading: boolean }) => {
  return (
    <>
      {
        loading &&
        <div className='w-full h-auto flex flex-col items-start justify-start'>
          {
            [1, 2, 3, 4, 5, 6].map((index) => {
              return (
                <div
                  key={index}
                  className="w-full  flex flex-col md:mt-14 max-md:mt-5 md:max-md:mt-10 max-md:max-w-full">
                  <div className="flex flex-wrap gap-7 items-start w-full text-md md:text-2xl leading-loose text-slate-900 max-md:max-w-full">
                    <div
                      className="flex-1 shrink basis-0">
                      <div className='w-20 rounded-full overflow-hidden'>
                        <Skeleton
                          className='w-full h-full rounded-full'
                        />
                      </div>
                    </div>
                    <div>
                      <div className='w-10 rounded-full overflow-hidden'>
                        <Skeleton
                          className='w-full h-full rounded-full'
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    className="flex overflow-hidden relative flex-col md:mt-5 w-full rounded-2xl min-h-[10px] md:min-h-[18px] max-md:max-w-full pt-">
                    <div className='relative w-full h-[26px] rounded-full overflow-hidden'>
                      <div
                        className='absolute top-1 left-0 w-full h-[26px] bg-[#E9ECEF]'>
                      </div>
                      <div className='relative w-60 h-full'>
                        <Skeleton
                          className='w-full h-full rounded-full'
                          style={{
                            height: 23
                          }}
                          borderRadius={20}
                        />
                      </div>

                    </div>
                  </div>
                </div>
              );
            })
          }
        </div>
      }
    </>
  );
}