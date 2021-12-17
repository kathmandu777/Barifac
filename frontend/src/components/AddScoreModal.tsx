import React from 'react';
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Flex,
  Input,
} from '@chakra-ui/react';

type AddScoreModalProps = {
  isOpen: boolean;
  isDisabled: boolean;
  onClose: () => void;
  onClick: () => void;
  onChangeMaxScore: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeGotScore: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export const AddScoreModal: React.FC<AddScoreModalProps> = ({
  isDisabled,
  isOpen,
  onClose,
  onClick,
  onChangeMaxScore,
  onChangeGotScore,
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>点数の追加</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Flex>
            <FormControl id='gotScore'>
              <FormLabel>獲得点数</FormLabel>
              <Input
                w='5rem'
                bg='white'
                color='black'
                type='number'
                onChange={onChangeGotScore}
              />
            </FormControl>
            <FormControl id='maxScore'>
              <FormLabel>満点</FormLabel>
              <Input
                w='5rem'
                bg='white'
                color='black'
                type='number'
                onChange={onChangeMaxScore}
              />
            </FormControl>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            pr={10}
            pl={10}
            mr={15}
            bg='blue.400'
            color='gray.800'
            colorScheme={'blue'}
            isDisabled={isDisabled}
            onClick={onClick}
            rounded='full'
            _hover={{
              bg: 'blue.300',
            }}
          >
            追加
          </Button>
          <Button mr={10} onClick={onClose} rounded='full'>
            キャンセル
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
