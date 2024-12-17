import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// Define the CarbonState interface
interface HouseholdEnergyCategory {
  id: number;
  name: string;
  selected: boolean;
  value: number;
}

interface HouseholdEnergy {
  id: number;
  name: string;
  selected: boolean;
  value?: number;
  category?: HouseholdEnergyCategory[];
}

export interface CarbonState {
  id: string;
  name: string;
  housing_type: string;
  house_hold_energy: HouseholdEnergy[];
}


// Define the initial state
const initialState: CarbonState = {
  id: "",
  name: "",
  housing_type: "",
  house_hold_energy: [],
};
export const carbonSlice = createSlice({
  name: "carbon",
  initialState,
  reducers: {
    // Add or update name and id
    addName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },

    // Add or update housing type
    addHousingType: (state, action: PayloadAction<{ housing_type: string }>) => {
      state.housing_type = action.payload.housing_type;
    },

    // Get household energy by Id
    // getHouseholdEnergyById: (state, action: PayloadAction<{ id: number }>) => {
    //   const foundEnergy = state.house_hold_energy.find(
    //     (energy) => energy.id === action.payload.id
    //   );
    //   return { ...state, foundEnergy };
    // },

    // Add or update household energy
    // addHouseholdEnergy: (state, action: PayloadAction<HouseholdEnergy>) => {
    //   const existingIndex = state.house_hold_energy.findIndex(
    //     (energy) => energy.id === action.payload.id
    //   );

    //   if (existingIndex !== -1) {
    //     // Update if already exists
    //     state.house_hold_energy[existingIndex] = action.payload;
    //   } else {
    //     // Add if new
    //     state.house_hold_energy.push(action.payload);
    //   }
    // },
    addHouseholdEnergy: (state, action: PayloadAction<Partial<HouseholdEnergy> & { id: number }>) => {
      const existingIndex = state.house_hold_energy.findIndex(
        (energy) => energy.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // Update only the provided properties if the item exists
        state.house_hold_energy[existingIndex] = {
          ...state.house_hold_energy[existingIndex],
          ...action.payload,
        };
      } else {
        // Add new item if it doesn't exist
        state.house_hold_energy.push({
          id: action.payload.id,
          name: action.payload.name || "",
          selected: action.payload.selected || false,
          value: action.payload.value || 0,
          category: action.payload.category || [],
        });
      }
    },
    // updateHouseHoldEnergyCategory: (state, action: PayloadAction<>) => {

    // },

    // Remove household energy
    deleteHouseholdEnergy: (state, action: PayloadAction<{ id: number }>) => {
      state.house_hold_energy = state.house_hold_energy.filter(
        (item) => item.id !== action.payload.id
      );
    },

    // Clear all state fields
    clearEverything: (state) => {
      state.id = "";
      state.name = "";
      state.housing_type = "";
      state.house_hold_energy = [];
    },
  },
});


export const selectHouseholdEnergy = (state: RootState) =>
  state.carbon.house_hold_energy;

export const selectHouseholdEnergyById = (
  state: RootState,
  id: number
) => state.carbon.house_hold_energy.find((item) => item.id === id);



export const {
  addName,
  clearEverything,
  addHousingType,
  addHouseholdEnergy,
  deleteHouseholdEnergy,
} = carbonSlice.actions;
export const selectCarbon = (state: { carbon: CarbonState; }) => state.carbon;
export default carbonSlice.reducer;
