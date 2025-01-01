import {
  // useEffect,
  useState
} from "react";

// Layout
import PagesLayout from "../../layouts/PagesLayout";

// Tooltip
import { Tooltip } from "@mantine/core";

// Axios
// import axios from "@/utils/axios";

// State
// import {
// useDispatch,
// useSelector,
// } from "react-redux";

// Components
import Cooking from "./components/Cooking";
import ElectricAppliances from "./components/ElectricAppliances";
import LightBulbs from "./components/LightBulbs";
import NavigationComponent from "../NavigationComponent";
import HeatingCooling from "./components/HeatingCooling";

// Appasset
import AppAsset from "@/core/AppAsset";
// import {
// addTrees,
// addCarbonFootPrint,
// addNewCarbonFootPrint,
// addOldPledge,
// addHouseholdEnergy,
// } from "@/state/pledge";
import TopDetail from "../TopDetail";
// import { pledgeCalculator } from "@/utils/pledgeCalculator";

// Interface
interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTwo({ setPage }: Props) {
  const [opened, setOpened] = useState<string>("heating-cooling");

  // const dispatch = useDispatch();

  // const pledge = useSelector((state: any) => state.pledge);
  // const houseHoldEnergy = pledge.house_hold_energy;

  // useEffect(() => {
  //   // axios.get(`/api/v1/carbonFootPrint/endUser/${pledge.id}`)
  //   axios.get(`/api/v1/carbonFootPrint/endUser/676d52bb12f7fc69a005f00b`)
  //     .then((response) => {

  //       const data = response.data.data;
  //       const values = response.data.value;

  //       const house_hold_energy = values.householdEnergy;


  //       if (house_hold_energy.heatingAndCooling) {
  //         const firstItem = house_hold_energy.heatingAndCooling[0];

  //         if (firstItem.type == "electric") {
  //           dispatch(
  //             addHouseholdEnergy({
  //               id: 1,
  //               name: "heating-cooling",
  //               selected: true,
  //               category: [
  //                 {
  //                   id: 1,
  //                   name: "electric_air_conditioning",
  //                   selected: true,
  //                   value: firstItem.hourlyUsagePerDay,
  //                 },
  //               ],
  //             })
  //           )
  //         } else if (firstItem.type == "charcoal") {
  //           dispatch(
  //             addHouseholdEnergy({
  //               id: 1,
  //               name: "heating-cooling",
  //               selected: true,
  //               category: [
  //                 {
  //                   id: 1,
  //                   name: "charcoal",
  //                   selected: true,
  //                   value: firstItem.hourlyUsagePerDay,
  //                 },
  //               ],
  //             })
  //           )
  //         }
  //       }



  //       // house_hold_energy.map((item) => {
  //       //   console.log(item);
  //       // })


  //       // const regular_values = response.data.value;
  //       // const values = JSON.stringify(response.data.value);
  //       // const sum: any = Object.values(data).reduce((acc: any, value: any) => acc + (value || 0), 0);
  //       // const trees = sum / 167;


  //       // console.log(regular_values);

  //       // dispatch(
  //       //   addHouseholdEnergy({

  //       //   })
  //       // )


  //       // dispatch(
  //       //   addNewCarbonFootPrint({
  //       //     data: sum,
  //       //   }));

  //       // dispatch(
  //       //   addTrees({
  //       //     data: parseInt(trees.toFixed(0)),
  //       //   }));

  //       // dispatch(
  //       //   addOldPledge({
  //       //     pledge: values
  //       //   }));

  //     });
  // }, []);


  return (
    <PagesLayout>
      <div
        className="relative w-full h-screen mx-auto 2xl:container flex flex-col items-center justify-between gap-5 py-10 md:py-20">

        {/* Top Section */}
        <div className='flex flex-col items-center justify-start gap-5'>
          {/* Image Content */}
          <div
            className="w-full h-auto flex flex-col items-center justify-start gap-5 px-10">
            {/* Image */}
            <img
              src={AppAsset.BannerFour}
              className="md:w-[550px] md:h-[550px] object-cover" />
          </div>

          {/* Note */}
          <div
            className="w-full md:w-[780px] flex flex-col items-start justify-start gap-5 md:gap-[41px] px-3 md:px-0">

            <div className='flex flex-col items-start justify-start'>
              <p className="text-3xl md:text-[48px] font-semibold">
                Houshold Energy.
              </p>
            </div>

            <div
              className="w-full flex flex-row items-start justify-start gap-2 md:gap-[26px]">
              <Tooltip
                label="Lorem ipsum dolor sit amet consectetur. Ante ipsum gravida vestibulum leo.">
                <img
                  src={AppAsset.InformationGreenIcon}
                  className='w-[36px] h-[36px] object-contain' />
              </Tooltip>
              <TopDetail />
            </div>

            <div className="pt-2 md:pt-10">
              <p className="font-semibold text-xl md:text-[30px]">What do you pledge to reduce this effect?</p>
            </div>
          </div>


          {/* Content */}
          <div
            className="w-full flex flex-col items-start justify-start gap-5 pt-3 md:pt-10 px-4">

            {/* Heating / Cooling */}
            <HeatingCooling
              opened={opened}
              setOpened={setOpened} />

            {/* Cooking */}
            <Cooking
              opened={opened}
              setOpened={setOpened} />

            {/* Electric Appliances */}
            <ElectricAppliances
              opened={opened}
              setOpened={setOpened} />

            {/* Light Bulbs */}
            <LightBulbs
              opened={opened}
              setOpened={setOpened} />
          </div>
        </div>

        {/* Navigation */}
        <NavigationComponent
          setPage={setPage}
          nextPage={3} />
      </div>
    </PagesLayout>
  )
}
