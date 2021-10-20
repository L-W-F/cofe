import * as fs from 'fs';
import * as path from 'path';
import * as util from 'util';

let logFilename: string;
let writeStream: fs.WriteStream;

export const createLog2file =
  (root: string) =>
  (formatter: string, ...args: any[]) => {
    try {
      const folder = path.join(process.cwd(), root);

      const message = util.format(formatter, ...args);

      const filename = message.slice(0, 10);

      if (logFilename !== filename) {
        logFilename = filename;

        /* istanbul ignore if */
        if (writeStream) {
          writeStream.json(null);
          writeStream = null;
        }
      }

      const filepath = path.join(folder, logFilename);

      const cb = () => {
        if (!writeStream) {
          writeStream = fs.createWriteStream(filepath, { flags: 'a' });
        }

        writeStream.write(`${message}\n`);
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
