export const isPromise = (obj: unknown) =>
  !!obj &&
  (typeof obj === 'object' || typeof obj === 'function') &&
  typeof (obj as unknown as any).then === 'function';
