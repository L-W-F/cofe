import { CofeRenderer } from '@cofe/types';

const map = new Map<string, CofeRenderer>();

export class Renderer {
  static add({ type, renderer }: { type: string; renderer: CofeRenderer }) {
    map.set(type, renderer);
  }

  static get(type: string) {
    return map.get(type);
  }

  static del(type: string) {
    map.delete(type);
  }
}
