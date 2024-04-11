import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Alert} from 'react-native';
import {useAppDispatch} from '../store';
import {Button} from 'react-native-paper';
import {Typography} from '../components';
import ReactNativeBiometrics, {BiometryTypes} from 'react-native-biometrics';
import DeviceInfo from 'react-native-device-info';
import {setAppAuthenticated} from '../store/reducers/AppSlice';

const Welcome = () => {
  const dispatch: any = useAppDispatch();
  const [deviceId, setDeviceId] = useState<any>('');
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [bioType, setBioType] = useState<any>();
  const rnBiometrics = new ReactNativeBiometrics();

  const handleBiometricAuth = async () => {
    if (!isBiometricSupported) {
      Alert.alert('Biometrics not supported');
      return;
    }

    const {publicKey} = await rnBiometrics.createKeys();
    const timestamp = Math.round(new Date().getTime() / 1000).toString();
    const payload = `${deviceId}__${timestamp}`;

    if (
      bioType === BiometryTypes.TouchID ||
      bioType === BiometryTypes.Biometrics
    ) {
      console.log('touch by touch');
      try {
        const {success, signature} = await rnBiometrics.createSignature({
          promptMessage: 'Sign in',
          payload,
        });

        console.log('success', success, signature);
        console.log('publicKey', publicKey);
        if (success) {
          dispatch(
            setAppAuthenticated({
              authenticated: true,
              deviceId,
            }),
          );
        }
      } catch (e) {
        console.log(e);
      }
    } else if (bioType === BiometryTypes.FaceID) {
      try {
        const {success, signature} = await rnBiometrics.createSignature({
          promptMessage: 'Sign in',
          payload,
        });

        console.log('success', success, signature);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    (async () => {
      const _deviceId = await DeviceInfo.getUniqueId();
      setDeviceId(_deviceId);
      const {available, biometryType} = await rnBiometrics.isSensorAvailable();
      console.log('biometryType', available, biometryType);
      setIsBiometricSupported(available);
      setBioType(biometryType);
    })();
  });

  return (
    <View style={styles.wrapper}>
      <View style={styles.container}>
        <Typography text="Welcome to" />
        <Typography
          text="Simple Secure App"
          fontSize={20}
          bold
          style={{marginBottom: 20}}
        />
        <Button onPress={handleBiometricAuth} mode="contained">
          Authenticate
        </Button>
      </View>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
});
