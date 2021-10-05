import { CofeSchema } from '@cofe/types';

export const FooterSchema: CofeSchema = {
  type: 'grid',
  properties: {
    rows: {
      default: 2,
    },
  },
  children: [
    {
      type: 'link',
      properties: {
        href: {
          default: '/',
        },
      },
      children: [
        {
          type: 'icon',
        },
      ],
    },
    {
      type: 'link',
      children: [
        {
          type: 'text',
        },
      ],
    },
  ],
};
