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
import { GRADELIST } from '../pages/edit';

export type AddSubjectProps = {
  gotlist: SubjectListProps[][];
  list: SubjectListProps[];
  hook: Dispatch<SetStateAction<SubjectListProps[]>>;
};

const AddSubject: React.FC<AddSubjectProps> = props => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = React.useRef<HTMLSelectElement>(null);
  const finalRef = React.useRef(null);
  const onAdd = () => {
    const tempList = props.list.slice(0, props.list.length);
    const valueList = initialRef.current!.value.split(',');
    if (valueList.length == 1) {
      return;
    }
    const pushedSubject: SubjectListProps = {
      subjectID: valueList[0],
      subjectName: valueList[1],
      score: 0,
    };
    tempList.push(pushedSubject);
    props.hook(tempList);
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
                    <option
                      key={sub.subjectID}
                      value={[sub.subjectID, sub.subjectName]}
                    >
                      {sub.subjectName}
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
