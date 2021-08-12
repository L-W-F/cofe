import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { JSONFile, Low, Memory } from 'lowdb';
import { ConfigState } from './store/modules/config';
import { PageState } from './store/modules/page';

type Data = {
  config: ConfigState;
  page: PageState;
};

const adapter = process.env.VERCEL
  ? new Memory<Data>()
  : new JSONFile<Data>(
      join(dirname(fileURLToPath(import.meta.url)), '../data/db.json'),
    );

export const db = new Low(adapter);
