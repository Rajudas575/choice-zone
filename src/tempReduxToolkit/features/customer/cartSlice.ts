// interface CartState {
//   cart: Cart | null;
//   loading: boolean;
//   error: string | null;
// }

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  cart: null,
  loading: false,
  error: "",
};

const API_URL = "/api/cart";

export const fetchCart = createAsyncThunk<any, any>(
  "/cart/fetchCart",

  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      // console.log("fetch cart", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

export const addItemToCart = createAsyncThunk<any, any>(
  "cart/addItemToCart",
  async ({ jwt, request }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/add`, request, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });

      // console.log("add item to cart ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

export const deleteCartItem = createAsyncThunk<any, any>(
  "cart/deleteCartItem",
  async ({ jwt, cartItemId }, { rejectWithValue }) => {
    try {
      const response = await api.delete(`${API_URL}/item/${cartItemId}`, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      // console.log("delete item", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to delete cart item",
      );
    }
  },
);

export const updateCartItem = createAsyncThunk<any, any>(
  "cart/updateCartItem",
  async ({ jwt, cartItemId, quantity }, { rejectWithValue }) => {
    try {
      const response = await api.put(
        `${API_URL}/item/${cartItemId}`,
        { quantity },
        {
          headers: { Authorization: `Bearer ${jwt}` },
        },
      );
      // console.log("update item", response.data);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(
        error.response.data.message || "Failed to update cart item",
      );
    }
  },
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cart = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //Add Item to cart
      .addCase(addItemToCart.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(addItemToCart.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.cartItems.push(action.payload);
        }
        state.loading = false;
      })
      .addCase(addItemToCart.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //update cart items
      .addCase(updateCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          const index = state.cart.cartItems.findIndex(
            (item: any) => item._id === action.payload._id,
          );
          if (index !== -1) {
            state.cart.cartItems[index] = action.payload;
          }
        }
        state.loading = false;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      //delete cart item
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        if (state.cart) {
          state.cart.cartItems = state.cart.cartItems.filter(
            (item: any) => item._id !== action.meta.arg.cartItemId,
          );
        }

        state.loading = false;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default cartSlice.reducer;
