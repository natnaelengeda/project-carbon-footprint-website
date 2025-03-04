
// State
import { clearEverything } from "@/state/carbon";
import { useDispatch } from "react-redux";

// AppAsset
import AppAsset from "@/core/AppAsset";
import BarGraph from "./components/BarGraph";

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

const CharTData = [
  { id: 1, name: "Energy Usage", color: "#35D36A" },
  { id: 2, name: "Transportation Impact", color: "#DE477C" },
  { id: 3, name: "Waste Disposal", color: "#F3B55E" },
  { id: 4, name: "Diet Sustainability", color: "#C7DE47" },
  { id: 5, name: "Water Usage", color: "#59B4F5" },
  { id: 6, name: "Food Waste", color: "#C7DE47" },
];

const InsightData = [
  { id: 1, icon: AppAsset.StatsRecycleIcon, name: "Sort Your Recycling", desc: "Separate materials like paper, plastic, and glass for proper recycling" },
  { id: 2, icon: AppAsset.StatsCompostingIcon, name: "Start Composting", desc: "Compost organic waste to reduce what ends up in the landfill." },
  { id: 3, icon: AppAsset.StatsReuseIcon, name: "Reuse Items", desc: "Repurpose jars, containers, and other everyday items." },
  { id: 4, icon: AppAsset.StatsShopIcon, name: "Shop Smarter", desc: "Buy only what's necessary and avoid single-use products." },
  { id: 5, icon: AppAsset.StatsRecycleIcon, name: "Repair Before Tossing", desc: "Fix broken items to give them a longer life instead of throwing them away." },
];


export default function PageEleven({ setPage }: Props) {
  const disptach = useDispatch();

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-start pt-10 md:pt-20 gap-10 md:gap-20">

      {/* Top Text */}
      <div className="w-auto flex flex-col items-center justify-start gap-1 md:gap-3 font-bold">
        <p className="text-2xl md:text-[36px]">Categorized Carbon</p>
        <p className="text-2xl md:text-[36px]">Footprint Impacts Statistics</p>
      </div>

      {/* Graphs */}
      <div
        className="w-full md:w-[798.45px] h-auto flex flex-col md:flex-row gap-4 md:gap-0 items-start md:items-center justify-center md:justify-start">

        {/* Graph */}
        <BarGraph />

        {/* Data */}
        <div className="w-full h-40 hidden grid-cols-2 px-4 md:px-0">
          {
            CharTData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-auto flex flex-row items-center justify-start gap-2">
                  <div
                    style={{
                      backgroundColor: data.color,
                    }}
                    className={`w-5 h-5 rounded-[2.88px]`}>
                  </div>
                  <p className="md:text-[17.28px]">{data.name}</p>
                </div>
              )
            })
          }
        </div>
      </div>

      {/* Insigts */}
      <div
        className="w-full md:w-[736.9px] h-full flex flex-col items-center justify-start gap-10 md:gap-[70px] md:pt-20">

        {/* Title */}
        <div>
          <p className="text-xl md:text-[36px] font-bold">Insights to Lower you Waste Disposal</p>
        </div>

        {/* Contents */}
        <div
          className="w-full h-auto flex flex-col items-start justify-start gap-8 md:gap-[70px] px-3 md:px-0">
          {
            InsightData.map((data, index) => {
              return (
                <div
                  key={index}
                  className="w-full h-auto flex flex-row items-center justify-start gap-4 md:gap-8">
                  <img
                    src={data.icon}
                    className="w-12 h-12 md:w-[50px] object-contain" />
                  <div
                    className="w-full h-auto flex flex-col items-start justify-start gap-1">
                    <p className="text-lg md:text-[22px] font-bold">{data.name}</p>
                    <p className="text-lg md:text-[20px]">{data.desc}</p>
                  </div>
                </div>
              )
            })
          }

        </div>

        <div
          className="w-full flex flex-col items-center justify-start gap-5 pb-10 md:pb-0">
          <hr className="w-full border-2 border-[#D7D7D7]" />
          <p className="text-lg md:text-[20px] text-[#BCBCBC] text-center">This page will reset in 30 minutes. You can start again using the button below.</p>

          <div className="pt-5 md:pt-20">
            <button
              onClick={() => {
                disptach(clearEverything());
                setPage(1);
              }}
              className="md:w-[192px] md:h-[69px] border border-primary text-primary text-2xl md:text-[24px] rounded-full hover:bg-primary hover:text-white px-5 md:px-0 py-2 md:py-0">
              Finish
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}
