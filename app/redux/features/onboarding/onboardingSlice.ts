import { createSlice, type PayloadAction } from "@reduxjs/toolkit"

interface Members {
  email: string;
  role: string;
}

export interface onboardingState {
  step: number
}

const initialState: onboardingState = {
  step: 1,
}

export const onboardingSlice = createSlice({
  name: "Onboarding",
  initialState,
  reducers: {
    setStep: (state, action: PayloadAction<number>) => {
      state.step = action.payload
    },
    resetOnboarding: () => initialState,
  },
})

export const {
  setStep,
  resetOnboarding

} = onboardingSlice.actions

export default onboardingSlice.reducer