import { CofeSchema } from '@cofe/types';
import { extractDefaults, makeId } from '@cofe/utils';
import { u } from 'unist-builder';

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

  static createCompositeNode(
    { type, properties, children }: CofeSchema,
    dry?: boolean,
  ) {
    const props = {
      id: makeId(),
    };

    // @todo actions and events
    if (properties) {
      Object.assign(props, { properties: extractDefaults(properties) });
    }

    return u(
      type,
      props,
      children?.map((m) => Schema.createCompositeNode(m, dry)),
    );
  }

  static createAtomicNode({ type, properties }: CofeSchema) {
    const props = {
      id: makeId(),
    };

    // @todo actions and events
    if (properties) {
      Object.assign(props, { properties: extractDefaults(properties) });
    }

    return u(type, props);
  }

  static createNode(schema: CofeSchema) {
    if (Schema.isTemplate(schema)) {
      return Schema.createCompositeNode(schema.template);
    }

    return Schema.createAtomicNode(schema);
  }
}
