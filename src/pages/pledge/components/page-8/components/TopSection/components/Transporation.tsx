import { useState } from 'react'

// State
import { PledgeState } from '@/state/pledge';
import { useSelector } from 'react-redux';

// AppAsset
import AppAsset from '@/core/AppAsset';


export default function Transporation() {
  const [transportationOpened, setTransportationOpened] = useState<boolean>(false);

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  const transportationMode: any = pledge.transportation_mode;

  const HourCalculator = (name: string) => {
    if (name == "automobile") {
      var findIndex = transportationMode?.findIndex((item: any) => item.name == name);
      var sum = 0;

      if (findIndex != -1) {
        if (transportationMode[findIndex].category.length == 0) {
          return 0;
        } else {
          transportationMode[findIndex].category.map((item: any) => {
            sum += item.value;
          });

          return sum;
        }
      } else {
        return 0;
      }
    } else if (name == "public-transport") {
      var findIndex = transportationMode?.findIndex((item: any) => item.name == name);
      var sum = 0;

      if (findIndex != -1) {
        if (transportationMode[findIndex].category.length == 0) {
          return 0;
        } else {
          transportationMode[findIndex].category.map((item: any) => {
            sum += item.value;
          });

          return sum;
        }
      } else {
        return 0;
      }
    } else if (name == "bicycle") {
      var findIndex = transportationMode?.findIndex((item: any) => item.name == name);
      var sum = 0;

      if (findIndex != -1) {
        return transportationMode[findIndex].value;
      } else {
        return 0;
      }
    } else if (name == "walking") {
      var findIndex = transportationMode?.findIndex((item: any) => item.name == name);
      var sum = 0;

      if (findIndex != -1) {
        return transportationMode[findIndex].value;
      } else {
        return 0;
      }
    }
  }

  return (
    <div
      style={{
        display: transportationMode.length > 0 ? "flex" : "none"
      }}
      className="w-full h-auto flex flex-col items-start justify-start">

      {/* Top Content */}
      <div
        onClick={() => setTransportationOpened(!transportationOpened)}
        className="w-full h-auto flex flex-row items-center justify-between">
        <div
          className="w-auto h-auto flex flex-row items-center justify-start gap-1 md:gap-[3.5px]">
          <img
            src={AppAsset.BusIcon}
            className="w-6 md:w-[50px] object-contain" />

          <p className="text-xl md:text-[36px] font-normal">Transportation Mode</p>
        </div>

        <div>
          <img
            src={transportationOpened ? AppAsset.ArrowUpIcon : AppAsset.ArrowDownIcon}
            className="w-6 md:w-[50px] h-auto object-contain" />
        </div>
      </div>

      {/* Bottom Content */}
      <div
        style={{
          display: transportationOpened ? "flex" : "none"
        }}
        className="w-full flex flex-col items-start justify-start gap-3 md:gap-[26px] pl-5 md:pl-[70px] pt-3 md:pt-[29.5px]">

        <p
          style={{
            display: HourCalculator("automobile") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{HourCalculator("automobile")} KM</b> per week for Automobile
        </p>
        <p
          style={{
            display: HourCalculator("public-transport") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{HourCalculator("public-transport")} KM</b> per week for Public Transport
        </p>
        <p
          style={{
            display: HourCalculator("bicycle") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{HourCalculator("bicycle")} KM</b> per week for Bicycle
        </p>
        <p
          style={{
            display: HourCalculator("walking") == 0 ? "none" : "block"
          }}
          className="text-normal text-lg md:text-[32px]">
          <b>{HourCalculator("walking")} KM</b> per week for Walking
        </p>
      </div>
    </div>
  )
}
