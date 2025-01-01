import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

// House Hold Energy Category
interface HouseholdEnergyCategory {
  id: number;
  name: string;
  selected: boolean;
  value: number;
  frequency?: number;
}

interface HouseholdEnergy {
  id: number;
  name: string;
  selected: boolean;
  value?: number;
  category?: HouseholdEnergyCategory[];
}

interface TransportationCategory {
  id: number;
  name: string;
  value: number;
  frequency: number;
}

interface Transportation {
  id: number;
  name: string;
  selected?: boolean; // Optional, as not all entries have `selected`
  value?: number; // Optional, as not all entries have `value`
  frequency?: number; // Optional, as not all entries have `frequency`
  category?: TransportationCategory[]; // Optional, as not all entries have `category`
}

// Diet
interface Diet {
  id: number;
  name: string;
  selected: boolean;
  value: number;
}

// Waste Disposal
interface WasteDisposal {
  id: number;
  name: string;
  value: number;
  option?: string;
  paper?: boolean;
  plastic?: boolean;
  bottle?: boolean;
  metal?: boolean;
}

// Water Usage 
interface WaterUsage {
  id: number;
  name: string;
  value?: number;
  frequency?: number;
}

export interface PledgeState {
  id: string;
  name: string;
  house_hold_energy: HouseholdEnergy[];
  transportation_mode: Transportation[];
  diet: Diet[];
  food_wastage: number;
  waste: WasteDisposal[];
  water_usage: WaterUsage[];
  trees: number;
  carbon_footprint: number;
  new_carbon_footprint: number;
  old_pledge: string;
}

// Define initial state
const initialState: PledgeState = {
  id: "",
  name: "",
  house_hold_energy: [],
  transportation_mode: [],
  diet: [],
  food_wastage: 0,
  waste: [],
  water_usage: [],
  trees: 0,
  carbon_footprint: 0,
  new_carbon_footprint: 0,
  old_pledge: "",
};

// Create a slice
export const pledgeSlice = createSlice({
  name: "pledge",
  initialState,
  reducers: {

    updatePledgeId(state, action: PayloadAction<{ id: string }>) {
      state.id = action.payload.id;
    },

    // Add or Update Name and Id
    addName: (state, action: PayloadAction<{ id: string; name: string }>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },

    addCarbonFootPrint: (state, action: PayloadAction<{ data: number }>) => {
      state.carbon_footprint = action.payload.data;
    },

    addNewCarbonFootPrint: (state, action: PayloadAction<{ data: number }>) => {
      state.new_carbon_footprint = action.payload.data;
    },

    addTrees: (state, action: PayloadAction<{ data: number }>) => {
      state.trees = action.payload.data;
    },

    addOldPledge: (state, action: PayloadAction<{ pledge: string }>) => {
      state.old_pledge = action.payload.pledge;
    },

    // House Hold Energy
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

    addHouseholdEnegryCategory: (state, action: PayloadAction<Partial<HouseholdEnergyCategory> & { parent_id: number, category_id: number }>) => {
      const energyIndex = state.house_hold_energy.findIndex(
        (energy) => energy.id === action.payload.parent_id
      );

      if (energyIndex !== -1) {
        // Find the category within the parent
        const categoryIndex = state.house_hold_energy[energyIndex].category?.findIndex(
          (categoryItem) => categoryItem.id === action.payload.category_id
        );

        if (categoryIndex !== -1) {
          // Update only the provided properties if the item exists
          state.house_hold_energy[energyIndex].category![categoryIndex!] = {
            ...state.house_hold_energy[energyIndex].category![categoryIndex!],
            ...action.payload,
          }
        } else {
          // Add the new Category if it doesn't exist
          state.house_hold_energy[energyIndex].category?.push({
            id: action.payload.category_id,
            name: action.payload.name || "",
            selected: action.payload.selected || false,
            value: action.payload.value || 0,
          });
        }
      }
    },

    // Remove household energy
    deleteHouseholdEnergy: (state, action: PayloadAction<{ id: number }>) => {
      state.house_hold_energy = state.house_hold_energy.filter(
        (item) => item.id !== action.payload.id
      );
    },

    deleteHouseholdEnergyCategory: (
      state,
      action: PayloadAction<{ parent_id: number; category_id: number }>
    ) => {
      // Find the index of the parent energy type
      const energyIndex = state.house_hold_energy.findIndex(
        (energy) => energy.id === action.payload.parent_id
      );

      if (energyIndex !== -1) {
        // Filter out the category to delete
        state.house_hold_energy[energyIndex].category = state.house_hold_energy[energyIndex]
          .category?.filter(
            (categoryItem: any) => categoryItem.id !== action.payload.category_id
          );
      } else {
        console.error(`Parent energy type with id ${action.payload.parent_id} not found.`);
      }
    },

    // Transportation Mode

    // Add or Update Transportation Mode
    addTransportationMode: (state, action: PayloadAction<Partial<Transportation> & { id: number }>) => {
      const existingIndex = state.transportation_mode.findIndex(
        (transport) => transport.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // Update only the provided properties if the item exists
        state.transportation_mode[existingIndex] = {
          ...state.transportation_mode[existingIndex],
          ...action.payload
        };
      } else {
        // Add new item if it doesn't exist
        state.transportation_mode.push({
          id: action.payload.id,
          name: action.payload.name || "",
          selected: action.payload.selected || false,
          value: action.payload.value || 0,
          frequency: action.payload.frequency || 0,
          category: action.payload.category || [],
        });
      }
    },

    // Delete Transportation Mode
    deleteTransportationMode: (state, action: PayloadAction<{ id: number }>) => {
      state.transportation_mode = state.transportation_mode.filter(
        (item) => item.id !== action.payload.id
      );
    },

    addTransportCategory: (state, action: PayloadAction<Partial<TransportationCategory> & { parent_id: number, category_id: number }>) => {
      const transportIndex = state.transportation_mode.findIndex(
        (transport) => transport.id === action.payload.parent_id
      );

      if (transportIndex !== -1) {
        // Find the Category within the parent
        const categoryIndex = state.transportation_mode[transportIndex].category?.findIndex(
          (categoryItem) => categoryItem.id === action.payload.category_id
        );

        if (categoryIndex !== -1) {
          // Update only the provided properties if the item exists
          state.transportation_mode[transportIndex].category![categoryIndex!] = {
            ...state.transportation_mode[transportIndex].category![categoryIndex!],
            ...action.payload,
          }
        } else {
          // Add the new Category if it doesn't exist
          state.transportation_mode[transportIndex].category?.push({
            id: action.payload.category_id,
            name: action.payload.name || "",
            value: action.payload.value || 0,
            frequency: action.payload.frequency || 0,
          });
        }
      }
    },

    deleteTransportaionCategory: (
      state,
      action: PayloadAction<{ parent_id: number; category_id: number }>
    ) => {
      // Find the index of the parent energy type
      const transportIndex = state.transportation_mode.findIndex(
        (transport) => transport.id === action.payload.parent_id
      );


      if (transportIndex !== -1) {
        // Filter out the category to delete
        state.transportation_mode[transportIndex].category = state.transportation_mode[transportIndex]
          .category?.filter(
            (categoryItem: any) => categoryItem.id !== action.payload.category_id
          );
      } else {
        console.error(`Parent energy type with id ${action.payload.parent_id} not found.`);
      }

    },

    // Diet
    addDiet: (state, action: PayloadAction<Partial<Diet> & { id: number }>) => {
      const exsistingIndex = state.diet.findIndex(
        (diet) => diet.id === action.payload.id
      );

      if (exsistingIndex !== -1) {
        // Update only the provided properties if the item exists
        state.diet[exsistingIndex] = {
          ...state.diet[exsistingIndex],
          ...action.payload
        };
      } else {
        // Add enw item if it doesn't exist
        state.diet.push({
          id: action.payload.id,
          name: action.payload.name || "",
          selected: action.payload.selected || false,
          value: action.payload.value || 0,
        });
      }
    },

    deleteDiet: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.diet = state.diet.filter(
        (item) => item.id !== action.payload.id
      );
    },

    // Waste Disposal
    addWaste: (state, action: PayloadAction<Partial<WasteDisposal> & { id: number }>) => {
      const exsistingIndex = state.waste.findIndex(
        (waste) => waste.id === action.payload.id
      );

      if (exsistingIndex !== -1) {
        // Update The provided properties only
        state.waste[exsistingIndex] = {
          ...state.diet[exsistingIndex],
          ...action.payload,
        };
      } else {
        // Add New
        state.waste.push({
          id: action.payload.id,
          name: action.payload.name || "",
          value: action.payload.value || 0,
          option: action.payload.option || "no",
        });
      }
    },

    deleteWaste: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.waste = state.waste.filter(
        (item) => item.id !== action.payload.id
      );
    },

    // Food Wastage
    updateFoodWastage: (state, action: PayloadAction<{ food_wastage: number }>) => {
      state.food_wastage = action.payload.food_wastage
    },

    // Water Usate
    addWaterUsage: (
      state,
      action: PayloadAction<Partial<WaterUsage> & { id: number }>
    ) => {
      const existingIndex = state.water_usage.findIndex(
        (water) => water.id === action.payload.id
      );

      if (existingIndex !== -1) {
        // Update
        state.water_usage[existingIndex] = {
          ...state.diet[existingIndex],
          ...action.payload
        }
      } else {
        // Add
        state.water_usage.push({
          id: action.payload.id,
          name: action.payload.name || "",
          value: action.payload.value || 1,
          frequency: action.payload.frequency || 1
        })
      }
    },

    deleteWaterUsage: (
      state,
      action: PayloadAction<{ id: number }>
    ) => {
      state.water_usage = state.water_usage.filter(
        (item) => item.id !== action.payload.id
      );
    },

    clearPledge: (state) => {
      state.id = "";
      state.name = "";
      state.house_hold_energy = [];
      state.transportation_mode = [];
      state.diet = [];
      state.waste = [];
      state.water_usage = [];
      state.food_wastage = 0;
      state.carbon_footprint = 0;
      state.new_carbon_footprint = 0;
      state.trees = 0;
    }
  }
});

export const getCarbonFootPrint = (state: PledgeState) => {
  return state.carbon_footprint;
}

export const {
  addName,
  updatePledgeId,

  // House Hold Energy
  addHouseholdEnergy,
  addHouseholdEnegryCategory,
  deleteHouseholdEnergy,
  deleteHouseholdEnergyCategory,

  // Transportation
  addTransportationMode,
  deleteTransportationMode,
  addTransportCategory,
  deleteTransportaionCategory,

  // Diet
  addDiet,
  deleteDiet,

  // Waste
  addWaste,
  deleteWaste,

  // Food Wastage
  updateFoodWastage,

  // Water Usage
  addWaterUsage,
  deleteWaterUsage,

  clearPledge,

  // Carbon Footprint
  addCarbonFootPrint,
  addNewCarbonFootPrint,
  addTrees,
  addOldPledge,

} = pledgeSlice.actions;
export const selectPledge = (state: { pledge: PledgeState }) => state.pledge;
export default pledgeSlice.reducer;