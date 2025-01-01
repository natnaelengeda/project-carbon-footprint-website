// State
import { PledgeState } from "@/state/pledge";

// Raw Data
const year = 365;
const week = 52;
const electricCarbonEmitedKgPerKwh = 0.024;
const charcoalCarbonEmitedCo2PerKg = 9.7;
const buthenCarbonEmitedCo2Perkg = 3.01;
const woodCarbonEmitedCo2PerKg = 2.1;


export const CalculateCarbonFootPrint = (pledge: PledgeState) => {
  var sum = 0;

  const houseHoldEnergy = pledge.house_hold_energy;

  houseHoldEnergy.map((item: any) => {

    // Heating & Cooling
    if (item.name == "heating-cooling") {
      item.category.map((category: any) => {
        if (category.name == "electric_air_conditioning") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 1.5 * year;
        }
      })
    }

    // Cooking
    if (item.name == "cooking") {
      item.category.map((category: any) => {
        if (category.name == "cooking-electric-stove") {
          sum += category.value * electricCarbonEmitedKgPerKwh * 0.58 * year;
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
          var frequencyperWeek = item.frequency ? item.frequency : 3;
          sum += item.value * frequencyperWeek * 0.5 * electricCarbonEmitedKgPerKwh * week;
        }

        if (category.name == "electric-appliances-iron-clothes") {
          var frequencyperWeek = item.frequency ? item.frequency : 3;
          sum += item.value * frequencyperWeek * electricCarbonEmitedKgPerKwh * 1.1 * week;
        }
      });
    }

    // Light Bulbs
    if (item.name == "light-bulbs") {
      item.category.map((category: any) => {
        if (category.name == "light-bulb-incandecent") {
          sum += 10 * electricCarbonEmitedKgPerKwh * 0.04 * year;
        }

        if (category.name == "light-bulb-florecent") {
          sum += item.value * electricCarbonEmitedKgPerKwh * 0.036 * year;
          // console.log("Light Bulb Florecent", category)
        }
      })
    }
  });

  return sum;
}