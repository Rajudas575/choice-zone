import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "/api/sellers/products";

export const fetchSellerProducts = createAsyncThunk<any, any>(
  "sellerProduct/fetchSellerProducts",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("seller products ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue(error.response.data);
    }
  },
);

export const createProduct = createAsyncThunk<any, any>(
  "sellerProduct/createProduct",
  async ({ request, jwt }, { rejectWithValue }) => {
    try {
      console.log("JWT--",jwt)
      const response = await api.post(API_URL, request, {
        headers: { Authorization: `Bearer ${jwt}` },
      });
      console.log("product created ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response.data);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateProduct = createAsyncThunk<any, any>(
  "sellerProduct/updateProduct",
  async ({ productId, product }, { rejectWithValue }) => {
    try {
      const response = await api.put(`${API_URL}/${productId}`, product, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
      console.log("update product ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("update product error ", error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const deleteProduct = createAsyncThunk<void, number>(
  "sellerProduct/deleteProduct",
  async (productId, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${productId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("jwt")}` },
      });
    } catch (error: any) {
      return rejectWithValue(error.response.data);
    }
  },
);

// interface SellerProductState {
//     products: Product[];
//     loading: boolean;
//     error: string | null;
//     productCreated:boolean;
// }

const initialState = {
  products: [],
  loading: false,
  error: "",
  productCreated: false,
};

const sellerProductSlice = createSlice({
  name: "sellerProduct",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.productCreated = false;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.products = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch products";
      })
      //create product
      .addCase(createProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
        state.productCreated = false;
      })
      .addCase(createProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
        state.loading = false;
        state.productCreated = true;
      })
      .addCase(createProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to create product";
        state.productCreated = false;
      })
      //Update product
      .addCase(updateProduct.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.error = "";
        const index = state.products.findIndex(
          (product: any) => product._id === action.payload._id,
        );
        state.products[index] = action.payload;
      })
      .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to update product";
      });
    //Delete product
    // .addCase(deleteProduct.pending, (state) => {
    //     state.loading = true;
    //     state.error = "";
    // })
    // .addCase(deleteProduct.fulfilled, (state, action) => {
    //     state.products = state.products.filter(product => product._id !== action.meta.arg);
    //     state.loading = false;
    // })
    // .addCase(deleteProduct.rejected, (state, action) => {
    //     state.loading = false;
    //     state.error = action.error.message || 'Failed to delete product';
    // });
  },
});

export default sellerProductSlice.reducer;
