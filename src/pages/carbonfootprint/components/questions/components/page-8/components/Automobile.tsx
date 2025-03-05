import { useEffect } from 'react';

// Socket
import { useSocket } from '@/context/SocketProvider';

// AppAsset
import AppAsset from '@/core/AppAsset'


export default function Automobile() {
  // const [selectedType, setSelectedType] = useState<string>("electric");
  // const [selectedDays, setSelectedDays] = useState<number>(0);
  // const [selectedHours, setSelectedHours] = useState<number>(0);

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

        {/* <RadioButtonsComponent
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          type={"gas-powered"}
          text={"Gas Powered"}
          extraNote={"Gas Powered Personal Vehicle - Automobile"}
          selectedDays={selectedDays}
          selectedHours={selectedHours}
        />

        <RadioButtonsComponent
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          type={"electric-powered"}
          text={"Electric Powered"}
          extraNote={"Electric Powered Personal Vehicle - Automobile"}
          selectedDays={selectedDays}
          selectedHours={selectedHours}
        />

        <RadioButtonsComponent
          setSelectedType={setSelectedType}
          selectedType={selectedType}
          type={"hybrid-powered"}
          text={"Hybrid"}
          extraNote={"Hybrid Personal Vehicle - Automobile"}
          selectedDays={selectedDays}
          selectedHours={selectedHours}
        /> */}


      </div>


    </div>
  )
}

// const RadioButtonsComponent = ({ setSelectedType, selectedType, type, text, selectedDays, selectedHours, extraNote }: any) => {
//   return (
//     <div
//       className="w-full h-full flex flex-col items-start justify-start gap-5 text-white">
//       <div
//         className='flex flex-row items-center justify-start gap-3 md:gap-[20px] text-white'>
//         <img
//           onClick={() => setSelectedType(type)}
//           src={selectedType == type ? AppAsset.RadioOnIcon : AppAsset.RadioOffIcon}
//           className='w-7 md:w-[36px] md:h-[36px] object-contain cursor-pointer' />
//         <p
//           className='text-xl md:text-[45px] font-normal'>
//           {text}
//         </p>
//       </div>

//       {/* Usage */}
//       <div
//         style={{
//           display: type == "none" ?
//             "none" :
//             type == selectedType ?
//               "flex" : "none"
//         }}
//         className="pr-10">
//         <p
//           className="text-[30px]">You use <span className="text-primary">{extraNote}{selectedDays} Kilometers</span> per week and <span className="text-primary">{selectedHours} days per week</span></p>
//       </div>
//     </div>
//   );
// }
