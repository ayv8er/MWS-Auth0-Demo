import { useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Magic } from "magic-sdk";
import { OpenIdExtension } from "@magic-ext/oidc";

export default function Home() {
  const [magic, setMagic] = useState(null);
  const [metadata, setMetadata] = useState(null);
  const { user, loginWithRedirect, isAuthenticated, getIdTokenClaims, logout } =
    useAuth0();

  console.log("Auth0", user);
  console.log("Magic", metadata);

  useEffect(() => {
    if (!magic) {
      const magicClient = new Magic(
        process.env.NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY,
        {
          extensions: [new OpenIdExtension()],
        }
      );
      setMagic(magicClient);
    }
  }, [magic, user]);

  const login = async () => {
    await loginWithRedirect();
  };

  const logoutWithRedirect = () => {
    logout({
      returnTo: window.location.origin,
    });
  };

  const makeMagic = async () => {
    const token = await getIdTokenClaims();
    const did = await magic.openid.loginWithOIDC({
      jwt: token.__raw,
      providerId: process.env.NEXT_PUBLIC_MAGIC_PROVIDER_ID,
    });
    console.log("did token", did);
    const metadata = await magic.user.getMetadata();
    setMetadata(metadata);
  };

  return (
    <main
      style={{
        display: "flex",
        flexFlow: "column",
        justifyContent: "center",
      }}
    >
      {!isAuthenticated && (
        <>
          <div style={{ marginBottom: "2%" }}>
            Auth0 provider wraps entire app. Magic instance constructs on app
            render.
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: "5%",
            }}
          >
            <button onClick={login}>Signup / Login with Auth0</button>
          </div>
        </>
      )}

      {isAuthenticated && (
        <>
          <div style={{ marginBottom: "2%" }}>
            User is logged in via Auth0. Click &quot;Make Magic!&quot; to
            retrieve wallet
          </div>
          <div>By Auth0: {user.email}</div>
          {metadata && (
            <div style={{ marginBottom: "2%" }}>
              By Magic: {metadata.publicAddress}
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-around",
              margin: "5%",
            }}
          >
            <button onClick={makeMagic} disabled={!!metadata}>
              Make Magic!
            </button>
            <button onClick={() => logoutWithRedirect()}>Logout</button>
          </div>
        </>
      )}
    </main>
  );
}
