import type { PageServerLoad } from './$types';
import { variables } from '$lib/variables';
import { getUser } from '$lib/user';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import { ChannelCredentials } from '@grpc/grpc-js';
import { MangaClient } from '$lib/grpc/manga.client';
import { Filter, SortField, SortOrder } from '$lib/grpc/types';



function createDefaultRequest(): {
    user: string;
    filter: Filter;
    item_per_page: number;
    order: SortOrder;
    page: number;
    search: string;
    sort: SortField;
    tag: string;
} {
    let sortField: SortField
    switch (variables.defaultSortField) {
        case "name":
            sortField = SortField.NAME;
            break;

        case "pageCount":
            sortField = SortField.PAGECOUNT;
            break;

        default:
            sortField = SortField.CREATION_TIME;
            break;

    }

    let order = SortOrder.DESCENDING
    if (sortField == SortField.NAME) {
        order = SortOrder.ASCENDING
    }

    return {
        user: '',
        filter: Filter.UNKNOWN,
        item_per_page: 30,
        order: order,
        page: 0,
        search: '',
        sort: sortField,
        tag: ''
    };
}

export const load: PageServerLoad = async ({ request, fetch, url }) => {
    let transport = new GrpcTransport({
        host: variables.apiBasePath,
        channelCredentials: ChannelCredentials.createInsecure(),
    })

    let client = new MangaClient(transport)

    let { user, filter, item_per_page, order, page, search, sort, tag } = createDefaultRequest();
    user = getUser(request);

    const params = url.searchParams;
    if (params.has('filter')) {
        const v = params.get('filter');

        switch (v) {
            case 'favorite':
                filter = Filter.FAVORITE_ITEMS;
                break;

            case 'tag':
                filter = Filter.FAVORITE_TAGS
                break;
        }
    }

    if (params.has('sort')) {
        const v = params.get('sort');

        switch (v) {
            case 'name':
                sort = SortField.NAME;
                break;
            case 'createTime':
                sort = SortField.CREATION_TIME;
                break;
            case 'pageCount':
                sort = SortField.PAGECOUNT;
        }
    }

    if (params.has('order')) {
        const v = params.get('order');

        switch (v) {
            case 'ascending':
                order = SortOrder.ASCENDING;
                break;
            case 'descending':
                order = SortOrder.DESCENDING;
        }
    }

    if (params.has('tag')) {
        tag = params.get('tag') as string;
    }

    if (params.has('page')) {
        let v = params.get('page');
        if (v != null) {
            page = parseInt(v);
        }
    }

    if (params.has('search')) {
        let v = params.get('search');
        if (v != null) {
            search = v;
        }
    }

    let call = await client.list({
        user: user,
        tag: tag,
        filter: filter,
        page: page,
        itemPerPage: item_per_page,
        search: search,
        sort: sort,
        order: order
    })

    return { request: call.request, response: call.response }
};


