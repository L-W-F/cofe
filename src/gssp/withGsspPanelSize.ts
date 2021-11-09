import { GetServerSidePropsContext } from 'next';
import { debug } from '@cofe/logger';

export const withGsspPanelSize =
  (options?) => (next?) => async (context: GetServerSidePropsContext) => {
    debug('gssp')('withGsspPanelSize');

    const { left_pane_size = '240', right_pane_size = '240' } =
      context.req.cookies;

    if (next) {
      const { props, ...rest } = await next(context);

      if (!props) {
        return rest;
      }

      return {
        ...rest,
        props: {
          ...props,
          leftPaneSize: +left_pane_size,
          rightPaneSize: +right_pane_size,
        },
      };
    }

    return {
      props: {
        leftPaneSize: +left_pane_size,
        rightPaneSize: +right_pane_size,
      },
    };
  };
