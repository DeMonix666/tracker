import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { auth, colors } from 'core';
import { Button, Input, Layout, Typography } from 'components';
import { useAppDispatch } from 'store';
import { addDevice, loadUser, setUser } from 'store/reducers/UserSlice';
import { log } from 'helpers';
import { generateCookie } from 'store/reducers/AppSlice';

const schema = yup
  .object()
  .shape({
    email: yup.string().required('Please enter email'),
    password: yup.string().required('Please enter password'),
    name: yup.string().required('Please enter name'),
  })
  .required();

const DeviceAdd = () => {
  const dispatch: any = useAppDispatch();
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const defaultValues = {
    email: '',
    password: '',
    name: ''
  };
  const { control, formState, watch, reset } = useForm({
    mode: 'onChange',
    defaultValues,
    resolver: yupResolver(schema),
  });
  const { isValid, errors } = formState;
  const form = watch();

  const handleSave = async () => {
    if (isValid) {
      console.log(form)
      setLoading(true);
      try {

        await dispatch(addDevice(form)).then((action: any) => {
          const { payload } = action;
          console.log('result', action);


          if (payload.statusCode === 200) {
            navigation.goBack();
          } else if (payload?.message) {
            Alert.alert(payload?.message);
          }
        });

      } catch (e: any) {

        Alert.alert(e.nativeErrorMessage);
      } finally {
        setLoading(false);
      }


    }
  };

  return (
    <Layout
      headerRight={<TouchableOpacity onPress={() => console.log('')}><Typography text="Add Device" /></TouchableOpacity>}
    >
      <View style={{ flex: 1, paddingVertical: 15 }}>
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email Address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              errorMessage=""
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
            />
          )}
        />

        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Name"
              errorMessage=""
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
            />
          )}
        />


      </View>

      <Button
        buttonColor={colors.green400}
        onPress={handleSave}
        disabled={!isValid}
        loading={loading}
        style={{ marginHorizontal: 10, marginBottom: 10 }}
      >
        Add
      </Button>
    </Layout>
  );
};

export default DeviceAdd;
