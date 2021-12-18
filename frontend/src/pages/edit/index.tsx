import React from 'react';
import {
  VStack,
  Divider,
  Heading,
  Center,
  Flex,
  Button,
  Spacer,
  Link,
  Text,
} from '@chakra-ui/react';
import SubjectNameList from '../../components/SubjectNameList';
import { useRef, useState, useEffect } from 'react';
import { AddIcon } from '@chakra-ui/icons';
import AddSubject from '../../components/AddSubject';
import { SubjectListProps } from '../../components/SubjectList';
import {
  AttendSubjectReadableRepository,
  AttendSubjectReadableInterface,
} from 'repositories/AttendSubjectReadableRepository';
import {
  UserRepository,
  UserInterface,
  SubjectRepository,
  SubjectInterface,
  TermRepository,
  TermInterface,
} from 'repositories';
import {
  defaultTargetValue,
  defaultTargetScore,
} from '../../components/AddSubject';
import { Dispatch } from 'react';

export const GRADELIST = [1, 2, 3, 4, 5];

const Edit = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [isUpdating, setUpdate] = useState<boolean>(false);

  const getAllSubject = async () => {
    try {
      // ユーザ情報の取得
      const userRepo = await UserRepository.getMe();
      if (userRepo === undefined) {
        throw new Error('Cannot get user infomation!');
      }
      setUser(userRepo);

      // term の取得
      const today = new Date();
      const year = today.getFullYear();
      const month = today.getMonth();
      let semester;
      if (4 <= month && month <= 9) {
        semester = '前期';
      } else {
        semester = '後期';
      }
      const termRepo = await TermRepository.gets(year, semester);
      if (termRepo === undefined) {
        throw new Error('Cannot get term infomation!');
      }
      setTerm(termRepo);

      // 学年毎の開講科目の取得
      const subjectRepos: SubjectInterface[][] = [];
      for (let i = 1; i <= 5; i++) {
        const subjectRepo = await SubjectRepository.gets(
          userRepo.school.uuid,
          userRepo.department.uuid,
          termRepo[0].uuid,
          i,
        );
        if (subjectRepo === undefined) {
          throw new Error('Cannot get subject infomation!');
        }
        subjectRepos.push(subjectRepo);
      }
      if (subjectRepos === undefined) {
        throw new Error('Cannot get subjects information!');
      }
      setAllSubject(subjectRepos);
      setErr('');
      setLoading(false);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      }
    }
  };

  useEffect(() => {
    getAllSubject();
  }, []);

  //  useEffect(() => {
  //    AttendSubjectReadableRepository.gets()
  //      .then(lis => {
  //        setSubject(lis);
  //      })
  //      .catch(err => {
  //        setSubject([]);
  //      });
  //  }, []);

  useEffect(() => {
    getAttendSubject();
  }, []);

  // 履修科目一覧の取得
  const getAttendSubject = async () => {
    try {
      const attendSubjectRepo = await AttendSubjectReadableRepository.gets();
      if (attendSubjectRepo === undefined) {
        throw new Error('Cannot get attend subject infomation!');
      }
    } catch (e: unknown) {
      if (e instanceof Error) {
        setErr(e.message);
      }
    }
  };

  useEffect(() => {
    getAttendSubject();
  }, [isUpdating]);

  const [userInfo, setUser] = useState<UserInterface>();
  const [currentTerm, setTerm] = useState<TermInterface[]>([]);
  const [allSubject, setAllSubject] = useState<SubjectInterface[][]>([]);
  const [errMsg, setErr] = useState<string>('');

  const [editedSubject, setSubject] = useState<
    AttendSubjectReadableInterface[]
  >([]);

  const addAllSubject = () => {
    for (const s of allSubject[userInfo!.grade - 1]) {
      const subjectRepo = AttendSubjectReadableRepository.create({
        target_value: defaultTargetValue,
        target_score: defaultTargetScore,
        subject_uuid: s.uuid,
      });
      if (subjectRepo == undefined) {
        // TODO: アラート
        console.log('科目を追加できませんでした');
      }
    }
    setUpdate(!isUpdating);
  };

  if (loading === false) {
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
                subjectName={sub.subject_name}
                flag={isUpdating}
                hook={setUpdate}
                uuid={sub.uuid}
                key={index}
              />
            );
          })}
          <Divider borderColor='gray.700' />
          <Center w='100%'>
            <AddSubject
              gotlist={allSubject}
              flag={isUpdating}
              hook={setUpdate}
              update={getAllSubject}
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
        </VStack>
      </>
    );
  } else if (errMsg != '') {
    return <Text color='white'>{errMsg}</Text>;
  } else if (loading == true) {
    return <Text color='white'>Now, Loading...</Text>;
  }
};

export default Edit;
