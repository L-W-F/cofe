import React, { useState } from 'react';
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
import { useAppActions } from '@/hooks/useApp';

const initialData = {
  title: '',
  description: '',
};

const CreateApp = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { createPage } = useAppActions();
  const { push } = useRouter();
  const [formData, setFormData] = useState(initialData);

  return (
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
        <Heading size="md">创建页面</Heading>
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
            createPage({
              id: makeId(),
              ...formData,
            });

            push('/');
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
