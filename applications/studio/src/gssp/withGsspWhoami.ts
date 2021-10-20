import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';
import { supabase } from '@/utils/supabase';

export const withGsspWhoami =
  (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspWhoami');

    const { user } = await supabase.auth.api.getUserByCookie(context.req);

    if (!user) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    // 设置 token，用于后续接口调用
    supabase.auth.setAuth(context.req.cookies['sb:token']);

    if (next) {
      const { props, ...rest } = await next(context);

      if (!props) {
        return rest;
      }

      return {
        ...rest,
        props: {
          ...props,
          initialStates: {
            ...props.initialStates,
            whoami: user,
          },
        },
      };
    }

    return {
      props: { initialStates: { whoami: user } },
    };
  };
