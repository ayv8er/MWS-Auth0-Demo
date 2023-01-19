# NextJS Demo - Magic Wallet Services + Auth0

NextJS, Magic Web SDK and Auth0 React SPA SDK.
Use Auth0 for user authentication and authorization, and Magic for wallet creation and key management.

## Prerequisites

A. Auth0

1. Create an [Auth0 account](https://auth0.com/).
2. Create an Auth0 `Single Page Web Applications` type application.
3. Go to the settings of the Auth0 application and retain the `Domain`, `Client ID` and `Client Secret`.
4. Under "Applications" -> "YOUR_APP" -> "Settings", enter "http://localhost:3000" in "Allowed Callback URLs" and "Allowed Logout URLs" under the "Application URIs" sub-section.
5. Link to [@auth0/auth0-react docs](https://auth0.github.io/auth0-react/)

B. Magic

1. Create a [Magic account](https://magic.link/).
2. Create a Magic Auth application and retain the `Publishable API Key`.
3. Link to [Magic Web API docs](https://magic.link/docs/auth/api-reference/client-side-sdks/web), excludes the `loginWithOIDC` method as shown in this demo.

C. Magic MWS Setup

1. Contact Magic and provide the Auth0 `Domain`, Auth0 `Client ID` and Magic `Publishable API Key`.
2. Magic will return a `Provider ID`, please retain this.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

## Installation

**Before you install:** please read the [prerequisites](#prerequisites)

Stary by cloning this repo on your local machine:

```bash
$ git clone git@github.com:ayv8er/MWS-Auth0-Demo.git
# or
$ cd PROJECT
```

To install and set up the library, run:

```bash
$ npm install
# or
$ yarn add
```

## Serving the app

```bash
$ npm run dev
# or
$ yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Env setup

Insert the following variables obtained in the [prerequisites](#prerequisites) section, into the `.env` file

```
NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY=
NEXT_PUBLIC_MAGIC_PROVIDER_ID=
NEXT_PUBLIC_AUTH0_DOMAIN=
NEXT_PUBLIC_AUTH0_CLIENT_ID=
NEXT_PUBLIC_AUTH0_SECRET_ID=
```

## \_app.js

Import `Auth0Provider` and wrap the application. Pass env values into the `domain`, `clientId`, `appOrigin`, and `redirectUri` keys.

## index.js

Import `useAuth0`, `Magic` and `OpenIdExtension`. Pass env values into...

```
const magicClient = new Magic(<Magic_Publishable_API_Key>)
```

and

```
const did = await magic.openid.loginWithOIDC({
    jwt: <Auth0_User_ID_Token>,
    providerId: <Magic_Provider_ID>
})
```