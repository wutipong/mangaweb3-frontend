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

## Development

**MangaWeb 4** was developed with [Node.JS](https://nodejs.org/en) runtime for a long time (since version 1). However, recently I made a switch to [Bun](https://bun.com/) and I don't find any issue. I assumed that both runtime can be use. Feel free to create an issue if you run into a problem though.

### Running MangaWeb 4

Before you can run **MangaWeb 4**, you have to install its dependency first. Use `npm install` command to install the dependencies.

After that, use the command `npm run dev -- --open` to start the server in development environment. 

For more information, please consult [SvelteKit](https://svelte.dev/docs/kit/introduction) documentation.

### Setup gRPC code generation.

**MangaWeb 4** use gRPC to communicate between the frontend service and backend service. In order to update the gRPC's generated code, firstly intialize and update subprojects in the repository using the following command.

gRPC code is generated from protobuf schema files (*.proto) that is in separated project which is added as a submodule of this project. The code will be generated using `go generate` command. 


### Initialize the submodule

To initialize submodule, run the following command.

```sh
$ git submodule init
```

And then, update the submodule to pull the code.

```
$ git submodule update
```

### Install gRPC toolchain

Use the instruction from the [protobuf website](https://protobuf.dev/installation/)

### Generating gRPC-related code.

Run `npm run generate-grpc` to generate gRPC code.

### Generating Web Application Manifest resources

**MangaWeb 4** includes progressive web application (PWA)'s web application manifest resources so it could run as a standalone application despite being a web application. 

In order to update the PWA's icon, make changes to the file `static/favicon.svg` and then run the script `npm run generate-pwa-assets` to update other icons. 

**MangaWeb 4** uses [Vite PWA Plugin](https://vite-pwa-org.netlify.app/) to setup PWA.