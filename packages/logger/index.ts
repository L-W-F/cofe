import { createLogger } from './createLogger';

export * from './createLogger';

export const debug = createLogger('d');
export const info = createLogger('i');
export const warn = createLogger('w');
export const error = createLogger('e');
