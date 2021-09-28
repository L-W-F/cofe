import React, { useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { AddIcon, EditIcon, TimeIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { compose } from '@cofe/gssp';
import { get, patch, post } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { CofeApp } from '@cofe/types';
import { Card, CardContent, CardHeader, Toolbar } from '@cofe/ui';
import { formatDate } from '@cofe/utils';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Root } from '@/components/Root';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspCurrentTime } from '@/gssp/withGsspCurrentTime';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';

const Index = ({
  currentTime,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const apps = useStore('app');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(null);

  return (
    <>
      <Root>
        <Header />
        <Toolbar mb={4}>
          <Heading as="h2" size="xl">
            应用
          </Heading>
          <Box flex={1} />
          <IconButton
            aria-label="创建新的应用"
            icon={<AddIcon />}
            onClick={() => {
              setFormData({});
              onOpen();
            }}
          />
        </Toolbar>
        <SimpleGrid
          m={2}
          gridGap={2}
          columns={{ base: 1, md: 2, lg: 3, xl: 4 }}
        >
          {apps.map(({ id, title, description, createdAt, updatedAt }) => (
            <LinkBox key={id} as={Card}>
              <CardHeader
                avatar={<Avatar size="sm" name="A" />}
                title={
                  <NextLink href={`/apps/${id}`} passHref>
                    <LinkOverlay>{title}</LinkOverlay>
                  </NextLink>
                }
                description={description}
                action={
                  <IconButton
                    aria-label="编辑"
                    icon={<EditIcon />}
                    size="xs"
                    onClick={() => {
                      setFormData(apps.find((app) => app.id === id));

                      onOpen();
                    }}
                  />
                }
              />
              <CardContent>
                <TimeIcon aria-label="最后修改" mr={1} />
                {formatDate(updatedAt)}
              </CardContent>
            </LinkBox>
          ))}
        </SimpleGrid>
        <Footer>{currentTime}</Footer>
      </Root>
      <Drawer
        isOpen={isOpen}
        placement={formData?.id ? 'right' : 'bottom'}
        onClose={onClose}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{formData?.id ? '编辑' : '创建'}</DrawerHeader>
          <DrawerBody>
            <Form
              formData={formData}
              uiSchema={{
                id: { 'ui:widget': 'hidden' },
              }}
              schema={{
                type: 'object',
                properties: {
                  id: {
                    type: 'string',
                  },
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
          </DrawerBody>
          <DrawerFooter>
            <Button
              colorScheme="teal"
              onClick={async () => {
                if (formData?.id) {
                  const app = await patch(`/api/apps/${formData.id}`, formData);

                  dispatch('UPDATE_APP')(app);
                } else {
                  const app = await post('/api/apps', formData);

                  dispatch('CREATE_APP')(app);
                }
              }}
            >
              保存
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export const getServerSideProps = compose(
  [withGsspCurrentTime, withGsspCatch, withGsspWhoami, withGsspColorMode],
  async (context: GetServerSidePropsContext) => {
    const apps: CofeApp[] = await get(`${process.env.DB_URL}/api/apps`, {
      headers: {
        Authorization: `Bearer ${context.req.cookies.token}`,
      },
    });

    return {
      props: {
        initialStates: {
          app: apps,
        },
      },
    };
  },
);

export default Index;
