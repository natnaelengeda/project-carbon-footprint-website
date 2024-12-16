import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CarbonState {
  id: string;
  name?: string;
  housing_type?: string;
  house_hold_energy?: [];
}

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
    addName: (state, action: PayloadAction<CarbonState>) => {
      state.id = action.payload.id;
      state.name = action.payload.name;
    },
    addHousingType: (state, action: PayloadAction<{ housing_type: string }>) => {
      state.housing_type = action.payload.housing_type;
    },
    addHouseHoldEnergy: (state, action: PayloadAction<{ house_hold_energy: [] }>) => {
      state.house_hold_energy = action.payload.house_hold_energy;
    },
    clearEverything: (state) => {
      state.id = "";
      state.name = "";
      state.housing_type = "";
      state.house_hold_energy = [];
    }
  },
});

export const { addName, clearEverything, addHousingType } = carbonSlice.actions;
export const selectCarbon = (state: { carbon: CarbonState; }) => state.carbon;
export default carbonSlice.reducer;
