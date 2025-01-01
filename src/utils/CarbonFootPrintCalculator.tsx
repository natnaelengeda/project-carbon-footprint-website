// State
import { PledgeState } from "@/state/pledge";

// Raw Data
const year = 365;
const week = 52;
const electricCarbonEmitedKgPerKwh = 0.024;
// const charcoalCarbonEmitedCo2PerKg = 9.7;
// const buthenCarbonEmitedCo2Perkg = 3.01;
// const woodCarbonEmitedCo2PerKg = 2.1;


export const CalculateCarbonFootPrint = (pledge: PledgeState) => {
  var sum = 0;

  const houseHoldEnergy = pledge.house_hold_energy;
  const transportation = pledge.transportation_mode;
  const diet = pledge.diet;
  const waste = pledge.waste;
  const food_wastage = pledge.food_wastage;
  const water_usage = pledge.water_usage;


  houseHoldEnergy.map((item: any) => {

    // Heating & Cooling
    if (item.name == "heating-cooling") {
      item.category.map((category: any) => {
        if (category.name == "electric_air_conditioning") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 1.5 * year;
        }

        if (category.name == "charcoal") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.58 * year;
        }

      })
    }

    // Cooking
    if (item.name == "cooking") {
      item.category.map((category: any) => {
        if (category.name == "cooking-electric-stove") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.58 * year;
        }

        if (category.name == "cooking-charcoal") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.58 * year;
        }

        if (category.name == "cooking-gas-stove") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.189 * year;
        }
      })
    }

    // Electric Appliances
    if (item.name == "electric-appliances") {
      item.category.map((category: any) => {
        if (category.name == "electric-appliances-tv") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.1 * year;
        }

        if (category.name == "electric-appliances-washing-machine") {
          var frequencyperWeek = category.frequency ? category.frequency : 3;
          sum += category.value * 0.5 * electricCarbonEmitedKgPerKwh * week;
        }

        if (category.name == "electric-appliances-iron-clothes") {
          var frequencyperWeek = category.frequency ? category.frequency : 3;
          sum += category.value * frequencyperWeek * electricCarbonEmitedKgPerKwh * 1.1 * week;
        }
      });
    }

    // Light Bulbs
    if (item.name == "light-bulbs") {
      item.category.map((category: any) => {

        if (category.name == "light-bulb-incandecent") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.04 * year;
        }

        if (category.name == "light-bulb-florecent") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.036 * year;
        }

        if (category.name == "light-bulb-led") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.007 * year;
        }

        if (category.name == "light-bulb-cfl") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.013 * year;
        }
      })
    }
  });

  transportation.map((item: any) => {

    // Automobile
    if (item.name == "automobile") {
      const gasIndex = item.category.findIndex((category: any) => category.name == "gas-powered");
      const electricIndex = item.category.findIndex((category: any) => category.name == "electric-powered");
      const hybridIndex = item.category.findIndex((category: any) => category.name == "hybrid-powered");

      if (gasIndex !== -1) {
        sum += item.category[gasIndex].value * item.category[gasIndex].frequency * 0.15 * week;
      }

      if (electricIndex !== -1) {
        sum += item.category[electricIndex].value * item.category[electricIndex].frequency * 0.037 * week;
      }

      if (hybridIndex !== -1) {
        sum += item.category[hybridIndex].value * item.category[hybridIndex].frequency * 0.08 * week;
      }
    }

    // Public Transport
    if (item.name == "public-transport") {
      const busIndex = item.category.findIndex((category: any) => category.name == "bus");
      const trainIndex = item.category.findIndex((category: any) => category.name == "train");
      const taxiIndex = item.category.findIndex((category: any) => category.name == "taxi");
      const rideIndex = item.category.findIndex((category: any) => category.name == "ride");

      // Bus
      if (busIndex !== -1) {
        sum += ((item.category[busIndex].value * item.category[busIndex].frequency * 1.1) / 100) * week;
      }

      // Train
      if (trainIndex !== -1) {
        sum += item.category[trainIndex].value * item.category[trainIndex].frequency * electricCarbonEmitedKgPerKwh * 0.57;
      }

      // Taxi
      if (taxiIndex !== -1) {
        sum += ((item.category[taxiIndex].value * item.category[taxiIndex].frequency * 0.159) / 14) * week;
      }

      // Ride
      if (rideIndex !== -1) {
        sum += item.category[rideIndex].value * item.category[rideIndex].frequency * 0.15 * week;
      }
    }

    // Bicycle
    if (item.name == "bicycle") {
      sum += item.value * item.frequency * 0.021 * week;
    }

    // Walking
    if (item.name == "walking") {
      sum += item.value * item.frequency * 0.036 * week;
    }

  });

  diet.map((item: any) => {

    // Poyltry
    if (item.name == "poultry") {
      sum += ((item.value * 0.39) * 6.9 * week);
    }

    // Vegitable
    if (item.name == "vegitable") {
      sum += ((item.value * 12.2 / year) * 2 * week);
    }

    // Meat
    if (item.name == "meat") {
      sum += ((item.value * 0.52 / year) * 27 * week);
    }

    // Fish
    if (item.name == "fish") {
      sum += ((item.value * 12) / year) * 27 * week;
    }
  });

  waste.map((item: any) => {
    // Waste
    if (item.name == "weekly-collection") {
      sum += item.value * 0.685 * week;
    }
  });

  if (food_wastage) {
    sum += food_wastage * 2.5 * week;
  }

  water_usage.map((item: any) => {

    // Washing Clothes
    if (item.name == "washing-clothes") {
      sum += item.value * 50 * 0.0082 * week;
    }

    // Shower
    if (item.name == "showers") {
      sum += item.value * item.frequency * 7.5 * 0.0082 * week;
    }

    // Gardening
    if (item.name == "gardening-water") {
      sum += item.value * item.frequency * 34 * 0.0082 * week;
    }

  });





  return sum;
}