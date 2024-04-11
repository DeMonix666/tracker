import React, { useEffect, useRef, useState } from 'react';
import { StatusBar, useColorScheme, LogBox } from 'react-native';
import {
  NavigationContainer,
  DefaultTheme as NavigationDefaultTheme,
  DarkTheme as NavigationDarkTheme,
  useNavigationContainerRef,
  createNavigationContainerRef,
} from '@react-navigation/native';
//import {Provider as PaperProvider} from 'react-native-paper';
import {
  DefaultTheme as PaperDefaultTheme,
  MD3DarkTheme as PaperDarkTheme,
} from 'react-native-paper';
// import './ignoreWarnings';
import MainStack from './src/navigation';
import { AppProvider } from './src/context';
import { ErrorHandler, Messaging } from './src/components';
import { useAppDispatch } from 'store';
import { loadRemoteConfig } from 'store/reducers/RemoteConfigSlice';
import { enableLatestRenderer } from 'react-native-maps';
import { HeaderProvider } from 'context/HeaderContext';
import Navigators from 'navigation/Navigators';

// const navigationRef = createNavigationContainerRef();
let initialRoute: any = null;

const App = () => {
  LogBox.ignoreAllLogs();
  const dispatch: any = useAppDispatch();
  const navigationRef: any = useNavigationContainerRef();
  const routeNameRef = useRef();
  const [screenName, setScreenName] = useState('Dashboard');

  enableLatestRenderer();

  useEffect(() => {
    dispatch(loadRemoteConfig({}));
  }, []);

  return (
    <AppProvider>
      {/* <Messaging /> */}
      <ErrorHandler>
        <NavigationContainer
          ref={navigationRef}
          onReady={() => {
            routeNameRef.current = navigationRef.current.getCurrentRoute()?.name;
            console.log('routeNameRef.current', routeNameRef.current);
          }}
          onStateChange={async () => {
            const previousRouteName = routeNameRef.current;
            const currentRouteName = navigationRef.current.getCurrentRoute()?.name;

            if (previousRouteName !== currentRouteName) {
              // add tracker here
            }

            setScreenName(currentRouteName);
            routeNameRef.current = currentRouteName;
          }}
        >
          <HeaderProvider screenName={screenName}>
            <StatusBar barStyle="light-content" />
            <Navigators />
          </HeaderProvider>
        </NavigationContainer>
      </ErrorHandler>
    </AppProvider>
  );
};
export default App;
