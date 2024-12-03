import type { PageServerLoad } from './$types';
import { variables } from '$lib/variables';
import { getUser } from '$lib/user';

interface Request {
    user: string
    favorite_only: boolean;
    item_per_page: number;
    order: 'ascending' | 'descending';
    page: number;
    search: string;
    sort: 'name' | 'createTime' | 'pageCount';
    tag: string;
}

interface Item {
    id: number;
    name: string;
    favorite: boolean;
    read: boolean;
    page_count: number;
    create_time: string;
    tag_favorite : boolean;
}

interface Page {
    content: string;
    is_active: boolean;
    is_enabled: boolean;
    is_hidden_on_small: boolean;
    link_url: string;
}

interface Response {
    items: Item[];
    pages: Page[];
    tag_favorite: boolean;
    total_page: number;
}

function createDefaultRequest(): Request {
    let sortField: "name" | "createTime" = "createTime"
    if (variables.defaultSortField == "name") {
        sortField = "name"
    }

    let order: "descending" | "ascending" = "descending"
    if (variables.defaultOrder == "ascending") {
        order = "ascending"
    }

    return {
        user: '',
        favorite_only: false,
        item_per_page: 30,
        order: order,
        page: 0,
        search: '',
        sort: sortField,
        tag: ''
    };
}

export const load: PageServerLoad = async ({  request, fetch, url }) => {
    const backendReq = createDefaultRequest();
    backendReq.user = getUser(request);

    const params = url.searchParams;
    if (params.has('favorite_only')) {
        backendReq.favorite_only = params.get('favorite_only') == 'true';
    }

    if (params.has('sort')) {
        const v = params.get('sort');
        if (v == 'name') {
            backendReq.sort = 'name';
        } else if (v == 'createTime') {
            backendReq.sort = 'createTime';
        } else if (v == 'pageCount') {
            backendReq.sort = 'pageCount';
        }
    }

    if (params.has('order')) {
        const v = params.get('order');
        if (v == 'ascending') {
            backendReq.order = 'ascending';
        } else if (v == 'descending') {
            backendReq.order = 'descending';
        }
    }

    if (params.has('tag')) {
        backendReq.tag = params.get('tag') as string;
    }

    if (params.has('page')) {
        let v = params.get('page');
        if (v != null) {
            backendReq.page = parseInt(v);
        }
    }

    if (params.has('search')) {
        let v = params.get('search');
        if (v != null) {
            backendReq.search = v;
        }
    }

    const apiUrl = new URL('/browse', variables.apiBasePath);
    const response = await fetch(apiUrl, { method: 'POST', body: JSON.stringify(backendReq) });
    const obj = await response.json() as Response;

    return {
        request: backendReq,
        response: obj,
    }
};


