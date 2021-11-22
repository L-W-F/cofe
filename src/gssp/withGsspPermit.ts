import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';

export const withGsspPermit =
  (options?) => (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspPermit');

    if (context.req.headers['user-agent'].indexOf('Mobi') !== -1) {
      return {
        props: {
          err: {
            message: '暂不支持触屏设备，请使用桌面浏览器访问。',
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
