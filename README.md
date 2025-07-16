# MangaWeb 4 Frontend

## Configurations

**MangaWeb 4** can be configured using environment variables. Below is the default values.

```sh
BACKEND_URL=localhost:8972
DEFAULT_SORT_FIELD=createTime # can be either 'name', 'pageCount', or 'createTime'
DEFAULT_ORDER=descending # can be either 'ascending' or 'descending'
```
**MangaWeb 4** also supports reading environment variables from `.env` file at run time.

## Authentication

By default, **MangaWeb 4** use Cloudflare Access's `Cf-Access-Authenticated-User-Email` request header value to identify the user. 

If the request is made without this parameter, the default user (default@example.com) will be used instead. Also if this header is set with an email address that's not exists in the system, a new account will be created automatically. 

### OpenID Connect Authentication

**MangaWeb 4** also support OpenID Connect provider as the authentication source. **MangaWeb 4** has been tested with [Authentik](https://goauthentik.io/)'s implicit flow. Other kind of provider might or might not work. Feel free to open an issue if you have problems setting up your OIDC provider of choice.

In order to use OIDC Provider as the authentication source, update the following environment variable.

```sh
OIDC_ENABLE=true
OIDC_CLIENT=<Client ID>
OIDC_SECRET=<Secret>
OIDC_AUTHORIZE=<Authorize URL>
OIDC_TOKEN=<Token URL>
OIDC_ISSUER=<OpenID Configuration Issuer>
OIDC_JWKS=<JWKS URL>
OIDC_LOGOUT=<Logout URL>
```

