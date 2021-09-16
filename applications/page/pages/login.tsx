import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Box } from '@chakra-ui/react';
import { LoginForm } from 'login/LoginForm';
import { Header } from 'components/Header';
import { Container } from 'components/layout/Container';

const Login = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  return (
    <Container
      minWidth="100vw"
      minHeight="100vh"
      direction="column"
      p={2}
      gridGap={2}
    >
      <Header />
      <Box p={10}>
        <LoginForm />
      </Box>
    </Container>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
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
};

export default Login;
