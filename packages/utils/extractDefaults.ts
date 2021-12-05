import { cloneDeep } from 'lodash-es';

export const extractDefaults = (
  { default: dft, type, properties = {} } = {} as any,
): any => {
  if (dft !== undefined) {
    return cloneDeep(dft);
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
      return Object.entries(properties).reduce((o, [k, v]) => {
        const _v = extractDefaults(v);

        return _v === undefined
          ? o
          : {
              ...o,
              [k]: _v,
            };
      }, {});
    default:
  }
};
