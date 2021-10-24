import { warn } from '@cofe/logger';
import { ApiHandler } from './compose';

export const createApiCatch =
  () =>
  () =>
  (next: ApiHandler): ApiHandler =>
  async (req, res, rest?) => {
    try {
      await next(req, res, rest);
    } catch (error) {
      warn('api')('catch %s\n%s', error.message, error.stack);

      res.status(error.code ?? 500).json({
        message: error.message ?? '服务错误',
      });
    }
  };
