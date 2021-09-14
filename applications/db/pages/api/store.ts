import type { NextApiRequest, NextApiResponse } from 'next';
import { db, dbc } from '../../src/db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.cookies.user) {
    res.status(401).end();
  } else {
    try {
      if (req.method === 'GET') {
        const chain = await dbc();

        res.status(200).json(chain.get([`_${req.cookies.user}`]).value());
      } else if (req.method === 'PUT') {
        db.data = {
          ...db.data,
          [`_${req.cookies.user}`]: req.body,
        };

        await db.write();

        res.status(200).end();
      } else {
        res.status(405).end();
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
