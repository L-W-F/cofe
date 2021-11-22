import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';

export const withGsspPaneSize =
  (options?) => (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspPaneSize');

    const { lps = '240', rps = '240' } = context.req.cookies;

    if (next) {
      const { props, ...rest } = await next(context);

      if (!props) {
        return rest;
      }

      return {
        ...rest,
        props: {
          ...props,
          lps: +lps,
          rps: +rps,
        },
      };
    }

    return {
      props: {
        lps: +lps,
        rps: +rps,
      },
    };
  };
