import {
  VStack,
  Divider,
  Heading,
  Center,
  Flex,
  Button,
  Spacer,
  Link,
} from '@chakra-ui/react';
import { SUBJECTS } from '..';
import SubjectNameList from '../../components/SubjectNameList';
import { useState } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import AddSubject from '../../components/AddSubject';

const Edit = () => {
  const [editingSubject, setSubject] = useState(SUBJECTS);
  const saveSubjects = () => {};
  return (
    <>
      <Center w='100%'>
        <Heading as='h2' size='md' color='white' mt='20%'>
          履修科目編集
        </Heading>
      </Center>
      <VStack
        spacing={3}
        mt={224}
        mb={100}
        ml='auto'
        mr='auto'
        width='70%'
        alignItems='flex-start'
      >
        {editingSubject.map((sub, index) => {
          return (
            <SubjectNameList
              subjectName={sub.subjectName}
              index={index}
              list={editingSubject}
              hook={setSubject}
              key={index}
            />
          );
        })}
        <Divider borderColor='gray.700' />
        <Center w='100%'>
          <AddSubject list={editingSubject} hook={setSubject} />
        </Center>
        <Flex justifyContent='space-between' w='full'>
          <Link href='/'>
            <Button
              bg='blue.400'
              color='gray.800'
              rounded='full'
              onClick={saveSubjects}
            >
              保存する
            </Button>
          </Link>
          <Link href='/'>
            <Button bg='whiteAlpha.200' color='whiteAlpha.800' rounded='full'>
              キャンセル
            </Button>
          </Link>
        </Flex>
      </VStack>
    </>
  );
};

export default Edit;
