import React, { useEffect, useState } from 'react'


// Components
import Result from './components/Result';

// Background
import DefaultBackground from '../DefaultBackground';

// State
import { useSelector } from 'react-redux';

// Axios
import axios from '@/utils/axios';

// Socket
import { useSocket } from '@/context/SocketProvider';

// Confetti Effect
import confetti from 'canvas-confetti';

// Utils
import CarbonLanguage from '@/utils/carbonLanguage';
import { mapData } from '@/utils/convertDataFunc';


// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setCarbonFootPrint: React.Dispatch<React.SetStateAction<any>>;
}

export default function PageTwenty({ setPage, setCarbonFootPrint }: Props) {
  const socket = useSocket();
  const room = localStorage.getItem("room");

  const [value, setValue] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const carbon = useSelector((state: any) => state.carbon);
  const data = mapData(carbon);

  // Confetti
  var count = 200;
  var defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio: any, opts: any) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio)
    });
  }

  const sendFunction = () => {
    axios.post("/api/v1/carbonFootPrint", data)
      .then((response) => {
        const data = response.data;

        var waterEmission = data.waterUsage * 0.0003;
        var foodWasteEmission = data.foodWastage * 2.5;
        var transportEmission = data.transportationMode * 0.21;
        var dietEmission = data.dietAndFood * 5.0;
        var wasteEmission = data.wasteDisposal * 1.8;
        var energyEmission = data.householdEnergy * 0.475;

        var totalEmission = waterEmission + foodWasteEmission + transportEmission + dietEmission + wasteEmission + energyEmission;
        // var totalEmission = 2000;
        setValue(totalEmission.toFixed(0));
        setCarbonFootPrint(totalEmission.toFixed(0));
        setIsLoading(false);

        fire(0.25, {
          spread: 26,
          startVelocity: 55,
        });
        fire(0.2, {
          spread: 60,
        });
        fire(0.35, {
          spread: 100,
          decay: 0.91,
          scalar: 0.8
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 25,
          decay: 0.92,
          scalar: 1.2
        });
        fire(0.1, {
          spread: 120,
          startVelocity: 45,
        });

        console.log("Carbon Footprint: " + totalEmission.toFixed(2) + " kg CO₂-e");

        socket?.emit("page-21-results-server", JSON.stringify({
          value: totalEmission,
          room: room,
        }));

      })
  }

  useEffect(() => {
    sendFunction();
  }, []);

  return (
    <DefaultBackground>
      <div className="relative z-10 w-full h-full mx-auto 2xl:container flex flex-col items-center justify-start gap-5 py-10 md:py-[89px] ">
        <button
          onClick={sendFunction}
          className='w-80 h-20 bg-primary absolute top-20 left-40 text-white text-4xl rounded-xl'>
          Test
        </button>
        {/* Center */}
        <Result
          value={value}
          isLoading={isLoading} />

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
            <CarbonLanguage name="insights" />
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
            <CarbonLanguage
              name="finish" />
          </button>
        </div>

      </div>
    </DefaultBackground>
  )
}
