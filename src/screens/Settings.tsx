import { Layout, Typography } from 'components';
import React from 'react';
import { View } from 'react-native';

const Settings = () => {
  return (
    <Layout>
      <View style={{ padding: 15, flex: 1 }}>
        <Typography text="To Do Settings" />
      </View>
    </Layout>
  );
};

export default Settings;
