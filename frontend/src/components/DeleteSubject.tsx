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
import { Button } from '@chakra-ui/react';
import { AttendSubjectReadableRepository } from 'repositories/AttendSubjectReadableRepository';

export type DeleteSubjectProp = {
  uuid: string;
  flag: boolean;
  hook: React.Dispatch<React.SetStateAction<boolean>>;
};

const DeleteSubject: React.FC<DeleteSubjectProp> = props => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);
  const onDelete = () => {
    setIsOpen(false);
    const subjectRepo = AttendSubjectReadableRepository.delete(props.uuid);
    if (subjectRepo === undefined) {
      //TODO: アラート
      console.log('科目を削除できませんでした');
    } else {
      props.hook(!props.flag);
    }
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
