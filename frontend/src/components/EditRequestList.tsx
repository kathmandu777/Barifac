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

import { EditRequest, EditRequestRepository } from 'temp/EditRequestRepository';

export type EditRequestListProps = {
  subjectUuid: string;
  evaluationUuids: string[];
};

type EditRequestProps = {
  comment: EditRequest;
} & StackProps;

const EditRequestList: React.FC<EditRequestListProps> = ({
  subjectUuid,
  evaluationUuids,
}) => {
  const [editRequests, setEditRequests] = useState<EditRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getEditRequests = async () => {
    setLoading(true);
    const tmp: EditRequest[] = [];
    try {
      const res = await EditRequestRepository.getsBySubject(subjectUuid);
      if (res) {
        console.log(res);
        tmp.push(...res);
      }
    } catch (e) {
      setError('コメントの取得に失敗しました');
      setLoading(false);
      return;
    }

    try {
      for (const i in evaluationUuids) {
        console.log(evaluationUuids[i]);
        const res = await EditRequestRepository.getsByEvaluation(
          evaluationUuids[i],
        );
        if (res) {
          console.log(res);
          tmp.push(...res);
        }
      }
    } catch {
      setError('データの取得に失敗しました');
      setLoading(false);
      return;
    }
    setEditRequests([...tmp]);
    setLoading(false);
  };

  useEffect(() => {
    getEditRequests();
  }, []);
  if (loading) {
    return <Spinner />;
  }
  return (
    <Box w='100%'>
      {error && <Text color='tomato'>{error}</Text>}
      {editRequests.map(e => {
        return (
          <Box key={e.uuid}>
            <EditRequestElement comment={e}></EditRequestElement>
            <Divider mb='10px' mt='10px' />
          </Box>
        );
      })}
    </Box>
  );
};

const EditRequestElement: React.FC<EditRequestProps> = ({
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
      {comment.evaluation && (
        <Text color='whiteAlpha.800' fontSize='xs'>
          評価割合({comment.evaluation.name})へのリクエスト
        </Text>
      )}
      {comment.subject && (
        <Text fontSize='xs' color='whiteAlpha.800'>
          教科へのリクエスト
        </Text>
      )}
    </Stack>
  );
};

export default EditRequestList;
