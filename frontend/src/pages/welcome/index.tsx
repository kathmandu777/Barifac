import React from 'react';
import Link from 'next/link';
import {
  Box,
  Divider,
  Heading,
  HStack,
  Stack,
  Text,
  VStack,
} from '@chakra-ui/layout';
import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';

const Welcome = () => {
  return (
    <VStack spacing={10} mt={150}>
      <Stack spacing={5}>
        <Stack spacing={0}>
          <Heading as='h2' size='md' color='white'>
            高専生向けの単位計算アプリ
          </Heading>
          <Heading as='h2' size='md' color='blue.400'>
            Barifac
          </Heading>
        </Stack>
        <Stack color='gray.500' fontSize='sm' spacing={0}>
          <Text>単位すれすれ</Text>
          <Text>テクニカルな低空飛行を楽しむあなたに</Text>
        </Stack>
      </Stack>
      <HStack>
        <Link href='/'>
          <Button
            bg='blue.400'
            color='gray.800'
            borderRadius={20}
            size='sm'
            mr={10}
          >
            サインアップ
          </Button>
        </Link>
        <Link href='/'>
          <Button
            bg='whiteAlpha.200'
            color='whiteAlpha.800'
            borderRadius={20}
            size='sm'
          >
            サインアップ
          </Button>
        </Link>
      </HStack>
      <Divider borderColor='gray.700' w='90%' />
      <Box boxSize='300px'>
        <Image bg='gray.800' src='/images/undraw_exams_g4owA.png'></Image>
      </Box>
    </VStack>
  );
};

export default Welcome;
