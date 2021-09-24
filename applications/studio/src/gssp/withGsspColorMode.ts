import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';

export const withGsspColorMode =
  (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspColorMode');

    const colorModeKey = process.env.KEY_OF_COLOR_MODE_COOKIE;
    const colorMode = context.req.cookies[colorModeKey] ?? '';
    const colorModeCookie = `${colorModeKey}=${colorMode}`;

    if (next) {
      const { props, ...rest } = await next(context);

      return {
        ...rest,
        props: {
          ...props,
          colorModeCookie,
        },
      };
    }

    return {
      props: {
        colorModeCookie,
      },
    };
  };
