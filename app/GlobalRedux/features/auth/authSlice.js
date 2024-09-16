// slices/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

// Function to safely get an item from localStorage
const getLocalStorageItem = (key) => {
  if (typeof window !== "undefined") {
    return JSON.parse(localStorage.getItem(key));
  }
  return null;
};

const initialState = {
  loginInfo: getLocalStorageItem("loginInfo") || null,
  user: getLocalStorageItem("user") || null,
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
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    const data = await authService.login(user);
    // window.localStorage.setItem("loginInfo", JSON.stringify(data));
    // if (typeof window !== "undefined") {
      
    // }
    return data;
  } catch (error) {
    const message =
      error.response?.data?.message || response.error || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Get User Info
export const getMe = createAsyncThunk("auth/getMe", async (token, thunkAPI) => {
  try {
    return await authService.getMe(token);
  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    return thunkAPI.rejectWithValue(message);
  }
});

// Update User Info
export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async ({ data, token }, thunkAPI) => {
    try {
      return await authService.updateUserProfile(data, token);
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || error.toString();
      return thunkAPI.rejectWithValue(message);
    }
  }
);

// Login user
export const updateuserprofilecheck = createAsyncThunk("auth/userprofilecheck", async (user, thunkAPI) => {
  
  try {
    console.log("NOOOOB")
    
    let gg = JSON.parse(JSON.stringify(user.gg));;
    console.log("LOGIN DATA", user)
    console.log(gg.user.firstName)
    console.log(user.zz.firstName)
    gg.user.firstName = user.zz.firstName
    gg.user.lastName = user.zz.lastName;
     
    gg.user.image = user.zz.image;
    gg.user.email = user.zz.email;
    console.log("NOOOOB1");
  
    return gg;

  } catch (error) {
    const message =
      error.response?.data?.message || error.message || error.toString();
    console.log(error)
    return thunkAPI.rejectWithValue(message);
  }
});


// Logout
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
      .addCase(updateuserprofilecheck.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.loginInfo = action.payload;
        state.message = "";
      })
      .addCase(getMe.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getMe.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(getMe.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.message = action.payload;
      })
      .addCase(updateUserProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateUserProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload; // Update user profile in the state
      })
      .addCase(updateUserProfile.rejected, (state, action) => {
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

export const { reset, setOAuthLoginInfo } = authSlice.actions;
export default authSlice.reducer;
