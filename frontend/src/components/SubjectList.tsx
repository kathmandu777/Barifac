import React from 'react';
import Link from 'next/link';
import {
  Divider,
  HStack,
  Stack,
  Text,
  Circle,
  Spacer,
} from '@chakra-ui/layout';
import { ArrowForwardIcon } from '@chakra-ui/icons';
import { ReadableAttendSubject } from 'domains';

export type SubjectListProps = {
  subject: ReadableAttendSubject;
};

const SubjectList: React.FC<SubjectListProps> = props => {
  //const aveScore = props.evaluations.scores.reduce(
  //  (sum, element) => sum + element,
  //  0,
  //);
  // TODO: スコアの平均点を出す処理と複数のスコアと目標スコアから次のテストで必要なスコアを計算する
  const aveScore = props.subject.targetValue;
  return (
    <>
      <Divider borderColor='gray.700' />
      <Stack w='100%'>
        <HStack spacing={5}>
          <Circle size='54px' bg='blue.400' color='white'>
            <Text fontSize='2xl' fontWeight='semibold'>
              {aveScore}
            </Text>
          </Circle>
          <Text fontSize='xl' fontWeight='bold' color='white' noOfLines={1}>
            {props.subject.subjectName}
          </Text>
          <Spacer />
          <Link href={`/score_show/${props.subject.uuid}`}>
            <ArrowForwardIcon w={5} h={5} color='white' />
          </Link>
        </HStack>
      </Stack>
    </>
  );
};

export default SubjectList;
