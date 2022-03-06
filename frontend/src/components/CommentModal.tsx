import React, { useEffect, useState } from 'react';
import {
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';

import { ChatIcon, EditIcon } from '@chakra-ui/icons';

import EditRequestList from './EditRequestList';
import TeacherCommentList from './TeacherCommentList';
import CommentSubmitForm, {
  CommentType,
  EditRequestType,
} from './CommentSubmitForm';
import { SubjectRepository } from 'repositories/SubjectRepository';
import SubjectCommentList from './SubjectCommentList';
import { SubjectCommentRepository } from 'temp/SubjectCommentRepository';
import { TeacherCommentRepository } from 'temp/TeacherCommentRepository';
import { EditRequestRepository } from 'temp/EditRequestRepository';
import { UserRepository } from 'repositories/UserRepository';

export type CommentModalProps = {
  subjectUuid: string;
  evaluations: { uuid: string; name: string }[];
};

const CommentModal: React.FC<CommentModalProps> = ({
  subjectUuid,
  evaluations,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [teacherUuid, setTeacherUuid] = useState('');
  const [userUuid, setUserUuid] = useState('');
  const [error, setError] = useState('');

  const getTeacherUuid = async () => {
    try {
      const res = await SubjectRepository.get(subjectUuid);
      if (!res) return;
      setTeacherUuid(res.teacher.uuid);
    } catch {}
  };
  const getUserUuid = async () => {
    try {
      const res = await UserRepository.getMe();
      if (!res) return;
      setUserUuid(res.uuid);
    } catch {}
  };
  useEffect(() => {
    getTeacherUuid();
    getUserUuid();
  }, []);

  const handleCommentSubmit = async (
    commentType: CommentType,
    comment: string,
    uuid: string,
  ) => {
    try {
      if (commentType == CommentType.SubjectComment) {
        await SubjectCommentRepository.create({
          comment: comment,
          subject_uuid: uuid,
        });
      } else {
        await TeacherCommentRepository.create({
          comment: comment,
          teacher_uuid: teacherUuid,
        });
      }
      onClose();
    } catch {
      setError('コメントの投稿に失敗しました');
      setTimeout(() => setError(''), 3000);
    }
  };
  const handleEditRequestSubmit = async (
    editRequstType: EditRequestType,
    comment: string,
    uuid: string,
  ) => {
    try {
      if (editRequstType == EditRequestType.Subject) {
        await EditRequestRepository.create({
          comment: comment,
          subject_uuid: uuid,
        });
      } else {
        await EditRequestRepository.create({
          comment: comment,
          evaluation_uuid: uuid,
        });
        onClose();
      }
    } catch {
      setError('コメントの投稿に失敗しました');
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <>
      <IconButton
        icon={<ChatIcon />}
        onClick={onOpen}
        colorScheme='blue'
        aria-label='Close Comment'
        mr={3}
        w='100%'
      >
        コメントを開く
      </IconButton>
      <Modal isOpen={isOpen} onClose={onClose} scrollBehavior='inside'>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            コメント
            {error && <Text color='tomato'>{error}</Text>}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Tabs variant='enclosed'>
              <TabList>
                <Tab>科目へ</Tab>
                <Tab>教員へ</Tab>
                <Tab>報告</Tab>
                <Tab>
                  <EditIcon />
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <SubjectCommentList
                    subjectUuid={subjectUuid}
                    userUuid={userUuid}
                  ></SubjectCommentList>
                </TabPanel>
                <TabPanel>
                  {teacherUuid && (
                    <TeacherCommentList
                      teacherUuid={teacherUuid}
                      userUuid={userUuid}
                    ></TeacherCommentList>
                  )}
                  {!teacherUuid && (
                    <Text color='tomato'>コメントの読み込みに失敗しました</Text>
                  )}
                </TabPanel>
                <TabPanel>
                  <EditRequestList
                    subjectUuid={subjectUuid}
                    userUuid={userUuid}
                    evaluationUuids={evaluations.map(e => e.uuid)}
                  ></EditRequestList>
                </TabPanel>
                <TabPanel>
                  <CommentSubmitForm
                    evaluations={evaluations}
                    subjectUuid={subjectUuid}
                    teacherUuid={teacherUuid}
                    onCommentSubmit={handleCommentSubmit}
                    onEditRequestSubmit={handleEditRequestSubmit}
                  />
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default CommentModal;
