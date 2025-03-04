
// Components
import HouseHoldEnergy from "./components/HouseHoldEnergy";
import Transporation from "./components/Transporation";
import Diet from "./components/Diet";
import WasteDisposal from "./components/WasteDisposal";
import Water from "./components/Water";

export default function TopSection({ skipUserData }: any) {
  return (
    <div
      className="w-full h-auto md:w-[882px] flex flex-col items-start justify-start px-3 md:px-0 gap-3 md:gap-[40px]">
      <HouseHoldEnergy skipUserData={skipUserData.householdEnergy} />
      <Transporation skipUserData={skipUserData.transportationMode} />
      <Diet skipUserData={skipUserData.dietAndFood} />
      {/* <FoodWastage skipUserData={skipUserData.foodWastage} /> */}
      <WasteDisposal skipUserData={skipUserData.wasteDisposal} />
      <Water skipUserData={skipUserData.waterUsage} />
    </div>

  )
}
