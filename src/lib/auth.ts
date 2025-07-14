import { persisted } from 'svelte-persisted-store'
import { get } from 'svelte/store'

export const preferences = persisted('preferences', {
    accessToken: '',
    idToken: '',
})

export function validateSession() {
    const { accessToken, idToken } = get(preferences);

    console.log("accessToken", accessToken)
    console.log("idToken", idToken)
}

export function updateToken(code: string, access: string, id: string) {
    preferences.set({
        accessToken: access,
        idToken: id
    })
}