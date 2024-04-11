import { useNavigation, useNavigationState, useRoute } from '@react-navigation/native';
import { useHeaderContext } from 'context/HeaderContext';
import { colors } from 'core';
import * as React from 'react';
import { Text, TextStyle, StyleProp, TouchableOpacity } from 'react-native';
import { Typography } from './Typography';

export interface HeaderTitleProps {
}

export const HeaderTitle: React.FC<HeaderTitleProps> = ({ }) => {
  const { screenName } = useHeaderContext();

  let title = screenName;

  if (screenName === 'DeviceAdd') title = 'Device Add';

  return <Typography text={title} color={colors.white} />;
};
