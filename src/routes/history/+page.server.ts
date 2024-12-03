import { getUser } from '$lib/user';
import { variables } from '$lib/variables';
import type { PageServerLoad } from './$types';

interface Request {
    user: string
    item_per_page: number;
    page: number;
}

interface Item {
    id: number;
    name: string;
    favorite: boolean;
    read: boolean;
    page_count: number;
    create_time: string;
    access_time: string;
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
    return {
        user: '',
        item_per_page: 30,
        page: 0,
    };
}

export const load: PageServerLoad = async ({ request, fetch, url }) => {
    const backendReq = createDefaultRequest();
    backendReq.user = getUser(request);
    const params = url.searchParams;

    if (params.has('page')) {
        let v = params.get('page');
        if (v != null) {
            backendReq.page = parseInt(v);
        }
    }

    const apiUrl = new URL('/history', variables.apiBasePath);
    const response = await fetch(apiUrl, { method: 'POST', body: JSON.stringify(backendReq) });
    const obj = await response.json() as Response;

    return {
        request: backendReq,
        response: obj
    }
};