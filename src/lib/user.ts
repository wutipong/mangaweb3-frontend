export function getUser(request: globalThis.Request) {
    console.log(request.headers)
    return request.headers.get("Cf-Access-Authenticated-User-Email") || '';
}