import React, { useEffect, useState } from 'react';
import { Text, TextProps } from '@chakra-ui/react';
import { Renderer } from '@cofe/core';
import { CofeRendererProps } from '@cofe/types';

interface TextRendererProps extends CofeRendererProps, TextProps {
  content?: string;
}

let _toHTML;

const toHTML = async (content: string) => {
  if (!_toHTML) {
    _toHTML = await import('@cofe/md').then(({ createToHTML }) =>
      createToHTML(),
    );
  }

  return _toHTML(content);
};

export const TextRenderer = ({
  isDesign,
  content,
  // dropping children
  children,
  ...props
}: TextRendererProps) => {
  const [hProps, setHProps] = useState(null);

  useEffect(() => {
    toHTML(content).then((__html) => {
      setHProps({
        dangerouslySetInnerHTML: {
          __html,
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

Renderer.add({
  type: 'text',
  renderer: TextRenderer,
});
