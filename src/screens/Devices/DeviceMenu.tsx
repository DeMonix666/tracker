import React, { } from 'react';
import { SafeAreaView, TouchableOpacity, View, } from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { colors } from 'core';
import { Typography } from 'components';
import { useNavigation } from '@react-navigation/native';

const DeviceMenu = (props: any) => {
  const { navigation } = props;

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.grey100,
      }}>
      <DrawerContentScrollView
        {...props}
        contentOptions={{ color: colors.blue400 }}
        contentContainerStyle={{
          paddingTop: 0,
          justifyContent: 'space-between',
          alignItems: 'flex-start',
        }}>
        <View style={{
          paddingHorizontal: 15
        }}>
          <TouchableOpacity onPress={() => {
            navigation.toggleDrawer();
            navigation.navigate('Message');
          }}>
            <Typography text="Send Message" />
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

export default DeviceMenu;
