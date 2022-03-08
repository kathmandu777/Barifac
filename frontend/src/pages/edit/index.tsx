import React from 'react';
import Link from 'next/link';
import {
  VStack,
  Divider,
  Heading,
  Center,
  Button,
  Text,
} from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import SubjectNameList from '../../components/SubjectNameList';
import { useState, useEffect } from 'react';
import AddSubject from '../../components/AddSubject';
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
} from 'repositories';
import {
  defaultTargetValue,
  defaultTargetScore,
} from '../../components/AddSubject';

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
      let year = today.getFullYear() + 1;
      const month = today.getMonth();
      let semester;
      if (4 <= month && month <= 9) {
        semester = '前期';
      } else {
        semester = '後期';
      }
      if (semester === '後期' && 1 <= month) {
        // year を年度にする
        year--;
      }
      const termRepo = await TermRepository.gets(year, semester);
      if (termRepo === undefined || termRepo!.length === 0) {
        throw new Error('Cannot get term infomation!');
      }
      //setTerm(termRepo);

      // 学年毎の開講科目の取得
      const category = ['一般', '専門'];
      const subjectRepos: SubjectInterface[][] = [];
      for (let i = 1; i <= 5; i++) {
        let oneGradeSubjectRepo: SubjectInterface[] = [];
        for (let j = 0; j < 2; j++) {
          const tempSubjectRepo = await SubjectRepository.gets(
            userRepo.school.uuid,
            userRepo.department.uuid,
            termRepo[0].uuid,
            category[j],
            i,
          );
          if (tempSubjectRepo === undefined || tempSubjectRepo === null) {
            throw new Error('Cannot get subjects');
          }
          oneGradeSubjectRepo = oneGradeSubjectRepo.concat(tempSubjectRepo!);
        }
        subjectRepos.push(oneGradeSubjectRepo);
      }
      if (subjectRepos === undefined || subjectRepos!.length === 0) {
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
      if (attendSubjectRepo === undefined || attendSubjectRepo.length === 0) {
        throw new Error('Cannot get attend subject infomation!');
      }
      setSubject(attendSubjectRepo);
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
  //const [currentTerm, setTerm] = useState<TermInterface[]>([]);
  const [allSubject, setAllSubject] = useState<SubjectInterface[][]>([]);
  const [errMsg, setErr] = useState<string>('');

  const [editedSubject, setSubject] = useState<
    AttendSubjectReadableInterface[]
  >([]);

  const addAllSubject = () => {
    for (const s of allSubject[userInfo!.grade]) {
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
          <Heading as='h2' size='md' color='white' mt='20%' mr='4em'>
            <Link href={`/`}>
              <ArrowBackIcon w={5} h={5} color='white' boxSize='2em' mr='2em' />
            </Link>
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
