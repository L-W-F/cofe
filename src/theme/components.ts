import { ThemeComponents } from '@chakra-ui/react';
import { mode } from '@chakra-ui/theme-tools';

export const components: ThemeComponents = {
  Accordion: {
    baseStyle: {
      container: {
        borderTopWidth: 0,
        _last: {
          borderBottomWidth: 0,
        },
      },
    },
  },
  Button: {
    baseStyle: {},
  },
  Card: {
    baseStyle: {
      py: 2,
    },
  },
  Icon: {
    baseStyle: ({ color, ...props }) => ({
      transition: 'color 0.2s',
      color: `var(--chakra-colors-${color}-600)`,
      _hover: {
        color: `var(--chakra-colors-${color}-${mode(800, 400)(props)})`,
      },
    }),
    defaultProps: {
      color: 'gray',
    },
  },
  Link: {
    baseStyle: ({ colorScheme, ...props }) => ({
      transition: 'color 0.2s',
      color: `var(--chakra-colors-${colorScheme}-${
        colorScheme === 'gray' ? mode(700, 200)(props) : 500
      })`,
      _hover: {
        color: `var(--chakra-colors-${colorScheme}-${mode(600, 400)(props)})`,
      },
    }),
    defaultProps: {
      colorScheme: 'primary',
    },
  },
  Markdown: {
    baseStyle: ({ colorScheme, ...props }) => ({
      color:
        colorScheme === 'current'
          ? 'inherit'
          : `var(--chakra-colors-${colorScheme}-${
              colorScheme === 'gray' ? mode(700, 200)(props) : 500
            })`,
    }),
    defaultProps: {
      colorScheme: 'gray',
    },
  },
  Paper: {
    baseStyle: (props) => ({
      transition: 'background .2s',
      bg: mode('gray.50', 'gray.900')(props),
    }),
  },
  Text: {
    baseStyle: ({ colorScheme, ...props }) => ({
      color:
        colorScheme === 'current'
          ? 'inherit'
          : `var(--chakra-colors-${colorScheme}-${
              colorScheme === 'gray' ? mode(700, 200)(props) : 500
            })`,
    }),
    defaultProps: {
      colorScheme: 'gray',
    },
  },
  Toolbar: {
    baseStyle: {
      display: 'flex',
      zIndex: 2,
      minH: 12,
      px: 4,
      gridGap: 2,
      alignItems: 'center',
    },
    sizes: {
      xs: {
        px: 2,
        minH: 4,
        gridGap: 0.5,
      },
      sm: {
        px: 3,
        minH: 8,
        gridGap: 1,
      },
    },
  },
};
