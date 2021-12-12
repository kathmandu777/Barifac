import { VStack, Divider, Heading, Center } from '@chakra-ui/react';
import { SUBJECTS } from '..';
import SubjectNameList from '../../components/SubjectNameList';
import { useState } from 'react';

const Edit = () => {
  const [editingSubject, setSubject] = useState(SUBJECTS);
  return (
    <>
      <Center w='100%'>
        <Heading as='h2' size='md' color='white' mt='20%'>
          履修科目編集
        </Heading>
      </Center>
      <VStack
        spacing={3}
        mt={224}
        mb={100}
        ml='auto'
        mr='auto'
        width='70%'
        alignItems='flex-start'
      >
        {editingSubject.map((sub, index) => {
          return (
            <SubjectNameList
              subjectName={sub.subjectName}
              index={index}
              list={editingSubject}
              hook={setSubject}
              key={index}
            />
          );
        })}
        <Divider borderColor='gray.700' />
      </VStack>
    </>
  );
};

export default Edit;
