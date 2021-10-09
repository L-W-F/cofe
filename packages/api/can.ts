import { NextApiRequest } from 'next';
import { ApiHandler } from './compose';

interface ApiCanOptions {
  level?: number;
  skip?: (req: NextApiRequest) => boolean | Promise<boolean>;
}

export const createApiCan = (o1?: ApiCanOptions) => (o2?: ApiCanOptions) => {
  const { level = -1, skip } = { ...o1, ...o2 };

  return (next: ApiHandler): ApiHandler =>
    async (req, res, rest?) => {
      if (await skip?.(req)) {
        await next(req, res, rest);
      } else {
        if (rest?.auth?.level === level) {
          await next(req, res, rest);
        } else {
          res.status(403).end('权限不足');
        }
      }
    };
};
