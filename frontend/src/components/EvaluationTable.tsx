import React, { useState } from 'react';

import { Center, Input, SimpleGrid } from '@chakra-ui/react';

export type EvaluationTableProps = {
  evalCrit: number[];
};

const EvaluationTable: React.FC<EvaluationTableProps> = props => {
  const [evalCrit, setEvalCrit] = useState(props.evalCrit);
  const handleChange = (newValue: number, index: number) => {
    setEvalCrit(
      evalCrit.map((v, i) => {
        return i == index ? newValue : v;
      }),
    );
  };
  return (
    <SimpleGrid columns={4} textAlign={'center'} w='full'>
      <Td>評価</Td>
      <Td>A</Td>
      <Td>B</Td>
      <Td>C</Td>
      <Td bg='whiteAlpha.200'>点数</Td>
      {evalCrit.map((v, i) => {
        return (
          <TdInput
            key={i}
            value={v}
            onChange={newValue => {
              handleChange(newValue, i);
            }}
          ></TdInput>
        );
      })}
    </SimpleGrid>
  );
};

type TdProps = {
  bg?: string;
};

const Td: React.FC<TdProps> = ({ bg = 'whiteAlpha.300', children }) => {
  return (
    <Center bg={bg} color='whiteAlpha.800'>
      {children}
    </Center>
  );
};

type TdInputProps = {
  value: number;
  onChange: (newValue: number) => void;
};

const TdInput: React.FC<TdInputProps> = ({ onChange, value }) => {
  return (
    <Center>
      <Input
        bg='whiteAlpha.200'
        border='none'
        color='whiteAlpha.800'
        defaultValue={value}
        onChange={({ target }) => {
          const newValue = Number(target.value);
          onChange(newValue);
        }}
        rounded='none'
        textAlign='center'
        type='number'
      ></Input>
    </Center>
  );
};

export default EvaluationTable;
