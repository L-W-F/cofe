import { GetServerSidePropsContext } from 'next';
import { debug, warn } from '@cofe/logger';

export const withGsspCatch =
  (options?) => (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspCatch');

    if (next) {
      try {
        return await next(context);
      } catch (error) {
        warn('gssp')('[error] %j', error.message);
        debug('gssp')('[stack] %j', error.stack);

        return {
          props: {
            error,
          },
        };
      }
    } else {
      return {
        props: {},
      };
    }
  };
