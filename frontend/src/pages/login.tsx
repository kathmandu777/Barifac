import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/button';
import { login } from 'libmod/firebase/auth';
import { Heading, VStack } from '@chakra-ui/layout';
import { NextPage } from 'next';
import { UserRepository } from 'repositories/UserRepository';

const Login: NextPage = () => {
  // 動作確認（テスト書け）
  const fetchUserData = async () => {
    const user = await UserRepository.getMe();
    console.log(user);
    const update_user = await UserRepository.update({
      username: 'Daiki',
      email: user?.email,
      uid: user?.uid,
      grade: 3,
      school_uuid: 'c0e31daf-987b-4f7a-87e8-22fec5a75c4d',
      department_uuid: '703297de-e177-46f4-9093-767fe0fd81a3',
    });
    console.log(update_user);
  };

  useEffect(() => {
    fetchUserData();
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
