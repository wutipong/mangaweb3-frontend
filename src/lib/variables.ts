import { env } from '$env/dynamic/public';

export const variables = {
    basePath: env.PUBLIC_BACKEND_URL,
    defaultSortField: env.PUBLIC_DEFAULT_SORT_FIELD,
    defaultOrder: env.PUBLIC_DEFAULT_ORDER,
};