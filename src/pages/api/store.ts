import type { NextApiRequest, NextApiResponse } from 'next';
import { db } from '../../db';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      await db.read();

      res.status(200).json(db.data);
    } else if (req.method === 'PUT') {
      db.data = req.body;
      await db.write();
      res.status(200).end();
    } else {
      res.status(405).end();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};
