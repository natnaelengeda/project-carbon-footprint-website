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


  

  return sum;
}