import { CofeSchema } from '@cofe/types';

export class Schema {
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
