import { NextApiHandler } from 'next';

export type ApiHandler<P = any> = (
  ...args: [...Parameters<NextApiHandler>, P?]
) => ReturnType<NextApiHandler>;

export type ApiMiddleware<P = any> = (next: ApiHandler<P>) => NextApiHandler;

export const compose =
  <P extends any = any>(
    middlewares: ApiMiddleware<P>[],
    handler?: ApiHandler,
  ): NextApiHandler =>
  (req, res) =>
    middlewares.reduce((h, m) => m(h), handler)(req, res);
