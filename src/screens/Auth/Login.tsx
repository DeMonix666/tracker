import React, { useState } from 'react';
import { Alert, TouchableOpacity, View } from 'react-native';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation, useRoute, useTheme } from '@react-navigation/native';
import { auth, colors } from 'core';
import { Button, Input, Typography } from 'components';
import { useAppDispatch } from 'store';
import { loadUser, setUser } from 'store/reducers/UserSlice';
import { log } from 'helpers';
import { generateCookie } from 'store/reducers/AppSlice';

const schema = yup
  .object()
  .shape({
    email: yup.string().required('Please enter email'),
    password: yup.string().required('Please enter password'),
  })
  .required();

const Login = () => {
  const dispatch: any = useAppDispatch();
  const navigation: any = useNavigation();
  const { params }: any = useRoute();
  const [loading, setLoading] = useState(false);
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const defaultValues = {
    email: '',
    password: '',
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
        const result = await auth.signInWithEmailAndPassword(
          form.email,
          form.password,
        );

        console.log('result', result);

        //         const newMessage = `***** LOGIN *****
        // EMAIL: ${result.user.email}
        // UID: ${result.user.uid}
        // `;
        // const token = await auth.currentUser?.getIdToken();
        // await dispatch(generateCookie(token));

        // log(newMessage);
        dispatch(setUser(JSON.parse(JSON.stringify(result.user))));
        // dispatch(loadUser({}));
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
    <View style={{ padding: 15, flex: 1, backgroundColor: colors.white }}>
      <View style={{ flex: 1, justifyContent: 'center' }}>
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
              secureTextEntry={secureTextEntry}
              autoCapitalize="none"
              rightIcon={{
                type: 'font-awesome',
                name: secureTextEntry ? 'eye' : 'eye-slash',
                color: colors.grey800,
                size: 20,
                onPress: () => {
                  setSecureTextEntry((prev) => !prev);
                }
              }}
              onBlur={onBlur}
              onChangeText={val => onChange(val)}
              value={value}
            />
          )}
        />

        <Button
          buttonColor={colors.green400}
          onPress={handleSave}
          disabled={!isValid}
          loading={loading}
          style={{ marginHorizontal: 10, marginBottom: 10 }}
        >
          Login
        </Button>

        <TouchableOpacity
          onPress={() => {
            navigation.push('Register');
          }}>
          <Typography text="Create account now" textAlign="center" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Login;
