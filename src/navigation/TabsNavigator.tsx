import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Dashboard from 'screens/Dashboard';
import Devices from 'screens/Devices/Devices';
import More from 'screens/More';
import Messages from 'screens/Messages/Messages';
import { TabBar, } from 'components';

const Tab = createBottomTabNavigator();

const TabsNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={(props: any) => <TabBar {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName="Dashboard"
    >
      <Tab.Screen name="Dashboard" component={Dashboard} options={{
        title: 'Home'
      }} />
      <Tab.Screen name="Devices" component={Devices} />
      <Tab.Screen name="Messages" component={Messages} />
      <Tab.Screen name="More" component={More} />
    </Tab.Navigator>
  );
};

export default TabsNavigator;
