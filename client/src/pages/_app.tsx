import { AppProps } from 'next/dist/next-server/lib/router/router';
import axios from 'axios';
import Layout from '../components/Layout';
import SEO from '../components/SEO';
import '../styles/globals.css';

axios.defaults.baseURL = process.env.SERVER_URL;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO title="Home" description="" url="/" />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
