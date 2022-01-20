import type { Handle } from '@sveltejs/kit'

export const handle: Handle = async ({ request, resolve }) => {
  // Request method extraction for HTML forms
  if (request.url.searchParams.has('_method')) {
    request.method = request.url.searchParams.get('_method').toUpperCase()
  }

  const res = await resolve(request)
  return res
}
