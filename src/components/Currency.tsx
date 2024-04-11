import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { colors } from 'react-native-elements';
import { NumericFormat } from 'react-number-format';

interface Props {
  style?: StyleProp<ViewStyle>;
  value: number
}

export const Currency: React.FC<Props> = ({ style, value }) => {
  return (
    <NumericFormat value={value} decimalSeparator="," decimalScale={2} fixedDecimalScale />
  );
};
