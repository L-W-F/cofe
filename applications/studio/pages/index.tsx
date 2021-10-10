import React, { useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { AddIcon, EditIcon, TimeIcon } from '@chakra-ui/icons';
import {
  Avatar,
  Box,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  Heading,
  IconButton,
  LinkBox,
  LinkOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { compose } from '@cofe/gssp';
import { patch, post } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { Card, Toolbar } from '@cofe/ui';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Root } from '@/components/Root';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspCurrentTime } from '@/gssp/withGsspCurrentTime';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';
import { AppState } from '@/store/app';
import { WhoamiState } from '@/store/whoami';
import { supabase } from '@/utils/supabase';

const Index = ({
  currentTime,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const apps = useStore<AppState>('app');
  const last_sign_in_at = useStore<WhoamiState['last_sign_in_at']>(
    'whoami.last_sign_in_at',
  );
  const dispatch = useDispatch();
  const toast = useToast({
    status: 'success',
    duration: 1000,
    position: 'bottom-left',
  });
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(null);

  return (
    <>
      <Root>
        <Header />
        <Toolbar size="sm">
          <Breadcrumb>
            <BreadcrumbItem isCurrentPage>
              <NextLink href="/" passHref>
                <BreadcrumbLink>首页</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>
          </Breadcrumb>
        </Toolbar>
        <SimpleGrid m={2} gridGap={2} columns={{ base: 1, md: 2 }}>
          <Card>
            <Toolbar>
              <Heading as="h3" size="md" flex={1}>
                应用
              </Heading>
              <IconButton
                aria-label="创建新的应用"
                icon={<AddIcon />}
                size="sm"
                onClick={() => {
                  setFormData(null);
                  onOpen();
                }}
              />
            </Toolbar>
            <VStack m={4} gridGap={2} align="stretch">
              {apps.map(({ id, title, description, updated_at }) => (
                <LinkBox key={id} as={Card}>
                  <Toolbar>
                    <Avatar size="sm" name="A" />
                    <NextLink href={`/apps/${id}`} passHref>
                      <LinkOverlay flex={1}>{title}</LinkOverlay>
                    </NextLink>
                    <IconButton
                      aria-label="编辑"
                      icon={<EditIcon />}
                      size="xs"
                      onClick={() => {
                        setFormData(apps.find((app) => app.id === id));

                        onOpen();
                      }}
                    />
                  </Toolbar>
                  <Flex m={4}>
                    <Text flex={1}>{description}</Text>
                    <Text>
                      <TimeIcon aria-label="最后修改" mr={1} />
                      {updated_at}
                    </Text>
                  </Flex>
                </LinkBox>
              ))}
            </VStack>
          </Card>
          <Card>
            <Toolbar>
              <Heading as="h3" size="md">
                上一次登录
              </Heading>
            </Toolbar>
            <Box p={4}>{last_sign_in_at}</Box>
          </Card>
          <Card>
            <Toolbar>
              <Heading as="h3" size="md">
                关于
              </Heading>
            </Toolbar>
            <Box m={4}>我们</Box>
          </Card>
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

                  toast({
                    title: '保存成功',
                  });

                  dispatch('UPDATE_APP')(app);
                } else {
                  const app = await post('/api/apps', formData);

                  toast({
                    title: '创建成功',
                  });

                  dispatch('CREATE_APP')(app);
                }

                onClose();
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
    const { data: apps } = await supabase
      .from('apps')
      .select('id,title,description,updated_at')
      .order('updated_at', { ascending: false });

    return {
      props: {
        initialStates: {
          app: apps ?? [],
        },
      },
    };
  },
);

export default Index;
