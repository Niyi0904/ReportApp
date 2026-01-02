import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TenantState = {
  subdomain: null | string,
  tenantId: null | string
};

const initialState: TenantState = {
  subdomain: null,
  tenantId: null
};

const tenantSlice = createSlice({
  name: "tenant",
  initialState,
  reducers: {
    setSubdomain: ( state, action: PayloadAction<string> ) => {
      state.subdomain = action.payload
    },
    setTenantId: ( state, action: PayloadAction<string> ) => {
      state.tenantId = action.payload
    }
  },
});

export const { setSubdomain, setTenantId } = tenantSlice.actions;
export default tenantSlice.reducer;
