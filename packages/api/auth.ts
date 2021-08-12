import { NextApiRequest, NextApiResponse } from 'next';

type ApiHandler<T = any> = (
  req: NextApiRequest,
  res: NextApiResponse<T>,
  bag?: any,
) => void | Promise<void>;

type ApiPredicate = (req: NextApiRequest) => boolean | Promise<boolean>;

interface ApiAuthOptions {
  auth: (req: NextApiRequest) => any | Promise<any>;
}

export const createApiAuth =
  ({ auth }: ApiAuthOptions) =>
  (handler: ApiHandler, predicate?: ApiPredicate) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    if (await predicate?.(req)) {
      await handler(req, res);
    } else {
      try {
        await handler(req, res, await auth(req));
      } catch (error) {
        res.status(error.code ?? 401).end(error.message ?? '请先登录');
      }
    }
  };
