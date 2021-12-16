import React, { useState, useEffect, useMemo } from 'react';
import {
  Button,
  CircularProgress,
  CircularProgressLabel,
  Container,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Spinner,
  Select,
  Text,
  useBreakpointValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react';

import { ArrowUpIcon, ArrowDownIcon } from '@chakra-ui/icons';

import {
  ReadableAttendSubject,
  AttendSubjectRepository,
  UpdateAttendSubjectRequest,
} from 'temp/AttendSubjectRepository';
import { useRouter } from 'next/router';
import EvaluationSlider from 'components/EvaluationSlider';
import { SessionService } from 'services/SessionService';

interface SliderValues {
  evaluationUuid: string;
  value: number;
  name: string;
  rate: number;
}

const ScoreShow = () => {
  const fetchData = async () => {
    if (!SessionService.isLoggedin()) {
      alert('ログインし直してください');
      return router.push('/login');
    }
  };
  useEffect(() => {
    fetchData;
  }, []);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const circularProgressSize = useBreakpointValue({
    base: '50vw',
    md: '14vw',
  });

  const router = useRouter();
  const uuid = router.query.uuid as string;

  const [attendSubject, setAttendSubject] = useState<ReadableAttendSubject>();
  const [targetScore, setTargetScore] = useState(0);
  const [targetValue, setTargetValue] = useState('A');
  const [sliderValues, setSliderValues] = useState<SliderValues[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const getAttendSubject = async () => {
    if (!uuid) return;
    setLoading(true);
    try {
      const res = await AttendSubjectRepository.getReadable(uuid);
      if (!res) return;
      setTargetScore(res.target_score);
      setTargetValue(res.target_value);
      setAttendSubject(res);
      setSliderValues(
        res.evaluations.map(e => {
          const maxSum = e.scores.reduce((p, c) => p + c.max_score, 0);
          const gotSum = e.scores.reduce((p, c) => p + c.got_score, 0);
          const val = maxSum != 0 ? (gotSum / maxSum) * 100 : 0;
          return {
            evaluationUuid: e.evaluation_uuid,
            value: val,
            name: e.evaluation_name,
            rate: e.rate,
          };
        }),
      );
      setLoading(false);
    } catch (_) {
      setLoading(false);
      setError('データの取得に失敗しました');
    }
  };

  const totalScore = useMemo(() => {
    return sliderValues.reduce((p, c) => {
      if (c.rate === 0) {
        return p + 0;
      }
      return p + (c.value / 100) * c.rate;
    }, 0);
  }, [sliderValues]);

  useEffect(() => {
    if (!uuid) return;
    getAttendSubject();
  }, [uuid]);

  const handleSliderChange = (index: number, value: number) => {
    console.log('value changed', index, value);
    setSliderValues(
      sliderValues.map((e, i) => {
        if (i == index) {
          return {
            ...e,
            value: value,
          };
        }
        return e;
      }),
    );
  };

  const handleAttendSubjectUpdate = async () => {
    if (attendSubject) {
      const req: UpdateAttendSubjectRequest = {
        subject_uuid: attendSubject.subject_uuid,
        target_value: targetValue,
        target_score: targetScore,
      };
      console.log(req);
      try {
        const res = await AttendSubjectRepository.update(uuid, req);
        if (!res) {
          setError('データの更新に失敗しました');
        }
      } catch (_) {
        setError('データの更新に失敗しました');
      }
    }
  };

  if (loading || !attendSubject) {
    return <Spinner />;
  }

  return (
    <Container w='80vw'>
      {attendSubject && (
        <VStack pt='10vh' pb='5vh' spacing={10}>
          {error && <Text color='tomato'>{error}</Text>}
          <Flex justifyContent='space-between' w='full'>
            <Heading color='whiteAlpha.900' fontWeight='semibold' size='xl'>
              {attendSubject.subject_name}
            </Heading>
            <Button onClick={onOpen}>{targetValue}</Button>
          </Flex>
          <CircularProgress size={circularProgressSize} value={totalScore}>
            <CircularProgressLabel fontSize='md' color='whiteAlpha.900'>
              {totalScore >= targetScore ? <ArrowUpIcon /> : <ArrowDownIcon />}
              {targetValue}
              <Text>{Math.round(totalScore)}%</Text>
            </CircularProgressLabel>
          </CircularProgress>
          {sliderValues.map((e, i) => {
            return (
              <EvaluationSlider
                evaluationUuid={e.evaluationUuid}
                key={e.evaluationUuid}
                name={e.name}
                onChange={v => {
                  handleSliderChange(i, v);
                }}
                rate={e.rate}
                score={e.value}
              />
            );
          })}
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>目標評価を設定</ModalHeader>
              <ModalCloseButton />
              <ModalBody pb={6}>
                <FormControl>
                  <FormLabel>目標評価</FormLabel>
                  <Select
                    color='whiteAlpha.800'
                    defaultValue={targetValue}
                    onChange={({ target }) => {
                      setTargetValue(target.value);
                      console.log(targetValue);
                    }}
                    w='4em'
                  >
                    <option value={'A'}>A</option>
                    <option value={'B'}>B</option>
                    <option value={'C'}>C</option>
                  </Select>
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>評価基準</FormLabel>
                  <Input
                    defaultValue={targetScore}
                    type='number'
                    onChange={({ target }) => {
                      const newScore = Number(target.value);
                      if (0 <= newScore && newScore <= 100) {
                        setTargetScore(newScore);
                      }
                    }}
                  />
                </FormControl>
              </ModalBody>

              <ModalFooter>
                <Button
                  colorScheme='blue'
                  mr={3}
                  onClick={() => {
                    onClose();
                    handleAttendSubjectUpdate();
                  }}
                >
                  保存する
                </Button>
                <Button onClick={onClose}>キャンセル</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </VStack>
      )}
    </Container>
  );
};

export default ScoreShow;
