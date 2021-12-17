import React from 'react';
import { Button, Flex, Input, Text } from '@chakra-ui/react';

type ScoreRowProps = {
  index: number;
  gotScore: number;
  maxScore: number;
  onDelete: VoidFunction;
  //onPressModal: VoidFunction;
  onChangeMaxScore: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGotScore: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const ScoreRow: React.FC<ScoreRowProps> = ({
  index,
  gotScore,
  maxScore,
  onDelete,
  //onPressModal,
  onChangeMaxScore,
  onChangeGotScore,
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
          onChange={onChangeGotScore}
          type='number'
        ></Input>
      </Flex>
      <Flex>
        <Input
          w='5rem'
          bg='white'
          color='black'
          defaultValue={maxScore}
          onChange={onChangeMaxScore}
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
