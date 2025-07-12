import { env } from '$env/dynamic/private';

export const variables = {
    apiBasePath: env.BACKEND_URL? env.BACKEND_URL : 'localhost:8972',
    defaultSortField: env.DEFAULT_SORT_FIELD? env.DEFAULT_SORT_FIELD : "createTime",
    defaultOrder: env.DEFAULT_ORDER? env.DEFAULT_ORDER : "descending",
};