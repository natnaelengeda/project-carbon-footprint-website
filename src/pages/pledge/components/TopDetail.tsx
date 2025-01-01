import { useEffect, useState } from "react";

// State
import { PledgeState } from "@/state/pledge";
import { useSelector } from "react-redux"
import { CalculateCarbonFootPrint } from "@/utils/CarbonFootPrintCalculator";

export default function TopDetail() {
  const [sum, setSum] = useState<number>(0);
  const [trees, setTrees] = useState<number>(0);

  const carbonFootPrint = useSelector((state: {
    pledge: any; new_carbon_footprint: number
  }) => state.pledge.new_carbon_footprint);

  const pledge = useSelector((state: { pledge: PledgeState }) => state.pledge);
  // const trees = useSelector((state: { pledge: any; trees: number }) => state.pledge.trees);

  // console.log(houseHoldEnergy);


  useEffect(() => {
    const sum = CalculateCarbonFootPrint(pledge);
    setSum(sum);

  }, [pledge]);

  useEffect(() => {
    setTrees(sum / 167);
  }, [sum]);

  return (
    <p className="text-xl md:text-[32px] text-[#B7B7B7]">
      Your carbon footprint of
      <b
        className="font-bold text-black"> {sum.toFixed(2)} Kg CO2e </b>
      as a result of your household energy usage is equivalent to burning
      <b
        className="font-bold text-black"> {trees.toFixed(2)} trees
      </b>.
    </p>
  )
}
