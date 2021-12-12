import React from 'react';
import Link from 'next/link';
import {
  Divider,
  HStack,
  Stack,
  Text,
  Circle,
  VStack,
  Spacer,
} from '@chakra-ui/layout';
import { ArrowForwardIcon } from '@chakra-ui/icons';

const obj = [
  { subject_id: 101001, subject_name: '微分方程式', score: 75 },
  { subject_id: 102024, subject_name: '国語IIA', score: 60 },
  { subject_id: 105007, subject_name: 'コンピュータアーキテクチャ', score: 53 },
  { subject_id: 101003, subject_name: '歴史', score: 70 },
  { subject_id: 103019, subject_name: '上級Cプログラミング', score: 75 },
  { subject_id: 104022, subject_name: '数理工学演習', score: 40 },
];

const Home = () => {
  return (
    <VStack
      spacing={3}
      mt={224}
      mb={100}
      ml='auto'
      mr='auto'
      width='70%'
      alignItems='flex-start'
    >
      {obj.map(element => {
        return (
          <>
            <Divider borderColor='gray.700' />
            <Stack w='100%'>
              <HStack spacing={5}>
                <Circle size='54px' bg='blue.400' color='white'>
                  <Text fontSize='2xl' fontWeight='semibold'>
                    {element.score}
                  </Text>
                </Circle>
                <Text
                  fontSize='xl'
                  fontWeight='bold'
                  color='white'
                  noOfLines={1}
                >
                  {element.subject_name}
                </Text>
                <Spacer />
                <Link href={`${element.subject_id}`}>
                  <ArrowForwardIcon w={5} h={5} color='white' />
                </Link>
              </HStack>
            </Stack>
          </>
        );
      })}
      <Divider borderColor='gray.700' />
    </VStack>
  );
};

export default Home;
