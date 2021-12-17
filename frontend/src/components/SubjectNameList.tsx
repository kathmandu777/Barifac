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
  index: number;
  list: AttendSubjectReadableInterface[];
  hook: Dispatch<SetStateAction<AttendSubjectReadableInterface[]>>;
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
            index={props.index}
            list={props.list}
            hook={props.hook}
          />
        </HStack>
      </Stack>
    </>
  );
};

export default SubjectNameList;
