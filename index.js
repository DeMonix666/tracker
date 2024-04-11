import React from 'react';
import { AppRegistry } from 'react-native';
import { configureFonts, MD2LightTheme, PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import App from './App';
import Store from './src/store';
import { fontConfig } from './src/config/fonts';
import { name as appName } from './app.json';

const theme = {
  ...MD2LightTheme,
  fonts: configureFonts({ config: { ios: fontConfig, android: fontConfig }, isV3: false }),
};

export default function Main() {
  return (
    <Provider store={Store}>
      <PaperProvider>
        <App />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
