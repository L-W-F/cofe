import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';
import { dt } from '@cofe/utils';

export const withGsspCurrentTime =
  (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withCurrentTime');

    const currentTime = dt().format('YYYY-MM-DD HH:mm:ss');

    if (next) {
      const { props, ...rest } = await next(context);

      if (!props) {
        return rest;
      }

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
