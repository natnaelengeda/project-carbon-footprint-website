
// Components
// import { useSelector } from 'react-redux';
import BlueBadge from './components/BlueBadge';
import GreenBadge from './components/GreenBadge';
import MintBadge from './components/MintBadge';
import VioletBadge from './components/VioletBadge';
// import { useEffect } from 'react';
// import axios from 'axios';

interface Props {
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function PageTen({ setPage }: Props) {
  // const carbon = useSelector((state: any) => state.carbon);
  // // console.log(carbon);

  // var newData = [];

  // for (var i = 0; i < carbon.length; i++) {
  //   if (carbon[i].value !== 0) {
  //     newData.push(carbon[i]);
  //   }
  // }

  // function mapData(input: any) {
  //   return {
  //     name: input.name,
  //     housingType: input.housing_type,
  //     householdEnergy: {
  //       heatingAndCooling: input.house_hold_energy
  //         .filter(item => item.name === "heating-cooling")
  //         .map(() => [
  //           { type: "Electric", hourlyUsagePerDay: 6 },
  //           { type: "Charcoal", hourlyUsagePerDay: 2 },

  //         ]).flat(),
  //       cooking: input.house_hold_energy
  //         .filter(item => item.name === "cooking")
  //         .map(() => [
  //           { type: "Electric", hourlyUsagePerDay: 3 }
  //         ]).flat(),
  //       electricAppliance: input.house_hold_energy
  //         .filter(item => item.name === "electric-appliances")
  //         .map(() => [
  //           { type: "TV", hourlyUsagePerDay: 4 },
  //           { type: "Washing Machine", hourlyUsagePerDay: 1.5, frequencyperWeek: 2 }
  //         ]).flat(),
  //       lightBulbs: input.house_hold_energy
  //         .filter(item => item.name === "light-bulbs")
  //         .map(() => [
  //           { type: "Incandescent", hourlyUsagePerDay: 5 },
  //           { type: "CFL", hourlyUsagePerDay: 2 }
  //         ]).flat()
  //     },
  //     transportationMode: {
  //       ownAutomobile: input.transportation_mode
  //         .filter(item => item.name === "automobile")
  //         .map(() => [
  //           { type: "Gas Powered", distance: 50, frequencyperWeek: 5 }
  //         ]).flat(),
  //       publicTransport: input.transportation_mode
  //         .filter(item => item.name === "public-transport")
  //         .map(() => [
  //           { type: "Bus", distance: 30, frequencyperWeek: 3 }
  //         ]).flat(),
  //       bicycle: input.transportation_mode
  //         .filter(item => item.name === "bicycle")
  //         .map(() => [
  //           { distance: 10, frequencyperWeek: 4 }
  //         ]).flat(),
  //       walking: input.transportation_mode
  //         .filter(item => item.name === "walking")
  //         .map(() => [
  //           { distance: 5, frequencyperWeek: 7 }
  //         ]).flat()
  //     },
  //     dietAndFood: {
  //       poultry: { dailyUsage: input.diet[0]?.dailyUsage || 0.2 }, // Example fallback
  //       vegetable: { dailyUsage: input.diet[1]?.dailyUsage || 0.5 },
  //       meat: { dailyUsage: input.diet[2]?.dailyUsage || 0.3 },
  //       fish: { dailyUsage: input.diet[3]?.dailyUsage || 0.1 }
  //     },
  //     foodWastage: input.food_wastage,
  //     wasteDisposal: {
  //       weeklyCollection: {
  //         frequency: input.waste.find(item => item.type === "collection")?.frequency || 2
  //       },
  //       recycleHabit: input.waste.find(item => item.type === "recycle")?.habit || "Yes"
  //     },
  //     waterUsage: {
  //       washingClothes: {
  //         frequencyperWeek: input.water_usage.find(item => item.type === "washing-clothes")?.frequency || 3
  //       },
  //       showers: {
  //         daysPerWeek: input.water_usage.find(item => item.type === "showers")?.days || 7,
  //         averageDuration: input.water_usage.find(item => item.type === "showers")?.duration || 10
  //       },
  //       gardenWatering: {
  //         daysPerWeek: input.water_usage.find(item => item.type === "garden-watering")?.days || 3,
  //         averageDuration: input.water_usage.find(item => item.type === "garden-watering")?.duration || 15
  //       }
  //     }
  //   };
  // }

  // // Example usage:
  // const transformedData = mapData(carbon); // Replace inputObject with your original data
  // console.log(JSON.stringify(transformedData, null, 2));

  // // console.log(carbon);


  // useEffect(() => {
  //   axios.post("http://192.168.0.110:5001/api/v1/carbonFootPrint", {
  //     transformedData
  //   }).then((response) => {
  //     console.log(response);
  //   })
  // }, []);



  function getRandomNumber(): number {
    return Math.floor(Math.random() * 10);
  }

  if (getRandomNumber() >= 0 && getRandomNumber() <= 2) {
    return (
      <BlueBadge
        setPage={setPage} />
    );
  } else if (getRandomNumber() >= 3 && getRandomNumber() <= 5) {
    return (
      <GreenBadge
        setPage={setPage} />
    );
  } else if (getRandomNumber() >= 6 && getRandomNumber() <= 8) {
    return (
      <VioletBadge
        setPage={setPage} />
    );
  } else {
    return (
      <MintBadge
        setPage={setPage} />
    );
  }

}
