import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";

const API_URL = "/api/users";

export const fetchUserProfile = createAsyncThunk<any, any>(
  "/users/fetchUserProfile",
  async (jwt, { rejectWithValue }) => {
    try {
        // console.log("JWTTTT--", jwt);
      const response = await api.get(`${API_URL}/profile`, {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      });
      console.log("user profile", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

// const initialState = {
//   user: null,
//   loading: false,
//   error: null,
// };

interface UserState {
  user: any;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    resetUserState: (state) => {
      state.user = null;
      state.loading = false;
      state.error = "";
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetchUserProfile.pending, (state, action) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(fetchUserProfile.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });

    builder.addCase(fetchUserProfile.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || null;
    });
  },
});

export const { resetUserState } = userSlice.actions;

export default userSlice.reducer;
