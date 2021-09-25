import { NextApiRequest } from 'next';
import { createApiAuth } from '@cofe/api';
import { del, getOne } from '@/db';

const auth = async (req: NextApiRequest) => {
  if (!req.headers.authorization) {
    return Promise.reject({
      code: 401,
      message: '请先登录',
    });
  }

  const filter = ({ token }) => `Bearer ${token}` === req.headers.authorization;

  const token = await getOne('tokens', filter);

  if (!token) {
    return Promise.reject({
      code: 404,
      message: 'Token 不存在',
    });
  }

  if (token.expiresAt < Date.now()) {
    del('tokens', filter);

    return Promise.reject({
      code: 403,
      message: 'Token 已过期',
    });
  }

  return token;
};

export const withApiAuth = createApiAuth({ auth });
