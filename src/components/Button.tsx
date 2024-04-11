import { colors } from "core";
import React, { ReactNode } from "react";
import { StyleProp, ViewStyle } from "react-native";
import { Button as ElementButton, ButtonProps, MD2Colors } from "react-native-paper";

interface Props extends ButtonProps {
  style?: StyleProp<ViewStyle>;
}

export const Button = React.forwardRef<any, Props>(({
  children,
  ...rest
}, ref) => {
  return (
    <ElementButton
      mode="contained"
      textColor={colors.white}
      style={[{ marginBottom: 10 }, rest.style]}
      {...rest}
    >
      {children}
    </ElementButton>
  );
});
