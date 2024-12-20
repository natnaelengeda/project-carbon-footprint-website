
export default function Test() {

  const data = {
    id: "418218277533887",
    name: "user-9052",
    housing_type: "condo",
    house_hold_energy: [
      {
        id: 1,
        name: "heating-cooling",
        selected: true,
        value: 0,
        category: [
          {
            id: 1,
            name: "electric_air_conditioning",
            selected: true,
            value: 13
          }
        ]
      },
      {
        id: 2,
        name: "cooking",
        selected: true,
        value: 1,
        category: [
          {
            id: 1,
            name: "cooking-electric-stove",
            selected: true,
            value: 12,
            parent_id: 2,
            category_id: 1
          },
          {
            id: 2,
            name: "cooking-charcoal",
            selected: true,
            value: 12,
            parent_id: 2,
            category_id: 2
          },
          {
            id: 3,
            name: "cooking-gas-stove",
            selected: true,
            value: 12,
            parent_id: 2,
            category_id: 3
          }
        ]
      },
      {
        id: 3,
        name: "electric-appliances",
        selected: true,
        value: 1,
        category: [
          {
            id: 1,
            name: "electric-appliances-tv",
            selected: true,
            value: 5,
            parent_id: 3,
            category_id: 1
          },
          {
            id: 2,
            name: "electric-appliances-washing-machine",
            selected: true,
            value: 5,
            parent_id: 3,
            category_id: 2,
            frequency: 2
          },
          {
            id: 3,
            name: "electric-appliances-iron-clothes",
            selected: true,
            value: 12,
            parent_id: 3,
            category_id: 3
          }
        ]
      },
      {
        id: 4,
        name: "light-bulbs",
        selected: true,
        value: 1,
        category: [
          {
            id: 1,
            name: "light-bulb-incandecent",
            selected: true,
            value: 14,
            parent_id: 4,
            category_id: 1
          },
          {
            id: 2,
            name: "light-bulb-led",
            selected: true,
            value: 4,
            parent_id: 4,
            category_id: 2
          },
          {
            id: 3,
            name: "light-bulb-cfl",
            selected: true,
            value: 5,
            parent_id: 4,
            category_id: 3
          },
          {
            id: 4,
            name: "light-bulb-florecent",
            selected: true,
            value: 6,
            parent_id: 4,
            category_id: 4
          }
        ]
      }
    ],
    transportation_mode: [
      {
        id: 1,
        name: "automobile",
        selected: true,
        value: 1,
        frequency: 0,
        category: [
          {
            id: 1,
            name: "gas-powered",
            value: 8,
            frequency: 3,
            parent_id: 1,
            category_id: 1
          },
          {
            id: 2,
            name: "electric-powered",
            value: 12,
            frequency: 2,
            parent_id: 1,
            category_id: 2
          },
          {
            id: 3,
            name: "hybrid-powered",
            value: 15,
            frequency: 5,
            parent_id: 1,
            category_id: 3
          }
        ]
      },
      {
        id: 2,
        name: "public-transport",
        selected: true,
        value: 1,
        frequency: 0,
        category: [
          {
            id: 1,
            name: "bus",
            value: 16,
            frequency: 3,
            parent_id: 2,
            category_id: 1
          },
          {
            id: 2,
            name: "taxi",
            value: 26,
            frequency: 6,
            parent_id: 2,
            category_id: 2
          },
          {
            id: 3,
            name: "train",
            value: 18,
            frequency: 3,
            parent_id: 2,
            category_id: 3
          },
          {
            id: 4,
            name: "ride",
            value: 22,
            frequency: 4,
            parent_id: 2,
            category_id: 4
          }
        ]
      },
      {
        id: 3,
        name: "bicycle",
        selected: true,
        value: 23,
        frequency: 4,
        category: []
      },
      {
        id: 4,
        name: "walking",
        selected: true,
        value: 20,
        frequency: 7,
        category: []
      }
    ],
    diet: [
      {
        id: 1,
        name: "poultry",
        selected: true,
        value: 5
      },
      {
        id: 2,
        name: "vegitable",
        selected: true,
        value: 7
      },
      {
        id: 3,
        name: "meat",
        selected: true,
        value: 2
      },
      {
        id: 4,
        name: "fish",
        selected: true,
        value: 1
      }
    ],
    waste: [
      {
        id: 2,
        name: "recycling-habits",
        selected: true,
        value: 1,
        option: "yes",
        paper: true,
        plastic: true,
        bottle: false,
        metal: false
      },
      {
        id: 1,
        name: "weekly-collection",
        selected: true,
        value: 2
      }
    ],
    water_usage: [
      {
        id: 2,
        name: "showers",
        selected: true,
        value: 7,
        frequency: 15
      },
      {
        id: 3,
        name: "gardening-water",
        selected: true,
        value: 39,
        frequency: 4
      }
    ],
    food_wastage: 1,
    _persist: {
      version: -1,
      rehydrated: true
    }
  }


  const mapData = () => {
    return {
      name: data.name,
      housingType: data.housing_type,
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
            return item.option == "yes" ? "yes" : "no";
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
            return { daysPerWeek: item.value, averageDuration: item.frequency };
          })[0] || { daysPerWeek: 0, averageDuration: 0 },
      },
    };
  }


  return (
    <div className="w-full min-h-screen h-full flex flex-col items-center justify-start pt-10">
      <h1 className="text-3xl font-bold text-center">Test</h1>

      <button
        onClick={() => {
          const transformedData = mapData();
          // console.log(transformedData);
          console.log(JSON.stringify(transformedData, null, 2));

        }}
        className="px-8 py-2 bg-primary text-white text-lg mt-5 rounded-full">
        Test
      </button>

    </div>
  )
}
