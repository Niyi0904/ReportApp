import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

export interface onboardingState {
  currentPage: string
}

const initialState: onboardingState = {
  currentPage: "Dashboard",
}

export const uiSlice = createSlice({
  name: "Ui",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<string>) => {
      state.currentPage = action.payload
    },
    resetUi: () => initialState,
  },
})

export const {
  setCurrentPage,
  resetUi

} = uiSlice.actions

export default uiSlice.reducer