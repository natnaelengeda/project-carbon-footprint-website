import React from 'react'

// AppAsset
import AppAsset from '@/core/AppAsset';

// Background
import DefaultBackground from '../DefaultBackground';
import { useSocket } from '@/context/SocketProvider';
// import { useSelector } from 'react-redux';
// import { mapData } from '@/utils/convertDataFunc';
// import axios from '@/utils/axios';

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwenty({ setPage }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  // const carbon = useSelector((state: any) => state.carbon);
  // const data = mapData(carbon);

  // const [loading, setLoading] = useState<boolean>(true);


  // const [allData, setAllData] = useState<number>(0);

  // const [waterUsage, setWaterUsage] = useState<number>(0);
  // const [foodWaste, setFoodWaste] = useState<number>(0);
  // const [transport, setTransport] = useState<number>(0);
  // const [diet, setDiet] = useState<number>(0);
  // const [waste, setWaste] = useState<number>(0);
  // const [energyUsage, setEnergyUsage] = useState<number>(0);

  // const sendFunction = () => {
  //   axios.post("/api/v1/carbonFootPrint", data)
  //     .then((response) => {
  //       const data = response.data;
  //       var allSum = 0;
  //       allSum = data.dietAndFood + data.foodWastage + data.householdEnergy + data.transportationMode + data.wasteDisposal + data.waterUsage;

  //       setAllData(data);

  //       var waterUsage = (data.waterUsage / allSum) * 100;
  //       var foodWaste = (data.foodWastage / allSum) * 100;
  //       var transport = (data.transportationMode / allSum) * 100;
  //       var diet = (data.dietAndFood / allSum) * 100;
  //       var waste = (data.wasteDisposal / allSum) * 100;
  //       var energyUsage = (data.householdEnergy / allSum) * 100;

  //       setWaterUsage(waterUsage);
  //       setFoodWaste(foodWaste);
  //       setTransport(transport);
  //       setDiet(diet);
  //       setWaste(waste);
  //       setEnergyUsage(energyUsage);

  //       console.table({
  //         waterUsage,
  //         foodWaste,
  //         transport,
  //         diet,
  //         waste,
  //         energyUsage
  //       });

  //       setLoading(false);
  //     })
  // }

  // useEffect(() => {
  //   sendFunction();
  // }, []);

  return (
    <DefaultBackground>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px] ">

        {/* Center */}
        <div className="w-full flex flex-col items-center justify-center gap-8 mb-20 ">
          <img
            src={AppAsset.BannerThirteen}
            style={{
              width: "464px",
              height: "408px",
            }} />

          <span
            style={{
              fontSize: "76px",
            }}
            className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <h1 className=" font-bold">Excellent</h1>
          </span>
          <span className="flex flex-col items-center justify-center gap-2 text-white font-semibold">
            <p style={{ fontSize: "29px" }} className="font-semibold">
              your carbon foot print per is{" "}
            </p>
            <h2 style={{ fontSize: "56px" }} className=" font-bold">
              49kg Co2 -e
            </h2>
          </span>
        </div>

        <div
          className='absolute bottom-20 right-0 w-full  flex flex-row items-center justify-center gap-10'>

          {/* Insights */}
          <button
            onClick={() => {
              setPage(21)
              socket?.emit("page-next-server", JSON.stringify({
                nextPage: 21,
                room: room,
              }));
            }}
            className={
              `w-10 h-10 md:w-[187px] md:h-[83px] flex rounded-full border border-primary items-center justify-center p-2 md:p-0 text-[32px] text-primary`}>
            Insights
          </button>

          {/* Finish */}
          <button
            onClick={() => {
              setPage(0)
              socket?.emit("page-next-server", JSON.stringify({
                nextPage: 0,
                room: room,
              }));
            }}
            className={
              `w-10 h-10 md:w-[187px] md:h-[83px] flex rounded-full border border-primary items-center justify-center p-2 md:p-0 text-[32px] text-white bg-primary`}>
            Finish
          </button>
        </div>

      </div>
    </DefaultBackground>
  )
}
