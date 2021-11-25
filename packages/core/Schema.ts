import { CofeSchema } from '@cofe/types';
import { merge } from 'lodash-es';

const map = new Map<string, CofeSchema>();

const atomKeys = new Set<string>();
const mixinKeys = new Set<string>();
const templateKeys = new Set<string>();

const atomCache = new Map<string, CofeSchema>();

export class Schema {
  static map(callback: (v: [string, CofeSchema]) => unknown) {
    return Array.from(map.entries()).map(callback);
  }

  static add(schema: CofeSchema) {
    if (Schema.isAtom(schema)) {
      atomKeys.add(schema.type);
    } else if (Schema.isMixin(schema)) {
      mixinKeys.add(schema.type);
    } else if (Schema.isTemplate(schema)) {
      templateKeys.add(schema.type);
    }

    map.set(schema.type, schema);
  }

  static get(type: string) {
    if (!atomCache.has(type)) {
      const schema = map.get(type);

      if (schema) {
        const mixins = schema?.extends?.map(Schema.get);

        if (mixins) {
          atomCache.set(type, merge(schema, ...mixins, { type }));
        }

        atomCache.set(type, schema);
      }
    }

    return atomCache.get(type);
  }

  static del(type: string) {
    map.delete(type);
  }

  static getAtomKeys() {
    return Array.from(atomKeys.keys());
  }

  static getTemplateKeys() {
    return Array.from(templateKeys.keys());
  }

  static isAtom(schema: CofeSchema) {
    return schema.type.indexOf(':') === -1;
  }

  static isMixin(schema: CofeSchema) {
    return schema.type.indexOf('mixin:') === 0;
  }

  static isTemplate(schema: CofeSchema) {
    return schema.type.indexOf('template:') === 0;
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
