import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

export const createHomeCategories = createAsyncThunk<any, any>(
  "home/createHomeCategories",
  async (homeCategories, { rejectWithValue }) => {
   
    try {
      const response = await api.post("/home/categories", homeCategories);
      console.log("home categories ", response.data);
      return response.data;
    } catch (error: any) {
      // Handle the error and return it to be used in rejected action
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Failed to create home categories";
      console.log("errr ", errorMessage, error);
      return rejectWithValue(errorMessage);
    }
  },
);

const HomeCategorySlice = createSlice({
  name: "homeCategories",
  initialState: {
    homeCategories: {
      grid: [],
      shopByCategories: [],
      electricCategories: [],
      deals: [],
      dealCategories: [],
    },
    loading: false,
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCategories = action.payload;
      })

      .addCase(createHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default HomeCategorySlice.reducer;
