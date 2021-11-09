import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';
import { CofeDbProfile } from '@cofe/types';
import { supabase } from '@/utils/supabase';
import { user2whoami } from '@/utils/user2whoami';

export const withGsspWhoami =
  (options?) => (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspWhoami');

    const { user } = await supabase.auth.api.getUserByCookie(context.req);

    if (!user) {
      if (options?.loose) {
        return next(context);
      }

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
            whoami: await getProfile(user),
          },
        },
      };
    }

    return {
      props: { initialStates: { whoami: await getProfile(user) } },
    };
  };

async function getProfile(user: any) {
  const { data: profiles } = await supabase
    .from('profiles')
    .select()
    .eq('id', user.id);

  return mergeProfile(profiles?.[0] ?? {}, user2whoami(user));
}

function mergeProfile(a: Partial<CofeDbProfile>, b: Partial<CofeDbProfile>) {
  Object.entries(b).forEach(([k, v]) => {
    if (v && !a[k]) {
      a[k] = v;
    }
  });

  return a;
}
