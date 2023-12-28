import { variables } from "$lib/variables";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, url }) => {

    const params = url.searchParams;
    if (!params.has('name')) {
        throw "Item name is required."
    }

    const name = params.get('name')

    const resp = await fetch(
        new URL('/view', url.origin),
        {
            method: 'POST',
            body: JSON.stringify({
                name: name
            })
        }
    );

    const response = await resp.json();

    return {
        name: name,
        page_count: response.page_count,
    }
}