import type { PageServerLoad } from "./$types";
import { validateSession } from "$lib/auth";
import { getUserDetail } from "$lib/user";

export const load: PageServerLoad = async ({ url }) => {
   await validateSession(url)

   const user = getUserDetail()
   console.log("user", user)

   return user
}

export const prerender = false;