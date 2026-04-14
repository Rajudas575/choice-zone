import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  orders: [],
  loading: false,
  error: "",
};

// Thunks for async actions
export const fetchSellerOrders = createAsyncThunk<any, any>(
  "sellerOrders/fetchSellerOrders",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/seller/orders", {
        headers: { Authorization: `Bearer ${jwt}` },
      });

      console.log("fetch seller orders", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error", error.response);
      return rejectWithValue(error.response.data);
    }
  },
);


export const updateOrderStatus = createAsyncThunk<any, any>(
  "sellerOrders/updateOrderStatus",
  async ({ jwt, orderId, orderStatus }, { rejectWithValue }) => {
    
    try {
      const response = await api.patch(
        `/api/seller/orders/${orderId}/status/${orderStatus}`,
        {},
        {
          headers: { Authorization: `Bearer ${"jwt"}` },
        },
      );

      console.log("order status updated", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error updating order status ---- ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

const sellerOrderSlice = createSlice({
  name: "sellerOrders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerOrders.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchSellerOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchSellerOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex(
          (order: any) => order._id === action.payload._id,
        );
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrderStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerOrderSlice.reducer;
