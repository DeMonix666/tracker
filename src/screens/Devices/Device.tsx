import React, { useEffect, useState } from 'react';
import { Layout, Typography } from 'components';
import { database } from 'core';
import { Platform, StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, PROVIDER_DEFAULT, Marker } from 'react-native-maps';
import { colors, Icon } from 'react-native-elements';
import { useRoute } from '@react-navigation/native';
import { useReactQuery } from 'hooks';

const Device = () => {
  const { params: { id } }: any = useRoute();
  const [zoom, setZoom] = useState(15);
  const [region, setRegion] = useState<any>();

  const { data, isLoading, error }: any = useReactQuery(
    `/authentication/user/${id}`
  );

  useEffect(() => {
    if (!region && data) {
      setRegion({
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
        ...data?.coords,
      });
    }
  }, [data]);

  return (
    <Layout>
      <View style={{ padding: 15, flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
        {region && data ? (
          <MapView
            minZoomLevel={15}
            provider={Platform.OS === 'android' ? PROVIDER_GOOGLE : PROVIDER_DEFAULT}
            style={styles.map}
            region={region}
          >
            <Marker
              key={0}
              coordinate={{
                latitude: data?.coords?.latitude ?? 0, // 10.18579,
                longitude: data?.coords?.longitude ?? 0, // 123.72747,
              }}
              title={data?.name ?? 'Unknown'}
            >
              <Typography text={data?.name ?? 'Unknown'} fontSize={12} />
              <Icon name="dot-single" type="entypo" size={30} color={colors.platform.ios.primary} style={{ marginTop: -10 }} />

            </Marker>
          </MapView>
        ) : (
          <Typography text="Newly added" />
        )}
      </View >
    </Layout>
  );
};

export default Device;

const styles = StyleSheet.create({
  menu: {
    borderWidth: 0.7,
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
  },
  // map: {
  //   height: '100%',
  //   width: '100%'
  // }
  map: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 1, width: '100%', height: 500,
  }

})
