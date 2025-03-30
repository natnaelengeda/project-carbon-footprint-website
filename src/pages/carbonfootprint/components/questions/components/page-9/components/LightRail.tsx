import { useEffect, useState } from 'react';

// Socket
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from '@/core/AppAsset'
import { useDispatch } from 'react-redux';
import { addTransportationMode } from '@/state/carbon';

export default function LightRail() {
  const [km, setKm] = useState(0);
  const [days, setDays] = useState(0);

  const dispatch = useDispatch();
  const socket = useSocket();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data: any = JSON.parse(temp);
      if (data.page == "page-9" && data.vehicle == "light-rail") {
        setKm(data.slider1);
        setDays(data.slider2);

        dispatch(
          addTransportationMode({
            id: 6,
            name: "light-rail",
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
          src={AppAsset.BannerTrain}
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
          <p className="text-white text-[40px]">Transportation Mode</p>
        </div>
        <p className="text-[25px]">Public Transport - Light Rail</p>
      </div>

      {/* Options */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-10 gap-16 text-white text-[20px] pr-14">
        <p>You use  <span className='text-primary'>Public Transport - Light {km} Kilometers</span> per day and <span className='text-primary'>{days} days per week</span></p>

      </div>

    </div>
  )
}
