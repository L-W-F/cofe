import React, { useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import NextLink from 'next/link';
import { AddIcon, EditIcon } from '@chakra-ui/icons';
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Link,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
  useDisclosure,
} from '@chakra-ui/react';
import { Form } from '@cofe/form';
import { compose } from '@cofe/gssp';
import { get, patch, post } from '@cofe/io';
import { useDispatch, useStore } from '@cofe/store';
import { CofePage } from '@cofe/types';
import { Card, CardContent, CardHeader } from '@cofe/ui';
import { formatDate } from '@cofe/utils';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { Container } from '@/components/layout/Container';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { withGsspWhoami } from '@/gssp/withGsspWhoami';

const App = ({
  appId,
  timestamp,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const pages = useStore('page');
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [formData, setFormData] = useState(null);

  return (
    <>
      <Container>
        <Header />
        <Card flex={1}>
          <CardHeader
            title="页面"
            action={
              <IconButton
                aria-label="创建新的页面"
                icon={<AddIcon />}
                onClick={() => {
                  setFormData({});
                  onOpen();
                }}
              />
            }
          />
          <CardContent>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>名称</Th>
                  <Th>描述</Th>
                  <Th isNumeric>创建于</Th>
                  <Th isNumeric>更新于</Th>
                  <Th />
                </Tr>
              </Thead>
              <Tbody>
                {pages.map(
                  ({ id, title, description, createdAt, updatedAt }) => (
                    <Tr key={id}>
                      <Td>
                        <NextLink href={`/pages/${id}`} passHref>
                          <Link>{title}</Link>
                        </NextLink>
                      </Td>
                      <Td>{description}</Td>
                      <Td isNumeric>{formatDate(createdAt)}</Td>
                      <Td isNumeric>{formatDate(updatedAt)}</Td>
                      <Td>
                        <IconButton
                          aria-label="编辑"
                          icon={<EditIcon />}
                          onClick={() => {
                            setFormData(pages.find((page) => page.id === id));

                            onOpen();
                          }}
                        />
                      </Td>
                    </Tr>
                  ),
                )}
              </Tbody>
            </Table>
          </CardContent>
        </Card>
        <Footer>{timestamp}</Footer>
      </Container>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        // finalFocusRef={btnRef}
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

                  dispatch('UPDATE_PAGE')(page);
                } else {
                  const page = await post(`/api/apps/${appId}/pages`, formData);

                  dispatch('CREATE_PAGE')(page);
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
  [withGsspWhoami, withGsspColorMode],
  async (context: GetServerSidePropsContext) => {
    const pages: CofePage[] = await get(
      `${process.env.DB_URL}/api/apps/${context.params.id}/pages`,
      {
        headers: {
          Authorization: `Bearer ${context.req.cookies.token}`,
        },
      },
    );

    return {
      props: {
        timestamp: formatDate(Date.now()),
        appId: context.params.id,
        initialStates: {
          page: pages,
        },
      },
    };
  },
);

export default App;
