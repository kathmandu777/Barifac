import React from 'react';
import {
  Divider,
  Stack,
  HStack,
  Circle,
  Text,
  Spacer,
  Link,
} from '@chakra-ui/react';
import { useState, SetStateAction, Dispatch } from 'react';
import DeleteSubject from './DeleteSubject';
import { SubjectListProps } from './SubjectList';
import { AttendSubjectReadableInterface } from 'repositories/AttendSubjectReadableRepository';

export type SubjectNameListProps = {
  subjectName: string;
  //index: number;
  //list: AttendSubjectReadableInterface[];
  //hook: Dispatch<SetStateAction<AttendSubjectReadableInterface[]>>;
  flag: boolean;
  hook: React.Dispatch<React.SetStateAction<boolean>>;
  uuid: string;
  update: () => Promise<void>;
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
            //index={props.index}
            //list={props.list}
            flag={props.flag}
            hook={props.hook}
            uuid={props.uuid}
            update={props.update}
          />
        </HStack>
      </Stack>
    </>
  );
};

export default SubjectNameList;
