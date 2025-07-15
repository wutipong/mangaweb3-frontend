import { tokens } from '$lib/auth'
import { get } from 'svelte/store';
import * as jose from 'jose'

export function getUser(request: globalThis.Request): string {
    const { idToken } = get(tokens)

    if (idToken == '') return '';

    const payload = jose.decodeJwt(idToken)

    return payload.email as string && '';
}

export function getUserDetail(): {
    email: string,
    name: string
} {
    const { idToken } = get(tokens)

    // if (idToken == '') return { email: "", name: "" };

    const payload = jose.decodeJwt(idToken)

    console.log(payload)

    return {
        email: payload.email as string || '',
        name: payload.name as string || ''
    }
}