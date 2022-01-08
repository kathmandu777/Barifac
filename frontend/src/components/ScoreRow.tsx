import React from 'react';
import { Flex, Input, Text } from '@chakra-ui/react';

import DeleteConfirmDialog from 'components/DeleteConfirmDialog';

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
    <>
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
          <DeleteConfirmDialog
            onOk={onDelete}
            dialogHeader='得点の削除'
            dialogBody='削除しますか？'
          ></DeleteConfirmDialog>
        </Flex>
      </Flex>
    </>
  );
};
