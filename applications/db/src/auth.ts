import { del, getOne } from './db';

export const auth = async (authorization?: string) => {
  if (!authorization) {
    return null;
  }

  const filter = ({ token }) => `Bearer ${token}` === authorization;

  const token = await getOne('tokens', filter);

  if (!token) {
    return null;
  }

  if (token.expiresAt < Date.now()) {
    del('tokens', filter);

    return null;
  }

  return token.userId;
};
