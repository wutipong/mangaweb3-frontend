import { env } from '$env/dynamic/private';

export const variables = {
    basePath: env.BACKEND_URL,
    defaultSortField: env.DEFAULT_SORT_FIELD,
    defaultOrder: env.DEFAULT_ORDER,
};