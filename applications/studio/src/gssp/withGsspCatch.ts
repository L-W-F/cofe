import { GetServerSidePropsContext } from 'next';
import { debug, warn } from '@cofe/logger';
import { makeId } from '@cofe/utils';

export const errorCache = new Map();

export const withGsspCatch =
  (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspCatch');

    try {
      return await next(context);
    } catch (error) {
      warn('gssp')('[error] %j', error.message);
      debug('gssp')('[stack] %j', error.stack);

      const id = makeId();

      errorCache.set(id, error.message);

      return {
        redirect: {
          destination: `error?${id}`,
          permanent: false,
        },
      };
    }
  };
