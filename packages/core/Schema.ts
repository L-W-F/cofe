import { CofeSchema, CofeTemplate } from '@cofe/types';

export class Schema {
  static isAtom(schema: CofeSchema | CofeTemplate) {
    return schema.type.indexOf(':') === -1;
  }

  static isTemplate(schema: CofeSchema | CofeTemplate) {
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
