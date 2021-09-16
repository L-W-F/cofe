import { GetServerSidePropsContext } from 'next';
import { makeId } from '@cofe/utils';
import { errorCache } from 'utils/cache';

export const withGsspCatch =
  (next?) => async (context: GetServerSidePropsContext) => {
    try {
      return await next(context);
    } catch (error) {
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
