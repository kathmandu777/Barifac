import React, { useEffect } from 'react';
import { Button } from '@chakra-ui/button';
import { login } from 'libmod/firebase/auth';
import { Heading, VStack } from '@chakra-ui/layout';
import { NextPage } from 'next';
import { useRouter } from 'next/router';
import { useAuthContext } from 'context/AuthContext';

const Login: NextPage = () => {
  const { uid } = useAuthContext();
  const router = useRouter();

  // fetchData = responce user data
  const fetchData = null;

  useEffect(() => {
    {
      uid && fetchData ? router.replace('/') : router.replace('/user');
    }
  });
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
