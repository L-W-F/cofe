import { Renderer } from '@cofe/core';
import { ButtonRenderer } from './Button';
import { FragmentRenderer } from './Fragment';
import { GridRenderer } from './Grid';
import { IconRenderer } from './Icon';
import { LinkRenderer } from './Link';
import { TextRenderer } from './Text';

Renderer.register({
  fragment: FragmentRenderer,
  grid: GridRenderer,
  button: ButtonRenderer,
  link: LinkRenderer,
  text: TextRenderer,
  icon: IconRenderer,
});
