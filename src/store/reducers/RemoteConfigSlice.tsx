import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import remoteConfig from '@react-native-firebase/remote-config';

export const loadRemoteConfig = createAsyncThunk(
  'remoteConfig/loadRemoteConfig',
  async ({ }: any, { }: any) => {
    try {
      const cacheTime = __DEV__ ? 1 : 180;

      const rmConfig = remoteConfig();

      await rmConfig.fetch(cacheTime);
      await rmConfig.activate();

      const configs = rmConfig.getAll();

      const entries = Object.entries(configs).map(([key, configValue]) => {
        let value;

        try {
          value = JSON.parse(configValue.asString());
        } catch (err) {
          value = configValue.asString();
        }

        return [key, value];
      });

      const data: any = Object.entries(entries);
      let configResult: any = {};

      (data || []).forEach((item: any) => {
        const [key, value] = item[1];
        configResult[key] = value;
      });

      return configResult;
    } catch (error) {
      console.log('loadRemoteConfig error', error);
      return null;
    }
  },
);

const initialState: any = {
  loaded: false,
};

const RemotConfigSlice = createSlice({
  name: 'remoteConfig',
  initialState,
  reducers: {
    remoteConfigReset: () => initialState,
  },
  extraReducers: builder => {
    builder.addCase(loadRemoteConfig.fulfilled, (state: any, action: any) => {
      if (action.payload) {
        return { ...initialState, ...action.payload, loaded: true };
      }
    });
  },
});

export const { remoteConfigReset } = RemotConfigSlice.actions;

export default RemotConfigSlice.reducer;
