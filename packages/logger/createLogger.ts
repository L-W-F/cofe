import debug from 'debug';

export interface CreateLoggerOptions {
  output?: (...args: any[]) => void;
  enhancer?: (_: debug.Debugger & { useColors?: boolean }) => void;
}

export const createLogger = (
  level: string,
  { output = debug.log, enhancer }: CreateLoggerOptions = {},
) => {
  const logger = debug('c').extend(level);

  const cache = new Map<string, debug.Debugger>();

  return (service: string) => {
    let instance: debug.Debugger;

    if (cache.has(service)) {
      instance = cache.get(service);
    } else {
      instance = logger.extend(service);

      instance.log = (formatter: string, ...args: Array<any | (() => any)>) => {
        args.forEach((arg, i) => {
          if (typeof arg === 'function') {
            try {
              args[i] = arg();
            } catch (e) {}
          }
        });

        output(formatter, ...args);
      };

      enhancer?.(instance);

      cache.set(service, instance);
    }

    return instance;
  };
};

export const { enable, disable } = debug;
