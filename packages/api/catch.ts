import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

export const createApiCatch =
  () =>
  (handler: NextApiHandler) =>
  async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      await handler(req, res);
    } catch (error) {
      res.status(error.code ?? 500).end(error.message ?? '服务错误');
    }
  };
