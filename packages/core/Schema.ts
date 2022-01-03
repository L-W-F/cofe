import { CofeAtom, CofeMolecule } from '@cofe/types';

export class Schema {
  static isAtom(schema: CofeAtom | CofeMolecule) {
    return schema.type.indexOf(':') === -1;
  }

  static isMolecule(schema: CofeAtom | CofeMolecule) {
    return schema.type.indexOf('molecule:') === 0;
  }

  static isAccepted(accept: string[], type: string) {
    if (!accept?.length) {
      return false;
    }

    if (type === 'unknown') {
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
