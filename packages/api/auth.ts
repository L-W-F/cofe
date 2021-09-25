import { NextApiRequest } from 'next';
import { debug } from '@cofe/logger';
import { ApiHandler } from './compose';

interface ApiAuthOptions {
  auth?: (req: NextApiRequest) => any | Promise<any>;
  predicate?: (req: NextApiRequest) => boolean | Promise<boolean>;
}

export const createApiAuth = (o1?: ApiAuthOptions) => (o2?: ApiAuthOptions) => {
  const { auth, predicate } = { ...o1, ...o2 };

  return (next: ApiHandler): ApiHandler =>
    async (req, res, rest?) => {
      debug('api')('auth', rest);

      if (await predicate?.(req)) {
        await next(req, res, rest);
      } else {
        try {
          await next(req, res, {
            ...rest,
            auth: await auth?.(req),
          });
        } catch (error) {
          res.status(error.code ?? 401).end(error.message ?? '请先登录');
        }
      }
    };
};
