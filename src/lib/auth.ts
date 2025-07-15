import { persisted } from 'svelte-persisted-store'
import { get } from 'svelte/store'
import * as jose from 'jose'

export const preferences = persisted('preferences', {
    accessToken: '',
    idToken: '',
})

const JWKS = jose.createRemoteJWKSet(new URL('https://auth.sleepyhead.name/application/o/mangaweb4-dev/jwks/'))

export async function validateSession() {
    const { accessToken, idToken } = get(preferences);

    try {
        const { payload, protectedHeader } = await jose.jwtVerify(accessToken, JWKS, {
            issuer: 'https://auth.sleepyhead.name/application/o/mangaweb4-dev/',
            audience: 'SZ87KOccOuVlpqUBmPYHk4G9OcbRfw3CXNFzS4v5',
        })
        console.log("protectedHeader", protectedHeader)
        console.log("payload", payload)
    } catch (err: any) {
        console.log(err)
    }
}

export function updateToken(code: string, access: string, id: string) {
    preferences.set({
        accessToken: access,
        idToken: id
    })
}