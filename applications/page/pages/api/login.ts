import type { NextApiRequest, NextApiResponse } from 'next';
import { CofeToken } from '@cofe/types';
import { serialize } from 'cookie';
import { post } from 'utils/io';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'POST') {
      const token: CofeToken = await post(
        `${process.env.DB_URL}/api/tokens`,
        req.body,
      );

      if (token) {
        res.setHeader(
          'set-cookie',
          serialize('token', token.token, {
            httpOnly: true,
            path: '/',
            maxAge: (token.expiresAt - Date.now()) / 1000,
          }),
        );

        res.status(201).end();
      } else {
        res.status(500).end();
      }
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};
