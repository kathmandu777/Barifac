import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Input,
  Spacer,
  Text,
  VStack,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { SessionService } from 'services/SessionService';
import { useRouter } from 'next/router';
import {
  ScoreCreateRequest,
  ScoreRepository,
  ScoreUpdateRequest,
  UserRepository,
} from 'repositories';
import { AttendSubject, Score, ScoreEvalResponse } from 'domains';

const SCORE_EDIT_DATA = {
  name: '微分方程式 小テスト',
  scores: [
    {
      maxScore: 100,
      gotScore: 70,
    },
    {
      maxScore: 50,
      gotScore: 45,
    },
  ],
};

const ScoreEdit = () => {
  const [scores, setScores] = useState<ScoreUpdateRequest[]>();
  const [scoreCreateRequest, setScoreCreateRequest] =
    useState<ScoreCreateRequest>();
  const [scoreUpdateRequest, setScoreUpdateRequest] =
    useState<ScoreUpdateRequest[]>();
  const [attendSubjectUUID, setAttendSubjectUUID] = useState<string>();
  const [evaluationUUID, setEvaluationUUID] = useState<string>();
  const [scoresByEval, setScoresByEval] = useState<ScoreEvalResponse>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { uuid } = router.query;

  const fetchData = async () => {
    const user = await UserRepository.getMe();
    if (!SessionService.isLoggedin() || !user) {
      alert('ログインし直してください');
      return router.push('/login');
    }
    if (!uuid) {
      return;
    }
    const scores = await ScoreRepository.getsByEvaluation(uuid as string);
    if (!scores) {
      return;
    }
    setScoresByEval(scores);
  };
  useEffect(() => {
    async () => {
      const user = await UserRepository.getMe();
      if (!SessionService.isLoggedin() || !user) {
        alert('ログインし直してください');
        return router.push('/login');
      }
    };
    uuid && fetchData();
  }, [uuid]);

  const handleAddScore = () => {
    const score = {
      max_score: 0,
      got_score: 0,
      memo: null,
    };
    if (!scores) return;
  };

  const handleDeleteScore = (index: number) => {
    if (!scores) return;
    setScores(
      scores.filter((_, i) => {
        return i != index;
      }),
    );
  };

  if (!scoresByEval) return null;
  return (
    <>
      {!uuid ? (
        <Spinner />
      ) : (
        <Container w='80vw'>
          <AddScoreModal
            isOpen={isOpen}
            onClose={onClose}
            onClick={handleAddScore}
          />
          <VStack pt='14vh' pb='5vh' spacing={10} w='full'>
            <Heading color='whiteAlpha.900' fontSize='2xl'>
              {scoresByEval.evaluationName}
            </Heading>
            <VStack w='full'>
              {scoresByEval.scores.map((score, i) => {
                console.log(score.got_score, i);
                return (
                  <ScoreRow
                    gotScore={score.got_score}
                    index={i}
                    key={i}
                    maxScore={score.max_score}
                    onDelete={() => {
                      handleDeleteScore(i);
                    }}
                  />
                );
              })}
            </VStack>
            <Divider />
            <Button
              bg='blue.400'
              color='gray.800'
              colorScheme={'blue'}
              onClick={onOpen}
              rounded='full'
              w='full'
              _hover={{
                bg: 'blue.300',
              }}
            >
              追加する
            </Button>
            <Spacer />
            <Flex justifyContent='space-between' w='full'>
              <Button bg='blue.400' color='gray.800' rounded='full'>
                保存する
              </Button>
              <Button bg='whiteAlpha.200' color='whiteAlpha.800' rounded='full'>
                キャンセル
              </Button>
            </Flex>
          </VStack>
        </Container>
      )}
    </>
  );
};

type ScoreRowProps = {
  index: number;
  gotScore: number;
  maxScore: number;
  onDelete: VoidFunction;
};

const ScoreRow: React.FC<ScoreRowProps> = ({
  index,
  gotScore,
  maxScore,
  onDelete,
}) => {
  return (
    <Flex w='full' justifyContent='space-between'>
      <Flex>
        <Text color='whiteAlpha.900' lineHeight='full' w='2em'>
          {index}.
        </Text>
        <Input
          w='5rem'
          bg='white'
          color='black'
          defaultValue={gotScore}
          type='number'
        ></Input>
      </Flex>
      <Flex>
        <Input
          w='5rem'
          bg='white'
          color='black'
          defaultValue={maxScore}
          type='number'
        ></Input>
        <Button
          bg='whiteAlpha.200'
          color='whiteAlpha.800'
          rounded='full'
          ml={2}
          mr={2}
          onClick={onDelete}
        >
          削除
        </Button>
      </Flex>
    </Flex>
  );
};

type AddScoreModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onClick: () => void;
};

const AddScoreModal: React.FC<AddScoreModalProps> = ({
  isOpen,
  onClose,
  onClick,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>点数の追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex>
            <Input
              w='5rem'
              bg='white'
              color='black'
              placeholder='点数'
              type='number'
            ></Input>
            <Input
              w='5rem'
              bg='white'
              color='black'
              placeholder='満点'
              type='number'
            ></Input>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            bg='blue.400'
            color='gray.800'
            colorScheme={'blue'}
            onClick={onClick}
            rounded='full'
            _hover={{
              bg: 'blue.300',
            }}
          >
            追加
          </Button>
          <Button onClick={onClose} rounded='full'>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScoreEdit;
