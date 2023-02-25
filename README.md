# NextJS Demo - Magic Wallet Services + Auth0

Deployed URL: [https://mws-auth0-demo.vercel.app/](https://mws-auth0-demo.vercel.app/)

NextJS, Magic Web SDK and Auth0 React SPA SDK.
Use Auth0 for user authentication, and Magic for wallet creation and key management.

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
3. Link to [Magic Web API docs](https://magic.link/docs/auth/api-reference/client-side-sdks/web)

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

## Env setup

Insert the following values obtained in the [prerequisites](#prerequisites) section, into the `.env` file

```
NEXT_PUBLIC_MAGIC_PUBLISHABLE_API_KEY=
NEXT_PUBLIC_MAGIC_PROVIDER_ID=
NEXT_PUBLIC_AUTH0_DOMAIN=
NEXT_PUBLIC_AUTH0_CLIENT_ID=
NEXT_PUBLIC_AUTH0_SECRET_ID=
```

## \_app.js

In the Auth0Provider, pass values into the `domain` and `clientId` keys. Pass "http://localhost:3000" as value into `appOrigin` and `redirectUri`.

## index.js

In the Magic constructor, pass env values into...

```
const magicClient = new Magic(<Magic_Publishable_API_Key>)
```

In the Magic loginWithOIDC method, pass env values into...

```
const did = await magic.openid.loginWithOIDC({
    jwt: <Auth0_User_ID_Token>,
    providerId: <Magic_Provider_ID>
})
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
