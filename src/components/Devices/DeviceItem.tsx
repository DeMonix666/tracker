import { Typography } from 'components/Typography';
import React, { useEffect, useState } from 'react';
import { StyleProp, TouchableOpacity, View, ViewStyle } from 'react-native';
import { auth, database } from 'core';
import { useReactQuery } from 'hooks';

interface Props {
  style?: StyleProp<ViewStyle>;
  id: string;
  onPress?: () => void;
}

export const DeviceItem: React.FC<Props> = ({
  id,
  onPress = () => { },
  style, }) => {
  const { data }: any = useReactQuery(
    `/authentication/user/${id}`
  );

  return (
    <TouchableOpacity onPress={onPress}
      style={{
        paddingHorizontal: 15,
        paddingVertical: 10,
      }}
    >
      {/* <Typography text={id} /> */}
      <Typography text={data?.name} />
    </TouchableOpacity>

  );
};
