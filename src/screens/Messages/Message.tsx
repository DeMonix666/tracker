import React, { useEffect, useState } from 'react';
import { Input, Layout, Typography, } from 'components';
import { FlatList, View, } from 'react-native';
import { auth, colors, database } from 'core';
import { useDeviceContext } from 'context/DeviceContext';
import { generateMessageId } from 'helpers';
import moment from 'moment';
import { useRoute } from '@react-navigation/native';
import { useReactQuery } from 'hooks';

const Message = () => {
  const [data, setData] = useState<any[]>([]);
  const [value, setValue] = useState('');
  const { params }: any = useRoute();
  const { deviceId } = useDeviceContext();
  const uid = auth.currentUser?.uid;
  const id = params?.key ?? generateMessageId(deviceId);

  const { data: queryData, isLoading, error }: any = useReactQuery(
    `/authentication/messages/${id}`
  );

  const { data: user }: any = useReactQuery(
    `/authentication/user/${uid}`
  );

  const { data: targetUser }: any = useReactQuery(
    `/authentication/user/${deviceId}`
  );

  const onChange = (val: string) => {
    setValue(val);
  };

  const onSave = () => {
    if (value.trim().length === 0) return;
    const ref = database.ref(`/authentication/messages/${id}`);

    const message = {
      uid,
      message: value,
      created: moment().unix(),
    };

    ref.push(message);

    database.ref(`/authentication/user_messages/${uid}/${id}`).set(message);
    database.ref(`/authentication/user_messages/${deviceId}/${id}`).set(message);

    setValue('');
  };

  useEffect(() => {
    const messages = Object.entries(queryData ?? {})
      .map(([key, message]: any, index) => {
        return { key, ...message };
      })
      .sort((a: any, b: any) => (a.created) < (b.created) ? -1 : 1);

    setData(messages);
  }, [queryData]);

  return (
    <Layout>
      <FlatList
        style={{ flex: 1 }}
        contentContainerStyle={{ padding: 15 }}
        data={data ?? []}
        renderItem={({ index, item }: any) => {
          const isOwned = uid === item.uid;

          return (
            <View
              style={{
                paddingHorizontal: 15,
                paddingVertical: 10,
                alignSelf: isOwned ? 'flex-end' : 'flex-start',
                backgroundColor: isOwned ? colors.blue100 : colors.grey100,
                padding: 10,
                borderRadius: 8,
                marginBottom: 10,
              }}
            >
              <Typography text={isOwned ? user?.name : targetUser?.name} style={{ fontWeight: '700' }} />
              <Typography text={item.message.trim()} />
              {/* <Typography text={item.created} fontSize={12} /> */}
            </View>
          );
        }}
      />

      <Input
        onChangeText={onChange}
        value={value}
        rightIcon={{
          name: 'send',
          onPress: onSave
        }}
      />
    </Layout>
  );
};

export default Message;
