import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';

type ComposableMiddleware = (handler?: NextApiHandler) => NextApiHandler;

export const compose =
  (middlewares: ComposableMiddleware[], handler?: NextApiHandler) =>
  (req: NextApiRequest, res: NextApiResponse) =>
    middlewares.reduce((h, m) => m(h), handler)(req, res);
