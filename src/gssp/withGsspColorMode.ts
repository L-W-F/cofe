import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';

export const withGsspColorMode =
  (options?) => (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspColorMode');

    const colorModeKey = process.env.KEY_OF_COLOR_MODE_COOKIE;
    const colorMode = context.req.cookies[colorModeKey] ?? '';
    const cmc = `${colorModeKey}=${colorMode}`;

    if (next) {
      const { props, ...rest } = await next(context);

      if (!props) {
        return rest;
      }

      return {
        ...rest,
        props: {
          ...props,
          cmc,
        },
      };
    }

    return {
      props: {
        cmc,
      },
    };
  };
