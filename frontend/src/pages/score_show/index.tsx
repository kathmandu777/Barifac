import React, { useState } from 'react';
import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  Heading,
  Select,
  useBreakpointValue,
  VStack,
} from '@chakra-ui/react';

import EvaluationTable from '../../components/EvaluationTable';
import ScoreSlider from '../../components/ScoreSlider';

const SCORES = [
  {
    name: '定期テスト',
    rate: 50,
    score: 90,
  },
  {
    name: '小テスト',
    rate: 40,
    score: 70,
  },
  {
    name: '課題点',
    rate: 10,
    score: 30,
  },
];

const TARGET_EVALUATION = 'A';

const EVALUATION_CRITERIA = [80, 70, 60];

const ScoreShow = () => {
  const circularProgressSize = useBreakpointValue({
    base: '50vw',
    md: '14vw',
  });

  const [scores, setScores] = useState(SCORES);
  const [targetEval, setTargetEval] = useState(TARGET_EVALUATION);

  const handleChangeScore = (index: number, score: number) => {
    const changed = scores.map((s, i) => {
      if (i == index) {
        s.score = score;
      }
      return s;
    });
    setScores(changed);
  };

  const handleChangeTargetEval = (value: string) => {
    setTargetEval(value);
  };

  const getTotalScore = () => {
    return scores.reduce((p, c) => {
      return p + c.score * (c.rate / 100);
    }, 0);
  };

  return (
    <Container w='80vw'>
      <VStack pt='10vh' spacing={10}>
        <Flex justifyContent='space-between' w='full'>
          <Heading color='whiteAlpha.900' fontWeight='semibold' size='xl'>
            微分方程式
          </Heading>
          <Select
            color='whiteAlpha.800'
            defaultValue={targetEval}
            onChange={({ target }) => {
              handleChangeTargetEval(target.value);
            }}
            w='4em'
          >
            <option value={'A'}>A</option>
            <option value={'B'}>B</option>
            <option value={'C'}>C</option>
          </Select>
        </Flex>
        <CircularProgress size={circularProgressSize} value={getTotalScore()}>
          <CircularProgressLabel fontSize='md' color='whiteAlpha.900'>
            {Math.round(getTotalScore())}%
          </CircularProgressLabel>
        </CircularProgress>
        {scores.map((e, i) => {
          return (
            <ScoreSlider
              key={i}
              name={e.name}
              onChange={score => handleChangeScore(i, score)}
              rate={e.rate}
              score={e.score}
            />
          );
        })}
        <EvaluationTable evalCrit={EVALUATION_CRITERIA}></EvaluationTable>
        <Flex justifyContent='space-between' w='full'>
          <Button
            bg='blue.400'
            color='gray.800'
            rounded='full'
            _hover={{ bg: 'blue.300' }}
          >
            保存する
          </Button>
          <Button bg='whiteAlpha.200' color='whiteAlpha.800' rounded='full'>
            キャンセル
          </Button>
        </Flex>
      </VStack>
    </Container>
  );
};

export default ScoreShow;
