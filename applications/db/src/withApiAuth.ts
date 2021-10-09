import { NextApiRequest } from 'next';
import { createApiAuth } from '@cofe/api';
import { delOne, getOne } from '@/db';

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
      message: '令牌不存在',
    });
  }

  if (token.expiresAt < Date.now()) {
    delOne('tokens', filter);

    return Promise.reject({
      code: 401,
      message: '令牌已过期',
    });
  }

  const user = await getOne('users', token.userId);

  if (!user.enabled) {
    delOne('tokens', filter);

    return Promise.reject({
      code: 403,
      message: '账号已禁用',
    });
  }

  return { ...token, ...user };
};

export const withApiAuth = createApiAuth({ auth });
