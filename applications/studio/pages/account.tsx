import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import { Box } from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Container } from '@/components/layout/Container';
import { withCurrentTime } from '@/gssp/withCurrentTime';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';

const Account = ({
  currentTime,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <Container>
      <Header />
      <Box p={10}>Account</Box>
      <Footer>{currentTime}</Footer>
    </Container>
  );
};

export const getServerSideProps = compose([
  withCurrentTime,
  withGsspCatch,
  withGsspWhoami,
  withGsspColorMode,
]);

export default Account;
