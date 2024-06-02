import type { PageLoad } from './$types';
import type { Tag } from '$lib/tag';

interface Request {
    name: string;
}

interface Response {
    browse_url: string;
    favorite: boolean;
    page_count: number;
    tags: Tag[];
}

let request: Request = {
    name: ''
};

let response: Response = {
    browse_url: '',
    favorite: false,
    page_count: 0,
    tags: []
};

export const prerender = false;

export const load: PageLoad = async ({ fetch, url }) => {
    const params = url.searchParams;
    if (params.has('name')) {
        request.name = params.get('name') as string;
    }

    const resp = await fetch(
        new URL('/api/view', url.origin),
        {
            method: 'POST',
            body: JSON.stringify(request)
        }
    );
    response = await resp.json();

    return {
        name: request.name,
        favorite: response.favorite,
        pageCount: response.page_count,
        tags: response.tags,
    };
};