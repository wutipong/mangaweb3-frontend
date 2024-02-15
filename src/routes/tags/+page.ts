import type { PageLoad } from './$types';
import { variables } from '$lib/variables';
import type { Tag } from '$lib/tag';

interface listRequest {
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

export const load: PageLoad = async ({ fetch, url }) => {
    const tagListURL = "/api/tag/list";
    const request: listRequest = {
        search: "",
        favorite_only: false,
        page: 0,
        item_per_page: 30
    }

    if (url.searchParams.has('favorite_only')) {
        request.favorite_only = url.searchParams.get('favorite_only') == "true"
    }
    if (url.searchParams.has('page')) {
        const v = url.searchParams.get('page')
        if (v != null)
            request.page = parseInt(v)
    }
    if (url.searchParams.has('item_per_page')) {
        const v = url.searchParams.get('item_per_page')
        if (v != null)
            request.item_per_page = parseInt(v)
    }
    if (url.searchParams.has('search')) {
        const v = url.searchParams.get('search')
        if (v != null)
            request.search = v
    }

    const response = await fetch(tagListURL, { method: 'POST', body: JSON.stringify(request) });
    const obj = await response.json() as listResponse;

    return {
        request: request,
        page: request.page,
        tags: obj?.tags as Tag[],
        total_page: obj?.total_page
    };
};