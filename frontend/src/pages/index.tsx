import React from 'react';
import { Divider, VStack, Center, Heading } from '@chakra-ui/layout';
import SubjectList, { SubjectListProps } from '../components/SubjectList';
import EditButton from '../components/EditButton';
import { AttendSubject } from 'domains';
import { AttendSubjectRepository } from 'repositories';
import { AttendSubjectReadable } from 'domains/AttendSubjectReadable';
import { useEffect, useState } from 'react';
import { AttendSubjectReadableRepository } from 'repositories/AttendSubjectReadableRepository';
import { AttendSubjectReadableInterface } from 'repositories/AttendSubjectReadableRepository';


const Home = () => {
  const [SUBJECTS, setSubjects] = useState<AttendSubjectReadableInterface[]>(
    [],
  );
  useEffect(() => {
    AttendSubjectReadableRepository.gets()
      .then(lis => {
        setSubjects(lis);
      })
      .catch(err => {
        setSubjects([]);
      });
  }, []);
  return (
    <>
      <Center w='100%'>
        <Heading as='h1' size='md' color='white' mt='20%'>
          Barifac
        </Heading>
      </Center>
      <VStack
        spacing={3}
        mt={124}
        mb={100}
        ml='auto'
        mr='auto'
        width='70%'
        alignItems='flex-start'
      >
        {SUBJECTS.map((sub, index) => {
          return (
            <SubjectList
              subject={sub}
              key={index}
            />
          );
        })}
        <Divider borderColor='gray.700' />
      </VStack>
      <EditButton />
    </>
  );
};

export default Home;
