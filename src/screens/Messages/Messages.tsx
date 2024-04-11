import React, { useEffect, useState } from 'react';
import { Layout, Separator, Typography } from 'components';
import { View, FlatList, TouchableOpacity } from 'react-native';
import { useAppSelector } from 'store';
import { ActivityIndicator } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { auth } from 'core';
import { useReactQuery } from 'hooks';
import { useDeviceContext } from 'context/DeviceContext';
import { MessageItem } from 'components/Messages/MessageItem';

const Messages = () => {
  const [data, setData] = useState<any[]>([]);
  const navigation: any = useNavigation();
  const { setDeviceId } = useDeviceContext();
  const uid = auth.currentUser?.uid;

  const { data: queryData, isLoading, error }: any = useReactQuery(
    `/authentication/user_messages/${uid}`
  );

  useEffect(() => {
    const messages = Object.entries(queryData ?? {}).map(([key, message]: any, index) => {
      return { key, ...message };
    });

    setData(messages);
  }, [queryData]);

  return (
    <Layout>
      <FlatList
        style={{ flex: 1 }}
        data={data ?? []}
        renderItem={({ index, item }: any) => {
          return (
            <MessageItem message={item} />

          );
        }}
        ListHeaderComponent={
          <>
            {!isLoading && data.length <= 0 && (
              <Typography text="No devices found" style={{ padding: 15 }} />
            )}
          </>
        }

        ItemSeparatorComponent={() => <Separator style={{ paddingHorizontal: 15 }} />}

      />
    </Layout>
  );
};

export default Messages;
