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

import { TeacherCommentRepository } from 'repositories/TeacherCommentRepository';
import { TeacherComment } from 'domains';
import { DeleteIcon } from '@chakra-ui/icons';

export type TeacherCommentListProps = {
  teacherUuid: string;
  userUuid: string;
};

type TeacherCommentProps = {
  comment: TeacherComment;
  own: boolean;
  onDelete: VoidFunction;
} & StackProps;

const TeacherCommentList: React.FC<TeacherCommentListProps> = ({
  teacherUuid,
  userUuid,
}) => {
  const [teacherComments, setTeacherComments] = useState<TeacherComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleDeleteTeacherComment = async (uuid: string) => {
    try {
      await TeacherCommentRepository.delete(uuid);
      getTeacherComments();
    } catch {
      setError('削除に失敗しました');
    }
  };

  const getTeacherComments = async () => {
    setLoading(true);
    try {
      const res = await TeacherCommentRepository.getsByTeacher(teacherUuid);
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
        return (
          <Box key={e.uuid}>
            <TeacherCommentElement
              comment={e}
              own={e.user.uuid == userUuid}
              onDelete={() => {
                handleDeleteTeacherComment(e.uuid);
              }}
            ></TeacherCommentElement>
            <Divider mb='10px' mt='10px' />
          </Box>
        );
      })}
    </Box>
  );
};

const TeacherCommentElement: React.FC<TeacherCommentProps> = ({
  comment,
  own,
  onDelete,
  ...props
}) => {
  return (
    <Stack borderRadius='sm' borderColor='whiteAlpha.900' {...props}>
      <Stack alignItems='center' direction='row'>
        <Avatar size='xs' />
        <Text fontWeight='semibold'>{comment.user.username}</Text>
        {own && <DeleteIcon onClick={onDelete} />}
      </Stack>
      <Text>{comment.comment}</Text>
    </Stack>
  );
};

export default TeacherCommentList;
