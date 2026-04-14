import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  deals: [],
  loading: false,
  error: "",
};

export const createDeal = createAsyncThunk<any, any>(
  "deals/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
      const response = await api.post("/admin/deals", deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("created deal", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create deal",
      );
    }
  },
);

export const getAllDeals = createAsyncThunk(
  "deals/getAllDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/admin/deals", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("get all deal", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create deal",
      );
    }
  },
);

export const deleteDeal = createAsyncThunk<any, any>(
  "deals/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.delete(`/admin/deals/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("error ", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete deal",
      );
    }
  },
);

export const updateDeal = createAsyncThunk<any, any>(
  "deals/updateDeal",
  async ({ id, deal }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/admin/deals/${id}`, deal, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      });
      console.log("updated deal", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue(
        error.response?.data?.message || "Failed to update deal",
      );
    }
  },
);

// Create the slice
const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllDeals.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(getAllDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(getAllDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.push(action.payload);
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(deleteDeal.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = state.deals.filter(
          (deal: any) => deal._id !== action.meta.arg,
        );
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.deals.findIndex(
          (deal: any) => deal._id === action.payload._id,
        );

        state.deals[index] = action.payload;
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default dealSlice.reducer;
