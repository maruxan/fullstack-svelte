import type { RequestHandler } from '@sveltejs/kit'

import { api } from './_api'

export const get: RequestHandler = (req) => api(req)

export const post: RequestHandler<unknown, FormData> = (req) => {
  const todo = {
    uid: Date.now().toString(), // TODO: replace with id from database
    created_at: new Date(),
    text: req.body.get('text'),
    done: false,
  }

  return api(req, todo)
}
