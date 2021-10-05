import { CofeRenderer, CofeSchema } from '@cofe/types';

const renderers = new Map<CofeSchema['type'], CofeRenderer>();

export class Renderer {
  static add(type: string, renderer: CofeRenderer) {
    renderers.set(type, renderer);
  }

  static get(type: string) {
    return renderers.get(type);
  }

  static del(type: string) {
    renderers.delete(type);
  }
}
