import { Button } from '@chakra-ui/button';
import { FormControl, FormLabel } from '@chakra-ui/form-control';
import { Input } from '@chakra-ui/input';
import { Heading, Stack, VStack } from '@chakra-ui/layout';
import { Select } from '@chakra-ui/select';
import { NextPage } from 'next';
import React, { useState } from 'react';

const UserPage: NextPage = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isDisabledDep, setIsDisabledDep] = useState<boolean>(false);

  const handleSubmit: React.FormEventHandler = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitting(false);
    return;
  };

  const handleSchoolChange: React.FormEventHandler = async e => {
    e.preventDefault();
    setIsDisabledDep(true);
    // School に対応する Department をすべて取得
    setIsDisabledDep(false);
    return;
  };

  return (
    <VStack spacing={10}>
      <Heading
        as='h1'
        size='xl'
        color='whiteAlpha.900'
        fontWeight='bold'
        mt={150}
      >
        ユーザ情報入力
      </Heading>
      <form onSubmit={handleSubmit}>
        <Stack spacing={10}>
          <VStack spacing={5}>
            <FormControl id='name' isRequired>
              <FormLabel color='whiteAlpha.900'>名前</FormLabel>
              <Input
                color='whiteAlpha.900'
                placeholder='名前を入力してください'
              />
            </FormControl>
            <FormControl id='school' isRequired>
              <FormLabel color='whiteAlpha.900'>学校名</FormLabel>
              <Select
                color='whiteAlpha.900'
                onChange={handleSchoolChange}
                placeholder='学校名を選択してください'
              ></Select>
            </FormControl>
            <FormControl id='Department' isRequired>
              <FormLabel color='whiteAlpha.900'>学科名</FormLabel>
              <Select
                color='whiteAlpha.900'
                isDisabled={isDisabledDep}
                placeholder='学科名を選択してください'
              ></Select>
            </FormControl>
          </VStack>
          <Button
            type='submit'
            bg='blue.400'
            color='gray.800'
            rounded='full'
            size='md'
            isDisabled={isSubmitting}
          >
            保存する
          </Button>
        </Stack>
      </form>
    </VStack>
  );
};

export default UserPage;
