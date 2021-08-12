import { GetServerSideProps, GetServerSidePropsContext } from 'next';

type ComposableMiddleware = (
  handler?: GetServerSideProps,
) => GetServerSideProps;

export const compose =
  (middlewares: ComposableMiddleware[], handler?: GetServerSideProps) =>
  (ctx: GetServerSidePropsContext) =>
    middlewares.reduce((h, m) => m(h), handler)(ctx);
