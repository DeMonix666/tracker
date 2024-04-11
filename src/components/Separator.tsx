import React from 'react';
import { StyleProp, View, ViewStyle } from 'react-native';
import { colors } from 'react-native-elements';

interface Props {
  style?: StyleProp<ViewStyle>;
}

export const Separator: React.FC<Props> = ({ style }) => {
  return (
    <View style={style}>
      <View
        style={{
          height: 0.5,
          backgroundColor: colors.grey2,
        }}
      />
    </View>
  );
};
