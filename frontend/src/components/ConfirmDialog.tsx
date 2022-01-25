import React, { ReactNode } from 'react';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  MenuItem,
} from '@chakra-ui/react';

type ConfirmModalProps = {
  onCancel?: VoidFunction;
  onOk: VoidFunction;
  dialogHeader: string;
  dialogBody: string;
  okButton: string;
  children: ReactNode;
  isOpen: boolean;
  onClose: VoidFunction;
  cancelRef: React.MutableRefObject<null>;
};

type DeleteConfirmModalProps = Pick<
  ConfirmModalProps,
  'onOk' | 'onCancel' | 'dialogHeader' | 'dialogBody'
>;

type SignOutConfirmDialogProps = Pick<ConfirmModalProps, 'onOk' | 'onCancel'>;

const ConfirmDialog: React.FC<ConfirmModalProps> = ({
  onOk,
  onCancel,
  dialogBody,
  dialogHeader,
  okButton,
  children,
  isOpen,
  onClose,
  cancelRef,
}) => {
  return (
    <>
      {children}
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
                {okButton}
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
};

export const DeleteConfirmDialog: React.FC<DeleteConfirmModalProps> = ({
  dialogHeader,
  dialogBody,
  onOk,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  return (
    <>
      <ConfirmDialog
        dialogHeader={dialogHeader}
        dialogBody={dialogBody}
        onOk={onOk}
        onCancel={onCancel}
        okButton='削除'
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      >
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
      </ConfirmDialog>
    </>
  );
};

export const SignOutConfirmDialog: React.FC<SignOutConfirmDialogProps> = ({
  onOk,
  onCancel,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const onClose = () => setIsOpen(false);
  const cancelRef = React.useRef(null);

  return (
    <>
      <ConfirmDialog
        dialogHeader='サインアウト'
        dialogBody='本当にサインアウトしますか？'
        onOk={onOk}
        onCancel={onCancel}
        okButton='サインアウト'
        isOpen={isOpen}
        onClose={onClose}
        cancelRef={cancelRef}
      >
        <MenuItem onClick={() => setIsOpen(true)}>サインアウト</MenuItem>
      </ConfirmDialog>
    </>
  );
};
