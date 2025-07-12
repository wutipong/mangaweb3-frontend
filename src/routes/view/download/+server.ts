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
        clientOptions: {
            "grpc.max_receive_message_length": 2*1024 * 1024
        }
    })

    let client = new MangaClient(transport)
    const url = new URL(request.url)

    let name = url.searchParams.get('name') ?? ""
    
    let stream = client.download({ name })

    let output = []
    let filename = ""
    let contentType = ""
    for await (let message of stream.responses) {
        console.log(message.data.length)

        console.log(output.push(...message.data))
        filename = message.filename
        contentType = message.contentType
    }

    return new Response(new Uint8Array(output))
};
