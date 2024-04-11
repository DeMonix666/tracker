import AsyncStorage from '@react-native-async-storage/async-storage';
import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {persistReducer, persistStore} from 'redux-persist';
import thunk from 'redux-thunk';
import reducers from './reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const persistedReducer = persistReducer(persistConfig, reducers);
const store: any = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export const persistor = persistStore(store);
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<AppState> = useSelector;
export default store;
