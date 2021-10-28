import React from 'react';
import { Center } from '@chakra-ui/react';
import { Header } from 'components/Header';
import { Footer } from '@/components/Footer';

const Notfound = () => {
  return (
    <>
      <Header />
      <Center flex={1}>页面未找到</Center>
      <Footer />
    </>
  );
};

export default Notfound;
