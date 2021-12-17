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
  SubjectComment,
  SubjectCommentRepository,
} from 'temp/SubjectCommentRepository';

export type SubjectCommentListProps = {
  subjectUuid: string;
};

type SubjectCommentProps = {
  comment: SubjectComment;
} & StackProps;

const SubjectCommentList: React.FC<SubjectCommentListProps> = ({
  subjectUuid,
}) => {
  const [subjectComments, setSubjectComments] = useState<SubjectComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getSubjectsComments = async () => {
    setLoading(true);
    try {
      const res = await SubjectCommentRepository.getsBySubject(subjectUuid);
      console.log('subject', res);
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
        console.log(e);
        return (
          <Box key={e.uuid}>
            <SubjectCommentElement comment={e}></SubjectCommentElement>
            <Divider mb='10px' mt='10px' />
          </Box>
        );
      })}
    </Box>
  );
};

const SubjectCommentElement: React.FC<SubjectCommentProps> = ({
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

export default SubjectCommentList;
