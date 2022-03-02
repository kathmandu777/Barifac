import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/button';
import { login, sendRedirectResult } from 'libmod/firebase/auth';
import { Heading, VStack } from '@chakra-ui/layout';
import { NextPage } from 'next';
import { UserRepository } from 'repositories/UserRepository';
import router from 'next/router';

const Login: NextPage = () => {
  // 動作確認（テスト書け）
  const redirectIfMissUserInfo = async () => {
    await sendRedirectResult();
    const user = await UserRepository.getMe();
    if (user) {
      if (!user.grade || !user.school || !user.department) {
        router.replace('/user/info');
      }
      router.replace('/');
    }
  };

  useEffect(() => {
    redirectIfMissUserInfo();
  }, []);

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
        onClick={login}
      >
        サインイン
      </Button>
    </VStack>
  );
};

export default Login;
