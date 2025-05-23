import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { callLogin } from '../../api/api.auth';

export const fetchAccount = createAsyncThunk(
  'account/fetchAccount',
  async (address) => {
    try {
      const response = await callLogin(address);
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
    phone: '',
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
      state.user.email = action.payload.email;
      state.user.fullname = action.payload.fullname;
      state.user.address = action.payload.address;
      state.user.phone = action.payload.phoneNumber;
      state.user.birthday = action.payload.birthday;
      state.user.role = action?.payload?.role;
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
} = accountSlice.actions;

export default accountSlice.reducer;
