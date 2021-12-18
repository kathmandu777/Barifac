import React from 'react';
import { Link, Text, IconButton } from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';

const EditButton: React.FC = () => {
  return (
    <Link href='/edit'>
      <IconButton
        aria-label='edit'
        icon={<EditIcon />}
        bgColor='blue.400'
        color='white'
        position='fixed'
        bottom='5%'
        right='5%'
        size='md'
        isRound={true}
      />
    </Link>
  );
};

export default EditButton;
