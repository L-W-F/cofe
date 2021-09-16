import React from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Link from 'next/link';
import { AddIcon } from '@chakra-ui/icons';
import {
  Link as ChakraLink,
  IconButton,
  Table,
  TableCaption,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import { useStore } from '@cofe/store';
import { CofeApp } from '@cofe/types';
import { Card, CardContent, CardHeader } from '@cofe/ui';
import { formatDate } from '@cofe/utils';
import { Header } from 'components/Header';
import { Container } from 'components/layout/Container';
import { get } from 'utils/io';

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const apps = useStore('apps');

  return (
    <Container
      minWidth="100vw"
      minHeight="100vh"
      direction="column"
      p={2}
      gridGap={2}
    >
      <Header />
      <Card maxW="3xl" mx="auto">
        <CardHeader
          title="Account Info"
          action={<IconButton aria-label="Add page" icon={<AddIcon />} />}
        />
        <CardContent>
          <Table variant="simple">
            <TableCaption>{props.timestamp}</TableCaption>
            <Thead>
              <Tr>
                <Th>Title</Th>
                <Th>Description</Th>
                <Th isNumeric>Created at</Th>
              </Tr>
            </Thead>
            <Tbody>
              {apps.map(({ id, title, description, createdAt }) => (
                <Tr key={id}>
                  <Td>
                    <Link href={`/apps/${id}`} passHref>
                      <ChakraLink>{title}</ChakraLink>
                    </Link>
                  </Td>
                  <Td>{description}</Td>
                  <Td isNumeric>{formatDate(createdAt)}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext,
) => {
  if (!context.req.cookies.token) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }

  const apps: CofeApp[] = await get(`${process.env.DB_URL}/api/apps`, {
    headers: {
      Authorization: `Bearer ${context.req.cookies.token}`,
    },
  });

  return {
    props: {
      timestamp: formatDate(Date.now()),
      initialStates: {
        apps,
      },
    },
  };
};

export default Index;
