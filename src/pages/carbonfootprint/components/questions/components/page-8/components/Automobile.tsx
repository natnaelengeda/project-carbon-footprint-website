import { useEffect, useState } from 'react';

// Socket
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from '@/core/AppAsset'
import { addTransportationMode, addTransportCategory } from '@/state/carbon';
import { useDispatch } from 'react-redux';


export default function Automobile() {
  const [selectedType, setSelectedType] = useState<string>("gas-powered");
  const [selectedKMs, setSelectedKMs] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(0);

  const dispatch = useDispatch();

  const buttons = [
    { id: 0, name: "Gas Powered", type: "gas-powered", extra: "Gas Powered Personal Vehicle - Automobile" },
    { id: 1, name: "Electric Powered", type: "electric-powered", extra: "Electric Powered Personal Vehicle - Automobile" },
    { id: 2, name: "Hybrid", type: "hybrid", extra: "Hybrid Personal Vehicle - Automobile" },
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
          <p className="text-white text-[40px]">Transportation Mode</p>
        </div>
        <p className="text-[25px]">Personal Vehicle - Automobile</p>
      </div>

      {/* Options */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-10 pt-3 gap-2">
        {
          buttons &&
          buttons.map((button: { name: string, type: string, extra: string }, index: number) => {
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
          className="text-[15px]">You use <span className="text-primary">{extraNote} {selectedKMs} Kilometers</span> per week and <span className="text-primary">{selectedDays} days per week</span></p>
      </div>
    </div>
  );
}
