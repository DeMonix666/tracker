import { useNavigation } from '@react-navigation/native';
import { Button, Layout, Separator, Typography } from 'components';
import { colors } from 'core';
import { useApp } from 'hooks';
import React, { useEffect } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import { useAppSelector } from 'store';
import { appState, userState } from 'store/reducers';

const More = () => {
  const { logout } = useApp();
  const navigation: any = useNavigation();
  const app = useAppSelector(state => appState(state));

  return (
    <Layout>
      <View style={{ padding: 15, flex: 1 }}>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={styles.menu} onPress={() => { navigation.push('Profile') }}>
            <Typography text="Profile" />
            <Icon name='chevron-right' />
          </TouchableOpacity>

          <Separator />

          <TouchableOpacity style={styles.menu} onPress={() => { navigation.push('Settings') }}>
            <Typography text="Settings" />
            <Icon name='chevron-right' />
          </TouchableOpacity>

          <Separator />

          <TouchableOpacity style={styles.menu} onPress={() => { navigation.push('About') }}>
            <Typography text="About" />
            <Icon name='chevron-right' />
          </TouchableOpacity>

          {app.developerScreen && (
            <>
              <Separator />

              <TouchableOpacity style={styles.menu} onPress={() => { navigation.push('Developer') }}>
                <Typography text="Developer" />
                <Icon name='chevron-right' />
              </TouchableOpacity>
            </>
          )}
        </View>

        <Button
          buttonColor={colors.red500}
          onPress={logout}>
          Logout
        </Button>
      </View>
    </Layout>
  );
};

export default More;

const styles = StyleSheet.create({
  menu: {
    flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingVertical: 10
  }
})
