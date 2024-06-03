import type { PageLoad } from './$types';
import { variables } from '$lib/variables';

interface Request {
    favorite_only: boolean;
    item_per_page: number;
    order: 'ascending' | 'descending';
    page: number;
    search: string;
    sort: 'name' | 'createTime';
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
        favorite_only: false,
        item_per_page: 30,
        order: order,
        page: 0,
        search: '',
        sort: sortField,
        tag: ''
    };
}

export const load: PageLoad = async ({ fetch, url }) => {
    const request = createDefaultRequest();

    const params = url.searchParams;
    if (params.has('favorite_only')) {
        request.favorite_only = params.get('favorite_only') == 'true';
    }

    if (params.has('sort')) {
        const v = params.get('sort');
        if (v == 'name') {
            request.sort = 'name';
        } else if (v == 'createTime') {
            request.sort = 'createTime';
        }
    }

    if (params.has('order')) {
        const v = params.get('order');
        if (v == 'ascending') {
            request.order = 'ascending';
        } else if (v == 'descending') {
            request.order = 'descending';
        }
    }

    if (params.has('tag')) {
        request.tag = params.get('tag') as string;
    }

    if (params.has('page')) {
        let v = params.get('page');
        if (v != null) {
            request.page = parseInt(v);
        }
    }

    if (params.has('search')) {
        let v = params.get('search');
        if (v != null) {
            request.search = v;
        }
    }

    const apiUrl = '/api/browse';
    const response = await fetch(apiUrl, { method: 'POST', body: JSON.stringify(request) });
    const obj = await response.json() as Response;

    return {
        request: request,
        response: obj
    }
};