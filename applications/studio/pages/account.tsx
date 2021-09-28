import React from 'react';
import { InferGetServerSidePropsType } from 'next';
import { Box } from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { useStore } from '@cofe/store';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Root } from '@/components/Root';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspCurrentTime } from '@/gssp/withGsspCurrentTime';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';

const Account = ({
  currentTime,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const whoami = useStore('whoami');

  return (
    <Root>
      <Header />
      <Box p={10}>
        <pre>{JSON.stringify(whoami, null, 4)}</pre>
      </Box>
      <Footer>{currentTime}</Footer>
    </Root>
  );
};

export const getServerSideProps = compose([
  withGsspCurrentTime,
  withGsspCatch,
  withGsspWhoami,
  withGsspColorMode,
]);

export default Account;
