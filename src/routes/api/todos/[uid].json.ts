import type { RequestHandler } from '@sveltejs/kit'

import { api } from './_api'

export const del: RequestHandler = (req) => api(req)

export const patch: RequestHandler<unknown, FormData> = (req) => {
  const text = req.body.has('text') ? req.body.get('text') : undefined
  const done = req.body.has('done') ? !!req.body.get('done') : undefined
  const data = { text, done }
  return api(req, data)
}
