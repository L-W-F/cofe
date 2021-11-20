import { CofeSchema } from '@cofe/types';
import { merge } from 'lodash-es';

const map = new Map<string, CofeSchema>();

export class Schema {
  static register(schemas: Record<string, CofeSchema>) {
    Object.entries(schemas).forEach(([type, schema]) => {
      map.set(type, schema);
    });
  }

  static map(callback: (v: [string, CofeSchema]) => unknown) {
    return Array.from(map.entries()).map(callback);
  }

  static add(type: string, schema: CofeSchema) {
    map.set(type, schema);
  }

  static get(type: string) {
    const schema = map.get(type);
    const mixins = schema?.extends?.map((t) => map.get(t)) ?? [];

    return schema ? merge(schema, ...mixins, { type }) : schema;
  }

  static del(type: string) {
    map.delete(type);
  }

  static isAtom(schema: CofeSchema) {
    return schema.type.indexOf(':') === -1;
  }

  static isTemplate(schema: CofeSchema) {
    return schema.hasOwnProperty('template');
  }

  static isAccepted(accept: string[], type: string) {
    if (!accept?.length) {
      return false;
    }

    return accept.some((r) => {
      if (r === '*') {
        return true;
      }

      if (r[0] === '!') {
        return r.slice(1) !== type;
      }

      return r === type;
    });
  }
}
