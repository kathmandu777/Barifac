import React, { useEffect, useState } from 'react';
import {
  Button,
  Container,
  Divider,
  Flex,
  Heading,
  Spacer,
  Text,
  VStack,
  Spinner,
} from '@chakra-ui/react';
import { useDisclosure } from '@chakra-ui/hooks';
import { SessionService } from 'services/SessionService';
import { useRouter } from 'next/router';
import { ScoreRepository, UserRepository } from 'repositories';
import {
  ScoreCreateRequestFactory,
  ScoreCreateRequestObject,
  ScoreEval,
  ScoreEvalResponse,
  ScoreUpdateRequest,
  ScoreUpdateRequestFactory,
  ScoreUpdateRequestObject,
} from 'domains';
import { AddScoreModal } from 'components/AddScoreModal';
import { ScoreRow } from 'components/ScoreRow';

const ScoreEdit = () => {
  // 良くない
  const [scoreCreateRequest, setScoreCreateRequest] =
    useState<ScoreCreateRequestObject>(ScoreCreateRequestFactory.createEmpty());
  const [scoreUpdateRequest, setScoreUpdateRequest] =
    useState<ScoreUpdateRequestObject[]>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [scoresByEval, setScoresByEval] = useState<ScoreEvalResponse>();
  const [loading, setLoading] = useState<boolean>(false);
  //const [willDeleteIndex, setWillDeleteIndex] = useState<number>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const { uuid } = router.query;

  const [update, setUpdate] = useState<boolean>(false);
  const updateRendering = () => {
    setUpdate(!update);
  };

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
    setScoreCreateRequest({
      ...scoreCreateRequest,
      evaluation_uuid: scores.evaluationUUID,
      attend_subject_uuid: scores.attendSubjectUUID,
    });
    setScoreUpdateRequest(
      scores.scores.map<ScoreUpdateRequest>(
        (score: ScoreEval): ScoreUpdateRequest => {
          return ScoreUpdateRequestFactory.createFromResponseObject({
            uuid: score.score_uuid,
            got_score: score.got_score,
            max_score: score.max_score,
            memo: score.memo,
            attend_subject_uuid: scores.attendSubjectUUID,
            evaluation_uuid: scores.evaluationUUID,
          });
        },
      ),
    );
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
  }, [uuid, update]);

  // Generics とか使える？
  const handleMaxScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScoreCreateRequest({
      ...scoreCreateRequest,
      max_score: Number(e.target.value),
    });
  };

  const handleGotScoreChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScoreCreateRequest({
      ...scoreCreateRequest,
      got_score: Number(e.target.value),
    });
  };

  const handleMaxScoresChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!scoreUpdateRequest) return;
    setScoreUpdateRequest(
      scoreUpdateRequest.map<ScoreUpdateRequest>(
        (score: ScoreUpdateRequest, i: number): ScoreUpdateRequest => {
          if (index == i) {
            return { ...score, max_score: Number(e.target.value) };
          }
          return score;
        },
      ),
    );
  };

  const handleGotScoresChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    if (!scoreUpdateRequest) return;
    setScoreUpdateRequest(
      scoreUpdateRequest.map<ScoreUpdateRequest>(
        (score: ScoreUpdateRequest, i: number): ScoreUpdateRequest => {
          if (index == i) {
            return { ...score, got_score: Number(e.target.value) };
          }
          return score;
        },
      ),
    );
  };

  const handleAddScore = async () => {
    try {
      setIsSubmitting(true);
      await ScoreRepository.create(scoreCreateRequest);
      setIsSubmitting(false);

      onClose();
      // あんま良くないかも
      updateRendering();
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const handleDeleteScore = async (index: number) => {
    if (!scoreUpdateRequest) return;
    try {
      const willDeleteScore = scoreUpdateRequest.filter((_, i) => {
        return i === index;
      });
      console.log(willDeleteScore);
      await ScoreRepository.delete(willDeleteScore[0].uuid);
      updateRendering();
    } catch (e) {
      console.error(e);
      return;
    }
  };

  const handleUpdateScores = async () => {
    if (!scoreUpdateRequest) return;
    try {
      setLoading(true);
      setIsSubmitting(true);
      await Promise.all(
        scoreUpdateRequest.map(async score => {
          return await ScoreRepository.update(score);
        }),
      );
      setIsSubmitting(false);
      setLoading(false);
      updateRendering();
    } catch (e) {
      console.error(e);
      return;
    }
  };

  if (!scoresByEval) return null;
  if (loading) return <Spinner />;
  return (
    <>
      {!uuid ? (
        <Spinner />
      ) : (
        <Container w='80vw'>
          <AddScoreModal
            isDisabled={isSubmitting}
            isOpen={isOpen}
            onClose={onClose}
            onClick={handleAddScore}
            onChangeGotScore={handleGotScoreChange}
            onChangeMaxScore={handleMaxScoreChange}
          />
          <VStack pt='14vh' pb='5vh' spacing={10} w='full'>
            <Heading color='whiteAlpha.900' fontSize='2xl'>
              <Text textAlign='center'>{scoresByEval.subjectName}</Text>
              <Text textAlign='center'>{scoresByEval.evaluationName}</Text>
            </Heading>
            <VStack w='full'>
              {scoreUpdateRequest &&
                scoreUpdateRequest.map((score, i) => {
                  console.log(score.got_score, i);
                  return (
                    <ScoreRow
                      gotScore={score.got_score}
                      index={i}
                      key={score.uuid}
                      maxScore={score.max_score}
                      onDelete={() => {
                        handleDeleteScore(i);
                      }}
                      // onPressModal={() => {
                      //   setWillDeleteIndex(i);
                      // }}
                      onChangeMaxScore={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        handleMaxScoresChange(i, e);
                      }}
                      onChangeGotScore={(
                        e: React.ChangeEvent<HTMLInputElement>,
                      ) => {
                        handleGotScoresChange(i, e);
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
              <Button
                bg='blue.400'
                color='gray.800'
                rounded='full'
                onClick={handleUpdateScores}
              >
                保存する
              </Button>
              <Button
                bg='whiteAlpha.200'
                color='whiteAlpha.800'
                rounded='full'
                onClick={() =>
                  router.push(`/score_show/${scoresByEval.attendSubjectUUID}`)
                }
              >
                キャンセル
              </Button>
            </Flex>
          </VStack>
        </Container>
      )}
    </>
  );
};

export default ScoreEdit;
