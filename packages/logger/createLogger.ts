import _debug from 'debug';

export const createLogger = (
  level: string,
  output: (...args: any[]) => void = _debug.log,
) => {
  const logger = _debug('c').extend(level);

  const cache = new Map<string, _debug.Debugger>();

  return (service: string) => {
    let instance: _debug.Debugger;

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

      cache.set(service, instance);
    }

    return instance;
  };
};

export const { enable, disable } = _debug;
