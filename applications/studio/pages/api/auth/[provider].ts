import { compose } from '@cofe/api';
import { withApiCatch } from '@/api/withApiCatch';

export default compose([withApiCatch()], async (req, res) => {
  if (req.method === 'GET') {
    if (req.query.provider === 'github') {
      res.redirect(
        `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}`,
      );
    } else {
      res.status(404).end();
    }
  } else {
    res.status(405).end();
  }
});
