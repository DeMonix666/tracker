import * as React from 'react';
import { View, useWindowDimensions, SafeAreaView } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { findCenter } from 'helpers';
import { colors } from 'react-native-elements';
import { KeyboardAvoidingView } from './KeyboardAvoidingView';

export interface LayoutProps {
  children: React.ReactNode;
  loading?: boolean;
  headerRight?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children, loading = false, headerRight }) => {
  const { width, height } = useWindowDimensions();
  const { x, y } = findCenter(width, height, 0);

  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, backgroundColor: colors.white }}>
          {children}
        </View>

        {
          loading && (
            <View
              style={{
                position: 'absolute',
                top: y,
                left: x,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <ActivityIndicator size={20} />

            </View>
          )
        }
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};
