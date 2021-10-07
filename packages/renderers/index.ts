import { Renderer } from '@cofe/core';
import { debug } from '@cofe/logger';
import { ButtonRenderer } from './Button';
import { FragmentRenderer } from './Fragment';
import { GridRenderer } from './Grid';
import { IconRenderer } from './Icon';
import { LinkRenderer } from './Link';
import { TextRenderer } from './Text';

export const registerRenderers = () => {
  if (process.env.NODE_ENV === 'development') {
    debug('renderers')('registering');
  }

  Renderer.add('fragment', FragmentRenderer);
  Renderer.add('grid', GridRenderer);
  Renderer.add('button', ButtonRenderer);
  Renderer.add('link', LinkRenderer);
  Renderer.add('text', TextRenderer);
  Renderer.add('icon', IconRenderer);
};
