import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";
import { updateToken } from "$lib/auth";

export const load: PageLoad = async ({ url, fetch }) => {
    const code = url.searchParams.get('code');
    if (!code) {
        throw new Error("Authorization code not found in URL");
    }
    const target = url.searchParams.get('target')

    const targetUrl = new URL(target ?? '/', url.origin)
    const resp = await fetch(
        'https://auth.sleepyhead.name/application/o/token/',
        {
            method: 'POST',
            headers: { 'content-type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                grant_type: 'authorization_code',
                client_id: 'SZ87KOccOuVlpqUBmPYHk4G9OcbRfw3CXNFzS4v5',
                client_secret: 'WThy2xmL0uDjk8NNZyrY2eoFfLHIZI2FnG81u5gIHbAWJHCaaUAwB0icwkWML19f190rawZG9pP3fRRLCEhUuKILJ32PGzMwoxnH46EenJGSyILp29XeLoemAuxm0Tjx',
                code: code,
                redirect_uri: 'http://localhost:5173/login/callback'
            })
        });

    const tokens = await resp.json();
    updateToken(tokens.access_token, tokens.id_token);

    redirect(307, targetUrl);
}