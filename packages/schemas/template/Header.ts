import { CofeSchema } from '@cofe/types';

export const HeaderSchema: CofeSchema = {
  type: 'fragment',
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
          type: 'icon',
        },
      ],
    },
  ],
};
