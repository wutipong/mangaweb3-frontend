import { env } from '$env/dynamic/private';

export const variables = {
    apiBasePath: env.BACKEND_URL ?? 'localhost:8972',
    defaultSortField: env.DEFAULT_SORT_FIELD ?? "createTime",
    defaultOrder: env.DEFAULT_ORDER ?? "descending",

    oidcEnable: env.OIDC_ENABLE ? env.OIDC_ENABLE == "true" : false,
    oidcClient: env.OIDC_CLIENT ?? '',
    oidcSecret: env.OIDC_SECRET ?? '',
    oidcAuthURL: env.OIDC_AUTHORIZE_URL ?? '',
    oidcTokenURL: env.OIDC_TOKEN_URL ?? '',
    oidcIssuer: env.OIDC_ISSUER ?? '',
    oidcJWKS : env.OIDC_JWKS ?? ''
};