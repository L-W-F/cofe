import { compose } from '@cofe/api';
import { get, post, put } from '@cofe/io';
import { CofeToken, CofeUser } from '@cofe/types';
import { makeId } from '@cofe/utils';
import { serialize } from 'cookie';
import { withApiCatch } from '@/api/withApiCatch';

export default compose([withApiCatch()], async (req, res) => {
  if (req.method === 'GET') {
    if (req.query.provider === 'github') {
      if (req.query.code) {
        const { access_token } = await post(
          'https://github.com/login/oauth/access_token',
          {
            client_id: process.env.GITHUB_CLIENT_ID,
            client_secret: process.env.GITHUB_CLIENT_SECRET,
            code: req.query.code,
            redirect_uri: 'http://localhost:3000/api/auth/callback/github',
          },
          {
            headers: {
              Accept: 'application/json',
            },
          },
        );

        const { login, node_id } = await get('https://api.github.com/user', {
          headers: {
            Accept: 'application/vnd.github.v3+json',
            Authorization: `token ${access_token}`,
          },
        }).catch(() => ({}));

        if (login) {
          let user: CofeUser = await get(
            `${process.env.DB_URL}/api/externals/github/${node_id}`,
            {
              headers: {
                Authorization: `token ${process.env.DB_SUPER_TOKEN}`,
              },
            },
          ).catch(() => null);

          if (!user) {
            const users = await get(
              `${process.env.DB_URL}/api/users?username=${login}`,
              {
                headers: {
                  Authorization: `Bearer ${process.env.DB_SUPER_TOKEN}`,
                },
              },
            ).catch(() => []);

            user = await post(`${process.env.DB_URL}/api/users`, {
              username: users.length ? `${login}${makeId()}` : login,
              password: '',
            });

            await put(`${process.env.DB_URL}/api/externals/github/${node_id}`, {
              userId: user.id,
            });

            res.status(201).json(user);
          }

          const { token, expiresAt }: CofeToken = await post(
            `${process.env.DB_URL}/api/tokens`,
            { username: user.username, password: user.password },
          );

          res.setHeader(
            'set-cookie',
            serialize('token', token, {
              httpOnly: true,
              path: '/',
              maxAge: (expiresAt - Date.now()) / 1000,
            }),
          );

          res.redirect('/');
        } else {
          res.status(500).end('远程调用失败');
        }
      } else {
        res.status(400).end('缺少 code 参数！');
      }
    } else {
      res.status(404).end(`不支持 ${req.query.provider} 登录！`);
    }
  } else {
    res.status(405).end();
  }
});
