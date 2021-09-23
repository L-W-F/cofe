import { join } from 'path';
import { Db } from '@cofe/types';
import { JSONFile, Low, Memory } from 'lowdb';
import { ValuesType } from 'utility-types';
import { makeExample } from './example';

const adapter = process.env.VERCEL
  ? new Memory<Db>()
  : new JSONFile<Db>(join(process.cwd(), 'data/db.json'));

const db = new Low<Db>(adapter);

async function ensureGet<K extends keyof Db>(scope: K) {
  await db.read();

  let changed = false;

  if (db.data === null) {
    db.data = makeExample();

    changed = true;
  }

  if (!db.data[scope]) {
    db.data[scope] = [];

    changed = true;
  }

  if (changed) {
    await db.write();
  }
}

export async function get<K extends keyof Db, T = Db[K]>(
  scope: K,
  filter?: string | ((item: ValuesType<T>) => boolean),
): Promise<T> {
  await ensureGet(scope);

  const data: any = db.data[scope];

  return filter
    ? data.filter(
        typeof filter === 'string' ? (item: any) => item.id === filter : filter,
      )
    : data;
}

export async function getOne<K extends keyof Db, T = Db[K]>(
  scope: K,
  filter: string | ((item: ValuesType<T>) => boolean),
): Promise<ValuesType<T>> {
  await ensureGet(scope);

  const data: any[] = db.data[scope];

  const found = data.find(
    typeof filter === 'string' ? (item: any) => item.id === filter : filter,
  );

  if (typeof found === 'undefined') {
    const error: any = Error('数据不存在，或无法访问');

    error.code = 404;

    throw error;
  }

  return found;
}

function ensureSet<K extends keyof Db>(scope: K) {
  if (!db.data) {
    db.data = {};
  }

  if (!db.data[scope]) {
    db.data[scope] = [];
  }
}

export async function set<K extends keyof Db, T = Db[K]>(
  scope: K,
  value: Partial<ValuesType<T>>,
  test?: (item: ValuesType<T>) => boolean,
  replace?: boolean,
) {
  ensureSet(scope);

  const data: any[] = db.data[scope];

  if (typeof test === 'boolean') {
    replace = test;
    test = null;
  }

  const index = data.findIndex(test || (({ id }) => id === (value as any)?.id));

  if (index === -1) {
    data.push(value);
  } else {
    data[index] = replace
      ? value
      : {
          ...data[index],
          ...value,
        };
  }

  return db.write();
}

export async function del<K extends keyof Db, T = Db[K]>(
  scope: K,
  filter: string | ((item: ValuesType<T>) => boolean),
) {
  ensureSet(scope);

  const data: any[] = db.data[scope];

  db.data[scope] = data.filter((item: any) =>
    typeof filter === 'string' ? item.id !== filter : !filter(item),
  );

  return db.write();
}
