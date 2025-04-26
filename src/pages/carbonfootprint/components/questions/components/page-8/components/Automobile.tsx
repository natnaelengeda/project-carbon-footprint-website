import { useEffect, useState } from 'react';

// Socket
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from '@/core/AppAsset'
import { addTransportationMode, addTransportCategory } from '@/state/carbon';
import { useDispatch } from 'react-redux';
import CarbonLanguage from '@/utils/carbonLanguage';


export default function Automobile() {
  const [selectedType, setSelectedType] = useState<string>("gas-powered");
  const [selectedKMs, setSelectedKMs] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(0);

  const dispatch = useDispatch();

  const buttons = [
    { id: 0, name: <CarbonLanguage name="gas_powered" />, type: "gas-powered", extra: <CarbonLanguage name='gas_powered_personal_vehicle_automobile' /> },
    { id: 1, name: <CarbonLanguage name="electric_powered" />, type: "electric-powered", extra: <CarbonLanguage name='electric_powered_personal_vehicle_automobile' /> },
    { id: 2, name: <CarbonLanguage name="hybrid" />, type: "hybrid", extra: <CarbonLanguage name='hybrid_powered_personal_vehicle_automobile'/> },
  ];

  const socket: any = useSocket();

  useEffect(() => {
    socket?.on("page-change-send-data-client", (temp: any) => {
      const data: any = JSON.parse(temp);
      if (data.page == "page-8" && data.vehicle == "automobile") {
        setSelectedType(data.type);
        setSelectedKMs(data.slider1);
        setSelectedDays(data.slider2);

        dispatch(
          addTransportationMode({
            id: 1,
            name: "automobile",
            selected: true,
            value: 1,
          })
        );

        dispatch(
          addTransportCategory({
            parent_id: 1,
            category_id: 1,
            name: data.type,
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
          src={AppAsset.BannerCard}
          className="w-[300px] h-[300px] object-contain" />
      </div>

      {/* Title */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-10 text-white">
        <div
          className="flex flex-row items-center justify-start gap-5">
          <div
            className="w-10 h-3 bg-purple-500">
          </div>
          <p className="text-white text-[40px]"><CarbonLanguage name="transportation_mode" /></p>
        </div>
        <p className="text-[25px]"><CarbonLanguage name="personal_transportation" /> - <CarbonLanguage name="automobile" /></p>
      </div>

      {/* Options */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-3 gap-2">
        {
          buttons &&
          buttons.map((button: { name: any, type: string, extra: any }, index: number) => {
            return (
              <RadioButtonsComponent
                key={index}
                setSelectedType={setSelectedType}
                selectedType={selectedType}
                type={button.type}
                text={button.name}
                extraNote={button.extra}
                selectedDays={selectedDays}
                selectedKMs={selectedKMs}
              />
            );
          })
        }
      </div>
    </div>
  )
}

const RadioButtonsComponent = ({ setSelectedType, selectedType, type, text, selectedDays, selectedKMs, extraNote }: any) => {

  return (
    <div
      className="w-full h-full flex flex-col items-start justify-start gap-2 text-white">
      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
        <img
          onClick={() => setSelectedType(type)}
          src={selectedType == type ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
          className='w-5 md:w-[30px] md:h-[30px] object-contain cursor-pointer' />
        <p
          className='text-lg md:text-[20px] font-normal'>
          {text}
        </p>
      </div>

      {/* Usage */}
      <div
        style={{
          display: type == "none" ?
            "none" :
            type == selectedType ?
              "flex" : "none"
        }}
        className="pr-10">
        <p
          className="text-[15px]"><CarbonLanguage name="you_use" /> <span className="text-primary">{extraNote} {selectedKMs} <CarbonLanguage name="kilometers" /></span> <CarbonLanguage name="per_day_and" /> <span className="text-primary">{selectedDays} <CarbonLanguage name="days_per_week" /></span></p>
      </div>
    </div>
  );
}
