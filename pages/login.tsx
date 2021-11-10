import React, { useEffect, useState } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Button, Spinner, useToast, VStack } from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { GithubIcon, GitlabIcon } from '@cofe/icons';
import { post } from '@cofe/io';
import { withGsspColorMode } from 'gssp/withGsspColorMode';
import { Header } from 'components/Header';
import { ColorModeSwitch } from '@/components/ColorModeSwitch';
import { Footer } from '@/components/Footer';
import { HomeEntry } from '@/components/HomeEntry';
import { Root } from '@/components/Root';
import { supabase } from '@/utils/supabase';

const Login = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { push, query } = useRouter();
  const toast = useToast({
    status: 'error',
    duration: 1000,
    position: 'bottom-left',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (window.location.hash) {
      setLoading(true);
    }

    const callback = async (event, session) => {
      await post('/api/login', { event, session });

      if (session) {
        push('/studio');
      }
    };

    const _session = supabase.auth.session();

    if (_session) {
      callback('SIGNED_IN', _session);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(callback);

    return () => {
      authListener.unsubscribe();
    };
  }, [push]);

  const handleSignIn = async (provider) => {
    try {
      const { error } = await supabase.auth.signIn(
        {
          provider,
        },
        {
          redirectTo: `${process.env.NEXT_PUBLIC_ORIGIN}${query.backUrl}`,
        },
      );

      if (error) {
        throw error;
      }
    } catch (error) {
      toast({
        title: error.error_description || error.message,
      });
    }
  };

  return (
    <Root>
      <Header justifyContent="space-between">
        <HomeEntry />
        <ColorModeSwitch />
      </Header>
      <VStack
        flex={1}
        p={8}
        marginX="auto"
        alignItems="stretch"
        justifyContent="center"
        gridGap={2}
      >
        {loading ? (
          <Spinner />
        ) : (
          <VStack alignItems="stretch" justifyContent="center" gridGap={4}>
            <Button
              variant="outline"
              colorScheme="blue"
              flexDirection="column"
              px={10}
              py={10}
              onClick={() => {
                handleSignIn('github');
              }}
              leftIcon={<GithubIcon boxSize={6} />}
            >
              使用 Github 账号登录
            </Button>
            <Button
              variant="outline"
              colorScheme="orange"
              flexDirection="column"
              px={10}
              py={10}
              onClick={() => {
                handleSignIn('gitlab');
              }}
              leftIcon={<GitlabIcon boxSize={6} />}
            >
              使用 Gitlab 账号登录
            </Button>
          </VStack>
        )}
      </VStack>
      <Footer />
    </Root>
  );
};

export const getServerSideProps = compose(
  [withGsspColorMode()],
  async (context: GetServerSidePropsContext) => {
    if (context.req.cookies['sb:token']) {
      const { user } = await supabase.auth.api.getUserByCookie(context.req);

      if (user) {
        return {
          redirect: {
            destination: '/studio',
            permanent: false,
          },
        };
      }
    }

    return {
      props: {},
    };
  },
);

export default Login;
