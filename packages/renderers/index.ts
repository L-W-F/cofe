import { Renderer } from '@cofe/core';
import { ButtonRenderer } from './atom/Button';
import { FragmentRenderer } from './atom/Fragment';
import { GridRenderer } from './atom/Grid';
import { IconRenderer } from './atom/Icon';
import { LinkRenderer } from './atom/Link';
import { TextRenderer } from './atom/Text';

Renderer.add('fragment', FragmentRenderer);
Renderer.add('grid', GridRenderer);
Renderer.add('button', ButtonRenderer);
Renderer.add('link', LinkRenderer);
Renderer.add('text', TextRenderer);
Renderer.add('icon', IconRenderer);
