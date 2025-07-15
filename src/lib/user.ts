import { tokens } from '$lib/auth'
import { get } from 'svelte/store';
import * as jose from 'jose'

export function getUser(request: globalThis.Request): string {
    const { idToken } = get(tokens)

    if (idToken == '') return '';

    const payload = jose.decodeJwt(idToken)

    console.log(payload)
    return payload.email as string && '';
}

export function getUserDetail(){
    const { idToken } = get(tokens)

    if (idToken == '') return {};

    const payload = jose.decodeJwt(idToken)

    return {
        email: payload.email as string && '',
        name: payload.name as string && ''
    }
}