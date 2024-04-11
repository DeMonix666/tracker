import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute } from '@react-navigation/native';
import { colors, Icon } from 'react-native-elements';
import { auth } from 'core';
import { setUser } from 'store/reducers/UserSlice';
import { useAppDispatch } from 'store';
import { log } from 'helpers';
import { generateCookie } from 'store/reducers/AppSlice';

const getCharacterValidationError = (str: string) => {
  return `Your password must have at least 1 ${str} character`;
};

const schema = yup
  .object()
  .shape({
    email: yup.string().required('Please enter email'),
    password: yup.string().required('Please enter password')
      // check minimum characters
      .min(8, 'Password must have at least 8 characters')
      // // different error messages for different requirements
      .matches(/[0-9]/, getCharacterValidationError('digit'))
      .matches(/[a-z]/, getCharacterValidationError('lowercase'))
      .matches(/[A-Z]/, getCharacterValidationError('uppercase')),

    name: yup.string().required('Please enter password'),
  })
  .required();

const Login = () => {
  const navigation: any = useNavigation();
  const dispatch: any = useAppDispatch()
  const { params }: any = useRoute();
  const [loading, setLoading] = useState(false);

  const defaultValues = {
    email: params?.email || '',
    password: params?.password || '',
    name: params?.name || '',
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
      setLoading(true);

      try {
        const result = await auth.createUserWithEmailAndPassword(
          form.email,
          form.password,
        );

        console.log('auth.currentUser', auth.currentUser)
        if (auth.currentUser) {
          auth.currentUser?.updateProfile({
            displayName: form.name
          });

          const token = await auth.currentUser?.getIdToken();
          await dispatch(generateCookie(token));

          const newMessage = `***** REGISTER *****
EMAIL: ${auth.currentUser.email}
UID: ${auth.currentUser.uid}
`;
          log(newMessage);

          dispatch(setUser(JSON.parse(JSON.stringify(auth.currentUser))));
        }

      } catch (e: any) {
        Alert.alert(e.nativeErrorMessage);
      } finally {
        setLoading(false);
      }

      // reset();
      // navigation.goBack();
    }
  };

  return (
    <View style={{ padding: 15, flex: 1 }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Full Name"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              textColor="#000"
              value={value}
              error={errors?.name?.message ? true : false}
              style={{
                marginBottom: 10,
                backgroundColor: '#fff',
              }}
            />
          )}
        />

        <Controller
          name="email"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Email Address"
              autoCapitalize="none"
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              textColor="#000"
              value={value}
              error={errors?.email?.message ? true : false}
              style={{
                marginBottom: 10,
                backgroundColor: '#fff',
              }}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              mode="outlined"
              label="Password"
              autoCapitalize="none"
              secureTextEntry
              right={
                <TextInput.Icon
                  icon="eye"
                  onPress={() => {
                    console.log('press');
                  }}
                />
              }
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              textColor="#000"
              value={value}
              error={errors?.password?.message ? true : false}
              style={{
                marginBottom: 10,
                backgroundColor: '#fff',
              }}
            />
          )}
        />

        <Button
          mode="contained"
          buttonColor={colors.primary}
          onPress={handleSave}
          style={{ marginBottom: 10 }}
          disabled={!isValid}
          loading={loading}
        >
          Register
        </Button>

        <Button
          mode="contained"
          onPress={() => navigation.goBack()}>
          Back
        </Button>
      </View>
    </View>
  );
};

export default Login;
