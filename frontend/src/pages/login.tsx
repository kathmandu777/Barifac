import React, { useEffect, useState } from 'react';
import { Button } from '@chakra-ui/button';
import { login } from 'libmod/firebase/auth';
import { Heading, VStack } from '@chakra-ui/layout';
import { NextPage } from 'next';
import { UserRepository } from 'repositories/UserRepository';
import router from 'next/router';

const Login: NextPage = () => {
  // kuso
  const [update, setUpdate] = useState<boolean>(false);

  const updateRendering = async () => {
    await login();
    setUpdate(!update);
  };
  // 動作確認（テスト書け）
  const redirectIfMissUserInfo = async () => {
    const user = await UserRepository.getMe();
    {
      console.log(user);
      user && (!user.grade || !user.school || !user.department)
        ? router.replace('/user/info')
        : router.replace('/');
    }
  };

  useEffect(() => {
    redirectIfMissUserInfo();
  }, [update]);
  return (
    <VStack spacing={10} mt={300}>
      <Heading as='h1' size='xl' color='blue.400' fontWeight='bold'>
        Barifac
      </Heading>
      <Button
        bg='blue.400'
        color='gray.800'
        borderRadius={20}
        size='md'
        mr={10}
        onClick={updateRendering}
      >
        サインイン
      </Button>
    </VStack>
  );
};

export default Login;
