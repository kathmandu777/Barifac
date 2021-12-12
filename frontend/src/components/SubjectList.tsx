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

export type SubjectListProps = {
  subjectID: number;
  subjectName: string;
  score: number;
};

const SubjectList: React.FC<SubjectListProps> = props => {
  return (
    <>
      <Divider borderColor='gray.700' />
      <Stack w='100%'>
        <HStack spacing={5}>
          <Circle size='54px' bg='blue.400' color='white'>
            <Text fontSize='2xl' fontWeight='semibold'>
              {props.score}
            </Text>
          </Circle>
          <Text fontSize='xl' fontWeight='bold' color='white' noOfLines={1}>
            {props.subjectName}
          </Text>
          <Spacer />
          <Link href={`${props.subjectID}`}>
            <ArrowForwardIcon w={5} h={5} color='white' />
          </Link>
        </HStack>
      </Stack>
    </>
  );
};

export default SubjectList;
