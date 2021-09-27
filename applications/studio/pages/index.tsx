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
import { CofeApp } from '@cofe/types';
import { Card, CardContent, CardHeader } from '@cofe/ui';
import { formatDate } from '@cofe/utils';
import { Container } from '@cofe/ui';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
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
      <Container>
        <Header />
        <Card flex={1}>
          <CardHeader
            title="应用"
            action={
              <IconButton
                aria-label="创建新的应用"
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
                {apps.map(
                  ({ id, title, description, createdAt, updatedAt }) => (
                    <Tr key={id}>
                      <Td>
                        <NextLink href={`/apps/${id}`} passHref>
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
                            setFormData(apps.find((app) => app.id === id));

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
        <Footer>{currentTime}</Footer>
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
