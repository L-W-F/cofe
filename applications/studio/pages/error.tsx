import { compose } from '@cofe/gssp';
import { Header } from '@/components/Header';
import { withGsspColorMode } from '@/gssp/withGsspColorMode';
import { errorCache } from '@/utils/cache';

const ServiceError = ({ error }) => {
  return (
    <>
      <Header />
      {error}
    </>
  );
};

export const getServerSideProps = compose([withGsspColorMode], async () => {
  const error = errorCache.get('id') ?? 'unknown';

  errorCache.delete('id');

  return {
    props: {
      error,
    },
  };
});

export default ServiceError;
