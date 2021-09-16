import { GetServerSidePropsContext } from 'next';
import { CofeWhoami } from '@cofe/types';
import { get } from 'utils/io';

export const withGsspWhoami =
  (next?) => async (context: GetServerSidePropsContext) => {
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
    });

    if (next) {
      const { props } = await next(context);

      return {
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
