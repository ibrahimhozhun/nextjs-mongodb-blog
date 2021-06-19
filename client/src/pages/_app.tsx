import { AppProps } from "next/dist/next-server/lib/router/router";
import Layout from "../components/Layout";
import SEO from "../components/SEO";
import "../styles/globals.css";
import axios from "axios";

axios.defaults.baseURL = process.env.SERVER_URL;

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <SEO
        title="Welcome"
        description="Blog about bullying and our project. Our project is an Erasmus project. We're trying to stop bullying!"
        url="/"
      />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
