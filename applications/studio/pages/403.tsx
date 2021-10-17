import React from 'react';
import { Center } from '@chakra-ui/react';
import { withGsspColorMode } from 'gssp/withGsspColorMode';
import { Header } from 'components/Header';
import { Footer } from '@/components/Footer';

const Forbidden = () => {
  return (
    <>
      <Header />
      <Center flex={1}>权限不足</Center>
      <Footer />
    </>
  );
};

export const getServerSideProps = withGsspColorMode();

export default Forbidden;
