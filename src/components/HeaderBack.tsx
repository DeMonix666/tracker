import { useNavigation } from '@react-navigation/native';
import { useHeaderContext } from 'context/HeaderContext';
import * as React from 'react';
import { Text, TextStyle, StyleProp, TouchableOpacity } from 'react-native';
import { colors, Icon } from 'react-native-elements';

export interface HeaderBackProps {
}

export const HeaderBack: React.FC<HeaderBackProps> = ({ }) => {
  const navigation: any = useNavigation();

  if (!navigation.canGoBack()) return null;

  return (
    <TouchableOpacity onPress={() => navigation.goBack()}><Icon name='chevron-left' color={colors.white} /></TouchableOpacity>
  );
};
