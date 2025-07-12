import { assets } from '$app/paths';
import type { RequestHandler } from './$types';

const manifest = `{
    "name":"managaweb4",
    "short_name":"managaweb4",
    "icons":[
        {
            "src":"${assets}/android-chrome-192x192.png",
            "sizes":"192x192","type":"image/png"
        },
        {
            "src":"${assets}/android-chrome-512x512.png",
            "sizes":"512x512","type":"image/png"
        }
    ],
    "theme_color":"#ffffff",
    "background_color":"#ffffff",
    "display":"standalone"
}`

export const GET: RequestHandler = async () => {
    return new Response(manifest, {
        headers: {
            'content-type': 'application/manifest+json',
        },
    });
};

export const prerender = true; // this line will generate a static manifest.webmanifest