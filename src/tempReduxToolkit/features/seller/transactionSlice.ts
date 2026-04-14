import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const initialState = {
  transactions: [],
  transaction: null,
  loading: false,
  error: "",
};

// Thunks
export const fetchTransactionsBySeller = createAsyncThunk<any, any>(
  "transactions/fetchTransactionsBySeller",
  async (jwt, { rejectWithValue }) => {
    try {
      const response = await api.get("/api/transactions/seller", {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("fetchTransactionsBySeller", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error transaction", error);
      if (error.response) {
        return rejectWithValue(error.response.data.message);
      }
      return rejectWithValue("Failed to fetch transactions");
    }
  },
);

export const fetchAllTransactions = createAsyncThunk<any,any>("transactions/fetchAllTransactions", async (_, { rejectWithValue }) => {
  try {
    const response = await api.get("/api/transactions");
    return response.data;
  } catch (error: any) {
    if (error.response) {
      return rejectWithValue(error.response.data.message);
    }
    return rejectWithValue("Failed to fetch all transactions");
  }
});


// Slice
const transactionSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactionsBySeller.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchTransactionsBySeller.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchTransactionsBySeller.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(fetchAllTransactions.pending, (state) => {
        state.loading = true;
        state.error = "";
      })
      .addCase(fetchAllTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.transactions = action.payload;
      })
      .addCase(fetchAllTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default transactionSlice.reducer;