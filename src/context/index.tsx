import React, { createContext, useContext, useEffect, useLayoutEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { auth, database } from 'core';
import NetInfo from '@react-native-community/netinfo'
import { onlineManager, focusManager } from '@tanstack/react-query'
import { AppState, AppStateStatus } from 'react-native';

const AppContext = createContext<any>({});
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity, //1000 * 60 * 60 * 24, //5 * (60 * 1000),
      // cacheTime: 1000 * 60 * 60 * 24, // 24 hours
      // cacheTime: 10 * (60 * 1000),
    },
  },
});

export const AppProvider: React.FC<any> = ({ children }: any) => {
  Geolocation.setRNConfiguration({
    skipPermissionRequests: true,
    authorizationLevel: 'auto',
    enableBackgroundLocationUpdates: true,
    locationProvider: 'auto',
  });

  onlineManager.setEventListener((setOnline) => {
    return NetInfo.addEventListener((state) => {
      setOnline(!!state.isConnected)
    })
  });

  const success = async (position: any) => {
    console.log('watch position', position);

    const uid = auth.currentUser?.uid;

    if (uid) {
      const url = `/authentication/user/${uid}`;

      console.log('update coords', position);

      database.ref(url).update({
        coords: {
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
          ...position.coords
        }
      });
    }
  };

  const error = (error: any) => {
    console.log('error', error);
  };

  const onAppStateChange = (status: AppStateStatus) => {
    focusManager.setFocused(status === 'active')
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(success, error, {});

    const options = {
      enableHighAccuracy: true,
      distanceFilter: 1,
      timeout: 5000,
      maximumAge: 0,
    };
    const subscription = Geolocation.watchPosition(success, error, options);
    const appStateSub = AppState.addEventListener('change', onAppStateChange);

    return () => {
      // if (subscription) subscription.remove();
      appStateSub.remove();
    };
  }, []);

  return (

    <AppContext.Provider value={{ queryClient }}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
