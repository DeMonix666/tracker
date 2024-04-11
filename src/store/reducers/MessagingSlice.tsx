import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { messaging, messagingStatus } from 'core';
import DeviceInfo from 'react-native-device-info';

export const updateMessagingToken = createAsyncThunk(
  'messaging/updateMessagingToken',
  async ({ }: any, { getState }: any) => {
    try {
      const authStatus = await messaging.requestPermission();
      const enabled =
        authStatus === messagingStatus.AUTHORIZED ||
        authStatus === messagingStatus.PROVISIONAL;

      if (!enabled) {
        throw new Error('No permission');
      }

      const deviceToken = await messaging.getToken();
      const deviceId = DeviceInfo.getDeviceId();
      const deviceModel = DeviceInfo.getModel();
      const bundleId = DeviceInfo.getBundleId();

      return {
        deviceId,
        deviceToken,
        deviceModel,
        bundleId,
      };
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState = {
  deviceId: null,
  deviceToken: '',
  deviceModel: '',
};

const MessagingSlice = createSlice({
  name: 'messaging',
  initialState,
  reducers: {
    messagingReset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(
      updateMessagingToken.fulfilled,
      (state: any, action: any) => {
        if (action.payload) {
          return { ...state, ...action.payload };
        }
      },
    );
  },
});

export const { messagingReset } = MessagingSlice.actions;

export default MessagingSlice.reducer;
