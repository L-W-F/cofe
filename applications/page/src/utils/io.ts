import { merge } from 'lodash';

const wrap = (r: Promise<Response>) =>
  r
    .then(async (response) => {
      if (response.ok) {
        try {
          return await response.json();
        } catch (error) {}
      } else {
        throw Error(await response.text());
      }
    })
    .then((v) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(v);
      }

      return v;
    })
    .catch((e) => {
      if (process.env.NODE_ENV === 'development') {
        console.log(e);
      }

      return Promise.reject(e);
    });

export const get = (url: string, options) =>
  wrap(
    fetch(
      url,
      merge(
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
        options,
      ),
    ),
  );

export const post = (url: string, body: Object) =>
  wrap(
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }),
  );

export const put = (url: string, body: Object) =>
  wrap(
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }),
  );

export const patch = (url: string, body: Object) =>
  wrap(
    fetch(url, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }),
  );

export const del = (url: string) =>
  wrap(
    fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }),
  );
