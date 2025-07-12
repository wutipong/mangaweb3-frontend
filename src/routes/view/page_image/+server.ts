import { assets } from '$app/paths';
import { GrpcTransport } from '@protobuf-ts/grpc-transport';
import type { RequestHandler } from './$types';
import { ChannelCredentials } from '@grpc/grpc-js';
import { MangaClient } from '$lib/grpc/manga.client';
import { variables } from '$lib/variables';
import { getUser } from '$lib/user';

export const GET: RequestHandler = async ({ request }) => {
    let transport = new GrpcTransport({
        host: variables.apiBasePath,
        channelCredentials: ChannelCredentials.createInsecure(),
    })

    let client = new MangaClient(transport)
    const url = new URL(request.url)

    let name = url.searchParams.get('name') ?? ""
    let iStr = url.searchParams.get('i') 
    let index = iStr ? parseInt(iStr): 0
    let user = getUser(request)
    let { response } = await client.pageImage({ name, user, index, width: 0, height: 0 })

    return new Response(response.data, {
        headers: {
            'content-type': response.contentType,
        },
    });
};
