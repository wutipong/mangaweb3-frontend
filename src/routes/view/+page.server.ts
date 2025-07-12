import type { PageServerLoad } from './$types';
import type { Tag } from '$lib/tag';
import { getUser } from '$lib/user';
import { variables } from '$lib/variables';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import { ChannelCredentials } from '@grpc/grpc-js';
import { MangaClient } from '$lib/grpc/manga.client';

interface Request {
    name: string;
    user: string;
}

interface Response {
    browse_url: string;
    favorite: boolean;
    page_count: number;
    current_page: number;
    tags: Tag[];
}

let response: Response = {
    browse_url: '',
    favorite: false,
    page_count: 0,
    current_page: 0,
    tags: []
};

export const prerender = false;

export const load: PageServerLoad = async ({ request, url }) => {
    const params = url.searchParams;
    
    let name = ''
    if (params.has('name')) {
        name = params.get('name') as string;
    }

    const user = getUser(request);

    let transport = new GrpcTransport({
        host: variables.apiBasePath,
        channelCredentials: ChannelCredentials.createInsecure(),
    })

    let client = new MangaClient(transport)

    const call = await client.detail({
        name: name,
        user: user,
    })

    return {
        request: call.request,
        response: call.response,
    };
};