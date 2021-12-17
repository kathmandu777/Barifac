import React, { useEffect, useState } from 'react';

import {
  Avatar,
  Box,
  Divider,
  Spinner,
  Stack,
  StackProps,
  Text,
} from '@chakra-ui/react';

import {
  TeacherComment as TeacherCommentElement,
  TeacherCommentRepository,
} from 'temp/TeacherCommentRepository';

export type TeacherCommentListProps = {
  teacherUuid: string;
};

type TeacherCommentProps = {
  comment: TeacherCommentElement;
} & StackProps;

const TeacherCommentList: React.FC<TeacherCommentListProps> = ({
  teacherUuid,
}) => {
  const [teacherComments, setTeacherComments] = useState<
    TeacherCommentElement[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getTeacherComments = async () => {
    setLoading(true);
    try {
      const res = await TeacherCommentRepository.getsByTeacher(teacherUuid);
      console.log('teacher', res);
      if (res) {
        setTeacherComments(res);
      }
    } catch (e) {
      setError('コメントの取得に失敗しました');
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  useEffect(() => {
    getTeacherComments();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Box w='100%'>
      {error && <Text color='tomato'>{error}</Text>}
      {teacherComments.map(e => {
        console.log(e);
        return (
          <Box key={e.uuid}>
            <TeacherCommentElement comment={e}></TeacherCommentElement>
            <Divider mb='10px' mt='10px' />
          </Box>
        );
      })}
    </Box>
  );
};

const TeacherCommentElement: React.FC<TeacherCommentProps> = ({
  comment,
  ...props
}) => {
  return (
    <Stack borderRadius='sm' borderColor='whiteAlpha.900' {...props}>
      <Stack alignItems='center' direction='row'>
        <Avatar size='xs' />
        <Text fontWeight='semibold'>{comment.user.username}</Text>
      </Stack>
      <Text>{comment.comment}</Text>
    </Stack>
  );
};

export default TeacherCommentList;
