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
import { Dispatch, SetStateAction } from 'react';
import { GRADELIST } from '../pages/edit';
import { SubjectInterface } from 'repositories';
import { AttendSubjectReadableRepository } from 'repositories/AttendSubjectReadableRepository';

export type AddSubjectProps = {
  gotlist: SubjectInterface[][];
  //list: AttendSubjectReadableInterface[];
  flag: boolean;
  hook: Dispatch<SetStateAction<boolean>>;
  update: () => Promise<void>;
};

export const defaultTargetValue = 'A';
export const defaultTargetScore = 80;

const AddSubject: React.FC<AddSubjectProps> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef<HTMLSelectElement>(null);
  const finalRef = React.useRef(null);

  const onAdd = () => {
    const subjectRepo = AttendSubjectReadableRepository.create({
      target_value: defaultTargetValue,
      target_score: defaultTargetScore,
      subject_uuid: initialRef.current!.value,
    });
    if (subjectRepo == undefined) {
      // TODO: アラート
      console.log('科目を追加できませんでした');
    } else {
      props.hook(!props.flag);
    }
  };

  const initialRef2 = React.useRef<HTMLSelectElement>(null);
  const [selectedGrade, changeGrade] = React.useState(0);
  const getGrade = () => {
    changeGrade(initialRef2.current ? Number(initialRef2.current!.value) : 0);
  };
  //const buttonFlag = () => {
  //  let l = initialRef.current ? initialRef.current!.value : "['','']";
  //  return l.split(',').length == 1;
  //};
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
            <FormControl mb={6}>
              <FormLabel>学年</FormLabel>
              <Select ref={initialRef2} onChange={getGrade}>
                {GRADELIST.map((grade: number) => {
                  return (
                    <option key={grade - 1} value={grade - 1}>
                      {grade}年
                    </option>
                  );
                })}
              </Select>
            </FormControl>
            <FormControl>
              <FormLabel>科目</FormLabel>
              <Select ref={initialRef}>
                {props.gotlist[selectedGrade].map(sub => {
                  return (
                    <option key={sub.uuid} value={sub.uuid}>
                      {sub.name} ({sub.teacher.name})
                    </option>
                  );
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
              //isDisabled={buttonFlag()}
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
