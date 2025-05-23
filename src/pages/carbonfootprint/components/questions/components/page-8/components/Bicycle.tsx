import { useEffect, useState } from 'react';

// Socket
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from '@/core/AppAsset'
import { useDispatch } from 'react-redux';
import { addTransportationMode } from '@/state/carbon';
import CarbonLanguage from '@/utils/carbonLanguage';


export default function Bicycle() {
  const [km, setKm] = useState(0);
  const [days, setDays] = useState(0);

  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data: any = JSON.parse(temp);
      if (data.page == "page-8" && data.vehicle == "bicycle") {
        setKm(data.slider1);
        setDays(data.slider2);

        dispatch(
          addTransportationMode({
            id: 3,
            name: "bicycle",
            selected: true,
            value: data.slider1,
            frequency: data.slider2,
          })
        );

      }
    });

  }, [socket]);

  return (
    <div
      className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:pt-[10px]">

      {/* Image Content */}
      <div
        className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
        {/* Image */}
        <img
          src={AppAsset.BannerCycle}
          className="w-[300px] h-[300px] object-contain" />
      </div>

      {/* Title */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-10  text-white">
        <div
          className="flex flex-row items-center justify-start gap-5">
          <div
            className="w-10 h-3 bg-purple-500">
          </div>
          <p className="text-white text-[40px]"><CarbonLanguage name="transportation_mode" /></p>
        </div>
        <p className="text-[25px]"><CarbonLanguage name="personal_transportation" /> - <CarbonLanguage name="bicycle" /></p>
      </div>

      {/* Options */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-10 gap-16 text-white text-[20px] pr-14">
        <p className='text-white'><CarbonLanguage name="you_use" /> <span className='text-primary'><CarbonLanguage name="personal_transportation" /> - <CarbonLanguage name="bicycle" /> {km} <CarbonLanguage name="kilometers" /></span> <CarbonLanguage name="per_day_and" /> <span className='text-primary'>{days} <CarbonLanguage name="days_per_week" /></span></p>
      </div>
    </div>
  )
}
