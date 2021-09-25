import { debug } from '@cofe/logger';
import { ApiHandler } from './compose';

export const createApiCatch =
  () =>
  () =>
  (next: ApiHandler): ApiHandler =>
  async (req, res, rest?) => {
    debug('api')('catch', rest);

    try {
      await next(req, res, rest);
    } catch (error) {
      res.status(error.code ?? 500).end(error.message ?? '服务错误');
    }
  };
