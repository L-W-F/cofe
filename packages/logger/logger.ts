import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import _debug from 'debug';

const logger = _debug('cofe');

const map = new Map<string, _debug.Debugger>();

let logFilename: string;
let writeStream: fs.WriteStream;

const writeToFile = (
  time: string,
  service: string,
  level: string,
  message: string,
) => {
  try {
    const folder = path.join(process.cwd(), process.env.LOGGER_ROOT);
    const filename = time.slice(0, 10);

    if (logFilename !== filename) {
      logFilename = filename;

      /* istanbul ignore if */
      if (writeStream) {
        writeStream.end();
        writeStream = null;
      }
    }

    const filepath = path.join(folder, logFilename);

    const cb = () => {
      if (!writeStream) {
        writeStream = fs.createWriteStream(filepath, { flags: 'a' });
      }

      writeStream.write(
        `${JSON.stringify({
          time,
          service,
          level,
          message,
        })}\n`,
      );
    };

    if (!writeStream) {
      fs.access(filepath, (e1) => {
        /* istanbul ignore else */
        if (e1) {
          fs.mkdir(folder, { recursive: true }, (e2) => {
            /* istanbul ignore else */
            if (!e2) {
              cb();
            }
          });
        } else {
          cb();
        }
      });
    } else {
      /* istanbul ignore next */
      cb();
    }
  } catch (error) {}
};

const createLogger = (level: string) => (service: string) => {
  const key = `${level.charAt(0).toLowerCase()}:${service}`;

  let instance: _debug.Debugger;

  if (map.has(key)) {
    instance = map.get(key);
  } else {
    instance = logger.extend(key);

    // date + space + namespace + space
    const sliceIndex = instance.namespace.length + 26;

    instance.log = (formatter: any, ...args: Array<any | (() => any)>) => {
      args.forEach((arg, i) => {
        if (typeof arg === 'function') {
          try {
            args[i] = arg();
          } catch (e) {}
        }
      });

      const message = util.format(formatter, ...args);

      process.stderr.write(`${message}\n`);

      if (process.env.LOGGER_ROOT && process.env.DEBUG_COLORS === 'false') {
        writeToFile(
          message.slice(0, 24),
          service,
          level,
          message.slice(sliceIndex),
        );
      }
    };

    map.set(key, instance);
  }

  return instance;
};

export const { enable, disable } = _debug;

export const debug = createLogger('DEBUG');
export const info = createLogger('INFO');
export const warn = createLogger('WARN');
export const error = createLogger('ERROR');
