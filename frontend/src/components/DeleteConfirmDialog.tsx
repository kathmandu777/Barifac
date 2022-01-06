import React from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

type DeleteConfirmModalProps = {
  onCancel?: VoidFunction;
  onOk: VoidFunction;
  dialogHeader: string;
  dialogBody: string;
};

const DeleteConfirmDialog: React.FC<DeleteConfirmModalProps> = ({
  onCancel,
  onOk,
  dialogHeader,
  dialogBody,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  return (
    <>
      <Button
        bg='whiteAlpha.200'
        color='whiteAlpha.800'
        rounded='full'
        ml={2}
        mr={2}
        onClick={() => setIsOpen(true)}
      >
        削除
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              {dialogHeader}
            </AlertDialogHeader>

            <AlertDialogBody>{dialogBody}</AlertDialogBody>

            <AlertDialogFooter>
              <Button
                ref={cancelRef}
                onClick={() => {
                  onClose();
                  onCancel?.();
                }}
              >
                キャンセル
              </Button>
              <Button
                color='white'
                bg='red.400'
                onClick={() => {
                  onClose();
                  onOk();
                }}
                ml={3}
              >
                削除
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export default DeleteConfirmDialog;
