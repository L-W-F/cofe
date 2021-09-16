import { GetServerSidePropsContext } from 'next';
import { formatDate } from '@cofe/utils';

export const withCurrentTime =
  (next?) => async (context: GetServerSidePropsContext) => {
    const currentTime = formatDate(Date.now());

    if (next) {
      const { props } = await next(context);

      return {
        props: {
          ...props,
          currentTime,
        },
      };
    }

    return {
      props: {
        currentTime,
      },
    };
  };
