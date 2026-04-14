// Define the initial state type

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

// Define the initial state
const initialState = {
  sellers: [],
  selectedSeller: null,
  loading: false,
  error: null,
  profile: null,
  report: null,
  profileUpdated: false,
};

// Define the base URL for the API
const API_URL = "/sellers";

// Create async thunks for API calls
export const fetchSellerProfile = createAsyncThunk<any, any>(
  "sellers/fetchSellerProfile",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetch seller profile", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Fetch sellers error message:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSellers = createAsyncThunk<any, string>(
  "sellers/fetchSellers",
  async (status: string, { rejectWithValue }) => {
    console.log("fetchSeller status", status);
    try {
      const response = await api.get(API_URL, {
        params: {
          status,
        },
      });
      console.log("fetch sellers", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Fetch sellers error message:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

export const fetchSellerReport = createAsyncThunk<any, any>(
  "sellers/fetchSellerReport",
  async (jwt: string, { rejectWithValue }) => {
    try {
      const response = await api.get(`/api${API_URL}/report`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("Fetch seller report", response.data);
      return response.data;
    } catch (error: any) {
      console.log("fetch seller report error ", error);
      return rejectWithValue(error.response.data.message);
    }
  },
);

export const fetchSellerById = createAsyncThunk<any, any>(
  "sellers/fetchSellerById",
  async (id: number, { rejectWithValue }) => {
    try {
      const response = await api.get(`${API_URL}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Fetch seller by ID error message:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

// export const updateSeller = createAsyncThunk<any, any>(
//   "sellers/updateSeller",
//   async (seller: any, { rejectWithValue }) => {
//     console.log("seller update request ", seller);
//     try {
//       const response = await api.patch(`${API_URL}`, seller, {
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`,
//         },
//       });
//       console.log("seller updated successfully", response.data);
//       return response.data;
//     } catch (error: any) {
//       console.error("Update seller error message:", error);
//       return rejectWithValue(error.message);
//     }
//   },
// );

export const updateSellerAccountStatus = createAsyncThunk<any, any>(
  "sellers/updateSellerAccountStatus",
  async (
    { id, status }: { id: number; status: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await api.patch(`/admin/seller/${id}/status/${status}`);
      console.log("update  seller status: ", response.data);
      return response.data;
    } catch (error: any) {
      console.error("Update seller error message:", error.message);
      return rejectWithValue(error.message);
    }
  },
);

// Create the slice
const sellerSlice = createSlice({
  name: "sellers",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      // fetch seller profile
      .addCase(fetchSellerProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.profileUpdated = false;
      })
      .addCase(fetchSellerProfile.fulfilled, (state, action) => {
        state.profile = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      })
      // fetch sellers
      .addCase(fetchSellers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellers.fulfilled, (state, action) => {
        state.sellers = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellers.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch sellers";
      })
      .addCase(fetchSellerById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerById.fulfilled, (state, action) => {
        state.selectedSeller = action.payload;
        state.loading = false;
      })
      .addCase(fetchSellerById.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to fetch seller";
      })

      //   .addCase(updateSeller.pending, (state) => {
      //     state.loading = true;
      //     state.error = null;
      //     state.profileUpdated = false;
      //   })
      //   .addCase(
      //     updateSeller.fulfilled,
      //     (state, action) => {
      //       const index = state.sellers.findIndex(
      //         (seller) => seller._id === action.payload._id,
      //       );
      //       if (index !== -1) {
      //         state.sellers[index] = action.payload;
      //       }
      //       state.profile = action.payload;
      //       state.loading = false;
      //       state.profileUpdated = true;
      //     },
      //   )
      //   .addCase(updateSeller.rejected, (state, action) => {
      //     state.loading = false;
      //     state.error = (action.payload as string) || "Failed to update seller";
      //   })

      // update seller status
      .addCase(updateSellerAccountStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateSellerAccountStatus.fulfilled, (state, action) => {
        const index = state.sellers.findIndex(
          (seller) => seller._id === action.payload._id,
        );
        if (index !== -1) {
          state.sellers[index] = action.payload;
        }
        state.loading = false;
      })
      .addCase(updateSellerAccountStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = (action.payload as string) || "Failed to update seller";
      })

      // seller report
      .addCase(fetchSellerReport.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSellerReport.fulfilled, (state, action) => {
        state.loading = false;
        state.report = action.payload;
      })
      .addCase(fetchSellerReport.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default sellerSlice.reducer;
