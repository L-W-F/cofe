import React, { useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, Heading, useToast, VStack } from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { compose } from '@cofe/gssp';
import { post } from '@cofe/io';
import { Paper } from '@cofe/ui';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Logo } from '@/components/Logo';
import { Root } from '@/components/Root';
import { Whoami } from '@/components/Whoami';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';
import { useIsLoading } from '@/hooks/useIsLoading';

const initialData = {
  title: '',
  description: '',
};

const CreateApp = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const is_loading = useIsLoading();
  const { push } = useRouter();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const [formData, setFormData] = useState(initialData);

  return (
    <Root>
      <Header>
        <Logo />
        <Box flex={1} />
        <ColorModeSwitch />
        <Whoami />
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
          isLoading={is_loading}
          isDisabled={is_loading}
          loadingText="保存"
          onClick={async () => {
            await post('/api/apps', formData);

            toast({
              title: '创建成功',
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

export const getServerSideProps = compose(
  [withGsspCatch, withGsspWhoami, withGsspColorMode],
  async (context: GetServerSidePropsContext) => {
    return {
      props: {
        initialStates: {},
      },
    };
  },
);

export default CreateApp;
