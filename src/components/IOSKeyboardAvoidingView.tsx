import { useState } from 'react';
import {
  KeyboardAvoidingViewProps,
  StyleSheet,
  useWindowDimensions,
  View,
} from 'react-native';

import { KeyboardAvoidingViewCommon } from './KeyboardAvoidingViewCommon';

export const IOSKeyboardAvoidingView = (props: KeyboardAvoidingViewProps) => {
  const [screenHeight, setScreenHeight] = useState(0);
  const { height } = useWindowDimensions();

  const modalOffsetFromTop = height - screenHeight;

  return (
    <View
      style={styles.container}
      onLayout={event => {
        setScreenHeight(event.nativeEvent.layout.height);
      }}>
      {screenHeight ? (
        <KeyboardAvoidingViewCommon {...props} keyboardVerticalOffset={modalOffsetFromTop} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
