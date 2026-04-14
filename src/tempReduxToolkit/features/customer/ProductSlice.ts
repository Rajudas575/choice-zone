import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "/products";

interface Product {
  _id: string;
  title: string;
  description: string;
  mrpPrice: number;
  sellingPrice: number;
  discountPercent: number;
  quantity: number;
  color: string;
  images: string[];
  size: string;
}

interface ProductState {
  product: Product | null;
  products: Product[];
  loading: boolean;
  error: string | null;
  searchProduct: Product[];
  totalElements: number;
  totalPages: number;
}

const initialState: ProductState = {
  product: null,
  products: [],
  loading: false,
  error: "",
  searchProduct: [],
  totalElements: 0,
  totalPages: 0,
};

export const fetchProductById = createAsyncThunk<any, any>(
  "/products/fetchProductById",

  async (productId, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${productId}`);
      // console.log("Find product By Id", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

export const searchProduct = createAsyncThunk<any, any>(
  "/products/searchProduct",

  async (query, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/search`, {
        params: {
          query,
        },
      });
      // console.log("Search product", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

export const getAllProducts = createAsyncThunk<any, any>(
  "/products/getAllProducts",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL, {
        params: {
          ...params,
          pageNumber: params.pageNumber || 0,
        },
      });
      // console.log("Get all products", response.data);
      return response.data;
    } catch (error) {
      console.log("Error", error);
      return rejectWithValue(error);
    }
  },
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload.content;
        state.totalElements = action.payload.totalElements;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(getAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })
      .addCase(fetchProductById.pending, (state, action) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.product = action.payload;
      })
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      })

      .addCase(searchProduct.pending, (state, action) => {
        state.loading = false;
        state.error = "";
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        state.loading = false;
        state.searchProduct = action.payload;
      })
      .addCase(searchProduct.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || null;
      });
  },
});

export default productSlice.reducer;
