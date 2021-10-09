import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';
import stripAnsi from 'strip-ansi';

let logFilename: string;
let writeStream: fs.WriteStream;

const useColors =
  process.env.DEBUG_COLORS &&
  /^(yes|on|true|enabled)$/i.test(process.env.DEBUG_COLORS);

export const createLog2file =
  (root: string) =>
  (formatter: string, ...args: any[]) => {
    try {
      const folder = path.join(process.cwd(), root);

      let time: string;
      let message = util.format(formatter, ...args);

      if (useColors) {
        time = new Date().toISOString();
        message = stripAnsi(message);
      } else {
        time = message.slice(0, 24);
        message = message.slice(24);
      }

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

        writeStream.write(`${time} ${message}\n`);
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
