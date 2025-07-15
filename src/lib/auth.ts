import { persisted } from 'svelte-persisted-store'
import { get } from 'svelte/store'
import * as jose from 'jose'
import { redirect } from '@sveltejs/kit'
import { loginUrl } from './routes'

export const tokens = persisted('preferences', {
    accessToken: '<INVALID>',
    idToken: '<INVALID',
})

const JWKS = jose.createRemoteJWKSet(new URL('https://auth.sleepyhead.name/application/o/mangaweb4-dev/jwks/'))

export async function validateSession(url: URL) {
    try {
        const { accessToken } = get(tokens);
    
        const { payload, protectedHeader } = await jose.jwtVerify(accessToken, JWKS, {
            issuer: 'https://auth.sleepyhead.name/application/o/mangaweb4-dev/',
            audience: 'SZ87KOccOuVlpqUBmPYHk4G9OcbRfw3CXNFzS4v5',
        })

    } catch (err: any) {
        console.log(err.message)
        redirect(307, loginUrl(url.origin, url))
    }
}

export function updateToken(access: string, id: string) {
    tokens.set({
        accessToken: access,
        idToken: id
    })
}