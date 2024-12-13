import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CarbonState {
  id: string;
  name?: string;
  housing_type?: string;
}

const initialState: CarbonState = {
  id: "",
  name: "",
  housing_type: "",
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
    clearEverything: (state) => {
      state.id = "";
      state.name = "";
    }
  },
});

export const { addName, clearEverything, addHousingType } = carbonSlice.actions;
export const selectCarbon = (state: { carbon: CarbonState; }) => state.carbon;
export default carbonSlice.reducer;
