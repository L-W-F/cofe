import { join } from 'path';
import { Db } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { JSONFile, Low, Memory } from 'lowdb';
import { ValuesType } from 'utility-types';
import { makeExample } from './example';

const adapter = process.env.VERCEL
  ? new Memory<Db>()
  : new JSONFile<Db>(join(process.cwd(), 'data/db.json'));

const db = new Low<Db>(adapter);

type ItemTest<T> = (item: ValuesType<T>) => boolean;

function find(items: any[], test: any) {
  return test
    ? items.find(
        typeof test === 'string' ? (item: any) => item.id === test : test,
      )
    : items;
}

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
  test?: string | ItemTest<T>,
): Promise<T> {
  await ensureGet(scope);

  const data: any = db.data[scope];

  return test
    ? data.filter(
        typeof test === 'string' ? (item: any) => item.id === test : test,
      )
    : data;
}

export async function getOne<K extends keyof Db, T = Db[K]>(
  scope: K,
  test: string | ItemTest<T>,
): Promise<ValuesType<T>> {
  await ensureGet(scope);

  const data: any[] = db.data[scope];

  const found = find(data, test);

  if (!found) {
    return Promise.reject({
      code: 404,
      message: '数据不存在，或无法访问',
    });
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

export async function add<K extends keyof Db, T = Db[K]>(
  scope: K,
  value: Partial<ValuesType<T>>,
  test: ItemTest<T>,
) {
  ensureSet(scope);

  const data: any[] = db.data[scope];

  const found = find(data, test);

  if (found) {
    return Promise.reject({
      code: 409,
      message: '数据已存在',
    });
  }

  Object.assign(value, {
    id: makeId(),
    createdAt: Date.now(),
    updatedAt: Date.now(),
  });

  data.push(value);

  await db.write();

  return value;
}

export async function set<K extends keyof Db, T = Db[K]>(
  scope: K,
  value: Partial<ValuesType<T>>,
  test?: string | ItemTest<T>,
) {
  ensureSet(scope);

  const data: any[] = db.data[scope];

  const found = find(data, test ?? (value as any).id);

  if (!found) {
    return Promise.reject({
      code: 404,
      message: '数据不存在，或无法访问',
    });
  }

  Object.assign(found, value, {
    updatedAt: Date.now(),
  });

  await db.write();

  return found;
}

export async function del<K extends keyof Db, T = Db[K]>(
  scope: K,
  test: string | ItemTest<T>,
) {
  ensureSet(scope);

  const data: any[] = db.data[scope];

  db.data[scope] = data.filter((item: any) =>
    typeof test === 'string' ? item.id !== test : !test(item),
  );

  return db.write();
}

export async function delOne<K extends keyof Db, T = Db[K]>(
  scope: K,
  test: string | ItemTest<T>,
) {
  ensureSet(scope);

  const data: any[] = db.data[scope];

  const found = find(data, test);

  db.data[scope] = data.filter((item: any) => item !== found);

  await db.write();

  return found;
}
