import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Function to safely get an item from localStorage
const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

// Get user from localStorage only if on client-side
const loginInfo = getLocalStorageItem("loginInfo");
const user = getLocalStorageItem("user");
const planSelected =
  typeof window !== "undefined" &&
  localStorage.getItem("planSelected") === "false";

const initialState = {
  loginInfo: loginInfo ? loginInfo : null,
  user: user ? user : null,
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: "",
};

// Register user
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return await authService.register(user);
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return await authService.login(user);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get User Info
export const getMe = createAsyncThunk("auth/getMe", async (token, thunkAPI) => {
  try {
    return await authService.getMe(token);
  } catch (error) {
    const message =
      (error.response && error.response.data && error.response.data.message) ||
      error.message ||
      error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.loginInfo = null;
      state.user = null;
      state.message = "";

      // Clear localStorage only if on the client
      if (typeof window !== "undefined") {
        localStorage.clear();
      }
    },
    setOAuthLoginInfo: (state, action) => {
      state.loginInfo = action.payload;
      state.isSuccess = true;
      state.isLoading = false;
      state.isError = false;
    },
    setTemprature: (state, action) => {
      state.temprature = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loginInfo = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.loginInfo = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loginInfo = action.payload;
        state.message = "";
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
        state.loginInfo = null;
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
        state.planSelected = action.payload.data.planSelected;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loginInfo = null;
        state.user = null;
      });
  },
});

export const { reset, setOAuthLoginInfo, setTemprature } = authSlice.actions;
export default authSlice.reducer;
