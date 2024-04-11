import * as React from 'react';
import { Text, TextStyle, StyleProp } from 'react-native';
import { fontConfig } from 'config/fonts'
import { colors } from 'core';

export interface TypographyProps {
  text?: string | number;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
  color?: TextStyle['color'];
  textAlign?: TextStyle['textAlign'];
  lineHeight?: TextStyle['lineHeight'];
  textDecorationLine?: TextStyle['textDecorationLine'];
  fontFamily?: TextStyle['fontFamily'];
  fontWeight?: TextStyle['fontWeight'];
  fontSize?: number;
  letterSpacing?: number;
  bodyStyle?: StyleProp<TextStyle>;
  bold?: boolean;
}

export const Typography: React.FC<TypographyProps> = ({
  text,
  style,
  color = colors.grey700,
  textAlign,
  textDecorationLine,
  numberOfLines = 0,
  fontWeight,
  fontFamily = fontConfig.regular.fontFamily,
  fontSize = 16,
  letterSpacing,
  lineHeight,
  // lineHeight = size.lg,
  bodyStyle,
  bold = false,
}) => {
  return (
    <Text
      style={[
        {
          color,
          textAlign,
          lineHeight: lineHeight ?? (fontSize ?? 0) + 8,
          textDecorationLine,
          fontFamily,
          ...(fontSize && {
            fontSize,
          }),
          ...(fontWeight && {
            fontWeight,
          }),
          letterSpacing,
        },
        style,
        bodyStyle,
      ]}
      numberOfLines={numberOfLines}>
      {text}
    </Text>
  );
};
