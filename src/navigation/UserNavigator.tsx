import React, { } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Tabs from './TabsNavigator';
import Profile from 'screens/Profile';
import Settings from 'screens/Settings';
import About from 'screens/About';
import Device from 'screens/Devices/Device';
import DeviceAdd from 'screens/Devices/DeviceAdd';
import Message from 'screens/Messages/Message';
import { colors, } from 'react-native-elements';
import { HeaderRight, HeaderBack, HeaderTitle } from 'components';
import { createDrawerNavigator } from '@react-navigation/drawer';
import DeviceMenu from 'screens/Devices/DeviceMenu';
import { DeviceProvider } from 'context/DeviceContext';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const UserStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerRight: () => <HeaderRight />,
        headerLeft: () => <HeaderBack />,
        headerTitle: () => <HeaderTitle />,
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}>
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="Device" component={Device} />
      <Stack.Screen name="DeviceAdd" component={DeviceAdd} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Message" component={Message} options={{
        title: 'Message'
      }} />
    </Stack.Navigator>
  );
};

const UserNavigator = ({ }) => {
  return (
    <DeviceProvider>
      <Drawer.Navigator
        initialRouteName="UserStack"
        screenOptions={{
          headerShown: true,
          headerTransparent: true,
          drawerType: 'front',
          drawerStyle: {},
          drawerPosition: 'right',
          swipeEnabled: false,
        }}
        drawerContent={props => <DeviceMenu {...props} />}>
        <Drawer.Screen
          name="UserStack"
          options={{ headerShown: false }}
          component={UserStack}
        />
      </Drawer.Navigator>
    </DeviceProvider>
  );
};

export default UserNavigator;
