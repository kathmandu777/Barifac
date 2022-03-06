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

import { DeleteIcon } from '@chakra-ui/icons';

import { SubjectCommentRepository } from 'repositories/SubjectCommentRepository';
import { SubjectComment } from 'domains';

export type SubjectCommentListProps = {
  subjectUuid: string;
  userUuid: string;
};

type SubjectCommentProps = {
  comment: SubjectComment;
  own: boolean;
  onDelete: VoidFunction;
} & StackProps;

const SubjectCommentList: React.FC<SubjectCommentListProps> = ({
  subjectUuid,
  userUuid,
}) => {
  const [subjectComments, setSubjectComments] = useState<SubjectComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getSubjectsComments = async () => {
    setLoading(true);
    try {
      const res = await SubjectCommentRepository.getsBySubject(subjectUuid);
      if (res) {
        setSubjectComments(res);
      }
    } catch (e) {
      setError('コメントの取得に失敗しました');
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const handleDeleteSubjectComment = async (uuid: string) => {
    try {
      await SubjectCommentRepository.delete(uuid);
      getSubjectsComments();
    } catch {
      setError('削除に失敗しました');
    }
  };

  useEffect(() => {
    getSubjectsComments();
  }, []);

  if (loading) {
    return <Spinner />;
  }
  return (
    <Box w='100%'>
      {error && <Text color='tomato'>{error}</Text>}
      {subjectComments.map(e => {
        return (
          <Box key={e.uuid}>
            <SubjectCommentElement
              onDelete={() => {
                handleDeleteSubjectComment(e.uuid);
              }}
              comment={e}
              own={e.user.uuid == userUuid}
            ></SubjectCommentElement>
            <Divider mb='10px' mt='10px' />
          </Box>
        );
      })}
    </Box>
  );
};

const SubjectCommentElement: React.FC<SubjectCommentProps> = ({
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

export default SubjectCommentList;
