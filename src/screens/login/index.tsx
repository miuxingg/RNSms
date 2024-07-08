import React from 'react';
import Layout from '../../components/layout';
import {Button, HStack, Input, Text, VStack, View} from 'native-base';
import * as Yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import {Controller, useForm} from 'react-hook-form';
import {observer} from 'mobx-react-lite';
import {useAuthStore} from '../../stores/providers';

const loginSchema = Yup.object({
  username: Yup.string().required(),
  password: Yup.string().required(),
});
type FormData = Yup.InferType<typeof loginSchema>;

const LoginScreen = observer(() => {
  const authStore = useAuthStore();
  const {
    control,
    handleSubmit,
    // formState: {errors},
  } = useForm<FormData>({
    resolver: yupResolver(loginSchema),
    defaultValues: {
      username: 'manager1@mttjsc.com',
      password: '123456',
    },
  });
  const onSubmit = async (data: FormData) => {
    await authStore.login(data);
  };
  return (
    <Layout>
      <View flex={1} justifyContent="center" paddingX={8}>
        <VStack space={4}>
          <HStack alignItems="center">
            <View flex={1}>
              <Text>Username</Text>
            </View>
            <View flex={3}>
              <Controller
                name="username"
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Username"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </HStack>
          <HStack alignItems="center">
            <View flex={1}>
              <Text>Password</Text>
            </View>
            <View flex={3}>
              <Controller
                name="password"
                control={control}
                render={({field: {onChange, value}}) => (
                  <Input
                    placeholder="Password"
                    type="password"
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
            </View>
          </HStack>
          <HStack alignItems="center" justifyContent="center">
            <Button onPress={handleSubmit(onSubmit)}>Login</Button>
          </HStack>
        </VStack>
      </View>
    </Layout>
  );
});

export default LoginScreen;
