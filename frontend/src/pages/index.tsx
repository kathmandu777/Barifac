import React from 'react';
import { Divider, VStack } from '@chakra-ui/layout';
import SubjectList, { SubjectListProps } from '../components/SubjectList';

const SUBJECTS: SubjectListProps[] = [
  {
    subjectID: 101001,
    subjectName: '微分方程式',
    score: 75,
  },
  {
    subjectID: 102024,
    subjectName: '国語IIA',
    score: 60,
  },
  {
    subjectID: 105007,
    subjectName: 'コンピュータアーキテクチャ',
    score: 53,
  },
  {
    subjectID: 101003,
    subjectName: '歴史',
    score: 70,
  },
  {
    subjectID: 103019,
    subjectName: '上級Cプログラミング',
    score: 75,
  },
  {
    subjectID: 104022,
    subjectName: '数理工学演習',
    score: 40,
  },
];

const Home = () => {
  return (
    <VStack
      spacing={3}
      mt={224}
      mb={100}
      ml='auto'
      mr='auto'
      width='70%'
      alignItems='flex-start'
    >
      {SUBJECTS.map(sub => {
        return (
          <SubjectList
            subjectID={sub.subjectID}
            subjectName={sub.subjectName}
            score={sub.score}
          />
        );
      })}
      <Divider borderColor='gray.700' />
    </VStack>
  );
};

export default Home;
