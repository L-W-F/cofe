import React, { useEffect } from 'react';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { useRouter } from 'next/router';
import { Box, Button, SimpleGrid } from '@chakra-ui/react';
import { compose } from '@cofe/gssp';
import { post } from '@cofe/io';
import { withGsspColorMode } from 'gssp/withGsspColorMode';
import { Header } from 'components/Header';
import { Root } from '@/components/Root';
import { supabase } from '@/utils/supabase';

const Login = (
  props: InferGetServerSidePropsType<typeof getServerSideProps>,
) => {
  const { push } = useRouter();

  useEffect(() => {
    const callback = async (event, session) => {
      await post('/api/login', { event, session });

      if (session) {
        push('/');
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
      const { error } = await supabase.auth.signIn({
        provider,
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
    }
  };

  return (
    <Root>
      <Header />
      <Box p={10}>
        <SimpleGrid maxW={80} marginX="auto" columns={3} gridGap={2}>
          {[
            'Apple',
            'Azure',
            'Bitbucket',
            'Discord',
            'Facebook',
            'GitHub',
            'GitLab',
            'Google',
            'Twitter',
            'Twitch',
            'Twilio',
          ].map((provider) => (
            <Button
              key={provider}
              variant="outline"
              onClick={() => {
                handleSignIn(provider.toLowerCase());
              }}
            >
              {provider}
            </Button>
          ))}
        </SimpleGrid>
      </Box>
    </Root>
  );
};

export const getServerSideProps = compose(
  [withGsspColorMode],
  async (context: GetServerSidePropsContext) => {
    if (context.req.cookies['sb:token']) {
      const { user } = await supabase.auth.api.getUserByCookie(context.req);

      if (user) {
        return {
          redirect: {
            destination: '/',
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
