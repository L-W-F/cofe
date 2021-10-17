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
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { compose } from '@cofe/gssp';
import { patch, post } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { Card, Toolbar } from '@cofe/ui';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Root } from '@/components/Root';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspCurrentTime } from '@/gssp/withGsspCurrentTime';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';
import { supabase } from '@/utils/supabase';
import { withGsspCatch } from '@/gssp/withGsspCatch';

const App = ({
  appId,
  currentTime,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const pages = useStore('page');
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
            <BreadcrumbItem>
              <NextLink href="/" passHref>
                <BreadcrumbLink>首页</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem>
              <NextLink href={`/apps/${appId}`} passHref>
                <BreadcrumbLink>应用</BreadcrumbLink>
              </NextLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <span>页面</span>
            </BreadcrumbItem>
          </Breadcrumb>
        </Toolbar>
        <Toolbar mb={4}>
          <Heading as="h2" size="xl">
            页面
          </Heading>
          <Box flex={1} />
          <IconButton
            aria-label="创建新的页面"
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
          {pages.map(({ id, title, description, updated_at }) => (
            <LinkBox key={id} as={Card}>
              <Toolbar>
                <Avatar size="sm" name="A" />
                <NextLink href={`/pages/${id}`} passHref>
                  <LinkOverlay flex={1}>{title}</LinkOverlay>
                </NextLink>
                <IconButton
                  aria-label="编辑"
                  icon={<EditIcon />}
                  size="xs"
                  onClick={() => {
                    setFormData(pages.find((page) => page.id === id));

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
                  const page = await patch(
                    `/api/pages/${formData.id}`,
                    formData,
                  );

                  toast({
                    title: '保存成功',
                    status: 'success',
                    duration: 1000,
                    position: 'bottom-left',
                  });

                  dispatch('UPDATE_PAGE')(page);
                } else {
                  const page = await post(`/api/apps/${appId}/pages`, formData);

                  toast({
                    title: '创建成功',
                    status: 'success',
                    duration: 1000,
                    position: 'bottom-left',
                  });

                  dispatch('CREATE_PAGE')(page);
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
  [withGsspCatch, withGsspCurrentTime, withGsspWhoami, withGsspColorMode],
  async (context: GetServerSidePropsContext) => {
    const { data: pages } = await supabase
      .from('pages')
      .select('id,title,description,updated_at')
      .eq('app_id', context.params.id)
      .order('updated_at', { ascending: false });

    return {
      props: {
        appId: context.params.id,
        initialStates: {
          page: pages ?? [],
        },
      },
    };
  },
);

export default App;
