import { Typography } from 'components/Typography';
import React, { useEffect, useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { auth, database } from 'core';
import { useReactQuery } from 'hooks';
import { useDeviceContext } from 'context/DeviceContext';
import { useNavigation } from '@react-navigation/native';

interface Props {
  style?: StyleProp<ViewStyle>;
  message: any;
}

export const MessageItem: React.FC<Props> = ({
  message,
  style, }) => {
  const { setDeviceId } = useDeviceContext();
  const navigation: any = useNavigation();
  const uid = auth.currentUser?.uid;
  const ids = message.key.split('_');
  const id = ids[0] !== uid ? ids[0] : ids[1];

  const { data: recipient }: any = useReactQuery(
    `/authentication/user/${id}`
  );

  return (
    <TouchableOpacity
      onPress={() => {
        setDeviceId(id);
        navigation.navigate('Message', { key: message.key })
      }}
      style={[style, {
        paddingHorizontal: 15,
        paddingVertical: 10,
      }]}
    >
      <Typography text={recipient?.name} style={{ fontWeight: '700' }} />
      <Typography text={message?.message} />
      <Typography text={message?.created} fontSize={12} />
    </TouchableOpacity>

  );
};
