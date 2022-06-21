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

import { useInView } from 'react-intersection-observer';

import {
  SubjectComment,
  SubjectCommentRepository,
} from 'temp/SubjectCommentRepository';

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
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { ref, inView } = useInView();

  const loadMore = async (page: number) => {
    setLoading(true);
    const res = await SubjectCommentRepository.getsBySubject(subjectUuid, page);
    if (!res) {
      setLoading(false);
      setError('コメントの取得に失敗しました');
      setHasMore(false);
      return;
    }
    setLoading(false);
    if (res.length === 0) {
      setHasMore(false);
    } else {
      setSubjectComments([...subjectComments, ...res]);
      setPage(current => current + 1);
    }
  };

  const handleDeleteSubjectComment = async (uuid: string) => {
    try {
      await SubjectCommentRepository.delete(uuid);
    } catch {
      setError('削除に失敗しました');
    }
  };
  useEffect(() => {
    if (inView && hasMore) {
      loadMore(page);
    }
  }, [inView]);

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
      {loading && <Spinner />}
      <div ref={ref}></div>
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
