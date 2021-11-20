import React, { useEffect, useState } from 'react';
import { InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Heading, VStack } from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { compose } from '@cofe/gssp';
import { Paper } from '@cofe/ui';
import { makeId } from '@cofe/utils';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HomeEntry } from '@/components/HomeEntry';
import { Root } from '@/components/Root';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { useApp } from '@/hooks/useApp';

const initialData = {
  title: '',
  description: '',
};

const CreateApp = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { id, createApp } = useApp();
  const { push } = useRouter();
  const [formData, setFormData] = useState(initialData);

  useEffect(() => {
    if (id) {
      push('/');
    }
  }, [id, push]);

  return id ? null : (
    <Root>
      <Header>
        <HomeEntry />
        <Box flex={1} />
        <ColorModeSwitch />
      </Header>
      <VStack
        as={Paper}
        flex={1}
        m={4}
        p={8}
        alignItems="stretch"
        justifyContent="center"
        gridGap={2}
      >
        <Heading size="md">创建应用</Heading>
        <Form
          formData={formData}
          schema={{
            type: 'object',
            properties: {
              title: {
                type: 'string',
                title: '名称',
              },
              description: {
                type: 'string',
                title: '描述',
              },
            },
            required: ['title'],
          }}
          onChange={(e) => {
            setFormData(e.formData);
          }}
        />
        <Button
          colorScheme="teal"
          loadingText="保存"
          onClick={() => {
            createApp({
              id: makeId(),
              ...formData,
            });
          }}
        >
          保存
        </Button>
      </VStack>
      <Footer />
    </Root>
  );
};

export const getServerSideProps = compose([
  withGsspCatch(),
  withGsspColorMode(),
]);

export default CreateApp;
