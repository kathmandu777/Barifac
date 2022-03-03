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
import { DeleteIcon } from '@chakra-ui/icons';

import { useInView } from 'react-intersection-observer';

export type TeacherCommentListProps = {
  teacherUuid: string;
  userUuid: string;
};

type TeacherCommentProps = {
  comment: TeacherCommentElement;
  own: boolean;
  onDelete: VoidFunction;
} & StackProps;

const TeacherCommentList: React.FC<TeacherCommentListProps> = ({
  teacherUuid,
  userUuid,
}) => {
  const [teacherComments, setTeacherComments] = useState<
    TeacherCommentElement[]
  >([]);
  const [error, setError] = useState('');
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const { ref, inView } = useInView();
  const [page, setPage] = useState(1);

  const handleDeleteTeacherComment = async (uuid: string) => {
    try {
      await TeacherCommentRepository.delete(uuid);
    } catch {
      setError('削除に失敗しました');
    }
  };

  const loadMore = async (page: number) => {
    setLoading(true);
    const res = await TeacherCommentRepository.getsByTeacher(teacherUuid, page);
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
      setTeacherComments([...teacherComments, ...res]);
      setPage(current => current + 1);
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
      {loading && <Spinner />}
      <div ref={ref}></div>
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
