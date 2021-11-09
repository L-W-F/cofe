import { compose } from '@cofe/gssp';
import { Header } from '@/components/Header';
import { errorCache } from '@/gssp/withGsspCatch';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';

const ServiceError = ({ error }) => {
  return (
    <>
      <Header />
      {error}
    </>
  );
};

export const getServerSideProps = compose([withGsspColorMode()], async () => {
  const error = errorCache.get('id') ?? 'unknown';

  errorCache.delete('id');

  return {
    props: {
      error,
    },
  };
});

export default ServiceError;
