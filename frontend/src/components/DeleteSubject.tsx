import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
} from '@chakra-ui/react';
import { DeleteIcon } from '@chakra-ui/icons';
import { Button, Flex } from '@chakra-ui/react';
import { SUBJECTS } from '../pages';
import { SubjectListProps } from './SubjectList';
import { Dispatch, SetStateAction } from 'react';

export type DeleteSubjectProp = {
  index: number;
  list: SubjectListProps[];
  hook: Dispatch<SetStateAction<SubjectListProps[]>>;
};

const DeleteSubject: React.FC<DeleteSubjectProp> = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const onDelete = () => {
    // NOTE: API に置き換えるときはエラー処理必要
    setIsOpen(false);
    const tempList = props.list.slice(0, props.list.length);
    tempList.splice(props.index, 1);
    //props.hook(props.list.splice(props.index, 1));
    props.hook(tempList);
  };

  return (
    <>
      <DeleteIcon
        onClick={() => setIsOpen(true)}
        w={5}
        h={5}
        color='gray.600'
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              CAUTION
            </AlertDialogHeader>

            <AlertDialogBody>
              本当にこの履修科目を削除しますか？
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose} rounded='full'>
                やっぱ削除しない！
              </Button>
              <Button
                bg='blue.400'
                color='gray.800'
                onClick={onDelete}
                ml={3}
                rounded='full'
              >
                削除する！
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};
export default DeleteSubject;
