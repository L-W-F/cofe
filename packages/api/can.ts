import { NextApiRequest } from 'next';
import { ApiHandler } from './compose';

interface ApiCanOptions {
  role?: string;
  skip?: (req: NextApiRequest) => boolean | Promise<boolean>;
}

export const createApiCan = (o1?: ApiCanOptions) => (o2?: ApiCanOptions) => {
  const { role, skip } = { ...o1, ...o2 };

  return (next: ApiHandler): ApiHandler =>
    async (req, res, rest?) => {
      if (await skip?.(req)) {
        await next(req, res, rest);
      } else {
        if (rest?.auth?.role === role) {
          await next(req, res, rest);
        } else {
          res.status(403).end('权限不足');
        }
      }
    };
};
