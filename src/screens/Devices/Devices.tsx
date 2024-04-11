import React, { useEffect, useState } from 'react';
import { Layout, Separator, Typography } from 'components';
import { View, FlatList, RefreshControl, TouchableOpacity } from 'react-native';
import { useAppDispatch, useAppSelector } from 'store';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth, database } from 'core';
import { DeviceItem } from 'components/Devices/DeviceItem';
import { useDeviceContext } from 'context/DeviceContext';
import { useQueryClient } from '@tanstack/react-query';
import { useReactQuery } from 'hooks';

const Devices = () => {
  const [loadMore, setLoadMore] = useState(false);
  const navigation: any = useNavigation();
  const { setDeviceId } = useDeviceContext();
  const uid = auth.currentUser?.uid;

  const { data, isLoading, error }: any = useReactQuery(
    `/authentication/devices/${uid}`
  );

  return (
    <Layout>
      <FlatList
        style={{ flex: 1 }}
        data={data ?? []}
        renderItem={({ index, item }: any) => {
          return (
            <DeviceItem id={item} onPress={() => {
              setDeviceId(item);
              navigation.navigate('Device', { id: item });
            }} />
          );
        }}
        ListHeaderComponent={
          <>
            {!isLoading && (data ?? []).length <= 0 && (
              <Typography text="No devices found" style={{ padding: 15 }} />
            )}
          </>
        }
        ListFooterComponent={
          <>
            {loadMore && (
              <View style={{ flexDirection: 'row', justifyContent: 'center', padding: 10 }}>
                <ActivityIndicator size={14} />
                <Typography text="Loading" style={{ marginLeft: 10 }} />
              </View>
            )}
          </>
        }
        ItemSeparatorComponent={() => <Separator style={{ paddingHorizontal: 15 }} />}

      />
    </Layout>
  );
};

export default Devices;
