import { GetServerSidePropsContext } from 'next';

export const withGsspColorMode =
  (next?) => async (context: GetServerSidePropsContext) => {
    const colorModeKey = process.env.KEY_OF_COLOR_MODE_COOKIE;
    const colorMode = context.req.cookies[colorModeKey] ?? '';
    const colorModeCookie = `${colorModeKey}=${colorMode}`;

    if (next) {
      const { props } = await next(context);

      return {
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
