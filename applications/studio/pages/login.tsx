import React, { useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import {
  Box,
  Button,
  chakra,
  FormControl,
  FormLabel,
  Input,
  Stack,
} from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { PasswordField } from '@cofe/ui';
import { withGsspColorMode } from 'gssp/withGsspColorMode';
import { Header } from 'components/Header';
import { Container } from 'components/layout/Container';
import { post } from 'utils/io';

const Login = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const [username, setUsername] = useState('Admin');
  const [password, setPassword] = useState('88888');

  const { replace } = useRouter();

  return (
    <Container>
      <Header />
      <Box p={10}>
        <chakra.form
          onSubmit={async (e) => {
            e.preventDefault();

            try {
              await post('/api/login', { username, password });

              replace('/');
            } catch (error) {}
          }}
          maxW={80}
          marginX="auto"
          {...props}
        >
          <Stack spacing="6">
            <FormControl id="username">
              <FormLabel>Username</FormLabel>
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
            <PasswordField
              value={password}
              onChange={(e) => {
                setPassword(e.target.value.trim());
              }}
            />
            <Button type="submit" colorScheme="blue" size="lg" fontSize="md">
              Sign in
            </Button>
          </Stack>
        </chakra.form>
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

export default Login;
