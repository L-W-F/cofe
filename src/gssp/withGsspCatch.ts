import { GetServerSidePropsContext } from 'next';
import { debug, warn } from '@cofe/logger';

export const withGsspCatch =
  (options?) => (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspCatch');

    if (next) {
      try {
        return await next(context);
      } catch (err) {
        warn('gssp')('[error] %j', err.message);
        debug('gssp')('[stack] %j', err.stack);

        return {
          props: {
            err,
          },
        };
      }
    } else {
      return {
        props: {},
      };
    }
  };
