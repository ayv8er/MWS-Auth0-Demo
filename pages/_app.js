import { Auth0Provider } from "@auth0/auth0-react";
import Layout from "../components/Layout";

export default function App({ Component, pageProps }) {
  return (
    <Auth0Provider
      domain={process.env.NEXT_PUBLIC_AUTH0_DOMAIN}
      clientId={process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID}
      appOrigin="http://localhost:3000"
      redirectUri="http://localhost:3000"
    >
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Auth0Provider>
  );
}
