import React, { useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Link,
  Stack,
} from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { PasswordField } from '@cofe/ui';
import { withGsspColorMode } from 'gssp/withGsspColorMode';
import { Header } from 'components/Header';
import { Container } from 'components/layout/Container';
import { post } from 'utils/io';

const Signup = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('88888');

  const { replace } = useRouter();

  return (
    <Container>
      <Header />
      <Box p={10}>
        <Box maxW={80} marginX="auto">
          <chakra.form
            onSubmit={async (e) => {
              e.preventDefault();

              await post('/api/signup', { username, password });

              replace('/login');
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
                <FormLabel>密码</FormLabel>
                <PasswordField
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value.trim());
                  }}
                />
              </FormControl>
              <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
                提交注册
              </Button>
            </Stack>
          </chakra.form>
          <Box mt={4}>
            已有账号？ 直接
            <NextLink href="/login" passHref>
              <Link>登录</Link>
            </NextLink>
          </Box>
        </Box>
      </Box>
    </Container>
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

export default Signup;
