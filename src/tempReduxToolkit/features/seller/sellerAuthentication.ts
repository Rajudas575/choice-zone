import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// Define initial state
interface SellerAuthState {
  otpSent: boolean;
  error: string | null;
  loading: boolean;
  jwt: string | null;
  sellerCreated: string | null;
}

const initialState: SellerAuthState = {
  otpSent: false,
  error: null,
  loading: false,
  jwt: null,
  sellerCreated: "",
};

const API_URL = "/sellers";

// Define async thunks for sending and verifying OTP
export const sendLoginOtp = createAsyncThunk<any, any>(
  "otp/sendLoginOtp",
  async (email, { rejectWithValue }) => {
    try {
      const { data } = await api.post("/sellers/sent/login-top", { email });
      console.log("otp sent - ", email, data);
      return { email };
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to send OTP",
      );
    }
  },
);

export const verifyLoginOtp = createAsyncThunk<any, any>(
  "otp/verifyLoginOtp",
  async (data, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/verify/login-otp", data);
      console.log("login seller success - ", response.data);
      localStorage.setItem("jwt", response.data.jwt);
      data.navigate("/seller");
      return response.data;
    } catch (error: any) {
      console.log("error", error.response?.data);
      return rejectWithValue(
        error.response?.data?.message || "Failed to verify OTP",
      );
    }
  },
);

export const createSeller = createAsyncThunk<any, any>(
  "sellers/createSeller",
  async (seller, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers", seller);
      console.log("create seller", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error", error);
      return rejectWithValue(error);
    }
  },
);

// Create the slice
const sellerSlice = createSlice({
  name: "sellerAuth",
  initialState,
  reducers: {
    resetSellerAuthState: (state) => {
      state.otpSent = false;
      state.error = null;
      state.loading = false;
      state.jwt = null;
    },
  },
  extraReducers: (builder) => {
    // Handle sendLoginOtp actions
    builder
      .addCase(sendLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendLoginOtp.fulfilled, (state) => {
        state.loading = false;
        state.otpSent = true;
        state.error = null;
      })
      .addCase(sendLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Handle verifyLoginOtp actions
    builder
      .addCase(verifyLoginOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyLoginOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.jwt = action.payload.jwt;
        state.error = null;
      })
      .addCase(verifyLoginOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create new seller
      .addCase(createSeller.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createSeller.fulfilled, (state) => {
        // state.sellers.push(action.payload);
        state.sellerCreated = "verification email sent to you";
        state.loading = false;
      })
      .addCase(createSeller.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to create seller";
      });
  },
});

// Export actions and reducer
export const { resetSellerAuthState } = sellerSlice.actions;
export default sellerSlice.reducer;
