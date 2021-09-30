import { CreateToHTMLOptions } from '../types';
import { figure } from './figure';
import { oembed } from './oembed';

const defaultToHastHandlers = { figure, oembed };

export const createToHastOptions = ({
  handlers,
  ...options
}: CreateToHTMLOptions['toHastOptions'] = {}) => {
  return {
    handlers: {
      ...defaultToHastHandlers,
      ...handlers,
    },
    ...options,
  };
};
