import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';
import { formatDate } from '@cofe/utils';

export const withCurrentTime =
  (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withCurrentTime');

    const currentTime = formatDate(Date.now());

    if (next) {
      const { props, ...rest } = await next(context);

      return {
        ...rest,
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
