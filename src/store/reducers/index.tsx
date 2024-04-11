import { combineReducers } from 'redux';

import app from './AppSlice';
import user from './UserSlice';
import remoteConfig from './RemoteConfigSlice';
import messaging from './MessagingSlice';

const rootReducer: any = combineReducers({
  app,
  remoteConfig,
  messaging,
  user,
});

export default rootReducer;

export const appState = (state: any) => state.app;
export const userState = (state: any) => state.user;
export const remoteConfigState = (state: any) => state.remoteConfig;
export const messagingState = (state: any) => state.messaging;
