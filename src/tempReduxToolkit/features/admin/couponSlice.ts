import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "/api/coupons";

// Async thunks

export const createCoupon = createAsyncThunk<any, any>(
  "coupon/createCoupon",
  async ({ coupon, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/admin/create`, coupon, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      // console.log(" created coupon ", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to create coupon");
    }
  },
);

export const deleteCoupon = createAsyncThunk<any, any>(
  "coupon/deleteCoupon",
  async ({ id, jwt }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/admin/delete/${id}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to delete coupon");
    }
  },
);

export const fetchAllCoupons = createAsyncThunk<any, any>(
  "coupon/fetchAllCoupons",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/admin/all`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      // console.log("all coupons ", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.response?.data || "Failed to fetch coupons");
    }
  },
);

// Initial state
const initialState = {
  coupons: [],
  loading: false,
  error: "",
};

// Slice
const couponSlice = createSlice({
  name: "coupon",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createCoupon.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons.push(action.payload);
      })
      .addCase(createCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to create coupon";
      })
      .addCase(deleteCoupon.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteCoupon.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = state.coupons.filter(
          (coupon: any) => coupon._id !== action.meta.arg.id,
        );
      })
      .addCase(deleteCoupon.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to delete coupon";
      })
      .addCase(fetchAllCoupons.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllCoupons.fulfilled, (state, action) => {
        state.loading = false;
        state.coupons = action.payload;
      })
      .addCase(fetchAllCoupons.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Failed to fetch coupons";
      });
  },
});

export default couponSlice.reducer;
