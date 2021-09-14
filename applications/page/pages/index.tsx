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
import { DbData } from '@cofe/types';
import { Card, CardContent, CardHeader } from '@cofe/ui';
import { formatDate } from '@cofe/utils';
import { map, pick } from 'lodash/fp';
import { Header } from '../src/components/Header';
import { Container } from '../src/components/layout/Container';

const Index = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const pages = useStore('pages');

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
              {pages.map(({ id, title, description, createdAt }) => (
                <Tr key={id}>
                  <Td>
                    <Link href={`/${id}`} passHref>
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
  if (!context.req.cookies.user) {
    return {
      redirect: {
        destination: '/401',
        permanent: false,
      },
    };
  }

  const { pages = [] }: DbData = await fetch(
    `${process.env.DB_URL}/api/store`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Cookie: context.req.headers.cookie,
      },
    },
  ).then((response) => response.json());

  return {
    props: {
      timestamp: formatDate(Date.now()),
      initialStates: {
        pages: map(pick(['id', 'title', 'description', 'createdAt']))(pages),
      },
    },
  };
};

export default Index;
