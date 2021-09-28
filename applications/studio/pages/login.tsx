import React, { useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  chakra,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
  useColorModeValue,
} from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { post } from '@cofe/io';
import { PasswordField } from '@cofe/ui';
import { withGsspColorMode } from 'gssp/withGsspColorMode';
import { Header } from 'components/Header';
import { Root } from '@/components/Root';

const Login = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('88888');

  const { replace } = useRouter();

  return (
    <Root>
      <Header />
      <Box p={10}>
        <Box maxW={80} marginX="auto">
          <chakra.form
            onSubmit={async (e) => {
              e.preventDefault();

              await post('/api/login', { username, password });

              replace('/');
            }}
            {...props}
          >
            <Stack spacing="6">
              <FormControl id="username">
                <FormLabel>账号</FormLabel>
                <Input
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value.trim());
                  }}
                  type="text"
                  autoComplete="username"
                  required
                />
              </FormControl>
              <FormControl id="password">
                <Flex justify="space-between">
                  <FormLabel>密码</FormLabel>
                  <NextLink href="/password-reset" passHref>
                    <Link color={useColorModeValue('teal.600', 'teal.200')}>
                      重设密码
                    </Link>
                  </NextLink>
                </Flex>
                <PasswordField
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value.trim());
                  }}
                />
              </FormControl>
              <Button type="submit" colorScheme="teal" size="lg" fontSize="md">
                提交登录
              </Button>
            </Stack>
          </chakra.form>
          <Box my={4}>
            还没有账号？
            <NextLink href="/signup" passHref>
              <Link>注册</Link>
            </NextLink>
            一个
          </Box>
          <Divider />
          <Box mt={4}>
            <Link href="/api/auth/github">Github 登录</Link>
          </Box>
        </Box>
      </Box>
    </Root>
  );
};

export const getServerSideProps = compose(
  [withGsspColorMode],
  async (context: GetServerSidePropsContext) => {
    if (context.req.cookies.token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  },
);

export default Login;
