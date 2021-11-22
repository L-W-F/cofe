import debug from 'debug';

export const createLogger = (level: string) => {
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

        debug.log(formatter, ...args);
      };

      cache.set(service, instance);
    }

    return instance;
  };
};

export const { enable, disable } = debug;
