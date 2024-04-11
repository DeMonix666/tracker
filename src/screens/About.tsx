import { Layout, Separator, Typography } from 'components';
import React, { useEffect, useState } from 'react';
import { Pressable, View } from 'react-native';
import DeviceInfo from 'react-native-device-info';
import { useAppDispatch, useAppSelector } from 'store';
import { appState } from 'store/reducers';
import { setDeveloperScreen } from 'store/reducers/AppSlice';

const About = () => {
  const app = useAppSelector(state => appState(state));
  const dispatch: any = useAppDispatch();
  const [count, setCount] = useState(0);
  const [device, setDevice] = useState<any>({
    version: null,
    buildNumber: null,
    packageName: null,
  });

  useEffect(() => {
    setDevice(() => {
      return {
        version: DeviceInfo.getVersion(),
        buildNumber: DeviceInfo.getBuildNumber(),
        packageName: DeviceInfo.getBundleId(),
      };
    })
  }, [])

  return (
    <Layout>
      <View style={{ padding: 15, flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography text="Version" />
          <Typography text={device.version} />
        </View>

        <Separator style={{ paddingVertical: 10 }} />

        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Pressable
            onPress={() => {
              if (app.developerScreen) return;

              setCount((prev: number) => {
                const newCount = prev + 1;

                if (newCount >= 7) {
                  dispatch(setDeveloperScreen(true));
                  // toastHelper.message({
                  //   message: 'Developer screen enabled',
                  //   duration: 2000,
                  // });
                }

                return newCount;
              });
            }}>
            <Typography text="Build" />
          </Pressable>
          <Typography text={device.buildNumber} />
        </View>
      </View>
    </Layout>
  );
};

export default About;
