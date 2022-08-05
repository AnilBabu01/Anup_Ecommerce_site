import { Helmet } from 'react-helmet';

function Metadata({title}) {
  return (
    <>
      <Helmet>
        <title>{`${title}-Ab-Ecommerce`}</title>
        <meta name="description" content="App Description" />
        <meta name="theme-color" content="#008f68" />
      </Helmet>
    </>
  );
}

export default Metadata;