import React, { useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Spacer,
  Text,
  VStack,
} from '@chakra-ui/react';

const SCORE_EDIT_DATA = {
  name: '微分方程式 小テスト',
  scores: [
    {
      maxScore: 100,
      gotScore: 70,
    },
    {
      maxScore: 50,
      gotScore: 45,
    },
  ],
};

const ScoreEdit = () => {
  const name = SCORE_EDIT_DATA.name;
  const [scores, setScores] = useState(SCORE_EDIT_DATA.scores);

  const handleAddScore = () => {
    const score = {
      maxScore: 0,
      gotScore: 0,
    };
    setScores([...scores, score]);
  };

  const handleDeleteScore = (index: number) => {
    console.log(
      scores.filter((_, i) => {
        console.log(i, index);
        return i != index;
      }),
    );
    setScores(
      scores.filter((_, i) => {
        return i != index;
      }),
    );
  };

  return (
    <Container w='80vw'>
      <VStack pt='14vh' pb='5vh' spacing={10} w='full'>
        <Heading color='whiteAlpha.900' fontSize='2xl'>
          {name}
        </Heading>
        <VStack w='full'>
          {scores.map((score, i) => {
            return (
              <ScoreRow
                gotScore={score.gotScore}
                index={i}
                key={i}
                maxScore={score.maxScore}
                onDelete={() => {
                  handleDeleteScore(i);
                }}
              />
            );
          })}
        </VStack>
        <Divider />
        <Button
          bg='blue.400'
          color='gray.800'
          colorScheme={'blue'}
          onClick={handleAddScore}
          rounded='full'
          w='full'
          _hover={{
            bg: 'blue.300',
          }}
        >
          追加する
        </Button>
        <Spacer />
        <Flex justifyContent='space-between' w='full'>
          <Button bg='blue.400' color='gray.800' rounded='full'>
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

type ScoreRowProps = {
  index: number;
  gotScore: number;
  maxScore: number;
  onDelete: VoidFunction;
};

const ScoreRow: React.FC<ScoreRowProps> = ({
  index,
  gotScore,
  maxScore,
  onDelete,
}) => {
  return (
    <Flex w='full' justifyContent='space-between'>
      <Flex>
        <Text color='whiteAlpha.900' lineHeight='full' w='2em'>
          {index}.
        </Text>
        <Input
          w='5rem'
          bg='white'
          color='black'
          defaultValue={gotScore}
          type='number'
        ></Input>
      </Flex>
      <Flex>
        <Input
          w='5rem'
          bg='white'
          color='black'
          defaultValue={maxScore}
          type='number'
        ></Input>
        <Button
          bg='whiteAlpha.200'
          color='whiteAlpha.800'
          rounded='full'
          ml={2}
          mr={2}
          onClick={onDelete}
        >
          削除
        </Button>
      </Flex>
    </Flex>
  );
};

export default ScoreEdit;
