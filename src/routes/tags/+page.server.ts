import type { PageServerLoad } from './$types';
import type { Tag } from '$lib/tag';
import { getUser } from '$lib/user';
import { variables } from '$lib/variables';

interface listRequest {
    user: string
    favorite_only: boolean
    search: string
    page: number
    item_per_page: number
}

interface listResponse {
    request: listRequest
    tags: Tag[]
    total_page: number
}
export const prerender = false;

export const load: PageServerLoad = async ({ request, fetch, url }) => {
    const tagListURL = new URL("/tag/list", variables.apiBasePath);
    const backendReq: listRequest = {
        user: getUser(request),
        search: "",
        favorite_only: false,
        page: 0,
        item_per_page: 30
    }

    if (url.searchParams.has('favorite_only')) {
        backendReq.favorite_only = url.searchParams.get('favorite_only') == "true"
    }
    if (url.searchParams.has('page')) {
        const v = url.searchParams.get('page')
        if (v != null)
            backendReq.page = parseInt(v)
    }
    if (url.searchParams.has('item_per_page')) {
        const v = url.searchParams.get('item_per_page')
        if (v != null)
            backendReq.item_per_page = parseInt(v)
    }
    if (url.searchParams.has('search')) {
        const v = url.searchParams.get('search')
        if (v != null)
            backendReq.search = v
    }

    const response = await fetch(tagListURL, { method: 'POST', body: JSON.stringify(backendReq) });
    const obj = await response.json() as listResponse;

    return {
        request: backendReq,
        page: backendReq.page,
        tags: obj?.tags as Tag[],
        total_page: obj?.total_page
    };
};