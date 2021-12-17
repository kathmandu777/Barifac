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
import { DeleteIcon } from '@chakra-ui/icons';

export type EditRequestListProps = {
  subjectUuid: string;
  evaluationUuids: string[];
  userUuid: string;
};

type EditRequestProps = {
  comment: EditRequest;
  own: boolean;
  onDelete: VoidFunction;
} & StackProps;

const EditRequestList: React.FC<EditRequestListProps> = ({
  subjectUuid,
  evaluationUuids,
  userUuid,
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
        tmp.push(...res);
      }
    } catch (e) {
      setError('コメントの取得に失敗しました');
      setLoading(false);
      return;
    }

    try {
      for (const i in evaluationUuids) {
        const res = await EditRequestRepository.getsByEvaluation(
          evaluationUuids[i],
        );
        if (res) {
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

  const handleDeleteEditRequest = async (uuid: string) => {
    try {
      await EditRequestRepository.delete(uuid);
      getEditRequests();
    } catch {
      setError('削除に失敗しました');
    }
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
            <EditRequestElement
              comment={e}
              own={userUuid == e.user.uuid}
              onDelete={() => {
                handleDeleteEditRequest(e.uuid);
              }}
            ></EditRequestElement>
            <Divider mb='10px' mt='10px' />
          </Box>
        );
      })}
    </Box>
  );
};

const EditRequestElement: React.FC<EditRequestProps> = ({
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
