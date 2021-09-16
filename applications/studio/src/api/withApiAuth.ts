import { createApiAuth } from '@cofe/api';

export const withApiAuth = createApiAuth({
  auth: (req) => {
    return req.cookies.token;
  },
});
