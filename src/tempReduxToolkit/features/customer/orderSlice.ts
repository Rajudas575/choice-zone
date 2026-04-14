import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  orders: [],
  loading: false,
  error: "",
  orderItem: null,
  currentOrder: null,
  paymentOrder: null,
  orderCanceled: false,
};

const API_URL = "/api/orders";

export const fetchUserOrderHistory = createAsyncThunk<any, any>(
  "/orders/fetchUserOrderHistory",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // console.log("fetch user order history", response.data);
      return response.data;
    } catch (error: any) {
      console.log("Error", error);
      console.log("Full error data:", error.response?.data);
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

export const fetchOrderById = createAsyncThunk<any, any>(
  "/orders/fetchOrderById",
  async ({ jwt, orderId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // console.log("fetch order id", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

export const createOrder = createAsyncThunk<any, any>(
  "/orders/createOrder",
  async ({ address, jwt, paymentGateWay }, { rejectWithValue }) => {
    try {
      const response = await api.post(
        `${API_URL}`,
        {
          shippingAddress: address,
        },
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
          params: { paymentMethod: paymentGateWay },
        },
      );
      // console.log("create order ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

export const fetchOrderItemById = createAsyncThunk<any, any>(
  "/orders/fetchOrderItemById",
  async ({ jwt, orderItemId }, { rejectWithValue }) => {
    console.log("jwt--", jwt);
    try {
      const response = await api.get(`${API_URL}/item/${orderItemId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // console.log("fetch order item by id", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

//--Payment success handler--//

export const paymentSuccess = createAsyncThunk<any, any>(
  "/orders/paymentSuccess",
  async ({ jwt, paymentId, paymentLinkId }, { rejectWithValue }) => {
    try {
      const response = await api.get(`api/payment/${paymentId}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
        params: { paymentLinkId },
      });
      console.log("payment success", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

//--Cancel Oeder---//

export const cancelOrder = createAsyncThunk<any, any>(
  "/orders/cancelOrder",
  async (orderId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${orderId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("cancel order", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch user order history
      .addCase(fetchUserOrderHistory.pending, (state) => {
        state.loading = true;
        // state.error = "";
        // state.orderCanceled = false;
      })
      .addCase(fetchUserOrderHistory.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchUserOrderHistory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch order by ID
      .addCase(fetchOrderById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchOrderById.fulfilled, (state, action) => {
        state.currentOrder = action.payload;
        state.loading = false;
      })
      .addCase(fetchOrderById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Create a new order
      .addCase(createOrder.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.paymentOrder = action.payload;
        state.loading = false;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // Fetch Order Item by ID
      .addCase(fetchOrderItemById.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchOrderItemById.fulfilled, (state, action) => {
        state.loading = false;
        state.orderItem = action.payload;
      })
      .addCase(fetchOrderItemById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      // payment success handler
      .addCase(paymentSuccess.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(paymentSuccess.fulfilled, (state, action) => {
        state.loading = false;
        console.log("Payment successful:", action.payload);
      })
      .addCase(paymentSuccess.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //cancel order
      .addCase(cancelOrder.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.orderCanceled = false;
      })
      .addCase(cancelOrder.fulfilled, (state, action) => {
        state.loading = false;
        // state.orders = state.orders.map((order) =>
        //   order._id === action.payload._id ? action.payload : order
        // );
        // state.orderCanceled = true;
        state.currentOrder = action.payload;
      })
      .addCase(cancelOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default orderSlice.reducer;
