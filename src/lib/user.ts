export function getUser(request: globalThis.Request) {
    return request.headers.get("Cf-Access-Authenticated-User-Email") || '';
}