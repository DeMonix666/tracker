import { Layout, Typography } from 'components';
import { auth } from 'core';
import { useReactQuery } from 'hooks';
import React from 'react';
import { SafeAreaView, View } from 'react-native';
import { Icon } from 'react-native-elements';

const Profile = () => {
  const uid = auth.currentUser?.uid;

  const { data }: any = useReactQuery(
    `/authentication/user/${uid}`
  );

  return (
    <Layout>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ padding: 15, flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ borderRadius: 20, borderWidth: 0.8, marginRight: 10, padding: 5 }}>
              <Icon name='person' />
            </View>

            <Typography text={data?.name} />
          </View>
        </View>

        {/* <Button
          mode="contained"
          buttonColor={colors.primary}
          onPress={() => { }}
          style={{ marginHorizontal: 15 }}
        >
          Update
        </Button> */}
      </SafeAreaView>
    </Layout>
  );
};

export default Profile;
