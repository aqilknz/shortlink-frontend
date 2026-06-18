import { createAsyncThunk,createSlice } from "@reduxjs/toolkit";
import { loginAPI,registerAPI,logoutAPI } from "../../services/authServices";

export const registerSlice = createAsyncThunk(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await registerAPI(payload);
      return data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Registration failed"
      );
    }
  }
);

export const loginSlice = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const data = await loginAPI(payload);
      return data.results; 
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Login failed. Please check your credentials."
      );
    }
  }
);

export const logoutSlice = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await logoutAPI();
      dispatch(clearAuthForce());
      return true;
    } catch (error) {
      dispatch(clearAuthForce());
      return rejectWithValue(
        error.response?.data?.message || "Logout failed"
      );
    }
  }
);

// Initial State yang bersih
const initialState = {
  token: null,
  isAuthenticated: false,
  currentUser: null,
  isLoading: false,
  error: null,
};

// Slice
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearAuthForce: (state) => {
      state.token = null;
      state.isAuthenticated = false;
      state.currentUser = null;
      state.error = null;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // untuk register
      .addCase(registerSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerSlice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(registerSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      
      // untuk login
      .addCase(loginSlice.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginSlice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = true;
        state.token = action.payload.token;
        state.currentUser = action.payload.user;
      })
      .addCase(loginSlice.rejected, (state, action) => {
        state.isLoading = false;
        state.isAuthenticated = false;
        state.error = action.payload;
      })

      // untuk logout
      .addCase(logoutSlice.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutSlice.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(logoutSlice.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { clearAuthForce, clearError } = authSlice.actions;
export default authSlice.reducer;