import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "/home";

export const updateHomeCategory = createAsyncThunk<any, any>(
  "homeCategory/updateHomeCategory",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/home-category/${id}`, data);
      // console.log("category updated ", response);
      return response.data;
    } catch (error: any) {
      console.log("errror ", error);
      if (error.response && error.response.data) {
        return rejectWithValue(error.response.data); // Return error response data if available
      } else {
        return rejectWithValue(
          "An error occurred while updating the category.",
        );
      }
    }
  },
);

export const fetchHomeCategories = createAsyncThunk<any, any>(
  "homeCategory/fetchHomeCategories",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/home-category`);
      // console.log("fetch home categories ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch categories",
      );
    }
  },
);

// interface HomeCategoryState {
//   categories: HomeCategory[];
//   loading: boolean;
//   error: string | null;
//   categoryUpdated:boolean;
// }

const initialState = {
  categories: [],
  loading: false,
  error: "",
  //   categoryUpdated:false,
};

// Create the slice
const homeCategorySlice = createSlice({
  name: "homeCategory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Handle the pending state for updateHomeCategory
    builder.addCase(updateHomeCategory.pending, (state) => {
      state.loading = true;
      state.error = "";
      //   state.categoryUpdated = false;
    });

    // Handle the fulfilled state for updateHomeCategory
    builder.addCase(updateHomeCategory.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.categories.findIndex(
        (category: any) => category._id === action.payload._id,
      );
      state.categories[index] = action.payload;
    });

    // Handle the rejected state for updateHomeCategory
    builder.addCase(updateHomeCategory.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });

    // fetch home category
    builder
      .addCase(fetchHomeCategories.pending, (state) => {
        state.loading = true;
        state.error = "";
        //   state.categoryUpdated = false;  // Reset categoryUpdated flag to false
      })
      .addCase(fetchHomeCategories.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(fetchHomeCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default homeCategorySlice.reducer;
