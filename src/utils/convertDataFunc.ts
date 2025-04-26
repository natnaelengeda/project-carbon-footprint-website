export const mapData = (data: any) => {
  // Log the input data for debugging
  //console.log("Input Data:", JSON.stringify(data, null, 2));

  const convertedData = {
    name: data.name,
    housingType: data.housing_type, // Matches HousingTypeEnum
    householdEnergy: {
      heatingAndCooling: data.house_hold_energy
        .filter((item: any) => item.name === "heating-cooling")
        .map((item: any) => {
          return item.category.map((category: any) => ({
            type: category.name, // No changes needed for heating-cooling
            hourlyUsagePerDay: category.value,
            frequencyperWeek: category.frequency || 7,
          }));
        })
        .flat(),
      cooking: data.house_hold_energy
        .filter((item: any) => item.name === "cooking")
        .map((item: any) => {
          return item.category.map((category: any) => ({
            type: category.name.replace("cooking-", "").replace("-stove", ""), // Remove "cooking-" and "-stove"
            hourlyUsagePerDay: category.value,
            frequencyperWeek: category.frequency || 7,
          }));
        })
        .flat(),
      electricAppliance: data.house_hold_energy
        .filter((item: any) => item.name === "electric-appliances")
        .map((item: any) => {
          return item.category.map((category: any) => ({
            type: category.name
              .replace("electric-appliances-", "")
              .replace("iron-clothes", "iron")
              .replace("fridge", "refrigerator")
              .replace("water-boiler", "waterboiler"), // Map to valid enum values
            hourlyUsagePerDay: category.value,
            frequencyperWeek: category.frequency || 7,
          }));
        })
        .flat(),
      lightBulbs: data.house_hold_energy
        .filter((item: any) => item.name === "light-bulbs")
        .map((item: any) => {
          return item.category.map((category: any) => ({
            type: category.name
              .replace("light-bulb-", "")
              .replace("lighting-incandescent", "incandescent")
              .replace("florecent", "fluorescent"), // Map to valid enum values
            hourlyUsagePerDay: category.value,
            frequencyperWeek: category.frequency || 7,
          }));
        })
        .flat(),
    },
    transportationMode: {
      ownAutomobile: data.transportation_mode
        .filter((item: any) => item.name === "automobile")
        .map((item: any) => {
          return item.category.map((category: any) => ({
            overallType: "ownAutomobile",
            type: category.name
              .replace("gas-powered", "gasPowered")
              .replace("electric-powered", "electricPowered")
              .replace("hybrid-powered", "hybrid"), // Map to valid enum values
            distance: category.value,
            frequencyperWeek: category.frequency || 7,
          }));
        })
        .flat(),
      motorcycle: data.transportation_mode
        .filter((item: any) => item.name === "motor-cycle")
        .map((item: any) => ({
          overallType: "motorcycle",
          distance: item.value,
          frequencyperWeek: item.frequency || 7,
        })),
      bicycle: data.transportation_mode
        .filter((item: any) => item.name === "bicycle")
        .map((item: any) => ({
          overallType: "bicycle",
          distance: item.value,
          frequencyperWeek: item.frequency || 7,
        })),
      publicTransport: data.transportation_mode
        .filter((item: any) => ["bus", "light-rail", "ride-hailing"].includes(item.name))
        .map((item: any) => ({
          type: item.name
            .replace("light-rail", "train")
            .replace("ride-hailing", "ride"), // Map to valid enum values
          distance: item.value,
          frequencyperWeek: item.frequency || 7,
        })),
      walking: data.transportation_mode
        .filter((item: any) => item.name === "walking")
        .map((item: any) => ({
          overallType: "walking",
          distance: item.value,
          frequencyperWeek: item.frequency || 7,
        })),
    },
    dietAndFood: {
      poultry: { weeklyUsage: data.diet?.find((item: any) => item.name === "poultry")?.value || 0 },
      vegetable: { weeklyUsage: data.diet?.find((item: any) => item.name === "vegitable")?.value || 0 },
      meat: { weeklyUsage: data.diet?.find((item: any) => item.name === "meat")?.value || 0 },
      fish: { weeklyUsage: data.diet?.find((item: any) => item.name === "fish")?.value || 0 },
    },
    foodWastage: data.food_wastage || 0,
    wasteDisposal: {
      weeklyCollection: {
        frequency: data.waste?.find((item: any) => item.name === "weekly-collection")?.value || 0,
      },
      recycleHabit: data.waste?.find((item: any) => item.name === "recycling-habits")?.option || "no",
      recycleMaterials: data.waste
        ?.find((item: any) => item.name === "recycling-habits")
        ?.plastic
        ? ["plastic"]
        : [],
    },
    waterUsage: {
      washingClothes: {
        frequencyperWeek: data.water_usage?.find((item: any) => item.name === "washing-clothes")?.frequency || 0,
      },
      showers: {
        daysPerWeek: data.water_usage?.find((item: any) => item.name === "showers")?.value || 0,
        averageDuration: data.water_usage?.find((item: any) => item.name === "showers")?.frequency || 0,
      },
      gardenWatering: {
        daysPerWeek: data.water_usage?.find((item: any) => item.name === "watering-garden")?.value || 0,
        averageDuration: data.water_usage?.find((item: any) => item.name === "watering-garden")?.frequency || 0,
      },
    },
  };

  //Log the converted data for debugging
  //console.log("Converted Data:", JSON.stringify(convertedData, null, 2));

  return convertedData;
};

