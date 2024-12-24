export const mapDataPledge = (data: any, pledgedTrees: number) => {
  return {
    name: data.name,
    housingType: "Condo",
    householdEnergy: {
      heatingAndCooling: data.house_hold_energy
        .filter((item: any) => item.name === "heating-cooling")
        .map((item: any) => {
          var electricIndex = item.category.findIndex((item: any) => item.name === "electric_air_conditioning");
          var charcoalIndex = item.category.findIndex((item: any) => item.name === "charcoal");
          var noneIndex = item.category.findIndex((item: any) => item.name === "none");

          if (electricIndex !== -1) {
            return { type: "electric", hourlyUsagePerDay: item.category[electricIndex].value }
          }

          if (charcoalIndex !== -1) {
            return { type: "charcoal", hourlyUsagePerDay: item.category[charcoalIndex].value }
          }

          if (noneIndex !== -1) {
            return { type: "none", hourlyUsagePerDay: item.category[noneIndex].value }
          }
        })
        .flat(),
      cooking: data.house_hold_energy
        .filter((item: any) => item.name === "cooking")
        .map((item: any) => {

          var electricIndex = item.category.findIndex((item: any) => item.name === "cooking-electric-stove");
          var charcoalIndex = item.category.findIndex((item: any) => item.name === "cooking-charcoal");
          var gasIndex = item.category.findIndex((item: any) => item.name === "cooking-gas-stove");

          var arr = [];


          if (electricIndex !== -1) {
            arr.push({ type: "electric", hourlyUsagePerDay: item.category[electricIndex].value });
          }

          if (charcoalIndex !== -1) {
            arr.push({ type: "charcoal", hourlyUsagePerDay: item.category[charcoalIndex].value });
          }


          if (gasIndex !== -1) {
            arr.push({ type: "gas", hourlyUsagePerDay: item.category[gasIndex].value });
          }
          return arr;
        }).flat(),
      electricAppliance: data.house_hold_energy
        .filter((item: any) => item.name === "electric-appliances")
        .map((item: any) => {
          var tvIndex = item.category.findIndex((item: any) => item.name === "electric-appliances-tv");
          var washingMachineIndex = item.category.findIndex((item: any) => item.name === "electric-appliances-washing-machine");
          var ironClothesIndex = item.category.findIndex((item: any) => item.name === "electric-appliances-iron-clothes");

          var arr = [];

          if (tvIndex !== -1) {
            arr.push({ type: "tv", hourlyUsagePerDay: item.category[tvIndex].value });
          }

          if (washingMachineIndex !== -1) {
            arr.push({ type: "washingMachine", hourlyUsagePerDay: item.category[washingMachineIndex].value });
          }

          if (ironClothesIndex !== -1) {
            arr.push({ type: "iron", hourlyUsagePerDay: item.category[ironClothesIndex].value });
          }

          return arr;
        }).flat(),
      lightBulbs: data.house_hold_energy
        .filter((item: any) => item.name === "light-bulbs")
        .map((item: any) => {
          var incandescentIndex = item.category.findIndex((item: any) => item.name === "light-bulb-incandecent");
          var ledIndex = item.category.findIndex((item: any) => item.name === "light-bulb-led");
          var cflIndex = item.category.findIndex((item: any) => item.name === "light-bulb-cfl");
          var florecentIndex = item.category.findIndex((item: any) => item.name === "light-bulb-florecent");

          var arr = [];

          if (incandescentIndex !== -1) {
            arr.push({ type: "incandescent", hourlyUsagePerDay: item.category[incandescentIndex].value });
          }

          if (ledIndex !== -1) {
            arr.push({ type: "led", hourlyUsagePerDay: item.category[ledIndex].value });
          }

          if (cflIndex !== -1) {
            arr.push({ type: "cfl", hourlyUsagePerDay: item.category[cflIndex].value });
          }

          if (florecentIndex !== -1) {
            arr.push({ type: "fluorescent", hourlyUsagePerDay: item.category[florecentIndex].value });
          }

          return arr;
        }).flat(),
    },
    transportationMode: {
      ownAutomobile: data.transportation_mode
        .filter((item: any) => item.name === "automobile")
        .map((item: any) => {
          var gasIndex = item.category.findIndex((item: any) => item.name === "gas-powered");
          var electricIndex = item.category.findIndex((item: any) => item.name === "electric-powered");
          var hybridIndex = item.category.findIndex((item: any) => item.name === "hybrid-powered");

          var arr = [];

          if (gasIndex !== -1) {
            arr.push({ type: "gasPowered", distance: item.category[gasIndex].value, frequencyperWeek: item.category[gasIndex].frequency });
          }

          if (electricIndex !== -1) {
            arr.push({ type: "electricPowered", distance: item.category[electricIndex].value, frequencyperWeek: item.category[electricIndex].frequency });
          }

          if (hybridIndex !== -1) {
            arr.push({ type: "hybrid", distance: item.category[hybridIndex].value, frequencyperWeek: item.category[hybridIndex].frequency });
          }

          return arr;
        }).flat(),
      publicTransport: data.transportation_mode
        .filter((item: any) => item.name === "public-transport")
        .map((item: any) => {
          var busIndex = item.category.findIndex((item: any) => item.name === "bus");
          var taxiIndex = item.category.findIndex((item: any) => item.name === "taxi");
          var trainIndex = item.category.findIndex((item: any) => item.name === "train");
          var rideIndex = item.category.findIndex((item: any) => item.name === "ride");

          var arr = [];

          if (busIndex !== -1) {
            arr.push({ type: "bus", distance: item.category[busIndex].value, frequencyperWeek: item.category[busIndex].frequency });
          }

          if (taxiIndex !== -1) {
            arr.push({ type: "taxi", distance: item.category[taxiIndex].value, frequencyperWeek: item.category[taxiIndex].frequency });
          }

          if (trainIndex !== -1) {
            arr.push({ type: "train", distance: item.category[trainIndex].value, frequencyperWeek: item.category[trainIndex].frequency });
          }

          if (rideIndex !== -1) {
            arr.push({ type: "ride", distance: item.category[rideIndex].value, frequencyperWeek: item.category[rideIndex].frequency });
          }

          return arr;
        }).flat(),
      bicycle: data.transportation_mode
        .filter((item: any) => item.name === "bicycle")
        .map((item: any) => {

          if (item) {
            return { distance: item.value, frequencyperWeek: item.frequency };
          }
        }).flat(),

      walking: data.transportation_mode
        .filter((item: any) => item.name === "walking")
        .map((item: any) => {
          return { distance: item.value, frequencyperWeek: item.frequency };
        }).flat()
    },
    dietAndFood: {
      poultry: data.diet
        .filter((item: any) => item.name === "poultry")
        .map((item: any) => {
          return { weeklyUsage: item.value };
        })[0] || { weeklyUsage: 0 },
      vegetable: data.diet
        .filter((item: any) => item.name === "vegitable")
        .map((item: any) => {
          return { weeklyUsage: item.value };
        })[0] || { weeklyUsage: 0 },
      meat: data.diet
        .filter((item: any) => item.name === "meat")
        .map((item: any) => {
          return { weeklyUsage: item.value };
        })[0] || { weeklyUsage: 0 },
      fish: data.diet
        .filter((item: any) => item.name === "fish")
        .map((item: any) => {
          return { weeklyUsage: item.value };
        })[0] || { weeklyUsage: 0 },
    },
    foodWastage: data.food_wastage,
    wasteDisposal: {
      weeklyCollection: data.waste
        .filter((item: any) => item.name == "weekly-collection")
        .map((item: any) => {
          return { frequency: item.value };
        })[0] || { frequency: 0 },
      recycleHabit: data.waste
        .filter((item: any) => item.name == "recycling-habits")
        .map((item: any) => {
          return item.option == "yes" ? "Yes" : "No";
        })[0] || "no",
      recycleMaterials: data.waste
        .filter((item: any) => item.name == "recycling-habits")
        .map((item: any) => {
          if (item.option == "yes") {
            var yesArr = [];
            if (item.paper) yesArr.push("paper");
            if (item.plastic) yesArr.push("plastic");
            if (item.bottle) yesArr.push("bottle");
            if (item.metal) yesArr.push("metal");
            return yesArr;
          } else {
            return [];
          }
        })[0] || []
    },
    waterUsage: {
      washingClothes: data.water_usage
        .filter((item: any) => item.name == "washing-clothes")
        .map((item: any) => {
          return { frequencyperWeek: item.value };
        })[0] || { frequencyperWeek: 0 },
      showers: data.water_usage
        .filter((item: any) => item.name == "showers")
        .map((item: any) => {
          return { daysPerWeek: item.value, averageDuration: item.frequency };
        })[0] || { daysPerWeek: 0, averageDuration: 0 },
      gardenWatering: data.water_usage
        .filter((item: any) => item.name == "gardening-water")
        .map((item: any) => {
          return { averageDuration: item.value, daysPerWeek: item.frequency };
        })[0] || { daysPerWeek: 0, averageDuration: 0 },
    },
    numberOfTreesPledged: pledgedTrees
  };

}