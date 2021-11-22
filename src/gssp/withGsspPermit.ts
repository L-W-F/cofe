import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';

export const withGsspPermit =
  (options?) => (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspPermit');

    if (context.req.headers['user-agent'].indexOf('Mobi') !== -1) {
      return {
        props: {
          error: {
            message: '暂不支持触屏设备',
          },
        },
      };
    }

    if (next) {
      return next(context);
    }

    return {
      props: {},
    };
  };
