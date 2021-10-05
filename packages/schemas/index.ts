import { Schema } from '@cofe/core';
import { ButtonSchema } from './atom/Button';
import { FragmentSchema } from './atom/Fragment';
import { GridSchema } from './atom/Grid';
import { IconSchema } from './atom/Icon';
import { LinkSchema } from './atom/Link';
import { TextSchema } from './atom/Text';
import { FooterSchema } from './template/Footer';
import { HeaderSchema } from './template/Header';

Schema.add('fragment', FragmentSchema);
Schema.add('grid', GridSchema);
Schema.add('button', ButtonSchema);
Schema.add('link', LinkSchema);
Schema.add('text', TextSchema);
Schema.add('icon', IconSchema);

Schema.add('template:header', HeaderSchema);
Schema.add('template:footer', FooterSchema);
