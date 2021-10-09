import { NextApiRequest } from 'next';
import { debug } from '@cofe/logger';
import { ApiHandler } from './compose';

interface ApiAuthOptions {
  auth?: (req: NextApiRequest) => any | Promise<any>;
  skip?: (req: NextApiRequest) => boolean | Promise<boolean>;
}

export const createApiAuth = (o1?: ApiAuthOptions) => (o2?: ApiAuthOptions) => {
  const { auth, skip } = { ...o1, ...o2 };

  return (next: ApiHandler): ApiHandler =>
    async (req, res, rest?) => {
      if (await skip?.(req)) {
        await next(req, res, rest);
      } else {
        try {
          await next(req, res, {
            ...rest,
            auth: await auth?.(req),
          });
        } catch (error) {
          debug('api')('auth %s\n%s', error.message, error.stack);

          res.status(error.code ?? 401).end(error.message ?? '请先登录');
        }
      }
    };
};
