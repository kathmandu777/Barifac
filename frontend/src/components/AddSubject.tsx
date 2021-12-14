import React from 'react';
import { AddIcon } from '@chakra-ui/icons';
import {
  FormControl,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormLabel,
  Select,
  ModalFooter,
} from '@chakra-ui/react';
import SubjectList, { SubjectListProps } from './SubjectList';
import { Dispatch, SetStateAction } from 'react';
import { SelectProps } from '@chakra-ui/react';

export const ALLSUBJECTS: SubjectListProps[] = [
  {
    subjectID: '101001',
    subjectName: '微分方程式',
    score: 0,
  },
  {
    subjectID: '102024',
    subjectName: '国語IIA',
    score: 0,
  },
  {
    subjectID: '105007',
    subjectName: 'コンピュータアーキテクチャ',
    score: 0,
  },
  {
    subjectID: '101003',
    subjectName: '歴史',
    score: 0,
  },
  {
    subjectID: '103019',
    subjectName: '上級Cプログラミング',
    score: 0,
  },
  {
    subjectID: '104022',
    subjectName: '数理工学演習',
    score: 0,
  },
  {
    subjectID: '105011',
    subjectName: '科学英語基礎',
    score: 0,
  },
  {
    subjectID: '109000',
    subjectName: '電気回路II',
    score: 0,
  },
];

export type AddSubjectProps = {
  list: SubjectListProps[];
  hook: Dispatch<SetStateAction<SubjectListProps[]>>;
};

const AddSubject: React.FC<AddSubjectProps> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef<HTMLSelectElement>(null);
  const finalRef = React.useRef(null);
  const onAdd = () => {
    const tempList = props.list.slice(0, props.list.length);
    const pushedSubject: SubjectListProps = {
      subjectID: initialRef.current!.accessKey,
      subjectName: initialRef.current!.value,
      score: 0,
    };
    tempList.push(pushedSubject);
    props.hook(tempList);
  };
  return (
    <>
      <AddIcon w={7} h={7} color='gray.600' onClick={onOpen} />

      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>履修科目追加</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Select ref={initialRef}>
                {ALLSUBJECTS.map(sub => {
                  return <option key={sub.subjectID}>{sub.subjectName}</option>;
                })}
              </Select>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} rounded='full'>
              戻る
            </Button>
            <Button
              bg='blue.400'
              color='gray.800'
              onClick={onAdd}
              ml={3}
              rounded='full'
            >
              追加する!
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
export default AddSubject;
