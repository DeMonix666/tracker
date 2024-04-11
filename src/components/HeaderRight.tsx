import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { useHeaderContext } from 'context/HeaderContext';
import { colors } from 'core';
import * as React from 'react';
import { Text, TextStyle, StyleProp, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import { Typography } from './Typography';

export interface HeaderRightProps {
}

export const HeaderRight: React.FC<HeaderRightProps> = ({ }) => {
  const navigation: any = useNavigation();
  const { screenName } = useHeaderContext();

  if (screenName === 'Device') {
    return <TouchableOpacity onPress={() => {
      console.log('navigation.getParent()', navigation.getParent())
      // navigation.getParent().openDrawer();
      // navigation.navigate('Device').toggleDrawer();
      navigation.toggleDrawer();
    }}><Icon name='more-vertical' type='feather' color={colors.white} /></TouchableOpacity>
  } else if (screenName === 'Devices') {
    return (
      <TouchableOpacity
        onPress={() => {
          // navigation.push("DeviceStack", { screen: "DeviceAdd" })
          navigation.push("DeviceAdd")
        }}
        style={{ marginRight: 15 }}
      >
        <Typography
          text="Add"
          color={colors.white}
          fontSize={14}
          fontWeight="700"
        />
      </TouchableOpacity>);
  }

  return null;
};
