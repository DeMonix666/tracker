import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { post } from 'helpers';

export const generateCookie = createAsyncThunk(
  'app/generateCookie',
  async (token: any, { dispatch }: any) => {
    const { data, headers } = await post({
      url: '/user/generate-cookie',
      params: {
        token
      }
    });

    console.log('generateCookie', data);

    if (data.statusCode === 200) {
      return {
        cookie: data.cookie
      }
    }

    return null;
  },
);

const initialState: any = {
  authenticated: false,
  deviceId: null,
  token: null,
  cookie: null,
  developerScreen: false,
};

const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    appReset: () => initialState,
    setAppAuthenticated: {
      reducer: (state, action: any) => {
        return { ...state, ...action.payload };
      },
      prepare: params => ({ payload: params }),
    },
    setToken: {
      reducer: (state, action: any) => {
        return { ...state, token: action.payload };
      },
      prepare: token => ({ payload: token }),
    },
    setCookie: {
      reducer: (state, action: any) => {
        return { ...state, cookie: action.payload };
      },
      prepare: cookie => ({ payload: cookie }),
    },
    setDeveloperScreen: {
      reducer: (state, action: any) => {
        return { ...state, developerScreen: action.payload };
      },
      prepare: value => ({ payload: value }),
    },
  },
  extraReducers: (builder) => {
    builder.addCase(generateCookie.fulfilled, (state: any, action: any) => {
      if (action.payload) {
        return { ...initialState, ...action.payload };
      }
    });
  },
});

export const { appReset, setAppAuthenticated, setToken, setDeveloperScreen } = AppSlice.actions;

export default AppSlice.reducer;
