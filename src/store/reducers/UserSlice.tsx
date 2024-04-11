import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { auth, database } from 'core';
import { post } from 'helpers';

export const loadUser = createAsyncThunk(
  'user/loadUser',
  async ({ }: any, { getState }: any) => {
    try {
      const uid = auth.currentUser?.uid;

      if (uid) {
        const snap = await database
          .ref(`/authentication/user/${uid}`)
          .once('value');

        if (snap.exists()) {
          const user = snap.val();

          return user;
        }
        return null;
      }
      return null;

    } catch (error) {
      console.log(error);
    }
  },
);

export const updateCoords = createAsyncThunk(
  'user/updateCoords',
  async (coords: any, { getState }: any) => {
    try {
      const uid = auth.currentUser?.uid;

      if (uid) {
        database.ref(`/authentication/user/${uid}`).update({
          coords
        });

        return coords;
      }
      return null;

    } catch (error) {
      console.log(error);
    }
  },
);


export const addDevice = createAsyncThunk(
  'user/addDevice',
  async (form: any, { }: any) => {
    try {
      const token = await auth.currentUser?.getIdToken();

      const { data, } = await post({
        url: '/user/add-device',
        params: { ...form, type: 1 },
        token,
      });

      return data;
    } catch (error) {
      console.log(error);
    }
  },
);

const initialState: any = null;

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userReset: () => initialState,
    setUser: {
      reducer: (state, action: any) => {
        return { ...state, ...action.payload };
      },
      prepare: params => ({ payload: params }),
    },
  },
  extraReducers: (builder: any) => {
    builder.addCase(loadUser.fulfilled, (state: any, action: any) => {
      if (action.payload) {
        return action.payload;
      }
    });

    builder.addCase(updateCoords.fulfilled, (state: any, action: any) => {
      if (action.payload) {
        return { ...state, coords: action.payload };
      }
    });
  },
});

export const { userReset, setUser } = UserSlice.actions;

export default UserSlice.reducer;
