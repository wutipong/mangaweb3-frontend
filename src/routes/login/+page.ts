import { redirect } from "@sveltejs/kit";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ url, fetch }) => {
    const target = url.searchParams.get('target')
    if (target == null) {
        return
    }

    const oidpUrl = new URL('https://auth.sleepyhead.name/application/o/authorize/')
    oidpUrl.searchParams.set('response_type', 'code')
    oidpUrl.searchParams.set('scope', 'openid email profile')
    oidpUrl.searchParams.set('client_id', 'SZ87KOccOuVlpqUBmPYHk4G9OcbRfw3CXNFzS4v5')
    oidpUrl.searchParams.set('redirect_uri', 'http://localhost:5173/login/callback')
    oidpUrl.searchParams.set('state', target)

    redirect(307, oidpUrl)
}