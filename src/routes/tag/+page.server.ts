import type { PageServerLoad } from './$types';
import type { Tag } from '$lib/tag';
import { getUser } from '$lib/user';
import { variables } from '$lib/variables';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import { ChannelCredentials } from '@grpc/grpc-js';
import { TagClient } from '$lib/grpc/tag.client';
import { SortOrder, SortField, Filter } from '$lib/grpc/types';


export const prerender = false;

function createDefaultRequest(request: Request): {
    user: string;
    favorite_only: boolean;
    order: SortOrder;
    sort: SortField;
    search: string;
    page: number;
    item_per_page: number;
} {
    return {
        user: getUser(request),
        search: "",
        favorite_only: false,
        page: 0,
        item_per_page: 30,
        order: SortOrder.ASCENDING,
        sort: SortField.NAME,
    };
}

export const load: PageServerLoad = async ({ request, fetch, url }) => {
    let { user, search, favorite_only, page, item_per_page, order, sort } = createDefaultRequest(request);

    const params = url.searchParams;
    if (params.has('sort')) {
        const v = params.get('sort');

        switch (v) {
            case 'name':
                sort = SortField.NAME
                break;
            case 'itemCount':
                sort = SortField.PAGECOUNT
                break;
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

    if (url.searchParams.has('favorite_only')) {
        favorite_only = url.searchParams.get('favorite_only') == "true"
    }
    if (url.searchParams.has('page')) {
        const v = url.searchParams.get('page')
        if (v != null)
            page = parseInt(v)
    }
    if (url.searchParams.has('item_per_page')) {
        const v = url.searchParams.get('item_per_page')
        if (v != null)
            item_per_page = parseInt(v, 10)
    }
    if (url.searchParams.has('search')) {
        const v = url.searchParams.get('search')
        if (v != null)
            search = v
    }

    let transport = new GrpcTransport({
        host: variables.apiBasePath,
        channelCredentials: ChannelCredentials.createInsecure(),
    })

    let client = new TagClient(transport)
    const call = await client.list({
        user: user,
        tag: '',
        filter: favorite_only? Filter.FAVORITE_TAGS: Filter.UNKNOWN,
        page: page,
        itemPerPage: item_per_page,
        search: search,
        sort: sort,
        order: order
    })

    return {
        request: call.request,
        response: call.response,
    };
};