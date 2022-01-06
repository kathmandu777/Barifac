import React from 'react';
import {
  Box,
  Flex,
  Avatar,
  Link,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
} from '@chakra-ui/react';
import { useAuthContext } from 'context/AuthContext';

const Header = () => {
  const { uid } = useAuthContext();
  return (
    <>
      <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
        <Flex
          h={16}
          alignItems={'center'}
          justifyContent={'center'}
          pos={'relative'}
        >
          {uid && (
            <Flex alignItems={'center'} pos='absolute' left={0}>
              <Menu>
                <MenuButton>
                  <Avatar size={'sm'} />
                </MenuButton>
                <MenuList>
                  <MenuItem>
                    <Link href='/user/info'>ユーザー情報</Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </Flex>
          )}

          <Link href={'/'} style={{ textDecoration: 'none' }}>
            <Box color={'blue.400'} fontWeight={'bold'} fontSize={'lg'}>
              Barifac
            </Box>
          </Link>
        </Flex>
      </Box>
    </>
  );
};

export default Header;
