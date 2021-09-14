import type { NextApiRequest, NextApiResponse } from 'next';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (!req.cookies.user) {
    res.status(401).end();
  } else {
    try {
      if (req.method === 'GET') {
        const data = await fetch(`${process.env.DB_URL}/api/store`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Cookie: req.headers.cookie,
          },
        }).then((response) => response.json());

        res.status(200).json(data);
      } else if (req.method === 'PUT') {
        await fetch(`${process.env.DB_URL}/api/store`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Cookie: req.headers.cookie,
          },
          body: JSON.stringify(req.body),
        });

        res.status(200).end();
      } else {
        res.status(405).end();
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
};
