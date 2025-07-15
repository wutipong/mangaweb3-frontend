import type { PageServerLoad } from './$types';
import { variables } from '$lib/variables';
import { validateSession } from '$lib/auth';

export const load: PageServerLoad = async ({ url }) => {
    await validateSession(url)

    return {
        basePath: variables.apiBasePath
    }
}