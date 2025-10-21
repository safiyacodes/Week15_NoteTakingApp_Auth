import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../BaseUrl";

// Configure axios to include credentials
axios.defaults.withCredentials = true;

// TODO: Implement checkAuthStatus thunk
export const checkAuthStatus = createAsyncThunk(
  "auth/checkStatus",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/auth/check`);
      return response.data.user;
    } catch (error) {
      
      return rejectWithValue(error.response?.data?.error || error.message);

    }
  }
    // TODO: Implement authentication status check
    // 1. Make a GET request to /auth/check
    // 2. Return the response data
    // 3. Handle errors appropriately
  
);

// TODO: Implement login thunk
export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/login`, credentials);
      return response.data.user;
    } catch (error) {
      if (error.response?.data?.error) {
      return rejectWithValue(error.response?.data?.error || error.message);

         }
  }
    // TODO: Implement login functionality
    // 1. Make a POST request to /auth/login with credentials
    // 2. Return the response data
    // 3. Handle errors appropriately
  
});

// TODO: Implement register thunk
export const registerUser = createAsyncThunk(
  "auth/register",
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/register`, 
        userData);
      return response.data.user;
    } catch (error) {
      if (error.response?.data?.error) {
        throw new Error(error.response.data.error);
      }
      throw error;
    }
    // TODO: Implement registration functionality
    // 1. Make a POST request to /auth/register with userData
    // 2. Return the response data
    // 3. Handle errors appropriately
  }
);

// TODO: Implement logout thunk
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async () => {
  await axios.post(`${BASE_URL}/auth/logout`)
    // TODO: Implement logout functionality
    // 1. Make a POST request to /auth/logout
    // 2. Handle errors appropriately
  } 
);

const initialState = {
  user: null,
  isAuthenticated: false,
  loading: true,
  error: null,
  status: "idle",

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
  }
},


  extraReducers: (builder) => {
    builder
    // TODO: Add cases for checkAuthStatus
    .addCase(checkAuthStatus.pending, (state) => {
        state.status = "loading";
      })
      .addCase(checkAuthStatus.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuthStatus.rejected, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
      })
    

    // TODO: Add cases for login
    .addCase(loginUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })

    // TODO: Add cases for register
    .addCase(registerUser.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.isAuthenticated = true;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
    // TODO: Add cases for logout
    .addCase(logoutUser.fulfilled, (state) => {
        state.status = "idle";
        state.isAuthenticated = false;
        state.user = null;
        state.error = null;
    })

 }
 });
     
   
  

export const { clearError } = authSlice.actions;
export default authSlice.reducer;
