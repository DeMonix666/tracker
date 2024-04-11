import { colors } from 'core';
import * as React from 'react';
import { Input as ElementInput, InputProps } from 'react-native-elements';

export const Input = React.forwardRef<any, InputProps>(({
  ...rest
}, ref) => {
  return (
    <ElementInput
      labelStyle={{
        fontWeight: '500',
        fontSize: 16,
        marginBottom: 8,
      }}
      inputContainerStyle={{
        backgroundColor: colors.grey300,
        borderRadius: 8,
        borderBottomWidth: 0,
        paddingHorizontal: 10,
      }}
      style={{
        borderRadius: 8,
        color: colors.grey800,
        fontSize: 16,
      }}
      errorStyle={{ borderWidth: 0, }}
      rightIconContainerStyle={{
        padding: 0,
        margin: 0,
        height: 20,
        alignItems: 'center'
      }}
      {...rest}
    />
  );
});
