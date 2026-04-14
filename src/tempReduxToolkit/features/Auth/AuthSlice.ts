import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../../config/api";
import { resetUserState } from "../customer/userSlice";
import { resetSellerAuthState } from "../seller/sellerAuthentication";

const API_URL = "/auth";

const initialState = {
  jwt: null,
  roll: null,
  loading: false,
  error: null,
  sentOtp: false,
};

export const sendLoginSignupOtp = createAsyncThunk<any, { email: string }>(
  "/auth/sendLoginSignupOtp",
  async ({ email }, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/sent/login-signup-otp`, {
        email,
      });
      console.log("response", response.data);
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error);
    }
  },
);

export const signup = createAsyncThunk<any, any>(
  "/auth/signup",
  async ({ navigate, ...signupRequest }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", signupRequest);

      console.log("response", response.data);

      localStorage.setItem("jwt", response.data.jwt);

      navigate("/");

      return response.data;
    } catch (error: any) {
      console.log("Error-", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);

export const signin = createAsyncThunk<any, any>(
  "/auth/signin",
  async (signinRequest, { rejectWithValue }) => {
    try {
      const response = await api.post(`${API_URL}/signin`, signinRequest);
      localStorage.setItem("jwt", response.data.jwt);

      if (response.data.role == "ROLE_ADMIN") {
        signinRequest.navigate("/admin");
      } else {
        signinRequest.navigate("/");
      }
      // console.log("Response-", response.data);
      return response.data;
    } catch (error: any) {
      console.log("error ", error.response);
      return rejectWithValue("Signin failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.jwt = null;
      state.roll;
      state.sentOtp;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(sendLoginSignupOtp.fulfilled, (state, action) => {
      state.sentOtp = true;
    });

    builder.addCase(signup.fulfilled, (state, action) => {
      state.jwt = action.payload.jwt;
      state.roll = action.payload.role;
    });
    builder.addCase(signin.fulfilled, (state, action) => {
      state.jwt = action.payload.jwt;
      state.roll = action.payload.role;
    });
  },
});

export const { logout } = authSlice.actions;

export const performLogout = () => async (dispatch: any) => {
  dispatch(logout());
  dispatch(resetUserState());
  dispatch(resetSellerAuthState());
  localStorage.removeItem("jwt");
};

export default authSlice.reducer;
