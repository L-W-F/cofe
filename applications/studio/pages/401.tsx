import { GetServerSidePropsContext } from 'next';
import { withGsspColorMode } from 'gssp/withGsspColorMode';
import { Header } from 'components/Header';

const Unauthorized = () => {
  return (
    <>
      <Header />
      Unauthorized
    </>
  );
};

export const getServerSideProps = withGsspColorMode(
  async (context: GetServerSidePropsContext) => {
    if (context.req.cookies.token) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        },
      };
    }

    return {
      props: {},
    };
  },
);

export default Unauthorized;
