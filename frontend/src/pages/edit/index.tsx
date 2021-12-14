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
import { SubjectListProps } from '../../components/SubjectList';

export const ALLSUBJECTS: SubjectListProps[] = [
  {
    subjectID: '101001',
    subjectName: '微分方程式',
    score: 0,
  },
  {
    subjectID: '102024',
    subjectName: '国語IIA',
    score: 0,
  },
  {
    subjectID: '105007',
    subjectName: 'コンピュータアーキテクチャ',
    score: 0,
  },
  {
    subjectID: '101003',
    subjectName: '歴史',
    score: 0,
  },
  {
    subjectID: '103019',
    subjectName: '上級Cプログラミング',
    score: 0,
  },
  {
    subjectID: '104022',
    subjectName: '数理工学演習',
    score: 0,
  },
  {
    subjectID: '105011',
    subjectName: '科学英語基礎',
    score: 0,
  },
  {
    subjectID: '109000',
    subjectName: '電気回路II',
    score: 0,
  },
];

const Edit = () => {
  const [editedSubject, setSubject] = useState(SUBJECTS);
  const saveSubjects = () => {};
  const addAllSubject = () => {
    const tempList = editedSubject.slice(0, editedSubject.length);
    Array.prototype.push.apply(tempList, ALLSUBJECTS);
    setSubject(tempList);
  };
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
        {editedSubject.map((sub, index) => {
          return (
            <SubjectNameList
              subjectName={sub.subjectName}
              index={index}
              list={editedSubject}
              hook={setSubject}
              key={index}
            />
          );
        })}
        <Divider borderColor='gray.700' />
        <Center w='100%'>
          <AddSubject
            gotlist={ALLSUBJECTS}
            list={editedSubject}
            hook={setSubject}
          />
        </Center>
        <Center w='100%'>
          <Button
            mt='5%'
            mb='5%'
            size='sm'
            bg='blue.400'
            color='gray.800'
            rounded='full'
            onClick={addAllSubject}
          >
            一括で追加
          </Button>
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
