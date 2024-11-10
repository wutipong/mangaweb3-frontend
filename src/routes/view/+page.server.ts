import type { PageServerLoad } from './$types';
import type { Tag } from '$lib/tag';
import { getUser } from '$lib/user';

interface Request {
    name: string;
    user: string;
}

interface Response {
    browse_url: string;
    favorite: boolean;
    page_count: number;
    tags: Tag[];
}



let response: Response = {
    browse_url: '',
    favorite: false,
    page_count: 0,
    tags: []
};

export const prerender = false;

export const load: PageServerLoad = async ({ request, fetch, url }) => {
    const params = url.searchParams;
    let backendReq: Request = {
        name: '',
        user: ''
    };

    if (params.has('name')) {
        backendReq.name = params.get('name') as string;
    }

    backendReq.user = getUser(request);

    const resp = await fetch(
        new URL('/api/view', url.origin),
        {
            method: 'POST',
            body: JSON.stringify(backendReq)
        }
    );
    response = await resp.json();

    return {
        request: backendReq,
        response: response,
    };
};