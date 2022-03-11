import React from 'react';
import { Divider, VStack, Center, Heading } from '@chakra-ui/layout';
import SubjectList from '../components/SubjectList';
import EditButton from '../components/EditButton';
import { useEffect, useState } from 'react';
import { AttendSubjectRepository } from 'repositories/AttendSubjectRepository';
import { ReadableAttendSubject } from 'domains';
import { UserRepository } from 'repositories';
import { SessionService } from 'services/SessionService';
import { useRouter } from 'next/router';

const Home = () => {
  const [SUBJECTS, setSubjects] = useState<ReadableAttendSubject[]>([]);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const user = UserRepository.getMe();
      if (!SessionService.isLoggedin() || !user) {
        alert('ログインし直してください');
        return router.push('/login');
      }
    })();
    AttendSubjectRepository.getsReadable()
      .then(lis => {
        if (lis) setSubjects(lis);
      })
      .catch(err => {
        console.log(err);
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
          return <SubjectList subject={sub} key={index} />;
        })}
        <Divider borderColor='gray.700' />
      </VStack>
      <EditButton />
    </>
  );
};

export default Home;
