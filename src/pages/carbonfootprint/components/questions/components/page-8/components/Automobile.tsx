import { useEffect, useState } from 'react';

// Socket
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from '@/core/AppAsset'


export default function Automobile() {
  const [selectedType, setSelectedType] = useState<string>("gas-powered");
  const [selectedKMs, setSelectedKMs] = useState<number>(0);
  const [selectedDays, setSelectedDays] = useState<number>(0);

  const buttons = [
    { id: 0, name: "Gas Powered", type: "gas-powered", extra: "Gas Powered Personal Vehicle - Automobile" },
    { id: 1, name: "Electric Powered", type: "electric-powered", extra: "Electric Powered Personal Vehicle - Automobile" },
    { id: 2, name: "Hybrid", type: "hybrid", extra: "Hybrid Personal Vehicle - Automobile" },
  ];

  const socket: any = useSocket();

  useEffect(() => {
    // socket?.on("", (temp: any) => {
    //   // const data: any = JSON.parse(temp);

    // });

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
          className="w-[700px] h-[700px] object-contain" />
      </div>

      {/* Title */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-40  text-white">
        <div
          className="flex flex-row items-center justify-start gap-5">
          <div
            className="w-10 h-3 bg-purple-500">
          </div>
          <p className="text-white text-[60px]">Transportation Mode</p>
        </div>
        <p className="text-[40px]">Personal Vehicle - Automobile</p>
      </div>

      {/* Options */}
      <div
        className="w-full h-auto flex flex-col items-start justify-start pl-40 pt-20 gap-16">
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
      className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">
      <div
        className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
        <img
          onClick={() => setSelectedType(type)}
          src={selectedType == type ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
          className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
        <p
          className='text-xl md:text-[45px] font-normal'>
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
          className="text-[30px]">You use <span className="text-primary">{extraNote}{selectedDays} Kilometers</span> per week and <span className="text-primary">{selectedKMs} days per week</span></p>
      </div>
    </div>
  );
}
