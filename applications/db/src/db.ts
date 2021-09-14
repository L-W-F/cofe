import { dirname, join } from 'path';
import { fileURLToPath } from 'url';
import { DbData } from '@cofe/types';
import { chain } from 'lodash';
import { JSONFile, Low, Memory } from 'lowdb';
import { example } from './example';

const adapter = process.env.VERCEL
  ? new Memory<Record<string, DbData>>()
  : new JSONFile<Record<string, DbData>>(
      join(dirname(fileURLToPath(import.meta.url)), '../data/db.json'),
    );

export const db = new Low(adapter);

export const dbc = async () => {
  await db.read();

  if (db.data === null) {
    db.data = example;

    // skip await for performance
    await db.write();
  }

  return chain(db.data);
};
