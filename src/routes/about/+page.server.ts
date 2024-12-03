import type { PageServerLoad } from './$types';
import { variables } from '$lib/variables';

export const load: PageServerLoad = async()=>{
    return {
        basePath: variables.apiBasePath
    }
}