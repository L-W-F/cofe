import { CofeSchema } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { clone, merge } from 'lodash';
import { u } from 'unist-builder';

type SchemaType = CofeSchema['type'];

const schemas = new Map<SchemaType, CofeSchema>();

export class Schema {
  static add(type: SchemaType, model: CofeSchema) {
    schemas.set(type, model);
  }

  static get(type: SchemaType) {
    return schemas.get(type);
  }

  static del(type: SchemaType) {
    schemas.delete(type);
  }

  static keys(ns?: string) {
    return Array.from(schemas.keys()).filter((type) =>
      ns
        ? ns[0] === '!'
          ? type.indexOf(`${ns.slice(1)}:`) === -1
          : type.indexOf(`${ns}:`) === 0
        : true,
    );
  }

  static getPropertiesDefaults(type: SchemaType) {
    return extractDefaults(schemas.get(type)?.properties);
  }

  static isTemplate(type: SchemaType) {
    return type.indexOf('template:') === 0;
  }

  static createCompositeNode({
    type,
    children,
    properties,
    actions,
    events,
  }: CofeSchema) {
    const props = {
      id: makeId(),
      properties: Schema.getPropertiesDefaults(type),
      // @todo actions and events
    };

    return u(
      type,
      merge(props, {
        properties,
        actions,
        events,
      }),
      children?.map((m) => Schema.createCompositeNode(m)),
    );
  }

  static createAtomicNode(type: SchemaType) {
    return u(type, {
      id: makeId(),
      properties: Schema.getPropertiesDefaults(type),
      // @todo actions and events
    });
  }

  static createNode(type: SchemaType) {
    if (Schema.isTemplate(type)) {
      return Schema.createCompositeNode(Schema.get(type));
    }

    return Schema.createAtomicNode(type);
  }
}

function extractDefaults(
  { default: dft, type, properties = {} } = {} as any,
): any {
  if (typeof dft !== 'undefined') {
    return clone(dft);
  }

  switch (type) {
    case 'string':
      return '';
    case 'number':
      return 0;
    case 'boolean':
      return false;
    case 'array':
      return [];
    case 'object':
      return Object.entries(properties).reduce(
        (o, [k, v]) => ({
          ...o,
          [k]: extractDefaults(v),
        }),
        {},
      );
    default:
  }
}
