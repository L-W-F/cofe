import React, { useEffect, useState } from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { AtomProps } from './types';

interface TextAtomProps extends AtomProps, TextProps {
  content?: string;
}

let _toHTML;

const toHTML = (content: string) => {
  return Promise.resolve(
    _toHTML ||
      import('@cofe/md').then(({ createToHTML }) => {
        _toHTML = createToHTML();

        return _toHTML;
      }),
  )
    .then((fn) => fn(content))
    .then((vf) => vf.toString());
};

export const TextAtom = ({
  isDesign,
  content,
  // dropping children
  children,
  ...props
}: TextAtomProps) => {
  const [hProps, setHProps] = useState(null);

  useEffect(() => {
    toHTML(content).then((vf) => {
      setHProps({
        dangerouslySetInnerHTML: {
          __html: vf.toString(),
        },
      });
    });
  }, [content]);

  return (
    <Text
      _empty={
        isDesign
          ? {
              '&:before': {
                content: '"Text"',
                color: 'gray.400',
                height: '1rem',
              },
            }
          : null
      }
      {...hProps}
      {...props}
    />
  );
};
