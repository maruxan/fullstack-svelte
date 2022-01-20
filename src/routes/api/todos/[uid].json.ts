import type { RequestHandler } from '@sveltejs/kit'

import { api } from './_api'

export const del: RequestHandler = (req) => api(req)

export const patch: RequestHandler<unknown, FormData> = (req) => {
  const data = { text: req.body.get('text') }
  return api(req, data)
}
