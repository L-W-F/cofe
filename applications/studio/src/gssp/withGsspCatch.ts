import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';
import { makeId } from '@cofe/utils';

export const errorCache = new Map();

export const withGsspCatch =
  (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspCatch');

    try {
      return await next(context);
    } catch (error) {
      debug('gssp')('%j', error);
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
