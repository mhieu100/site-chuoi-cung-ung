import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { callFetchAccount } from '../../api/api.auth';

export const fetchAccount = createAsyncThunk(
  'account/fetchAccount',
  async () => {
    try {
      const response = await callFetchAccount();
      return response;
    } catch (error) {
      console.log("'Error fetching account:', error");
    }

  }
);

const initialState = {
  isLoading: true,
  user: {
    walletAddress: '',
    email: '',
    fullname: '',
    address: '',
    phoneNumber: '',
    birthday: '',
    role: '',
  },
  activeMenu: 'home',
};

export const accountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    setActiveMenu: (state, action) => {
      state.activeMenu = action.payload;
    },
    setUserLoginInfo: (state, action) => {
      state.isLoading = false;
      state.user.walletAddress = action?.payload?.walletAddress;
      state.user.email = action.payload?.email;
      state.user.fullname = action.payload?.fullname;
      state.user.address = action.payload?.address;
      state.user.phoneNumber = action.payload?.phoneNumber;
      state.user.birthday = action.payload?.birthday;
      state.user.role = action?.payload?.role;
    },
    updateUserInfo: (state, action) => {
      // Update user info while preserving all existing user data
      // Only update fields that are provided in the payload
      state.user = {
        ...state.user,                     // Keep all existing user data
        // Only update fields if they exist in the payload
        email: action.payload?.email !== undefined ? action.payload.email : state.user.email,
        fullname: action.payload?.fullname !== undefined ? action.payload.fullname : state.user.fullname,
        address: action.payload?.address !== undefined ? action.payload.address : state.user.address,
        phoneNumber: action.payload?.phoneNumber !== undefined ? action.payload.phoneNumber : state.user.phoneNumber,
        birthday: action.payload?.birthday !== undefined ? action.payload.birthday : state.user.birthday
      };
    },
    setLogoutAction: (state) => {
      state.user = {};
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAccount.pending, (state, action) => {
      if (action.payload) {
        state.isLoading = true;
      }
    });

    builder.addCase(fetchAccount.fulfilled, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
        state.user.walletAddress = action?.payload?.walletAddress;
        state.user.email = action.payload?.email;
        state.user.fullname = action.payload?.fullname;
        state.user.address = action.payload?.address;
        state.user.phone = action.payload?.phoneNumber;
        state.user.birthday = action.payload?.birthday;
        state.user.role = action?.payload?.role;
      }
    });

    builder.addCase(fetchAccount.rejected, (state, action) => {
      if (action.payload) {
        state.isLoading = false;
      }
    });
  },
});

export const {
  setActiveMenu,
  setUserLoginInfo,
  setLogoutAction,
  updateUserInfo,
} = accountSlice.actions;

export default accountSlice.reducer;
