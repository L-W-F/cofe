import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';
import { CofeWhoami } from '@cofe/types';
import { serialize } from 'cookie';
import { get } from 'utils/io';

export const withGsspWhoami =
  (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspWhoami');

    if (!context.req.cookies.token) {
      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    const whoami: CofeWhoami = await get(`${process.env.DB_URL}/api/whoami`, {
      headers: {
        Authorization: `Bearer ${context.req.cookies.token}`,
      },
    }).catch(() => null);

    if (!whoami) {
      context.res.setHeader(
        'set-cookie',
        serialize('token', '', {
          httpOnly: true,
          path: '/',
          maxAge: -1,
        }),
      );

      return {
        redirect: {
          destination: '/login',
          permanent: false,
        },
      };
    }

    if (next) {
      const { props, ...rest } = await next(context);

      return {
        ...rest,
        props: {
          ...props,
          initialStates: {
            ...props.initialStates,
            whoami,
          },
        },
      };
    }

    return {
      props: { initialStates: { whoami } },
    };
  };
