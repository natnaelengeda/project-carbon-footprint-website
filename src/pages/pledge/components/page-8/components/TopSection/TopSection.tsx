
// Components
import HouseHoldEnergy from "./components/HouseHoldEnergy";
import Transporation from "./components/Transporation";
import Diet from "./components/Diet";
import FoodWastage from "./components/FoodWastage";
import WasteDisposal from "./components/WasteDisposal";
import Water from "./components/Water";

export default function TopSection() {
  return (
    <div
      className="w-full h-auto md:w-[882px] flex flex-col items-start justify-start px-3 md:px-0 gap-3 md:gap-[60px]">
      <HouseHoldEnergy />
      <Transporation />
      <Diet />
      <FoodWastage />
      <WasteDisposal />
      <Water />
    </div>

  )
}
