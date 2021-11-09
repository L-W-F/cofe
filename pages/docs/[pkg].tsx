import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { Box, Code, Heading, Text } from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { MDXProvider, MDXProviderComponents } from '@mdx-js/react';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Footer } from '@/components/Footer';
import { Header } from '@/components/Header';
import { HomeEntry } from '@/components/HomeEntry';
import { Root } from '@/components/Root';
import { withGsspCatch } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';

const components: MDXProviderComponents = {
  h1: (props) => <Heading as="h1" size="2xl" my="0.5em" {...props} />,
  h2: (props) => <Heading as="h2" size="xl" my="0.5em" {...props} />,
  h3: (props) => <Heading as="h3" size="lg" my="0.5em" {...props} />,
  h4: (props) => <Heading as="h4" size="md" my="0.5em" {...props} />,
  h5: (props) => <Heading as="h5" size="sm" my="0.5em" {...props} />,
  h6: (props) => <Heading as="h6" size="xs" my="0.5em" {...props} />,
  p: Text,
  inlineCode: Code,
};

const PkgDoc = ({
  pkg,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [Mdx, setMdx] = useState(null);

  useEffect(() => {
    import(`@cofe/${pkg}/doc.mdx`).then((m) => {
      setMdx(() => m.default);
    });
  }, [pkg]);

  return (
    <Root>
      <Header>
        <HomeEntry />
        <Box flex={1} />
        <ColorModeSwitch />
      </Header>
      <Box p={4} flex={1}>
        <MDXProvider components={components}>{Mdx && <Mdx />}</MDXProvider>
      </Box>
      <Footer />
    </Root>
  );
};

export const getServerSideProps = compose(
  [withGsspCatch(), withGsspColorMode()],
  async (context: GetServerSidePropsContext<{ pkg: string }>) => {
    return {
      props: {
        pkg: context.query.pkg,
        initialStates: {},
      },
    };
  },
);

export default PkgDoc;
