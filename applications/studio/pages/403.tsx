import { withGsspColorMode } from 'gssp/withGsspColorMode';
import { Header } from 'components/Header';

const Forbidden = () => {
  return (
    <>
      <Header />
      Forbidden
    </>
  );
};

export const getServerSideProps = withGsspColorMode();

export default Forbidden;
