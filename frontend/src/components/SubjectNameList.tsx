import React from 'react';
import { Divider, Stack, HStack, Text, Spacer } from '@chakra-ui/react';
import DeleteSubject from './DeleteSubject';

export type SubjectNameListProps = {
  subjectName: string;
  flag: boolean;
  hook: React.Dispatch<React.SetStateAction<boolean>>;
  uuid: string;
};

const SubjectNameList: React.FC<SubjectNameListProps> = props => {
  return (
    <>
      <Divider borderColor='gray.700' />
      <Stack w='100%'>
        <HStack spacing={5}>
          <Text fontSize='xl' fontWeight='bold' color='white' noOfLines={1}>
            {props.subjectName}
          </Text>
          <Spacer />
          <DeleteSubject
            flag={props.flag}
            hook={props.hook}
            uuid={props.uuid}
          />
        </HStack>
      </Stack>
    </>
  );
};

export default SubjectNameList;
